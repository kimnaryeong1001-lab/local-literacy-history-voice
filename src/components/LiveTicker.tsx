import React, { useEffect, useState } from 'react';
import { NewsArticle } from '../types';
import { Radio, ArrowRight, Sparkles } from 'lucide-react';

interface LiveTickerProps {
  news: NewsArticle[];
  onSelectNews: (news: NewsArticle) => void;
  onConvertToIssue: (news: NewsArticle) => void;
}

export const LiveTicker: React.FC<LiveTickerProps> = ({
  news,
  onSelectNews,
  onConvertToIssue,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (news.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [news.length]);

  if (!news || news.length === 0) return null;
  const current = news[currentIndex];

  return (
    <div className="bg-slate-900 text-slate-100 text-xs border-b border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4">
        {/* Left: Live Indicator & Active News Item */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-rose-600/90 text-white font-bold text-[11px] tracking-wide shrink-0">
            <Radio className="w-3 h-3 animate-pulse" />
            <span>LIVE 속보</span>
          </div>

          <span className="text-amber-400 font-medium shrink-0">
            [{current.sido}]
          </span>

          <button
            onClick={() => onSelectNews(current)}
            className="truncate text-left hover:text-amber-300 transition-colors text-slate-200"
            title={current.title}
          >
            {current.title}
          </button>
        </div>

        {/* Right: Quick convert to report & view more */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={() => onConvertToIssue(current)}
            className="flex items-center gap-1 text-[11px] text-amber-300 hover:text-amber-200 font-medium transition-colors"
            title="이 뉴스를 토대로 우리 동네 문제 제보 작성"
          >
            <Sparkles className="w-3 h-3" />
            <span>제보로 변환</span>
          </button>

          <span className="text-slate-600" aria-hidden="true">
            |
          </span>

          <button
            onClick={() => onSelectNews(current)}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
          >
            <span>상세보기</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
