import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  WorldHistoryEvent,
  ContinentType,
  EraType,
  EventCategoryType
} from '../types';
import {
  WORLD_CONTINENTS,
  WORLD_ERAS,
  EVENT_CATEGORIES
} from '../data/worldHistoryData';
import {
  Search,
  Globe2,
  Calendar,
  Filter,
  BookOpen,
  HelpCircle,
  MapPin,
  Scroll,
  ChevronRight,
  Sparkles,
  Star
} from 'lucide-react';

interface WorldMapViewProps {
  events: WorldHistoryEvent[];
  selectedEvent: WorldHistoryEvent | null;
  onSelectEvent: (event: WorldHistoryEvent) => void;
  onGoToDebate: (debateId: string) => void;
  onGoToQuizForEvent: (event: WorldHistoryEvent) => void;
  onProposeEvent: (lat: number, lng: number) => void;
  onNavigateToChronology?: () => void;
}


export const WorldMapView: React.FC<WorldMapViewProps> = ({
  events,
  selectedEvent,
  onSelectEvent,
  onGoToDebate,
  onGoToQuizForEvent,
  onProposeEvent,
  onNavigateToChronology,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const markerMapRef = useRef<Map<string, L.Marker>>(new Map());

  const [onlyMajor, setOnlyMajor] = useState<boolean>(true);
  const [selectedContinent, setSelectedContinent] = useState<ContinentType>('ALL');
  const [selectedEra, setSelectedEra] = useState<EraType>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<EventCategoryType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [28.0, 15.0],
      zoom: 2,
      minZoom: 2,
      maxZoom: 18,
      zoomControl: true,
      worldCopyJump: true,
    });

    // Clean CartoDB Voyager or OpenStreetMap tiles suitable for historical maps
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    const markersGroup = L.layerGroup().addTo(map);
    markersLayerRef.current = markersGroup;
    mapInstanceRef.current = map;

    // Map click to propose new event
    map.on('click', (e: L.LeafletMouseEvent) => {
      onProposeEvent(e.latlng.lat, e.latlng.lng);
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Filter events (if an event is specifically selected, ensure it's not filtered out)
  const filteredEvents = events.filter((ev) => {
    const isTarget = selectedEvent?.id === ev.id;
    if (!isTarget && onlyMajor && !ev.isMajor) return false;
    if (!isTarget && selectedContinent !== 'ALL' && ev.continent !== selectedContinent) return false;
    if (!isTarget && selectedEra !== 'ALL' && ev.era !== selectedEra) return false;
    if (!isTarget && selectedCategory !== 'all' && ev.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        ev.title.toLowerCase().includes(q) ||
        ev.country.toLowerCase().includes(q) ||
        ev.city.toLowerCase().includes(q) ||
        ev.figures.toLowerCase().includes(q) ||
        ev.summary.toLowerCase().includes(q) ||
        ev.yearDisplay.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Render markers on map
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();
    markerMapRef.current.clear();

    filteredEvents.forEach((ev) => {
      const cat = EVENT_CATEGORIES[ev.category];
      const hasDebate = Boolean(ev.relatedDebateId);

      const markerHtml = `
        <div style="background-color: ${cat?.color || '#b45309'}; width: 38px; height: 38px; border: 2.5px solid ${ev.isMajor ? '#f59e0b' : hasDebate ? '#fef08a' : '#ffffff'}; display: flex; align-items: center; justify-content: center; font-size: 16px; border-radius: 9999px; box-shadow: 0 4px 14px rgba(0,0,0,0.38); position: relative;">
          ${cat?.icon || '🏛️'}
          ${ev.isMajor ? '<span style="position: absolute; bottom: -3px; right: -3px; font-size: 11px; line-height: 1;">⭐</span>' : ''}
          ${hasDebate ? '<span style="position: absolute; top: -3px; right: -3px; width: 10px; height: 10px; background: #e11d48; border: 2px solid white; border-radius: 9999px;"></span>' : ''}
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-marker-pin',
        html: markerHtml,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -20],
      });

      const marker = L.marker([ev.lat, ev.lng], { icon: customIcon });

      const popupHtml = `
        <div style="font-family: inherit; min-width: 220px; max-width: 280px;">
          <div style="font-size: 11px; font-weight: bold; color: ${cat?.color || '#b45309'}; margin-bottom: 2px;">
            ${cat?.name || '역사 사건'} · ${ev.yearDisplay}
          </div>
          <h4 style="font-size: 13px; font-weight: bold; margin: 0 0 4px 0; color: #0f172a; line-height: 1.3;">
            ${ev.title}
          </h4>
          <p style="font-size: 11px; color: #64748b; margin: 0 0 6px 0;">
            📍 ${ev.city}, ${ev.country}
          </p>
          <p style="font-size: 11px; color: #334155; line-height: 1.4; margin: 0 0 8px 0;">
            ${ev.summary.slice(0, 90)}...
          </p>
          <div style="font-size: 10px; color: #b45309; border-top: 1px solid #e2e8f0; padding-top: 6px; font-weight: 600;">
            클릭하여 상세 기록 및 사료 토론·퀴즈 확인 ➔
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, { className: 'custom-popup' });
      marker.on('click', () => {
        onSelectEvent(ev);
      });

      markersLayerRef.current?.addLayer(marker);
      markerMapRef.current.set(ev.id, marker);
    });
  }, [filteredEvents]);

  // Fly to and open popup when selectedEvent changes
  useEffect(() => {
    if (!selectedEvent || !mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo([selectedEvent.lat, selectedEvent.lng], 6, {
      duration: 1.2,
    });
    const timer = setTimeout(() => {
      const marker = markerMapRef.current.get(selectedEvent.id);
      if (marker) {
        marker.openPopup();
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [selectedEvent]);

  // Handle fly to Continent
  const handleContinentClick = (cont: ContinentType) => {
    setSelectedContinent(cont);
    const info = WORLD_CONTINENTS[cont];
    if (info && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([info.lat, info.lng], info.zoom, {
        duration: 1.5,
      });
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-7.5rem)] min-h-[580px] overflow-hidden flex flex-col">
      {/* Continental Jump Chips & Era Timeline Header */}
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-20 px-4 py-2 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Continent Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 shrink-0 flex items-center gap-1 mr-1">
              <Globe2 className="w-3.5 h-3.5 text-amber-600" />
              <span>대륙별:</span>
            </span>
            {(Object.keys(WORLD_CONTINENTS) as ContinentType[]).map((cont) => (
              <button
                key={cont}
                onClick={() => handleContinentClick(cont)}
                className={`px-3 py-1 text-xs rounded-lg font-medium whitespace-nowrap transition-colors shrink-0 ${
                  selectedContinent === cont
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {WORLD_CONTINENTS[cont].name}
              </button>
            ))}
          </div>

          {/* Era Filter Selector & Major Toggle */}
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-none py-1 text-xs">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="font-bold text-slate-500 dark:text-slate-400 shrink-0 flex items-center gap-1 mr-1">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <span>시대별:</span>
              </span>
              {(Object.keys(WORLD_ERAS) as EraType[]).map((era) => (
                <button
                  key={era}
                  onClick={() => setSelectedEra(era)}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium whitespace-nowrap transition-colors shrink-0 ${
                    selectedEra === era
                      ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {WORLD_ERAS[era]}
                </button>
              ))}
            </div>

            {/* Major Events Only Toggle */}
            <button
              onClick={() => setOnlyMajor(!onlyMajor)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all shrink-0 shadow-xs ${
                onlyMajor
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
              title={onlyMajor ? '현재 지도에 주요 핵심 사건만 표시 중' : '모든 세부 사건 표시 중'}
            >
              <Star className={`w-3.5 h-3.5 ${onlyMajor ? 'fill-current' : ''}`} />
              <span>{onlyMajor ? '⭐ 주요 사건만 보기' : '전체 사건 표시'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Map & Event Drawer */}
      <div className="relative flex-1 w-full h-full">
        {/* Leaflet map */}
        <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-0" />

        {/* Floating Side Drawer */}
        <div
          className={`absolute top-4 left-4 z-20 w-80 sm:w-96 max-h-[calc(100%-2rem)] flex flex-col bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 transition-all duration-300 ${
            isDrawerOpen ? 'translate-x-0' : '-translate-x-[calc(100%+1.5rem)]'
          }`}
        >
          {/* Drawer Header */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-black text-amber-600 text-base">史</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  {selectedContinent === 'ALL'
                    ? '전세계 역사 사건 목록'
                    : `${WORLD_CONTINENTS[selectedContinent].name} 역사 사건`}
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                조회된 사건 <strong className="text-amber-600 tabular-nums">{filteredEvents.length}</strong>건
              </p>
            </div>
            <div className="text-[10px] text-slate-400">
              핀 클릭 시 줌인
            </div>
          </div>

          {/* Chronology View Navigation Callout */}
          {onNavigateToChronology && (
            <div className="mx-3 mt-3 p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex items-center justify-between gap-2 shadow-xs">
              <div className="min-w-0">
                <div className="font-bold text-xs text-amber-900 dark:text-amber-200 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>시대·나라별 역사 도감</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 truncate">
                  전체 사건을 시대순·국가별로 한눈에 확인
                </p>
              </div>
              <button
                onClick={onNavigateToChronology}
                className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] whitespace-nowrap shadow-xs transition-colors shrink-0"
              >
                도감 보기 ➔
              </button>
            </div>
          )}

          {/* Search & Category Filter */}
          <div className="p-3 border-b border-slate-100 dark:border-slate-800 space-y-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="사건명, 인물, 국가, 도시 검색 (예: 바스티유, 카이사르, 이순신)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            {/* Category chips */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-2 py-0.5 text-[11px] rounded font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900'
                    : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
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
                    className={`px-2 py-0.5 text-[11px] rounded font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
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

          {/* Events Scroll List */}
          <div className="flex-1 overflow-y-auto p-2.5 space-y-2.5">
            {filteredEvents.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                해당 조건의 세계사 사건이 없습니다.
              </div>
            ) : (
              filteredEvents.map((ev) => {
                const cat = EVENT_CATEGORIES[ev.category];
                const isSelected = selectedEvent?.id === ev.id;
                const hasDebate = Boolean(ev.relatedDebateId);

                return (
                  <div
                    key={ev.id}
                    onClick={() => {
                      onSelectEvent(ev);
                      if (mapInstanceRef.current) {
                        mapInstanceRef.current.flyTo([ev.lat, ev.lng], 7, {
                          duration: 1.2,
                        });
                      }
                    }}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    {/* Unboxed Metadata Line */}
                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                      <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                        <span>{cat?.icon}</span>
                        <span>{ev.yearDisplay}</span>
                      </span>
                      <span className="text-amber-700 dark:text-amber-400 font-medium">
                        {ev.city}, {ev.country}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug mb-1">
                      {ev.title}
                    </h4>

                    <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-2">
                      {ev.summary}
                    </p>

                    <div className="flex items-center justify-between pt-1.5 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                      <span className="text-slate-400 truncate max-w-[150px]">
                        {ev.figures}
                      </span>

                      <div className="flex items-center gap-2">
                        {hasDebate && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onGoToDebate(ev.relatedDebateId!);
                            }}
                            className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold hover:bg-amber-200"
                          >
                            토론 참여
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onGoToQuizForEvent(ev);
                          }}
                          className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 font-bold hover:bg-blue-200"
                        >
                          퀴즈 풀기
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Drawer Toggle Handle */}
        <button
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className={`absolute top-4 z-20 p-2 rounded-r-xl bg-white dark:bg-slate-900 shadow-md border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-amber-600 transition-all ${
            isDrawerOpen ? 'left-[20rem] sm:left-[24rem]' : 'left-0'
          }`}
          title={isDrawerOpen ? '목록 접기' : '목록 열기'}
        >
          {isDrawerOpen ? '◀' : '▶'}
        </button>

        {/* World Map Legend & Help Note */}
        <div className="absolute bottom-4 right-4 z-10 bg-slate-900/90 backdrop-blur-xs text-white text-[11px] p-3 rounded-xl shadow-lg space-y-1.5 hidden md:block max-w-xs">
          <div className="font-bold text-amber-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>세계 역사 지도 가이드</span>
          </div>
          <p className="text-slate-300 leading-relaxed text-[11px]">
            지도 위의 마커를 클릭하면 당시 공인 사료 인용구, 역사적 의의와 함께 <strong>사료 토론</strong> 및 <strong>세계사 퀴즈</strong>로 직결됩니다.
          </p>
        </div>
      </div>
    </div>
  );
};
