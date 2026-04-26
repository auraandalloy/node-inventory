'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const db = require('../models');
const { BlobServiceClient } = require('@azure/storage-blob');

async function importLocalPhotos(directoryPath) {
  try {
    console.log(`Reading files from local directory: ${directoryPath}`);

    if (!fs.existsSync(directoryPath)) {
      console.error(`Directory not found: ${directoryPath}`);
      return;
    }

    const files = fs.readdirSync(directoryPath);
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));

    if (imageFiles.length === 0) {
      console.log('No image files found in the specified directory.');
      return;
    }

    console.log(`Found ${imageFiles.length} images. Initializing Azure Blob Storage...`);

    // Ensure you have this environment variable set before running the script
    const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
    const CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER_NAME || 'inventory-images';

    if (!AZURE_STORAGE_CONNECTION_STRING) {
      console.error('Error: AZURE_STORAGE_CONNECTION_STRING environment variable is missing.');
      return;
    }

    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);

    // Ensure the container exists and allows public read access for the blobs
    await containerClient.createIfNotExists({ access: 'blob' });

    let insertedCount = 0;
    for (const file of imageFiles) {
      const filePath = path.join(directoryPath, file);
      const fileExtension = path.extname(file);
      
      // Create a unique blob name to prevent overwriting
      const blobName = `${crypto.randomUUID()}${fileExtension}`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      console.log(`Uploading ${file} to Azure as ${blobName}...`);
      await blockBlobClient.uploadFile(filePath);
      
      const imageUrl = blockBlobClient.url;
      console.log(`Uploaded successfully. URL: ${imageUrl}`);

      await db.Inventory.create({
        id: crypto.randomUUID(), // Required string ID
        image_url: imageUrl,
        name: file, // Using original filename as the placeholder name
        description: 'Placeholder description generated from local CLI import script.',
        tags: ['imported', 'local', 'azure-blob'], 
        date: new Date(),
        price: 0.00,
        quantity: 1,
        physicalLocation: 'Else'
      });
      
      insertedCount++;
    }

    console.log(`Successfully processed and inserted ${insertedCount} records!`);
  } catch (error) {
    console.error('Error importing photos:', error);
  } finally {
    await db.sequelize.close();
  }
}

// CLI Execution
const localDir = process.argv[2];

if (!localDir) {
  console.error('Usage: node scripts/import-google-photos.js <LOCAL_DIRECTORY_PATH>');
  process.exit(1);
}

importLocalPhotos(localDir);