import React, { useState } from 'react';
import { CivicIssue, IssueCategoryType, IssueStatusType } from '../types';
import { CATEGORIES, ISSUE_STATUS, REGION_CENTERS } from '../data/initialData';
import {
  Search,
  Filter,
  ArrowUpDown,
  ThumbsUp,
  MessageSquare,
  Calendar,
  MapPin,
  PenSquare
} from 'lucide-react';

interface BoardViewProps {
  issues: CivicIssue[];
  onSelectIssue: (issue: CivicIssue) => void;
  onLikeIssue: (id: string) => void;
  onOpenReportModal: () => void;
}

export const BoardView: React.FC<BoardViewProps> = ({
  issues,
  onSelectIssue,
  onLikeIssue,
  onOpenReportModal,
}) => {
  const [selectedSido, setSelectedSido] = useState<string>('전국');
  const [selectedCategory, setSelectedCategory] = useState<IssueCategoryType | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<IssueStatusType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'latest' | 'likes' | 'status'>('latest');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  // Filter
  const filtered = issues.filter((issue) => {
    if (selectedSido !== '전국' && issue.region_sido !== selectedSido) return false;
    if (selectedCategory !== 'all' && issue.category !== selectedCategory) return false;
    if (selectedStatus !== 'all' && issue.status !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        issue.title.toLowerCase().includes(q) ||
        issue.description.toLowerCase().includes(q) ||
        issue.address.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === 'likes') return b.likeCount - a.likeCount;
    if (sortOrder === 'status') {
      const priority: Record<string, number> = { pending: 1, in_progress: 2, resolved: 3 };
      return priority[a.status] - priority[b.status];
    }
    // latest
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const totalPages = Math.ceil(sorted.length / pageSize) || 1;
  const paginatedIssues = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            우리 동네 제보 게시판
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            시민들이 직접 발굴하고 공론화한 전국 17개 시·도 지역 사회 문제를 한눈에 확인하고 공감할 수 있습니다.
          </p>
        </div>

        <button
          onClick={onOpenReportModal}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm transition-colors whitespace-nowrap self-start sm:self-auto"
        >
          <PenSquare className="w-4 h-4" />
          <span>새 문제 제보하기</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        {/* Row 1: Search & Sort */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="제보 제목, 내용, 주소 키워드로 검색 (예: 가로등, 불법주차, 턱낮춤)..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs">
              <button
                onClick={() => setSortOrder('latest')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  sortOrder === 'latest'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                최신순
              </button>
              <button
                onClick={() => setSortOrder('likes')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  sortOrder === 'likes'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                공감순
              </button>
              <button
                onClick={() => setSortOrder('status')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  sortOrder === 'status'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                처리상태순
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Region chips */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1 border-t border-slate-100 dark:border-slate-800/80">
          <button
            onClick={() => {
              setSelectedSido('전국');
              setCurrentPage(1);
            }}
            className={`px-2.5 py-1 text-xs rounded-md font-medium whitespace-nowrap transition-colors ${
              selectedSido === '전국'
                ? 'bg-amber-600 text-white'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            전국 전체
          </button>
          {Object.keys(REGION_CENTERS)
            .filter((s) => s !== '전국')
            .map((sido) => (
              <button
                key={sido}
                onClick={() => {
                  setSelectedSido(sido);
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 text-xs rounded-md font-medium whitespace-nowrap transition-colors ${
                  selectedSido === sido
                    ? 'bg-amber-600 text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {sido}
              </button>
            ))}
        </div>

        {/* Row 3: Category & Status */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
          <div className="flex items-center gap-1 overflow-x-auto">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1 rounded-md font-medium ${
                selectedCategory === 'all'
                  ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900'
                  : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              전체 분류
            </button>
            {Object.values(CATEGORIES).map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors flex items-center gap-1 ${
                  selectedCategory === cat.id
                    ? 'bg-amber-600 text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 text-[11px]">
            <button
              onClick={() => {
                setSelectedStatus('all');
                setCurrentPage(1);
              }}
              className={`px-2 py-0.5 rounded font-medium ${
                selectedStatus === 'all' ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white' : 'text-slate-500'
              }`}
            >
              전체
            </button>
            <button
              onClick={() => {
                setSelectedStatus('pending');
                setCurrentPage(1);
              }}
              className={`px-2 py-0.5 rounded font-medium ${
                selectedStatus === 'pending' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200' : 'text-slate-500'
              }`}
            >
              접수중
            </button>
            <button
              onClick={() => {
                setSelectedStatus('in_progress');
                setCurrentPage(1);
              }}
              className={`px-2 py-0.5 rounded font-medium ${
                selectedStatus === 'in_progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200' : 'text-slate-500'
              }`}
            >
              처리중
            </button>
            <button
              onClick={() => {
                setSelectedStatus('resolved');
                setCurrentPage(1);
              }}
              className={`px-2 py-0.5 rounded font-medium ${
                selectedStatus === 'resolved' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200' : 'text-slate-500'
              }`}
            >
              해결완료
            </button>
          </div>
        </div>
      </div>

      {/* Issues Table/Cards */}
      <div className="space-y-3">
        <div className="text-xs text-slate-500 dark:text-slate-400">
          총 <strong className="text-slate-900 dark:text-white tabular-nums">{filtered.length}</strong>개의 제보 문제가 접수되어 있습니다.
        </div>

        {paginatedIssues.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-sm text-slate-500">
            조건에 부합하는 제보 문제가 없습니다.
          </div>
        ) : (
          paginatedIssues.map((issue) => {
            const cat = CATEGORIES[issue.category];
            const statusMeta = ISSUE_STATUS[issue.status];

            return (
              <div
                key={issue.id}
                onClick={() => onSelectIssue(issue)}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 hover:border-amber-400 dark:hover:border-amber-600 transition-all cursor-pointer shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-2 flex-1 min-w-0">
                    {/* Unboxed Metadata Line with separators */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                        <span>{cat?.icon}</span>
                        <span>{cat?.name}</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-medium text-amber-700 dark:text-amber-400">
                        {issue.region_sido} {issue.region_gugun}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>제보자: {issue.authorName}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">
                        {new Date(issue.createdAt).toLocaleDateString('ko-KR')}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                      {issue.title}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {issue.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{issue.address}</span>
                    </div>
                  </div>

                  {/* Right Status & Actions */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                        issue.status === 'resolved'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                          : issue.status === 'in_progress'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'
                      }`}
                    >
                      {statusMeta?.label}
                    </span>

                    <div className="flex items-center gap-3 text-xs">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onLikeIssue(issue.id);
                        }}
                        className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-rose-600 transition-colors"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span className="tabular-nums font-semibold">{issue.likeCount}</span>
                      </button>

                      <div className="flex items-center gap-1 text-slate-400">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span className="tabular-nums font-medium">
                          {issue.comments?.length || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40"
          >
            이전
          </button>
          <span className="text-xs text-slate-600 dark:text-slate-400 tabular-nums">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40"
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};
