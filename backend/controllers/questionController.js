const { Question } = require("../models");
const uuid = require("uuid");
const path = require("path");
const ApiError = require("../error/ApiError");

class QuestionController {
	async create(req, res, next) {
		try {
			const { poll_id, question_text } = req.body;

			let fileName = null;

			if (req.files && req.files.img) {
				fileName = uuid.v4() + ".jpg";
				req.files.img.mv(
					path.resolve(__dirname, "..", "static", fileName)
				);
			}

			const questionData = { poll_id, question_text };

			if (fileName) {
				questionData.img = fileName;
			}

			const question = await Question.create(questionData);
			console.log('Создан вопрос: ', questionData)
			return res.json(question);
		} catch (e) {
			next(ApiError.badRequest(e.message));
		}
	}

	async delete(req, res, next) {
		try {
			const {id} = req.params

			await Question.destroy({where: {id}})
			return res.json({message: 'Вопрос удален'})
		}	catch (error) {
			console.log(error)
		}
	}

	async getOne(req, res) {
		const {id}  = req.query;
		const question = await Question.findOne({ where: { id: Number(id) } });

		console.log(question.dataValues)

		return res.json(question.dataValues);
	}

	async getPollQuestions(req, res) {
		const {poll_id} = req.params
		const questions = await Question.findAll({ where: {poll_id} })

		return res.json(questions)
	}

	async editQuestions(req, res, next) {
		const {poll_id} = req.params
		const {questions} = req.body
		try {
			const  existingQuestions = await Question.findAll({where: {poll_id: poll_id}})

			if ( existingQuestions.length === 0 ) {
				return res.status(404).json({message: 'Вопросов данного голосования не найдено'})
			}
			const updatePromises = questions.map((question) => {
				const { id, question_text } = question;
				return Question.update(
					{ question_text },
					{ where: { id, poll_id } }
				);
			});
	
			try {
				const updateResults = await Promise.all(updatePromises);
			} catch (error) {
				console.error('Ошибка при обновлении вопросов: ', error);
			}

			return res.json({message: 'Все вопросы обновлены'})
		}	catch (error) {
			return next(ApiError.internal('Ошибка при обновлении запросов'))
		}
	}
}

module.exports = new QuestionController();
