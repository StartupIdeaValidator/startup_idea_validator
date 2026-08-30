import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiKeysApi } from "./api-keys.api";
import type { CreateApiKeyPayload } from "./api-keys.types";

export const apiKeyKeys = {
  all: ["api-keys"] as const,
  lists: () => [...apiKeyKeys.all, "list"] as const,
};

export const useApiKeys = () => {
  return useQuery({
    queryKey: apiKeyKeys.lists(),
    queryFn: apiKeysApi.getAll,
  });
};

export const useCreateApiKey = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateApiKeyPayload) => apiKeysApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: apiKeyKeys.lists() });
    },
  });
};

export const useDeleteApiKey = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (keyId: string) => apiKeysApi.delete(keyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: apiKeyKeys.lists() });
    },
  });
};
