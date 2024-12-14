const { Active_poll, Poll, Question, Answer } = require("../models");
const { Op } = require("sequelize");
const ApiError = require("../error/ApiError");
const e = require("cors");

class Active_pollController {
	async create(req, res, next) {
		const { poll_id } = req.body;
		try {
			const all_questions = await Question.findAll({
				where: { poll_id },
				order: [["id", "ASC"]],
			});
			const first_question = all_questions[0].dataValues.id
			const active_poll = await Active_poll.create({ poll_id, question_id: first_question });

			return res.json(active_poll);
		} catch (error) {
			try {
				const active_poll = await Active_poll.findOne({where: { poll_id }})
				return res.json(active_poll)
			} catch (error) {
				console.log(error)
			}
		}
	}

	async getAll(req, res) {
		const active = await Active_poll.findAll();
		return res.json(active);
	}

	async getOne(req, res, next) {
		const { poll_id } = req.query;
		if (!poll_id) {
			return next(ApiError.badRequest("Необходимо указать id или poll_id"));
		}
		try {
			const activePoll = await Active_poll.findOne({where: {poll_id}})
			const response = activePoll
	
			return res.json(response);
		} catch (e) {
			console.log(e)
		}
	}

	async delete(req, res, next) {
		const { id } = req.params;

		try {
			await Active_poll.destroy({ where: { id } });
			return res.json({ message: "Активный опрос удален" });
		} catch (e) {
			return next(
				ApiError.internal("Ошибка при удалении активного опроса")
			);
		}
	}

	async nextQuestion(req, res, next) {
		const { poll_id } = req.body

		try {
			 const active_poll = await Active_poll.findOne({
				where: {poll_id}
			})

			const next_question = await Question.findOne({ 
				where: {
					poll_id,
					id: { [Op.gt]: active_poll.question_id }
				},
				order: [["id", "ASC"]]
			})

			if (!next_question) {
				return res.json(null)
			} else {

				console.log('Сейчас будет обновление опроса')
				const respose = await Active_poll.update(
					{question_id: next_question.id},
					{where: {poll_id}}
				)
				return res.json({next_question})
			}
		} catch (error) {
			console.log('Ошибка при переходе к следующему вопросу: ', error)
		}
	}

	async prevQuestion(req, res, next) {
		try{
			const {poll_id} = req.body

			const active_poll = await Active_poll.findOne({
				where: {poll_id}
			})

			const prev_question = await Question.findOne({
				where: {
					poll_id,
					id: { [Op.lt]: active_poll.question_id }
				},
				order: [['id', 'DESC']]
			})

			if (!prev_question) {
				return res.json(null)
			} else {
				const respose = await Active_poll.update(
					{question_id: prev_question.id},
					{where: {poll_id}}
				)

				return res.json({prev_question})
			}
		} catch (error) {
			console.log(error)
		}
	}

	async setCurrentQuestion(req, res) {
		try {
			const {poll_id, question_id} = req.body

			const new_question = await Active_poll.update(
				{question_id: question_id},
				{where: {poll_id}}
			)

			console.log(new_question)

			return res.json({new_question})
		} catch (error) {
			console.log(error)
		}
	}

	async changePollStatus(req, res) {
		const { poll_id, status } = req.body

		const response = await Active_poll.update({status}, {where: {poll_id}})
		return res.json({message: `Статус опроса ${poll_id} изменен на ${status}`})
	}
}

module.exports = new Active_pollController();
