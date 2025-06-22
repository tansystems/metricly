import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = ({ onRegisterSuccess, onCancel }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (password !== confirm) {
      setError('Пароли не совпадают');
      return;
    }
    setLoading(true);
    try {
      await axios.post('/api/register', { username, password });
      setSuccess('Регистрация успешна! Теперь войдите.');
      setUsername('');
      setPassword('');
      setConfirm('');
      if (onRegisterSuccess) onRegisterSuccess();
    } catch (err) {
      setError(err.response?.data?.error || 'Ошибка регистрации');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 320, margin: '0 auto', padding: 24 }}>
      <h2>Регистрация</h2>
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
      <input
        type="password"
        placeholder="Повторите пароль"
        value={confirm}
        onChange={e => setConfirm(e.target.value)}
        required
        style={{ width: '100%', marginBottom: 12 }}
      />
      {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
      {success && <div style={{ color: 'green', marginBottom: 12 }}>{success}</div>}
      <button type="submit" disabled={loading} style={{ width: '100%', marginBottom: 8 }}>
        {loading ? 'Регистрация...' : 'Зарегистрироваться'}
      </button>
      <button type="button" onClick={onCancel} style={{ width: '100%' }}>
        Уже есть аккаунт? Войти
      </button>
    </form>
  );
};

export default RegistrationForm; 