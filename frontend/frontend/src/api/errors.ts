import type { AxiosError } from "axios";

export type ApiErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "SERVER_ERROR"
  | "NETWORK_ERROR"
  | "UNKNOWN";

export interface ApiError {
  code: ApiErrorCode;
  status: number | null;
  message: string;
  details?: unknown;
}

export function parseApiError(error: unknown): ApiError {
  const axiosError = error as AxiosError<{ message?: string; errors?: unknown }>;

  if (!axiosError.response) {
    return {
      code: "NETWORK_ERROR",
      status: null,
      message: "Network error — please check your connection.",
    };
  }

  const { status, data } = axiosError.response;
  const message = data?.message ?? axiosError.message ?? "An unexpected error occurred.";

  const codeMap: Record<number, ApiErrorCode> = {
    400: "BAD_REQUEST",
    401: "UNAUTHORIZED",
    403: "FORBIDDEN",
    404: "NOT_FOUND",
    422: "VALIDATION_ERROR",
    500: "SERVER_ERROR",
  };

  return {
    code: codeMap[status] ?? "UNKNOWN",
    status,
    message,
    details: data?.errors,
  };
}

export function isUnauthorized(error: unknown): boolean {
  return parseApiError(error).code === "UNAUTHORIZED";
}

export function isNotFound(error: unknown): boolean {
  return parseApiError(error).code === "NOT_FOUND";
}
