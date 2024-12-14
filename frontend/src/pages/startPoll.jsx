import React, { useEffect, useState } from "react";
import QRCode from 'qrcode.react';
import Button from '../components/Button/Button';
import { fetchOnePoll } from "../http/pollAPI";
import { nextQuestion, createActive_Poll, updateStatus } from '../http/active_pollAPI';
import '../components/PollPage.css';
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import createAdminSocket  from '../WebSocket/WSAdmin.js'
import { useWebSocket } from "../WebSocket/WebSocketContext.jsx";

// страница, где запускается опрос со стороны

export default function PollPage() {

	const { adminSocket, pollStartNotification } = useWebSocket()

	const {id} = useParams()
	const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const user_name = queryParams.get('user_name');
    const title = queryParams.get('title');
    const description = queryParams.get('description');
	
	const questionPageUrl = `${window.location.origin}/question/${id}`; // ссылка для qr кода, которую потом нужно будет поменять
	const [poll, setPoll] = useState( id, user_name, title, description );
	const [active, setActive] = useState(() => {
		const activeStatus = localStorage.getItem((`activeStatus_pollId${id}`))
		return activeStatus ? JSON.parse(activeStatus) : false
	})
	const navigate = useNavigate();

	useEffect(() => {
		setPoll({ id, user_name, title, description })
	}, [id]);

	const startPoll = async() => {
		try {
			const data = await createActive_Poll(id)
			await updateStatus(id, 'ongoing')
			if (active === false) {
				localStorage.setItem(`activeStatus_pollId${id}`, JSON.stringify(true))
				pollStartNotification(id)
			}
			navigate(`/questionsController/${id}`, {state: { activePollData: data}})
		} catch {

		}
	};

	return (
		<>
		<div className="page" style={{margin: '100px 0 0 0'}}>
			<div className="info">
				<div className="voteTitle"><strong>{poll.title}</strong></div>
				<div className="voteDescription">{poll.description}</div>
				<div className="voteAuthor">Автор голосования: <strong>{poll.user_name}</strong></div>
			</div>

			<div className="qr-code-container" style={{ textAlign: 'center', margin: '20px 0' }}>
				<Link key={id} to={questionPageUrl}>
					<QRCode value={questionPageUrl} size={128} /></Link>
				<h3>Сканируйте QR-код, чтобы перейти на страницу голосования</h3>
			</div>
			<div style={{ textAlign: 'center', margin: '20px 0' }}>
				{active ? (
					<Button onClick={startPoll}>Перейти к опросу</Button>
				) : (
					<Button onClick={startPoll}>Начать опрос</Button>
				)}
			</div>
		</div>
		</>
	);
}