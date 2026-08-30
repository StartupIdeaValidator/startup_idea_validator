import { apiClient } from "../client";
import type {
  UserProfile,
  UpdateProfilePayload,
  UpdatePasswordPayload,
} from "./user.types";

export const userApi = {
  getProfile: async (): Promise<UserProfile> => {
    const { data } = await apiClient.get<UserProfile>("/user/profile");
    return data;
  },

  updateProfile: async (payload: UpdateProfilePayload): Promise<UserProfile> => {
    const { data } = await apiClient.patch<UserProfile>("/user/profile", payload);
    return data;
  },

  updatePassword: async (payload: UpdatePasswordPayload): Promise<void> => {
    await apiClient.patch("/user/password", payload);
  },

  uploadAvatar: async (file: File): Promise<{ avatarUrl: string }> => {
    const form = new FormData();
    form.append("avatar", file);
    const { data } = await apiClient.post<{ avatarUrl: string }>("/user/avatar", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  removeAvatar: async (): Promise<void> => {
    await apiClient.delete("/user/avatar");
  },

  enableTwoFactor: async (): Promise<{ qrCodeUrl: string; backupCodes: string[] }> => {
    const { data } = await apiClient.post("/user/2fa/enable");
    return data;
  },

  disableTwoFactor: async (code: string): Promise<void> => {
    await apiClient.post("/user/2fa/disable", { code });
  },
};
