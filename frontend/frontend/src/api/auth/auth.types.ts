export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayHandle: string;
  avatarUrl: string | null;
  plan: "free" | "pro" | "enterprise";
  createdAt: string;
}

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: AuthUser;
}

export interface RefreshTokenPayload {
  refreshToken: string;
}
