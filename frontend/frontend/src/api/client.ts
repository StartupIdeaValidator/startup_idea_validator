import axios from "axios";
import { API_CONFIG } from "./config";

export const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: API_CONFIG.timeout,
});

// ─── Auth token ───────────────────────────────────────────────────────────────

const TOKEN_KEY = "lp_auth_token";

export const tokenStore = {
  get: (): string | null => localStorage.getItem(TOKEN_KEY),
  set: (token: string): void => localStorage.setItem(TOKEN_KEY, token),
  clear: (): void => localStorage.removeItem(TOKEN_KEY),
};

// ─── Request interceptor — attach Bearer token ────────────────────────────────

apiClient.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── Response interceptor — surface 401 globally ─────────────────────────────

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      tokenStore.clear();
      // Dispatch a custom event so the app can redirect to sign-in
      window.dispatchEvent(new CustomEvent("lp:unauthorized"));
    }
    return Promise.reject(error);
  }
);
