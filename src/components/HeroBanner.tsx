import React from 'react';
import { ViewTab } from '../types';
import { Globe2, BookOpen, HelpCircle, ArrowRight, Sparkles, Calendar } from 'lucide-react';

interface HeroBannerProps {
  onTabChange: (tab: ViewTab) => void;
  onOpenCreateModal: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onTabChange,
  onOpenCreateModal,
}) => {
  return (
    <div className="relative bg-slate-900 text-white overflow-hidden border-b border-slate-800">
      {/* Background Image: Antique World History Map with subtle scrim */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/src/assets/images/antique_world_history_map_1795173628116.jpg"
          alt="고전 세계 역사 지도와 나침반"
          className="w-full h-full object-cover opacity-25"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-900/60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              <span>전세계 역사 사건 지도 × 시대·나라별 역사 도감 × 토론·퀴즈</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-serif text-white leading-tight">
            지구본을 펼쳐 역사의 현장을 탐험하다,
            <br />
            <span className="text-amber-400">전세계 역사 사건 지도 &amp; 시대·나라별 역사 도감</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            지도에는 주요 핵심 사건만 선별하여 한눈에 조망하고, <strong>[시대·나라별 역사 도감]</strong>에서 고대부터 현대까지 국가별 모든 역사적 사건과 1차 사료를 체계적으로 탐구할 수 있습니다.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold">
            <button
              onClick={() => onTabChange('world_map')}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white shadow-md transition-colors"
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>세계 역사 지도 (주요 사건)</span>
            </button>

            <button
              onClick={() => onTabChange('chronology')}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 shadow-md transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>시대·나라별 역사 도감</span>
            </button>

            <button
              onClick={() => onTabChange('quiz')}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>역사 퀴즈 챌린지</span>
            </button>


            <button
              onClick={() => onTabChange('debates')}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>사료 토론 광장 참여</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
