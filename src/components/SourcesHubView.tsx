import React, { useState } from 'react';
import { HistoricalSource } from '../types';
import { HISTORICAL_SOURCES } from '../data/initialData';
import {
  Library,
  Search,
  ExternalLink,
  Copy,
  Check,
  BookMarked,
  Scroll
} from 'lucide-react';

export const SourcesHubView: React.FC = () => {
  const [sources, setSources] = useState<HistoricalSource[]>(HISTORICAL_SOURCES);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBook, setSelectedBook] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const majorCollections = [
    {
      title: '조선왕조실록',
      badge: '정사(正史)',
      desc: '태조부터 철종까지 472년간의 국정 일일 역사 기록 (유네스코 세계기록유산)',
      url: 'https://db.history.go.kr/sillok',
    },
    {
      title: '승정원일기',
      badge: '일차사료',
      desc: '국왕의 비서실인 승정원에서 기록한 세계 최대 단일 연대기 (유네스코 세계기록유산)',
      url: 'https://db.history.go.kr/sjw',
    },
    {
      title: '삼국사기 / 삼국유사',
      badge: '고대사 정사',
      desc: '고구려·백제·신라 3국의 역사와 설화, 불교 문화를 담은 최고의 고대 사서',
      url: 'https://db.history.go.kr/ancient',
    },
    {
      title: '고려사 / 고려사절요',
      badge: '고려 왕조 정사',
      desc: '고려 왕조 500년의 정치, 경제, 사회, 문화를 총망라한 정사 사서',
      url: 'https://db.history.go.kr',
    },
    {
      title: '각사등록 & 일성록',
      badge: '조선후기 공문서',
      desc: '조선 중앙 및 지방 관청의 공문서와 국왕의 일기 (유네스코 세계기록유산)',
      url: 'https://db.history.go.kr',
    },
    {
      title: '대한민국 임시정부 자료집',
      badge: '근현대사',
      desc: '일제강점기 독립운동과 대한민국 임시정부의 공식 활동 및 외교 사료',
      url: 'https://db.history.go.kr',
    },
  ];

  const bookFilters = [
    { id: 'all', label: '전체 사료' },
    { id: '실록', label: '조선왕조실록' },
    { id: '삼국사기', label: '삼국사기·고대사' },
    { id: '고려사', label: '고려사·절요' },
    { id: '어찰', label: '정조어찰첩·간찰' },
  ];

  const filteredSources = sources.filter((src) => {
    if (selectedBook !== 'all') {
      if (!src.bookName.includes(selectedBook)) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        src.title.toLowerCase().includes(q) ||
        src.bookName.toLowerCase().includes(q) ||
        src.originalText.toLowerCase().includes(q) ||
        src.translation.toLowerCase().includes(q) ||
        (src.debateTitle && src.debateTitle.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleCopyQuote = (src: HistoricalSource) => {
    const textToCopy = `[${src.bookName} ${src.dateRecorded}]\n한문 원문: ${src.originalText}\n국역: ${src.translation}\n출처: ${src.sourceDbUrl}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(src.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 text-xs font-semibold mb-1">
          <Scroll className="w-3.5 h-3.5" />
          <span>국사편찬위원회 한국사데이터베이스 (db.history.go.kr) 공식 아카이브</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white tracking-tight">
          한국사 사료 아카이브 허브
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl leading-relaxed">
          역사 토론과 지역 역사 연구에 인용된 모든 사료의 한문 원문과 국역 현대어 번역, 출처 링크를 한곳에서 조회하고 발췌할 수 있습니다.
        </p>
      </div>

      {/* Major Collections Overview Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          한국사 주요 사료군 안내 (국사편찬위원회 정사 DB)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {majorCollections.map((col, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 mb-1">
                  {col.badge}
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {col.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                  {col.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <a
                  href={col.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-xs text-amber-600 hover:text-amber-700 font-medium"
                >
                  <span>사료 원문 DB 조회</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="사료명, 한문 구절, 국역 번역, 토론 주제 키워드로 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs pt-1">
          {bookFilters.map((bf) => (
            <button
              key={bf.id}
              onClick={() => setSelectedBook(bf.id)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedBook === bf.id
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {bf.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sources Feed */}
      <div className="space-y-4">
        <div className="text-xs text-slate-500 dark:text-slate-400">
          총 <strong className="text-slate-900 dark:text-white tabular-nums">{filteredSources.length}</strong>건의 공인 사료 기록이 조회되었습니다.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSources.map((src) => (
            <div
              key={src.id}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="font-semibold text-amber-700 dark:text-amber-400">
                    {src.bookName} · {src.dateRecorded}
                  </span>
                  {src.stanceHint && (
                    <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                      [{src.stanceHint === 'PRO' ? '긍정/실리론' : '비판/명분론'}]
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  {src.title}
                </h4>

                {/* Classical Chinese */}
                <div className="bg-amber-50/50 dark:bg-amber-950/20 p-3 rounded-lg border border-amber-200/50 dark:border-amber-900/40 text-xs sm:text-sm font-serif leading-relaxed text-slate-800 dark:text-slate-200">
                  {src.originalText}
                </div>

                {/* Modern Translation */}
                <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>[국역]</strong> {src.translation}
                </div>

                <div className="text-xs text-amber-800 dark:text-amber-300 font-medium bg-slate-50 dark:bg-slate-800 p-2 rounded">
                  📌 {src.keyQuote}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3 text-xs">
                <button
                  onClick={() => handleCopyQuote(src)}
                  className="flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-amber-600 transition-colors"
                >
                  {copiedId === src.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600 font-medium">복사 완료!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>사료 인용구 복사</span>
                    </>
                  )}
                </button>

                <a
                  href={src.sourceDbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-amber-600 hover:text-amber-700 font-medium"
                >
                  <span>db.history.go.kr 원문</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
