import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/login', { username, password });
      onLogin(res.data.token);
    } catch (err) {
      setError('Ошибка авторизации');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 320, margin: '0 auto', padding: 24 }}>
      <h2>Вход</h2>
      <input
        type="text"
        placeholder="Логин"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
        style={{ width: '100%', marginBottom: 12 }}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        style={{ width: '100%', marginBottom: 12 }}
      />
      {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
      <button type="submit" style={{ width: '100%' }}>Войти</button>
    </form>
  );
};

export default LoginForm; 