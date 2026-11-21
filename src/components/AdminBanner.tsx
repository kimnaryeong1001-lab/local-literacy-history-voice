import React from 'react';
import { CivicIssue } from '../types';
import { ShieldCheck, Download, X } from 'lucide-react';

interface AdminBannerProps {
  isAdmin: boolean;
  onExitAdmin: () => void;
  issues: CivicIssue[];
}

export const AdminBanner: React.FC<AdminBannerProps> = ({
  isAdmin,
  onExitAdmin,
  issues,
}) => {
  if (!isAdmin) return null;

  const handleDownloadCsv = () => {
    const headers = [
      'ID',
      '제목',
      '카테고리',
      '시도',
      '구군',
      '주소',
      '위도',
      '경도',
      '상태',
      '공감수',
      '제보자',
      '제보일시',
      '공식답변'
    ];

    const rows = issues.map((i) => [
      i.id,
      `"${i.title.replace(/"/g, '""')}"`,
      i.category,
      i.region_sido,
      i.region_gugun,
      `"${i.address.replace(/"/g, '""')}"`,
      i.latitude ?? i.lat ?? '',
      i.longitude ?? i.lng ?? '',
      i.status,
      i.likeCount,
      `"${i.authorName.replace(/"/g, '""')}"`,
      i.createdAt,
      `"${(i.resolutionComment || '').replace(/"/g, '""')}"`
    ]);

    const csvContent =
      '\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `local_issues_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-amber-500/10 dark:bg-amber-950/40 border-b border-amber-300 dark:border-amber-800 px-4 py-2 text-xs text-amber-900 dark:text-amber-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>
            <strong>지자체 공무원 관리자 모드</strong>가 활성화되었습니다. (원클릭 상태 변경: 접수중/처리중/완료, 행정 공식 답변 등록, CSV 추출 가능)
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleDownloadCsv}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-700 text-white font-medium transition-colors"
            title="모든 제보 데이터 엑셀 CSV 다운로드"
          >
            <Download className="w-3 h-3" />
            <span>CSV 다운로드</span>
          </button>

          <button
            onClick={onExitAdmin}
            className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded"
            title="관리자 모드 종료"
            aria-label="관리자 모드 종료"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
