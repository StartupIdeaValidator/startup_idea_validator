import { useQuery } from "@tanstack/react-query";
import { pipelineApi } from "./pipeline.api";

export const pipelineKeys = {
  all: ["pipeline"] as const,
  detail: (researchId: string) => [...pipelineKeys.all, researchId] as const,
};

export const usePipeline = (researchId: string) => {
  return useQuery({
    queryKey: pipelineKeys.detail(researchId),
    queryFn: () => pipelineApi.getPipeline(researchId),
    enabled: Boolean(researchId),
    // Poll every 5s while research is running
    refetchInterval: (query) => {
      const status = query.state.data?.overallStatus;
      return status === "running" || status === "pending" ? 5000 : false;
    },
  });
};
