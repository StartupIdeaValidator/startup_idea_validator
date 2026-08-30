export type TeamRole = "Admin" | "Editor" | "Viewer";
export type MemberStatus = "Active" | "Pending" | "Inactive";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  status: MemberStatus;
  lastActive: string;
  initials: string;
  avatarGradient: string;
  isBot: boolean;
  isCurrentUser: boolean;
  createdAt: string;
}

export interface PendingInvitation {
  id: string;
  email: string;
  role: TeamRole;
  invitedAt: string;
  expiresAt: string;
}

export interface TeamStats {
  totalCredits: number;
  usedCredits: number;
  totalSeats: number;
  usedSeats: number;
  totalReports: number;
}

export interface InviteMemberPayload {
  email: string;
  role: TeamRole;
}

export interface UpdateMemberRolePayload {
  role: TeamRole;
}
