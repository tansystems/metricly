import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Dashboard from './components/Dashboard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const handleLogin = (jwt) => {
    setToken(jwt);
  };

  const handleLogout = () => {
    setToken('');
  };

  return (
    <div>
      {token ? (
        <>
          <button onClick={handleLogout} style={{ position: 'absolute', right: 24, top: 24 }}>Выйти</button>
          <Dashboard token={token} />
        </>
      ) : showRegister ? (
        <RegistrationForm
          onRegisterSuccess={() => setShowRegister(false)}
          onCancel={() => setShowRegister(false)}
        />
      ) : (
        <>
          <LoginForm onLogin={handleLogin} />
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <button onClick={() => setShowRegister(true)}>Нет аккаунта? Зарегистрироваться</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
