// ─── Pagination ───────────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

// ─── Common response wrapper ───────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

// ─── Sort / Filter ────────────────────────────────────────────────────────────

export interface SortParams {
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface SearchParams {
  search?: string;
}
