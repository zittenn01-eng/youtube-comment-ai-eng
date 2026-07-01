'use client';

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SentimentPieChartProps {
  positive: number;
  negative: number;
  neutral: number;
}

export function SentimentPieChart({ positive, negative, neutral }: SentimentPieChartProps) {
  const data = [
    { name: '긍정', value: positive },
    { name: '중립', value: neutral },
    { name: '부정', value: negative },
  ];

  const COLORS = ['#22c55e', '#a8a29e', '#ef4444'];

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-[400px] flex flex-col">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">감정 분포</h3>
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
