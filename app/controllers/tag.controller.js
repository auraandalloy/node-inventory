const db = require("../../models");
const Tag = db.Tag;
const Category = db.Category;
const Op = db.Sequelize.Op;

// Retrieve all Tags (with optional search for typeahead)
exports.getTags = async (req, res) => {
  try {
    const searchQuery = req.query.q;
    let condition = null;

    // If the frontend passed a ?q=something query parameter, filter by name
    if (searchQuery) {
      condition = { name: { [Op.like]: `%${searchQuery}%` } };
    }

    const tags = await Tag.findAll({
      where: condition,
      include: [{
        model: Category,
        as: 'category'
      }],
      order: [['name', 'ASC']] // Alphabetical order is best for typeaheads
    });
    
    res.status(200).send(tags);
  } catch (error) {
    res.status(500).send({ 
      message: error.message || "Some error occurred while retrieving tags." 
    });
  }
};

// Create and Save a new Tag (and handle new Categories dynamically)
exports.createTag = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).send({ message: "Tag name cannot be empty!" });
    }

    let targetCategoryId = req.body.categoryId;

    // If no category ID was provided, but a name was, find or create that category
    if (!targetCategoryId && req.body.categoryName) {
      const [category] = await Category.findOrCreate({
        where: { name: req.body.categoryName }
      });
      targetCategoryId = category.id;
    } else if (!targetCategoryId) {
      return res.status(400).send({ message: "A categoryId or categoryName is required." });
    }

    const tag = await Tag.create({
      name: req.body.name,
      categoryId: targetCategoryId
    });

    res.status(201).send(tag);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the Tag."
    });
  }
};