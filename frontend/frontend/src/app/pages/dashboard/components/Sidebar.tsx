import { LayoutDashboard, FlaskConical, GitBranch, BarChart2, BookOpen, Users, Settings, ChevronLeft, MessageSquare, Plus } from "lucide-react";
import RocketIcon from "@/app/components/RocketIcon";

export type NavPage = "dashboard" | "pipeline" | "marketdesk" | "team" | "aichat" | "newresearch" | "settings";

const navItems: { icon: React.ElementType; label: string; page: NavPage | null }[] = [
  { icon: LayoutDashboard, label: "Dashboard",        page: "dashboard"   },
  { icon: FlaskConical,    label: "New Research",      page: "newresearch" },
  { icon: GitBranch,       label: "Research Pipeline", page: "pipeline"    },
  { icon: BarChart2,       label: "Market Desk",       page: "marketdesk"  },
  { icon: BookOpen,        label: "Playbooks",         page: null          },
  { icon: MessageSquare,   label: "AI Chat",           page: "aichat"      },
  { icon: Users,           label: "Team",              page: "team"        },
];

const recentChats = [
  { title: "SaaS Market Opportunity",     meta: "Today · 6 messages", active: true  },
  { title: "Competitor Analysis — Design System", meta: "Yesterday",          active: false },
  { title: "GTM Strategy for B2B",        meta: "Jun 12",             active: false },
  { title: "Pricing Model Research",      meta: "Jun 10",             active: false },
  { title: "Investor Pitch Deck Review",  meta: "Jun 8",              active: false },
];

interface SidebarProps {
  activePage: NavPage;
  onNavigate: (p: NavPage) => void;
  onCollapse?: () => void;
}

export default function Sidebar({ activePage, onNavigate, onCollapse }: SidebarProps) {
  const inAiChat = activePage === "aichat";

  return (
    <aside
      className="fixed top-0 left-0 h-full flex flex-col z-20"
      style={{ width: 240, background: "#0e0e14", borderRight: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-2.5 px-5 py-5 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div
          className="w-8 h-8 rounded-lg bg-[#4f6ef7] flex items-center justify-center text-white"
          style={{ boxShadow: "0 0 16px rgba(79,110,247,0.35)" }}
        >
          <RocketIcon className="w-4.5 h-4.5 text-white" />
        </div>
        <span className="font-bold text-white text-[15px] tracking-tight">LaunchPilot</span>
      </div>

      {/* Nav items */}
      <nav className="flex-shrink-0 px-3 py-3 flex flex-col gap-0.5">
        {navItems.map(({ icon: Icon, label, page }) => {
          const active = page === activePage;
          return (
            <button
              key={label}
              onClick={() => page && onNavigate(page)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left w-full transition-all duration-150 hover:bg-white/5"
              style={{
                background: active ? "rgba(79,110,247,0.15)" : "transparent",
                color:      active ? "#7a9bff" : "rgba(255,255,255,0.45)",
                border:     active ? "1px solid rgba(79,110,247,0.2)" : "1px solid transparent",
              }}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </button>
          );
        })}
      </nav>

      {/* Settings + Collapse */}
      <div
        className="flex-shrink-0 px-3 pb-3 flex flex-col gap-0.5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <button
          onClick={() => onNavigate("settings")}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left w-full hover:bg-white/5 transition-all duration-150"
          style={{
            background: activePage === "settings" ? "rgba(79,110,247,0.15)" : "transparent",
            color:      activePage === "settings" ? "#7a9bff" : "rgba(255,255,255,0.45)",
            border:     activePage === "settings" ? "1px solid rgba(79,110,247,0.2)" : "1px solid transparent",
          }}
        >
          <Settings className="w-4 h-4" /> Settings
        </button>
        <button
          onClick={onCollapse}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left w-full hover:bg-white/5 transition-colors"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          <ChevronLeft className="w-4 h-4" /> Collapse
        </button>
      </div>

      {/* Recent Chats — only when AI Chat is active */}
      {inAiChat ? (
        <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-0.5 min-h-0">
          <div className="flex items-center justify-between px-1 mb-2">
            <span className="text-[10px] font-bold tracking-widest" style={{ color: "#444460" }}>
              RECENT CHATS
            </span>
            <button
              className="w-5 h-5 rounded-md flex items-center justify-center transition-colors hover:bg-white/10"
              style={{ color: "#555570" }}
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {recentChats.map((chat) => (
            <button
              key={chat.title}
              className="w-full text-left px-3 py-2.5 rounded-xl transition-all duration-150 hover:bg-white/5"
              style={{
                background: chat.active ? "rgba(79,110,247,0.12)" : "transparent",
                border: chat.active ? "1px solid rgba(79,110,247,0.18)" : "1px solid transparent",
              }}
            >
              <p
                className="text-xs font-medium leading-snug truncate"
                style={{ color: chat.active ? "#a5b4ff" : "rgba(255,255,255,0.5)" }}
              >
                {chat.title}
              </p>
              <p className="text-[10px] mt-0.5" style={{ color: "#444460" }}>{chat.meta}</p>
            </button>
          ))}

          {/* Research Credits widget */}
          <div className="mt-auto pt-3">
            <div
              className="px-4 py-3.5 rounded-xl"
              style={{ background: "#13131e", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium" style={{ color: "#8888a0" }}>Research Credits</span>
                <span className="text-xs font-bold text-white">1,240</span>
              </div>
              <div className="w-full h-1 rounded-full mb-1.5" style={{ background: "rgba(255,255,255,0.07)" }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: "24.8%", background: "linear-gradient(90deg,#7c5af8,#4f6ef7)" }}
                />
              </div>
              <p className="text-[10px]" style={{ color: "#444460" }}>3,760 remaining</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1" />
      )}

      {/* User row */}
      <div
        className="flex-shrink-0 px-4 py-4 flex items-center gap-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div
          className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold"
          style={{ background: "linear-gradient(135deg,#5a78f8,#a78bfa)" }}
        >
          SC
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white leading-none truncate">Sarah Chen</p>
          <p className="text-xs text-[#555570] mt-0.5">Pro Plan</p>
        </div>
        <button className="flex-shrink-0 transition-colors hover:text-white" style={{ color: "#444460" }}>
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
            <circle cx="8" cy="3"  r="1.2" fill="currentColor"/>
            <circle cx="8" cy="8"  r="1.2" fill="currentColor"/>
            <circle cx="8" cy="13" r="1.2" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </aside>
  );
}
