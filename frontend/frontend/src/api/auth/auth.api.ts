import { apiClient, tokenStore } from "../client";
import type {
  LoginPayload,
  RegisterPayload,
  AuthTokenResponse,
  AuthUser,
  RefreshTokenPayload,
} from "./auth.types";

export const authApi = {
  login: async (payload: LoginPayload): Promise<AuthTokenResponse> => {
    const { data } = await apiClient.post<AuthTokenResponse>("/auth/login", payload);
    tokenStore.set(data.accessToken);
    return data;
  },

  register: async (payload: RegisterPayload): Promise<AuthTokenResponse> => {
    const { data } = await apiClient.post<AuthTokenResponse>("/auth/register", payload);
    tokenStore.set(data.accessToken);
    return data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
    tokenStore.clear();
  },

  getCurrentUser: async (): Promise<AuthUser> => {
    const { data } = await apiClient.get<AuthUser>("/auth/me");
    return data;
  },

  refreshToken: async (payload: RefreshTokenPayload): Promise<AuthTokenResponse> => {
    const { data } = await apiClient.post<AuthTokenResponse>("/auth/refresh", payload);
    tokenStore.set(data.accessToken);
    return data;
  },
};
