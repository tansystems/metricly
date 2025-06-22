import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const prepareLineData = (data) => {
  // Группируем по дате (YYYY-MM-DD)
  const map = {};
  data.forEach(m => {
    const date = m.created_at ? m.created_at.slice(0, 10) : '';
    map[date] = (map[date] || 0) + m.value;
  });
  return Object.entries(map).map(([date, value]) => ({ date, value }));
};

const ChartLine = ({ data }) => {
  const chartData = prepareLineData(data);
  return (
    <div style={{ minWidth: 300, flex: 1 }}>
      <h4>LineChart по дате</h4>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartLine; 