import React, { useState } from 'react';
import {
  HistoricalDebate,
  HistoryPeriodType,
  DebateUserComment,
  HistoricalSource
} from '../types';
import {
  BookOpen,
  Search,
  Volume2,
  VolumeX,
  ExternalLink,
  ShieldCheck,
  ThumbsUp,
  MessageSquare,
  Sparkles,
  ChevronDown,
  ChevronUp,
  PenTool
} from 'lucide-react';

interface DebatesViewProps {
  debates: HistoricalDebate[];
  comments: DebateUserComment[];
  sources: HistoricalSource[];
  onVote: (debateId: string, stance: 'pro' | 'con' | 'neutral') => void;
  onAddComment: (comment: Omit<DebateUserComment, 'id' | 'createdAt' | 'likes'>) => void;
  onLikeComment: (commentId: string) => void;
  onOpenNewDebateModal: () => void;
}

export const DebatesView: React.FC<DebatesViewProps> = ({
  debates,
  comments,
  sources,
  onVote,
  onAddComment,
  onLikeComment,
  onOpenNewDebateModal,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<HistoryPeriodType>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'popular' | 'latest' | 'votes' | 'comments'>('popular');
  const [expandedSources, setExpandedSources] = useState<Record<string, boolean>>({});
  const [speakingDebateId, setSpeakingDebateId] = useState<string | null>(null);

  // New comment draft state per debate
  const [activeCommentDebateId, setActiveCommentDebateId] = useState<string | null>(null);
  const [commentAuthor, setCommentAuthor] = useState<string>('');
  const [commentContent, setCommentContent] = useState<string>('');
  const [commentStance, setCommentStance] = useState<'pro' | 'con' | 'neutral'>('pro');
  const [commentBookRef, setCommentBookRef] = useState<string>('');
  const [commentQuoteRef, setCommentQuoteRef] = useState<string>('');

  // Period labels
  const periods: { id: HistoryPeriodType; label: string }[] = [
    { id: 'ALL', label: '전체 시대' },
    { id: 'SAMGUK', label: '삼국·통일신라' },
    { id: 'GORYEO', label: '고려' },
    { id: 'JOSEON_EARLY', label: '조선 전기' },
    { id: 'JOSEON_LATE', label: '조선 후기' },
    { id: 'MODERN', label: '근현대' },
  ];

  // Speech synthesis (TTS) for the "히스토리 보이스"
  const handleToggleVoice = (debate: HistoricalDebate) => {
    if (!('speechSynthesis' in window)) {
      alert('사용하시는 브라우저가 음성 낭독(TTS)을 지원하지 않습니다.');
      return;
    }

    if (speakingDebateId === debate.id) {
      window.speechSynthesis.cancel();
      setSpeakingDebateId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const narrationText = `
      사료 기반 역사 토론. ${debate.title}.
      시대적 배경: ${debate.background}
      긍정론과 실리적 관점: ${debate.proStance.summary}.
      비판론과 대의명분 관점: ${debate.conStance.summary}.
      ${debate.neutralStance ? `시대적 재해석: ${debate.neutralStance.summary}.` : ''}
      국사편찬위원회 한국사데이터베이스 사료를 바탕으로 팩트 토론에 참여해보세요.
    `;

    const utterance = new SpeechSynthesisUtterance(narrationText);
    utterance.lang = 'ko-KR';
    utterance.rate = 0.95;
    utterance.pitch = 0.95;

    utterance.onend = () => {
      setSpeakingDebateId(null);
    };
    utterance.onerror = () => {
      setSpeakingDebateId(null);
    };

    window.speechSynthesis.speak(utterance);
    setSpeakingDebateId(debate.id);
  };

  // Toggle source accordion
  const toggleSourceAccordion = (debateId: string) => {
    setExpandedSources((prev) => ({
      ...prev,
      [debateId]: !prev[debateId],
    }));
  };

  // Filter
  const filtered = debates.filter((d) => {
    if (selectedPeriod !== 'ALL' && d.period !== selectedPeriod) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        d.title.toLowerCase().includes(q) ||
        d.subtitle.toLowerCase().includes(q) ||
        d.historicalFigure.toLowerCase().includes(q) ||
        d.background.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === 'votes') {
      const totalA = a.votes.pro + a.votes.con + a.votes.neutral;
      const totalB = b.votes.pro + b.votes.con + b.votes.neutral;
      return totalB - totalA;
    }
    if (sortOrder === 'comments') {
      return b.commentsCount - a.commentsCount;
    }
    if (sortOrder === 'latest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    // popular
    const scoreA = a.votes.pro + a.votes.con + a.votes.neutral + a.viewsCount / 10;
    const scoreB = b.votes.pro + b.votes.con + b.votes.neutral + b.viewsCount / 10;
    return scoreB - scoreA;
  });

  // Handle submit comment
  const handleCommentSubmit = (debateId: string) => {
    if (!commentAuthor.trim() || !commentContent.trim()) {
      alert('작성자 이름과 의견 내용을 입력해주세요.');
      return;
    }

    const hasSource = Boolean(commentBookRef.trim() || commentQuoteRef.trim());

    onAddComment({
      debateId,
      stance: commentStance,
      author: commentAuthor.trim(),
      content: commentContent.trim(),
      verifiedBadge: hasSource,
      sourceRef: hasSource
        ? {
            book: commentBookRef.trim() || '국사편찬위원회 사료',
            quote: commentQuoteRef.trim() || '',
            url: 'https://db.history.go.kr',
          }
        : undefined,
    });

    setCommentContent('');
    setCommentBookRef('');
    setCommentQuoteRef('');
    setActiveCommentDebateId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400">
            <span className="font-serif text-sm">史</span>
            <span>국사편찬위원회 한국사데이터베이스 (db.history.go.kr) 공식 연계</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white tracking-tight">
            실록과 사료로 말하는 히스토리 보이스
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            감정적인 억측이 아닌, 조선왕조실록·승정원일기·삼국사기·고려사 등 공인된 사료 원문과 국역을 바탕으로 역사적 쟁점을 다각도로 탐구하고 토론하는 팩트 기반 공론장입니다.
          </p>
        </div>

        <button
          onClick={onOpenNewDebateModal}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm transition-colors whitespace-nowrap self-start"
        >
          <PenTool className="w-4 h-4" />
          <span>새 사료 토론 발의</span>
        </button>
      </div>

      {/* Filter bar */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        {/* Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="인물명, 사건명, 실록 구절, 키워드로 검색 (예: 광해군, 정조, 예송, 묘청, 갑오개혁, 신라)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs shrink-0">
            <button
              onClick={() => setSortOrder('popular')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                sortOrder === 'popular'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              인기순
            </button>
            <button
              onClick={() => setSortOrder('latest')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                sortOrder === 'latest'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              최신순
            </button>
            <button
              onClick={() => setSortOrder('votes')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                sortOrder === 'votes'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              투표순
            </button>
            <button
              onClick={() => setSortOrder('comments')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                sortOrder === 'comments'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              댓글순
            </button>
          </div>
        </div>

        {/* Periods chips */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1 border-t border-slate-100 dark:border-slate-800/80 text-xs">
          {periods.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPeriod(p.id)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedPeriod === p.id
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Debates List */}
      <div className="space-y-6">
        <div className="text-xs text-slate-500 dark:text-slate-400">
          총 <strong className="text-slate-900 dark:text-white tabular-nums">{filtered.length}</strong>개의 사료 기반 역사 토론 아젠다가 등록되어 있습니다.
        </div>

        {sorted.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-sm text-slate-500">
            해당 조건의 역사 토론이 없습니다.
          </div>
        ) : (
          sorted.map((debate) => {
            const totalVotes = debate.votes.pro + debate.votes.con + debate.votes.neutral || 1;
            const proPct = Math.round((debate.votes.pro / totalVotes) * 100);
            const conPct = Math.round((debate.votes.con / totalVotes) * 100);
            const neutralPct = 100 - proPct - conPct;

            const debateComments = comments.filter((c) => c.debateId === debate.id);
            const debateSources = sources.filter((s) => s.debateId === debate.id);
            const isSourcesOpen = Boolean(expandedSources[debate.id]);
            const isSpeaking = speakingDebateId === debate.id;

            return (
              <article
                key={debate.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
              >
                {/* Header Metadata (Strict unboxed text with separators) */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-amber-700 dark:text-amber-400">
                      {debate.periodName}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{debate.era}</span>
                    <span aria-hidden="true">·</span>
                    <span>관련 인물: {debate.historicalFigure}</span>
                  </div>

                  {/* Audio Narration TTS Trigger */}
                  <button
                    onClick={() => handleToggleVoice(debate)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                      isSpeaking
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200'
                        : 'bg-amber-50 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200 hover:bg-amber-100'
                    }`}
                    title="역사의 목소리 (TTS 낭독 듣기)"
                  >
                    {isSpeaking ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5 animate-pulse" />
                        <span>낭독 중지</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                        <span>역사의 목소리 듣기</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Title & Background */}
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-900 dark:text-white leading-snug">
                    {debate.title}
                  </h3>
                  <p className="text-xs text-amber-800 dark:text-amber-300 font-medium">
                    {debate.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
                    {debate.background}
                  </p>
                </div>

                {/* 3 Stances Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Pro */}
                  <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                        {debate.proStance.title}
                      </h4>
                      <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">
                        {proPct}%
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {debate.proStance.summary}
                    </p>
                    <ul className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside pt-1">
                      {debate.proStance.arguments.map((arg, idx) => (
                        <li key={idx} className="leading-normal">{arg}</li>
                      ))}
                    </ul>
                    <button
                      onClick={() => onVote(debate.id, 'pro')}
                      className={`w-full mt-2 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                        debate.userVoted === 'pro'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200'
                      }`}
                    >
                      {debate.userVoted === 'pro' ? '✓ 투표 완료' : '긍정론 지지 투표'} ({debate.votes.pro})
                    </button>
                  </div>

                  {/* Neutral / Reinterpretation */}
                  <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/60 rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-blue-800 dark:text-blue-300">
                        {debate.neutralStance?.title || '시대적 재해석'}
                      </h4>
                      <span className="text-xs font-bold text-blue-700 dark:text-blue-400 tabular-nums">
                        {neutralPct}%
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {debate.neutralStance?.summary || '당대 사료와 구조적 맥락을 종합적으로 고려한 입체적 관점입니다.'}
                    </p>
                    <ul className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside pt-1">
                      {(debate.neutralStance?.arguments || [
                        '단순한 이분법적 평가를 넘어 당대 국제 정세와 사회경제적 한계를 고려해야 합니다.',
                        '일차 사료의 기록 주체와 사관의 입장을 함께 비판적으로 검토할 필요가 있습니다.'
                      ]).map((arg, idx) => (
                        <li key={idx} className="leading-normal">{arg}</li>
                      ))}
                    </ul>
                    <button
                      onClick={() => onVote(debate.id, 'neutral')}
                      className={`w-full mt-2 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                        debate.userVoted === 'neutral'
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 hover:bg-blue-200'
                      }`}
                    >
                      {debate.userVoted === 'neutral' ? '✓ 투표 완료' : '재해석 지지 투표'} ({debate.votes.neutral})
                    </button>
                  </div>

                  {/* Con */}
                  <div className="bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-rose-800 dark:text-rose-300">
                        {debate.conStance.title}
                      </h4>
                      <span className="text-xs font-bold text-rose-700 dark:text-rose-400 tabular-nums">
                        {conPct}%
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {debate.conStance.summary}
                    </p>
                    <ul className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside pt-1">
                      {debate.conStance.arguments.map((arg, idx) => (
                        <li key={idx} className="leading-normal">{arg}</li>
                      ))}
                    </ul>
                    <button
                      onClick={() => onVote(debate.id, 'con')}
                      className={`w-full mt-2 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                        debate.userVoted === 'con'
                          ? 'bg-rose-600 text-white'
                          : 'bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-200 hover:bg-rose-200'
                      }`}
                    >
                      {debate.userVoted === 'con' ? '✓ 투표 완료' : '비판론 지지 투표'} ({debate.votes.con})
                    </button>
                  </div>
                </div>

                {/* Stance Percentage Bar */}
                <div className="space-y-1">
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${proPct}%` }}
                      className="bg-emerald-500 transition-all duration-500"
                      title={`긍정론: ${proPct}%`}
                    />
                    <div
                      style={{ width: `${neutralPct}%` }}
                      className="bg-blue-500 transition-all duration-500"
                      title={`재해석: ${neutralPct}%`}
                    />
                    <div
                      style={{ width: `${conPct}%` }}
                      className="bg-rose-500 transition-all duration-500"
                      title={`비판론: ${conPct}%`}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 tabular-nums">
                    <span>긍정론 {proPct}% ({debate.votes.pro}표)</span>
                    <span>재해석 {neutralPct}% ({debate.votes.neutral}표)</span>
                    <span>비판론 {conPct}% ({debate.votes.con}표)</span>
                  </div>
                </div>

                {/* Primary Sources Accordion */}
                <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
                  <button
                    onClick={() => toggleSourceAccordion(debate.id)}
                    className="flex items-center justify-between w-full text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-amber-600 transition-colors py-1"
                  >
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                      <span>연계 국사편찬위원회 1차 사료 원문 &amp; 국역 ({debateSources.length}건)</span>
                    </span>
                    {isSourcesOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {isSourcesOpen && (
                    <div className="mt-3 space-y-3 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                      {debateSources.length === 0 ? (
                        <p className="text-xs text-slate-500">
                          연계된 사료 기록을 한국사데이터베이스(db.history.go.kr)에서 불러오는 중입니다.
                        </p>
                      ) : (
                        debateSources.map((src) => (
                          <div
                            key={src.id}
                            className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2 text-xs"
                          >
                            <div className="flex items-center justify-between gap-2 text-[11px] text-slate-500">
                              <span className="font-semibold text-amber-700 dark:text-amber-400">
                                {src.bookName} · {src.dateRecorded}
                              </span>
                              <a
                                href={src.sourceDbUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-amber-600 hover:underline"
                              >
                                <span>db.history.go.kr 원문 조회</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>

                            {/* Classical Chinese */}
                            <div className="font-serif text-slate-800 dark:text-slate-200 bg-amber-50/40 dark:bg-amber-950/20 p-2.5 rounded border border-amber-200/50 dark:border-amber-900/40 text-xs sm:text-sm leading-relaxed">
                              {src.originalText}
                            </div>

                            {/* Modern Korean */}
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                              <strong>[국역]</strong> {src.translation}
                            </p>

                            <div className="text-[11px] text-amber-700 dark:text-amber-400 font-medium pt-1">
                              💡 핵심 논거: {src.keyQuote}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>

                {/* Evidence-Based Comments Section */}
                <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
                        <span>사료 기반 토론 의견</span>
                      </h4>
                      <span className="text-xs text-slate-400 tabular-nums">
                        ({debateComments.length})
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        setActiveCommentDebateId(
                          activeCommentDebateId === debate.id ? null : debate.id
                        )
                      }
                      className="text-xs text-amber-600 hover:text-amber-700 font-medium"
                    >
                      {activeCommentDebateId === debate.id ? '작성 취소' : '토론 의견 쓰기'}
                    </button>
                  </div>

                  {/* Comment Input Box */}
                  {activeCommentDebateId === debate.id && (
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-amber-200 dark:border-amber-900/60 space-y-3 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-700 dark:text-slate-300">내 입장:</span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setCommentStance('pro')}
                            className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                              commentStance === 'pro'
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            긍정론
                          </button>
                          <button
                            type="button"
                            onClick={() => setCommentStance('neutral')}
                            className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                              commentStance === 'neutral'
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            재해석
                          </button>
                          <button
                            type="button"
                            onClick={() => setCommentStance('con')}
                            className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                              commentStance === 'con'
                                ? 'bg-rose-600 text-white'
                                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            비판론
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="작성자 닉네임"
                          value={commentAuthor}
                          onChange={(e) => setCommentAuthor(e.target.value)}
                          className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                        />
                        <input
                          type="text"
                          placeholder="[선택] 인용 사료 서명 (예: 광해군일기 11년 3월)"
                          value={commentBookRef}
                          onChange={(e) => setCommentBookRef(e.target.value)}
                          className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                        />
                      </div>

                      <input
                        type="text"
                        placeholder="[선택] 인용 사료 구절 (작성 시 [공인 사료 인증 배지] 부여)"
                        value={commentQuoteRef}
                        onChange={(e) => setCommentQuoteRef(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                      />

                      <textarea
                        rows={3}
                        placeholder="팩트와 사료에 근거하여 당신의 논리와 역사적 평가를 작성해주세요..."
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        className="w-full p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                      />

                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-amber-700 dark:text-amber-400">
                          {Boolean(commentBookRef || commentQuoteRef)
                            ? '✨ 사료 구절 인용이 감지되었습니다. 등록 시 [사료 인증 배지]가 부여됩니다.'
                            : '💡 사료를 인용하시면 공인 사료 인증 배지가 부여됩니다.'}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCommentSubmit(debate.id)}
                          className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold transition-colors"
                        >
                          의견 등록
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Comments List */}
                  <div className="space-y-2">
                    {debateComments.length === 0 ? (
                      <p className="text-xs text-slate-400 py-2">
                        아직 등록된 사료 토론 의견이 없습니다. 첫 번째 근거 중심 의견을 남겨보세요!
                      </p>
                    ) : (
                      debateComments.map((comment) => (
                        <div
                          key={comment.id}
                          className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span
                                className={`font-semibold ${
                                  comment.stance === 'pro'
                                    ? 'text-emerald-700 dark:text-emerald-400'
                                    : comment.stance === 'con'
                                    ? 'text-rose-700 dark:text-rose-400'
                                    : 'text-blue-700 dark:text-blue-400'
                                }`}
                              >
                                [{comment.stance === 'pro' ? '긍정' : comment.stance === 'con' ? '비판' : '재해석'}]
                              </span>
                              <span className="font-bold text-slate-800 dark:text-slate-200">
                                {comment.author}
                              </span>

                              {comment.verifiedBadge && (
                                <span className="flex items-center gap-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950 px-1.5 py-0.5 rounded">
                                  <ShieldCheck className="w-3 h-3 text-amber-600" />
                                  <span>사료 인증 배지</span>
                                </span>
                              )}
                            </div>

                            <button
                              onClick={() => onLikeComment(comment.id)}
                              className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-rose-600 transition-colors"
                            >
                              <ThumbsUp className="w-3 h-3" />
                              <span className="tabular-nums">{comment.likes}</span>
                            </button>
                          </div>

                          {comment.sourceRef && (
                            <div className="text-[11px] bg-amber-50/70 dark:bg-amber-950/30 p-2 rounded border border-amber-200/60 dark:border-amber-900/40 text-amber-900 dark:text-amber-200">
                              <strong>[인용 사료: {comment.sourceRef.book}]</strong> {comment.sourceRef.quote}
                            </div>
                          )}

                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            {comment.content}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
};
