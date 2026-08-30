export type PipelinePhase =
  | "market_scan"
  | "competitor_map"
  | "swot_analysis"
  | "lean_canvas"
  | "scoring";

export type PhaseStatus = "pending" | "running" | "complete" | "failed";

export interface PipelinePhaseDetail {
  id: PipelinePhase;
  label: string;
  status: PhaseStatus;
  startedAt: string | null;
  completedAt: string | null;
  logLines: string[];
}

export interface ResearchPipeline {
  researchId: string;
  overallStatus: "pending" | "running" | "complete" | "failed";
  progress: number;
  phases: PipelinePhaseDetail[];
  startedAt: string;
  estimatedCompletionAt: string | null;
}
