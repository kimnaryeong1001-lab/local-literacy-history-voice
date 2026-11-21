export type ContinentType = 'ALL' | 'EUROPE' | 'ASIA' | 'AMERICAS' | 'MIDDLE_EAST' | 'AFRICA' | 'OCEANIA';

export type EraType = 'ALL' | 'ANCIENT' | 'MEDIEVAL' | 'EARLY_MODERN' | 'MODERN' | 'CONTEMPORARY';

export type EventCategoryType = 'revolution' | 'war' | 'treaty' | 'thought' | 'discovery' | 'culture';

export interface WorldHistoryEvent {
  id: string;
  title: string;
  year: number;
  yearDisplay: string;
  era: EraType;
  continent: ContinentType;
  country: string;
  city: string;
  lat: number;
  lng: number;
  category: EventCategoryType;
  figures: string;
  summary: string;
  detailedDescription: string;
  primarySourceQuote?: {
    text: string;
    sourceName: string;
    translation?: string;
  };
  historicalSignificance: string;
  relatedDebateId?: string;
  imageUrl?: string;
  isMajor?: boolean;
}

export type HistoryPeriodType =
  | 'ALL'
  | 'ANCIENT'
  | 'SAMGUK'
  | 'GORYEO'
  | 'JOSEON_EARLY'
  | 'JOSEON_LATE'
  | 'EARLY_MODERN'
  | 'MODERN'
  | 'CONTEMPORARY'
  | 'WORLD_EARLY'
  | 'WORLD_MODERN';

export type IssueCategoryType =
  | 'safety'
  | 'environment'
  | 'traffic'
  | 'welfare'
  | 'facility'
  | 'culture'
  | 'noise'
  | 'other';

export type IssueStatusType = 'pending' | 'in_progress' | 'resolved';

export interface CivicIssue {
  id: string;
  title: string;
  description: string;
  category: IssueCategoryType;
  status: IssueStatusType;
  sido?: string;
  sigungu?: string;
  region_sido?: string;
  region_gugun?: string;
  address: string;
  lat?: number;
  lng?: number;
  latitude?: number;
  longitude?: number;
  authorName: string;
  createdAt: string;
  likeCount: number;
  passwordHash?: string;
  resolutionComment?: string;
  imageUrl?: string;
  historicalConnection?: any;
  comments?: Array<{
    id: string;
    authorName: string;
    content: string;
    createdAt: string;
  }>;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content?: string;
  source?: string;
  media: string;
  publishedAt: string;
  sido: string;
  category: IssueCategoryType;
  lat?: number;
  lng?: number;
  url?: string;
  relatedIssueId?: string;
}

export interface RegionInfo {
  name: string;
  lat: number;
  lng: number;
  zoom: number;
}

export interface CategoryInfo {
  id: IssueCategoryType;
  name?: string;
  label?: string;
  icon: string;
  color: string;
  bgColor: string;
  description?: string;
}

export interface HistoricalSitePin {
  id: string;
  name?: string;
  title?: string;
  period?: string;
  era?: string;
  category: string;
  address: string;
  region_sido?: string;
  lat: number;
  lng: number;
  description?: string;
  summary?: string;
  historicalRecords?: string;
  sourceDbUrl?: string;
  relatedDebateId?: string;
  imageUrl?: string;
}


export interface HistoricalStance {
  title: string;
  summary: string;
  arguments: string[];
}

export interface HistoricalDebate {
  id: string;
  title: string;
  subtitle: string;
  period: HistoryPeriodType;
  periodName: string;
  era: string;
  continent?: ContinentType;
  historicalFigure: string;
  background: string;
  proStance: HistoricalStance;
  conStance: HistoricalStance;
  neutralStance?: HistoricalStance;
  sources?: any[];
  votes: {
    pro: number;
    con: number;
    neutral: number;
  };
  commentsCount: number;
  viewsCount: number;
  tags: string[];
  createdAt: string;
  isHot?: boolean;
  userVoted?: 'pro' | 'con' | 'neutral';
  connectedRegion?: string;
  relatedEventId?: string;
  coordinates?: { lat: number; lng: number };
}

export interface DebateUserComment {
  id: string;
  debateId: string;
  stance: 'pro' | 'con' | 'neutral';
  author: string;
  content: string;
  sourceRef?: {
    book: string;
    quote: string;
    url?: string;
  };
  verifiedBadge: boolean;
  likes: number;
  createdAt: string;
}

export type FactCheckVerdictType =
  | 'VERIFIED'
  | 'MISCONCEPTION'
  | 'PARTIAL'
  | 'NUANCED'
  | 'COMPLEX_DEBATE';

export interface FactCheckItem {
  id: string;
  title: string;
  claim: string;
  verdict: FactCheckVerdictType;
  verdictLabel: string;
  recordSource: string;
  recordUrl: string;
  explanation: string;
  originalPassage?: string;
  translationPassage?: string;
  translatedPassage?: string;
}

export interface HistoricalSource {
  id: string;
  title: string;
  bookName: string;
  dateRecorded: string;
  originalText: string;
  translation: string;
  sourceDbUrl: string;
  keyQuote: string;
  stanceHint?: string;
  debateId?: string;
  debateTitle?: string;
  period?: string;
}

export interface WorldHistoryQuizQuestion {
  id: string;
  type: 'multiple_choice' | 'map_locate' | 'ox' | 'quote_figure';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  relatedEventId?: string;
  country?: string;
  era?: EraType;
  sourceCitation?: string;
  hint?: string;
}

export interface QuizProgress {
  score: number;
  totalAnswered: number;
  correctCount: number;
  streak: number;
  maxStreak: number;
}

export type ViewTab = 'world_map' | 'chronology' | 'debates' | 'quiz' | 'factcheck' | 'sources' | 'stats';
