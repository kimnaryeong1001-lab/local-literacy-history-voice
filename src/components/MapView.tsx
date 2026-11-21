import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  CivicIssue,
  HistoricalSitePin,
  IssueCategoryType,
  IssueStatusType,
  RegionInfo
} from '../types';
import { REGION_CENTERS, CATEGORIES, ISSUE_STATUS } from '../data/initialData';
import {
  Search,
  Crosshair,
  Filter,
  CheckCircle,
  Clock,
  AlertTriangle,
  History,
  ExternalLink,
  ThumbsUp,
  MapPin,
  Layers
} from 'lucide-react';

interface MapViewProps {
  issues: CivicIssue[];
  historicalSites: HistoricalSitePin[];
  selectedIssue: CivicIssue | null;
  onSelectIssue: (issue: CivicIssue) => void;
  onSelectSite: (site: HistoricalSitePin) => void;
  onLikeIssue: (id: string) => void;
  onOpenReportModalWithCoords: (lat: number, lng: number, address?: string) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  issues,
  historicalSites,
  selectedIssue,
  onSelectIssue,
  onSelectSite,
  onLikeIssue,
  onOpenReportModalWithCoords,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const sitesLayerRef = useRef<L.LayerGroup | null>(null);

  const [selectedSido, setSelectedSido] = useState<string>('전국');
  const [selectedCategory, setSelectedCategory] = useState<IssueCategoryType | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<IssueStatusType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showHistoryPins, setShowHistoryPins] = useState<boolean>(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [36.3, 127.8],
      zoom: 7,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    const markersGroup = L.layerGroup().addTo(map);
    const sitesGroup = L.layerGroup().addTo(map);

    markersLayerRef.current = markersGroup;
    sitesLayerRef.current = sitesGroup;
    mapInstanceRef.current = map;

    // Click on map to report
    map.on('click', async (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      // Fetch reverse geocode via OSM Nominatim
      let resolvedAddress = '';
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
          { headers: { 'Accept-Language': 'ko' } }
        );
        if (res.ok) {
          const data = await res.json();
          resolvedAddress = data.display_name || '';
        }
      } catch (err) {
        console.warn('Geocoding error:', err);
      }
      onOpenReportModalWithCoords(lat, lng, resolvedAddress);
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Filter issues
  const filteredIssues = issues.filter((issue) => {
    if (selectedSido !== '전국' && issue.region_sido !== selectedSido) {
      return false;
    }
    if (selectedCategory !== 'all' && issue.category !== selectedCategory) {
      return false;
    }
    if (selectedStatus !== 'all' && issue.status !== selectedStatus) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = issue.title.toLowerCase().includes(q);
      const matchDesc = issue.description.toLowerCase().includes(q);
      const matchAddr = issue.address.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchAddr) return false;
    }
    return true;
  });

  // Filter historical sites
  const filteredSites = historicalSites.filter((site) => {
    if (selectedSido !== '전국' && site.region_sido !== selectedSido) {
      return false;
    }
    return true;
  });

  // Update map markers
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current || !sitesLayerRef.current)
      return;

    markersLayerRef.current.clearLayers();
    sitesLayerRef.current.clearLayers();

    // 1. Add Civic Issues Markers
    filteredIssues.forEach((issue) => {
      const cat = CATEGORIES[issue.category];
      const iconHtml = `
        <div style="background-color: ${cat?.color || '#e74c3c'}; width: 34px; height: 34px; border: 2.5px solid white; display: flex; align-items: center; justify-content: center; font-size: 16px; border-radius: 9999px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
          ${cat?.icon || '📍'}
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-marker-pin',
        html: iconHtml,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
        popupAnchor: [0, -18],
      });

      const lat = issue.latitude ?? issue.lat ?? 37.5665;
      const lng = issue.longitude ?? issue.lng ?? 126.978;
      const marker = L.marker([lat, lng], {
        icon: customIcon,
      });

      const popupContent = `
        <div style="font-family: inherit; min-width: 200px;">
          <div style="font-size: 11px; font-weight: 600; color: ${cat?.color || '#666'}; margin-bottom: 2px;">
            ${cat?.name || '지역 문제'} · ${issue.region_sido} ${issue.region_gugun}
          </div>
          <h4 style="font-size: 13px; font-weight: bold; margin: 0 0 6px 0; color: #1e293b;">
            ${issue.title}
          </h4>
          <p style="font-size: 11px; color: #64748b; margin: 0 0 8px 0; line-height: 1.4;">
            ${issue.address}
          </p>
          <div style="display: flex; align-items: center; justify-content: space-between; font-size: 11px; border-top: 1px solid #e2e8f0; padding-top: 6px;">
            <span style="font-weight: 600; color: ${
              issue.status === 'resolved'
                ? '#16a34a'
                : issue.status === 'in_progress'
                ? '#2563eb'
                : '#ca8a04'
            };">
              ${ISSUE_STATUS[issue.status]?.label || issue.status}
            </span>
            <span style="color: #64748b;">❤️ ${issue.likeCount}</span>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, { className: 'custom-popup' });
      marker.on('click', () => {
        onSelectIssue(issue);
      });

      markersLayerRef.current?.addLayer(marker);
    });

    // 2. Add Historical Heritage Markers
    if (showHistoryPins) {
      filteredSites.forEach((site) => {
        const siteIconHtml = `
          <div style="background: linear-gradient(135deg, #b45309, #78350f); width: 34px; height: 34px; border: 2.5px solid #fef3c7; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 900; color: #fff; border-radius: 9999px; box-shadow: 0 4px 10px rgba(0,0,0,0.35); font-family: serif;">
            史
          </div>
        `;

        const siteIcon = L.divIcon({
          className: 'custom-marker-pin',
          html: siteIconHtml,
          iconSize: [34, 34],
          iconAnchor: [17, 17],
          popupAnchor: [0, -18],
        });

        const marker = L.marker([site.lat, site.lng], { icon: siteIcon });

        const popupContent = `
          <div style="font-family: inherit; min-width: 220px;">
            <div style="font-size: 11px; font-weight: bold; color: #b45309; margin-bottom: 2px;">
              [역사 사료 유적] ${site.era} · ${site.region_sido}
            </div>
            <h4 style="font-size: 13px; font-weight: bold; margin: 0 0 6px 0; color: #0f172a;">
              ${site.title}
            </h4>
            <p style="font-size: 11px; color: #475569; margin: 0 0 8px 0; line-height: 1.4;">
              ${site.summary}
            </p>
            <div style="font-size: 10px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 6px;">
              클릭하여 상세 사료와 관련 역사 토론 확인
            </div>
          </div>
        `;

        marker.bindPopup(popupContent, { className: 'custom-popup' });
        marker.on('click', () => {
          onSelectSite(site);
        });

        sitesLayerRef.current?.addLayer(marker);
      });
    }
  }, [filteredIssues, filteredSites, showHistoryPins]);

  // Handle fly to Sido
  const handleRegionClick = (sido: string) => {
    setSelectedSido(sido);
    const center = REGION_CENTERS[sido];
    if (center && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([center.lat, center.lng], center.zoom, {
        duration: 1.2,
      });
    }
  };

  // GPS Locate me
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert('위치 정보를 지원하지 않는 브라우저입니다.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([latitude, longitude], 15, { duration: 1.5 });
          const userIcon = L.divIcon({
            className: 'user-loc-pin',
            html: '<div style="width: 18px; height: 18px; background: #2563eb; border: 3px solid white; border-radius: 9999px; box-shadow: 0 0 12px rgba(37,99,235,0.7);"></div>',
            iconSize: [18, 18],
            iconAnchor: [9, 9],
          });
          L.marker([latitude, longitude], { icon: userIcon })
            .addTo(mapInstanceRef.current)
            .bindPopup('현재 나의 위치')
            .openPopup();
        }
      },
      (err) => {
        console.warn('Geolocation failed:', err.message);
        alert('현재 위치 정보를 가져올 수 없습니다. 위치 권한을 확인해주세요.');
      }
    );
  };

  return (
    <div className="relative w-full h-[calc(100vh-7.5rem)] min-h-[550px] overflow-hidden flex flex-col">
      {/* 17 Sido rapid scroll bar */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 z-20 px-4 py-2 shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
            {Object.keys(REGION_CENTERS).map((sido) => (
              <button
                key={sido}
                onClick={() => handleRegionClick(sido)}
                className={`px-3 py-1 text-xs rounded-lg font-medium whitespace-nowrap transition-colors shrink-0 ${
                  selectedSido === sido
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {sido}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleLocateMe}
              className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm transition-colors whitespace-nowrap"
              title="내 현재 GPS 위치로 지도 이동"
            >
              <Crosshair className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">내 위치</span>
            </button>

            <button
              onClick={() => setShowHistoryPins(!showHistoryPins)}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg border transition-colors whitespace-nowrap ${
                showHistoryPins
                  ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/70 dark:text-amber-200 dark:border-amber-800'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
              }`}
              title="지도에 국사편찬위원회 사료 유적 핀 함께 표시"
            >
              <History className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="hidden sm:inline">역사 유적 핀 {showHistoryPins ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Map & Floating Drawer layout */}
      <div className="relative flex-1 w-full h-full">
        {/* Leaflet Container */}
        <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-0" />

        {/* Floating Sidebar Drawer */}
        <div
          className={`absolute top-4 left-4 z-20 w-80 sm:w-96 max-h-[calc(100%-2rem)] flex flex-col bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 transition-all duration-300 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-[calc(100%+1.5rem)]'
          }`}
        >
          {/* Header */}
          <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-900 dark:text-white">
                {selectedSido === '전국' ? '전국 제보 현황' : `${selectedSido} 지역 현황`}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                ({filteredIssues.length}건)
              </span>
            </div>

            <div className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
              지도 클릭 시 제보
            </div>
          </div>

          {/* Search & Category Filter */}
          <div className="p-3 border-b border-slate-100 dark:border-slate-800/80 space-y-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="동네, 키워드, 주소 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            {/* Category Chips */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-2 py-0.5 text-[11px] rounded font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                전체 분류
              </button>
              {Object.values(CATEGORIES).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2 py-0.5 text-[11px] rounded font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
                    selectedCategory === cat.id
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSelectedStatus('all')}
                className={`px-2 py-0.5 text-[10px] rounded font-medium ${
                  selectedStatus === 'all'
                    ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white'
                    : 'text-slate-500'
                }`}
              >
                전체 상태
              </button>
              <button
                onClick={() => setSelectedStatus('pending')}
                className={`px-2 py-0.5 text-[10px] rounded font-medium ${
                  selectedStatus === 'pending'
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200'
                    : 'text-slate-500'
                }`}
              >
                접수중
              </button>
              <button
                onClick={() => setSelectedStatus('in_progress')}
                className={`px-2 py-0.5 text-[10px] rounded font-medium ${
                  selectedStatus === 'in_progress'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200'
                    : 'text-slate-500'
                }`}
              >
                처리중
              </button>
              <button
                onClick={() => setSelectedStatus('resolved')}
                className={`px-2 py-0.5 text-[10px] rounded font-medium ${
                  selectedStatus === 'resolved'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200'
                    : 'text-slate-500'
                }`}
              >
                해결완료
              </button>
            </div>
          </div>

          {/* Issue Cards Scroll List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {filteredIssues.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500 dark:text-slate-400">
                해당 조건의 제보 문제가 없습니다.
                <br />
                지도를 클릭하여 직접 문제를 제보해보세요!
              </div>
            ) : (
              filteredIssues.map((issue) => {
                const cat = CATEGORIES[issue.category];
                const statusMeta = ISSUE_STATUS[issue.status];
                const isSelected = selectedIssue?.id === issue.id;

                return (
                  <div
                    key={issue.id}
                    onClick={() => {
                      onSelectIssue(issue);
                      if (mapInstanceRef.current) {
                        const targetLat = issue.latitude ?? issue.lat ?? 37.5665;
                        const targetLng = issue.longitude ?? issue.lng ?? 126.978;
                        mapInstanceRef.current.flyTo([targetLat, targetLng], 15, {
                          duration: 1.2,
                        });
                      }
                    }}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                      <span className="font-medium flex items-center gap-1">
                        <span>{cat?.icon}</span>
                        <span>{cat?.name}</span>
                        <span aria-hidden="true">·</span>
                        <span>{issue.region_sido} {issue.region_gugun}</span>
                      </span>
                      <span
                        className={`font-semibold ${
                          issue.status === 'resolved'
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : issue.status === 'in_progress'
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-amber-600 dark:text-amber-400'
                        }`}
                      >
                        {statusMeta?.label}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 mb-1">
                      {issue.title}
                    </h4>

                    <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-2">
                      {issue.description}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-1.5">
                      <span className="truncate max-w-[180px]">{issue.address}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onLikeIssue(issue.id);
                        }}
                        className="flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-rose-600 transition-colors"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>{issue.likeCount}</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Sidebar Toggle Handle */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`absolute top-4 z-20 p-2 rounded-r-lg bg-white dark:bg-slate-900 shadow-md border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-amber-600 transition-all ${
            isSidebarOpen ? 'left-[20rem] sm:left-[24rem]' : 'left-0'
          }`}
          title={isSidebarOpen ? '목록 접기' : '목록 열기'}
        >
          {isSidebarOpen ? '◀' : '▶'}
        </button>

        {/* Map Help Hint Pill */}
        <div className="absolute bottom-4 right-4 z-10 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] px-3 py-1.5 rounded-lg shadow-md pointer-events-none hidden sm:block">
          💡 지도를 클릭하면 해당 위치에 바로 문제를 제보할 수 있습니다.
        </div>
      </div>
    </div>
  );
};
