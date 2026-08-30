import { delay } from "./delay";
import type { ApiKey, CreateApiKeyPayload, CreatedApiKeyResponse } from "../api-keys/api-keys.types";

let keys: ApiKey[] = [
  { id: "k1", name: "Production Key", prefix: "lp_live_sk_••••4f7a", environment: "live", usageCount: 4820, usageLimit: 10000, createdAt: "2025-06-01T00:00:00Z", lastUsedAt: "2025-08-30T14:00:00Z" },
  { id: "k2", name: "Development Key", prefix: "lp_test_sk_••••9c2d", environment: "test", usageCount: 1240, usageLimit: 5000, createdAt: "2025-05-15T00:00:00Z", lastUsedAt: "2025-08-30T12:00:00Z" },
  { id: "k3", name: "Analytics Plugin", prefix: "lp_live_sk_••••2b8e", environment: "live", usageCount: 320, usageLimit: 2000, createdAt: "2025-04-22T00:00:00Z", lastUsedAt: "2025-08-29T18:00:00Z" },
];

let nextId = 4;

export const mockApiKeysApi = {
  getAll: async (): Promise<ApiKey[]> => {
    await delay();
    return keys.map((k) => ({ ...k }));
  },
  create: async (payload: CreateApiKeyPayload): Promise<CreatedApiKeyResponse> => {
    await delay(300, 700);
    const suffix = Math.random().toString(36).slice(2, 6);
    const env = payload.environment ?? "live";
    const key: CreatedApiKeyResponse = {
      id: `k${nextId++}`, name: payload.name, prefix: `lp_${env}_sk_••••${suffix}`,
      environment: env, usageCount: 0, usageLimit: 5000,
      createdAt: new Date().toISOString(), lastUsedAt: null,
      secret: `lp_${env}_sk_${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`,
    };
    keys.push(key);
    return { ...key };
  },
  delete: async (keyId: string): Promise<void> => {
    await delay(200, 400);
    keys = keys.filter((k) => k.id !== keyId);
  },
};
