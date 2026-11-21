import {
  CivicIssue,
  NewsArticle,
  RegionInfo,
  CategoryInfo,
  HistoricalDebate,
  FactCheckItem,
  HistoricalSource,
  HistoricalSitePin,
  DebateUserComment,
  IssueStatusType,
  IssueCategoryType
} from "../types";

export const REGION_CENTERS: Record<string, RegionInfo> = {
  "전국": {
    "name": "전국 전체",
    "lat": 36.3,
    "lng": 127.8,
    "zoom": 7
  },
  "서울": {
    "name": "서울특별시",
    "lat": 37.5665,
    "lng": 126.978,
    "zoom": 12
  },
  "경기": {
    "name": "경기도",
    "lat": 37.4138,
    "lng": 127.5183,
    "zoom": 10
  },
  "인천": {
    "name": "인천광역시",
    "lat": 37.4563,
    "lng": 126.7052,
    "zoom": 11
  },
  "부산": {
    "name": "부산광역시",
    "lat": 35.1796,
    "lng": 129.0756,
    "zoom": 12
  },
  "대구": {
    "name": "대구광역시",
    "lat": 35.8714,
    "lng": 128.6014,
    "zoom": 12
  },
  "대전": {
    "name": "대전광역시",
    "lat": 36.3504,
    "lng": 127.3845,
    "zoom": 12
  },
  "광주": {
    "name": "광주광역시",
    "lat": 35.1595,
    "lng": 126.8526,
    "zoom": 12
  },
  "울산": {
    "name": "울산광역시",
    "lat": 35.5384,
    "lng": 129.3114,
    "zoom": 12
  },
  "세종": {
    "name": "세종특별자치시",
    "lat": 36.48,
    "lng": 127.289,
    "zoom": 12
  },
  "강원": {
    "name": "강원특별자치도",
    "lat": 37.8228,
    "lng": 128.1555,
    "zoom": 9
  },
  "충북": {
    "name": "충청북도",
    "lat": 36.8,
    "lng": 127.7,
    "zoom": 9
  },
  "충남": {
    "name": "충청남도",
    "lat": 36.5184,
    "lng": 126.8,
    "zoom": 9
  },
  "전북": {
    "name": "전북특별자치도",
    "lat": 35.7175,
    "lng": 127.153,
    "zoom": 9
  },
  "전남": {
    "name": "전라남도",
    "lat": 34.8679,
    "lng": 126.991,
    "zoom": 9
  },
  "경북": {
    "name": "경상북도",
    "lat": 36.576,
    "lng": 128.5056,
    "zoom": 9
  },
  "경남": {
    "name": "경상남도",
    "lat": 35.4606,
    "lng": 128.2132,
    "zoom": 9
  },
  "제주": {
    "name": "제주특별자치도",
    "lat": 33.4996,
    "lng": 126.5312,
    "zoom": 11
  }
};

export const CATEGORIES: Record<string, CategoryInfo> = {
  "safety": {
    "id": "safety",
    "name": "안전/치안",
    "icon": "🚨",
    "color": "#e74c3c",
    "bgColor": "#fde8e8",
    "description": "가로등 고장, 어두운 골목, CCTV 사각지대, 빈집 붕괴위험 등"
  },
  "environment": {
    "id": "environment",
    "name": "환경/위생",
    "icon": "🚮",
    "color": "#27ae60",
    "bgColor": "#e8f8f0",
    "description": "쓰레기 무단투기, 악취 발생, 하천 오염, 불법 소각 등"
  },
  "traffic": {
    "id": "traffic",
    "name": "교통/도로",
    "icon": "🚗",
    "color": "#e67e22",
    "bgColor": "#fdf2e9",
    "description": "불법주정차, 보도블록/포트홀 파손, 신호등 고장, 스쿨존 위험 등"
  },
  "welfare": {
    "id": "welfare",
    "name": "복지/보행",
    "icon": "♿",
    "color": "#8e44ad",
    "bgColor": "#f4ecf7",
    "description": "휠체어/유모차 통행불가 턱, 시각장애인 유도블록 파손, 쉼터 부족 등"
  },
  "noise": {
    "id": "noise",
    "name": "소음/생활불편",
    "icon": "📢",
    "color": "#2980b9",
    "bgColor": "#ebf5fb",
    "description": "공사장 소음/분진, 야간 고성방가, 상가 에어컨 실외기 열기 등"
  }
};

export const ISSUE_STATUS: Record<string, { id: string; label: string; icon: string; badgeClass: string; color: string }> = {
  "pending": {
    "id": "pending",
    "label": "접수중",
    "icon": "🟡",
    "badgeClass": "badge-pending",
    "color": "#f39c12"
  },
  "in_progress": {
    "id": "in_progress",
    "label": "검토/처리중",
    "icon": "🔵",
    "badgeClass": "badge-progress",
    "color": "#3498db"
  },
  "resolved": {
    "id": "resolved",
    "label": "해결완료",
    "icon": "🟢",
    "badgeClass": "badge-resolved",
    "color": "#2ecc71"
  }
};

export const INITIAL_CIVIC_ISSUES: CivicIssue[] = [
  {
    "id": "seoul-001",
    "title": "신촌 주택가 골목길 가로등 2주째 소등 (야간 보행 위험)",
    "description": "연세대 인근 주택가 골목길 가로등 3개가 2주째 켜지지 않아 밤마다 매우 어둡고 여성 귀가길이 위험합니다. 빠른 교체 부탁드립니다.",
    "category": "safety",
    "region_sido": "서울",
    "region_gugun": "서대문구",
    "address": "서울특별시 서대문구 연세로5가길 14",
    "latitude": 37.5583,
    "longitude": 126.9368,
    "imageUrl": "",
    "status": "pending",
    "likeCount": 42,
    "authorName": "연희동주민",
    "passwordHash": "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
    "createdAt": "2026-08-15T19:30:00Z",
    "resolutionComment": ""
  },
  {
    "id": "seoul-002",
    "title": "강남역 11번 출구 뒤편 이면도로 불법 투기 쓰레기산",
    "description": "주말마다 먹자골목 배달 상자 및 일회용 컵 등이 대량으로 방치되어 악취가 심각하고 보행 통행에 방해가 됩니다.",
    "category": "environment",
    "region_sido": "서울",
    "region_gugun": "강남구",
    "address": "서울특별시 강남구 테헤란로1길 28",
    "latitude": 37.4995,
    "longitude": 127.0286,
    "imageUrl": "",
    "status": "in_progress",
    "likeCount": 68,
    "authorName": "강남직장인",
    "passwordHash": "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
    "createdAt": "2026-08-14T09:15:00Z",
    "resolutionComment": "강남구청 청소행정과에서 매일 야간 수거반을 배치하여 집중 정비 중입니다."
  },
  {
    "id": "seoul-003",
    "title": "성수동 카페거리 횡단보도 턱 낮춤 미흡 (휠체어 진입 불가)",
    "description": "보도블록과 차도 사이 단차가 10cm 이상 높아 전동 휠체어와 유모차가 차도로 내려앉아 크게 위험합니다.",
    "category": "welfare",
    "region_sido": "서울",
    "region_gugun": "성동구",
    "address": "서울특별시 성동구 연무장길 35",
    "latitude": 37.5441,
    "longitude": 127.0563,
    "imageUrl": "",
    "status": "resolved",
    "likeCount": 115,
    "authorName": "성수지킴이",
    "passwordHash": "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
    "createdAt": "2026-08-01T14:20:00Z",
    "resolutionComment": "성동구 도로과에서 완경사 경사로 설치 공사를 완료했습니다. (2026-08-10 완료)"
  },
  {
    "id": "gyeonggi-001",
    "title": "판교 테크노밸리 사거리 심각한 출퇴근 꼬리물기 및 불법주정차",
    "description": "출퇴근 시간대 버스 정류장 앞 택시와 승용차의 이중 불법주정차로 인해 횡단보도를 건너는 보행자 시야가 완전히 가려집니다.",
    "category": "traffic",
    "region_sido": "경기",
    "region_gugun": "성남시 분당구",
    "address": "경기도 성남시 분당구 판교역로 235",
    "latitude": 37.4019,
    "longitude": 127.1086,
    "imageUrl": "",
    "status": "in_progress",
    "likeCount": 89,
    "authorName": "판교개발자",
    "passwordHash": "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
    "createdAt": "2026-08-16T08:30:00Z",
    "resolutionComment": "분당경찰서 및 분당구청에서 CCTV 단속 및 현장 단속을 강화하고 있습니다."
  },
  {
    "id": "gyeonggi-002",
    "title": "수원 인계동 나혜석거리 주말 야간 앰프 소음 피해",
    "description": "야간 11시 이후 주택가 바로 인접 상가에서 고출력 스피커를 외부에 설치해 주민들의 수면권이 심각하게 침해받고 있습니다.",
    "category": "noise",
    "region_sido": "경기",
    "region_gugun": "수원시 팔달구",
    "address": "경기도 수원시 팔달구 권광로180번길 24",
    "latitude": 37.2625,
    "longitude": 127.0322,
    "imageUrl": "",
    "status": "pending",
    "likeCount": 54,
    "authorName": "인계동주민",
    "passwordHash": "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
    "createdAt": "2026-08-17T23:10:00Z",
    "resolutionComment": ""
  },
  {
    "id": "busan-001",
    "title": "해운대 해변로 보행로 깊은 포트홀 (자전거·보행자 낙상 위험)",
    "description": "해운대 해변도로 자전거·보행 겸용 도로에 비 온 뒤 지름 30cm 가량의 포트홀이 생겼습니다. 야간에 발을 헛디딜 위험이 큽니다.",
    "category": "traffic",
    "region_sido": "부산",
    "region_gugun": "해운대구",
    "address": "부산광역시 해운대구 해운대해변로 264",
    "latitude": 35.1587,
    "longitude": 129.1604,
    "imageUrl": "",
    "status": "resolved",
    "likeCount": 76,
    "authorName": "부산갈매기",
    "passwordHash": "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
    "createdAt": "2026-08-05T11:00:00Z",
    "resolutionComment": "해운대구 건설과에서 긴급 아스콘 덧씌우기 보수 공사를 완료하였습니다."
  },
  {
    "id": "busan-002",
    "title": "영도구 산복도로 급경사 계단 핸드레일 부식 및 파손",
    "description": "어르신들이 매일 이용하시는 산복도로 연결 계단의 손잡이가 심하게 녹슬어 흔들립니다. 겨울철 낙상 사고가 우려됩니다.",
    "category": "welfare",
    "region_sido": "부산",
    "region_gugun": "영도구",
    "address": "부산광역시 영도구 하나길 42",
    "latitude": 35.0924,
    "longitude": 129.0435,
    "imageUrl": "",
    "status": "pending",
    "likeCount": 63,
    "authorName": "영도사랑",
    "passwordHash": "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
    "createdAt": "2026-08-18T16:40:00Z",
    "resolutionComment": ""
  },
  {
    "id": "daegu-001",
    "title": "동성로 로데오거리 클럽 밀집구역 야간 담배꽁초 및 오물 방치",
    "description": "배수구 빗물받이가 담배꽁초로 꽉 막혀 악취가 발생하고 비가 올 때 역류할 위험이 있습니다.",
    "category": "environment",
    "region_sido": "대구",
    "region_gugun": "중구",
    "address": "대구광역시 중구 동성로3길 56",
    "latitude": 35.8682,
    "longitude": 128.5968,
    "imageUrl": "",
    "status": "in_progress",
    "likeCount": 47,
    "authorName": "동성로상인",
    "passwordHash": "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
    "createdAt": "2026-08-16T15:00:00Z",
    "resolutionComment": "중구청 환경과에서 빗물받이 준설 작업 및 금연거리 단속을 병행 중입니다."
  },
  {
    "id": "incheon-001",
    "title": "송도 센트럴파크 인근 스쿨존 횡단보도 신호등 점멸 오류",
    "description": "초등학교 정문 앞 횡단보도 보행 신호등이 간헐적으로 꺼지는 현상이 있어 등하교길 학생들의 안전이 위협받고 있습니다.",
    "category": "safety",
    "region_sido": "인천",
    "region_gugun": "연수구",
    "address": "인천광역시 연수구 컨벤시아대로 130",
    "latitude": 37.3925,
    "longitude": 126.6392,
    "imageUrl": "",
    "status": "resolved",
    "likeCount": 98,
    "authorName": "송도학부모",
    "passwordHash": "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
    "createdAt": "2026-08-08T08:10:00Z",
    "resolutionComment": "연수경찰서 교통안전계에서 신호 제어기 메인보드 전면 교체 완료하였습니다."
  },
  {
    "id": "gwangju-001",
    "title": "충장로 번화가 노후 보도블록 뒤틀림 (비 오는 날 물 튐 및 넘어짐)",
    "description": "충장로 상점가 앞 인도 블록이 여러 군데 깨져있어 비 오는 날 밟으면 흙탕물이 튀고 어르신들이 발을 헛디딥니다.",
    "category": "traffic",
    "region_sido": "광주",
    "region_gugun": "동구",
    "address": "광주광역시 동구 충장로안길 12",
    "latitude": 35.1488,
    "longitude": 126.9182,
    "imageUrl": "",
    "status": "pending",
    "likeCount": 39,
    "authorName": "광주시민",
    "passwordHash": "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
    "createdAt": "2026-08-17T13:20:00Z",
    "resolutionComment": ""
  },
  {
    "id": "daejeon-001",
    "title": "둔산동 학원가 심야 학원차량 3중 주차로 인한 학생 안전사고 위험",
    "description": "밤 10시 학원 끝나는 시간에 대형 버스와 승용차가 도로 3차선을 완전히 가로막아 매우 혼잡하고 시야 확보가 안 됩니다.",
    "category": "traffic",
    "region_sido": "대전",
    "region_gugun": "서구",
    "address": "대전광역시 서구 둔산로 51",
    "latitude": 36.3537,
    "longitude": 127.3789,
    "imageUrl": "",
    "status": "in_progress",
    "likeCount": 82,
    "authorName": "둔산맘",
    "passwordHash": "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
    "createdAt": "2026-08-15T22:00:00Z",
    "resolutionComment": "서구청 주차단속팀에서 심야 이동식 단속차량을 집중 배치 중입니다."
  },
  {
    "id": "ulsan-001",
    "title": "태화강 국가정원 산책로 인근 맹견 목줄 미착용 산책자 빈발",
    "description": "가족 단위 방문객과 어린이가 많은 잔디광장 인근에서 대형견 목줄 및 입마개 미착용 사례가 잦아 사고 우려가 높습니다.",
    "category": "safety",
    "region_sido": "울산",
    "region_gugun": "중구",
    "address": "울산광역시 중구 태화강국가정원길 154",
    "latitude": 35.5512,
    "longitude": 129.298,
    "imageUrl": "",
    "status": "pending",
    "likeCount": 51,
    "authorName": "태화강사랑",
    "passwordHash": "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
    "createdAt": "2026-08-18T18:00:00Z",
    "resolutionComment": ""
  },
  {
    "id": "sejong-001",
    "title": "나성동 어반아트리움 앞 공유 킥보드 무단 방치 (보행로 차단)",
    "description": "전동 킥보드 여러 대가 점자블록 한가운데 쓰러져 방치되어 시각장애인 및 유모차 통행이 불가능합니다.",
    "category": "welfare",
    "region_sido": "세종",
    "region_gugun": "나성동",
    "address": "세종특별자치시 나성로 96",
    "latitude": 36.4862,
    "longitude": 127.2618,
    "imageUrl": "",
    "status": "resolved",
    "likeCount": 73,
    "authorName": "세종이웃",
    "passwordHash": "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
    "createdAt": "2026-08-09T14:10:00Z",
    "resolutionComment": "세종시 즉시 견인 조치 및 전용 킥보드 주차구역 3개소를 신설했습니다."
  },
  {
    "id": "gangwon-001",
    "title": "춘천 소양강 스카이워크 인근 야간 쓰레기 투기 및 낚시 금지 구역 훼손",
    "description": "수변 공원에 낚시꾼들의 떡밥 쓰레기와 소주병이 그대로 버려져 하천 수질과 경관을 해치고 있습니다.",
    "category": "environment",
    "region_sido": "강원",
    "region_gugun": "춘천시",
    "address": "강원특별자치도 춘천시 영서로 2663",
    "latitude": 37.8931,
    "longitude": 127.7176,
    "imageUrl": "",
    "status": "pending",
    "likeCount": 35,
    "authorName": "춘천시민",
    "passwordHash": "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
    "createdAt": "2026-08-19T10:00:00Z",
    "resolutionComment": ""
  },
  {
    "id": "chungbuk-001",
    "title": "청주 성안길 골목길 건물 외벽 균열 및 낙하 위험",
    "description": "노후 상가 건물 3층 외벽 타일이 갈라져 떨어질 위험이 있습니다. 아래로 지나다니는 행인이 많아 안전 펜스 설치가 시급합니다.",
    "category": "safety",
    "region_sido": "충북",
    "region_gugun": "청주시 상당구",
    "address": "충청북도 청주시 상당구 상당로81번길 18",
    "latitude": 36.6358,
    "longitude": 127.4892,
    "imageUrl": "",
    "status": "in_progress",
    "likeCount": 62,
    "authorName": "청주안전지킴이",
    "passwordHash": "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
    "createdAt": "2026-08-17T11:40:00Z",
    "resolutionComment": "상당구 건축과에서 건물주에게 긴급 안전점검 및 보수 명령을 전달하였습니다."
  },
  {
    "id": "chungnam-001",
    "title": "천안 불당동 먹자골목 주말 심야 주폭 및 소음 공해",
    "description": "새벽 시간대 노상 음주와 고성방가로 인근 오피스텔 및 아파트 주민들의 민원이 지속되고 있습니다.",
    "category": "noise",
    "region_sido": "충남",
    "region_gugun": "천안시 서북구",
    "address": "충청남도 천안시 서북구 불당21로 67",
    "latitude": 36.8152,
    "longitude": 127.1065,
    "imageUrl": "",
    "status": "pending",
    "likeCount": 44,
    "authorName": "불당주민",
    "passwordHash": "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
    "createdAt": "2026-08-18T01:20:00Z",
    "resolutionComment": ""
  },
  {
    "id": "jeonbuk-001",
    "title": "전주 한옥마을 진입로 휠체어 전용 턱낮춤 유도블록 단절",
    "description": "관광객이 많은 한옥마을 초입 인도의 턱이 높아 장애인과 유아차의 진입이 매우 어렵습니다.",
    "category": "welfare",
    "region_sido": "전북",
    "region_gugun": "전주시 완산구",
    "address": "전북특별자치도 전주시 완산구 기린대로 99",
    "latitude": 35.8155,
    "longitude": 127.1512,
    "imageUrl": "",
    "status": "resolved",
    "likeCount": 91,
    "authorName": "전주사랑",
    "passwordHash": "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
    "createdAt": "2026-08-03T15:30:00Z",
    "resolutionComment": "전주시 도로정비과에서 무장애(Barrier-Free) 경사로 개선 공사를 마쳤습니다."
  },
  {
    "id": "jeonnam-001",
    "title": "여수 해양공원 야간 포장마차 쓰레기 해상 투기 우려",
    "description": "야간 관광객들이 먹다 남긴 음식물 쓰레기와 비닐봉투가 바다로 날아가 해양 오염이 심각합니다. 수거함 증설이 필요합니다.",
    "category": "environment",
    "region_sido": "전남",
    "region_gugun": "여수시",
    "address": "전라남도 여수시 이순신광장로 116",
    "latitude": 34.7398,
    "longitude": 127.742,
    "imageUrl": "",
    "status": "in_progress",
    "likeCount": 58,
    "authorName": "여수바다",
    "passwordHash": "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
    "createdAt": "2026-08-16T21:00:00Z",
    "resolutionComment": "여수시 기후생태과에서 분리수거함 4개소를 신규 설치하고 상시 모니터링을 진행 중입니다."
  },
  {
    "id": "gyeongbuk-001",
    "title": "포항 영일대 해수욕장 공용화장실 비상벨 고장 방치",
    "description": "야간 이용객이 많은 공용화장실 내 여성 안심 비상벨 전원이 꺼져 있어 응급상황 시 위험합니다.",
    "category": "safety",
    "region_sido": "경북",
    "region_gugun": "포항시 북구",
    "address": "경상북도 포항시 북구 두호동 685-1",
    "latitude": 36.0592,
    "longitude": 129.3788,
    "imageUrl": "",
    "status": "resolved",
    "likeCount": 84,
    "authorName": "포항안전",
    "passwordHash": "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
    "createdAt": "2026-08-07T17:00:00Z",
    "resolutionComment": "포항 북구청에서 비상벨 수리 및 경찰 112 직통 연계 점검을 마쳤습니다."
  },
  {
    "id": "gyeongnam-001",
    "title": "창원 상남동 번화가 불법 전단지 살포 및 도로 미끄럼",
    "description": "야간에 살포되는 코팅 전단지가 비에 젖어 도로가 매우 미끄럽고 오토바이와 행인이 넘어지는 사고가 발생하고 있습니다.",
    "category": "environment",
    "region_sido": "경남",
    "region_gugun": "창원시 성산구",
    "address": "경상남도 창원시 성산구 마디미로 28",
    "latitude": 35.2215,
    "longitude": 128.6815,
    "imageUrl": "",
    "status": "pending",
    "likeCount": 46,
    "authorName": "창원시민",
    "passwordHash": "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
    "createdAt": "2026-08-19T14:30:00Z",
    "resolutionComment": ""
  },
  {
    "id": "jeju-001",
    "title": "제주시 애월 해안도로 렌터카 불법 갓길주차로 인한 1차선 마비",
    "description": "오션뷰 카페 인근 좁은 2차선 도로에 렌터카들이 양쪽 갓길에 불법주차하여 마주 오는 차량이 교행하지 못하고 정체가 극심합니다.",
    "category": "traffic",
    "region_sido": "제주",
    "region_gugun": "제주시",
    "address": "제주특별자치도 제주시 애월읍 애월해맞이로 560",
    "latitude": 33.4651,
    "longitude": 126.3195,
    "imageUrl": "",
    "status": "in_progress",
    "likeCount": 104,
    "authorName": "제주도민",
    "passwordHash": "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
    "createdAt": "2026-08-13T12:00:00Z",
    "resolutionComment": "자치경찰단에서 고정식 불법주정차 단속 카메라 설치를 추진 중입니다."
  }
];

export const DEFAULT_NEWS_ARTICLES: NewsArticle[] = [
  {
    "id": "news-1",
    "title": "서울시, 야간 보행 안전 취약 골목길 120곳에 스마트 안심 가로등 전면 확대",
    "summary": "서울시가 범죄 예방 및 시민 야간 보행 안전을 위해 인공지능(AI) 기반 스마트 가로등과 비상벨 500개를 추가 설치한다고 밝혔습니다.",
    "category": "safety",
    "sido": "서울",
    "media": "연합뉴스",
    "publishedAt": "방금 전",
    "url": "https://www.yna.co.kr",
    "lat": 37.5665,
    "lng": 126.978
  },
  {
    "id": "news-2",
    "title": "부산 해운대구, 불법 주정차 및 보도블록 파손 구간 대대적 특별 정비 착수",
    "summary": "해운대구는 여름철 관광객 증가에 대비하여 보행자 통행을 방해하는 불법 적치물과 포트홀 집중 보수 공사에 들어갔습니다.",
    "category": "traffic",
    "sido": "부산",
    "media": "부산일보",
    "publishedAt": "12분 전",
    "url": "https://www.busan.com",
    "lat": 35.1796,
    "lng": 129.0756
  },
  {
    "id": "news-3",
    "title": "대구 도심 하천 악취 및 무단 쓰레기 투기 근절 민관 합동 순찰대 출범",
    "summary": "대구시는 신천 및 금호강 일대 수질 오염을 막기 위해 시민 감시단과 함께 야간 불법 투기 집중 단속을 시작했습니다.",
    "category": "environment",
    "sido": "대구",
    "media": "매일신문",
    "publishedAt": "25분 전",
    "url": "https://www.imaeil.com",
    "lat": 35.8714,
    "lng": 128.6014
  },
  {
    "id": "news-4",
    "title": "인천 부평구, 노후 초등학교 통학로 횡단보도 바닥신호등 및 옐로카펫 전면 교체",
    "summary": "어린이 보호구역 내 보행 교통사고 예방을 위해 시인성을 대폭 높인 스마트 바닥신호등 30개소가 완공되었습니다.",
    "category": "safety",
    "sido": "인천",
    "media": "경인일보",
    "publishedAt": "38분 전",
    "url": "http://www.kyeongin.com",
    "lat": 37.4563,
    "lng": 126.7052
  },
  {
    "id": "news-5",
    "title": "광주광역시, 교통약자 휠체어 리프트 경사로 100곳 무상 정비 지원",
    "summary": "장애인과 고령자의 이동권 보장을 위해 턱이 높은 상가 및 버스정류장 진입로 개선 사업이 본격 시행됩니다.",
    "category": "welfare",
    "sido": "광주",
    "media": "광주일보",
    "publishedAt": "45분 전",
    "url": "http://www.kwangju.co.kr",
    "lat": 35.1595,
    "lng": 126.8526
  },
  {
    "id": "news-6",
    "title": "대전 유성구 원룸촌 야간 배달 오토바이 소음 민원 급증... 특별 야간 단속",
    "summary": "심야 시간대 소음기 불법 개조 오토바이로 인한 주민 수면권 침해를 막기 위해 경찰과 합동 불시 단속을 전개합니다.",
    "category": "noise",
    "sido": "대전",
    "media": "대전일보",
    "publishedAt": "1시간 전",
    "url": "http://www.daejonilbo.com",
    "lat": 36.3504,
    "lng": 127.3845
  },
  {
    "id": "news-7",
    "title": "경기도, 도내 31개 시군 빗물받이 쓰레기 덮개 제거 및 침수 위험지구 사전 점검",
    "summary": "장마철 집중호우로 인한 도심 침수를 막기 위해 도로변 배수구 담배꽁초 및 쓰레기 무단 투기 단속을 강화합니다.",
    "category": "environment",
    "sido": "경기",
    "media": "경기일보",
    "publishedAt": "1시간 전",
    "url": "http://www.kyeonggi.com",
    "lat": 37.2636,
    "lng": 127.0286
  },
  {
    "id": "news-8",
    "title": "제주도, 올레길 및 한라산 탐방로 응급 비상 구급함 및 태양광 비상벨 정비",
    "summary": "제주도는 외진 탐방로에서 발생할 수 있는 안전사고에 신속히 대응할 수 있도록 스마트 위치 표지판을 재정비했습니다.",
    "category": "safety",
    "sido": "제주",
    "media": "제주일보",
    "publishedAt": "2시간 전",
    "url": "http://www.jejunews.com",
    "lat": 33.4996,
    "lng": 126.5312
  },
  {
    "id": "news-9",
    "title": "세종시, 아파트 단지 밀집 지역 심야 킥보드 무단 방치 전용 견인 시스템 도입",
    "summary": "인도 및 점자블록 위에 무단 방치되어 보행자의 발을 걸려 넘어지게 만드는 전동 킥보드에 대한 즉시 견인 조치가 시행됩니다.",
    "category": "traffic",
    "sido": "세종",
    "media": "세종포스트",
    "publishedAt": "2시간 전",
    "url": "http://www.sjpost.co.kr",
    "lat": 36.48,
    "lng": 127.289
  },
  {
    "id": "news-10",
    "title": "울산 남구, 국가산단 인근 악취 모니터링 드론 및 실시간 공기질 측정망 가동",
    "summary": "주거 밀집지역으로 유입되는 미세먼지와 불쾌한 냄새를 실시간으로 추적 감시하는 스마트 환경 관제탑이 운영됩니다.",
    "category": "environment",
    "sido": "울산",
    "media": "경상일보",
    "publishedAt": "3시간 전",
    "url": "http://www.ksilbo.co.kr",
    "lat": 35.5384,
    "lng": 129.3114
  }
];

export const HISTORICAL_DEBATES: HistoricalDebate[] = [
  {
    "id": "gwanghaegun-diplomacy",
    "title": "광해군의 대외 중립외교, 실리적 구국외교인가 배은망덕한 외교인가?",
    "subtitle": "명나라와 후금 사이에서 펼친 실리외교의 역사적 평가와 사료 분석",
    "period": "JOSEON_LATE",
    "periodName": "조선 후기",
    "era": "17세기 초 (1608~1623)",
    "historicalFigure": "광해군, 강홍립, 인조",
    "background": "임진왜란 직후 국력이 쇠락한 조선은 만주에서 급성장한 후금(청)과 임진왜란 때 원병을 보낸 명나라의 참전 요구 사이에서 생존의 기로에 섰습니다. 광해군은 명나라의 파병 요구에 부응해 강홍립을 도원수로 삼아 군사를 보내면서도, 전황을 보아 후금과 불필요한 충돌을 피하도록 밀지를 내렸습니다. 이후 인조반정 세력은 이를 \"배은망덕\"이라 규탄하며 폐위의 핵심 명분으로 삼았습니다.",
    "proStance": {
      "title": "현실주의 실리 구국외교 (긍정론)",
      "summary": "국제 정세의 흐름을 냉철히 꿰뚫고 전란으로 피폐해진 백성과 국토를 보전한 탁월한 실리 외교였다.",
      "arguments": [
        "전후 국가 재건이 시급한 상황에서 강성해지는 후금과의 전면전을 피해 전쟁의 참화를 막았다.",
        "명나라의 무리한 군사 징발 요구에 형식상 응하면서도 실질적인 군사력 손실을 최소화했다.",
        "이념과 명분보다 백성의 생명과 국가 존망을 최우선에 둔 실용주의 군주의 결단이었다."
      ]
    },
    "conStance": {
      "title": "명의(名義)와 신의를 저버린 외교 (비판론)",
      "summary": "재조지은(再造之恩)의 신의를 저버리고 사대명분을 훼손하여 정통성 위기와 반정을 자초했다.",
      "arguments": [
        "임진왜란 당시 나라를 구해준 명나라에 대한 국가 간 신의와 유교적 의리를 헌신짝처럼 버렸다.",
        "조정 내 신료들과 소통 없이 독단적 밀지와 비공식 밀사 외교를 펼쳐 국내 정치적 분열을 격화시켰다.",
        "결국 인조반정의 빌미를 주었고, 이후 정묘호란과 병자호란의 외교적 완충 역할을 근본적으로 해결하지 못했다."
      ]
    },
    "neutralStance": {
      "title": "시대적 딜레마와 구조적 한계 (재해석)",
      "summary": "약소국 조선이 직면한 지정학적 비극 속에서 국방력 강화 없이 외교적 술수에만 의존한 한계가 공존한다.",
      "arguments": [
        "광해군의 외교적 판단은 불가피했으나 궁궐 중건 등으로 내치와 국방을 함께 다지지 못해 지속가능성이 없었다.",
        "성리학적 대의명분이 지배하던 당대 조선 지식인 사회에서 수용되기 힘든 급진적 독자노선이었다."
      ]
    },
    "sources": [
      {
        "id": "gw-1",
        "title": "광해군일기 11년 3월 12일 (1619년) - 강홍립에게 내린 밀지",
        "bookName": "조선왕조실록 광해군일기(중초본)",
        "dateRecorded": "1619년 3월 12일",
        "originalText": "上密諭都元帥姜弘立曰: \"彼若強來, 觀變而圖, 勿致死力, 善爲之.\"",
        "translation": "왕이 도원수 강홍립에게 비밀리에 유시하기를 \"저들이 만약 강하게 공격해 오거든 사태의 변화를 관망하여 도모하고, 죽을 힘을 다해 싸우지 말고 형편을 보아 잘 처신하라.\" 하였다.",
        "sourceDbUrl": "https://db.history.go.kr/id/wn_011_0030_0010",
        "keyQuote": "관변이도(觀變而圖) - 사태의 변화를 보아 죽을 힘을 다하지 말고 처신하라",
        "stanceHint": "PRO"
      },
      {
        "id": "gw-2",
        "title": "광해군일기 10년 윤4월 2일 (1618년) - 비변사 당상들과의 대화",
        "bookName": "조선왕조실록 광해군일기(중초본)",
        "dateRecorded": "1618년 윤4월 2일",
        "originalText": "上曰: \"今日之事, 國存而後, 大義可講. 若國不存, 則義將安托乎? 備邊司諸臣, 但知一偏之義, 不念國家之存亡, 痛矣!\"",
        "translation": "왕이 이르기를 \"오늘날의 일은 나라가 보전된 뒤에야 대의도 강구할 수 있는 것이다. 만약 나라가 존재하지 않는다면 대의는 장차 어디에 의탁하겠는가? 비변사의 여러 신하들은 오직 한쪽의 의리만 알고 국가의 존망은 생각지 않으니 통탄스럽다!\" 하였다.",
        "sourceDbUrl": "https://db.history.go.kr/id/wn_010_0140_0020",
        "keyQuote": "나라가 보전된 뒤에야 대의도 강구할 수 있는 것이다",
        "stanceHint": "PRO"
      },
      {
        "id": "gw-3",
        "title": "인조실록 1년 3월 13일 (1623년) - 인조반정 교서 중 외교 비판",
        "bookName": "조선왕조실록 인조실록",
        "dateRecorded": "1623년 3월 13일",
        "originalText": "廢天朝再造之恩, 忘宣廟結好之約, 逆天叛義, 招來胡虜, 遣姜弘立使之降虜, 欺蔽天子, 辱及宗社.",
        "translation": "천조(명나라)의 재조지은을 저버리고 선조 대왕의 우호 약조를 잊었으며, 천리를 거역하고 의리를 배반하여 오랑캐를 불러들였고, 강홍립을 보내 오랑캐에게 항복하게 하여 천자를 속이고 종묘사직을 욕되게 하였다.",
        "sourceDbUrl": "https://db.history.go.kr/id/in_001_0030_0010",
        "keyQuote": "천조의 재조지은을 저버리고 강홍립을 보내 항복하게 하였다",
        "stanceHint": "CON"
      }
    ],
    "votes": {
      "pro": 342,
      "con": 128,
      "neutral": 89
    },
    "commentsCount": 18,
    "viewsCount": 2452,
    "tags": [
      "광해군",
      "조선후기",
      "명청교체기",
      "외교",
      "실록"
    ],
    "createdAt": "2026-08-10",
    "isHot": true
  },
  {
    "id": "silla-samguk-unification",
    "title": "신라의 삼국통일, 민족 통합의 효시인가 외세 결탁 영토 축소인가?",
    "subtitle": "당나라와의 연합 및 나당전쟁을 통해 이룩한 삼국통일의 성격 논쟁",
    "period": "ANCIENT",
    "periodName": "삼국/통일신라",
    "era": "7세기 (660~676)",
    "historicalFigure": "김춘추(태종무열왕), 김유신, 문무왕",
    "background": "7세기 신라는 고구려와 백제의 양면 압박 속에서 김춘추의 외교로 당나라와 나당연합을 결성하여 백제(660)와 고구려(668)를 멸망시켰습니다. 이후 한반도 전체를 지배하려던 당나라를 매소성·기벌포 전투로 격퇴하고 대동강에서 원산만에 이르는 국경을 확정했습니다. 이를 단일 민족 문화 형성의 시초로 보는 시각과 만주 고토를 잃고 외세를 끌어들인 불완전 통일로 보는 시각이 충돌합니다.",
    "proStance": {
      "title": "단일 민족 및 문화적 공동체의 기틀 형성",
      "summary": "삼국의 주민과 문화를 하나의 체계로 융합하고 당나라를 끝내 물리쳐 자주성을 지켜낸 역사적 대업이다.",
      "arguments": [
        "당나라의 야욕을 꿰뚫고 끝내 나당전쟁(매소성·기벌포 전투)에서 승리하여 한반도 거주민의 자주 독립을 지켜냈다.",
        "언어, 제도, 문화의 동질성을 형성하여 훗날 고려와 조선으로 이어지는 단일 민족사의 뿌리가 되었다.",
        "당시 삼국은 현대적 의미의 단일 민족 의식이 희박했던 적대 국가들 사이의 치열한 생존경쟁이었다."
      ]
    },
    "conStance": {
      "title": "외세 개입과 광대한 북방 만주 영토의 상실",
      "summary": "동족 국가를 멸망시키기 위해 외세를 끌어들였고, 고구려의 광대한 만주 벌판을 상실한 불완전한 통일이었다.",
      "arguments": [
        "고구려가 지켜온 동아시아 방파제 역할을 무너뜨리고 당나라 군대를 한반도 깊숙이 끌어들였다.",
        "대동강 이남으로 축소되어 고구려의 웅대한 만주 영토를 우리 역사 무대에서 크게 축소시켰다.",
        "신재호 등 민족주의 사학자들이 지적하듯, 민족사의 주 무대를 한반도로 제한시키는 한계를 낳았다."
      ]
    },
    "neutralStance": {
      "title": "시대적 맥락과 발해와의 남북국 시대론",
      "summary": "현대 민족관을 7세기에 투영하기보다, 발해의 건국과 함께 남북국 시대라는 다층적 관점으로 보아야 한다.",
      "arguments": [
        "신라 통일과 고구려 유민이 세운 발해를 아우르는 남북국 시대의 지평에서 파악하는 것이 타당하다."
      ]
    },
    "sources": [
      {
        "id": "sg-1",
        "title": "삼국사기 권제5 신라본기 제5 - 태종무열왕 7년(660년)",
        "bookName": "삼국사기 신라본기",
        "dateRecorded": "660년 7월",
        "originalText": "王與唐大將軍蘇定方, 合兵百濟, 遂平其國.",
        "translation": "왕이 당나라 대장군 소정방과 합세하여 백제를 공격하여 마침내 그 나라를 평정하였다.",
        "sourceDbUrl": "https://db.history.go.kr/id/sg_005r_0070_0010",
        "keyQuote": "왕이 당나라 대장군 소정방과 합세하여 백제를 평정하였다",
        "stanceHint": "BOTH"
      },
      {
        "id": "sg-2",
        "title": "삼국사기 권제7 신라본기 제7 - 문무왕 16년(676년) 기벌포 전투",
        "bookName": "삼국사기 신라본기",
        "dateRecorded": "676년 11월",
        "originalText": "沙湌施得領船兵, 與唐兵戰於伎伐浦, 大克之, 斬首四千餘級.",
        "translation": "사찬 시득이 수군을 거느리고 기벌포에서 당나라 군사와 싸워 크게 이기고 4천여 명의 목을 베었다.",
        "sourceDbUrl": "https://db.history.go.kr/id/sg_007r_0010_0030",
        "keyQuote": "기벌포에서 당나라 군사와 싸워 크게 이겨 물리쳤다",
        "stanceHint": "PRO"
      }
    ],
    "votes": {
      "pro": 211,
      "con": 295,
      "neutral": 111
    },
    "commentsCount": 23,
    "viewsCount": 3106,
    "tags": [
      "삼국통일",
      "신라",
      "김춘추",
      "문무왕",
      "삼국사기"
    ],
    "createdAt": "2026-08-08"
  },
  {
    "id": "gabo-reform-evaluation",
    "title": "1894 갑오개혁, 자주적 근대화 개혁인가 일본의 타율적 침략 발판인가?",
    "subtitle": "군국기무처의 신분제 철폐 및 근대 제도 수립에 대한 실록 및 각사등록 사료 평가",
    "period": "MODERN",
    "periodName": "근현대",
    "era": "19세기 말 (1894~1895)",
    "historicalFigure": "김홍집, 유길준, 고종, 박영효",
    "background": "1894년 동학농민운동과 청일전쟁이 발발한 가운데, 군국기무처를 중심으로 봉건적 신분제 폐지, 과거제 폐지, 과부 재가 허용, 근대적 행정 및 재정 제도 개편 등 파격적인 갑오개혁이 단행되었습니다. 이 개혁이 개화파 관료들의 축적된 자주적 근대화 열망의 실현인가, 아니면 경복궁을 점령한 일본의 강요와 침략을 용이하게 하기 위한 타율적 개혁인가에 대해 논쟁이 지속되고 있습니다.",
    "proStance": {
      "title": "조선 지식인들의 축적된 자주적 근대화의 결실",
      "summary": "갑신정학과 동학농민군의 개혁 요구(폐정개혁안)를 수용하여 봉건 신분제를 타파한 역사적인 근대화의 출발점이다.",
      "arguments": [
        "천년 넘게 이어진 양반-노비 신분제를 법적으로 완전히 철폐하고 만민 평등의 근대 사회 기틀을 마련했다.",
        "박규수, 김옥균, 유길준 등 조선 내부 개화 사상가들이 오랫동안 연구하고 준비해온 개혁안을 법제화한 것이다.",
        "동학농민군이 요구했던 과부 재가 허용, 연좌제 폐지, 탐관오리 징계 등 민중의 개혁 요구를 대폭 반영했다."
      ]
    },
    "conStance": {
      "title": "일본 군대의 총칼 아래 진행된 타율적 침략 수단",
      "summary": "일본군이 경복궁을 무력 점령한 상태에서 강요되었으며, 식민지 침탈을 용이하게 만든 한계가 뚜렷하다.",
      "arguments": [
        "일본군이 경복궁을 기습 점령하고 친일 내각을 강제로 구성하여 추진한 명백한 외세 강요 개혁이었다.",
        "국방력 강화나 농민들의 핵심 요구였던 토지 제도 개혁은 철저히 외면한 채 일본의 상업적 침투에 유리한 제도만 도입했다.",
        "결국 조선의 방어력을 해체하고 일본의 식민지 침략 발판을 닦아주는 결과를 낳았다."
      ]
    },
    "sources": [
      {
        "id": "gb-1",
        "title": "고종실록 31년 7월 27일 (1894년) - 군국기무처 의안 및 공사천인 신분제 폐지",
        "bookName": "조선왕조실록 고종실록",
        "dateRecorded": "1894년 7월 27일",
        "originalText": "軍國機務處進議案: \"公私賤人悉爲免賤, 不論貴賤, 登用人材, 門閥制度一槪革除.\"",
        "translation": "군국기무처에서 의안을 올리기를 \"공노비와 사노비 등 천인을 모두 면천하고, 귀천을 불문하고 인재를 등용하며, 문벌 제도를 일체 혁파한다.\" 하였다.",
        "sourceDbUrl": "https://db.history.go.kr/id/kj_031_0070_0027",
        "keyQuote": "공사 천인을 모두 면천하고, 문벌 제도를 일체 혁파한다",
        "stanceHint": "PRO"
      }
    ],
    "votes": {
      "pro": 275,
      "con": 230,
      "neutral": 92
    },
    "commentsCount": 16,
    "viewsCount": 2210,
    "tags": [
      "갑오개혁",
      "신분제폐지",
      "군국기무처",
      "근현대",
      "고종실록"
    ],
    "createdAt": "2026-08-13"
  },
  {
    "id": "jeongjo-secret-letters",
    "title": "정조의 탕평책과 비밀어찰, 위대한 개혁군주인가 막후 정치 공작인가?",
    "subtitle": "노론 벽파 심환지에게 보낸 비밀 편지(어찰) 발굴과 정조 정치의 재조명",
    "period": "JOSEON_LATE",
    "periodName": "조선 후기",
    "era": "18세기 후반 (1776~1800)",
    "historicalFigure": "정조, 심환지, 채제공",
    "background": "2009년 정조가 노론 벽파의 영수 심환지에게 보낸 비밀 어찰 297통이 세상에 공개되며 학계와 대중에 큰 충격을 주었습니다. 사도세자의 아들로서 당쟁을 타파하고 규장각, 초계문신, 수원화성을 통해 개혁을 펼친 계몽군주라는 평가와, 정적(政敵)과 사전에 각본을 짜고 상소와 인사 조치를 조율한 노련한 막후 정치가라는 평가가 팽팽히 맞서고 있습니다.",
    "proStance": {
      "title": "고도의 정국 장악력을 지닌 탁월한 정치가",
      "summary": "파당 간의 극단적 충돌을 막고 개혁 정책을 관철하기 위해 반대파 영수까지 포섭한 성숙한 의회정치적 군주였다.",
      "arguments": [
        "피 흘리는 사화나 환국 없이 반대파의 의견을 수렴하고 국정을 안정시키는 고도의 소통 리더십이었다.",
        "비밀 편지는 정적을 탄압하는 음모가 아니라 상호 조율과 협치를 이끌어내기 위한 실질적 수단이었다.",
        "당쟁의 극한 대립 속에서 탕평의 이상을 실현하고자 현실 정치의 기술을 능수능란하게 활용했다."
      ]
    },
    "conStance": {
      "title": "원칙과 시스템을 무너뜨린 제왕적 막후 통치",
      "summary": "공론(公論)의 장을 무력화하고 왕이 막후에서 상소와 여론을 직접 조작한 비민주적 권모술수였다.",
      "arguments": [
        "조선의 정상적인 삼사와 사간원 공론 시스템을 우회하여 왕이 직접 대본을 쓰고 정국을 연출했다.",
        "결국 시스템에 의한 개혁이 아닌 군주 개인의 역량에만 의존하여, 정조 사후 세도정치라는 권력 공백을 낳았다.",
        "반대파 벽파와의 밀월을 통해 진정한 개혁의 강도를 스스로 타협하고 후퇴시켰다."
      ]
    },
    "neutralStance": {
      "title": "개혁 이상과 정치 현실의 교차점",
      "summary": "사도세자의 비극적 트라우마와 척박한 정국 속에서 살아남아 개혁을 완수하려던 군주의 처절한 현실적 선택이었다.",
      "arguments": [
        "조선 후기 탕평 군주가 직면했던 신권과 왕권의 팽팽한 긴장 관계를 보여주는 생생한 증거이다."
      ]
    },
    "sources": [
      {
        "id": "jj-1",
        "title": "정조어찰첩 (심환지에게 보낸 비밀편지) - 상소 조율 대목",
        "bookName": "정조 어찰첩 (국사편찬위원회 소장 사료)",
        "dateRecorded": "1799년 2월",
        "originalText": "卿當以此事發章, 吾當優批而允之. 此乃密計, 切勿漏泄.",
        "translation": "경은 마땅히 이 일로 상소를 올리시오. 그러면 내가 마땅히 너그럽게 비답을 내리고 윤허할 것이오. 이것은 은밀한 계획이니 절대로 누설하지 마시오.",
        "sourceDbUrl": "https://db.history.go.kr/id/js_022_07_026",
        "keyQuote": "경은 마땅히 상소를 올리시오, 내가 비답을 내려 윤허할 것이오",
        "stanceHint": "CON"
      },
      {
        "id": "jj-2",
        "title": "정조실록 22년 7월 26일 (1798년) - 탕평의 뜻을 밝히는 하교",
        "bookName": "조선왕조실록 정조실록",
        "dateRecorded": "1798년 7월 26일",
        "originalText": "上曰: \"人心世道, 莫如公平. 朝廷之設, 本爲生民, 若分朋黨而各私其私, 何以爲國?\"",
        "translation": "임금이 이르기를 \"사람의 마음과 세상의 도리는 공평함 만한 것이 없다. 조정이 설치된 것은 본래 백성을 위함인데, 붕당을 나누어 각자 사리사욕을 챙긴다면 어찌 나라라 하겠는가?\" 하였다.",
        "sourceDbUrl": "https://db.history.go.kr/id/js_022_07_0260",
        "keyQuote": "사람의 마음과 세상의 도리는 공평함 만한 것이 없다",
        "stanceHint": "PRO"
      }
    ],
    "votes": {
      "pro": 284,
      "con": 142,
      "neutral": 65
    },
    "commentsCount": 14,
    "viewsCount": 1980,
    "tags": [
      "정조",
      "탕평책",
      "어찰첩",
      "심환지",
      "규장각"
    ],
    "createdAt": "2026-08-11"
  },
  {
    "id": "myocheong-movement",
    "title": "묘청의 서경 천도 운동, 자주적 혁신인가 무모한 권력 반란인가?",
    "subtitle": "신채호의 \"조선역사 일천년래 제일대사건\" 평가와 고려사 사료 분석",
    "period": "GORYEO",
    "periodName": "고려",
    "era": "12세기 전반 (1135년)",
    "historicalFigure": "묘청, 백수한, 김부식, 인종",
    "background": "1135년 묘청 등 서경 세력은 개경의 보수 귀족 문벌 세력에 대항하여 서경(평양)으로의 천도, 칭제건원(황제 칭호와 독자적 연호 제정), 금나라 정벌을 주장했습니다. 인종이 천도를 망설이자 대위국을 선포하며 거병하였고, 김부식이 이끄는 관군에 의해 진압되었습니다. 단재 신채호는 이를 \"낭가 사상 대 유교 사상의 대결이자 천년래 제일대사건\"으로 평가했습니다.",
    "proStance": {
      "title": "자주적 대외 기상과 보수 문벌 타파의 혁신 운동",
      "summary": "사대주의적 개경 문벌 귀족에 맞서 고구려의 기상을 잇고 독자적 천하관을 확립하려 한 자주적 민족 운동이다.",
      "arguments": [
        "금나라에 대한 굴종적 사대를 거부하고 황제국 체제(칭제건원)를 선포하여 민족적 자긍심을 회복하려 했다.",
        "이자겸의 난 등으로 부패하고 굳어진 개경 문벌 귀족의 기득권을 타파하고 국가적 활력을 쇄신하려 했다.",
        "신채호의 지적처럼 진취적인 고려 본연의 자주 정신과 고구려 계승 의식을 계승한 일대 쾌거였다."
      ]
    },
    "conStance": {
      "title": "풍수지리설에 편승한 혹세무민과 무모한 반란",
      "summary": "현실적 국력을 도외시한 채 풍수도참설로 조정을 농락하고 반란으로 국가를 분열시킨 무책임한 권력 투쟁이었다.",
      "arguments": [
        "음양풍수설과 거짓 길흉 화복(기름떡으로 강물에 오색 구름 연출 등)으로 군주를 속이고 미신으로 국정을 어지럽혔다.",
        "당시 강성했던 금나라를 정벌하겠다는 것은 고려의 현실적 군사력을 전혀 고려하지 않은 자멸적 망상이었다.",
        "왕명을 거역하고 반역의 군사를 일으켜 무고한 백성과 서경 일대를 전란의 참화로 몰아넣었다."
      ]
    },
    "sources": [
      {
        "id": "mc-1",
        "title": "고려사 권제127 열전 제40 반역1 묘청",
        "bookName": "고려사 열전",
        "dateRecorded": "1135년 (인종 13년)",
        "originalText": "妙淸等言: \"西京有帝王之氣, 若遷都, 則金國自降, 三十六國皆來朝.\"",
        "translation": "묘청 등이 말하기를 \"서경(평양)에는 제왕의 기운이 있으니, 만약 도읍을 옮기면 금나라가 스스로 항복하고 36국이 모두 와서 조공할 것입니다\" 하였다.",
        "sourceDbUrl": "https://db.history.go.kr/id/kr_127r_0010_0010",
        "keyQuote": "도읍을 옮기면 금나라가 스스로 항복하고 36국이 조공할 것입니다",
        "stanceHint": "BOTH"
      }
    ],
    "votes": {
      "pro": 312,
      "con": 188,
      "neutral": 74
    },
    "commentsCount": 11,
    "viewsCount": 1650,
    "tags": [
      "묘청",
      "고려사",
      "서경천도",
      "신채호",
      "김부식"
    ],
    "createdAt": "2026-08-09"
  },
  {
    "id": "yesong-controversy",
    "title": "조선 예송논쟁(禮訟), 명분론의 당쟁인가 왕권·신권의 헌정 질서 논쟁인가?",
    "subtitle": "현종 대 자의대비의 상복 기간을 둘러싼 서인과 남인의 치열한 예학 논쟁",
    "period": "JOSEON_LATE",
    "periodName": "조선 후기",
    "era": "17세기 후반 (1659, 1674)",
    "historicalFigure": "송시열, 허목, 윤휴, 현종",
    "background": "효종과 효종비가 승하했을 때, 인조의 계비인 자의대비가 상복을 몇 년 입어야 하는가를 두고 서인(송시열)과 남인(허목, 윤휴)이 격렬하게 맞섰습니다. 겉보기에는 옷을 1년 입느냐 3년 입느냐의 형식 문제 같지만, 효종이 차남(차자)으로서 왕통을 계승한 것을 사대부와 같은 예(체이부정)로 볼 것인가, 왕실의 특수성을 인정하여 장자와 동등한 군주로 볼 것인가에 대한 국가 헌정 체제의 근본 철학 대립이었습니다.",
    "proStance": {
      "title": "국가 헌법 질서와 왕권 철학에 대한 정밀한 정책 토론",
      "summary": "단순한 파벌 싸움이 아니라 성리학적 국가 원리와 법통의 정통성을 규정하기 위한 고도의 학술적·정치적 헌정 논쟁이었다.",
      "arguments": [
        "조선은 법과 예(禮)로 다스려지는 유교 입헌 국가였기에 상복 기간은 곧 왕통의 정당성과 국가 헌정 질서의 문제였다.",
        "피 흘리는 무력 충돌이나 숙청 대신 철저히 경전 사료와 예서(국조오례의, 주자가례)를 근거로 논리적 토론을 벌였다.",
        "왕도정치와 사림정치가 어떻게 국가 시스템을 규정할 것인가에 대한 철학적 성숙의 과정이었다."
      ]
    },
    "conStance": {
      "title": "민생을 외면한 극단적 교조주의와 소모적 당쟁",
      "summary": "양란 이후 피폐해진 민생과 국가 개혁을 뒷전으로 미루고 형식적 예론에 매몰되어 정쟁을 일삼았다.",
      "arguments": [
        "백성들의 굶주림과 민생 경제 회복이 시급한 시기에 상복 기간이라는 비생산적 형식 논리에 국가적 에너지를 낭비했다.",
        "상대 정파를 배척하고 권력을 독점하기 위한 도구로 경전 해석을 악용하여 훗날 환국 정치의 비극을 잉태했다.",
        "사대부 중심의 성리학적 교조주의가 국가의 현실적 변화를 가로막는 부작용을 낳았다."
      ]
    },
    "sources": [
      {
        "id": "ye-1",
        "title": "현종실록 1년 3월 15일 (1660년) - 기해예송 자의대비 복제 논의",
        "bookName": "조선왕조실록 현종실록",
        "dateRecorded": "1660년 3월 15일",
        "originalText": "宋時烈等以爲: \"體而不正, 當服期年.\" 許穆等以爲: \"三年之服, 乃天下之通喪, 況宗統所歸乎?\"",
        "translation": "송시열 등은 \"체이부정(적장자가 아니면서 대통을 이음)이니 마땅히 기년복(1년)을 입어야 합니다\" 하였고, 허목 등은 \"3년복은 천하의 통상(보편적 상례)인데 하물며 종통(왕통)이 돌아간 곳이겠습니까?\" 하였다.",
        "sourceDbUrl": "https://db.history.go.kr/id/hj_001_0300_0015",
        "keyQuote": "체이부정(體而不正) 대 천하통상(天下通喪)의 대립",
        "stanceHint": "BOTH"
      }
    ],
    "votes": {
      "pro": 198,
      "con": 165,
      "neutral": 45
    },
    "commentsCount": 9,
    "viewsCount": 1420,
    "tags": [
      "예송논쟁",
      "현종",
      "송시열",
      "허목",
      "조선왕조실록"
    ],
    "createdAt": "2026-08-12"
  }
];

export const FACT_CHECK_ARCHIVE: FactCheckItem[] = [
  {
    "id": "fc-1",
    "title": "광해군은 명나라를 완전히 배신하고 후금(청) 편에 섰는가?",
    "claim": "광해군은 명나라를 완전히 배신하고 후금의 누르하치와 군사 동맹을 맺었다.",
    "verdict": "MISCONCEPTION",
    "verdictLabel": "사료 왜곡 / 오해",
    "recordSource": "조선왕조실록 광해군일기 / 승정원일기",
    "recordUrl": "https://db.history.go.kr/id/wn_011_0030_0010",
    "explanation": "광해군은 명나라를 완전히 배반한 것이 아니라, 명의 파병 요구에 응해 1만 3천 명의 정예 조총병을 파견했습니다. 다만 심하 전투에서 명군이 궤멸하자 강홍립에게 후금과의 교섭을 지시하여 전멸을 피하고 조선의 참화를 막으려 한 \"이중 외교/등거리 외교\"였으며, 결코 후금과 군사 동맹을 맺은 적은 없습니다.",
    "originalPassage": "上密諭都元帥姜弘立曰: \"觀變而圖, 勿致死力.\"",
    "translatedPassage": "임금이 도원수 강홍립에게 비밀히 이르기를 \"사태의 변화를 보고 대처하며, 죽을 힘을 다하지 말라\"고 하였다."
  },
  {
    "id": "fc-2",
    "title": "정조는 노론 벽파 심환지에게 독살당했는가?",
    "claim": "정조는 자신의 개혁을 방해하던 노론 벽파 영수 심환지에 의해 독살되었다.",
    "verdict": "MISCONCEPTION",
    "verdictLabel": "사료 불일치 / 통설 오류",
    "recordSource": "정조어찰첩(2009년 발굴) 및 정조실록 24년 6월",
    "recordUrl": "https://db.history.go.kr/id/js_024_06_0280",
    "explanation": "2009년 발굴된 정조어찰첩에 따르면 정조는 승하 직전까지 심환지에게 자신의 병세(종기, 번열 등)를 상세히 편지로 알리며 처방을 상의했습니다. 심환지는 정조의 정적이 아니라 정조가 가장 긴밀히 소통한 비밀 정국 파트너였으며, 정조는 오랜 과로와 종기 악화로 사망한 것이 사료로 입증되었습니다.",
    "originalPassage": "御札: \"吾之病勢, 毒熱熾盛, 殆不能堪... 卿其悉之.\"",
    "translatedPassage": "어찰: \"나의 병세는 독한 열기가 치밀어 거의 견딜 수가 없다... 경은 이를 잘 알라.\""
  },
  {
    "id": "fc-3",
    "title": "조선의 예송논쟁은 단순히 옷 입는 기간만 따진 밥그릇 싸움이었는가?",
    "claim": "예송논쟁은 옷을 1년 입냐 3년 입냐를 두고 벌인 아무 의미 없는 당파 싸움이다.",
    "verdict": "COMPLEX_DEBATE",
    "verdictLabel": "헌정 질서 논쟁 / 입체적 해석 필요",
    "recordSource": "현종실록 / 예기(禮記) / 국조오례의",
    "recordUrl": "https://db.history.go.kr/id/hj_001_0300_0015",
    "explanation": "단순한 복식 문제가 아니라 \"차남으로서 왕위에 오른 효종의 정통성을 국왕으로서 절대화할 것인가(남인-왕사부동례), 사대부와 동일한 종법 원리로 제한할 것인가(서인-체이부정)\"를 다룬 헌법적 주권 해석 논쟁이었습니다.",
    "originalPassage": "宗統所歸, 則爲正統, 王者無客禮.",
    "translatedPassage": "종통이 돌아간 곳이 곧 정통이며, 국왕에게는 사대부와 같은 예(客禮)를 적용하지 않는 법이다."
  }
];

export const HISTORICAL_SOURCES: HistoricalSource[] = [
  {
    "id": "gw-1",
    "title": "광해군일기 11년 3월 12일 (1619년) - 강홍립에게 내린 밀지",
    "bookName": "조선왕조실록 광해군일기(중초본)",
    "dateRecorded": "1619년 3월 12일",
    "originalText": "上密諭都元帥姜弘立曰: \"彼若強來, 觀變而圖, 勿致死力, 善爲之.\"",
    "translation": "왕이 도원수 강홍립에게 비밀리에 유시하기를 \"저들이 만약 강하게 공격해 오거든 사태의 변화를 관망하여 도모하고, 죽을 힘을 다해 싸우지 말고 형편을 보아 잘 처신하라.\" 하였다.",
    "sourceDbUrl": "https://db.history.go.kr/id/wn_011_0030_0010",
    "keyQuote": "관변이도(觀變而圖) - 사태의 변화를 보아 죽을 힘을 다하지 말고 처신하라",
    "stanceHint": "PRO",
    "debateId": "gwanghaegun-diplomacy",
    "debateTitle": "광해군의 대외 중립외교, 실리적 구국외교인가 배은망덕한 외교인가?",
    "period": "조선 후기"
  },
  {
    "id": "gw-2",
    "title": "광해군일기 10년 윤4월 2일 (1618년) - 비변사 당상들과의 대화",
    "bookName": "조선왕조실록 광해군일기(중초본)",
    "dateRecorded": "1618년 윤4월 2일",
    "originalText": "上曰: \"今日之事, 國存而後, 大義可講. 若國不存, 則義將安托乎? 備邊司諸臣, 但知一偏之義, 不念國家之存亡, 痛矣!\"",
    "translation": "왕이 이르기를 \"오늘날의 일은 나라가 보전된 뒤에야 대의도 강구할 수 있는 것이다. 만약 나라가 존재하지 않는다면 대의는 장차 어디에 의탁하겠는가? 비변사의 여러 신하들은 오직 한쪽의 의리만 알고 국가의 존망은 생각지 않으니 통탄스럽다!\" 하였다.",
    "sourceDbUrl": "https://db.history.go.kr/id/wn_010_0140_0020",
    "keyQuote": "나라가 보전된 뒤에야 대의도 강구할 수 있는 것이다",
    "stanceHint": "PRO",
    "debateId": "gwanghaegun-diplomacy",
    "debateTitle": "광해군의 대외 중립외교, 실리적 구국외교인가 배은망덕한 외교인가?",
    "period": "조선 후기"
  },
  {
    "id": "gw-3",
    "title": "인조실록 1년 3월 13일 (1623년) - 인조반정 교서 중 외교 비판",
    "bookName": "조선왕조실록 인조실록",
    "dateRecorded": "1623년 3월 13일",
    "originalText": "廢天朝再造之恩, 忘宣廟結好之約, 逆天叛義, 招來胡虜, 遣姜弘立使之降虜, 欺蔽天子, 辱及宗社.",
    "translation": "천조(명나라)의 재조지은을 저버리고 선조 대왕의 우호 약조를 잊었으며, 천리를 거역하고 의리를 배반하여 오랑캐를 불러들였고, 강홍립을 보내 오랑캐에게 항복하게 하여 천자를 속이고 종묘사직을 욕되게 하였다.",
    "sourceDbUrl": "https://db.history.go.kr/id/in_001_0030_0010",
    "keyQuote": "천조의 재조지은을 저버리고 강홍립을 보내 항복하게 하였다",
    "stanceHint": "CON",
    "debateId": "gwanghaegun-diplomacy",
    "debateTitle": "광해군의 대외 중립외교, 실리적 구국외교인가 배은망덕한 외교인가?",
    "period": "조선 후기"
  },
  {
    "id": "jj-1",
    "title": "정조어찰첩 (심환지에게 보낸 비밀편지) - 상소 조율 대목",
    "bookName": "정조 어찰첩 (국사편찬위원회 소장 사료)",
    "dateRecorded": "1799년 2월",
    "originalText": "卿當以此事發章, 吾當優批而允之. 此乃密計, 切勿漏泄.",
    "translation": "경은 마땅히 이 일로 상소를 올리시오. 그러면 내가 마땅히 너그럽게 비답을 내리고 윤허할 것이오. 이것은 은밀한 계획이니 절대로 누설하지 마시오.",
    "sourceDbUrl": "https://db.history.go.kr/id/js_022_07_026",
    "keyQuote": "경은 마땅히 상소를 올리시오, 내가 비답을 내려 윤허할 것이오",
    "stanceHint": "CON",
    "debateId": "jeongjo-secret-letters",
    "debateTitle": "정조의 탕평책과 비밀어찰, 위대한 개혁군주인가 막후 정치 공작인가?",
    "period": "조선 후기"
  },
  {
    "id": "jj-2",
    "title": "정조실록 22년 7월 26일 (1798년) - 탕평의 뜻을 밝히는 하교",
    "bookName": "조선왕조실록 정조실록",
    "dateRecorded": "1798년 7월 26일",
    "originalText": "上曰: \"人心世道, 莫如公平. 朝廷之設, 本爲生民, 若分朋黨而各私其私, 何以爲國?\"",
    "translation": "임금이 이르기를 \"사람의 마음과 세상의 도리는 공평함 만한 것이 없다. 조정이 설치된 것은 본래 백성을 위함인데, 붕당을 나누어 각자 사리사욕을 챙긴다면 어찌 나라라 하겠는가?\" 하였다.",
    "sourceDbUrl": "https://db.history.go.kr/id/js_022_07_0260",
    "keyQuote": "사람의 마음과 세상의 도리는 공평함 만한 것이 없다",
    "stanceHint": "PRO",
    "debateId": "jeongjo-secret-letters",
    "debateTitle": "정조의 탕평책과 비밀어찰, 위대한 개혁군주인가 막후 정치 공작인가?",
    "period": "조선 후기"
  },
  {
    "id": "sg-1",
    "title": "삼국사기 권제5 신라본기 제5 - 태종무열왕 7년(660년)",
    "bookName": "삼국사기 신라본기",
    "dateRecorded": "660년 7월",
    "originalText": "王與唐大將軍蘇定方, 合兵百濟, 遂平其國.",
    "translation": "왕이 당나라 대장군 소정방과 합세하여 백제를 공격하여 마침내 그 나라를 평정하였다.",
    "sourceDbUrl": "https://db.history.go.kr/id/sg_005r_0070_0010",
    "keyQuote": "왕이 당나라 대장군 소정방과 합세하여 백제를 평정하였다",
    "stanceHint": "BOTH",
    "debateId": "silla-samguk-unification",
    "debateTitle": "신라의 삼국통일, 민족 통합의 효시인가 외세 결탁 영토 축소인가?",
    "period": "삼국/통일신라"
  },
  {
    "id": "sg-2",
    "title": "삼국사기 권제7 신라본기 제7 - 문무왕 16년(676년) 기벌포 전투",
    "bookName": "삼국사기 신라본기",
    "dateRecorded": "676년 11월",
    "originalText": "沙湌施得領船兵, 與唐兵戰於伎伐浦, 大克之, 斬首四千餘級.",
    "translation": "사찬 시득이 수군을 거느리고 기벌포에서 당나라 군사와 싸워 크게 이기고 4천여 명의 목을 베었다.",
    "sourceDbUrl": "https://db.history.go.kr/id/sg_007r_0010_0030",
    "keyQuote": "기벌포에서 당나라 군사와 싸워 크게 이겨 물리쳤다",
    "stanceHint": "PRO",
    "debateId": "silla-samguk-unification",
    "debateTitle": "신라의 삼국통일, 민족 통합의 효시인가 외세 결탁 영토 축소인가?",
    "period": "삼국/통일신라"
  },
  {
    "id": "ye-1",
    "title": "현종실록 1년 3월 15일 (1660년) - 기해예송 자의대비 복제 논의",
    "bookName": "조선왕조실록 현종실록",
    "dateRecorded": "1660년 3월 15일",
    "originalText": "宋時烈等以爲: \"體而不正, 當服期年.\" 許穆等以爲: \"三年之服, 乃天下之通喪, 況宗統所歸乎?\"",
    "translation": "송시열 등은 \"체이부정(적장자가 아니면서 대통을 이음)이니 마땅히 기년복(1년)을 입어야 합니다\" 하였고, 허목 등은 \"3년복은 천하의 통상(보편적 상례)인데 하물며 종통(왕통)이 돌아간 곳이겠습니까?\" 하였다.",
    "sourceDbUrl": "https://db.history.go.kr/id/hj_001_0300_0015",
    "keyQuote": "체이부정(體而不正) 대 천하통상(天下通喪)의 대립",
    "stanceHint": "BOTH",
    "debateId": "yesong-controversy",
    "debateTitle": "조선 예송논쟁(禮訟), 명분론의 당쟁인가 왕권·신권의 헌정 질서 논쟁인가?",
    "period": "조선 후기"
  },
  {
    "id": "mc-1",
    "title": "고려사 권제127 열전 제40 반역1 묘청",
    "bookName": "고려사 열전",
    "dateRecorded": "1135년 (인종 13년)",
    "originalText": "妙淸等言: \"西京有帝王之氣, 若遷都, 則金國自降, 三十六國皆來朝.\"",
    "translation": "묘청 등이 말하기를 \"서경(평양)에는 제왕의 기운이 있으니, 만약 도읍을 옮기면 금나라가 스스로 항복하고 36국이 모두 와서 조공할 것입니다\" 하였다.",
    "sourceDbUrl": "https://db.history.go.kr/id/kr_127r_0010_0010",
    "keyQuote": "도읍을 옮기면 금나라가 스스로 항복하고 36국이 조공할 것입니다",
    "stanceHint": "BOTH",
    "debateId": "myocheong-movement",
    "debateTitle": "묘청의 서경 천도 운동, 자주적 혁신인가 무모한 권력 반란인가?",
    "period": "고려"
  },
  {
    "id": "gb-1",
    "title": "고종실록 31년 7월 27일 (1894년) - 군국기무처 의안 및 공사천인 신분제 폐지",
    "bookName": "조선왕조실록 고종실록",
    "dateRecorded": "1894년 7월 27일",
    "originalText": "軍國機務處進議案: \"公私賤人悉爲免賤, 不論貴賤, 登用人材, 門閥制度一槪革除.\"",
    "translation": "군국기무처에서 의안을 올리기를 \"공노비와 사노비 등 천인을 모두 면천하고, 귀천을 불문하고 인재를 등용하며, 문벌 제도를 일체 혁파한다.\" 하였다.",
    "sourceDbUrl": "https://db.history.go.kr/id/kj_031_0070_0027",
    "keyQuote": "공사 천인을 모두 면천하고, 문벌 제도를 일체 혁파한다",
    "stanceHint": "PRO",
    "debateId": "gabo-reform-evaluation",
    "debateTitle": "1894 갑오개혁, 자주적 근대화 개혁인가 일본의 타율적 침략 발판인가?",
    "period": "근현대"
  }
];

export const HISTORICAL_SITE_PINS: HistoricalSitePin[] = [
  {
    "id": "site-seoul-gyeongbokgung",
    "title": "경복궁 및 규장각 (서울 종로)",
    "era": "조선 왕조",
    "region_sido": "서울",
    "address": "서울특별시 종로구 사직로 161",
    "lat": 37.5796,
    "lng": 126.977,
    "summary": "조선왕조의 정궁이자 정조가 탕평정치를 실현하기 위해 설립한 규장각과 일성록 편찬의 산실입니다.",
    "relatedDebateId": "jeongjo-secret-letters",
    "sourceDbUrl": "https://db.history.go.kr",
    "category": "heritage"
  },
  {
    "id": "site-suwon-hwaseong",
    "title": "수원 화성 행궁 (경기 수원)",
    "era": "조선 후기",
    "region_sido": "경기",
    "address": "경기도 수원시 팔달구 정조로 825",
    "lat": 37.2825,
    "lng": 127.015,
    "summary": "정조의 효심과 왕도정치 실현, 실학자 정약용의 거중기 등 과학기술과 근대적 방어체계가 집약된 유네스코 세계유산입니다.",
    "relatedDebateId": "jeongjo-secret-letters",
    "sourceDbUrl": "https://db.history.go.kr",
    "category": "heritage"
  },
  {
    "id": "site-gyeongju-wolseong",
    "title": "경주 월성과 대릉원 (경북 경주)",
    "era": "신라 / 삼국시대",
    "region_sido": "경북",
    "address": "경상북도 경주시 교동 287-1",
    "lat": 35.8306,
    "lng": 129.2195,
    "summary": "태종무열왕 김춘추와 김유신, 문무왕이 삼국통일의 대업을 추진하고 나당전쟁을 승리로 이끈 신라 천년의 왕궁터입니다.",
    "relatedDebateId": "silla-samguk-unification",
    "sourceDbUrl": "https://db.history.go.kr/ancient",
    "category": "heritage"
  },
  {
    "id": "site-ganghwa-palace",
    "title": "강화 고려궁지 (인천 강화)",
    "era": "고려 후기 (대몽항쟁)",
    "region_sido": "인천",
    "address": "인천광역시 강화군 강화읍 북문길 42",
    "lat": 37.747,
    "lng": 126.4847,
    "summary": "몽골 침략에 맞서 39년간 자주적 항쟁을 이어갔던 고려 왕조의 임시 궁궐터이자 외규장각 의궤가 보관되었던 곳입니다.",
    "relatedDebateId": "myocheong-movement",
    "sourceDbUrl": "https://db.history.go.kr",
    "category": "heritage"
  },
  {
    "id": "site-namhansanseong",
    "title": "남한산성 수어장대 (경기 광주/성남)",
    "era": "조선 후기 (병자호란)",
    "region_sido": "경기",
    "address": "경기도 광주시 남한산성면 산성리 815-1",
    "lat": 37.4789,
    "lng": 127.1834,
    "summary": "광해군 폐위 후 인조 대에 축조되어 병자호란의 참화를 겪었던 전략적 요새로, 대외 명분론과 실리론의 비극적 교훈을 담고 있습니다.",
    "relatedDebateId": "gwanghaegun-diplomacy",
    "sourceDbUrl": "https://db.history.go.kr/id/wn_011_0030_0010",
    "category": "heritage"
  },
  {
    "id": "site-jeonju-gyeonggijeon",
    "title": "전주 경기전과 실록각 (전북 전주)",
    "era": "조선 전기·후기",
    "region_sido": "전북",
    "address": "전북특별자치도 전주시 완산구 태조로 44",
    "lat": 35.8152,
    "lng": 127.1498,
    "summary": "임진왜란 당시 전국 사고 중 유일하게 조선왕조실록을 온전히 보존해낸 전주사고가 있던 역사적 보존의 요람입니다.",
    "relatedDebateId": "gwanghaegun-diplomacy",
    "sourceDbUrl": "https://db.history.go.kr/sillok",
    "category": "heritage"
  },
  {
    "id": "site-busan-dongnaeeupseong",
    "title": "부산 동래읍성지 (부산 동래)",
    "era": "조선 전기 (임진왜란)",
    "region_sido": "부산",
    "address": "부산광역시 동래구 명륜동 산 1-1",
    "lat": 35.2104,
    "lng": 129.0838,
    "summary": "\"싸워 죽기는 쉬우나 길을 빌려주기는 어렵다(戰死易假道難)\"며 송상현 부사가 왜군에 맞서 결사항전한 국난 극복의 현장입니다.",
    "relatedDebateId": "gwanghaegun-diplomacy",
    "sourceDbUrl": "https://db.history.go.kr/sillok",
    "category": "heritage"
  },
  {
    "id": "site-jeju-hangpaduri",
    "title": "제주 삼별초 항파두리 토성 (제주 애월)",
    "era": "고려 후기 (삼별초)",
    "region_sido": "제주",
    "address": "제주특별자치도 제주시 애월읍 항파두리로 50",
    "lat": 33.456,
    "lng": 126.4085,
    "summary": "강화도와 진도를 거쳐 제주까지 이어진 삼별초의 자주적 대몽항쟁 최후 격전지입니다.",
    "relatedDebateId": "myocheong-movement",
    "sourceDbUrl": "https://db.history.go.kr",
    "category": "heritage"
  }
];

export const INITIAL_DEBATE_COMMENTS: DebateUserComment[] = [
  {
    "id": "dc-1",
    "debateId": "gwanghaegun-diplomacy",
    "stance": "pro",
    "author": "실록연구자",
    "content": "광해군 11년 3월 12일 실록 원문을 보면 \"彼若強來, 觀變而圖, 勿致死力\"이라는 밀지가 명확합니다. 임진왜란 직후 농토의 3분의 2가 황폐화된 상황에서 10만 대군의 후금과 맞서 싸우라는 사대부들의 요구는 국토를 두 번째 지옥으로 만드는 망동이었습니다. 광해군의 판단은 사대 명분보다 백성의 생존을 우선한 고뇌에 찬 결단이었습니다.",
    "sourceRef": {
      "book": "조선왕조실록 광해군일기 11년 3월 12일",
      "quote": "上密諭都元帥姜弘立曰: \"觀變而圖, 勿致死力\"",
      "url": "https://db.history.go.kr/id/wn_011_0030_0010"
    },
    "verifiedBadge": true,
    "likes": 47,
    "createdAt": "2026-08-16T10:15:00Z"
  },
  {
    "id": "dc-2",
    "debateId": "gwanghaegun-diplomacy",
    "stance": "con",
    "author": "정론직필",
    "content": "광해군의 외교가 불가피한 면이 있었다 하더라도, 신료들과의 공론정치를 전면 부정하고 궁궐 중건에 무리한 부역과 재정을 탕진한 점은 비판받아 마땅합니다. 또한 명나라와의 외교적 신뢰 훼손은 인조반정 이후 외교적 입지를 극도로 좁히는 결과를 초래했습니다.",
    "verifiedBadge": false,
    "likes": 21,
    "createdAt": "2026-08-17T14:20:00Z"
  },
  {
    "id": "dc-3",
    "debateId": "silla-samguk-unification",
    "stance": "neutral",
    "author": "고대사탐구",
    "content": "삼국사기 신라본기 문무왕 11년 조의 답설인귀서를 보면 당나라의 야욕을 꺾고 매소성·기벌포 전투에서 당군 20만을 격파한 자주적 승리가 기록되어 있습니다. 당나라를 끌어들인 한계는 분명하나, 결국 당의 한반도 지배 기도를 분쇄하고 대동강 이남의 독자적 민족 영역을 지켜냈다는 점은 입체적으로 평가해야 합니다.",
    "sourceRef": {
      "book": "삼국사기 권제7 신라본기 제7 문무왕 11년",
      "quote": "唐將薛仁貴來書, 王答書... 大破唐兵於買肖城",
      "url": "https://db.history.go.kr/ancient"
    },
    "verifiedBadge": true,
    "likes": 38,
    "createdAt": "2026-08-18T09:40:00Z"
  }
];
