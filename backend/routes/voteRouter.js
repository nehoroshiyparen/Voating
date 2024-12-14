const Router = require("express");
const router = new Router();
const voteController = require("../controllers/voteController");

router.post("/", voteController.create);
router.get("/", voteController.getAll);

module.exports = router;
