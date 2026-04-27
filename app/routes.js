const { verifyToken } = require("../middleware/authJwt");
const authController = require("./controllers/auth.controller");
const inventoryController = require("./controllers/inventory.controller");
const categoryController = require("./controllers/category.controller");
const tagController = require("./controllers/tag.controller");

module.exports = function(app) {
  // Public route for login
  app.post("/api/auth/login", authController.login);

  // Get all inventory objects
  app.get("/api/inventory", [verifyToken], inventoryController.findAll);

  // Create a new inventory object
  app.post("/api/inventory", [verifyToken], inventoryController.create);

  // Get a single inventory object by id
  app.get("/api/inventory/:id", [verifyToken], inventoryController.findOne);

  // Update an inventory object by id
  app.put("/api/inventory/:id", [verifyToken], inventoryController.update);

  // Delete an inventory object by id
  app.delete("/api/inventory/:id", [verifyToken], inventoryController.delete);

  // Get all categories (with their associated tags)
  app.get("/api/categories", [verifyToken], categoryController.getCategories);

  // Create a new category
  app.post("/api/categories", [verifyToken], categoryController.createCategory);

  // Delete a category by id
  app.delete("/api/categories/:id", [verifyToken], categoryController.deleteCategory);

  // Get all tags (supports ?q=searchString for typeahead)
  app.get("/api/tags", [verifyToken], tagController.getTags);

  // Create a new tag
  app.post("/api/tags", [verifyToken], tagController.createTag);
};