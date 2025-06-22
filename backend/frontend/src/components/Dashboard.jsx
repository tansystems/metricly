import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChartBar from './ChartBar';
import ChartLine from './ChartLine';
import ChartPie from './ChartPie';
import ExportButtons from './ExportButtons';

const Dashboard = ({ token }) => {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/metrics', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMetrics(res.data);
      } catch (err) {
        setError('Ошибка загрузки метрик');
      }
      setLoading(false);
    };
    fetchMetrics();
  }, [token]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <h2>Аналитика</h2>
      <ExportButtons token={token} />
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: 24 }}>
        <ChartBar data={metrics} />
        <ChartLine data={metrics} />
        <ChartPie data={metrics} />
      </div>
    </div>
  );
};

export default Dashboard; 