import React from 'react';
import { ViewTab } from '../types';
import {
  Globe2,
  BookOpen,
  HelpCircle,
  CheckCircle2,
  Library,
  BarChart3,
  Moon,
  Sun,
  PenSquare,
  Calendar
} from 'lucide-react';

interface HeaderProps {
  activeTab: ViewTab;
  onTabChange: (tab: ViewTab) => void;
  darkMode: boolean;
  onToggleTheme: () => void;
  onOpenStats: () => void;
  onOpenCreateModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  darkMode,
  onToggleTheme,
  onOpenStats,
  onOpenCreateModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => onTabChange('world_map')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 flex items-center justify-center text-white shadow-sm font-serif font-black text-lg">
                史
              </div>
              <div className="leading-tight">
                <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
                  세계 역사 사건 지도
                </span>
                <span className="hidden xl:inline text-xs text-slate-500 dark:text-slate-400 ml-2 font-normal">
                  사료 토론 광장 &amp; 퀴즈 아레나
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: 5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <button
              onClick={() => onTabChange('world_map')}
              className={`flex items-center gap-1.5 py-1 whitespace-nowrap shrink-0 transition-colors ${
                activeTab === 'world_map'
                  ? 'text-amber-600 dark:text-amber-400 font-semibold border-b-2 border-amber-600 dark:border-amber-400'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Globe2 className="w-4 h-4" />
              <span>세계 역사 지도</span>
            </button>

            <button
              onClick={() => onTabChange('chronology')}
              className={`flex items-center gap-1.5 py-1 whitespace-nowrap shrink-0 transition-colors ${
                activeTab === 'chronology'
                  ? 'text-amber-600 dark:text-amber-400 font-semibold border-b-2 border-amber-600 dark:border-amber-400'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>시대·나라별 역사 도감</span>
            </button>

            <button
              onClick={() => onTabChange('debates')}
              className={`flex items-center gap-1.5 py-1 whitespace-nowrap shrink-0 transition-colors ${
                activeTab === 'debates'
                  ? 'text-amber-600 dark:text-amber-400 font-semibold border-b-2 border-amber-600 dark:border-amber-400'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>사료 토론 광장</span>
            </button>

            <button
              onClick={() => onTabChange('quiz')}
              className={`flex items-center gap-1.5 py-1 whitespace-nowrap shrink-0 transition-colors ${
                activeTab === 'quiz'
                  ? 'text-amber-600 dark:text-amber-400 font-semibold border-b-2 border-amber-600 dark:border-amber-400'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>역사 퀴즈 챌린지</span>
            </button>

            <button
              onClick={() => onTabChange('factcheck')}
              className={`flex items-center gap-1.5 py-1 whitespace-nowrap shrink-0 transition-colors ${
                activeTab === 'factcheck'
                  ? 'text-amber-600 dark:text-amber-400 font-semibold border-b-2 border-amber-600 dark:border-amber-400'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>사료 팩트체커</span>
            </button>

            <button
              onClick={() => onTabChange('sources')}
              className={`flex items-center gap-1.5 py-1 whitespace-nowrap shrink-0 transition-colors ${
                activeTab === 'sources'
                  ? 'text-amber-600 dark:text-amber-400 font-semibold border-b-2 border-amber-600 dark:border-amber-400'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Library className="w-4 h-4" />
              <span>사료 아카이브</span>
            </button>
          </nav>

          {/* Zone 3: 1 primary action button + utility controls */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Stats Modal Trigger */}
            <button
              onClick={onOpenStats}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              title="세계사 통계 &amp; 랭킹"
              aria-label="통합 통계"
            >
              <BarChart3 className="w-4 h-4" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              title={darkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
              aria-label="테마 전환"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onOpenCreateModal}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm transition-colors whitespace-nowrap"
            >
              <PenSquare className="w-3.5 h-3.5" />
              <span>새 사건·토론 발의</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Scrollbar */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto py-2 border-t border-slate-100 dark:border-slate-800 scrollbar-none text-xs">
          <button
            onClick={() => onTabChange('world_map')}
            className={`px-3 py-1 rounded-md whitespace-nowrap ${
              activeTab === 'world_map' ? 'bg-amber-600 text-white font-medium' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            세계 역사 지도
          </button>
          <button
            onClick={() => onTabChange('chronology')}
            className={`px-3 py-1 rounded-md whitespace-nowrap ${
              activeTab === 'chronology' ? 'bg-amber-600 text-white font-medium' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            시대·나라별 역사 도감
          </button>
          <button
            onClick={() => onTabChange('debates')}
            className={`px-3 py-1 rounded-md whitespace-nowrap ${
              activeTab === 'debates' ? 'bg-amber-600 text-white font-medium' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            사료 토론 광장
          </button>
          <button
            onClick={() => onTabChange('quiz')}
            className={`px-3 py-1 rounded-md whitespace-nowrap ${
              activeTab === 'quiz' ? 'bg-amber-600 text-white font-medium' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            역사 퀴즈 챌린지
          </button>
          <button
            onClick={() => onTabChange('factcheck')}
            className={`px-3 py-1 rounded-md whitespace-nowrap ${
              activeTab === 'factcheck' ? 'bg-amber-600 text-white font-medium' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            사료 팩트체커
          </button>
          <button
            onClick={() => onTabChange('sources')}
            className={`px-3 py-1 rounded-md whitespace-nowrap ${
              activeTab === 'sources' ? 'bg-amber-600 text-white font-medium' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            사료 아카이브
          </button>
        </div>
      </div>
    </header>
  );
};
