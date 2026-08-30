import { apiClient } from "../client";
import type {
  TeamMember,
  TeamStats,
  PendingInvitation,
  InviteMemberPayload,
  UpdateMemberRolePayload,
} from "./team.types";

export const teamApi = {
  getStats: async (): Promise<TeamStats> => {
    const { data } = await apiClient.get<TeamStats>("/team/stats");
    return data;
  },

  getMembers: async (): Promise<TeamMember[]> => {
    const { data } = await apiClient.get<TeamMember[]>("/team/members");
    return data;
  },

  removeMember: async (memberId: string): Promise<void> => {
    await apiClient.delete(`/team/members/${memberId}`);
  },

  updateMemberRole: async (
    memberId: string,
    payload: UpdateMemberRolePayload
  ): Promise<TeamMember> => {
    const { data } = await apiClient.patch<TeamMember>(
      `/team/members/${memberId}/role`,
      payload
    );
    return data;
  },

  getPendingInvitations: async (): Promise<PendingInvitation[]> => {
    const { data } = await apiClient.get<PendingInvitation[]>("/team/invitations");
    return data;
  },

  inviteMember: async (payload: InviteMemberPayload): Promise<PendingInvitation> => {
    const { data } = await apiClient.post<PendingInvitation>("/team/invitations", payload);
    return data;
  },

  revokeInvitation: async (invitationId: string): Promise<void> => {
    await apiClient.delete(`/team/invitations/${invitationId}`);
  },
};
