const { Vote } = require("../models");
const { Answer } = require("../models");
const ApiError = require("../error/ApiError");

class VoteController {
	async create(req, res) {
		const { user_id, answer_id } = req.body;
		try {
			const answer = await Answer.findOne({where: {id: answer_id}});

			const question_id = answer.question_id;
			const poll_id = answer.poll_id;
			const answer_text = answer.answer
			const vote = await Vote.create({
				user_id,
				answer_id,
				question_id,
				poll_id,
				answer_text,
			});

			return res.json(vote);
		} catch (error) {
			return res.status(500).json({ message: "Server error", error });
		}
	}

	async getAll(req, res) {
		const { question_id, poll_id, answer_id, user_id } = req.query;
		let where = {};

		console.log(question_id, poll_id)

		if (question_id) where.question_id = question_id;
		if (poll_id) where.poll_id = poll_id;
		if (answer_id) where.id = answer_id;
		if (user_id) where.user_id = user_id;

		const votes = await Vote.findAll({ where });
		const sorted_votes = []

		votes.forEach(vote => {
			const existingVote = sorted_votes.find(item => item.answer_id === vote.answer_id);
		
			if (existingVote) {
				existingVote.count += 1; // Увеличиваем count, если ответ уже существует
			} else {
				// Если ответа с таким ID еще нет, добавляем новый объект
				const new_vote = {
					answer_id: vote.answer_id,
					answer_text: vote.answer_text,
					count: 1
				};
				sorted_votes.push(new_vote);
			}
		});

		console.log(sorted_votes)

		return res.json(sorted_votes);
	}
}

module.exports = new VoteController();
