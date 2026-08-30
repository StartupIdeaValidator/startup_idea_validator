import { apiClient } from "../client";
import type {
  ChatSession,
  ChatMessage,
  SendMessagePayload,
  CreateSessionPayload,
} from "./chat.types";

export const chatApi = {
  getSessions: async (): Promise<ChatSession[]> => {
    const { data } = await apiClient.get<ChatSession[]>("/chat/sessions");
    return data;
  },

  getSession: async (sessionId: string): Promise<ChatSession> => {
    const { data } = await apiClient.get<ChatSession>(`/chat/sessions/${sessionId}`);
    return data;
  },

  createSession: async (payload: CreateSessionPayload): Promise<ChatSession> => {
    const { data } = await apiClient.post<ChatSession>("/chat/sessions", payload);
    return data;
  },

  deleteSession: async (sessionId: string): Promise<void> => {
    await apiClient.delete(`/chat/sessions/${sessionId}`);
  },

  getMessages: async (sessionId: string): Promise<ChatMessage[]> => {
    const { data } = await apiClient.get<ChatMessage[]>(`/chat/sessions/${sessionId}/messages`);
    return data;
  },

  sendMessage: async (payload: SendMessagePayload): Promise<ChatMessage> => {
    const { data } = await apiClient.post<ChatMessage>(
      `/chat/sessions/${payload.sessionId}/messages`,
      payload
    );
    return data;
  },
};
