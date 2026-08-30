import { useState } from "react";
import { Plus, Activity, CheckCircle2, Clock, TrendingUp, ArrowRight, Loader2 } from "lucide-react";
import { useDashboardOverview } from "@/api/dashboard/dashboard.queries";

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, icon, iconColor }: { label: string; value: string | number; sub: string; icon: React.ReactNode; iconColor: string }) {
  return (
    <div className="rounded-2xl p-5 flex flex-col gap-3" style={{ background: "#14141a", border: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium" style={{ color: "#8888a0" }}>{label}</span>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${iconColor}18`, border: `1px solid ${iconColor}28` }}>
          {icon}
        </div>
      </div>
      <div>
        <p className="text-[2rem] font-bold text-white leading-none mb-1.5">{value}</p>
        <p className="text-xs" style={{ color: "#8888a0" }}>{sub}</p>
      </div>
    </div>
  );
}

// ─── SVG Bar Chart ────────────────────────────────────────────────────────────

function SvgBarChart({ data, hoveredBar, onHover }: { data: { month: string; value: number }[]; hoveredBar: string | null; onHover: (m: string | null) => void }) {
  const W = 600; const H = 200; const padB = 24; const padT = 8;
  const max = Math.max(...data.map((d) => d.value), 1);
  const barW = Math.floor((W / data.length) * 0.55);
  const gap = W / data.length;

  return (
    <svg viewBox={`0 0 ${W} ${H + padB}`} width="100%" style={{ display: "block", overflow: "visible" }}>
      {data.map((d, i) => {
        const bh = Math.max(((d.value / max) * H) - padT, 4);
        const x = gap * i + (gap - barW) / 2;
        const y = H - bh + padT;
        const hovered = hoveredBar === d.month;
        return (
          <g key={`bar-${d.month}`}>
            <rect x={x} y={y} width={barW} height={bh} rx={4} ry={4}
              fill={hovered ? "#6a8eff" : "rgba(79,110,247,0.55)"}
              style={{ cursor: "pointer", transition: "fill 0.1s" }}
              onMouseEnter={() => onHover(d.month)} onMouseLeave={() => onHover(null)} />
            <text x={x + barW / 2} y={H + padB - 4} textAnchor="middle" fontSize={11} fill="#666680">{d.month}</text>
            {hovered && (
              <g>
                <rect x={x - 18} y={y - 32} width={barW + 36} height={24} rx={6} fill="#1e1e2a" stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
                <text x={x + barW / 2} y={y - 14} textAnchor="middle" fontSize={11} fill="white" fontWeight="600">{d.value}</text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ─── Dashboard Home ───────────────────────────────────────────────────────────

export default function DashboardHome() {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);
  const { data: overview, isLoading } = useDashboardOverview();

  const stats = overview?.stats ?? {
    totalResearch: 24,
    activeResearch: 6,
    completedResearch: 18,
    avgValidationScore: 87,
  };

  const activityData = overview?.activityData ?? [
    { month: "Mar", value: 3 }, { month: "Apr", value: 5 }, { month: "May", value: 7 },
    { month: "Jun", value: 4 }, { month: "Jul", value: 9 }, { month: "Aug", value: 6 },
  ];

  const marketSizes = overview?.marketSizes ?? [
    { label: "AI & Machine Learning", value: "$420B", percentage: 35 },
    { label: "FinTech",               value: "$310B", percentage: 26 },
    { label: "HealthTech",            value: "$280B", percentage: 23 },
    { label: "EdTech",                value: "$190B", percentage: 16 },
  ];

  const recentResearch = overview?.recentResearch ?? [];

  return (
    <>
      <header className="flex items-center justify-between px-8 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div>
          <h1 className="text-2xl font-bold text-white leading-none">Dashboard</h1>
          <p className="text-xs mt-1.5" style={{ color: "#8888a0" }}>
            {new Date().toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "short", year: "numeric" })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-150 hover:brightness-110 active:scale-95"
            style={{ background: "linear-gradient(135deg,#5a78f8 0%,#4060e8 100%)", boxShadow: "0 4px 16px rgba(79,110,247,0.35)" }}>
            <Plus className="w-4 h-4" /> New Research
          </button>
        </div>
      </header>

      <div className="flex-1 px-8 py-6 flex flex-col gap-5">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#4f6ef7] animate-spin" />
          </div>
        ) : (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-4 gap-4">
              <StatCard label="Total Projects"    value={stats.totalResearch} sub={`Active: ${stats.activeResearch}`} iconColor="#4f6ef7" icon={<Activity className="w-3.5 h-3.5" style={{ color: "#4f6ef7" }} />} />
              <StatCard label="Completed"         value={stats.completedResearch} sub={`${Math.round((stats.completedResearch / Math.max(stats.totalResearch, 1)) * 100)}% completion rate`} iconColor="#22c55e" icon={<CheckCircle2 className="w-3.5 h-3.5" style={{ color: "#22c55e" }} />} />
              <StatCard label="In Progress"       value={stats.activeResearch} sub="Active pipelines" iconColor="#f59e0b" icon={<Clock className="w-3.5 h-3.5" style={{ color: "#f59e0b" }} />} />
              <StatCard label="Avg. Market Score" value={stats.avgValidationScore} sub="↑ 7pts vs last month" iconColor="#22c55e" icon={<TrendingUp className="w-3.5 h-3.5" style={{ color: "#22c55e" }} />} />
            </div>

            {/* Charts row */}
            <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 320px" }}>
              <div className="rounded-2xl p-6" style={{ background: "#14141a", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h3 className="text-base font-semibold text-white">Research Activity</h3>
                    <p className="text-xs mt-0.5" style={{ color: "#8888a0" }}>Validation projects created over time</p>
                  </div>
                  <span className="text-xs font-medium px-3 py-1.5 rounded-lg" style={{ background: "#1e1e28", border: "1px solid rgba(255,255,255,0.08)", color: "#8888a0" }}>2025</span>
                </div>
                <SvgBarChart data={activityData} hoveredBar={hoveredBar} onHover={setHoveredBar} />
              </div>

              <div className="rounded-2xl p-6" style={{ background: "#14141a", border: "1px solid rgba(255,255,255,0.07)" }}>
                <h3 className="text-base font-semibold text-white mb-5">Market Sizes Tracked</h3>
                <div className="flex flex-col gap-5">
                  {marketSizes.map((m) => (
                    <div key={m.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm" style={{ color: "#ccccdd" }}>{m.label}</span>
                        <span className="text-sm font-semibold text-white">{m.value}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
                        <div className="h-full rounded-full" style={{ width: `${m.percentage}%`, background: "linear-gradient(90deg,#4f6ef7,#6a8eff)" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Research */}
            <div className="rounded-2xl overflow-hidden" style={{ background: "#14141a", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <h3 className="text-base font-semibold text-white">Recent Research</h3>
                <button className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-[#7a9bff]" style={{ color: "#4f6ef7" }}>
                  View all <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid px-6 py-3" style={{ gridTemplateColumns: "1fr 120px 160px 180px 120px 130px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                {["Project Name", "Market Size", "Status", "Score", "Date", ""].map((h, i) => (
                  <span key={i} className="text-xs font-medium" style={{ color: "#555570" }}>{h}</span>
                ))}
              </div>
              {recentResearch.map((row, i) => (
                <div key={row.id} className="grid px-6 py-4 items-center hover:bg-white/[0.02] transition-colors"
                  style={{ gridTemplateColumns: "1fr 120px 160px 180px 120px 130px", borderBottom: i < recentResearch.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                  <span className="text-sm font-medium text-white">{row.name}</span>
                  <span className="text-sm font-semibold text-white">{row.marketSize}</span>
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium capitalize"
                      style={row.status === "complete"
                        ? { background: "rgba(34,197,94,0.12)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.2)" }
                        : row.status === "processing"
                        ? { background: "rgba(79,110,247,0.12)", color: "#7a9bff", border: "1px solid rgba(79,110,247,0.22)" }
                        : { background: "rgba(239,68,68,0.12)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }
                      }>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: row.status === "complete" ? "#4ade80" : row.status === "processing" ? "#4f6ef7" : "#f87171" }} />
                      {row.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {row.score !== null ? (
                      <>
                        <div className="w-20 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
                          <div className="h-full rounded-full" style={{ width: `${row.score}%`, background: "linear-gradient(90deg,#22c55e,#4ade80)" }} />
                        </div>
                        <span className="text-sm font-medium text-white">{row.score}</span>
                      </>
                    ) : <span className="text-sm" style={{ color: "#555570" }}>—</span>}
                  </div>
                  <span className="text-xs" style={{ color: "#8888a0" }}>{row.date}</span>
                  <button className="flex items-center gap-1 text-xs font-medium transition-colors hover:text-[#7a9bff]" style={{ color: "#4f6ef7" }}>
                    View Results <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
