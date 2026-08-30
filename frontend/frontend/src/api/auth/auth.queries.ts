import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "./auth.api";
import type { LoginPayload, RegisterPayload } from "./auth.types";

export const authKeys = {
  me: ["auth", "me"] as const,
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.me,
    queryFn: authApi.getCurrentUser,
    // Only run when a token exists
    enabled: Boolean(localStorage.getItem("lp_auth_token")),
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(authKeys.me, data.user);
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(authKeys.me, data.user);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.clear();
    },
  });
};
