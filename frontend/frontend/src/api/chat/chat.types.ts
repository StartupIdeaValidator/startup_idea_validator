export type MessageRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: string;
}

export interface ChatSession {
  id: string;
  title: string;
  researchProjectId: string | null;
  messageCount: number;
  lastMessageAt: string;
  createdAt: string;
}

export interface SendMessagePayload {
  content: string;
  sessionId: string;
  enableWebSearch?: boolean;
  enableDeepResearch?: boolean;
}

export interface CreateSessionPayload {
  title?: string;
  researchProjectId?: string;
}
