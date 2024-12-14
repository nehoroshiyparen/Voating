import { useState, useEffect } from "react";
import { fetchPolls } from '../http/pollAPI';
import Poll from '../components/Poll/Poll';

export default function Votes() {
	const [polls, setPolls] = useState([]); // я меняю votes на polls потому что логика нахуй просто пизда
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		setIsLoading(true);
		setError('');

		fetchPolls()
			.then(data => {
				setPolls(data);
				setIsLoading(false);
			})
			.catch(error => {
				console.error(error);
				setError('Ошибка: сервер бэкенда не доступен');
				setIsLoading(false);
			});

	}, []);

	if (isLoading) {
		return <main><p>Загрузка...</p></main>;
	}

	if (error) {
		return <main><p>{error}</p></main>;
	}

	return (
		<main>
			<section>
				<ul>
					{polls.map((poll) => (
						<Poll key={poll.id} {...poll} />
					))}
				</ul>
			</section>
		</main >
	);
}