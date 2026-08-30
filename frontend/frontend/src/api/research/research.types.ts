export type ResearchStatus = "processing" | "complete" | "failed";

export interface ResearchProject {
  id: string;
  name: string;
  category: string;
  categoryColor: string;
  status: ResearchStatus;
  marketSize: string;
  score: number | null;
  progress: number;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateResearchPayload {
  startupName: string;
  description: string;
  coreProblem: string;
  targetAudience: string;
  competitors: string;
  startupStage: string;
  industryCategory: string;
  geography: string;
  assumptions: string[];
}

export interface UpdateResearchPayload {
  name?: string;
  category?: string;
  status?: ResearchStatus;
}

export interface ResearchFilters {
  status?: ResearchStatus;
  search?: string;
  page?: number;
  limit?: number;
}
