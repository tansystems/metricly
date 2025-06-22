import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const groupByType = (data) => {
  const map = {};
  data.forEach(m => {
    map[m.metric_type] = (map[m.metric_type] || 0) + m.value;
  });
  return Object.entries(map).map(([type, value]) => ({ type, value }));
};

const ChartBar = ({ data }) => {
  const chartData = groupByType(data);
  return (
    <div style={{ minWidth: 300, flex: 1 }}>
      <h4>BarChart по типу</h4>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartBar; 