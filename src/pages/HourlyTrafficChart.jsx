import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function HourlyTrafficChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hour" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="visitors" stroke="#82ca9d" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default HourlyTrafficChart;