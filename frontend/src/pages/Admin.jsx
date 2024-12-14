import React, { useEffect, useState } from "react";
import './admin/admin.css'
import { fetchPolls } from '../http/pollAPI';
import AdminPoll from "../components/adminPoll/adminPoll";
import './admin/index'
import axios from 'axios';
import { deletePoll, createPoll } from "../http/pollAPI";
import NewAdminPoll from "../components/adminPoll/newAdminPoll";

export default function Admin() {
	const [polls, setPolls] = useState([])

	useEffect(() => {
		fetchPolls().then(data => {
			const transformedData = data.map((poll) => ({
				...poll,
				type: 'poll'
			}))
			setPolls([...transformedData, {type: 'addPoll'}])
		}).catch(error => {
			console.error(error);
			setError('Ошибка: сервер бэкенда не доступен');
			setIsLoading(false);
		});
	}, [])

	async function handleDelete() {
		if (document.getElementsByClassName('chsn').length != 0) {
			let elements = document.querySelectorAll('.chsn')
			elements.forEach(el => {
				deletePoll(el.id.slice(11))
				setPolls(polls)
			})
		}
	}

	const handleCreatePoll = async(title, description, user_id, user_name) => {
		const response = await createPoll(title, description, user_id, user_name)

		console.log(response)

        const createdPoll = response
        setPolls((prevPolls) => {
			const updatedPolls = [...prevPolls]

			updatedPolls[updatedPolls.length - 1] = {
				...createdPoll,
				user_id: 0,
				user_name: 'admin',
				type: 'poll',
			}

			return [...updatedPolls, {type: 'addPoll'}]
		})	
	}

	return (
		<>
		<div className="container" style={{margin: '100px 0 0 0'}}>
			<div className="notification">
				<div className="notification_inside">
					<span className="alert"></span>
				</div>
			</div>
			<div className="main">
				<div className="inner-main">
					<div className="ap_title">
						Панель управления
					</div>
					<div className="b_row">
						<div className="controll_button">
							Добавить
						</div>
						<div className="controll_button delete bttn" onClick={handleDelete}>
							Удалить
						</div>
					</div>
					<div className="polls_list">
						{polls.map((item, index) => 
						item.type === 'poll' ? (
							<AdminPoll
							key={item.id}
							id={item.id}
							title={item.title}
							description={item.description}
							user_name={item.user_name}
							isOpen={item.isOpen}/>
						) : (
							<NewAdminPoll
							key={`add-poll${item.id}-${Math.random()}`}
							onPollCreate={handleCreatePoll}/>
						))}
					</div>
				</div>
			</div>
		</div>
		</>
	);
}
