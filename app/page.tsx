'use client';

import React, { useState } from 'react';
import { Search, Video, AlertCircle, Sparkles } from 'lucide-react';
import { StatCards } from '@/components/dashboard/StatCards';
import { SentimentPieChart } from '@/components/dashboard/SentimentPieChart';
import { TimeLineChart } from '@/components/dashboard/TimeLineChart';
import { NetworkGraph } from '@/components/dashboard/NetworkGraph';
import { LoadingState } from '@/components/dashboard/LoadingState';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        throw new Error(result.error || '댓글 분석에 실패했습니다.');
      }

      setData(result);
    } catch (err: any) {
      setError(err.message || '예기치 못한 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] font-sans text-gray-900 selection:bg-purple-200">
      {/* Header / Search Area */}
      <div className="bg-white border-b border-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-purple-100 p-3 rounded-2xl">
            <Video className="w-8 h-8 text-purple-600" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              유튜브 AI 분석 대시보드
            </h1>
            <p className="text-sm text-gray-500 font-medium mt-1">Powered by Gemini</p>
          </div>
        </div>

        <form onSubmit={handleAnalyze} className="w-full max-w-2xl relative">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="유튜브 영상 URL 또는 ID를 붙여넣으세요..."
            className="w-full pl-6 pr-32 py-4 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-base font-medium placeholder:text-gray-400 shadow-inner"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-2 bottom-2 bg-purple-600 hover:bg-purple-700 text-white px-6 rounded-full text-sm font-semibold transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-purple-200"
          >
            <Search className="w-4 h-4" />
            분석하기
          </button>
        </form>
      </div>

      {/* Main Content / Analysis Results */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Initial Empty State */}
        {!loading && !data && !error && (
          <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in duration-500">
            <div className="bg-purple-50 p-6 rounded-full mb-6 ring-8 ring-white shadow-sm">
              <Video className="w-12 h-12 text-purple-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">시청자 반응 인사이트 발견하기</h2>
            <p className="text-gray-500 max-w-md mx-auto">
              위 검색창에 유튜브 영상 링크를 붙여넣으세요. Gemini AI가 수백 개의 댓글을 순식간에 분석하여 감정, 트렌드, 핵심 키워드를 추출해 드립니다.
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading && <LoadingState />}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-100 p-6 rounded-3xl flex items-start gap-4 text-red-800 max-w-2xl mx-auto shadow-sm mb-6">
            <AlertCircle className="w-6 h-6 flex-shrink-0 text-red-500 mt-0.5" />
            <div>
              <h3 className="font-semibold text-lg mb-1">분석 실패</h3>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </div>
        )}

        {/* Dashboard Content */}
        {data && !loading && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            {/* AI Summary Section */}
            {data.analysis.summary && (
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-3xl shadow-md text-white flex items-start gap-4">
                <div className="bg-white/20 p-3 rounded-full flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">AI 종합 분석 결과</h3>
                  <p className="text-purple-50 leading-relaxed font-medium">
                    {data.analysis.summary}
                  </p>
                </div>
              </div>
            )}

            <StatCards 
              totalComments={data.analysis.totalComments}
              positive={data.analysis.positive}
              negative={data.analysis.negative}
              neutral={data.analysis.neutral}
              averageLength={data.analysis.averageLength}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="col-span-1">
                <SentimentPieChart 
                  positive={data.analysis.positive}
                  negative={data.analysis.negative}
                  neutral={data.analysis.neutral}
                />
              </div>
              <div className="col-span-1 lg:col-span-2">
                <TimeLineChart 
                  data={data.analysis.sentimentsOverTime} 
                  title="감정 변화 추이" 
                  type="sentiment" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="col-span-1">
                <TimeLineChart 
                  data={data.analysis.commentsOverTime} 
                  title="일별 댓글 수 추이" 
                  type="volume" 
                />
              </div>
              <div className="col-span-1">
                <NetworkGraph data={data.analysis.bigrams} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
