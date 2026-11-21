import React from 'react';
import { WorldHistoryEvent, HistoricalDebate, QuizProgress } from '../types';
import { WORLD_CONTINENTS, WORLD_ERAS, EVENT_CATEGORIES } from '../data/worldHistoryData';
import { X, BarChart3, Globe2, Trophy, PieChart, Sparkles } from 'lucide-react';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: WorldHistoryEvent[];
  debates: HistoricalDebate[];
  quizProgress: QuizProgress;
}

export const StatsModal: React.FC<StatsModalProps> = ({
  isOpen,
  onClose,
  events,
  debates,
  quizProgress,
}) => {
  if (!isOpen) return null;

  // Continent counts
  const continentCounts: Record<string, number> = {};
  events.forEach((ev) => {
    continentCounts[ev.continent] = (continentCounts[ev.continent] || 0) + 1;
  });

  // Category counts
  const categoryCounts: Record<string, number> = {};
  events.forEach((ev) => {
    categoryCounts[ev.category] = (categoryCounts[ev.category] || 0) + 1;
  });

  // Debate stats
  let totalPro = 0;
  let totalCon = 0;
  let totalNeutral = 0;
  debates.forEach((d) => {
    totalPro += d.votes.pro;
    totalCon += d.votes.con;
    totalNeutral += d.votes.neutral;
  });
  const totalVotes = totalPro + totalCon + totalNeutral || 1;

  const totalEvents = events.length || 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-900 z-10">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              세계사 지도 &amp; 토론·퀴즈 통계 대시보드
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Quick Metrics 4-strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] text-slate-500 dark:text-slate-400">세계 역사 사건</span>
              <div className="text-xl font-bold text-slate-900 dark:text-white tabular-nums mt-1">
                {events.length}개소
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
              <span className="text-[11px] text-amber-800 dark:text-amber-300">역사 토론 아젠다</span>
              <div className="text-xl font-bold text-amber-600 dark:text-amber-400 tabular-nums mt-1">
                {debates.length}건
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
              <span className="text-[11px] text-blue-800 dark:text-blue-300">내 퀴즈 누적 점수</span>
              <div className="text-xl font-bold text-blue-600 dark:text-blue-400 tabular-nums mt-1">
                {quizProgress.score}점
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
              <span className="text-[11px] text-rose-800 dark:text-rose-300">최대 연속 정답</span>
              <div className="text-xl font-bold text-rose-600 dark:text-rose-400 tabular-nums mt-1">
                {quizProgress.maxStreak}연속
              </div>
            </div>
          </div>

          {/* Section 1: Continents Breakdown */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Globe2 className="w-4 h-4 text-amber-600" />
              <span>대륙별 역사 사건 분포</span>
            </h4>
            <div className="space-y-2">
              {Object.keys(WORLD_CONTINENTS)
                .filter((c) => c !== 'ALL')
                .map((contKey) => {
                  const count = continentCounts[contKey] || 0;
                  const pct = Math.round((count / totalEvents) * 100);

                  return (
                    <div key={contKey} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                          {WORLD_CONTINENTS[contKey as keyof typeof WORLD_CONTINENTS].name}
                        </span>
                        <span className="text-slate-500 tabular-nums">
                          {count}건 ({pct}%)
                        </span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${pct}%` }}
                          className="h-full bg-amber-600 rounded-full transition-all duration-500"
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Section 2: Historical Debates Public Opinion */}
          <div className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-5">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <PieChart className="w-4 h-4 text-amber-600" />
              <span>세계사 토론 광장 여론 분포</span>
            </h4>
            <div className="space-y-2 text-xs">
              <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                <div
                  style={{ width: `${Math.round((totalPro / totalVotes) * 100)}%` }}
                  className="bg-emerald-500"
                />
                <div
                  style={{ width: `${Math.round((totalNeutral / totalVotes) * 100)}%` }}
                  className="bg-blue-500"
                />
                <div
                  style={{ width: `${Math.round((totalCon / totalVotes) * 100)}%` }}
                  className="bg-rose-500"
                />
              </div>
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 tabular-nums">
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                  긍정/실리론 {Math.round((totalPro / totalVotes) * 100)}% ({totalPro}표)
                </span>
                <span className="text-blue-700 dark:text-blue-400 font-medium">
                  시대적 재해석 {Math.round((totalNeutral / totalVotes) * 100)}% ({totalNeutral}표)
                </span>
                <span className="text-rose-700 dark:text-rose-400 font-medium">
                  비판/명분론 {Math.round((totalCon / totalVotes) * 100)}% ({totalCon}표)
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Quiz Mastery Details */}
          <div className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-5">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>퀴즈 마스터리 달성 현황</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="text-slate-500">풀이한 문제 수</span>
                <div className="text-lg font-bold text-slate-900 dark:text-white tabular-nums">
                  {quizProgress.totalAnswered}문항 중 {quizProgress.correctCount}문항 정답
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="text-slate-500">다음 등급까지</span>
                <div className="text-lg font-bold text-amber-600 dark:text-amber-400 tabular-nums">
                  {Math.max(0, 300 - quizProgress.score)}점 남음
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-900 text-white dark:bg-slate-700 dark:hover:bg-slate-600"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
