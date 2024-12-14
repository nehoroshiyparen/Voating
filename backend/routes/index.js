const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const pollRouter = require("./pollRouter");
const questionRouter = require("./questionRouter");
const answerRouter = require("./answerRouter");
const voteRouter = require("./voteRouter");
const active_pollRouter = require("./active_pollRouter");

router.use("/user", userRouter);
router.use("/poll", pollRouter);
router.use("/question", questionRouter);
router.use("/answer", answerRouter);
router.use("/vote", voteRouter);
router.use("/active_poll", active_pollRouter);

module.exports = router;
