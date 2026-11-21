import React, { useState, useEffect } from 'react';
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
import { X, Globe2, MapPin, Calendar, Scroll, Sparkles } from 'lucide-react';

interface NewEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newEvent: Omit<WorldHistoryEvent, 'id'>) => void;
  initialCoords?: { lat: number; lng: number } | null;
}

export const NewEventModal: React.FC<NewEventModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialCoords,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState<string>('');
  const [year, setYear] = useState<number>(1800);
  const [yearDisplay, setYearDisplay] = useState<string>('1800년');
  const [era, setEra] = useState<EraType>('MODERN');
  const [continent, setContinent] = useState<ContinentType>('EUROPE');
  const [country, setCountry] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [lat, setLat] = useState<number>(48.85);
  const [lng, setLng] = useState<number>(2.35);
  const [category, setCategory] = useState<EventCategoryType>('revolution');
  const [figures, setFigures] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [detailedDescription, setDetailedDescription] = useState<string>('');
  const [sourceText, setSourceText] = useState<string>('');
  const [sourceName, setSourceName] = useState<string>('');
  const [historicalSignificance, setHistoricalSignificance] = useState<string>('');

  useEffect(() => {
    if (initialCoords) {
      setLat(initialCoords.lat);
      setLng(initialCoords.lng);
    }
  }, [initialCoords]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim() || !country.trim() || !city.trim()) {
      alert('필수 입력 항목(사건명, 요약, 국가, 도시)을 모두 입력해주세요.');
      return;
    }

    onSubmit({
      title: title.trim(),
      year,
      yearDisplay: yearDisplay.trim() || `${year}년`,
      era,
      continent,
      country: country.trim(),
      city: city.trim(),
      lat,
      lng,
      category,
      figures: figures.trim() || '관련 인물',
      summary: summary.trim(),
      detailedDescription: detailedDescription.trim() || summary.trim(),
      primarySourceQuote: sourceText.trim()
        ? {
            text: sourceText.trim(),
            sourceName: sourceName.trim() || '역사 사료 기록',
          }
        : undefined,
      historicalSignificance:
        historicalSignificance.trim() || '세계사의 전개에 중요한 전환점을 마련한 사건.',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-900 z-10">
          <div className="flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-amber-600" />
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                새 세계 역사 사건 지도에 등록하기
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                세계 지도 위에 새로운 역사적 사건과 1차 사료 기록을 등록합니다.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-slate-800 dark:text-slate-200">
              역사 사건명 *
            </label>
            <input
              type="text"
              required
              placeholder="예: 바스티유 감옥 습격과 프랑스 인권선언"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-slate-800 dark:text-slate-200">
                대륙 *
              </label>
              <select
                value={continent}
                onChange={(e) => setContinent(e.target.value as ContinentType)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                {(Object.keys(WORLD_CONTINENTS) as ContinentType[])
                  .filter((c) => c !== 'ALL')
                  .map((c) => (
                    <option key={c} value={c}>
                      {WORLD_CONTINENTS[c].name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800 dark:text-slate-200">
                시대 *
              </label>
              <select
                value={era}
                onChange={(e) => setEra(e.target.value as EraType)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                {(Object.keys(WORLD_ERAS) as EraType[])
                  .filter((e) => e !== 'ALL')
                  .map((e) => (
                    <option key={e} value={e}>
                      {WORLD_ERAS[e]}
                    </option>
                  ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800 dark:text-slate-200">
                분야 *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as EventCategoryType)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                {(Object.keys(EVENT_CATEGORIES) as EventCategoryType[]).map((cat) => (
                  <option key={cat} value={cat}>
                    {EVENT_CATEGORIES[cat].icon} {EVENT_CATEGORIES[cat].name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-slate-800 dark:text-slate-200">
                발생 연도/시기 *
              </label>
              <input
                type="text"
                required
                placeholder="예: 1789년 7월 14일"
                value={yearDisplay}
                onChange={(e) => setYearDisplay(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800 dark:text-slate-200">
                국가 *
              </label>
              <input
                type="text"
                required
                placeholder="예: 프랑스"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800 dark:text-slate-200">
                도시/장소 *
              </label>
              <input
                type="text"
                required
                placeholder="예: 파리 바스티유"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-slate-800 dark:text-slate-200">
                위도 (Latitude)
              </label>
              <input
                type="number"
                step="0.0001"
                value={lat}
                onChange={(e) => setLat(parseFloat(e.target.value))}
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-800 dark:text-slate-200">
                경도 (Longitude)
              </label>
              <input
                type="number"
                step="0.0001"
                value={lng}
                onChange={(e) => setLng(parseFloat(e.target.value))}
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-800 dark:text-slate-200">
              관련 역사 인물
            </label>
            <input
              type="text"
              placeholder="예: 로베스피에르, 루이 16세, 라파예트"
              value={figures}
              onChange={(e) => setFigures(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-800 dark:text-slate-200">
              사건 핵심 요약 *
            </label>
            <textarea
              rows={2}
              required
              placeholder="사건의 발단과 전개를 2-3문장으로 요약해주세요..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full p-2.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          {/* Primary Source Quote */}
          <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 space-y-2">
            <span className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
              <Scroll className="w-3.5 h-3.5 text-amber-600" />
              <span>[선택] 공인 1차 사료 인용구 및 출처 서명</span>
            </span>
            <input
              type="text"
              placeholder="출처 서명 (예: 프랑스 인권선언문 / 수에토니우스 황제열전)"
              value={sourceName}
              onChange={(e) => setSourceName(e.target.value)}
              className="w-full px-3 py-1.5 rounded-md bg-white dark:bg-slate-900 border border-amber-200 text-xs"
            />
            <textarea
              rows={2}
              placeholder="사료 원문 구절 인용..."
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              className="w-full p-2 rounded-md bg-white dark:bg-slate-900 border border-amber-200 text-xs font-serif"
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-xs"
            >
              세계 지도에 등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
