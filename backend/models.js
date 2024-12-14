const sequelize = require("./db");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
	"user",
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		user_name: { type: DataTypes.STRING, unique: true },
		email: { type: DataTypes.STRING, unique: true },
		password: { type: DataTypes.STRING },
	},
	{
		timestamps: false,
	}
);

const Poll = sequelize.define(
	"Poll",
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		user_id: { type: DataTypes.INTEGER }, // Похоже это создатель
		user_name: { type: DataTypes.STRING }, // и это тоже
		title: { type: DataTypes.STRING },
		description: { type: DataTypes.TEXT },
		isOpen: { type: DataTypes.BOOLEAN },
	},
	{
		timestamps: false,
	}
);

const Question = sequelize.define(
	"Question",
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		poll_id: { type: DataTypes.INTEGER },
		question_text: { type: DataTypes.STRING },
		img: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
	},
	{
		timestamps: false,
	}
);

const Answer = sequelize.define(
	"Answer",
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		question_id: { type: DataTypes.INTEGER },
		answer: { type: DataTypes.STRING },
		poll_id: { type: DataTypes.INTEGER },
	},
	{
		timestamps: false,
	}
);

const Vote = sequelize.define(
	"Vote",
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		user_id: { type: DataTypes.INTEGER },
		answer_id: { type: DataTypes.INTEGER },
		answer_text: { type: DataTypes.STRING },
		question_id: { type: DataTypes.INTEGER },
		poll_id: { type: DataTypes.INTEGER },
	},
	{
		timestamps: false,
	}
);

const Active_poll = sequelize.define("Active_poll", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	poll_id: { type: DataTypes.INTEGER, unique: true },
	question_id: {
		type: DataTypes.INTEGER,
		allowNull: true,
		defaultValue: null,
	},
	status: { type: DataTypes.STRING, defaultValue: 'waitng' }
});

User.hasMany(Poll, { foreignKey: "user_id" });
Poll.belongsTo(User, { foreignKey: "user_id" });

Poll.hasMany(Question, { foreignKey: "poll_id" });
Question.belongsTo(Poll, { foreignKey: "poll_id" });

Question.hasMany(Answer, { foreignKey: "question_id" });
Answer.belongsTo(Question, { foreignKey: "question_id" });

// User.hasMany(Vote, { foreignKey: 'user_id' });
// Vote.belongsTo(User, { foreignKey: 'user_id' });

Answer.hasMany(Vote, { foreignKey: "answer_id" });
Vote.belongsTo(Answer, { foreignKey: "answer_id" });

Poll.hasMany(Answer, { foreignKey: "poll_id" });
Answer.belongsTo(Poll, { foreignKey: "poll_id" });

Poll.hasMany(Vote, { foreignKey: "poll_id" });
Vote.belongsTo(Poll, { foreignKey: "poll_id" });

Question.hasMany(Vote, { foreignKey: "question_id" });
Vote.belongsTo(Question, { foreignKey: "question_id" });

Poll.hasOne(Active_poll, { foreignKey: "poll_id" });
Active_poll.belongsTo(Poll, { foreignKey: "poll_id" });

Question.hasOne(Active_poll, { foreignKey: "question_id" });
Active_poll.belongsTo(Question, { foreignKey: "question_id" });

module.exports = {
	User,
	Poll,
	Question,
	Answer,
	Vote,
	Active_poll,
};
