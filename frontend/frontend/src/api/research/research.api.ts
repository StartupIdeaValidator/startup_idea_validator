import { apiClient } from "../client";
import type { PaginatedResponse } from "../types";
import type {
  ResearchProject,
  CreateResearchPayload,
  UpdateResearchPayload,
  ResearchFilters,
} from "./research.types";

export const researchApi = {
  getAll: async (filters?: ResearchFilters): Promise<PaginatedResponse<ResearchProject>> => {
    const { data } = await apiClient.get<PaginatedResponse<ResearchProject>>("/research", {
      params: filters,
    });
    return data;
  },

  getById: async (id: string): Promise<ResearchProject> => {
    const { data } = await apiClient.get<ResearchProject>(`/research/${id}`);
    return data;
  },

  create: async (payload: CreateResearchPayload): Promise<ResearchProject> => {
    const { data } = await apiClient.post<ResearchProject>("/research", payload);
    return data;
  },

  update: async (id: string, payload: UpdateResearchPayload): Promise<ResearchProject> => {
    const { data } = await apiClient.patch<ResearchProject>(`/research/${id}`, payload);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/research/${id}`);
  },
};
