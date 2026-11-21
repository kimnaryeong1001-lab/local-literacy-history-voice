import {
  WorldHistoryEvent,
  ContinentType,
  EraType,
  EventCategoryType,
  WorldHistoryQuizQuestion,
  HistoricalDebate,
  FactCheckItem,
  HistoricalSource
} from '../types';
import {
  ALL_WORLD_HISTORY_EVENTS,
  HISTORICAL_COUNTRIES,
  CountryFilterInfo
} from './allWorldEvents';

export { HISTORICAL_COUNTRIES, type CountryFilterInfo };

export const WORLD_CONTINENTS: Record<ContinentType, { name: string; lat: number; lng: number; zoom: number }> = {
  ALL: { name: '전세계 전체', lat: 26.0, lng: 15.0, zoom: 2 },
  EUROPE: { name: '유럽', lat: 48.5, lng: 15.0, zoom: 4 },
  ASIA: { name: '아시아 · 한국', lat: 36.5, lng: 115.0, zoom: 4 },
  AMERICAS: { name: '아메리카', lat: 25.0, lng: -85.0, zoom: 3 },
  MIDDLE_EAST: { name: '중동 · 지중해', lat: 32.0, lng: 42.0, zoom: 4 },
  AFRICA: { name: '아프리카', lat: 2.0, lng: 22.0, zoom: 3 },
  OCEANIA: { name: '오세아니아', lat: -25.0, lng: 135.0, zoom: 3 },
};

export const WORLD_ERAS: Record<EraType, string> = {
  ALL: '전체 시대',
  ANCIENT: '고대 (~5세기)',
  MEDIEVAL: '중세 (5~15세기)',
  EARLY_MODERN: '근세 (15~18세기)',
  MODERN: '근대 (18~20세기 초)',
  CONTEMPORARY: '현대 (1945년~현재)',
};

export const EVENT_CATEGORIES: Record<EventCategoryType, { name: string; icon: string; color: string; bgColor: string }> = {
  revolution: { name: '혁명·시민운동', icon: '⚡', color: '#e11d48', bgColor: '#ffe4e6' },
  war: { name: '전쟁·전투', icon: '⚔️', color: '#ea580c', bgColor: '#ffedd5' },
  treaty: { name: '조약·외교', icon: '📜', color: '#0284c7', bgColor: '#e0f2fe' },
  thought: { name: '사상·종교·헌정', icon: '⚖️', color: '#7c3aed', bgColor: '#f3e8ff' },
  discovery: { name: '과학·탐험·교역', icon: '🧭', color: '#059669', bgColor: '#d1fae5' },
  culture: { name: '문화·예술·유산', icon: '🏛️', color: '#d97706', bgColor: '#fef3c7' },
};

export const WORLD_HISTORY_EVENTS: WorldHistoryEvent[] = ALL_WORLD_HISTORY_EVENTS;

export const WORLD_HISTORY_DEBATES: HistoricalDebate[] = [
  {
    id: 'french-revolution',
    title: '프랑스 대혁명과 루이 16세 처형, 자유를 위한 필연인가 공포정치의 폭주인가?',
    subtitle: '국민주권 확립의 불가피한 혁명 vs 무차별 단두대 처형과 공포정치의 광기',
    period: 'MODERN',
    periodName: '근대 유럽사 (18세기 말)',
    era: '1789~1794년',
    continent: 'EUROPE',
    historicalFigure: '로베스피에르, 루이 16세, 당통, 마라',
    background: '1789년 바스티유 습격으로 시작된 프랑스 혁명은 절대왕정을 타파하고 인권선언을 낳았으나, 대외 전쟁과 반혁명 음모 속에서 루이 16세가 단두대에서 처형되고 로베스피에르의 자코뱅파 공포정치로 1만 7천여 명이 처형되는 극단적 폭력으로 이어졌습니다.',
    proStance: {
      title: '자유와 평등을 쟁취한 불가피한 구국 결단 (긍정론)',
      summary: '수백 년간 백성을 수탈한 구체제 봉건 귀족과 왕정의 결탁을 청산하지 않고는 근대 민주주의의 기틀을 세울 수 없었다.',
      arguments: [
        '외세(오스트리아·프로이센)와 내통한 국왕을 처벌한 것은 조국의 존망을 지키기 위한 정당한 방어권 행사였다.',
        '봉건적 특권과 면세 혜택을 철폐하고 인류 보편의 인권선언과 법 앞의 평등을 확립했다.',
        '구체제의 반혁명 폭력에 맞서 혁명을 지키기 위한 비상조치로서 역사적 맥락에서 이해되어야 한다.'
      ]
    },
    conStance: {
      title: '법치와 인권을 파괴한 극단적 공포정치의 폭주 (비판론)',
      summary: '자유를 명분으로 시작했으나 결국 무고한 시민과 온건파까지 단두대로 보낸 전체주의적 광기였다.',
      arguments: [
        '적법절차 없이 정적을 제거하고 마녀사냥식 반혁명 혐의로 사회 전체를 공포에 빠뜨렸다.',
        '국왕 처형은 온건 개혁파를 등돌리게 만들고 유럽 전역과의 끝없는 유혈 전쟁을 자초했다.',
        '결국 혁명의 혼란은 나폴레옹의 군사 독재로 이어져 혁명의 본래 취지를 퇴색시켰다.'
      ]
    },
    neutralStance: {
      title: '근대 민주주의 산통과 극단주의의 교훈 (재해석)',
      summary: '인류가 전제정에서 민주정으로 이행하는 거대한 진통 속에서 폭력의 한계와 제도적 견제의 필요성을 동시에 일깨운 이중적 역사.',
      arguments: [
        '혁명의 이상(자유·평등·우애)은 인류의 영원한 유산이나, 목적이 수단을 정당화할 수 없다는 비극적 교훈을 남겼다.',
        '당대 유럽 열강의 포위 공격이라는 극한의 위기 상황을 배제하고 단순한 광기로만 치부할 수는 없다.'
      ]
    },
    votes: { pro: 580, con: 340, neutral: 210 },
    commentsCount: 28,
    viewsCount: 2450,
    tags: ['프랑스혁명', '단두대', '인권선언', '근대사'],
    createdAt: '2026-08-01T00:00:00Z',
    isHot: true,
    relatedEventId: 'ev-paris-revolution'
  },
  {
    id: 'caesar-dictatorship',
    title: '카이사르의 루비콘 강 도하와 종신독재, 구국의 영웅인가 공화정의 파괴자인가?',
    subtitle: '부패한 원로원 귀족 과두정의 타파 vs 500년 로마 민주 공화정의 참주적 찬탈',
    period: 'ANCIENT',
    periodName: '고대 로마사 (기원전 1세기)',
    era: '기원전 49~44년',
    continent: 'EUROPE',
    historicalFigure: '율리우스 카이사르, 브루투스, 키케로, 폼페이우스',
    background: '갈리아를 정복한 카이사르는 군대를 해산하라는 원로원의 명령을 거부하고 루비콘 강을 건넜습니다. 내전에서 승리한 후 종신 독재관에 올라 빈민 구제, 달력 개정(율리우스력), 속주민 시민권 확대를 단행했으나, 기원전 44년 공화정을 지키려는 브루투스 등에게 암살당했습니다.',
    proStance: {
      title: '부패한 과두정을 종식시킨 실용적 개혁 군주 (긍정론)',
      summary: '특권 귀족들의 부패와 내란으로 마비된 로마를 구해내고 민중의 복지와 광대한 제국의 질서를 재건했다.',
      arguments: [
        '원로원 귀족파는 소수 가문의 사리사욕만을 채우며 제국 통치 능력을 완전히 상실한 상태였다.',
        '토지 분배, 부채 탕감, 속주민 시민권 확대로 평민과 피정복민의 삶을 획기적으로 개선했다.',
        '강력한 중앙 권력 없이는 지중해 전역으로 팽창한 거대 제국을 통치할 수 없다는 현실적 결단이었다.'
      ]
    },
    conStance: {
      title: '법치와 자유를 짓밟은 불법 군사 쿠데타 독재자 (비판론)',
      summary: '공화정의 헌정 질서를 군사력으로 유린하고 스스로 왕이 되려 한 야심가의 찬탈이었다.',
      arguments: [
        '자신의 정치적 기소를 피하고 권력을 독점하기 위해 국가의 법을 어기고 조국을 상대로 내전을 일으켰다.',
        '500년간 피땀으로 일군 공화정의 권력 분립과 원로원 협치 전통을 일인 독재로 영구 파괴했다.',
        '종신 독재관 취임은 공화정 수호자들에게 암살이라는 극단적 저항을 부를 수밖에 없었던 오만이었다.'
      ]
    },
    neutralStance: {
      title: '도시국가 헌법의 한계와 제국화의 구조적 귀결 (재해석)',
      summary: '로마 공화정 헌법은 작은 도시국가용 시스템이었기에, 지중해 세계 제국을 경영하기 위한 제정으로의 전환은 역사적 필연이었다.',
      arguments: [
        '카이사르 개인이 아니었더라도 마리우스, 술라, 폼페이우스로 이어지는 군벌 정치의 종착역은 황제정이었다.',
        '공화정의 낭만적 이상과 거대 제국 경영의 현실적 필요성 사이의 충돌로 평가해야 한다.'
      ]
    },
    votes: { pro: 490, con: 310, neutral: 180 },
    commentsCount: 19,
    viewsCount: 1890,
    tags: ['로마사', '카이사르', '공화정', '고대사'],
    createdAt: '2026-08-05T00:00:00Z',
    relatedEventId: 'ev-rome-rubicon'
  },
  {
    id: 'columbus-voyage',
    title: '콜럼버스의 신대륙 도달, 인류 지리상의 대발견인가 침략과 수탈의 서막인가?',
    subtitle: '동서양 문명의 글로벌 대교류 vs 원주민 대학살과 식민 지배의 잔혹한 비극',
    period: 'EARLY_MODERN',
    periodName: '근세 대항해시대 (15세기 말)',
    era: '1492년~16세기',
    continent: 'AMERICAS',
    historicalFigure: '콜럼버스, 이사벨 여왕, 라스 카사스',
    background: '1492년 10월 12일 콜럼버스가 카리브해에 상륙한 이후 아메리카 대륙과 유라시아 대륙 간의 물자·농작물 교류가 시작되었습니다. 그러나 스페인 정복자들의 총·균·쇠에 의해 천연두 등 전염병과 잔혹한 엔코미엔다 강제노동으로 원주민 인구의 80~90%가 사망했습니다.',
    proStance: {
      title: '세계화의 문을 연 위대한 탐험과 인류 교류 (긍정론)',
      summary: '미지의 대양을 건넌 불굴의 항해 용기가 전 지구적 문명 통합과 근대 상업 혁명을 촉발했다.',
      arguments: [
        '옥수수, 감자, 고구마, 토마토 등 아메리카 작물이 구대륙으로 전파되어 유럽과 아시아의 기아 문제를 해결했다.',
        '전 지구적 무역망이 형성되어 근대 과학혁명과 자본주의 발전의 결정적 토대가 되었다.',
        '당대 항해술의 한계를 극복하고 세계 지도를 완성한 인류사 최고의 탐험적 업적이다.'
      ]
    },
    conStance: {
      title: '원주민 학살과 약탈, 노예무역을 부른 제국주의 침탈 (비판론)',
      summary: '이미 수천 년간 찬란한 문명을 일구고 살던 원주민들을 "발견"했다는 유럽 중심주의적 침략일 뿐이다.',
      arguments: [
        '황금 탐욕에 눈이 멀어 평화로운 원주민들을 노예화하고 신체 절단과 잔혹한 학살을 자행했다.',
        '잉카와 아즈텍 등 독창적인 고대 문명을 무력으로 파괴하고 유물들을 금괴로 녹여버렸다.',
        '이후 수백만 아프리카 흑인들을 강제 납치한 대서양 삼각 노예무역의 참혹한 지옥문을 열었다.'
      ]
    },
    neutralStance: {
      title: '콜럼버스의 교환: 생태사적 대변혁과 역사적 양면성 (재해석)',
      summary: '개인의 도덕적 평가를 넘어, 수만 년간 분리되어 있던 두 거대 생태계가 충돌하고 융합한 지구사적 사건으로 파악해야 한다.',
      arguments: [
        '질병의 전파는 의도치 않은 면역학적 비극이었으나, 정복자들의 탐욕과 제도적 착취는 엄격히 비판받아야 한다.',
        '유럽 중심주의 역사관에서 벗어나 원주민의 시각과 다각적 지구사 관점으로 재조명해야 한다.'
      ]
    },
    votes: { pro: 380, con: 520, neutral: 250 },
    commentsCount: 34,
    viewsCount: 2210,
    tags: ['콜럼버스', '대항해시대', '신대륙', '식민주의'],
    createdAt: '2026-08-10T00:00:00Z',
    relatedEventId: 'ev-columbus-voyage'
  },
  {
    id: 'luddite-industrial',
    title: '산업혁명과 러다이트 기계 파괴, 진보를 거부한 맹동인가 인간 존엄을 위한 저항인가?',
    subtitle: '기술 혁신과 생산력 증대를 가로막은 반동 vs 착취와 실업에 내몰린 노동자의 생존권 투쟁',
    period: 'MODERN',
    periodName: '근대 산업화기 (19세기 초)',
    era: '1811~1816년',
    continent: 'EUROPE',
    historicalFigure: '네드 러드, 제임스 와트, 바이런 경',
    background: '19세기 초 영국에서 면방적 기계의 도입으로 전통 직공들이 대거 실직하고 임금이 3분의 1로 급감했습니다. 노동자들은 기계를 파괴하며 임금 보장과 아동 노동 규제를 요구했으나, 영국 정부는 군대 1만 2천 명을 투입하고 기계 파괴를 사형에 처하는 법을 제정해 유혈 진압했습니다.',
    proStance: {
      title: '비인간적 착취에 맞선 정당한 인간 생존권 투쟁 (긍정론)',
      summary: '단순한 기계 혐오가 아니라 인간을 기계 부품으로 전락시키고 아이들을 죽음으로 내몬 자본의 탐욕에 대한 저항이었다.',
      arguments: [
        '당시 노동자들은 투표권도, 노동조합 결성권도 박탈당해 대화나 합법적 청원의 길이 완전히 막혀 있었다.',
        '하루 16시간씩 6세 아동까지 공장에서 혹사당하던 참상에 맞선 절박한 생존의 외침이었다.',
        '이들의 투쟁이 공론화되어 훗날 최초의 공장법 제정과 근대 노동권 보호 제도가 싹텄다.'
      ]
    },
    conStance: {
      title: '기술 진보와 인류 번영을 가로막은 무모한 폭력 (비판론)',
      summary: '기계화를 통한 생산성 혁신만이 인류 전체를 빈곤에서 구원할 수 있었으며, 기계 파괴는 퇴행적 폭력이었다.',
      arguments: [
        '산업혁명으로 면직물 가격이 폭락하여 전 세계 서민들이 따뜻하고 위생적인 옷을 입을 수 있게 되었다.',
        '기술 혁신은 단기적 일자리를 줄이지만 장기적으로 더 많은 고부가가치 산업과 일자리를 창출한다.',
        '사유재산 파괴와 공장 방화는 법치국가에서 용납될 수 없는 불법 폭동이었다.'
      ]
    },
    neutralStance: {
      title: '오늘날 AI 시대와 맞닿은 기술 전환기의 딜레마 (재해석)',
      summary: '오늘날 인공지능(AI)과 로봇 자동화로 일자리를 위협받는 현대 사회에서도 똑같이 되풀이되는 영원한 인류의 과제.',
      arguments: [
        '기술 진보 자체를 막을 수는 없으나, 그 과실이 소수 자본가에게만 독점되지 않도록 사회안전망을 구축해야 한다는 교훈.',
        '200년 전 러다이트의 절규는 21세기 AI 대전환기에도 여전히 깊은 울림을 준다.'
      ]
    },
    votes: { pro: 460, con: 280, neutral: 390 },
    commentsCount: 22,
    viewsCount: 1650,
    tags: ['산업혁명', '러다이트', '노동권', 'AI시대'],
    createdAt: '2026-08-12T00:00:00Z',
    relatedEventId: 'ev-england-industrial'
  },
  {
    id: 'gwanghaegun-diplomacy',
    title: '광해군의 대외 중립외교, 실리적 구국외교인가 배은망덕한 외교인가?',
    subtitle: '명나라와 후금 사이에서 펼친 실리외교의 역사적 평가와 사료 분석',
    period: 'JOSEON_LATE',
    periodName: '조선 후기 (17세기 초)',
    era: '1608~1623년',
    continent: 'ASIA',
    historicalFigure: '광해군, 강홍립, 인조',
    background: '임진왜란 직후 국력이 쇠락한 조선은 만주에서 급성장한 후금(청)과 임진왜란 때 원병을 보낸 명나라의 참전 요구 사이에서 생존의 기로에 섰습니다. 광해군은 명나라의 파병 요구에 부응해 강홍립을 도원수로 삼아 군사를 보내면서도, 전황을 보아 후금과 불필요한 충돌을 피하도록 밀지를 내렸습니다. 이후 인조반정 세력은 이를 "배은망덕"이라 규탄하며 폐위의 핵심 명분으로 삼았습니다.',
    proStance: {
      title: '현실주의 실리 구국외교 (긍정론)',
      summary: '국제 정세의 흐름을 냉철히 꿰뚫고 전란으로 피폐해진 백성과 국토를 보전한 탁월한 실리 외교였다.',
      arguments: [
        '전후 국가 재건이 시급한 상황에서 강성해지는 후금과의 전면전을 피해 전쟁의 참화를 막았다.',
        '명나라의 무리한 군사 징발 요구에 형식상 응하면서도 실질적인 군사력 손실을 최소화했다.',
        '이념과 명분보다 백성의 생명과 국가 존망을 최우선에 둔 실용주의 군주의 결단이었다.'
      ]
    },
    conStance: {
      title: '명의(名義)와 신의를 저버린 외교 (비판론)',
      summary: '재조지은(再造之恩)의 신의를 저버리고 사대명분을 훼손하여 정통성 위기와 반정을 자초했다.',
      arguments: [
        '임진왜란 당시 나라를 구해준 명나라에 대한 국가 간 신의와 유교적 의리를 헌신짝처럼 버렸다.',
        '조정 내 신료들과 소통 없이 독단적 밀지와 비공식 밀사 외교를 펼쳐 국내 정치적 분열을 격화시켰다.',
        '결국 인조반정의 빌미를 주었고, 이후 정묘호란과 병자호란의 외교적 완충 역할을 근본적으로 해결하지 못했다.'
      ]
    },
    neutralStance: {
      title: '시대적 딜레마와 구조적 한계 (재해석)',
      summary: '약소국 조선이 직면한 지정학적 비극 속에서 국방력 강화 없이 외교적 술수에만 의존한 한계가 공존한다.',
      arguments: [
        '광해군의 외교적 판단은 불가피했으나 궁궐 중건 등으로 내치와 국방을 함께 다지지 못해 지속가능성이 없었다.',
        '성리학적 대의명분이 지배하던 당대 조선 지식인 사회에서 수용되기 힘든 급진적 독자노선이었다.'
      ]
    },
    votes: { pro: 620, con: 210, neutral: 140 },
    commentsCount: 42,
    viewsCount: 3100,
    tags: ['광해군', '중립외교', '조선실록', '외교사'],
    createdAt: '2026-08-01T00:00:00Z',
    isHot: true,
    relatedEventId: 'ev-korea-gwanghaegun'
  },
  {
    id: 'silla-samguk-unification',
    title: '신라의 삼국통일, 민족 통합의 효시인가 외세 결탁 영토 축소인가?',
    subtitle: '대동강 이남 독자적 민족사 정립 vs 당나라 외세 의존과 고구려 만주 영토 상실',
    period: 'SAMGUK',
    periodName: '삼국/통일신라 (7세기)',
    era: '676년',
    continent: 'ASIA',
    historicalFigure: '김춘추(태종무열왕), 김유신, 문무왕',
    background: '7세기 신라는 당나라와 나당동맹을 결성해 백제(660)와 고구려(668)를 멸망시켰습니다. 이후 당나라가 한반도 전체를 삼키려 하자 7년간의 나당전쟁(매소성·기벌포 전투)을 치러 당군을 몰아내고 대동강에서 원산만에 이르는 영역을 지켜냈습니다.',
    proStance: {
      title: '단일 민족 공동체 형성의 위대한 효시 (긍정론)',
      summary: '외세를 끌어들였으나 결국 당의 야욕을 군사적으로 꺾고 한반도에 영구한 민족 문화의 터전을 확립했다.',
      arguments: [
        '나당전쟁에서 당나라 20만 대군을 자력으로 격파하여 자주적 주권을 온전히 지켜냈다.',
        '고구려와 백제의 유민을 포섭하고 9주 5소경 제도를 통해 하나의 민족 정체성을 탄생시켰다.',
        '불국사, 석굴암 등 찬란한 통일신라 문화의 황금기를 일구어 민족 문화의 원류가 되었다.'
      ]
    },
    conStance: {
      title: '외세 결탁과 광대한 북방 영토 상실의 한계 (비판론)',
      summary: '동족 국가를 멸망시키기 위해 외세를 끌어들였고, 만주 대륙을 상실하여 한반도에 갇힌 반쪽 통일이었다.',
      arguments: [
        '한민족 역사상 가장 웅대했던 고구려의 만주와 요동 영토를 당나라에 넘겨주었다.',
        '민족이라는 의식이 없던 고대 삼국의 권력 쟁탈전에서 외세를 끌어들인 위험한 선례를 남겼다.',
        '발해의 건국으로 남북국 시대가 이어졌으므로 신라의 통일은 불완전한 통일이었다.'
      ]
    },
    neutralStance: {
      title: '고대 국가 생존의 필연성과 역사적 진화 (재해석)',
      summary: '당시에는 민족의 개념이 형성되기 전이었으며, 약소국 신라의 국가 생존 전략으로 바라보아야 한다.',
      arguments: [
        '고대 국가 간의 영토 전쟁을 현대적 민족주의 잣대로만 비판하는 것은 역사적 맥락을 무시한 소급 적용이다.',
        '비록 북방을 잃었으나 단일 언어와 문화를 공유하는 역사적 구심점을 마련했다는 점은 인정해야 한다.'
      ]
    },
    votes: { pro: 440, con: 480, neutral: 210 },
    commentsCount: 31,
    viewsCount: 2600,
    tags: ['신라', '삼국통일', '나당전쟁', '한국고대사'],
    createdAt: '2026-08-03T00:00:00Z',
    relatedEventId: 'ev-korea-silla-unification'
  }
];

export const WORLD_HISTORY_QUIZZES: WorldHistoryQuizQuestion[] = [
  {
    id: 'q-1',
    type: 'map_locate',
    question: '1789년 7월 14일, 시민들이 전제군주정의 상징인 바스티유 감옥을 습격하며 혁명의 불꽃을 당긴 유럽의 수도는 어디일까요?',
    options: ['프랑스 파리', '영국 런던', '독일 베를린', '이탈리아 로마'],
    correctIndex: 0,
    explanation: '프랑스 파리에서 일어난 바스티유 감옥 습격은 프랑스 대혁명의 공식 시발점으로, 현재도 프랑스 혁명 기념일(국경일)로 성대히 기념되고 있습니다.',
    relatedEventId: 'ev-paris-revolution',
    country: '프랑스',
    era: 'MODERN',
    sourceCitation: '프랑스 인권선언문 (1789년 8월 26일)'
  },
  {
    id: 'q-2',
    type: 'quote_figure',
    question: '"주사위는 던져졌다(Alea iacta est)"는 명언을 남기며 로마 원로원의 해산 명령을 거부하고 국경 하천인 루비콘 강을 건넌 고대 로마의 장군은 누구일까요?',
    options: ['스키피오 아프리카누스', '율리우스 카이사르', '그라쿠스 형제', '폼페이우스 마그누스'],
    correctIndex: 1,
    explanation: '율리우스 카이사르는 기원전 49년 1월, 원로원의 군대 해산 명령에 맞서 루비콘 강을 건너며 로마로 진격했고 이는 로마 제정 성립의 도화선이 되었습니다.',
    relatedEventId: 'ev-rome-rubicon',
    country: '이탈리아',
    era: 'ANCIENT',
    sourceCitation: '수에토니우스 『황제열전』 (De Vita Caesarum)'
  },
  {
    id: 'q-3',
    type: 'multiple_choice',
    question: '1773년 보스턴 차 사건 당시 아메리카 식민지 주민들이 영국 정부의 일방적 과세에 항의하며 내건 핵심 구호는 무엇이었을까요?',
    options: [
      '자유가 아니면 죽음을 달라',
      '대표 없는 곳에 과세 없다 (No taxation without representation)',
      '모든 인간은 평등하게 창조되었다',
      '빵과 평화를 달라'
    ],
    correctIndex: 1,
    explanation: '영국 의회에 식민지 주민을 대변하는 의원이 없는 상태에서 일방적으로 부과된 세금은 부당하다는 "대표 없는 곳에 과세 없다"는 원칙이 미국 독립전쟁의 핵심 사상적 토대가 되었습니다.',
    relatedEventId: 'ev-boston-tea',
    country: '미국',
    era: 'MODERN',
    sourceCitation: '미국 독립선언서 (1776년)'
  },
  {
    id: 'q-4',
    type: 'quote_figure',
    question: '조선왕조실록에 따르면, 명나라의 파병 요구로 심하 전투에 출정한 도원수 강홍립에게 "사태의 변화를 보아 죽을 힘을 다하지 말라(觀變而圖, 勿致死力)"는 비밀 어명을 내린 조선의 군주는 누구일까요?',
    options: ['선조', '광해군', '인조', '효종'],
    correctIndex: 1,
    explanation: '광해군은 임진왜란 직후 피폐해진 국력을 보존하고 신흥 강국 후금(청)과의 전면전을 피하기 위해 형식상 파병하면서도 강홍립에게 상황에 맞게 처신하라는 밀지를 내렸습니다.',
    relatedEventId: 'ev-korea-gwanghaegun',
    country: '한국',
    era: 'EARLY_MODERN',
    sourceCitation: '조선왕조실록 광해군일기 11년 3월 12일'
  },
  {
    id: 'q-5',
    type: 'ox',
    question: '[OX 퀴즈] 19세기 초 영국에서 일어난 러다이트(Luddite) 운동은 기계 과학 기술 자체를 사탄의 도구로 보아 기술 문명을 영구 거부하려는 종교적 광신 운동이었다.',
    options: ['O (그렇다)', 'X (아니다)'],
    correctIndex: 1,
    explanation: 'X: 러다이트 운동은 기계 자체를 혐오한 것이 아니라, 기계화 도입을 계기로 임금을 깎고 노동자를 대량 해고하며 아동 노동을 혹사시키던 자본가들의 탐욕과 생존권 위협에 저항한 사회 노동 운동이었습니다.',
    relatedEventId: 'ev-england-industrial',
    country: '영국',
    era: 'MODERN',
    sourceCitation: '러다이트 서한 (1812년)'
  },
  {
    id: 'q-6',
    type: 'multiple_choice',
    question: '675년 신라 문무왕 때, 한반도를 직접 지배하려던 당나라 장수 이근행의 20만 대군을 궤멸시키고 말 3만여 필을 노획하여 나당전쟁의 승기를 결정지은 격전지는 어디일까요?',
    options: ['연천 매소성 (買肖城)', '서천 기벌포 (伎伐浦)', '황산벌', '안시성'],
    correctIndex: 0,
    explanation: '신라는 675년 음력 9월 매소성(현재의 경기도 연천 일대)에서 당나라 20만 군사를 대파함으로써 당나라의 한반도 지배 야욕을 결정적으로 좌절시켰습니다.',
    relatedEventId: 'ev-korea-silla-unification',
    country: '한국',
    era: 'ANCIENT',
    sourceCitation: '삼국사기 권제7 신라본기 문무왕 15년'
  },
  {
    id: 'q-7',
    type: 'multiple_choice',
    question: '1215년 영국 존 왕에게 귀족들이 강요하여 "왕이라 할지라도 국법과 적법절차 위에 군림할 수 없다"는 법치주의의 기틀을 확립한 헌정 문서의 이름은 무엇일까요?',
    options: ['권리장전 (Bill of Rights)', '마그나 카르타 (대헌장, Magna Carta)', '독립선언서', '나폴레옹 법전'],
    correctIndex: 1,
    explanation: '러니미드 평원에서 서명된 마그나 카르타는 "합법적 재판에 의하지 않고는 시민을 체포하거나 재산을 빼앗을 수 없다"고 규정하여 근대 입헌주의의 효시가 되었습니다.',
    relatedEventId: 'ev-england-magna-carta',
    country: '영국',
    era: 'MEDIEVAL',
    sourceCitation: '마그나 카르타 제39조 (1215년)'
  },
  {
    id: 'q-8',
    type: 'map_locate',
    question: '1989년 11월 9일, 동서 냉전 분단의 상징이었던 콘크리트 장벽이 시민들의 평화 혁명으로 무너진 도시는 어디일까요?',
    options: ['독일 베를린', '체코 프라하', '헝가리 부다페스트', '오스트리아 빈'],
    correctIndex: 0,
    explanation: '베를린 장벽의 붕괴는 28년간 이어진 분단의 종식이자 이듬해 동서독 통일과 소련 해체로 이어지는 냉전 종식의 상징적 사건이었습니다.',
    relatedEventId: 'ev-berlin-wall',
    country: '독일',
    era: 'CONTEMPORARY',
    sourceCitation: '레이건 대통령 브란덴부르크 연설 (1987년)'
  },
  {
    id: 'q-9',
    type: 'quote_figure',
    question: '27년간의 감옥 생활 끝에 석방되어 "진실과 화해"를 이끌며 남아프리카공화국의 악명 높은 인종차별 제도(아파르트헤이트)를 평화적으로 철폐한 인물은 누구일까요?',
    options: ['마틴 루터 킹', '넬슨 만델라', '말콤 엑스', '코피 아난'],
    correctIndex: 1,
    explanation: '넬슨 만델라는 피의 보복 대신 진실화해위원회를 통해 화해와 공존을 선택하여 1993년 노벨평화상을 수상하고 남아공 최초의 흑인 대통령이 되었습니다.',
    relatedEventId: 'ev-south-africa-mandela',
    country: '남아공',
    era: 'CONTEMPORARY',
    sourceCitation: '리보니아 재판 최후 진술 (1964년)'
  },
  {
    id: 'q-10',
    type: 'ox',
    question: '[OX 퀴즈] 1492년 콜럼버스가 신대륙에 도착했을 때, 그는 자신이 아시아 대륙의 동쪽 끝(인도 근해)에 도착했다고 죽을 때까지 믿었다.',
    options: ['O (그렇다)', 'X (아니다)'],
    correctIndex: 0,
    explanation: 'O: 콜럼버스는 생을 마감할 때까지 자신이 발견한 땅이 새로운 대륙이 아니라 아시아(인도)의 일부라고 굳게 믿었으며, 이로 인해 카리브해 섬들이 서인도제도라 불리게 되었습니다.',
    relatedEventId: 'ev-columbus-voyage',
    country: '바하마/스페인',
    era: 'EARLY_MODERN',
    sourceCitation: '콜럼버스 4차 항해 서한'
  },
  {
    id: 'q-11',
    type: 'multiple_choice',
    question: '1592년 한산도 대첩에서 이순신 장군이 왜선 59척을 궤멸시키며 사용한, 학이 날개를 펼친 형상으로 적을 둘러싸 일제 사격하는 유명한 포위 해상 진법은 무엇일까요?',
    options: ['어린진 (魚鱗陣)', '학익진 (鶴翼陣)', '방진 (方陣)', '봉시진 (鋒矢陣)'],
    correctIndex: 1,
    explanation: '이순신 장군은 좁은 견내량에서 한산도 앞 넓은 바다로 왜선을 유인한 뒤 학익진을 펼쳐 함포의 일제 사격으로 적을 압도하여 남해의 제해권을 완전히 장악했습니다.',
    relatedEventId: 'ev-korea-hansan-battle',
    country: '한국',
    era: 'EARLY_MODERN',
    sourceCitation: '선조실록 25년 7월 / 난중일기'
  },
  {
    id: 'q-12',
    type: 'map_locate',
    question: '1962년 10월, 소련의 핵미사일 기지 건설로 미국과 소련이 13일 동안 3차 대전 핵전쟁 직전까지 대치했던 카리브해의 섬나라는 어디일까요?',
    options: ['쿠바', '자메이카', '아이티', '푸에르토리코'],
    correctIndex: 0,
    explanation: '쿠바 미사일 위기 동안 케네디와 흐루쇼프의 극비 외교 협상을 통해 소련의 미사일 철수와 미국의 쿠바 침공 포기가 타결되어 핵전쟁을 모면했습니다.',
    relatedEventId: 'ev-cuba-missile-crisis',
    country: '쿠바',
    era: 'CONTEMPORARY',
    sourceCitation: '케네디 대통령 연설 (1962년 10월 22일)'
  }
];
