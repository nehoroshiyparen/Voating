import React, { useState } from 'react';
import '../components/Auth.css';
import Button from '../components/Button/Button';
const Auth = () => {
	const [isLoginView, setIsLoginView] = useState(true);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const switchForm = () => {
		setIsLoginView(!isLoginView);
		setEmail('');
		setPassword('');
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (isLoginView) {
			console.log("Login with:", email, password);
			// TODO: login
		} else {
			console.log("Register with:", email, password);
			// TODO: registration
		};
	}

	return (
		<div className="auth-container">
			<form onSubmit={handleSubmit} className="auth-form">
				<h2>{isLoginView ? 'Авторизация' : 'Регистрация'}</h2>
				<div>
					<label>Email:</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div>
					<label>Пароль:</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<Button>{isLoginView ? 'Войти' : 'Зарегистрироваться'}</Button>
			</form>
			<p>
				{isLoginView ? 'Или ' : 'Уже есть аккаунт? '}
				<button type="switch-button" onClick={switchForm} className="switch-btn">
					{isLoginView ? 'зарегистрируйтесь' : 'Войдите'}
				</button>
			</p>
		</div>
	);
}

export default Auth;