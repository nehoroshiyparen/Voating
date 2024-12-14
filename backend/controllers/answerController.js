const { Answer } = require("../models");
const { Question } = require("../models");
const ApiError = require("../error/ApiError");

class AnswerController {
	async create(req, res) {
		const { question_id, answer } = req.body;

		try {
			const question = await Question.findByPk(question_id);

			const poll_id = question.poll_id;

			console.log(`Creating answer for question_id: ${question_id}, poll_id: ${poll_id}`);

        // Создаем новый ответ
        	const answer_obj = await Answer.create({
            question_id: question.id,
            answer,
            poll_id, // poll_id, который связан с вопросом
        });

        return res.json(answer_obj);
		} catch (error) {
			return res.status(500).json({ message: "Server error", error });
		}
	}

	async getAll(req, res) {
		const { question_id, poll_id } = req.query;

		let answers;
		answers = await Answer.findAll({where: {question_id, poll_id}})

		return res.json(answers);
	}

	async deleteAnswer(req, res) {
		const {id} = req.params

		await Answer.destroy({where: {id}})
		return res.json({message: 'Ответ удален'})
	}

	async editAnswers(req, res, next) {
		console.log(req.params)
		const {poll_id} = req.params
		const {answers} = req.body

			const existingAnswers = await Answer.findAll({where: {poll_id: poll_id}})
			const updatedAnswers = answers.map((newAnswer) => {
				const {id, answer} = newAnswer
				return Answer.update(
					{answer},
					{where: {id, poll_id}}
				)
			})

			try {
				const updatedResults = await Promise.all(updatedAnswers)
			} catch (error) {
				console.error('Ошибка при обновлении ответов: ', error)
			}
			return res.json({message: 'Все ответы обновлены'})
	}
}

module.exports = new AnswerController();
