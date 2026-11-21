import React, { useState, useMemo } from 'react';
import {
  WorldHistoryEvent,
  EraType,
  ContinentType,
  EventCategoryType
} from '../types';
import {
  WORLD_ERAS,
  EVENT_CATEGORIES,
  HISTORICAL_COUNTRIES,
  CountryFilterInfo
} from '../data/worldHistoryData';
import {
  BookOpen,
  Calendar,
  Globe2,
  Search,
  Filter,
  MapPin,
  Users,
  Scroll,
  HelpCircle,
  ExternalLink,
  Sparkles,
  Star,
  ChevronDown,
  ChevronUp,
  Layers,
  Award
} from 'lucide-react';

interface HistoryChronologyViewProps {
  events: WorldHistoryEvent[];
  onNavigateToMapEvent: (eventId: string) => void;
  onGoToDebate: (debateId: string) => void;
  onGoToQuizForEvent: (event: WorldHistoryEvent) => void;
}

export const HistoryChronologyView: React.FC<HistoryChronologyViewProps> = ({
  events,
  onNavigateToMapEvent,
  onGoToDebate,
  onGoToQuizForEvent,
}) => {
  // Classification mode: 'era' (시대별 연표) vs 'country' (나라별 분류)
  const [viewMode, setViewMode] = useState<'era' | 'country'>('era');
  const [selectedEra, setSelectedEra] = useState<EraType>('ALL');
  const [selectedCountry, setSelectedCountry] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<EventCategoryType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyMajor, setOnlyMajor] = useState<boolean>(false);
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

  // Filter events
  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      if (onlyMajor && !ev.isMajor) return false;
      if (viewMode === 'era' && selectedEra !== 'ALL' && ev.era !== selectedEra) return false;
      if (viewMode === 'country' && selectedCountry !== 'ALL') {
        if (selectedCountry === '중동') {
          if (!ev.country.includes('이라크') && !ev.country.includes('튀르키예') && !ev.country.includes('오스만') && !ev.country.includes('바빌론')) {
            return false;
          }
        } else if (selectedCountry === '기타') {
          if (ev.country.includes('한국') || ev.country.includes('프랑스') || ev.country.includes('미국') || ev.country.includes('영국') || ev.country.includes('독일') || ev.country.includes('이탈리아') || ev.country.includes('중국') || ev.country.includes('일본') || ev.country.includes('러시아') || ev.country.includes('그리스')) {
            return false;
          }
        } else if (!ev.country.includes(selectedCountry)) {
          return false;
        }
      }
      if (selectedCategory !== 'all' && ev.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          ev.title.toLowerCase().includes(q) ||
          ev.country.toLowerCase().includes(q) ||
          ev.city.toLowerCase().includes(q) ||
          ev.figures.toLowerCase().includes(q) ||
          ev.summary.toLowerCase().includes(q) ||
          ev.yearDisplay.toLowerCase().includes(q) ||
          (ev.primarySourceQuote?.text && ev.primarySourceQuote.text.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [events, onlyMajor, viewMode, selectedEra, selectedCountry, selectedCategory, searchQuery]);

  // Grouping for Era View
  const eraOrder: EraType[] = ['ANCIENT', 'MEDIEVAL', 'EARLY_MODERN', 'MODERN', 'CONTEMPORARY'];
  const groupedByEra = useMemo(() => {
    const groups: Record<EraType, WorldHistoryEvent[]> = {
      ANCIENT: [],
      MEDIEVAL: [],
      EARLY_MODERN: [],
      MODERN: [],
      CONTEMPORARY: [],
      ALL: [],
    };
    filteredEvents.forEach((ev) => {
      if (groups[ev.era]) {
        groups[ev.era].push(ev);
      }
    });
    // Sort each group chronologically by year
    eraOrder.forEach((era) => {
      groups[era].sort((a, b) => a.year - b.year);
    });
    return groups;
  }, [filteredEvents]);

  // Grouping for Country View
  const groupedByCountry = useMemo(() => {
    const groups: Record<string, { info: CountryFilterInfo; events: WorldHistoryEvent[] }> = {};

    HISTORICAL_COUNTRIES.filter((c) => c.id !== 'ALL').forEach((country) => {
      groups[country.id] = { info: country, events: [] };
    });

    filteredEvents.forEach((ev) => {
      let matchedId = '기타';
      for (const country of HISTORICAL_COUNTRIES) {
        if (country.id === 'ALL' || country.id === '기타') continue;
        if (country.id === '중동') {
          if (ev.country.includes('이라크') || ev.country.includes('튀르키예') || ev.country.includes('오스만') || ev.country.includes('바빌론')) {
            matchedId = '중동';
            break;
          }
        } else if (ev.country.includes(country.id)) {
          matchedId = country.id;
          break;
        }
      }
      if (!groups[matchedId]) {
        groups[matchedId] = {
          info: { id: matchedId, name: matchedId, flag: '🌍' },
          events: []
        };
      }
      groups[matchedId].events.push(ev);
    });

    // Sort events in each country by year
    Object.keys(groups).forEach((key) => {
      groups[key].events.sort((a, b) => a.year - b.year);
    });

    return groups;
  }, [filteredEvents]);

  // Distinct countries count
  const coveredCountriesCount = useMemo(() => {
    const set = new Set(events.map((e) => e.country.split(' ')[0]));
    return set.size;
  }, [events]);

  const majorCount = useMemo(() => {
    return events.filter((e) => e.isMajor).length;
  }, [events]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400">
            <span className="font-serif text-sm">史</span>
            <span>시대별·나라별 세계 역사 사건 총람 &amp; 1차 사료 아카이브</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white tracking-tight">
            세계 역사 사건 도감 &amp; 연표
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            지도의 주요 핀과 연계되어, 고대 메소포타미아·그리스·춘추전국시대부터 현대 냉전 종식까지 인류사의 모든 분기점을 <strong>시대별(고대~현대)</strong> 및 <strong>나라별(한국·프랑스·미국·영국·중국 등)</strong>로 체계적으로 분류하여 제공합니다.
          </p>
        </div>

        {/* View Mode Toggle: Era vs Country */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 shrink-0 text-xs">
          <button
            onClick={() => setViewMode('era')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold transition-all ${
              viewMode === 'era'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>시대별 연표 보기</span>
          </button>
          <button
            onClick={() => setViewMode('country')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold transition-all ${
              viewMode === 'country'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Globe2 className="w-4 h-4" />
            <span>나라·지역별 분류 보기</span>
          </button>
        </div>
      </div>

      {/* 2. Quick Metrics Strip (Unboxed metadata) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] text-slate-500 dark:text-slate-400">총 수록 역사 사건</span>
          <div className="text-xl font-bold text-slate-900 dark:text-white tabular-nums mt-0.5">
            {events.length}건
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 shadow-xs">
          <span className="text-[11px] text-amber-800 dark:text-amber-300">지도 표시 주요 핵심 사건</span>
          <div className="text-xl font-bold text-amber-600 dark:text-amber-400 tabular-nums mt-0.5">
            {majorCount}건
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 shadow-xs">
          <span className="text-[11px] text-blue-800 dark:text-blue-300">수록 국가 및 문명권</span>
          <div className="text-xl font-bold text-blue-600 dark:text-blue-400 tabular-nums mt-0.5">
            {coveredCountriesCount}개 권역
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 shadow-xs">
          <span className="text-[11px] text-emerald-800 dark:text-emerald-300">현재 조건 검색 결과</span>
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums mt-0.5">
            {filteredEvents.length}건
          </div>
        </div>
      </div>

      {/* 3. Search & Category Filters Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="사건명, 인물, 국가, 도시, 사료 인용구 검색 (예: 훈민정음, 카이사르, 함무라비, 링컨, 바스티유)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          {/* Toggle for Major Only */}
          <button
            onClick={() => setOnlyMajor(!onlyMajor)}
            className={`flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
              onlyMajor
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${onlyMajor ? 'fill-current' : ''}`} />
            <span>{onlyMajor ? '⭐ 주요 핵심 사건만 표시 중' : '전체 상세 사건 표시'}</span>
          </button>
        </div>

        {/* Secondary Filter Chips */}
        {viewMode === 'era' ? (
          /* Era Filter Chips */
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1 border-t border-slate-100 dark:border-slate-800/80 text-xs">
            <span className="font-bold text-slate-500 dark:text-slate-400 shrink-0 mr-1">
              시대 선택:
            </span>
            {(Object.keys(WORLD_ERAS) as EraType[]).map((eraKey) => (
              <button
                key={eraKey}
                onClick={() => setSelectedEra(eraKey)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors shrink-0 ${
                  selectedEra === eraKey
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {WORLD_ERAS[eraKey]}
              </button>
            ))}
          </div>
        ) : (
          /* Country Filter Chips */
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1 border-t border-slate-100 dark:border-slate-800/80 text-xs">
            <span className="font-bold text-slate-500 dark:text-slate-400 shrink-0 mr-1">
              국가 선택:
            </span>
            {HISTORICAL_COUNTRIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCountry(c.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors shrink-0 ${
                  selectedCountry === c.id
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{c.flag}</span>
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        )}

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pt-1 text-xs">
          <span className="font-bold text-slate-500 dark:text-slate-400 shrink-0 mr-1">
            분야 필터:
          </span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            전체 분야
          </button>
          {(Object.keys(EVENT_CATEGORIES) as EventCategoryType[]).map((catKey) => {
            const cat = EVENT_CATEGORIES[catKey];
            return (
              <button
                key={catKey}
                onClick={() => setSelectedCategory(catKey)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-colors shrink-0 ${
                  selectedCategory === catKey
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Main Event Cards List */}
      <div className="space-y-10">
        {filteredEvents.length === 0 ? (
          <div className="p-16 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500 space-y-2">
            <p className="text-sm">해당 조건에 일치하는 역사 사건이 없습니다.</p>
            <button
              onClick={() => {
                setSelectedEra('ALL');
                setSelectedCountry('ALL');
                setSelectedCategory('all');
                setSearchQuery('');
                setOnlyMajor(false);
              }}
              className="text-xs text-amber-600 hover:underline font-semibold"
            >
              모든 필터 초기화
            </button>
          </div>
        ) : viewMode === 'era' ? (
          /* ERA CHRONOLOGY VIEW */
          eraOrder
            .filter((era) => selectedEra === 'ALL' || selectedEra === era)
            .map((era) => {
              const eraEvents = groupedByEra[era];
              if (eraEvents.length === 0) return null;

              return (
                <section key={era} className="space-y-4">
                  {/* Era Section Banner */}
                  <div className="flex items-center justify-between border-b-2 border-amber-600/40 dark:border-amber-500/40 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-600 text-white font-serif font-bold text-sm flex items-center justify-center">
                        {era === 'ANCIENT'
                          ? '古'
                          : era === 'MEDIEVAL'
                          ? '中'
                          : era === 'EARLY_MODERN'
                          ? '近'
                          : era === 'MODERN'
                          ? '現'
                          : '今'}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white">
                          {WORLD_ERAS[era]}
                        </h3>
                      </div>
                    </div>
                    <span className="text-xs text-slate-500 tabular-nums font-medium">
                      사건 <strong className="text-amber-600">{eraEvents.length}</strong>건
                    </span>
                  </div>

                  {/* Era Events Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {eraEvents.map((ev) => (
                      <EventChronologyCard
                        key={ev.id}
                        event={ev}
                        isExpanded={expandedEventId === ev.id}
                        onToggleExpand={() =>
                          setExpandedEventId(expandedEventId === ev.id ? null : ev.id)
                        }
                        onNavigateToMapEvent={onNavigateToMapEvent}
                        onGoToDebate={onGoToDebate}
                        onGoToQuizForEvent={onGoToQuizForEvent}
                      />
                    ))}
                  </div>
                </section>
              );
            })
        ) : (
          /* COUNTRY DIRECTORY VIEW */
          Object.keys(groupedByCountry)
            .filter((countryId) => selectedCountry === 'ALL' || selectedCountry === countryId)
            .map((countryId) => {
              const countryGroup = groupedByCountry[countryId];
              if (!countryGroup || countryGroup.events.length === 0) return null;

              return (
                <section key={countryId} className="space-y-4">
                  {/* Country Section Banner */}
                  <div className="flex items-center justify-between border-b-2 border-slate-300 dark:border-slate-700 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{countryGroup.info.flag}</span>
                      <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white">
                        {countryGroup.info.name} 역사 사건
                      </h3>
                    </div>
                    <span className="text-xs text-slate-500 tabular-nums font-medium">
                      수록 사건 <strong className="text-amber-600">{countryGroup.events.length}</strong>건
                    </span>
                  </div>

                  {/* Country Events Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {countryGroup.events.map((ev) => (
                      <EventChronologyCard
                        key={ev.id}
                        event={ev}
                        isExpanded={expandedEventId === ev.id}
                        onToggleExpand={() =>
                          setExpandedEventId(expandedEventId === ev.id ? null : ev.id)
                        }
                        onNavigateToMapEvent={onNavigateToMapEvent}
                        onGoToDebate={onGoToDebate}
                        onGoToQuizForEvent={onGoToQuizForEvent}
                      />
                    ))}
                  </div>
                </section>
              );
            })
        )}
      </div>
    </div>
  );
};

// Reusable Subcomponent for Event Card
interface EventChronologyCardProps {
  event: WorldHistoryEvent;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onNavigateToMapEvent: (eventId: string) => void;
  onGoToDebate: (debateId: string) => void;
  onGoToQuizForEvent: (event: WorldHistoryEvent) => void;
}

const EventChronologyCard: React.FC<EventChronologyCardProps> = ({
  event,
  isExpanded,
  onToggleExpand,
  onNavigateToMapEvent,
  onGoToDebate,
  onGoToQuizForEvent,
}) => {
  const cat = EVENT_CATEGORIES[event.category];

  return (
    <article
      className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all p-5 shadow-xs flex flex-col justify-between ${
        event.isMajor
          ? 'border-amber-300/80 dark:border-amber-900/60 ring-1 ring-amber-500/10'
          : 'border-slate-200 dark:border-slate-800'
      }`}
    >
      <div className="space-y-3">
        {/* Unboxed Metadata Line with separators */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold flex items-center gap-1" style={{ color: cat?.color }}>
              <span>{cat?.icon}</span>
              <span>{cat?.name}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-bold text-amber-700 dark:text-amber-400 tabular-nums">
              {event.yearDisplay}
            </span>
            <span aria-hidden="true">·</span>
            <span>{event.city}, {event.country}</span>
          </div>

          {event.isMajor && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-900/60">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span>주요 핵심 사건</span>
            </span>
          )}
        </div>

        {/* Title */}
        <h4 className="text-base sm:text-lg font-bold font-serif text-slate-900 dark:text-white leading-snug">
          {event.title}
        </h4>

        {/* Figures */}
        <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
          <Users className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span className="font-medium">주요 인물: {event.figures}</span>
        </div>

        {/* Narrative / Summary */}
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          {isExpanded ? event.detailedDescription : event.summary}
        </p>

        {/* Primary Source Citation Box (Always visible or expanded) */}
        {event.primarySourceQuote && (
          <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40 space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-[11px] font-bold text-amber-900 dark:text-amber-200">
              <span className="flex items-center gap-1">
                <Scroll className="w-3.5 h-3.5 text-amber-600" />
                <span>공인 1차 사료 원문</span>
              </span>
              <span className="font-normal text-slate-500 dark:text-slate-400">
                {event.primarySourceQuote.sourceName}
              </span>
            </div>

            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-amber-200/50 dark:border-amber-900/30 font-serif leading-relaxed text-slate-800 dark:text-slate-200 text-xs">
              "{event.primarySourceQuote.text}"
            </div>

            {event.primarySourceQuote.translation && (
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                💡 {event.primarySourceQuote.translation}
              </p>
            )}
          </div>
        )}

        {/* Historical Significance (Expanded) */}
        {isExpanded && event.historicalSignificance && (
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1 text-xs">
            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>세계사적 의의</span>
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {event.historicalSignificance}
            </p>
          </div>
        )}
      </div>

      {/* Card Actions & Direct Links */}
      <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
        <button
          onClick={onToggleExpand}
          className="text-slate-500 hover:text-slate-800 dark:hover:text-white font-medium flex items-center gap-1"
        >
          <span>{isExpanded ? '상세 접기' : '상세 배경 더보기'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onNavigateToMapEvent(event.id)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-amber-500 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors"
            title="세계 지도에서 이 사건의 위치로 이동"
          >
            <MapPin className="w-3 h-3 text-amber-600" />
            <span>지도 위치</span>
          </button>

          {event.relatedDebateId && (
            <button
              onClick={() => onGoToDebate(event.relatedDebateId!)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 font-semibold text-xs hover:bg-amber-200 transition-colors"
            >
              <BookOpen className="w-3 h-3" />
              <span>토론</span>
            </button>
          )}

          <button
            onClick={() => onGoToQuizForEvent(event)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200 font-semibold text-xs hover:bg-blue-200 transition-colors"
          >
            <HelpCircle className="w-3 h-3" />
            <span>퀴즈</span>
          </button>
        </div>
      </div>
    </article>
  );
};
