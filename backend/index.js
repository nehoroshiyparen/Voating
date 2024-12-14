require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const router = require("./routes/index");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const path = require("path");
const initializeData = require("./initializeData");
const PORT = process.env.PORT || 5000;
const WebSocketServer = require('./WSServer')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);

// Обработка ошибок
app.use(errorHandler);

const start = async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync();

		// Инициализация тестовых данных
		await initializeData();

		app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
	} catch (e) {
		console.log(e);
	}
};

start();