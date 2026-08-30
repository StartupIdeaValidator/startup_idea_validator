import { useState, useEffect, useRef } from "react";
import {
  Paperclip, ArrowUp, Globe, BookOpen, ChevronDown,
  Download, Bookmark, Bell, Zap, Target, Flag, Loader2,
} from "lucide-react";
import { useChatMessages, useSendMessage, useChatSessions } from "@/api/chat/chat.queries";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Competitor { name: string; arr: string; arrColor: string; description: string; highlight: string; highlightColor: string; }

// ─── Data ─────────────────────────────────────────────────────────────────────

const sessionSignals = [
  { value: "85%",  label: "Market Fit",  color: "#4f6ef7" },
  { value: "14.2%",label: "CAGR",        color: "#4ade80" },
  { value: "$89",  label: "Seat / Mo",   color: "#f59e0b" },
  { value: "120%", label: "NDR Target",  color: "#a78bfa" },
];

const swot = {
  Strengths:     { color: "#4ade80", items: ["AI-first UX", "Research synthesis", "PLG motion"] },
  Weaknesses:    { color: "#f87171", items: ["No brand equity", "Cold start data", "Small team"] },
  Opportunities: { color: "#7a9bff", items: ["AI adoption wave", "Market fragmented", "PM hiring surge"] },
  Threats:       { color: "#f59e0b", items: ["UX Pilot AI native", "Notion AI", "Funding climate"] },
};

const competitors_tracked = ["Productboard", "Aha!", "Linear", "Notion", "Coda", "Fibery"];

const quickChips = [
  { label: "Pitch Deck",      icon: "📄" },
  { label: "Financial Model", icon: "📊" },
  { label: "Feature Ideas",   icon: "💡" },
  { label: "Cold Email",      icon: "✉️" },
];

// ─── Generating dots animation ────────────────────────────────────────────────

function GeneratingDots() {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setFrame((f) => (f + 1) % 3), 450);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex items-center gap-1.5 py-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full transition-all duration-300"
          style={{ background: i === frame ? "#7a9bff" : "rgba(122,155,255,0.3)", transform: i === frame ? "scale(1.3)" : "scale(1)" }}
        />
      ))}
    </div>
  );
}

// ─── AI Chat Page ──────────────────────────────────────────────────────────────

export default function AIChatPage() {
  const [activeSessionId, setActiveSessionId] = useState("cs1");
  const [input, setInput] = useState("");
  const [webSearch, setWebSearch] = useState(false);
  const [deepResearch, setDeepResearch] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: sessions } = useChatSessions();
  const { data: messages = [], isLoading } = useChatMessages(activeSessionId);
  const sendMessageMutation = useSendMessage();

  const currentSession = sessions?.find((s) => s.id === activeSessionId) ?? sessions?.[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sendMessageMutation.isPending]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || sendMessageMutation.isPending) return;

    setInput("");
    sendMessageMutation.mutate({
      sessionId: activeSessionId,
      content: text,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Top bar ── */}
      <header
        className="flex items-center justify-between px-6 py-3.5 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", background: "#0a0a0e" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#4f6ef7,#7c3aed)", boxShadow: "0 0 14px rgba(79,110,247,0.35)" }}>
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"
                fill="white" opacity="0.9"/>
              <circle cx="12" cy="12" r="3" fill="white" opacity="0.4"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-none">AI Research Assistant</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
              <span className="text-xs" style={{ color: "#8888a0" }}>LaunchPilot Intelligence · GPT-4o</span>
            </div>
          </div>
          {currentSession && (
            <span className="flex items-center gap-1.5 ml-1 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: "rgba(79,110,247,0.18)", color: "#7a9bff", border: "1px solid rgba(79,110,247,0.3)" }}>
              <Zap className="w-3 h-3" />
              {currentSession.title}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm transition-colors hover:bg-white/10"
            style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#8888a0" }}>
            <Download className="w-3.5 h-3.5" /> Export
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm transition-colors hover:bg-white/10"
            style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#8888a0" }}>
            <Bookmark className="w-3.5 h-3.5" /> Save
          </button>
        </div>
      </header>

      {/* ── Content area ── */}
      <div className="flex-1 flex overflow-hidden">

        {/* ── Chat panel ── */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-6">

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-[#4f6ef7] animate-spin" />
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className={msg.role === "user" ? "flex justify-end" : "flex items-start gap-3"}>
                  {msg.role === "user" ? (
                    <div className="flex items-end gap-3 max-w-[70%]">
                      <div className="flex flex-col items-end">
                        <div className="px-5 py-3.5 rounded-2xl rounded-br-md text-sm text-white leading-relaxed whitespace-pre-wrap"
                          style={{ background: "#1e1e2c", border: "1px solid rgba(255,255,255,0.08)" }}>
                          {msg.content}
                        </div>
                        <span className="text-[11px] mt-1.5" style={{ color: "#444460" }}>
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold mb-5"
                        style={{ background: "linear-gradient(135deg,#5a78f8,#a78bfa)" }}>SC</div>
                    </div>
                  ) : (
                    <>
                      <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5"
                        style={{ background: "linear-gradient(135deg,#4f6ef7,#7c3aed)", boxShadow: "0 0 12px rgba(79,110,247,0.3)" }}>
                        <span className="text-white text-[10px] font-bold">LP</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2.5 mb-3">
                          <span className="text-sm font-semibold text-white">LaunchPilot AI</span>
                          <span className="text-xs" style={{ color: "#444460" }}>
                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                          <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full"
                            style={{ background: "rgba(79,110,247,0.15)", color: "#7a9bff", border: "1px solid rgba(79,110,247,0.25)" }}>
                            <Globe className="w-3 h-3" />
                            G2 · Crunchbase
                          </span>
                        </div>
                        <div className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "#ccccdd" }}>
                          {msg.content}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}

            {/* Generating message indicator when mutation is pending */}
            {sendMessageMutation.isPending && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5"
                  style={{ background: "linear-gradient(135deg,#4f6ef7,#7c3aed)", boxShadow: "0 0 12px rgba(79,110,247,0.3)" }}>
                  <span className="text-white text-[10px] font-bold">LP</span>
                </div>
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="text-sm font-semibold text-white">LaunchPilot AI</span>
                    <span className="text-xs" style={{ color: "#555570" }}>Analyzing market data...</span>
                  </div>
                  <GeneratingDots />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ── Input area ── */}
          <div className="flex-shrink-0 px-8 pb-6 pt-2">
            {/* Quick chips */}
            <div className="flex items-center gap-2 mb-3">
              {quickChips.map((c) => (
                <button key={c.label}
                  onClick={() => setInput(`Tell me about ${c.label} for our startup`)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm transition-all duration-150 hover:border-[rgba(79,110,247,0.4)] hover:text-white"
                  style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#8888a0", background: "#13131a" }}>
                  <span>{c.icon}</span>
                  {c.label}
                </button>
              ))}
            </div>

            {/* Input box */}
            <div className="rounded-2xl overflow-hidden" style={{ background: "#13131a", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="flex items-center gap-3 px-4 py-3.5">
                <button className="text-[#444460] hover:text-[#8888a0] transition-colors flex-shrink-0">
                  <Paperclip className="w-4 h-4" />
                </button>
                <input
                  className="flex-1 bg-transparent outline-none text-sm text-white placeholder-[#444460]"
                  placeholder="Ask LaunchPilot anything about your startup..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || sendMessageMutation.isPending}
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-150 hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg,#5a78f8,#4060e8)", boxShadow: "0 4px 14px rgba(79,110,247,0.4)" }}>
                  {sendMessageMutation.isPending ? (
                    <Loader2 className="w-4 h-4 text-white animate-spin" />
                  ) : (
                    <ArrowUp className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between px-4 pb-3 pt-0">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setWebSearch((v) => !v)}
                    className="flex items-center gap-1.5 text-xs transition-colors"
                    style={{ color: webSearch ? "#7a9bff" : "#555570" }}>
                    <Globe className="w-3.5 h-3.5" />
                    Web search
                  </button>
                  <button
                    onClick={() => setDeepResearch((v) => !v)}
                    className="flex items-center gap-1.5 text-xs transition-colors"
                    style={{ color: deepResearch ? "#7a9bff" : "#555570" }}>
                    <BookOpen className="w-3.5 h-3.5" />
                    Deep research
                  </button>
                </div>
                <span className="text-xs" style={{ color: "#333350" }}>
                  Press <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono" style={{ background: "#1e1e2c", color: "#555570" }}>Enter</kbd> to send
                </span>
              </div>
            </div>

            <p className="text-center text-xs mt-3" style={{ color: "#333350" }}>
              LaunchPilot AI may produce inaccurate information. Verify critical data independently.
            </p>
          </div>
        </div>

        {/* ── Right panel: Research Context ── */}
        <aside
          className="flex-shrink-0 overflow-y-auto"
          style={{ width: 280, borderLeft: "1px solid rgba(255,255,255,0.07)", background: "#0c0c12" }}
        >
          <div className="px-5 py-5 flex flex-col gap-5">

            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-bold text-white">Research Context</h3>
                <span className="flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(74,222,128,0.15)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.3)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
                  Live
                </span>
              </div>
              <p className="text-xs" style={{ color: "#666680" }}>{currentSession?.title ?? "SaaS Market Opportunity"}</p>
            </div>

            <div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

            {/* Market Size */}
            <div>
              <p className="text-[10px] font-bold tracking-widest mb-3" style={{ color: "#444460" }}>MARKET SIZE</p>
              <div className="flex flex-col gap-3">
                {[
                  { label: "TAM", value: "$8.4B", icon: <Globe className="w-3.5 h-3.5" />, color: "#7a9bff" },
                  { label: "SAM", value: "$1.9B", icon: <Target className="w-3.5 h-3.5" />, color: "#7a9bff" },
                  { label: "SOM", value: "$142M", icon: <Flag className="w-3.5 h-3.5" />,   color: "#4ade80" },
                ].map((m) => (
                  <div key={m.label} className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-semibold mb-0.5" style={{ color: "#555570" }}>{m.label}</p>
                      <p className="text-xl font-bold" style={{ color: m.color }}>{m.value}</p>
                    </div>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ background: `${m.color}15`, border: `1px solid ${m.color}25`, color: m.color }}>
                      {m.icon}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

            {/* Session Signals */}
            <div>
              <p className="text-[10px] font-bold tracking-widest mb-3" style={{ color: "#444460" }}>SESSION SIGNALS</p>
              <div className="grid grid-cols-2 gap-2.5">
                {sessionSignals.map((s) => (
                  <div key={s.label} className="rounded-xl p-3" style={{ background: "#13131a", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <p className="text-lg font-bold leading-none mb-1" style={{ color: s.color }}>{s.value}</p>
                    <p className="text-[10px]" style={{ color: "#555570" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

            {/* Competitors Tracked */}
            <div>
              <p className="text-[10px] font-bold tracking-widest mb-3" style={{ color: "#444460" }}>COMPETITORS TRACKED</p>
              <div className="flex flex-col gap-1.5">
                {competitors_tracked.map((name) => (
                  <div key={name} className="flex items-center justify-between py-1.5 px-3 rounded-xl"
                    style={{ background: "#13131a", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <span className="text-xs font-medium text-white">{name}</span>
                    <span className="w-2 h-2 rounded-full bg-[#4ade80]" />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </aside>

      </div>
    </div>
  );
}
