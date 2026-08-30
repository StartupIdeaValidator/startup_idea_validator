import { delay } from "./delay";
import type {
  UserProfile,
  UpdateProfilePayload,
} from "../user/user.types";

// ─── In-memory profile state ──────────────────────────────────────────────────

let profile: UserProfile = {
  id: "usr_01",
  firstName: "Sarah",
  lastName: "Chen",
  email: "sarah.chen@launchpilot.io",
  displayHandle: "sarahchen",
  bio: "AI startup enthusiast & product strategist. Building the next wave of validated ideas with LaunchPilot.",
  timezone: "(UTC-8) Pacific Standard Time",
  avatarUrl: null,
  twoFactorEnabled: true,
  plan: "pro",
};

// ─── Mock implementations ─────────────────────────────────────────────────────

export const mockUserApi = {
  getProfile: async (): Promise<UserProfile> => {
    await delay();
    return { ...profile };
  },

  updateProfile: async (payload: UpdateProfilePayload): Promise<UserProfile> => {
    await delay(300, 700);
    profile = { ...profile, ...payload };
    return { ...profile };
  },

  updatePassword: async (): Promise<void> => {
    await delay(400, 800);
    // Simulate success
  },

  uploadAvatar: async (_file: File): Promise<{ avatarUrl: string }> => {
    await delay(500, 1200);
    const avatarUrl = `https://api.dicebear.com/9.x/initials/svg?seed=${profile.firstName}+${profile.lastName}&backgroundColor=4f6ef7`;
    profile.avatarUrl = avatarUrl;
    return { avatarUrl };
  },

  removeAvatar: async (): Promise<void> => {
    await delay(200, 400);
    profile.avatarUrl = null;
  },

  enableTwoFactor: async (): Promise<{ qrCodeUrl: string; backupCodes: string[] }> => {
    await delay(400, 800);
    profile.twoFactorEnabled = true;
    return {
      qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/LaunchPilot?secret=MOCK2FA",
      backupCodes: ["ABC12-DEF34", "GHI56-JKL78", "MNO90-PQR12", "STU34-VWX56"],
    };
  },

  disableTwoFactor: async (): Promise<void> => {
    await delay(300, 500);
    profile.twoFactorEnabled = false;
  },
};
