import React, { useState, useEffect } from 'react';
import { CivicIssue, IssueCategoryType } from '../types';
import { CATEGORIES, REGION_CENTERS } from '../data/initialData';
import { X, Sparkles, MapPin, ShieldAlert, Loader2 } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newIssue: Omit<CivicIssue, 'id' | 'createdAt' | 'likeCount'>) => void;
  initialCoords?: { lat: number; lng: number; address?: string } | null;
  initialNewsData?: { title: string; summary: string; sido: string; category: IssueCategoryType } | null;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialCoords,
  initialNewsData,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<IssueCategoryType>('safety');
  const [regionSido, setRegionSido] = useState<string>('서울');
  const [regionGugun, setRegionGugun] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [latitude, setLatitude] = useState<number>(37.5665);
  const [longitude, setLongitude] = useState<number>(126.9780);
  const [authorName, setAuthorName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [historicalWisdom, setHistoricalWisdom] = useState<string>('');
  const [isFetchingWisdom, setIsFetchingWisdom] = useState<boolean>(false);

  // Set initial data from props
  useEffect(() => {
    if (initialCoords) {
      setLatitude(initialCoords.lat);
      setLongitude(initialCoords.lng);
      if (initialCoords.address) {
        setAddress(initialCoords.address);
      }
    }
  }, [initialCoords]);

  useEffect(() => {
    if (initialNewsData) {
      setTitle(`[속보 연계 제보] ${initialNewsData.title}`);
      setDescription(initialNewsData.summary);
      setCategory(initialNewsData.category);
      if (initialNewsData.sido && initialNewsData.sido !== '전국') {
        setRegionSido(initialNewsData.sido);
      }
    }
  }, [initialNewsData]);

  // Fetch AI Historical Wisdom for this civic issue
  const handleFetchHistoricalWisdom = async () => {
    if (!title.trim()) {
      alert('먼저 문제 제목을 입력해주세요.');
      return;
    }

    setIsFetchingWisdom(true);
    try {
      const res = await fetch('/api/ai-civic-history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, title, region: regionSido }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.historyConnection) {
          setHistoricalWisdom(data.historyConnection);
        }
      }
    } catch (err) {
      console.warn('Error fetching historical wisdom:', err);
    } finally {
      setIsFetchingWisdom(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !authorName.trim() || !address.trim()) {
      alert('필수 입력 항목(제목, 내용, 주소, 작성자)을 모두 작성해주세요.');
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      category,
      region_sido: regionSido,
      region_gugun: regionGugun.trim() || '시민 자율구',
      address: address.trim(),
      lat: latitude,
      lng: longitude,
      latitude,
      longitude,
      authorName: authorName.trim(),
      imageUrl: imageUrl.trim() || undefined,
      status: 'pending',
      historicalConnection: historicalWisdom.trim() || undefined,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-900 z-10">
          <div className="flex items-center gap-2">
            <span className="text-xl">✍️</span>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                우리 동네 사회 문제 제보하기
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                시민의 눈으로 발굴한 동네 문제를 등록하면 지도에 등록되고 지자체와 공유됩니다.
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
          {/* Title */}
          <div className="space-y-1">
            <label className="font-bold text-slate-800 dark:text-slate-200">
              제보 제목 *
            </label>
            <input
              type="text"
              required
              placeholder="예: 신촌 주택가 골목길 가로등 2주째 소등, 보행 안전 위험"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          {/* Category & Region */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-slate-800 dark:text-slate-200">
                문제 분류 *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as IssueCategoryType)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                {Object.values(CATEGORIES).map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.icon} {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800 dark:text-slate-200">
                시·도 *
              </label>
              <select
                value={regionSido}
                onChange={(e) => {
                  setRegionSido(e.target.value);
                  const center = REGION_CENTERS[e.target.value];
                  if (center) {
                    setLatitude(center.lat);
                    setLongitude(center.lng);
                  }
                }}
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                {Object.keys(REGION_CENTERS)
                  .filter((s) => s !== '전국')
                  .map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800 dark:text-slate-200">
                시·군·구
              </label>
              <input
                type="text"
                placeholder="예: 마포구, 해운대구"
                value={regionGugun}
                onChange={(e) => setRegionGugun(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Address & Coordinates */}
          <div className="space-y-1">
            <label className="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span>발생 상세 주소 *</span>
              <span className="text-[11px] text-slate-400 font-normal">
                위도: {latitude.toFixed(4)}, 경도: {longitude.toFixed(4)}
              </span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                placeholder="예: 서울특별시 마포구 와우산로 21길 19"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="flex-1 px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="font-bold text-slate-800 dark:text-slate-200">
              문제 상세 설명 *
            </label>
            <textarea
              rows={4}
              required
              placeholder="문제가 발생한 구체적인 현황, 위험 요소, 빠른 조치가 필요한 이유를 작성해주세요..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white leading-relaxed"
            />
          </div>

          {/* AI Historical Wisdom Bridge */}
          <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>역사 속 유사 사례와 지혜 (실록 고증 연계)</span>
              </span>
              <button
                type="button"
                onClick={handleFetchHistoricalWisdom}
                disabled={isFetchingWisdom}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors"
              >
                {isFetchingWisdom ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>고증 중...</span>
                  </>
                ) : (
                  <span>역사 사례 자동 조회</span>
                )}
              </button>
            </div>
            {historicalWisdom ? (
              <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-2.5 rounded border border-amber-200 dark:border-amber-900">
                {historicalWisdom}
              </p>
            ) : (
              <p className="text-[11px] text-amber-800/80 dark:text-amber-300/80">
                조선왕조실록 및 전통 기록에서 과거 선조들이 동일한 도시 문제(치안, 환경, 도로 등)를 어떻게 해결했는지 지혜를 제보에 덧붙일 수 있습니다.
              </p>
            )}
          </div>

          {/* Author & Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="space-y-1">
              <label className="font-bold text-slate-800 dark:text-slate-200">
                제보자 이름 / 닉네임 *
              </label>
              <input
                type="text"
                required
                placeholder="예: 홍길동, 연희동주민"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800 dark:text-slate-200">
                수정/삭제용 비밀번호 (선택)
              </label>
              <input
                type="password"
                placeholder="4자리 숫자"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Footer buttons */}
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-xs transition-colors"
            >
              제보 등록하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
