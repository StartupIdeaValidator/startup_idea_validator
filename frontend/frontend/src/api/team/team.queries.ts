import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { teamApi } from "./team.api";
import type { InviteMemberPayload, UpdateMemberRolePayload } from "./team.types";

export const teamKeys = {
  all: ["team"] as const,
  stats: () => [...teamKeys.all, "stats"] as const,
  members: () => [...teamKeys.all, "members"] as const,
  invitations: () => [...teamKeys.all, "invitations"] as const,
};

export const useTeamStats = () => {
  return useQuery({
    queryKey: teamKeys.stats(),
    queryFn: teamApi.getStats,
  });
};

export const useTeamMembers = () => {
  return useQuery({
    queryKey: teamKeys.members(),
    queryFn: teamApi.getMembers,
  });
};

export const usePendingInvitations = () => {
  return useQuery({
    queryKey: teamKeys.invitations(),
    queryFn: teamApi.getPendingInvitations,
  });
};

export const useInviteMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: InviteMemberPayload) => teamApi.inviteMember(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.invitations() });
      queryClient.invalidateQueries({ queryKey: teamKeys.stats() });
    },
  });
};

export const useUpdateMemberRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ memberId, payload }: { memberId: string; payload: UpdateMemberRolePayload }) =>
      teamApi.updateMemberRole(memberId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.members() });
    },
  });
};

export const useRemoveMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (memberId: string) => teamApi.removeMember(memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.members() });
      queryClient.invalidateQueries({ queryKey: teamKeys.stats() });
    },
  });
};

export const useRevokeInvitation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (invitationId: string) => teamApi.revokeInvitation(invitationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.invitations() });
    },
  });
};
