import React, { useState } from 'react';
import { FactCheckItem } from '../types';
import { FACT_CHECK_ARCHIVE } from '../data/initialData';
import {
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Search,
  Sparkles,
  ExternalLink,
  BookOpen,
  Send,
  Loader2
} from 'lucide-react';

export const FactCheckView: React.FC = () => {
  const [factChecks, setFactChecks] = useState<FactCheckItem[]>(FACT_CHECK_ARCHIVE);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<FactCheckItem | null>(null);

  const suggestedQuestions = [
    '광해군은 명을 배신하고 후금 편에 섰는가?',
    '정조는 심환지에게 독살당했는가?',
    '예송논쟁은 단순한 옷 입기 싸움이었나?',
    '신라 문무왕의 나당전쟁 매소성 전투 실제 기록은?',
    '세종대왕 훈민정음 창제에 대한 최만리의 상소 내용은?',
  ];

  const handleRunFactCheck = async (queryToRun?: string) => {
    const q = (queryToRun || inputQuery).trim();
    if (!q) return;

    setLoading(true);
    setAiResult(null);

    try {
      const res = await fetch('/api/ai-factcheck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claim: q }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.result) {
          const newFc: FactCheckItem = {
            id: `ai-${Date.now()}`,
            title: data.result.title || q,
            claim: q,
            verdict: data.result.verdict || 'NUANCED',
            verdictLabel: data.result.verdictLabel || '입체적 재해석 필요',
            recordSource: data.result.recordSource || '조선왕조실록 / 승정원일기',
            recordUrl: data.result.recordUrl || 'https://db.history.go.kr',
            explanation: data.result.explanation || '',
            originalPassage: data.result.originalPassage,
            translationPassage: data.result.translationPassage,
          };
          setAiResult(newFc);
        }
      }
    } catch (err) {
      console.warn('AI fact check request error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getVerdictStyle = (verdict: string) => {
    switch (verdict) {
      case 'VERIFIED':
        return {
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
          color: 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800',
        };
      case 'MISCONCEPTION':
        return {
          icon: <AlertTriangle className="w-4 h-4 text-rose-600" />,
          color: 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800',
        };
      default:
        return {
          icon: <HelpCircle className="w-4 h-4 text-amber-600" />,
          color: 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800',
        };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 text-xs font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>국사편찬위원회 정사(正史) 사료 교차 검증</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white tracking-tight">
          사료 기반 팩트체크 &amp; AI 역사 서기
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl leading-relaxed">
          대중문화나 구전, 정치적 왜곡에 가려진 역사적 통설에 대해 국사편찬위원회 한국사데이터베이스의 공인 사료(실록, 승정원일기, 삼국사기 등) 원문과 국역을 대조하여 사실 여부를 교차 검증합니다.
        </p>
      </div>

      {/* AI Fact-Checker Interactive Input Card */}
      <div className="bg-gradient-to-br from-amber-50/80 via-white to-amber-50/40 dark:from-slate-900 dark:via-slate-900/90 dark:to-amber-950/20 rounded-2xl border border-amber-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center text-white font-serif font-black">
            史
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              역사적 의문이나 주장을 질문해보세요
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              국사편찬위원회 공인 사료 기록을 바탕으로 즉시 사실 관계와 한문 원문을 분석해 드립니다.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch gap-2">
          <input
            type="text"
            placeholder="예: 광해군은 후금과 군사동맹을 맺었는가?, 정조 독살설은 사실인가?, 예송논쟁은 단순한 옷 싸움이었나?"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleRunFactCheck();
            }}
            className="flex-1 px-4 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
          />
          <button
            onClick={() => handleRunFactCheck()}
            disabled={loading || !inputQuery.trim()}
            className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors shrink-0"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>사료 대조 중...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>사료 팩트체크 질의</span>
              </>
            )}
          </button>
        </div>

        {/* Suggested Queries */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-500 dark:text-slate-400 font-medium">추천 질문:</span>
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputQuery(q);
                handleRunFactCheck(q);
              }}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-400 dark:hover:border-amber-600 transition-colors text-[11px]"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Live AI Fact-Check Result Showcase */}
        {aiResult && (
          <div className="mt-4 p-5 rounded-xl bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700 shadow-md space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-bold border flex items-center gap-1 text-amber-800 bg-amber-50 dark:bg-amber-950 dark:text-amber-200">
                  <Sparkles className="w-3 h-3" />
                  <span>AI 역사 서기 사료 검증 결과</span>
                </span>
                <span className="text-xs text-slate-500">
                  출처: {aiResult.recordSource}
                </span>
              </div>

              <div
                className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                  getVerdictStyle(aiResult.verdict).color
                }`}
              >
                {getVerdictStyle(aiResult.verdict).icon}
                <span>{aiResult.verdictLabel}</span>
              </div>
            </div>

            <h4 className="text-base font-bold font-serif text-slate-900 dark:text-white">
              {aiResult.title}
            </h4>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {aiResult.explanation}
            </p>

            {aiResult.originalPassage && (
              <div className="bg-amber-50/50 dark:bg-amber-950/20 p-3 rounded-lg border border-amber-200 dark:border-amber-900/60 text-xs space-y-1">
                <div className="font-serif text-slate-800 dark:text-slate-200 text-sm">
                  {aiResult.originalPassage}
                </div>
                {aiResult.translationPassage && (
                  <div className="text-slate-600 dark:text-slate-400">
                    <strong>[국역]</strong> {aiResult.translationPassage}
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between pt-1 text-xs">
              <span className="text-slate-500">
                국사편찬위원회 한국사데이터베이스 공인 데이터 연계
              </span>
              <a
                href={aiResult.recordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-amber-600 hover:underline font-medium"
              >
                <span>한국사DB 원문 대조하기</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Verified Fact-Checks Archive */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          공인 사료로 검증된 대표 역사 팩트체크 아카이브
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {factChecks.map((item) => {
            const style = getVerdictStyle(item.verdict);

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {item.recordSource}
                    </span>
                    <div
                      className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold border shrink-0 ${style.color}`}
                    >
                      {style.icon}
                      <span>{item.verdictLabel}</span>
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                    {item.title}
                  </h4>

                  <div className="text-xs text-rose-700 dark:text-rose-400 bg-rose-50/70 dark:bg-rose-950/30 p-2.5 rounded-lg border border-rose-100 dark:border-rose-900/40">
                    <strong>[통설/주장]</strong> "{item.claim}"
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.explanation}
                  </p>

                  {item.originalPassage && (
                    <div className="bg-amber-50/50 dark:bg-amber-950/20 p-2.5 rounded border border-amber-200/50 dark:border-amber-900/40 text-[11px] space-y-1">
                      <div className="font-serif text-slate-800 dark:text-slate-200">
                        {item.originalPassage}
                      </div>
                      {item.translationPassage && (
                        <div className="text-slate-600 dark:text-slate-400">
                          {item.translationPassage}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
                  <a
                    href={item.recordUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-xs text-amber-600 hover:text-amber-700 font-medium"
                  >
                    <span>사료 원문 DB 조회</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
