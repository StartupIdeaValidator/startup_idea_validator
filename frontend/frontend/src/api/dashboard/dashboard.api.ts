import { apiClient } from "../client";
import type { DashboardOverview } from "./dashboard.types";

export const dashboardApi = {
  getOverview: async (): Promise<DashboardOverview> => {
    const { data } = await apiClient.get<DashboardOverview>("/dashboard/overview");
    return data;
  },
};
