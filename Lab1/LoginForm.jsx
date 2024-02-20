// LoginForm.jsx

import React, { useState } from 'react';

function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateInput = () => {
    if (!username || !password) {
      setErrorMessage('Username and password are required.');
      return false;
    }
    // Add any other validation rules here
    return true;
  };

  const performLogin = async () => {
    if (!validateInput()) return;

    const response = await fetch('http://localhost:3333/login', {
      method: 'post',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (response.ok && data.uuid) {
      onLoginSuccess(data.uuid);
    } else {
      setErrorMessage(data.message || 'Login failed');
    }
  };

  return (
    <div>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={performLogin}>Log In</button>
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
}

export default LoginForm;
