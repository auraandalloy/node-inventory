const db = require("../../models");
const Inventory = db.Inventory;

exports.findAll = async (req, res) => {
  try {
    // Fetch all records from the alloy_Inventory table
    const inventories = await Inventory.findAll({
      include: [{
        model: db.Tag,
        as: 'tags'
      }]
    });
    
    res.status(200).send(inventories);
  } catch (error) {
    res.status(500).send({ 
      message: error.message || "Some error occurred while retrieving inventory." 
    });
  }
};

// Create and Save a new Inventory item
exports.create = async (req, res) => {
  try {
    // Validate request
    if (!req.body.id) {
      return res.status(400).send({ message: "Inventory ID can not be empty!" });
    }

    // Create an Inventory item
    const inventory = {
      id: req.body.id,
      image_url: req.body.image_url,
      name: req.body.name,
      description: req.body.description,
      date: req.body.date,
      price: req.body.price,
      quantity: req.body.quantity,
      physicalLocation: req.body.physicalLocation,
      isExported: req.body.isExported,
      isSold: req.body.isSold,
      isShipped: req.body.isShipped
    };

    // Save Inventory in the database
    const data = await Inventory.create(inventory);

    // Associate tags if passed (expects an array of tag IDs in req.body.tags)
    if (req.body.tags && req.body.tags.length > 0) {
      await data.setTags(req.body.tags);
    }

    res.status(201).send(data);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the Inventory item."
    });
  }
};

// Find a single Inventory item with an id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Inventory.findByPk(id, {
      include: [{
        model: db.Tag,
        as: 'tags'
      }]
    });
    
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send({ message: `Cannot find Inventory item with id=${id}.` });
    }
  } catch (error) {
    res.status(500).send({ message: "Error retrieving Inventory item with id=" + req.params.id });
  }
};

// Update an Inventory item by the id in the request
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [num] = await Inventory.update(req.body, {
      where: { id: id }
    });

    // Update tags if provided
    if (req.body.tags) {
      // Fetch the item so we can update its associations
      const itemToUpdate = await Inventory.findByPk(id);
      if (itemToUpdate) await itemToUpdate.setTags(req.body.tags);
    }

    if (num == 1) {
      res.status(200).send({ message: "Inventory item was updated successfully." });
    } else {
      res.status(400).send({ message: `Cannot update Inventory item with id=${id}. Maybe the item was not found or req.body is empty!` });
    }
  } catch (error) {
    res.status(500).send({ message: "Error updating Inventory item with id=" + req.params.id });
  }
};

// Delete an Inventory item with the specified id in the request
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const num = await Inventory.destroy({
      where: { id: id }
    });

    if (num == 1) {
      res.status(200).send({ message: "Inventory item was deleted successfully!" });
    } else {
      res.status(400).send({ message: `Cannot delete Inventory item with id=${id}. Maybe the item was not found!` });
    }
  } catch (error) {
    res.status(500).send({ message: "Could not delete Inventory item with id=" + req.params.id });
  }
};