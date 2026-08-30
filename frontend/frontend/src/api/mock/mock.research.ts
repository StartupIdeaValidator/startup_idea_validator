import { delay } from "./delay";
import type { PaginatedResponse } from "../types";
import type {
  ResearchProject,
  CreateResearchPayload,
  UpdateResearchPayload,
  ResearchFilters,
} from "../research/research.types";

// ─── In-memory research projects ──────────────────────────────────────────────

let projects: ResearchProject[] = [
  {
    id: "r1", name: "AI Writing Assistant", category: "AI & ML", categoryColor: "#4f6ef7",
    status: "complete", marketSize: "$4.2B", score: 92, progress: 100,
    date: "Aug 28, 2025", createdAt: "2025-08-20T10:00:00Z", updatedAt: "2025-08-28T14:30:00Z",
  },
  {
    id: "r2", name: "Smart Meal Planning", category: "HealthTech", categoryColor: "#10b981",
    status: "complete", marketSize: "$2.8B", score: 85, progress: 100,
    date: "Aug 25, 2025", createdAt: "2025-08-18T08:00:00Z", updatedAt: "2025-08-25T16:00:00Z",
  },
  {
    id: "r3", name: "Freelancer Tax Helper", category: "FinTech", categoryColor: "#f59e0b",
    status: "processing", marketSize: "$1.5B", score: null, progress: 68,
    date: "Aug 30, 2025", createdAt: "2025-08-30T09:00:00Z", updatedAt: "2025-08-30T12:00:00Z",
  },
  {
    id: "r4", name: "Remote Team Culture Bot", category: "HR Tech", categoryColor: "#ec4899",
    status: "complete", marketSize: "$890M", score: 78, progress: 100,
    date: "Aug 22, 2025", createdAt: "2025-08-15T11:00:00Z", updatedAt: "2025-08-22T09:30:00Z",
  },
  {
    id: "r5", name: "Crypto Portfolio Advisor", category: "FinTech", categoryColor: "#f59e0b",
    status: "failed", marketSize: "$3.1B", score: null, progress: 42,
    date: "Aug 20, 2025", createdAt: "2025-08-12T14:00:00Z", updatedAt: "2025-08-20T16:45:00Z",
  },
  {
    id: "r6", name: "E-commerce Returns Optimizer", category: "E-commerce", categoryColor: "#8b5cf6",
    status: "complete", marketSize: "$5.7B", score: 91, progress: 100,
    date: "Aug 15, 2025", createdAt: "2025-08-08T10:30:00Z", updatedAt: "2025-08-15T12:00:00Z",
  },
];

let nextId = 7;

// ─── Mock implementations ─────────────────────────────────────────────────────

export const mockResearchApi = {
  getAll: async (filters?: ResearchFilters): Promise<PaginatedResponse<ResearchProject>> => {
    await delay();
    let filtered = [...projects];

    if (filters?.status) {
      filtered = filtered.filter((p) => p.status === filters.status);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(q));
    }

    const page = filters?.page ?? 1;
    const limit = filters?.limit ?? 10;
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);

    return {
      data,
      page,
      limit,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / limit),
    };
  },

  getById: async (id: string): Promise<ResearchProject> => {
    await delay();
    const p = projects.find((p) => p.id === id);
    if (!p) throw new Error("Research not found");
    return { ...p };
  },

  create: async (payload: CreateResearchPayload): Promise<ResearchProject> => {
    await delay(400, 900);
    const project: ResearchProject = {
      id: `r${nextId++}`,
      name: payload.startupName,
      category: payload.industryCategory,
      categoryColor: "#4f6ef7",
      status: "processing",
      marketSize: "Calculating...",
      score: null,
      progress: 0,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    projects.unshift(project);
    return { ...project };
  },

  update: async (id: string, payload: UpdateResearchPayload): Promise<ResearchProject> => {
    await delay(300, 600);
    const idx = projects.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error("Research not found");
    projects[idx] = { ...projects[idx], ...payload, updatedAt: new Date().toISOString() };
    return { ...projects[idx] };
  },

  delete: async (id: string): Promise<void> => {
    await delay(200, 400);
    projects = projects.filter((p) => p.id !== id);
  },
};
