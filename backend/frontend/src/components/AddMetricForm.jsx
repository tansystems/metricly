import React, { useState } from 'react';
import { addMetric } from '../api/api';

const AddMetricForm = ({ token, onAdd }) => {
  const [metricType, setMetricType] = useState('');
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await addMetric(token, { metric_type: metricType, value: parseFloat(value) });
      setMetricType('');
      setValue('');
      if (onAdd) onAdd();
    } catch (err) {
      setError('Ошибка добавления метрики');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24, maxWidth: 400 }}>
      <h4>Добавить метрику</h4>
      <input
        type="text"
        placeholder="Тип метрики"
        value={metricType}
        onChange={e => setMetricType(e.target.value)}
        required
        style={{ width: '100%', marginBottom: 8 }}
      />
      <input
        type="number"
        placeholder="Значение"
        value={value}
        onChange={e => setValue(e.target.value)}
        required
        style={{ width: '100%', marginBottom: 8 }}
      />
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <button type="submit" disabled={loading} style={{ width: '100%' }}>
        {loading ? 'Добавление...' : 'Добавить'}
      </button>
    </form>
  );
};

export default AddMetricForm; 