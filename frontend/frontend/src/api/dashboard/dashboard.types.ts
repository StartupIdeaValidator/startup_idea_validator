export interface DashboardStats {
  totalResearch: number;
  activeResearch: number;
  completedResearch: number;
  avgValidationScore: number;
}

export interface ActivityDataPoint {
  month: string;
  value: number;
}

export interface MarketSizeEntry {
  label: string;
  value: string;
  percentage: number;
}

export interface RecentResearchEntry {
  id: string;
  name: string;
  marketSize: string;
  status: "complete" | "processing" | "failed";
  score: number | null;
  date: string;
}

export interface DashboardOverview {
  stats: DashboardStats;
  activityData: ActivityDataPoint[];
  marketSizes: MarketSizeEntry[];
  recentResearch: RecentResearchEntry[];
}
