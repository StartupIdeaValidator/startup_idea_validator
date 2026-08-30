import { delay } from "./delay";
import type {
  ChatSession,
  ChatMessage,
  SendMessagePayload,
  CreateSessionPayload,
} from "../chat/chat.types";

let sessions: ChatSession[] = [
  { id: "cs1", title: "AI Writing Assistant Analysis", researchProjectId: "r1", messageCount: 4, lastMessageAt: "2025-08-30T14:30:00Z", createdAt: "2025-08-28T10:00:00Z" },
  { id: "cs2", title: "Market Size Questions", researchProjectId: null, messageCount: 2, lastMessageAt: "2025-08-29T16:00:00Z", createdAt: "2025-08-29T15:00:00Z" },
  { id: "cs3", title: "Competitor Strategy Deep Dive", researchProjectId: "r2", messageCount: 6, lastMessageAt: "2025-08-30T09:00:00Z", createdAt: "2025-08-25T11:00:00Z" },
];

const messageStore: Record<string, ChatMessage[]> = {
  cs1: [
    { id: "msg1", role: "user", content: "What's the TAM for AI writing tools?", createdAt: "2025-08-28T10:00:00Z" },
    { id: "msg2", role: "assistant", content: "The total addressable market for AI writing tools is estimated at **$4.2B** in 2025, growing at a CAGR of 26.3%. Key segments include:\n\n• Content marketing ($1.8B)\n• Academic writing ($920M)\n• Enterprise communications ($1.5B)\n\nThe market is driven by increasing demand for personalized content at scale.", createdAt: "2025-08-28T10:00:05Z" },
    { id: "msg3", role: "user", content: "Who are the main competitors?", createdAt: "2025-08-28T10:05:00Z" },
    { id: "msg4", role: "assistant", content: "The top competitors in the AI writing space are:\n\n1. **Jasper AI** — $125M ARR, enterprise-focused\n2. **Copy.ai** — $50M ARR, SMB segment\n3. **Writesonic** — $30M ARR, freemium model\n4. **Grammarly** — $200M+ ARR (broader scope)\n\nYour differentiation opportunity lies in **vertical-specific content** — none of these deeply serve niche industries.", createdAt: "2025-08-28T10:05:08Z" },
  ],
  cs2: [
    { id: "msg5", role: "user", content: "How do you calculate TAM vs SAM vs SOM?", createdAt: "2025-08-29T15:00:00Z" },
    { id: "msg6", role: "assistant", content: "Great question! Here's a breakdown:\n\n**TAM** (Total Addressable Market) — The entire revenue opportunity if you captured 100% of your market.\n\n**SAM** (Serviceable Addressable Market) — The segment of TAM you can realistically target with your product and business model.\n\n**SOM** (Serviceable Obtainable Market) — The portion of SAM you can capture in the short term (1-3 years).\n\n📊 Rule of thumb: SOM is typically 1-5% of SAM for early-stage startups.", createdAt: "2025-08-29T15:00:06Z" },
  ],
  cs3: [],
};

const aiResponses = [
  "Based on our analysis, this market segment shows strong growth potential with a **28% CAGR** over the next 5 years. The key drivers include digital transformation and increasing enterprise adoption.",
  "Looking at the competitive landscape, there are **3 main differentiators** you should focus on:\n\n1. **Speed to insight** — deliver results in minutes, not days\n2. **Data accuracy** — source from verified market reports\n3. **Actionable recommendations** — go beyond raw data\n\nThese align well with gaps in current market offerings.",
  "Your target audience analysis reveals interesting patterns. The primary buyer persona is a **Series A-B startup founder**, aged 28-42, with a technical background. They typically spend **$200-500/month** on market research tools and value speed over comprehensiveness.",
];

let nextMsgId = 10;
let nextSessionId = 4;

export const mockChatApi = {
  getSessions: async (): Promise<ChatSession[]> => {
    await delay();
    return sessions.map((s) => ({ ...s }));
  },
  getSession: async (sessionId: string): Promise<ChatSession> => {
    await delay();
    const s = sessions.find((s) => s.id === sessionId);
    if (!s) throw new Error("Session not found");
    return { ...s };
  },
  createSession: async (payload: CreateSessionPayload): Promise<ChatSession> => {
    await delay(200, 500);
    const session: ChatSession = {
      id: `cs${nextSessionId++}`, title: payload.title ?? "New conversation",
      researchProjectId: payload.researchProjectId ?? null,
      messageCount: 0, lastMessageAt: new Date().toISOString(), createdAt: new Date().toISOString(),
    };
    sessions.unshift(session);
    messageStore[session.id] = [];
    return { ...session };
  },
  deleteSession: async (sessionId: string): Promise<void> => {
    await delay(200, 400);
    sessions = sessions.filter((s) => s.id !== sessionId);
    delete messageStore[sessionId];
  },
  getMessages: async (sessionId: string): Promise<ChatMessage[]> => {
    await delay();
    return (messageStore[sessionId] ?? []).map((m) => ({ ...m }));
  },
  sendMessage: async (payload: SendMessagePayload): Promise<ChatMessage> => {
    await delay(100, 200);
    const userMsg: ChatMessage = { id: `msg${nextMsgId++}`, role: "user", content: payload.content, createdAt: new Date().toISOString() };
    if (!messageStore[payload.sessionId]) messageStore[payload.sessionId] = [];
    messageStore[payload.sessionId].push(userMsg);

    await delay(600, 1500);
    const aiMsg: ChatMessage = {
      id: `msg${nextMsgId++}`, role: "assistant",
      content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
      createdAt: new Date().toISOString(),
    };
    messageStore[payload.sessionId].push(aiMsg);

    const session = sessions.find((s) => s.id === payload.sessionId);
    if (session) {
      session.messageCount += 2;
      session.lastMessageAt = aiMsg.createdAt;
    }
    return aiMsg;
  },
};
