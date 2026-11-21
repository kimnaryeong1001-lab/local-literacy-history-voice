import React from 'react';
import { ShieldCheck, ExternalLink, BookOpen, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center text-white font-serif font-black text-lg">
                史
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                로컬리터러시 · 히스토리 보이스
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
              로컬리터러시(우리 동네 사회 문제 지도 &amp; 시민 제보)와 히스토리 보이스(국사편찬위원회 한국사데이터베이스 공인 사료 기반 역사 토론 광장)가 하나로 결합된 시민 공론 통합 플랫폼입니다. 현대 우리 삶의 현장과 역사 속 기록의 지혜를 함께 나눕니다.
            </p>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-medium pt-1">
              <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
              <span>실록, 승정원일기, 삼국사기, 고려사 등 공인 정사(正史) 사료 연계</span>
            </div>
          </div>

          {/* Col 3: Official History DB links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs">공식 사료 데이터베이스</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://db.history.go.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-amber-500" />
                  <span>국사편찬위원회 한국사DB</span>
                </a>
              </li>
              <li>
                <a
                  href="https://db.history.go.kr/sillok"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-amber-500" />
                  <span>조선왕조실록 원문/국역</span>
                </a>
              </li>
              <li>
                <a
                  href="https://db.history.go.kr/sjw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-amber-500" />
                  <span>승정원일기 데이터베이스</span>
                </a>
              </li>
              <li>
                <a
                  href="https://db.history.go.kr/ancient"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-amber-500" />
                  <span>삼국사기·고려사 사료관</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Participation Guide */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs">참여 가이드라인</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>• 사료 인용 없는 왜곡 및 감정적 비방 지양</li>
              <li>• 공인 사료 구절 인용 시 [사료 인증 배지] 부여</li>
              <li>• 전국 17개 시·도 지자체 행정 연계 및 모니터링</li>
              <li>• 실사구시(實事求是)에 입각한 건강한 토론 문화</li>
            </ul>
          </div>
        </div>

        {/* Bottom line */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>
            © 2026 로컬리터러시 &amp; 히스토리 보이스 통합 플랫폼. 사료 출처: 국사편찬위원회 한국사데이터베이스.
          </p>
          <p className="flex items-center gap-1 text-slate-400">
            <span>실사구시(實事求是)와 참여 민주주의를 지향합니다.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
