import React from 'react';

function Login({ }) {
	const handleSubmit = async (e) => {
		e.preventDefault();

		const username = e.target.username.value;
		const password = e.target.password.value;

		// See Word document for code example.

		// Token needs to be sent to parent App component.
	}

	return (
		<>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<div style={{ marginBottom: 5 }}>
					<label htmlFor='username'>Username: </label>
					<input id='username' name='username' type='text' />
				</div>

				<div style={{ marginBottom: 5 }}>
					<label htmlFor='password'>Password: </label>
					<input id='password' name='password' type='password' />
				</div>

				<button type='submit'>Login</button>
			</form>
		</>
	);
}

export default Login;
