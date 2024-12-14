const Router = require("express");
const router = new Router();
const answerController = require("../controllers/answerController");

router.post("/", answerController.create);
router.get("/", answerController.getAll);
router.post('/:poll_id', answerController.editAnswers)
router.delete('/:id', answerController.deleteAnswer)

module.exports = router;
