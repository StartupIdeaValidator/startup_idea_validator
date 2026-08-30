import { delay } from "./delay";
import { tokenStore } from "../client";
import type {
  AuthUser,
  AuthTokenResponse,
  LoginPayload,
  RegisterPayload,
} from "../auth/auth.types";

// ─── Fake user store ──────────────────────────────────────────────────────────

const MOCK_USER: AuthUser = {
  id: "usr_01",
  email: "sarah.chen@launchpilot.io",
  firstName: "Sarah",
  lastName: "Chen",
  displayHandle: "sarahchen",
  avatarUrl: null,
  plan: "pro",
  createdAt: "2025-01-15T09:30:00Z",
};

function makeToken(): AuthTokenResponse {
  const token = `mock_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  return {
    accessToken: token,
    refreshToken: `ref_${token}`,
    expiresIn: 3600,
    user: { ...MOCK_USER },
  };
}

// ─── Mock implementations ─────────────────────────────────────────────────────

export const mockAuthApi = {
  login: async (_payload: LoginPayload): Promise<AuthTokenResponse> => {
    await delay();
    const res = makeToken();
    tokenStore.set(res.accessToken);
    return res;
  },

  register: async (payload: RegisterPayload): Promise<AuthTokenResponse> => {
    await delay();
    const res = makeToken();
    res.user = {
      ...MOCK_USER,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
    };
    tokenStore.set(res.accessToken);
    return res;
  },

  logout: async (): Promise<void> => {
    await delay(100, 200);
    tokenStore.clear();
  },

  getCurrentUser: async (): Promise<AuthUser> => {
    await delay();
    return { ...MOCK_USER };
  },

  refreshToken: async (): Promise<AuthTokenResponse> => {
    await delay(100, 300);
    const res = makeToken();
    tokenStore.set(res.accessToken);
    return res;
  },
};
