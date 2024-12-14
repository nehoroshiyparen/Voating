const Router = require("express");
const router = new Router();
const PollController = require("../controllers/pollController");
const { Poll } = require("../models");

router.post("/", PollController.create);
router.get("/", PollController.getAll);
router.get("/:id", PollController.getOne);
router.delete("/:id", PollController.delete);
router.post('/:id', PollController.edit);

module.exports = router;
