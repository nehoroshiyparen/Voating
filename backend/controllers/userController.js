const { User } = require("../models");
const ApiError = require("../error/ApiError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateJwt = (id, user_name, email) => {
	return jwt.sign({ id, user_name, email }, process.env.SECRET_KEY, {
		expiresIn: "12h",
	});
};

class UserController {
	async registration(req, res, next) {
		const { user_name, email, password } = req.body;

		if (!user_name || !email || !password) {
			return next(
				ApiError.badRequest(
					"Не задано имя пользователя, почта или пароль"
				)
			);
		}

		const candidate = await User.findOne({ where: { email } });

		if (candidate) {
			return next(
				ApiError.badRequest(
					"Пользователь с такой почтой уже существует"
				)
			);
		}

		const hashPassword = await bcrypt.hash(password, 5);
		const user = await User.create({ user_name, email, hashPassword });
		const token = generateJwt(user.id, user.user_name, user.email);
		return res.json({ token });
	}

	async login(req, res, next) {
		const { email, password } = req.body;
		const user = await User.findOne({ where: { email } });

		if (!user) {
			return next(ApiError.internal("Пользователь не найден"));
		}
		let comparePassword = bcrypt.compareSync(password, user.password);

		if (!comparePassword) {
			return next(ApiError.internal("Неверный пароль"));
		}

		const token = generateJwt(user.id, user.user_name, user.email);

		return res.json({ token });
	}

	async check(req, res, next) {
		const token = generateJwt(
			req.user.id,
			req.user.user_name,
			req.user.email
		);
		return res.json({ token });
	}
}

module.exports = new UserController();
