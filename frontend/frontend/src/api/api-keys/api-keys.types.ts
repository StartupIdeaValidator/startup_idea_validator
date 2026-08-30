export interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  environment: "live" | "test";
  usageCount: number;
  usageLimit: number;
  createdAt: string;
  lastUsedAt: string | null;
}

export interface CreateApiKeyPayload {
  name: string;
  environment?: "live" | "test";
}

export interface CreatedApiKeyResponse extends ApiKey {
  secret: string; // Full key returned only once on creation
}
