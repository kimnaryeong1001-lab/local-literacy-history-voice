import React, { useState } from 'react';
import { CivicIssue, IssueStatusType } from '../types';
import { CATEGORIES, ISSUE_STATUS } from '../data/initialData';
import {
  X,
  ThumbsUp,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Send,
  Calendar,
  User,
  Trash2
} from 'lucide-react';

interface IssueDetailModalProps {
  issue: CivicIssue | null;
  onClose: () => void;
  onLike: (id: string) => void;
  onAddComment: (issueId: string, authorName: string, content: string) => void;
  isAdmin: boolean;
  onUpdateStatus?: (issueId: string, newStatus: IssueStatusType, resolutionComment?: string) => void;
  onDeleteIssue?: (issueId: string) => void;
}

export const IssueDetailModal: React.FC<IssueDetailModalProps> = ({
  issue,
  onClose,
  onLike,
  onAddComment,
  isAdmin,
  onUpdateStatus,
  onDeleteIssue,
}) => {
  if (!issue) return null;

  const [commentAuthor, setCommentAuthor] = useState<string>('');
  const [commentText, setCommentText] = useState<string>('');
  const [adminStatus, setAdminStatus] = useState<IssueStatusType>(issue.status);
  const [adminComment, setAdminComment] = useState<string>(issue.resolutionComment || '');

  const cat = CATEGORIES[issue.category];
  const statusMeta = ISSUE_STATUS[issue.status];

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentAuthor.trim() || !commentText.trim()) return;
    onAddComment(issue.id, commentAuthor.trim(), commentText.trim());
    setCommentText('');
  };

  const handleAdminUpdate = () => {
    if (onUpdateStatus) {
      onUpdateStatus(issue.id, adminStatus, adminComment);
      alert('지자체 공무원 조치 상태가 성공적으로 업데이트되었습니다.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-900 z-10">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
              <span>{cat?.icon}</span>
              <span>{cat?.name}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-700 dark:text-amber-400 font-medium">
              {issue.region_sido} {issue.region_gugun}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && onDeleteIssue && (
              <button
                onClick={() => {
                  if (confirm('정말로 이 제보를 삭제하시겠습니까?')) {
                    onDeleteIssue(issue.id);
                    onClose();
                  }
                }}
                className="p-1 text-rose-500 hover:text-rose-700"
                title="스팸/부적절 제보 삭제"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs sm:text-sm">
          {/* Title & Status */}
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                {issue.title}
              </h2>
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-md shrink-0 ${
                  issue.status === 'resolved'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : issue.status === 'in_progress'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                }`}
              >
                {statusMeta?.label}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                <span>제보자: {issue.authorName}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{new Date(issue.createdAt).toLocaleString('ko-KR')}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                <span>{issue.address}</span>
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm whitespace-pre-wrap">
            {issue.description}
          </div>

          {/* Historical Wisdom Bridge */}
          {issue.historicalConnection && (
            <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-200 text-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>역사 속 지혜와 전통 사료 연계</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {typeof issue.historicalConnection === 'string'
                  ? issue.historicalConnection
                  : issue.historicalConnection?.connectionNarrative || ''}
              </p>
            </div>
          )}

          {/* Official Municipal Response */}
          {issue.resolutionComment && (
            <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/60 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-blue-900 dark:text-blue-200 text-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>지자체 행정 공식 답변 및 조치 결과</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {issue.resolutionComment}
              </p>
            </div>
          )}

          {/* Admin Mode Status Controller */}
          {isAdmin && (
            <div className="p-4 rounded-xl bg-amber-100/60 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 space-y-3">
              <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-200 text-xs">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>[공무원 관리자 전용] 처리 상태 및 답변 등록</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-[11px] font-medium text-slate-700 dark:text-slate-300">
                    처리 단계 변경
                  </label>
                  <select
                    value={adminStatus}
                    onChange={(e) => setAdminStatus(e.target.value as IssueStatusType)}
                    className="w-full mt-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                  >
                    <option value="pending">🟡 접수중</option>
                    <option value="in_progress">🔵 처리중 (현장 조치 착수)</option>
                    <option value="resolved">🟢 완료 (행정 조치 종결)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-700 dark:text-slate-300">
                  공식 답변 및 조치 내역 입력
                </label>
                <textarea
                  rows={2}
                  placeholder="예: 해당 골목길 스마트 가로등 보수 공사를 완료하였으며 야간 점검을 마쳤습니다."
                  value={adminComment}
                  onChange={(e) => setAdminComment(e.target.value)}
                  className="w-full mt-1 p-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
                />
              </div>

              <button
                type="button"
                onClick={handleAdminUpdate}
                className="px-4 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg font-semibold text-xs"
              >
                지자체 상태 업데이트 저장
              </button>
            </div>
          )}

          {/* Like button */}
          <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
            <button
              onClick={() => onLike(issue.id)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/60 font-semibold text-xs hover:bg-rose-100 transition-colors"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>시민 공감하기 ({issue.likeCount})</span>
            </button>

            <span className="text-xs text-slate-400">
              댓글 {issue.comments?.length || 0}개
            </span>
          </div>

          {/* Comments Section */}
          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
              <span>시민 참여 댓글 및 응원</span>
            </h4>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  required
                  placeholder="닉네임"
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  className="px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
                <input
                  type="text"
                  required
                  placeholder="의견 및 현장 제보 내용..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="sm:col-span-2 px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-700 text-white"
                >
                  댓글 등록
                </button>
              </div>
            </form>

            {/* Comment list */}
            <div className="space-y-2 pt-1">
              {!issue.comments || issue.comments.length === 0 ? (
                <p className="text-xs text-slate-400 py-1">
                  아직 등록된 시민 의견이 없습니다. 첫 번째 댓글을 남겨보세요.
                </p>
              ) : (
                issue.comments.map((c: { id: string; authorName: string; content: string; createdAt: string }) => (
                  <div
                    key={c.id}
                    className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between text-slate-500">
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {c.authorName}
                      </span>
                      <span className="text-[10px]">
                        {new Date(c.createdAt).toLocaleDateString('ko-KR')}
                      </span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300">{c.content}</p>
                  </div>
                ))
              )}
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
