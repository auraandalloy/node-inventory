const db = require("../../models");
const Category = db.Category;

// Retrieve all Categories from the database
exports.getCategories = async (req, res) => {
  try {
    // Fetch all categories and include their associated tags
    const categories = await Category.findAll({
      include: [{
        model: db.Tag,
        as: 'tags'
      }]
    });
    
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send({ 
      message: error.message || "Some error occurred while retrieving categories." 
    });
  }
};

// Create and Save a new Category
exports.createCategory = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).send({ message: "Category name cannot be empty!" });
    }

    const category = await Category.create({
      name: req.body.name,
      description: req.body.description
    });

    res.status(201).send(category);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the Category."
    });
  }
};

// Delete a Category with the specified id in the request
exports.deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const num = await Category.destroy({
      where: { id: id }
    });

    if (num == 1) {
      res.status(200).send({ message: "Category was deleted successfully!" });
    } else {
      res.status(404).send({ message: `Cannot delete Category with id=${id}. Maybe Category was not found!` });
    }
  } catch (error) {
    res.status(500).send({ message: "Could not delete Category with id=" + req.params.id });
  }
};