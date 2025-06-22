import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28BFE', '#FF6699'];

const groupByType = (data) => {
  const map = {};
  data.forEach(m => {
    map[m.metric_type] = (map[m.metric_type] || 0) + m.value;
  });
  return Object.entries(map).map(([type, value]) => ({ name: type, value }));
};

const ChartPie = ({ data }) => {
  const chartData = groupByType(data);
  return (
    <div style={{ minWidth: 300, flex: 1 }}>
      <h4>PieChart по типу</h4>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
            {chartData.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartPie; 