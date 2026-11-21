import React from 'react';
import { WorldHistoryEvent } from '../types';
import { EVENT_CATEGORIES } from '../data/worldHistoryData';
import {
  X,
  MapPin,
  Calendar,
  Users,
  Scroll,
  BookOpen,
  HelpCircle,
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface EventDetailModalProps {
  event: WorldHistoryEvent | null;
  onClose: () => void;
  onGoToDebate: (debateId: string) => void;
  onGoToQuiz: (event: WorldHistoryEvent) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  onGoToDebate,
  onGoToQuiz,
}) => {
  if (!event) return null;

  const cat = EVENT_CATEGORIES[event.category];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-900 z-10">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold flex items-center gap-1" style={{ color: cat?.color }}>
              <span>{cat?.icon}</span>
              <span>{cat?.name}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-700 dark:text-amber-400 font-medium">
              {event.yearDisplay}
            </span>
            <span aria-hidden="true">·</span>
            <span>{event.city}, {event.country}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs sm:text-sm">
          {/* Title */}
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white leading-snug">
              {event.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-amber-600" />
                <span>주요 인물: {event.figures}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>위도 {event.lat.toFixed(4)}, 경도 {event.lng.toFixed(4)}</span>
              </span>
            </div>
          </div>

          {/* Detailed Narrative */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm whitespace-pre-wrap">
            {event.detailedDescription || event.summary}
          </div>

          {/* Primary Source Quote Citation Box */}
          {event.primarySourceQuote && (
            <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 space-y-2">
              <div className="flex items-center justify-between text-xs text-amber-900 dark:text-amber-200 font-bold">
                <span className="flex items-center gap-1.5">
                  <Scroll className="w-3.5 h-3.5 text-amber-600" />
                  <span>공인 1차 사료 기록 원문 (Primary Source)</span>
                </span>
                <span className="font-normal text-[11px] text-amber-700 dark:text-amber-300">
                  {event.primarySourceQuote.sourceName}
                </span>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-amber-200 dark:border-amber-900/40 text-xs sm:text-sm font-serif leading-relaxed text-slate-800 dark:text-slate-200">
                "{event.primarySourceQuote.text}"
              </div>

              {event.primarySourceQuote.translation && (
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal">
                  💡 {event.primarySourceQuote.translation}
                </p>
              )}
            </div>
          )}

          {/* Historical Significance */}
          <div className="space-y-1">
            <h4 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>세계사적 의의 및 영향</span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {event.historicalSignificance}
            </p>
          </div>

          {/* Action CTAs: Debate & Quiz */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            <div className="flex flex-wrap items-center gap-2">
              {event.relatedDebateId && (
                <button
                  onClick={() => {
                    onGoToDebate(event.relatedDebateId!);
                    onClose();
                  }}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow-xs transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>관련 사료 토론 참여하기</span>
                </button>
              )}

              <button
                onClick={() => {
                  onGoToQuiz(event);
                  onClose();
                }}
                className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>이 사건 관련 퀴즈 풀기</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
