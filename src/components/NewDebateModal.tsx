import React, { useState } from 'react';
import { HistoricalDebate, HistoryPeriodType } from '../types';
import { X, PenTool, BookOpen, Scroll } from 'lucide-react';

interface NewDebateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newDebate: Omit<HistoricalDebate, 'id' | 'votes' | 'commentsCount' | 'viewsCount' | 'createdAt'>) => void;
}

export const NewDebateModal: React.FC<NewDebateModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState<string>('');
  const [subtitle, setSubtitle] = useState<string>('');
  const [period, setPeriod] = useState<HistoryPeriodType>('JOSEON_LATE');
  const [era, setEra] = useState<string>('');
  const [historicalFigure, setHistoricalFigure] = useState<string>('');
  const [background, setBackground] = useState<string>('');

  const [proTitle, setProTitle] = useState<string>('긍정/실리론');
  const [proSummary, setProSummary] = useState<string>('');
  const [proArgs, setProArgs] = useState<string>('');

  const [conTitle, setConTitle] = useState<string>('비판/명분론');
  const [conSummary, setConSummary] = useState<string>('');
  const [conArgs, setConArgs] = useState<string>('');

  const [neutralTitle, setNeutralTitle] = useState<string>('시대적 재해석');
  const [neutralSummary, setNeutralSummary] = useState<string>('');
  const [neutralArgs, setNeutralArgs] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !background.trim() || !proSummary.trim() || !conSummary.trim()) {
      alert('토론 제목, 배경, 긍정론/비판론 요약을 모두 작성해주세요.');
      return;
    }

    const periodNames: Record<string, string> = {
      SAMGUK: '삼국/통일신라',
      GORYEO: '고려',
      JOSEON_EARLY: '조선 전기',
      JOSEON_LATE: '조선 후기',
      MODERN: '근현대',
      ALL: '기타 시대',
    };

    onSubmit({
      title: title.trim(),
      subtitle: subtitle.trim() || '국사편찬위원회 사료 기반 쟁점 고증',
      period,
      periodName: periodNames[period] || '조선',
      era: era.trim() || '역사적 시기',
      historicalFigure: historicalFigure.trim() || '관련 역사 인물',
      background: background.trim(),
      proStance: {
        title: proTitle.trim(),
        summary: proSummary.trim(),
        arguments: proArgs.split('\n').filter((a) => a.trim().length > 0),
      },
      conStance: {
        title: conTitle.trim(),
        summary: conSummary.trim(),
        arguments: conArgs.split('\n').filter((a) => a.trim().length > 0),
      },
      neutralStance: {
        title: neutralTitle.trim(),
        summary: neutralSummary.trim() || '시대적 복합성과 구조적 한계',
        arguments: neutralArgs.split('\n').filter((a) => a.trim().length > 0),
      },
      tags: ['사료토론', periodNames[period] || '역사'],
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-900 z-10">
          <div className="flex items-center gap-2">
            <span className="font-serif font-black text-lg text-amber-600">史</span>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                새 사료 토론 아젠다 발의하기
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                국사편찬위원회 사료에 기반하여 역사적 인물이나 사건의 쟁점을 공론화합니다.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-slate-800 dark:text-slate-200">
              토론 제목 (핵심 쟁점 질문) *
            </label>
            <input
              type="text"
              required
              placeholder="예: 정조의 탕평책과 화성 축조, 진정한 개혁인가 왕권 강화의 수단인가?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-slate-800 dark:text-slate-200">
                시대 분류 *
              </label>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value as HistoryPeriodType)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="SAMGUK">삼국·통일신라</option>
                <option value="GORYEO">고려</option>
                <option value="JOSEON_EARLY">조선 전기</option>
                <option value="JOSEON_LATE">조선 후기</option>
                <option value="MODERN">근현대</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800 dark:text-slate-200">
                시기 / 연대
              </label>
              <input
                type="text"
                placeholder="예: 18세기 후반 (1776~1800)"
                value={era}
                onChange={(e) => setEra(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800 dark:text-slate-200">
                관련 인물
              </label>
              <input
                type="text"
                placeholder="예: 정조, 채제공, 심환지"
                value={historicalFigure}
                onChange={(e) => setHistoricalFigure(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-800 dark:text-slate-200">
              사료적 배경 및 맥락 *
            </label>
            <textarea
              rows={3}
              required
              placeholder="사건이 일어난 시대적 배경과 공인 정사 기록의 핵심 정황을 서술해주세요..."
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              className="w-full p-3 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          {/* 3 Stances Inputs */}
          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-white">
              3대 관점 (긍정론, 비판론, 시대적 재해석) 설정
            </h4>

            {/* Pro */}
            <div className="p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 space-y-2">
              <span className="font-bold text-emerald-800 dark:text-emerald-300">
                긍정/실리론 관점 *
              </span>
              <input
                type="text"
                required
                placeholder="핵심 요약 (예: 국력 보전과 민생 안정을 위한 실리적 결단)"
                value={proSummary}
                onChange={(e) => setProSummary(e.target.value)}
                className="w-full px-3 py-1.5 rounded-md bg-white dark:bg-slate-900 border border-emerald-200 text-xs"
              />
              <textarea
                rows={2}
                placeholder="상세 논거 (한 줄에 하나씩 작성)"
                value={proArgs}
                onChange={(e) => setProArgs(e.target.value)}
                className="w-full p-2 rounded-md bg-white dark:bg-slate-900 border border-emerald-200 text-xs"
              />
            </div>

            {/* Con */}
            <div className="p-3 rounded-lg bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 space-y-2">
              <span className="font-bold text-rose-800 dark:text-rose-300">
                비판/명분론 관점 *
              </span>
              <input
                type="text"
                required
                placeholder="핵심 요약 (예: 국가 간 신의와 헌정 질서를 훼손하여 정통성 위기 초래)"
                value={conSummary}
                onChange={(e) => setConSummary(e.target.value)}
                className="w-full px-3 py-1.5 rounded-md bg-white dark:bg-slate-900 border border-rose-200 text-xs"
              />
              <textarea
                rows={2}
                placeholder="상세 논거 (한 줄에 하나씩 작성)"
                value={conArgs}
                onChange={(e) => setConArgs(e.target.value)}
                className="w-full p-2 rounded-md bg-white dark:bg-slate-900 border border-rose-200 text-xs"
              />
            </div>

            {/* Neutral */}
            <div className="p-3 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/60 space-y-2">
              <span className="font-bold text-blue-800 dark:text-blue-300">
                시대적 재해석 관점
              </span>
              <input
                type="text"
                placeholder="핵심 요약 (예: 약소국 지정학적 한계 속 복합적 평가 필요)"
                value={neutralSummary}
                onChange={(e) => setNeutralSummary(e.target.value)}
                className="w-full px-3 py-1.5 rounded-md bg-white dark:bg-slate-900 border border-blue-200 text-xs"
              />
              <textarea
                rows={2}
                placeholder="상세 논거 (한 줄에 하나씩 작성)"
                value={neutralArgs}
                onChange={(e) => setNeutralArgs(e.target.value)}
                className="w-full p-2 rounded-md bg-white dark:bg-slate-900 border border-blue-200 text-xs"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold"
            >
              토론 발의하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
