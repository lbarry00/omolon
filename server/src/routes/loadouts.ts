const loadoutsRouter = require("express").Router();
const loadoutsController = require("../controllers/loadouts.ts");

loadoutsRouter.route("/get")
  .get(loadoutsController.getAllLoadouts)

loadoutsRouter.route("/get/character")
  .get(loadoutsController.getLoadoutsByCharacter)

loadoutsRouter.route("/get/membership")
  .get(loadoutsController.getLoadoutsByMembership)

loadoutsRouter.route("/add")
  .post(loadoutsController.addLoadout)

module.exports = loadoutsRouter;
