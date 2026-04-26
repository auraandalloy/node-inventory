const { verifyToken } = require("../middleware/authJwt");
const authController = require("./controllers/auth.controller");
const inventoryController = require("./controllers/inventory.controller");

module.exports = function(app) {
  // Public route for login
  app.post("/api/auth/login", authController.login);

  // Get all inventory objects
  app.get("/api/inventory", [verifyToken], inventoryController.findAll);
};