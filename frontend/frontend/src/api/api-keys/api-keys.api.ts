import { apiClient } from "../client";
import type { ApiKey, CreateApiKeyPayload, CreatedApiKeyResponse } from "./api-keys.types";

export const apiKeysApi = {
  getAll: async (): Promise<ApiKey[]> => {
    const { data } = await apiClient.get<ApiKey[]>("/api-keys");
    return data;
  },

  create: async (payload: CreateApiKeyPayload): Promise<CreatedApiKeyResponse> => {
    const { data } = await apiClient.post<CreatedApiKeyResponse>("/api-keys", payload);
    return data;
  },

  delete: async (keyId: string): Promise<void> => {
    await apiClient.delete(`/api-keys/${keyId}`);
  },
};
