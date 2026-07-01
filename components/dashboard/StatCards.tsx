import React from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, Meh, Hash } from 'lucide-react';

interface StatCardsProps {
  totalComments: number;
  positive: number;
  negative: number;
  neutral: number;
  averageLength: number;
}

export function StatCards({ totalComments, positive, negative, neutral, averageLength }: StatCardsProps) {
  const cards = [
    {
      title: '수집된 총 댓글',
      value: totalComments,
      icon: <MessageSquare className="w-5 h-5 text-purple-500" />,
      desc: '분석 대상 전체 댓글 수'
    },
    {
      title: '긍정적 반응',
      value: totalComments > 0 ? `${((positive / totalComments) * 100).toFixed(1)}%` : '0%',
      icon: <ThumbsUp className="w-5 h-5 text-green-500" />,
      desc: `${positive}개의 댓글`
    },
    {
      title: '부정적 반응',
      value: totalComments > 0 ? `${((negative / totalComments) * 100).toFixed(1)}%` : '0%',
      icon: <ThumbsDown className="w-5 h-5 text-red-500" />,
      desc: `${negative}개의 댓글`
    },
    {
      title: '평균 댓글 길이',
      value: Math.round(averageLength),
      icon: <Hash className="w-5 h-5 text-blue-500" />,
      desc: '댓글 1개당 평균 글자 수'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-gray-500">{card.title}</h3>
            {card.icon}
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{card.value}</div>
            <p className="text-sm text-gray-400">{card.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
