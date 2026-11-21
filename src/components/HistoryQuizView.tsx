import React, { useState } from 'react';
import {
  WorldHistoryQuizQuestion,
  WorldHistoryEvent,
  QuizProgress
} from '../types';
import { WORLD_HISTORY_QUIZZES } from '../data/worldHistoryData';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Flame,
  Award,
  Sparkles,
  RefreshCw,
  MapPin,
  BookOpen,
  ArrowRight,
  Send,
  Loader2,
  Trophy
} from 'lucide-react';

interface HistoryQuizViewProps {
  events: WorldHistoryEvent[];
  onNavigateToMapEvent: (eventId: string) => void;
  onNavigateToDebate: (debateId: string) => void;
  presetEvent?: WorldHistoryEvent | null;
}

export const HistoryQuizView: React.FC<HistoryQuizViewProps> = ({
  events,
  onNavigateToMapEvent,
  onNavigateToDebate,
  presetEvent,
}) => {
  const [questions, setQuestions] = useState<WorldHistoryQuizQuestion[]>(() => {
    // If presetEvent is given, prioritize questions matching that event
    if (presetEvent) {
      const matched = WORLD_HISTORY_QUIZZES.filter(
        (q) => q.relatedEventId === presetEvent.id
      );
      if (matched.length > 0) return matched;
    }
    return WORLD_HISTORY_QUIZZES;
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [quizMode, setQuizMode] = useState<'all' | 'map_locate' | 'quote_figure' | 'ox' | 'ai_custom'>('all');

  // Score & Progress State
  const [progress, setProgress] = useState<QuizProgress>({
    score: 0,
    totalAnswered: 0,
    correctCount: 0,
    streak: 0,
    maxStreak: 0,
  });

  // AI Quiz Generator Input State
  const [aiTopicInput, setAiTopicInput] = useState<string>('');
  const [isGeneratingAiQuiz, setIsGeneratingAiQuiz] = useState<boolean>(false);

  // Filter questions by mode
  const activeQuestions = questions.filter((q) => {
    if (quizMode === 'all' || quizMode === 'ai_custom') return true;
    return q.type === quizMode;
  });

  const currentQuestion = activeQuestions[currentIndex % (activeQuestions.length || 1)];

  // Handle Option Click
  const handleSelectOption = (index: number) => {
    if (isAnswered || !currentQuestion) return;

    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentQuestion.correctIndex;

    setProgress((prev) => {
      const newStreak = isCorrect ? prev.streak + 1 : 0;
      const scoreGain = isCorrect ? 20 + newStreak * 5 : 0;
      return {
        score: prev.score + scoreGain,
        totalAnswered: prev.totalAnswered + 1,
        correctCount: prev.correctCount + (isCorrect ? 1 : 0),
        streak: newStreak,
        maxStreak: Math.max(prev.maxStreak, newStreak),
      };
    });
  };

  // Next Question
  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setCurrentIndex((prev) => prev + 1);
  };

  // Generate Custom AI Quiz via server route
  const handleGenerateAiQuiz = async () => {
    if (!aiTopicInput.trim()) {
      alert('출제하고 싶은 역사 인물, 사건, 시대를 입력해주세요.');
      return;
    }

    setIsGeneratingAiQuiz(true);
    try {
      const res = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: aiTopicInput.trim() }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.quiz) {
          setQuestions((prev) => [data.quiz, ...prev]);
          setSelectedOption(null);
          setIsAnswered(false);
          setCurrentIndex(0);
          setQuizMode('ai_custom');
        }
      }
    } catch (err) {
      console.warn('AI quiz generation error:', err);
    } finally {
      setIsGeneratingAiQuiz(false);
    }
  };

  // Rank determination
  const getRank = (score: number) => {
    if (score >= 300) return { title: '👑 세계사 마스터', desc: '역사의 흐름을 꿰뚫는 현자' };
    if (score >= 150) return { title: '✍️ 역사 공인 서기', desc: '사료와 맥락을 고증하는 연구관' };
    if (score >= 50) return { title: '🧭 세계사 탐험가', desc: '문명의 자취를 밟는 모험가' };
    return { title: '📜 역사 수습생', desc: '역사의 바다에 첫발을 디딘 학생' };
  };

  const userRank = getRank(progress.score);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 text-xs font-semibold mb-1">
          <Trophy className="w-4 h-4 text-amber-600" />
          <span>세계 지도 기반 사료 퀴즈 챌린지</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white tracking-tight">
          세계사 사건 &amp; 사료 퀴즈 아레나
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
          세계 지도의 역사 현장과 공인 사료를 바탕으로 사건의 무대, 핵심 인물, 사료 속 명언을 맞히며 세계사의 입체적 맥락을 마스터해보세요.
        </p>
      </div>

      {/* Progress & Stats Dashboard Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
          <span className="text-[11px] text-slate-500 dark:text-slate-400">내 퀴즈 점수</span>
          <div className="text-xl font-bold text-amber-600 dark:text-amber-400 tabular-nums mt-0.5">
            {progress.score}점
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
          <span className="text-[11px] text-slate-500 dark:text-slate-400">연속 정답 (Streak)</span>
          <div className="text-xl font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1 tabular-nums mt-0.5">
            <Flame className="w-4 h-4 text-rose-500" />
            <span>{progress.streak}연속</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
          <span className="text-[11px] text-slate-500 dark:text-slate-400">정답률</span>
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums mt-0.5">
            {progress.totalAnswered > 0
              ? `${Math.round((progress.correctCount / progress.totalAnswered) * 100)}%`
              : '0%'}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
          <span className="text-[11px] text-slate-500 dark:text-slate-400">현재 등급</span>
          <div className="text-sm font-bold text-slate-900 dark:text-white truncate mt-1">
            {userRank.title}
          </div>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs text-xs">
        <div className="flex items-center gap-1 overflow-x-auto">
          <button
            onClick={() => {
              setQuizMode('all');
              setSelectedOption(null);
              setIsAnswered(false);
            }}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              quizMode === 'all'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            전체 챌린지
          </button>
          <button
            onClick={() => {
              setQuizMode('map_locate');
              setSelectedOption(null);
              setIsAnswered(false);
            }}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              quizMode === 'map_locate'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            🗺️ 지도 탐험 퀴즈
          </button>
          <button
            onClick={() => {
              setQuizMode('quote_figure');
              setSelectedOption(null);
              setIsAnswered(false);
            }}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              quizMode === 'quote_figure'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            📜 사료 &amp; 인물 퀴즈
          </button>
          <button
            onClick={() => {
              setQuizMode('ox');
              setSelectedOption(null);
              setIsAnswered(false);
            }}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              quizMode === 'ox'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            ⚖️ 역사 판정 OX
          </button>
        </div>

        <span className="text-slate-400 text-[11px] tabular-nums">
          총 {activeQuestions.length}문항 준비됨
        </span>
      </div>

      {/* Main Interactive Quiz Card */}
      {currentQuestion ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          {/* Question Header & Meta */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 text-xs">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span className="font-bold text-amber-700 dark:text-amber-400">
                문항 {currentIndex + 1}
              </span>
              <span aria-hidden="true">·</span>
              {currentQuestion.country && (
                <>
                  <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span>{currentQuestion.country}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                </>
              )}
              <span>
                {currentQuestion.type === 'map_locate'
                  ? '세계 지도 탐험형'
                  : currentQuestion.type === 'quote_figure'
                  ? '사료·인물 탐구형'
                  : currentQuestion.type === 'ox'
                  ? '역사 팩트 판정 OX'
                  : '4지선다형'}
              </span>
            </div>

            {currentQuestion.hint && !isAnswered && (
              <span className="text-[11px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-md">
                💡 힌트: {currentQuestion.hint}
              </span>
            )}
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-900 dark:text-white leading-relaxed">
              {currentQuestion.question}
            </h3>
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectOpt = idx === currentQuestion.correctIndex;

              let btnStyle = 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-800 dark:text-slate-200 hover:border-amber-400 hover:bg-amber-50/30';

              if (isAnswered) {
                if (isCorrectOpt) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-bold';
                } else if (isSelected && !isCorrectOpt) {
                  btnStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 line-through';
                } else {
                  btnStyle = 'opacity-40 border-slate-200 dark:border-slate-800 text-slate-400';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-xl border text-left text-sm flex items-center justify-between gap-3 transition-all ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isAnswered && isCorrectOpt && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswered && isSelected && !isCorrectOpt && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation & Connected Actions upon Answer */}
          {isAnswered && (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4 animate-in fade-in duration-300">
              <div
                className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed space-y-2 ${
                  selectedOption === currentQuestion.correctIndex
                    ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900 text-emerald-950 dark:text-emerald-200'
                    : 'bg-rose-50/60 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900 text-rose-950 dark:text-rose-200'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold">
                  {selectedOption === currentQuestion.correctIndex ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>정답입니다! (+20점 {progress.streak > 1 ? `· 🔥 ${progress.streak}연속 보너스` : ''})</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-600" />
                      <span>아쉽습니다. 정답은 [{currentQuestion.options[currentQuestion.correctIndex]}] 입니다.</span>
                    </>
                  )}
                </div>

                <p className="text-slate-700 dark:text-slate-300">
                  {currentQuestion.explanation}
                </p>

                {currentQuestion.sourceCitation && (
                  <div className="text-[11px] font-medium text-amber-800 dark:text-amber-300 pt-1">
                    📖 인용 사료: {currentQuestion.sourceCitation}
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {currentQuestion.relatedEventId && (
                    <button
                      onClick={() => onNavigateToMapEvent(currentQuestion.relatedEventId!)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-amber-600 text-xs font-semibold shadow-xs"
                    >
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      <span>세계 지도에서 위치 보기</span>
                    </button>
                  )}
                </div>

                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow-sm transition-colors"
                >
                  <span>다음 퀴즈 도전</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500">
          준비된 퀴즈가 없습니다.
        </div>
      )}

      {/* AI Quiz Generator Custom Prompt Box */}
      <div className="bg-gradient-to-br from-amber-50/70 via-white to-amber-50/30 dark:from-slate-900 dark:via-slate-900/90 dark:to-amber-950/20 rounded-2xl border border-amber-200 dark:border-slate-800 p-6 space-y-3 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center text-white font-serif font-black">
            史
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              AI 세계사 맞춤 퀴즈 출제기
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              공부하고 싶은 특정 역사 인물, 사건, 전쟁, 국가를 입력하시면 AI 서기가 사료를 대조해 즉석 퀴즈를 출제합니다.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="예: 링컨과 남북전쟁, 나폴레옹 워털루, 진시황 분서갱유, 세종대왕 훈민정음..."
            value={aiTopicInput}
            onChange={(e) => setAiTopicInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleGenerateAiQuiz();
            }}
            className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            onClick={handleGenerateAiQuiz}
            disabled={isGeneratingAiQuiz || !aiTopicInput.trim()}
            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors shrink-0"
          >
            {isGeneratingAiQuiz ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>퀴즈 출제 중...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>맞춤 퀴즈 생성</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
