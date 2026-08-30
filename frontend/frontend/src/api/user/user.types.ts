export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  displayHandle: string;
  bio: string;
  timezone: string;
  avatarUrl: string | null;
  twoFactorEnabled: boolean;
  plan: "free" | "pro" | "enterprise";
}

export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  displayHandle?: string;
  bio?: string;
  timezone?: string;
}

export interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface UploadAvatarPayload {
  file: File;
}
