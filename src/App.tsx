/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  WorldHistoryEvent,
  HistoricalDebate,
  DebateUserComment,
  QuizProgress,
  ViewTab,
} from './types';
import {
  WORLD_HISTORY_EVENTS,
  WORLD_HISTORY_DEBATES,
} from './data/worldHistoryData';
import {
  INITIAL_DEBATE_COMMENTS,
  HISTORICAL_SOURCES,
} from './data/initialData';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { WorldMapView } from './components/WorldMapView';
import { HistoryChronologyView } from './components/HistoryChronologyView';
import { DebatesView } from './components/DebatesView';
import { HistoryQuizView } from './components/HistoryQuizView';
import { FactCheckView } from './components/FactCheckView';
import { SourcesHubView } from './components/SourcesHubView';
import { StatsModal } from './components/StatsModal';
import { EventDetailModal } from './components/EventDetailModal';
import { NewEventModal } from './components/NewEventModal';
import { NewDebateModal } from './components/NewDebateModal';
import { Footer } from './components/Footer';
import { Globe2, BookOpen, HelpCircle, X, Check, PenSquare, Sparkles } from 'lucide-react';

export default function App() {
  // Navigation & Theme
  const [activeTab, setActiveTab] = useState<ViewTab>('world_map');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Core Data States with localStorage persistence
  const [events, setEvents] = useState<WorldHistoryEvent[]>(() => {
    try {
      const saved = localStorage.getItem('world_history_events');
      return saved ? JSON.parse(saved) : WORLD_HISTORY_EVENTS;
    } catch {
      return WORLD_HISTORY_EVENTS;
    }
  });

  const [debates, setDebates] = useState<HistoricalDebate[]>(() => {
    try {
      const saved = localStorage.getItem('world_history_debates');
      return saved ? JSON.parse(saved) : WORLD_HISTORY_DEBATES;
    } catch {
      return WORLD_HISTORY_DEBATES;
    }
  });

  const [debateComments, setDebateComments] = useState<DebateUserComment[]>(() => {
    try {
      const saved = localStorage.getItem('world_history_comments');
      return saved ? JSON.parse(saved) : INITIAL_DEBATE_COMMENTS;
    } catch {
      return INITIAL_DEBATE_COMMENTS;
    }
  });

  const [quizProgress, setQuizProgress] = useState<QuizProgress>(() => {
    try {
      const saved = localStorage.getItem('world_history_quiz_progress');
      return saved
        ? JSON.parse(saved)
        : { score: 40, totalAnswered: 2, correctCount: 2, streak: 2, maxStreak: 2 };
    } catch {
      return { score: 40, totalAnswered: 2, correctCount: 2, streak: 2, maxStreak: 2 };
    }
  });

  // Modals & Selection States
  const [isStatsModalOpen, setIsStatsModalOpen] = useState<boolean>(false);
  const [isChoiceModalOpen, setIsChoiceModalOpen] = useState<boolean>(false);
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState<boolean>(false);
  const [isNewDebateModalOpen, setIsNewDebateModalOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<WorldHistoryEvent | null>(null);
  const [selectedQuizEvent, setSelectedQuizEvent] = useState<WorldHistoryEvent | null>(null);
  const [newEventCoords, setNewEventCoords] = useState<{ lat: number; lng: number } | null>(null);

  // Toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Sync dark mode class on <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Persist events
  useEffect(() => {
    try {
      localStorage.setItem('world_history_events', JSON.stringify(events));
    } catch (e) {
      console.warn('Failed to save events to localStorage:', e);
    }
  }, [events]);

  // Persist debates
  useEffect(() => {
    try {
      localStorage.setItem('world_history_debates', JSON.stringify(debates));
    } catch (e) {
      console.warn('Failed to save debates to localStorage:', e);
    }
  }, [debates]);

  // Persist debate comments
  useEffect(() => {
    try {
      localStorage.setItem('world_history_comments', JSON.stringify(debateComments));
    } catch (e) {
      console.warn('Failed to save comments to localStorage:', e);
    }
  }, [debateComments]);

  // Persist quiz progress
  useEffect(() => {
    try {
      localStorage.setItem('world_history_quiz_progress', JSON.stringify(quizProgress));
    } catch (e) {
      console.warn('Failed to save quiz progress to localStorage:', e);
    }
  }, [quizProgress]);

  // Toggle Theme
  const handleToggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Navigation handlers between Map, Debate, and Quiz
  const handleGoToDebate = (debateId: string) => {
    setActiveTab('debates');
    showToast('관련 사료 토론 광장으로 이동하였습니다. 📜');
  };

  const handleGoToQuizForEvent = (event: WorldHistoryEvent) => {
    setSelectedQuizEvent(event);
    setActiveTab('quiz');
    showToast(`[${event.title}] 관련 퀴즈 모드로 전환되었습니다. 🧭`);
  };

  const handleNavigateToMapEvent = (eventId: string) => {
    const matched = events.find((ev) => ev.id === eventId);
    if (matched) {
      setSelectedEvent(matched);
      setActiveTab('world_map');
      showToast(`세계 지도에서 [${matched.title}] 위치로 이동합니다. 🗺️`);
    } else {
      setActiveTab('world_map');
    }
  };

  const handleProposeEvent = (lat: number, lng: number) => {
    setNewEventCoords({ lat, lng });
    setIsNewEventModalOpen(true);
  };

  const handleAddNewEvent = (newEventData: Omit<WorldHistoryEvent, 'id'>) => {
    const newEvent: WorldHistoryEvent = {
      ...newEventData,
      id: `ev-user-${Date.now()}`,
    };
    setEvents((prev) => [newEvent, ...prev]);
    setSelectedEvent(newEvent);
    showToast('새 세계사 사건이 세계 지도 위에 성공적으로 등록되었습니다! 🌍');
  };

  // Debate Handlers
  const handleVoteDebate = (debateId: string, stance: 'pro' | 'con' | 'neutral') => {
    setDebates((prev) =>
      prev.map((d) => {
        if (d.id !== debateId) return d;
        const currentVotes = { ...d.votes };
        if (d.userVoted === stance) return d;

        if (d.userVoted) {
          currentVotes[d.userVoted] = Math.max(0, currentVotes[d.userVoted] - 1);
        }
        currentVotes[stance] += 1;

        return {
          ...d,
          votes: currentVotes,
          userVoted: stance,
        };
      })
    );
    showToast('사료 토론 투표가 실시간 반영되었습니다. 🗳️');
  };

  const handleAddDebateComment = (
    commentData: Omit<DebateUserComment, 'id' | 'createdAt' | 'likes'>
  ) => {
    const newComment: DebateUserComment = {
      ...commentData,
      id: `dc-${Date.now()}`,
      likes: 1,
      createdAt: new Date().toISOString(),
    };

    setDebateComments((prev) => [newComment, ...prev]);

    setDebates((prev) =>
      prev.map((d) =>
        d.id === commentData.debateId
          ? { ...d, commentsCount: d.commentsCount + 1 }
          : d
      )
    );

    showToast(
      newComment.verifiedBadge
        ? '사료 구절이 확인되어 [공인 사료 인증 배지]가 부여되었습니다! 📜'
        : '사료 토론 의견이 성공적으로 등록되었습니다.'
    );
  };

  const handleLikeDebateComment = (commentId: string) => {
    setDebateComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, likes: c.likes + 1 } : c))
    );
    showToast('토론 의견에 공감하였습니다. 👍');
  };

  const handleAddNewDebate = (
    debateData: Omit<HistoricalDebate, 'id' | 'votes' | 'commentsCount' | 'viewsCount' | 'createdAt'>
  ) => {
    const newDebate: HistoricalDebate = {
      ...debateData,
      id: `deb-${Date.now()}`,
      votes: { pro: 1, con: 0, neutral: 0 },
      commentsCount: 0,
      viewsCount: 1,
      createdAt: new Date().toISOString(),
      userVoted: 'pro',
    };
    setDebates((prev) => [newDebate, ...prev]);
    setActiveTab('debates');
    showToast('새 사료 토론 아젠다가 등록되었습니다. 史');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* 1. Global Header (Top Bar Contract) */}
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab !== 'quiz') {
            setSelectedQuizEvent(null);
          }
        }}
        darkMode={darkMode}
        onToggleTheme={handleToggleTheme}
        onOpenStats={() => setIsStatsModalOpen(true)}
        onOpenCreateModal={() => setIsChoiceModalOpen(true)}
      />

      {/* 2. Hero Banner (displayed on map, chronology, debates, and quiz views) */}
      {(activeTab === 'world_map' || activeTab === 'chronology' || activeTab === 'debates' || activeTab === 'quiz') && (
        <HeroBanner
          onTabChange={(tab) => {
            setActiveTab(tab);
            if (tab !== 'quiz') setSelectedQuizEvent(null);
          }}
          onOpenCreateModal={() => setIsChoiceModalOpen(true)}
        />
      )}

      {/* 3. Main View Area */}
      <main className="flex-1 w-full">
        {activeTab === 'world_map' && (
          <WorldMapView
            events={events}
            selectedEvent={selectedEvent}
            onSelectEvent={(event) => setSelectedEvent(event)}
            onGoToDebate={handleGoToDebate}
            onGoToQuizForEvent={handleGoToQuizForEvent}
            onProposeEvent={handleProposeEvent}
            onNavigateToChronology={() => setActiveTab('chronology')}
          />
        )}

        {activeTab === 'chronology' && (
          <HistoryChronologyView
            events={events}
            onNavigateToMapEvent={handleNavigateToMapEvent}
            onGoToDebate={handleGoToDebate}
            onGoToQuizForEvent={handleGoToQuizForEvent}
          />
        )}

        {activeTab === 'debates' && (
          <DebatesView
            debates={debates}
            comments={debateComments}
            sources={HISTORICAL_SOURCES}
            onVote={handleVoteDebate}
            onAddComment={handleAddDebateComment}
            onLikeComment={handleLikeDebateComment}
            onOpenNewDebateModal={() => setIsNewDebateModalOpen(true)}
          />
        )}

        {activeTab === 'quiz' && (
          <HistoryQuizView
            events={events}
            onNavigateToMapEvent={handleNavigateToMapEvent}
            onNavigateToDebate={handleGoToDebate}
            presetEvent={selectedQuizEvent}
          />
        )}

        {activeTab === 'factcheck' && <FactCheckView />}

        {activeTab === 'sources' && <SourcesHubView />}
      </main>

      {/* 4. Footer */}
      <Footer />

      {/* Choice Modal (새 역사 사건 지도 등록 vs 새 사료 토론 발의) */}
      {isChoiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                새 역사 콘텐츠 등록 유형 선택
              </h3>
              <button
                onClick={() => setIsChoiceModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={() => {
                  setIsChoiceModalOpen(false);
                  setIsNewEventModalOpen(true);
                }}
                className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-amber-500 hover:bg-amber-50/50 dark:hover:bg-amber-950/20 transition-all text-left group"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600">
                    세계 역사 사건 지도에 등록하기
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    위도·경도 좌표와 함께 대륙별 역사적 사건, 주요 인물, 1차 사료 기록을 지도에 핀으로 등록합니다.
                  </p>
                </div>
              </button>

              <button
                onClick={() => {
                  setIsChoiceModalOpen(false);
                  setIsNewDebateModalOpen(true);
                }}
                className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-amber-500 hover:bg-amber-50/50 dark:hover:bg-amber-950/20 transition-all text-left group"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-600 text-white flex items-center justify-center font-serif font-black text-lg shrink-0">
                  史
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600">
                    새 사료 토론 아젠다 발의하기
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    공인된 역사 사료 기록(실록·고문서)을 근거로 역사적 인물이나 사건의 찬반·재해석 쟁점을 공론화합니다.
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Event Detail Modal */}
      <EventDetailModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onGoToDebate={handleGoToDebate}
        onGoToQuiz={handleGoToQuizForEvent}
      />

      {/* New Event Modal */}
      <NewEventModal
        isOpen={isNewEventModalOpen}
        onClose={() => {
          setIsNewEventModalOpen(false);
          setNewEventCoords(null);
        }}
        onSubmit={handleAddNewEvent}
        initialCoords={newEventCoords}
      />

      {/* New Debate Modal */}
      <NewDebateModal
        isOpen={isNewDebateModalOpen}
        onClose={() => setIsNewDebateModalOpen(false)}
        onSubmit={handleAddNewDebate}
      />

      {/* World History Stats Modal */}
      <StatsModal
        isOpen={isStatsModalOpen}
        onClose={() => setIsStatsModalOpen(false)}
        events={events}
        debates={debates}
        quizProgress={quizProgress}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl border border-slate-700 text-xs flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

