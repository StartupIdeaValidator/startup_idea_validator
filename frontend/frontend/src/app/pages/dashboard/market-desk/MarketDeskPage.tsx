import { useState } from "react";
import { TrendingUp, Target, AlertTriangle, ChevronUp, ChevronDown, Share2, Download, Zap, Shield } from "lucide-react";

type Tab = "market" | "canvas" | "swot" | "competitors";

// ─── Page Header ──────────────────────────────────────────────────────────────

function PageHeader() {
  return (
    <header className="flex items-center justify-between px-8 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
      <div>
        <div className="flex items-center gap-1.5 text-sm mb-1" style={{ color: "#8888a0" }}>
          <span>Projects</span><span>/</span>
          <span className="text-white">Spark AI — Strategy Workbench</span>
        </div>
        <h1 className="text-2xl font-bold text-white">Strategy Workbench</h1>
      </div>
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
          style={{ background: "rgba(34,197,94,0.12)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.25)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" /> Complete
        </span>
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-white transition-colors hover:bg-white/10" style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
          <Share2 className="w-3.5 h-3.5" /> Share
        </button>
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-white transition-colors hover:bg-white/10" style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
          <Download className="w-3.5 h-3.5" /> Export
        </button>
      </div>
    </header>
  );
}

// ─── Stat Cards ───────────────────────────────────────────────────────────────

function StatCards() {
  return (
    <div className="grid grid-cols-4 gap-4 px-8 pt-6">
      {[
        { label: "Investor Readiness", value: "87/100", sub: "Top 15% in category",    color: "#4f6ef7" },
        { label: "Market Opportunity", value: "High",   sub: "TAM: $187B",              color: "#4ade80" },
        { label: "Competition Risk",   value: "Medium", sub: "11 direct competitors",  color: "#f59e0b" },
        { label: "Overall Confidence", value: "91%",    sub: "Based on 50+ sources",   color: "#4f6ef7" },
      ].map((s) => (
        <div key={s.label} className="rounded-2xl p-5" style={{ background: "#14141a", border: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-xs mb-2" style={{ color: "#8888a0" }}>{s.label}</p>
          <p className="text-3xl font-bold mb-1" style={{ color: s.color }}>{s.value}</p>
          <p className="text-xs" style={{ color: "#8888a0" }}>{s.sub}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Tab Bar ─────────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string }[] = [
  { id: "market",      label: "Market Desk"   },
  { id: "canvas",      label: "Lean Canvas"   },
  { id: "swot",        label: "SWOT Analysis" },
  { id: "competitors", label: "Competitors"   },
];

function TabBar({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  return (
    <div className="flex items-center gap-1 px-8 pt-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      {TABS.map((t) => (
        <button key={t.id} onClick={() => onChange(t.id)}
          className="px-4 py-2.5 text-sm font-medium transition-colors relative"
          style={{ color: active === t.id ? "#ffffff" : "#8888a0" }}>
          {t.label}
          {active === t.id && <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ background: "#4f6ef7" }} />}
        </button>
      ))}
    </div>
  );
}

// ─── Tab: Market ─────────────────────────────────────────────────────────────

const growthData = [
  { year: "2020", value: 32 }, { year: "2021", value: 42 }, { year: "2022", value: 52 },
  { year: "2023", value: 65 }, { year: "2024", value: 80 }, { year: "2025", value: 92 }, { year: "2026", value: 100 },
];

function GrowthChart() {
  const [hovered, setHovered] = useState<string | null>(null);
  const W = 440; const H = 180; const padB = 28; const padT = 10; const max = 100; const barW = 38; const gap = W / growthData.length;
  return (
    <svg viewBox={`0 0 ${W} ${H + padB}`} width="100%" style={{ display: "block" }}>
      {growthData.map((d, i) => {
        const bh = ((d.value / max) * (H - padT));
        const x = gap * i + (gap - barW) / 2;
        const y = H - bh + padT;
        const isHov = hovered === d.year;
        return (
          <g key={`gc-${d.year}`}>
            <rect x={x} y={y} width={barW} height={bh} rx={4}
              fill={isHov ? "#6a8eff" : "rgba(79,110,247,0.55)"}
              style={{ cursor: "pointer", transition: "fill 0.1s" }}
              onMouseEnter={() => setHovered(d.year)} onMouseLeave={() => setHovered(null)} />
            <text x={x + barW / 2} y={H + padB - 4} textAnchor="middle" fontSize={10} fill="#666680">{d.year}</text>
          </g>
        );
      })}
    </svg>
  );
}

function MarketBar({ value, max }: { value: number; max: number }) {
  return (
    <div className="w-full h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
      <div className="h-full rounded-full" style={{ width: `${(value / max) * 100}%`, background: "#4f6ef7" }} />
    </div>
  );
}

function TabMarket() {
  return (
    <div className="px-8 py-5 flex flex-col gap-5">
      <div className="grid gap-5" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div className="rounded-2xl p-6" style={{ background: "#14141a", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="text-base font-semibold text-white">Market Size</h3>
              <p className="text-xs mt-0.5" style={{ color: "#8888a0" }}>TAM / SAM / SOM breakdown</p>
            </div>
            <TrendingUp className="w-5 h-5" style={{ color: "#4f6ef7" }} />
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-2xl font-bold text-white">$187.3B</p>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(74,222,128,0.12)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.25)" }}>+23.4% CAGR</span>
              </div>
              <p className="text-xs mb-2" style={{ color: "#8888a0" }}>TAM</p>
              <MarketBar value={100} max={100} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white mb-1">$47.2B</p>
              <p className="text-xs mb-2" style={{ color: "#8888a0" }}>SAM</p>
              <MarketBar value={47.2} max={187.3} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white mb-1">$8.4B</p>
              <p className="text-xs mb-2" style={{ color: "#8888a0" }}>SOM</p>
              <MarketBar value={8.4} max={187.3} />
            </div>
          </div>
        </div>
        <div className="rounded-2xl p-6" style={{ background: "#14141a", border: "1px solid rgba(255,255,255,0.07)" }}>
          <h3 className="text-base font-semibold text-white">Market Growth Projection</h3>
          <p className="text-xs mt-0.5 mb-5" style={{ color: "#8888a0" }}>Enterprise SaaS + AI Tools ($B)</p>
          <GrowthChart />
        </div>
      </div>
      <div className="rounded-2xl p-6" style={{ background: "#14141a", border: "1px solid rgba(255,255,255,0.07)" }}>
        <h3 className="text-base font-semibold text-white mb-4">Key Market Insights</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: <TrendingUp className="w-4 h-4" style={{ color: "#4f6ef7" }} />, iconBg: "rgba(79,110,247,0.12)", iconBorder: "rgba(79,110,247,0.25)", title: "Growth Driver", desc: "AI automation in analytics growing at 34% CAGR. SMB adoption accelerating post-2022." },
            { icon: <Target className="w-4 h-4" style={{ color: "#4ade80" }} />, iconBg: "rgba(74,222,128,0.12)", iconBorder: "rgba(74,222,128,0.25)", title: "Best Entry Point", desc: "Micro-SaaS founders ($10K–$100K ARR) are underserved by enterprise-grade tools. 420K+ globally." },
            { icon: <AlertTriangle className="w-4 h-4" style={{ color: "#f59e0b" }} />, iconBg: "rgba(245,158,11,0.12)", iconBorder: "rgba(245,158,11,0.25)", title: "Risk Factor", desc: "Market concentration: Top 3 players hold 58% of budgets. SMB market more fragmented." },
          ].map((c) => (
            <div key={c.title} className="rounded-xl p-4" style={{ background: "#0d0d13", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: c.iconBg, border: `1px solid ${c.iconBorder}` }}>{c.icon}</div>
              <p className="text-sm font-semibold text-white mb-1.5">{c.title}</p>
              <p className="text-xs leading-relaxed" style={{ color: "#8888a0" }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Canvas ─────────────────────────────────────────────────────────────

const canvasBlocks = [
  { id: "problem",   label: "PROBLEM",           items: ["Founders spend 40+ hrs on research", "Data is fragmented across tools", "No AI-native validation solution"] },
  { id: "customers", label: "CUSTOMER SEGMENTS", items: ["Early-stage SaaS founders", "Pre-seed startup teams", "Product managers at SMBs"] },
  { id: "uvp",       label: "UNIQUE VALUE PROP", items: ["AI-generated market research in 10 minutes", "One platform: Market + Strategy + Competitors", "Export-ready for investors"] },
  { id: "solution",  label: "SOLUTION",          items: ["Automated AI research pipeline", "Strategy workbench (SWOT + Canvas)", "Real-time market intelligence"] },
  { id: "channels",  label: "CHANNELS",          items: ["Product Hunt launch", "Founder communities (Indie Hackers)", "Content marketing + SEO"] },
  { id: "revenue",   label: "REVENUE STREAMS",   items: ["$49/mo Pro subscription", "$199/mo Team plan", "Enterprise custom pricing"] },
  { id: "cost",      label: "COST STRUCTURE",    items: ["AI API costs (~$0.80/report)", "Infrastructure: $2k/mo", "Team: 3 FTEs"] },
  { id: "metrics",   label: "KEY METRICS",       items: ["Reports generated / week", "Conversion: Free → Pro", "NPS score"] },
  { id: "advantage", label: "UNFAIR ADVANTAGE",  items: ["Proprietary data synthesis model", "Faster iteration loop than incumbents", "Built by founder-researchers"] },
];

function TabCanvas() {
  return (
    <div className="px-8 py-5">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white">Lean Canvas</h2>
        <p className="text-sm mt-0.5" style={{ color: "#8888a0" }}>AI-generated business model canvas — click any block to edit</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {canvasBlocks.map((block) => (
          <div key={block.id} className="rounded-2xl p-5 cursor-pointer" style={{ background: "#14141a", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-[10px] font-bold tracking-widest mb-3" style={{ color: "#555570" }}>{block.label}</p>
            <ul className="flex flex-col gap-2">
              {block.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "#ccccdd" }}>
                  <span className="flex-shrink-0 w-1 h-1 rounded-full mt-2" style={{ background: "#4f6ef7" }} />{item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Tab: SWOT ────────────────────────────────────────────────────────────────

const swotSections = [
  { id: "strengths",     label: "Strengths",     count: 3, icon: <Zap className="w-4 h-4" />,           iconColor: "#4ade80", bgColor: "rgba(74,222,128,0.12)",  borderColor: "rgba(74,222,128,0.25)",  items: ["AI-native from the ground up — no legacy architecture", "Faster time-to-insight vs. all direct competitors", "Strong founder-market fit (team has research background)"] },
  { id: "weaknesses",   label: "Weaknesses",    count: 3, icon: <AlertTriangle className="w-4 h-4" />, iconColor: "#f87171", bgColor: "rgba(248,113,113,0.12)", borderColor: "rgba(248,113,113,0.25)", items: ["No brand recognition vs. established players", "Limited data sources in emerging markets", "High dependency on third-party AI APIs"] },
  { id: "opportunities",label: "Opportunities", count: 3, icon: <TrendingUp className="w-4 h-4" />,    iconColor: "#4f6ef7", bgColor: "rgba(79,110,247,0.12)",   borderColor: "rgba(79,110,247,0.25)",  items: ["Micro-SaaS segment largely untapped", "AI adoption curve accelerating globally", "Partnership potential with accelerators and VCs"] },
  { id: "threats",      label: "Threats",       count: 3, icon: <Shield className="w-4 h-4" />,        iconColor: "#f59e0b", bgColor: "rgba(245,158,11,0.12)",   borderColor: "rgba(245,158,11,0.25)",  items: ["CBInsights or Crunchbase could add AI features", "Data provider pricing increases", "Regulatory changes around AI-generated content"] },
];

function TabSwot() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ strengths: true });
  return (
    <div className="px-8 py-5">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white">SWOT Analysis</h2>
        <p className="text-sm mt-0.5" style={{ color: "#8888a0" }}>AI-generated strategic assessment with 91% confidence score</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {swotSections.map((s) => {
          const open = expanded[s.id];
          return (
            <div key={s.id} className="rounded-2xl overflow-hidden" style={{ background: "#14141a", border: "1px solid rgba(255,255,255,0.07)" }}>
              <button className="w-full flex items-center justify-between px-5 py-4 transition-colors hover:bg-white/[0.02]"
                onClick={() => setExpanded((prev) => ({ ...prev, [s.id]: !prev[s.id] }))}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: s.bgColor, border: `1px solid ${s.borderColor}`, color: s.iconColor }}>{s.icon}</div>
                  <span className="text-base font-semibold text-white">{s.label}</span>
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: s.bgColor, color: s.iconColor }}>{s.count}</span>
                </div>
                {open ? <ChevronUp className="w-4 h-4" style={{ color: "#8888a0" }} /> : <ChevronDown className="w-4 h-4" style={{ color: "#8888a0" }} />}
              </button>
              {open && (
                <div className="px-5 pb-4 flex flex-col gap-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  {s.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: "#0d0d13", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <span className="text-xs font-bold flex-shrink-0 mt-0.5" style={{ color: s.iconColor }}>{String(idx + 1).padStart(2, "0")}</span>
                      <span className="text-sm" style={{ color: "#ccccdd" }}>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Tab: Competitors ─────────────────────────────────────────────────────────

const competitors = [
  { name: "CBInsights",       positioning: "Enterprise Intelligence", score: 82, funding: "$108M",  threat: "high"   },
  { name: "Crunchbase Pro",   positioning: "Startup Data Platform",   score: 76, funding: "$56M",   threat: "high"   },
  { name: "Gartner Peer",     positioning: "Analyst Research",        score: 68, funding: "Public", threat: "medium" },
  { name: "Semrush .Trends",  positioning: "Market Intelligence",     score: 71, funding: "Public", threat: "medium" },
  { name: "Exploding Topics", positioning: "Trend Discovery",         score: 59, funding: "$14M",   threat: "low"    },
];

function ThreatBadge({ level }: { level: string }) {
  const styles: Record<string, { bg: string; color: string; border: string }> = {
    high:   { bg: "rgba(248,113,113,0.12)", color: "#f87171", border: "rgba(248,113,113,0.3)" },
    medium: { bg: "rgba(245,158,11,0.12)",  color: "#f59e0b", border: "rgba(245,158,11,0.3)"  },
    low:    { bg: "rgba(74,222,128,0.12)",  color: "#4ade80", border: "rgba(74,222,128,0.3)"  },
  };
  const s = styles[level];
  return <span className="px-3 py-1 rounded-full text-xs font-medium capitalize" style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>{level}</span>;
}

function TabCompetitors() {
  const colors: Record<string, string> = { high: "#f87171", medium: "#f59e0b", low: "#4ade80" };
  return (
    <div className="px-8 py-5">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white">Competitive Landscape</h2>
        <p className="text-sm mt-0.5" style={{ color: "#8888a0" }}>11 competitors identified — showing top 5 by relevance score</p>
      </div>
      <div className="rounded-2xl overflow-hidden" style={{ background: "#14141a", border: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="grid px-6 py-3" style={{ gridTemplateColumns: "1.5fr 1.2fr 1.2fr 0.8fr 0.8fr", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          {["Company", "Positioning", "Relevance Score", "Funding", "Threat Level"].map((h, i) => (
            <span key={i} className="text-xs font-medium" style={{ color: "#555570" }}>{h}</span>
          ))}
        </div>
        {competitors.map((c, i) => (
          <div key={c.name} className="grid px-6 py-4 items-center hover:bg-white/[0.02] transition-colors"
            style={{ gridTemplateColumns: "1.5fr 1.2fr 1.2fr 0.8fr 0.8fr", borderBottom: i < competitors.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
            <span className="text-sm font-semibold text-white">{c.name}</span>
            <span className="text-sm" style={{ color: "#9999b0" }}>{c.positioning}</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
                <div className="h-full rounded-full" style={{ width: `${c.score}%`, background: "linear-gradient(90deg,#4f6ef7,#6a8eff)" }} />
              </div>
              <span className="text-sm font-semibold" style={{ color: "#7a9bff" }}>{c.score}</span>
            </div>
            <span className="text-sm" style={{ color: "#9999b0" }}>{c.funding}</span>
            <ThreatBadge level={c.threat} />
          </div>
        ))}
      </div>
      <div className="rounded-2xl p-6 mt-4" style={{ background: "#14141a", border: "1px solid rgba(255,255,255,0.07)" }}>
        <h3 className="text-base font-semibold text-white mb-5">Positioning Matrix — Score vs. Threat</h3>
        <div className="flex flex-col gap-3">
          {competitors.map((c) => (
            <div key={c.name} className="flex items-center gap-4">
              <span className="text-xs w-32 text-right flex-shrink-0" style={{ color: "#8888a0" }}>{c.name}</span>
              <div className="flex-1 h-7 rounded-lg overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                <div className="h-full rounded-lg transition-all duration-500" style={{ width: `${(c.score / 100) * 100}%`, background: colors[c.threat], opacity: 0.75 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function MarketDeskPage() {
  const [tab, setTab] = useState<Tab>("market");
  return (
    <div className="flex-1 flex flex-col min-h-screen overflow-y-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
      <PageHeader />
      <StatCards />
      <TabBar active={tab} onChange={setTab} />
      {tab === "market"      && <TabMarket />}
      {tab === "canvas"      && <TabCanvas />}
      {tab === "swot"        && <TabSwot />}
      {tab === "competitors" && <TabCompetitors />}
    </div>
  );
}
