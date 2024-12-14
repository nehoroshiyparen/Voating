const Router = require("express");
const router = new Router();
const questionController = require("../controllers/questionController");

router.post("/", questionController.create);
router.delete('/:id', questionController.delete)
router.get("/", questionController.getOne);
router.get("/all/:poll_id", questionController.getPollQuestions);
router.post("/:poll_id", questionController.editQuestions)

module.exports = router;
