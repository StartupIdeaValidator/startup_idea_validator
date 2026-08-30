import { useState } from "react";
import {
  UserPlus, Bell, Search, SlidersHorizontal,
  Shield, Eye, Edit3, Terminal, Send, MoreVertical,
  Info, Zap, Users, FileText, Loader2,
} from "lucide-react";
import RocketIcon from "@/app/components/RocketIcon";
import {
  useTeamStats,
  useTeamMembers,
  usePendingInvitations,
  useInviteMember,
  useRemoveMember,
} from "@/api/team/team.queries";

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({ initials, grad, dot }: { initials: string; grad: string; dot: string }) {
  return (
    <div className="relative flex-shrink-0">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[13px] font-bold select-none"
        style={{ background: grad }}
      >
        {initials}
      </div>
      <span
        className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
        style={{ background: dot, borderColor: "#14141a" }}
      />
    </div>
  );
}

// ─── Role badge ───────────────────────────────────────────────────────────────

function RoleBadge({ role }: { role: string }) {
  const Icon = role === "Admin" ? Shield : role === "Viewer" ? Eye : Edit3;
  const isViewer = role === "Viewer";
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold"
      style={{
        background: isViewer ? "rgba(255,255,255,0.06)" : "rgba(79,110,247,0.18)",
        color: isViewer ? "#9999b0" : "#7a9bff",
        border: isViewer ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(79,110,247,0.3)",
      }}
    >
      <Icon className="w-3 h-3" strokeWidth={2.2} />
      {role}
    </span>
  );
}

// ─── Status text ─────────────────────────────────────────────────────────────

function StatusText({ status }: { status: string }) {
  const active = status === "Active";
  return (
    <span className="inline-flex items-center gap-2 text-sm font-medium"
      style={{ color: active ? "#4ade80" : "#f59e0b" }}>
      <span className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ background: active ? "#4ade80" : "#f59e0b" }} />
      {status}
    </span>
  );
}

// ─── Tag pill (You / System) ──────────────────────────────────────────────────

function TagPill({ label }: { label: string }) {
  const isSystem = label === "System";
  return (
    <span
      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
      style={
        isSystem
          ? { background: "rgba(139,92,246,0.22)", color: "#c4b5fd", border: "1px solid rgba(139,92,246,0.4)" }
          : { background: "rgba(79,110,247,0.22)", color: "#818cf8",  border: "1px solid rgba(79,110,247,0.4)" }
      }
    >
      {label}
    </span>
  );
}

// ─── Team Page ────────────────────────────────────────────────────────────────

export default function TeamPage() {
  const [search, setSearch] = useState("");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"Admin" | "Editor" | "Viewer">("Editor");

  const { data: stats, isLoading: statsLoading } = useTeamStats();
  const { data: members = [], isLoading: membersLoading } = useTeamMembers();
  const { data: invitations = [] } = usePendingInvitations();

  const inviteMutation = useInviteMember();
  const removeMutation = useRemoveMember();

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    inviteMutation.mutate({ email: inviteEmail.trim(), role: inviteRole }, {
      onSuccess: () => {
        setInviteEmail("");
        setShowInviteModal(false);
      }
    });
  };

  return (
    <div
      className="flex-1 flex flex-col min-h-screen"
      style={{ fontFamily: "'Inter', sans-serif", background: "#0a0a0e" }}
    >
      {/* ── Top header ── */}
      <header
        className="flex items-center justify-between px-8 py-5 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div>
          <h1 className="text-[1.65rem] font-bold text-white leading-none tracking-tight">Teams</h1>
          <p className="text-sm mt-1.5" style={{ color: "#8888a0" }}>
            Manage members, roles, and shared workspace access
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowInviteModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-150 hover:brightness-110 active:scale-95"
            style={{
              background: "linear-gradient(135deg,#5a78f8 0%,#4060e8 100%)",
              boxShadow: "0 4px 20px rgba(79,110,247,0.38)",
            }}
          >
            <UserPlus className="w-4 h-4" />
            Invite Member
          </button>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer"
            style={{ background: "linear-gradient(135deg,#5a78f8,#a78bfa)" }}
          >
            SC
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-5">

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-3 gap-4">

          {/* Card 1 — Team Credits */}
          <div className="rounded-2xl p-6" style={{ background: "#13131a", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-start justify-between mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(20,200,160,0.15)", border: "1px solid rgba(20,200,160,0.25)" }}
              >
                <Zap className="w-5 h-5" style={{ color: "#34d9b4" }} />
              </div>
            </div>
            <p className="text-sm mb-2" style={{ color: "#8888a0" }}>Total Team Credits</p>
            <p className="leading-none mb-1">
              <span className="text-4xl font-bold text-white">{stats?.usedCredits ?? 1240}</span>
              <span className="text-base font-normal ml-1" style={{ color: "#666680" }}>&nbsp;/ {stats?.totalCredits ?? 5000}</span>
            </p>
            <div className="w-full h-1.5 rounded-full my-4" style={{ background: "rgba(255,255,255,0.07)" }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${Math.round(((stats?.usedCredits ?? 1240) / (stats?.totalCredits ?? 5000)) * 100)}%`, background: "linear-gradient(90deg,#7c5af8,#4f6ef7)" }}
              />
            </div>
            <p className="text-xs" style={{ color: "#666680" }}>{(stats?.totalCredits ?? 5000) - (stats?.usedCredits ?? 1240)} credits remaining</p>
          </div>

          {/* Card 2 — Active Seats */}
          <div className="rounded-2xl p-6" style={{ background: "#13131a", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-start justify-between mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(20,200,160,0.15)", border: "1px solid rgba(20,200,160,0.25)" }}
              >
                <Users className="w-5 h-5" style={{ color: "#34d9b4" }} />
              </div>
            </div>
            <p className="text-sm mb-2" style={{ color: "#8888a0" }}>Active Seats</p>
            <p className="leading-none mb-1">
              <span className="text-4xl font-bold text-white">{stats?.usedSeats ?? members.length}</span>
              <span className="text-base font-normal ml-1" style={{ color: "#666680" }}>&nbsp;/ {stats?.totalSeats ?? 10}</span>
            </p>
            <div className="w-full h-1.5 rounded-full my-4" style={{ background: "rgba(255,255,255,0.07)" }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${Math.round(((stats?.usedSeats ?? 8) / (stats?.totalSeats ?? 10)) * 100)}%`, background: "linear-gradient(90deg,#4f6ef7,#60a5fa)" }}
              />
            </div>
            <p className="text-xs" style={{ color: "#666680" }}>{(stats?.totalSeats ?? 10) - (stats?.usedSeats ?? 8)} seats available</p>
          </div>

          {/* Card 3 — Research Reports */}
          <div className="rounded-2xl p-6" style={{ background: "#13131a", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-start justify-between mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <FileText className="w-5 h-5" style={{ color: "#9999b0" }} />
              </div>
            </div>
            <p className="text-sm mb-2" style={{ color: "#8888a0" }}>Research Reports</p>
            <p className="leading-none mb-1">
              <span className="text-4xl font-bold text-white">{stats?.totalReports ?? 42}</span>
              <span className="text-base font-normal ml-2" style={{ color: "#666680" }}>generated</span>
            </p>
          </div>
        </div>

        {/* ── Team Members table ── */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "#13131a", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div>
              <h2 className="text-base font-semibold text-white">Team Members</h2>
              <p className="text-xs mt-0.5" style={{ color: "#666680" }}>{members.length} members · {invitations.length} pending invitations</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl" style={{ background: "#0d0d14", border: "1px solid rgba(255,255,255,0.09)" }}>
                <Search className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#555570" }} />
                <input
                  className="bg-transparent outline-none text-sm text-white w-40"
                  placeholder="Search members..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid px-6 py-3" style={{ gridTemplateColumns: "minmax(220px,1fr) 150px 140px 180px 90px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            {["MEMBER", "ROLE", "STATUS", "LAST ACTIVE", "ACTIONS"].map((h) => (
              <span key={h} className="text-[11px] font-semibold tracking-widest" style={{ color: "#444460" }}>{h}</span>
            ))}
          </div>

          {membersLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 text-[#4f6ef7] animate-spin" />
            </div>
          ) : (
            filteredMembers.map((m, i) => (
              <div key={m.id} className="grid px-6 py-5 items-center transition-colors hover:bg-white/[0.025]"
                style={{ gridTemplateColumns: "minmax(220px,1fr) 150px 140px 180px 90px", borderBottom: i < filteredMembers.length - 1 ? "1px solid rgba(255,255,255,0.045)" : "none" }}>
                <div className="flex items-center gap-3.5">
                  <Avatar initials={m.initials} grad={m.avatarGradient} dot={m.status === "Active" ? "#4ade80" : "#f59e0b"} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-white">{m.name}</span>
                      {m.isCurrentUser && <TagPill label="You" />}
                      {m.isBot && <TagPill label="System" />}
                    </div>
                    <p className="text-xs mt-0.5 truncate" style={{ color: "#555570" }}>{m.email}</p>
                  </div>
                </div>
                <RoleBadge role={m.role} />
                <StatusText status={m.status} />
                <span className="text-sm" style={{ color: "#666680" }}>{m.lastActive}</span>
                {!m.isCurrentUser && (
                  <button onClick={() => removeMutation.mutate(m.id)} className="text-xs text-[#f87171] hover:underline">
                    Remove
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        {/* ── Pending Invitations ── */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "#13131a", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-3">
              <h2 className="text-base font-semibold text-white">Pending Invitations</h2>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "rgba(245,158,11,0.16)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.32)" }}>
                {invitations.length} pending
              </span>
            </div>
          </div>

          {invitations.map((inv, i) => (
            <div key={inv.id} className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: i < invitations.length - 1 ? "1px solid rgba(255,255,255,0.045)" : "none" }}>
              <div className="flex items-center gap-3.5">
                <div>
                  <p className="text-sm font-semibold text-white">{inv.email}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#555570" }}>{inv.role} · Invited {new Date(inv.invitedAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-2xl" style={{ background: "#14141a", border: "1px solid rgba(255,255,255,0.1)" }}>
            <h3 className="text-lg font-bold text-white mb-2">Invite Team Member</h3>
            <p className="text-xs text-[#8888a0] mb-5">Send an email invitation to join your workspace.</p>
            <form onSubmit={handleInvite} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-medium text-[#8888a0] mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="colleague@company.com"
                  className="w-full px-4 py-3 rounded-xl text-sm text-white bg-[#0d0d13] border border-white/10 outline-none focus:border-[#4f6ef7]"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#8888a0] mb-1.5">Role</label>
                <select
                  className="w-full px-4 py-3 rounded-xl text-sm text-white bg-[#0d0d13] border border-white/10 outline-none"
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as "Admin" | "Editor" | "Viewer")}
                >
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div className="flex items-center justify-end gap-3 mt-4">
                <button type="button" onClick={() => setShowInviteModal(false)} className="px-4 py-2 text-sm text-[#8888a0] hover:text-white">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={inviteMutation.isPending}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#4f6ef7] hover:brightness-110 flex items-center gap-2"
                >
                  {inviteMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                  Send Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
