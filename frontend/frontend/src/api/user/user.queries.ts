import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "./user.api";
import type { UpdateProfilePayload, UpdatePasswordPayload } from "./user.types";

export const userKeys = {
  all: ["user"] as const,
  profile: () => [...userKeys.all, "profile"] as const,
};

export const useUserProfile = () => {
  return useQuery({
    queryKey: userKeys.profile(),
    queryFn: userApi.getProfile,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => userApi.updateProfile(payload),
    onSuccess: (updated) => {
      queryClient.setQueryData(userKeys.profile(), updated);
    },
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (payload: UpdatePasswordPayload) => userApi.updatePassword(payload),
  });
};

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => userApi.uploadAvatar(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.profile() });
    },
  });
};

export const useRemoveAvatar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userApi.removeAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.profile() });
    },
  });
};
