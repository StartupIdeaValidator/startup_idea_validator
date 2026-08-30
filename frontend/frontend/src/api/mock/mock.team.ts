import { delay } from "./delay";
import type {
  TeamMember,
  TeamStats,
  PendingInvitation,
  InviteMemberPayload,
  UpdateMemberRolePayload,
} from "../team/team.types";

let members: TeamMember[] = [
  {
    id: "m1", name: "Sarah Chen", email: "sarah.chen@launchpilot.io",
    role: "Admin", status: "Active", lastActive: "Just now",
    initials: "SC", avatarGradient: "linear-gradient(135deg, #4f6ef7, #6a8eff)",
    isBot: false, isCurrentUser: true, createdAt: "2025-01-15T09:30:00Z",
  },
  {
    id: "m2", name: "Marcus Johnson", email: "marcus.j@launchpilot.io",
    role: "Editor", status: "Active", lastActive: "2 hours ago",
    initials: "MJ", avatarGradient: "linear-gradient(135deg, #10b981, #34d399)",
    isBot: false, isCurrentUser: false, createdAt: "2025-02-20T14:00:00Z",
  },
  {
    id: "m3", name: "Aisha Patel", email: "aisha.p@launchpilot.io",
    role: "Editor", status: "Active", lastActive: "5 hours ago",
    initials: "AP", avatarGradient: "linear-gradient(135deg, #f59e0b, #fbbf24)",
    isBot: false, isCurrentUser: false, createdAt: "2025-03-10T11:00:00Z",
  },
  {
    id: "m4", name: "James Park", email: "james.p@launchpilot.io",
    role: "Viewer", status: "Active", lastActive: "Yesterday",
    initials: "JP", avatarGradient: "linear-gradient(135deg, #ec4899, #f472b6)",
    isBot: false, isCurrentUser: false, createdAt: "2025-04-05T09:00:00Z",
  },
  {
    id: "m5", name: "Luna AI", email: "luna@launchpilot.io",
    role: "Viewer", status: "Active", lastActive: "Always on",
    initials: "AI", avatarGradient: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
    isBot: true, isCurrentUser: false, createdAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "m6", name: "Tomás Rivera", email: "tomas.r@launchpilot.io",
    role: "Viewer", status: "Inactive", lastActive: "2 weeks ago",
    initials: "TR", avatarGradient: "linear-gradient(135deg, #64748b, #94a3b8)",
    isBot: false, isCurrentUser: false, createdAt: "2025-05-12T16:00:00Z",
  },
];

let invitations: PendingInvitation[] = [
  {
    id: "inv1", email: "alex.kumar@gmail.com", role: "Editor",
    invitedAt: "2025-08-28T10:00:00Z", expiresAt: "2025-09-04T10:00:00Z",
  },
  {
    id: "inv2", email: "nina.wong@outlook.com", role: "Viewer",
    invitedAt: "2025-08-29T15:30:00Z", expiresAt: "2025-09-05T15:30:00Z",
  },
];

let invNextId = 3;

export const mockTeamApi = {
  getStats: async (): Promise<TeamStats> => {
    await delay();
    return {
      totalCredits: 5000,
      usedCredits: 1240,
      totalSeats: 10,
      usedSeats: members.filter((m) => m.status === "Active").length,
      totalReports: 42,
    };
  },

  getMembers: async (): Promise<TeamMember[]> => {
    await delay();
    return members.map((m) => ({ ...m }));
  },

  removeMember: async (memberId: string): Promise<void> => {
    await delay(300, 500);
    members = members.filter((m) => m.id !== memberId);
  },

  updateMemberRole: async (memberId: string, payload: UpdateMemberRolePayload): Promise<TeamMember> => {
    await delay(200, 500);
    const idx = members.findIndex((m) => m.id === memberId);
    if (idx === -1) throw new Error("Member not found");
    members[idx] = { ...members[idx], role: payload.role };
    return { ...members[idx] };
  },

  getPendingInvitations: async (): Promise<PendingInvitation[]> => {
    await delay();
    return invitations.map((i) => ({ ...i }));
  },

  inviteMember: async (payload: InviteMemberPayload): Promise<PendingInvitation> => {
    await delay(300, 700);
    const inv: PendingInvitation = {
      id: `inv${invNextId++}`,
      email: payload.email,
      role: payload.role,
      invitedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };
    invitations.push(inv);
    return { ...inv };
  },

  revokeInvitation: async (invitationId: string): Promise<void> => {
    await delay(200, 400);
    invitations = invitations.filter((i) => i.id !== invitationId);
  },
};
