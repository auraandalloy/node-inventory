const db = require("../../models");
const Inventory = db.Inventory;

exports.findAll = async (req, res) => {
  try {
    // Fetch all records from the alloy_Inventory table
    const inventories = await Inventory.findAll();
    
    res.status(200).send(inventories);
  } catch (error) {
    res.status(500).send({ 
      message: error.message || "Some error occurred while retrieving inventory." 
    });
  }
};