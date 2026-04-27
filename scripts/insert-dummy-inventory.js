const db = require('../models');
const Inventory = db.Inventory;
const Tag = db.Tag;
const Category = db.Category;

async function insertDummyData() {
  try {
    // Test the database connection
    await db.sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Define the dummy testing object
    const dummyItem = {
      id: `TEST-OBJ-${Date.now()}`, // Generate a unique ID to prevent primary key collisions on multiple runs
      image_url: 'https://via.placeholder.com/150',
      name: 'Dummy Test Item',
      description: 'This is a testing object inserted via the setup script.',
      date: new Date(),
      price: 19.99,
      quantity: 42,
      physicalLocation: 'Tiny', // Must be 'Tiny', 'Verde', or 'Else'
      isExported: false,
      isSold: false,
      isShipped: false
    };

    // Save the dummy item in the database
    const createdItem = await Inventory.create(dummyItem);

    // Setup dummy category
    const [category] = await Category.findOrCreate({ where: { name: 'Test Category', description: 'Used for dummy inserts' } });

    // Setup some dummy tags and associate them
    const [tag1] = await Tag.findOrCreate({ where: { name: 'dummy', categoryId: category.id } });
    const [tag2] = await Tag.findOrCreate({ where: { name: 'test', categoryId: category.id } });
    
    await createdItem.addTags([tag1, tag2]);

    console.log('Successfully inserted dummy item:\n', createdItem.toJSON());
  } catch (error) {
    console.error('Error inserting dummy item:', error);
  } finally {
    // Close the connection so the Node process can exit
    await db.sequelize.close();
  }
}

insertDummyData();