'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingState() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-20">
      <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center max-w-md w-full text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-purple-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
          <div className="relative bg-white p-4 rounded-full border-2 border-purple-100 shadow-sm">
            <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">댓글을 분석하는 중입니다...</h3>
        <p className="text-gray-500 text-sm">
          유튜브에서 데이터를 가져오고 Gemini AI를 통해 긍정/부정 감정, 추이, 연관 단어를 추출하고 있습니다. 잠시만 기다려주세요.
        </p>
        
        <div className="w-full mt-8 space-y-3">
          <div className="h-2 bg-slate-100 rounded-full w-full overflow-hidden">
            <div className="h-full bg-purple-500 rounded-full animate-[progress_2s_ease-in-out_infinite]"></div>
          </div>
          <div className="flex justify-between text-xs text-gray-400 font-medium">
            <span>수집 중</span>
            <span>AI 분석 중</span>
            <span>시각화 생성</span>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes progress {
          0% { width: 0%; transform: translateX(0); }
          50% { width: 50%; transform: translateX(50%); }
          100% { width: 100%; transform: translateX(100%); }
        }
      `}} />
    </div>
  );
}
