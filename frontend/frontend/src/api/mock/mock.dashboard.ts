import { delay } from "./delay";
import type { DashboardOverview } from "../dashboard/dashboard.types";

// ─── Mock implementations ─────────────────────────────────────────────────────

export const mockDashboardApi = {
  getOverview: async (): Promise<DashboardOverview> => {
    await delay();
    return {
      stats: {
        totalResearch: 24,
        activeResearch: 6,
        completedResearch: 18,
        avgValidationScore: 87,
      },
      activityData: [
        { month: "Mar", value: 3 },
        { month: "Apr", value: 5 },
        { month: "May", value: 7 },
        { month: "Jun", value: 4 },
        { month: "Jul", value: 9 },
        { month: "Aug", value: 6 },
      ],
      marketSizes: [
        { label: "AI & Machine Learning", value: "$420B", percentage: 35 },
        { label: "FinTech",               value: "$310B", percentage: 26 },
        { label: "HealthTech",            value: "$280B", percentage: 23 },
        { label: "EdTech",                value: "$190B", percentage: 16 },
      ],
      recentResearch: [
        { id: "r1", name: "AI Writing Assistant",     marketSize: "$4.2B",  status: "complete",    score: 92, date: "Aug 28, 2025" },
        { id: "r2", name: "Smart Meal Planning",      marketSize: "$2.8B",  status: "complete",    score: 85, date: "Aug 25, 2025" },
        { id: "r3", name: "Freelancer Tax Helper",    marketSize: "$1.5B",  status: "processing",  score: null, date: "Aug 30, 2025" },
        { id: "r4", name: "Remote Team Culture Bot",  marketSize: "$890M",  status: "complete",    score: 78, date: "Aug 22, 2025" },
        { id: "r5", name: "Crypto Portfolio Advisor",  marketSize: "$3.1B",  status: "failed",      score: null, date: "Aug 20, 2025" },
      ],
    };
  },
};
