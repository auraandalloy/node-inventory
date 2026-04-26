const { verifyToken } = require("../middleware/authJwt");
const authController = require("./controllers/auth.controller");
const inventoryController = require("./controllers/inventory.controller");

module.exports = function(app) {
  // Public route for login
  app.post("/api/auth/login", authController.login);

  // Get all inventory objects
  // TODO: Re-enable JWT authorization when ready by putting [verifyToken] back into the chain
  // app.get("/api/inventory", [verifyToken], inventoryController.findAll);
  app.get("/api/inventory", inventoryController.findAll);
};