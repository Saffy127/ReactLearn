import React, { useState } from 'react';


import './App.css';
import Login from './Login';
import Fact from './Fact';
import Logout from './Logout';
import LoginForm from './LoginForm';
import ChuckNorris from './ChuckNorris';


function App() {
  const [token, setToken] = useState('');

  const handleLoginSuccess = (token) => {
    setToken(token);
  };

  return (
    <div>
      {!token ? (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          <ChuckNorris token={token} />
          {/* Implement logout by resetting token */}
          <button onClick={() => setToken('')}>Logout</button>
        </>
      )}
    </div>
  );
}

export default App;
