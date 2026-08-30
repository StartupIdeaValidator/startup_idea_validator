import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { researchApi } from "./research.api";
import type { CreateResearchPayload, ResearchFilters, UpdateResearchPayload } from "./research.types";

export const researchKeys = {
  all: ["research"] as const,
  lists: () => [...researchKeys.all, "list"] as const,
  list: (filters: ResearchFilters) => [...researchKeys.lists(), filters] as const,
  detail: (id: string) => [...researchKeys.all, "detail", id] as const,
};

export const useResearchProjects = (filters?: ResearchFilters) => {
  return useQuery({
    queryKey: researchKeys.list(filters ?? {}),
    queryFn: () => researchApi.getAll(filters),
  });
};

export const useResearchProject = (id: string) => {
  return useQuery({
    queryKey: researchKeys.detail(id),
    queryFn: () => researchApi.getById(id),
    enabled: Boolean(id),
  });
};

export const useCreateResearch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateResearchPayload) => researchApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: researchKeys.lists() });
    },
  });
};

export const useUpdateResearch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateResearchPayload }) =>
      researchApi.update(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: researchKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: researchKeys.lists() });
    },
  });
};

export const useDeleteResearch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => researchApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: researchKeys.lists() });
    },
  });
};
