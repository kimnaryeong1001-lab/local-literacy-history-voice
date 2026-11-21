import React, { useState } from 'react';
import { NewsArticle, IssueCategoryType } from '../types';
import { CATEGORIES, REGION_CENTERS } from '../data/initialData';
import { Newspaper, ExternalLink, Sparkles, Filter, Search } from 'lucide-react';

interface NewsViewProps {
  news: NewsArticle[];
  onConvertToIssue: (news: NewsArticle) => void;
  onNavigateToMap: (sido: string) => void;
}

export const NewsView: React.FC<NewsViewProps> = ({
  news,
  onConvertToIssue,
  onNavigateToMap,
}) => {
  const [selectedSido, setSelectedSido] = useState<string>('전국');
  const [selectedCategory, setSelectedCategory] = useState<IssueCategoryType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredNews = news.filter((item) => {
    if (selectedSido !== '전국' && item.sido !== selectedSido) return false;
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.media.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-wider mb-1">
          <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
          <span>실시간 전국 17개 시·도 지역 사회 뉴스 피드</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          실시간 우리 동네 사회 속보
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
          언론에 보도된 전국 지자체의 안전, 환경, 교통, 복지 사회 이슈를 실시간으로 모니터링하고, 필요 시 원클릭으로 시민 참여형 제보로 전환할 수 있습니다.
        </p>
      </div>

      {/* Filter bar */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="뉴스 제목, 언론사, 내용 키워드 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        {/* Region chips */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1 border-t border-slate-100 dark:border-slate-800/80">
          <button
            onClick={() => setSelectedSido('전국')}
            className={`px-2.5 py-1 text-xs rounded-md font-medium whitespace-nowrap transition-colors ${
              selectedSido === '전국'
                ? 'bg-amber-600 text-white'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            전국 전체
          </button>
          {Object.keys(REGION_CENTERS)
            .filter((s) => s !== '전국')
            .map((sido) => (
              <button
                key={sido}
                onClick={() => setSelectedSido(sido)}
                className={`px-2.5 py-1 text-xs rounded-md font-medium whitespace-nowrap transition-colors ${
                  selectedSido === sido
                    ? 'bg-amber-600 text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {sido}
              </button>
            ))}
        </div>

        {/* Category chips */}
        <div className="flex items-center gap-1 overflow-x-auto pt-1 text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-2.5 py-1 rounded-md font-medium ${
              selectedCategory === 'all'
                ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900'
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            전체 분야
          </button>
          {Object.values(CATEGORIES).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors flex items-center gap-1 ${
                selectedCategory === cat.id
                  ? 'bg-amber-600 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNews.length === 0 ? (
          <div className="col-span-full p-12 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-sm text-slate-500">
            해당 조건의 실시간 뉴스가 없습니다.
          </div>
        ) : (
          filteredNews.map((item) => {
            const cat = CATEGORIES[item.category];

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-4"
              >
                <div className="space-y-2">
                  {/* Unboxed Metadata */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-amber-700 dark:text-amber-400">
                      [{item.sido}]
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                      <span>{cat?.icon}</span>
                      <span>{cat?.name}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{item.media}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.publishedAt}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800 pt-3 text-xs">
                  <button
                    onClick={() => onConvertToIssue(item)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium shadow-xs transition-colors"
                    title="이 뉴스를 토대로 우리 동네 제보 폼 자동 작성"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>우리 동네 제보로 변환</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onNavigateToMap(item.sido)}
                      className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                      title={`${item.sido} 지도로 이동`}
                    >
                      지도 보기
                    </button>
                    <span className="text-slate-300 dark:text-slate-700">|</span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      <span>기사 원문</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
