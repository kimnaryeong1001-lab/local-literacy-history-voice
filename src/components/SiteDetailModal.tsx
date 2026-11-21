import React from 'react';
import { HistoricalSitePin } from '../types';
import { X, ExternalLink, BookOpen, MapPin, Scroll } from 'lucide-react';

interface SiteDetailModalProps {
  site: HistoricalSitePin | null;
  onClose: () => void;
  onGoToDebate: (debateId: string) => void;
}

export const SiteDetailModal: React.FC<SiteDetailModalProps> = ({
  site,
  onClose,
  onGoToDebate,
}) => {
  if (!site) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-amber-500/10 dark:bg-amber-950/40">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center text-white font-serif font-black text-sm">
              史
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400">
                [공인 역사 사료 유적] {site.era}
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {site.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{site.address} ({site.region_sido})</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Scroll className="w-3.5 h-3.5 text-amber-600" />
              <span>역사적 의의 및 사료적 배경</span>
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
              {site.summary}
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800">
            {site.relatedDebateId && (
              <button
                onClick={() => {
                  onGoToDebate(site.relatedDebateId!);
                  onClose();
                }}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs shadow-xs"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>관련 사료 토론 광장으로 이동</span>
              </button>
            )}

            <a
              href={site.sourceDbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-amber-600 text-xs"
            >
              <span>db.history.go.kr 원문 조회</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
