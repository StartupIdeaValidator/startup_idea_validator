import { apiClient } from "../client";
import type { ResearchPipeline } from "./pipeline.types";

export const pipelineApi = {
  getPipeline: async (researchId: string): Promise<ResearchPipeline> => {
    const { data } = await apiClient.get<ResearchPipeline>(`/pipeline/${researchId}`);
    return data;
  },
};
