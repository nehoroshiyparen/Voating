import React, { useState , useEffect } from "react";
import DoughnutChart from '../components/diagrams/DoughnutChart';
import './results/style.css';
import { useParams } from "react-router-dom";
import { get_one, get_poll_questions } from "../http/questionAPI";
import { setCurrentQuestion } from "../http/active_pollAPI";
import { gAFQ_id } from "../http/answerAPI";
import Answer from "./questionsControll/answer";
import { fetchOnePoll } from "../http/pollAPI";
import { fetchVotes } from "../http/voteAPI";

export default function PollResult() {
	const { id } = useParams();
	const [pollInfo, setPollInfo] = useState();
	const [allQuestions, setAllQuestions] = useState();
	const [question, setQuestion] = useState();
	const [answers, setAnswers] = useState();
	const [votes, setVotes] = useState();
	const [totalVotes, setTotalVotes] = useState(0)
	const [chartData, setChartData] = useState({ labels: [], values: [] });

	useEffect(() => {
		const fetchPollData = async () => {
			try {
				const poll_information = await fetchOnePoll(id);
				setPollInfo(poll_information);
				
				const poll_questions = await get_poll_questions(id);
				setAllQuestions(poll_questions);

				if (poll_questions.length > 0) {
					await setCurrentQuestion(id, poll_questions[0].id);
					setQuestion(poll_questions[0]);
				}
			} catch (e) {
				console.log(e);
			}
		};
		fetchPollData();
	}, [id]);

	useEffect(() => {
		const fetchAnswersAndVotes = async () => {
			if (question) {
				try {
					const answers = await gAFQ_id(question.id, id);
					setAnswers(answers);

					const votes = await fetchVotes(id, question.id);
					setVotes(votes);
				} catch (e) {
					console.log(e);
				}
			}
		};
		fetchAnswersAndVotes();
	}, [question]);

	useEffect(() => {
		if (votes) {
			const newChartData = {
				labels: votes.map(vote => vote.answer_text),
				values: votes.map(vote => vote.count)
			};
			const total = votes.reduce((acc, vote) => acc + vote.count, 0)
			setTotalVotes(total)
			setChartData(newChartData);
		}
	}, [votes]);

	const handleChangeQuestion = (question) => {
		setQuestion(question)
	}

	if (!question || !pollInfo || !votes) {
        return <div>Загрузка...</div>; 
    }

	return (
		<div className="overflow_hidden">
			<div className="container" style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
				<div className="title_results">
					Результаты голосования <br/><span style={{ color: '#fc8b19', fontWeight: 'bold' }}>{pollInfo.title}</span>
				</div>
				<div className="result_container">
					<div className="questions_list">
						{allQuestions.map((question, index) => 
							<div className="questions_list_component" key={question.id} onClick={() => handleChangeQuestion(question)}>
								{index + 1}
							</div>
						)}
					</div>
					<div className="pie_chart_container">
						<DoughnutChart data={chartData} />
						<div className="vote_count">
							Всего голосов: <span style={{fontWeight: 'bold'}}>{totalVotes}</span>
						</div>
					</div>
					<div className="questions_container">
						<div className="image_container">
							<img src="https://i.gifer.com/1Eu.gif" height="100%" style={{ objectFit: 'cover' }} alt="chart visual" />
						</div>
						<div className="question_type">
							<span>Вопрос с выбором ответа</span>
						</div>
						{question && (
						<>
							<div className="question_title_client">
								<span>{question.question_text}</span>
							</div>
							<div className="answer_list_client">
								{answers && answers.map((answer, index) =>
									<Answer key={answer.id}
										id={answer.id}
										text={answer.answer}
										index={index} />
								)}
							</div>
						</>
						)}
					</div>	
				</div>
			</div>
		</div>
	);
}
