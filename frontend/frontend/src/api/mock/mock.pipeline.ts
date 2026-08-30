import { delay } from "./delay";
import type { ResearchPipeline } from "../pipeline/pipeline.types";

// ─── Mock implementations ─────────────────────────────────────────────────────

export const mockPipelineApi = {
  getPipeline: async (researchId: string): Promise<ResearchPipeline> => {
    await delay(150, 400);
    return {
      researchId,
      overallStatus: "running",
      progress: 68,
      startedAt: "2025-08-30T09:00:00Z",
      estimatedCompletionAt: "2025-08-30T09:45:00Z",
      phases: [
        {
          id: "market_scan",
          label: "Market Scan",
          status: "complete",
          startedAt: "2025-08-30T09:00:00Z",
          completedAt: "2025-08-30T09:08:00Z",
          logLines: [
            "Scanning 2,400+ data sources...",
            "Identified TAM of $1.5B across 3 verticals",
            "Found 12 market reports from last 6 months",
            "✓ Market scan complete",
          ],
        },
        {
          id: "competitor_map",
          label: "Competitor Mapping",
          status: "complete",
          startedAt: "2025-08-30T09:08:00Z",
          completedAt: "2025-08-30T09:18:00Z",
          logLines: [
            "Crawling competitor databases...",
            "Mapped 8 direct competitors and 15 indirect",
            "Analyzing pricing tiers and feature sets",
            "✓ Competitor mapping complete",
          ],
        },
        {
          id: "swot_analysis",
          label: "SWOT Analysis",
          status: "running",
          startedAt: "2025-08-30T09:18:00Z",
          completedAt: null,
          logLines: [
            "Evaluating strengths from market positioning...",
            "Identifying key weaknesses and threats...",
            "Processing competitive advantages...",
          ],
        },
        {
          id: "lean_canvas",
          label: "Lean Canvas Generation",
          status: "pending",
          startedAt: null,
          completedAt: null,
          logLines: [],
        },
        {
          id: "scoring",
          label: "Validation Scoring",
          status: "pending",
          startedAt: null,
          completedAt: null,
          logLines: [],
        },
      ],
    };
  },
};
