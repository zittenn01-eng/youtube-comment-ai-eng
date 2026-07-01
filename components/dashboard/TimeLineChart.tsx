'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';

interface TimeLineChartProps {
  data: Array<{
    date: string;
    positive?: number;
    negative?: number;
    neutral?: number;
    count?: number;
  }>;
  title: string;
  type: 'sentiment' | 'volume';
}

export function TimeLineChart({ data, title, type }: TimeLineChartProps) {
  // Sort data by date just in case
  const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const formatXAxis = (tickItem: string) => {
    try {
      return format(parseISO(tickItem), 'MMM d');
    } catch {
      return tickItem;
    }
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-[400px] flex flex-col">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sortedData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatXAxis} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 12 }} 
            />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              labelFormatter={(label) => {
                try { return format(parseISO(label as string), 'yyyy년 MM월 dd일'); } catch { return label; }
              }}
            />
            <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
            
            {type === 'sentiment' ? (
              <>
                <Line type="monotone" dataKey="positive" name="긍정" stroke="#22c55e" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="neutral" name="중립" stroke="#a8a29e" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="negative" name="부정" stroke="#ef4444" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </>
            ) : (
              <Line type="monotone" dataKey="count" name="댓글 수" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6, stroke: '#8b5cf6', fill: '#fff' }} />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
