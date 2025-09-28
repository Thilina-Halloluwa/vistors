import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function VisitorsByCompanyChart({ data }) {
  return (
    // ResponsiveContainer makes the chart fit the size of its parent container
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="company" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="visitors" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default VisitorsByCompanyChart;