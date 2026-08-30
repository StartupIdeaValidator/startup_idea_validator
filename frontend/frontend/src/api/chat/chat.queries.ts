import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { chatApi } from "./chat.api";
import type { SendMessagePayload, CreateSessionPayload } from "./chat.types";

export const chatKeys = {
  all: ["chat"] as const,
  sessions: () => [...chatKeys.all, "sessions"] as const,
  session: (id: string) => [...chatKeys.all, "sessions", id] as const,
  messages: (sessionId: string) => [...chatKeys.all, "messages", sessionId] as const,
};

export const useChatSessions = () => {
  return useQuery({
    queryKey: chatKeys.sessions(),
    queryFn: chatApi.getSessions,
  });
};

export const useChatMessages = (sessionId: string) => {
  return useQuery({
    queryKey: chatKeys.messages(sessionId),
    queryFn: () => chatApi.getMessages(sessionId),
    enabled: Boolean(sessionId),
  });
};

export const useCreateSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateSessionPayload) => chatApi.createSession(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatKeys.sessions() });
    },
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: SendMessagePayload) => chatApi.sendMessage(payload),
    onSuccess: (_, { sessionId }) => {
      queryClient.invalidateQueries({ queryKey: chatKeys.messages(sessionId) });
      queryClient.invalidateQueries({ queryKey: chatKeys.sessions() });
    },
  });
};

export const useDeleteSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (sessionId: string) => chatApi.deleteSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatKeys.sessions() });
    },
  });
};
