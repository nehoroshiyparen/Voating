
// initializeData.js
const { User, Poll, Question, Answer, Active_poll } = require("./models");
const bcrypt = require("bcryptjs");

const initializeData = async () => {
  try {
    // Заполнение таблицы User
    const usersCount = await User.count();
    if (usersCount === 0) {
      const usersToInsert = [
        {
          user_name: "Sergei",
          email: "user1@example.com",
          password: await bcrypt.hash("password1", 5),
        },
        {
          user_name: "Pasha",
          email: "user2@example.com",
          password: await bcrypt.hash("password2", 5),
        },
        {
          user_name: "Oleg",
          email: "user3@example.com",
          password: await bcrypt.hash("password3", 5),
        },
      ];

      const createdUsers = await User.bulkCreate(usersToInsert);
    }

    // Заполнение таблицы Poll
    const pollsCount = await Poll.count();
    if (pollsCount === 0) {
      const createdUsers = await User.findAll(); // Получаем всех пользователей

      const pollsToInsert = [
        {
          user_id: createdUsers[0].id,
          user_name: createdUsers[0].user_name,
          title: "Голосование за Культурную столицу 2026",
          description: 'Конкурс «Культурная столица года» предоставляет регионам страны уникальную возможность ярко представить на федеральном уровне свой социально-экономический потенциал, обеспечить создание условий для роста инвестиционной и туристической привлекательности.',
          isOpen: true,
        },
        {
          user_id: createdUsers[1].id,
          user_name: createdUsers[1].user_name,
          title: "Оценка удовлетворенности внешних клиентов (граждан) рассмотрением обращений и выполнением запросов Федеральной службой по надзору в сфере здравоохранения",
          description: 'Данный опрос проводится с целью получения Росздравнадзором обратной связи от граждан об удовлетворенности рассмотрением обращений и выполнением запросов. По одному обращению необходимо принимать участие в опросе один раз.',
          isOpen: false,
        },
        {
          user_id: createdUsers[2].id,
          user_name: createdUsers[2].user_name,
          title: "Оценка удовлетворенности внешних клиентов доступом к информации о деятельности Росздравнадзора",
          description: 'Данный опрос проводится с целью получения обратной связи от граждан и организаций об удовлетворенности доступом к информации о деятельности Росздравнадзора',
          isOpen: false,
        },
      ];

      const createdPolls = await Poll.bulkCreate(pollsToInsert);
    }

    // Заполнение таблицы Question
    const questionsCount = await Question.count();
    if (questionsCount === 0) {
      const polls = await Poll.findAll(); // Получаем все опросы

      const questionsToInsert = [
        {
          poll_id: polls[0].id,
          question_text:
            "Как вы оцениваете культурные мероприятия в вашем регионе?",
        },
        {
          poll_id: polls[0].id,
          question_text: "test1",
        },
        {
          poll_id: polls[0].id,
          question_text: "test2",
        },
        {
          poll_id: polls[0].id,
          question_text: "test3",
        },
        {
          poll_id: polls[0].id,
          question_text: "test4",
        },
        {
          poll_id: polls[1].id,
          question_text:
            "Как вы оцениваете работу Федеральной службы по надзору в сфере здравоохранения?",
        },
        {
          poll_id: polls[1].id,
          question_text:
            "Сосал ?",
        },
        {
          poll_id: polls[2].id,
          question_text:
            "Как вы оцениваете доступ к информации о деятельности Росздравнадзора?",
        },
        {
          id: 100,
          poll_id: null,
          question_text: "Данный опрос завершен",
        },
      ];

      const createdQuestions = await Question.bulkCreate(
        questionsToInsert
      );
    }

// Заполнение таблицы Active_poll
    const activePollsToInsert = [
      {
        poll_id: 1,
        question_id: null,
      },
      {
        poll_id: 2,
        question_id: null,
      },
      {
        poll_id: 3,
        question_id: null,
      },
    ];

    const createdActivePolls = await Active_poll.bulkCreate(
      activePollsToInsert
    );

    // Заполнение таблицы Answer
    const answersCount = await Answer.count();
    if (answersCount === 0) {
      const questions = await Question.findAll(); // Получаем все вопросы

      const answersToInsert = [
        {
          id: 1,
          poll_id: questions[0].poll_id,
          question_id: questions[0].id,
          answer: "хуично",
        },
        {
          id: 2,
          poll_id: questions[0].poll_id,
          question_id: questions[0].id,
          answer: "пиздично",
        },
        {
          poll_id: questions[0].poll_id,
          question_id: questions[0].id,
          answer: "далбично",
        },
        {
          poll_id: questions[1].poll_id,
          question_id: questions[1].id,
          answer: "пиздато",
        },
        {
          poll_id: questions[1].poll_id,
          question_id: questions[1].id,
          answer: "нихуево",
        },
        {
          poll_id: questions[1].poll_id,
          question_id: questions[1].id,
          answer: "хуево",
        },
        {
          poll_id: questions[2].poll_id,
          question_id: questions[2].id,
          answer: "Умеешь читать ?",
        },
        {
          poll_id: questions[2].poll_id,
          question_id: questions[2].id,
          answer: "Сосал?",
        },
        {
          poll_id: questions[2].poll_id,
          question_id: questions[2].id,
          answer: "да",
        },
        {
          poll_id: questions[3].poll_id,
          question_id: questions[3].id,
          answer: "пизда",
        },
        {
          poll_id: questions[3].poll_id,
          question_id: questions[3].id,
          answer: "очко",
        },
        {
          poll_id: questions[3].poll_id,
          question_id: questions[3].id,
          answer: "похуй мне",
        },
        {
          poll_id: questions[4].poll_id,
          question_id: questions[4].id,
          answer: "спермоприемник",
        },
        {
          poll_id: questions[4].poll_id,
          question_id: questions[4].id,
          answer: "хуеглот",
        },
        {
          poll_id: questions[4].poll_id,
          question_id: questions[4].id,
          answer: "пиздогрыз",
        },
        {
          poll_id: questions[5].poll_id,
          question_id: questions[5].id,
          answer: "далбоеб",
        },
        {
          poll_id: questions[5].poll_id,
          question_id: questions[5].id,
          answer: "нахуй",
        },
        {
          poll_id: questions[6].poll_id,
          question_id: questions[6].id,
          answer: "похуй",
        },
      ];

      const createdAnswers = await Answer.bulkCreate(answersToInsert);
    }
  } catch (error) {
    console.error("Error initializing data:", error);
  }
};

module.exports = initializeData;