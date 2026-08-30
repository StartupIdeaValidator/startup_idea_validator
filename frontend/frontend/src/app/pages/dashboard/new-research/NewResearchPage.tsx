import { useState } from "react";
import {
  ArrowRight, ChevronLeft, ChevronRight, Check, X,
  Rocket, Search, Filter, TrendingUp, CheckCircle2,
  Loader2, BarChart2, Calendar,
} from "lucide-react";
import RocketIcon from "@/app/components/RocketIcon";

// ─── Project data ─────────────────────────────────────────────────────────────

interface Project {
  id: number;
  name: string;
  category: string;
  categoryColor: string;
  status: "complete" | "processing" | "failed";
  marketSize: string;
  score: number | null;
  progress?: number;
  date: string;
}

const initialProjects: Project[] = [
  { id: 1, name: "AI-Powered CRM for SMBs",      category: "B2B SaaS",   categoryColor: "#4f6ef7", status: "complete",   marketSize: "$8.4B",   score: 87,   date: "2 days ago" },
  { id: 2, name: "Green Logistics Platform",      category: "CleanTech",  categoryColor: "#4ade80", status: "processing", marketSize: "$12.1B",  score: null, progress: 40, date: "In progress" },
  { id: 3, name: "SaaS Market Opportunity",       category: "AI / ML",    categoryColor: "#a78bfa", status: "complete",   marketSize: "$187.3B", score: 91,   date: "5 days ago" },
  { id: 4, name: "Competitor Analysis — Design System",   category: "Dev Tools",  categoryColor: "#06b6d4", status: "complete",   marketSize: "$42B",    score: 78,   date: "Yesterday"  },
  { id: 5, name: "GTM Strategy for B2B",          category: "B2B SaaS",   categoryColor: "#4f6ef7", status: "complete",   marketSize: "$24B",    score: 82,   date: "Jun 12"     },
  { id: 6, name: "Pricing Model Research",        category: "FinTech",    categoryColor: "#f59e0b", status: "complete",   marketSize: "$8.9B",   score: 75,   date: "Jun 10"     },
];

// ─── Form types ───────────────────────────────────────────────────────────────

interface FormData {
  startupName: string;
  description: string;
  coreProblem: string;
  targetAudience: string;
  competitors: string;
  startupStage: string;
  industryCategory: string;
  geography: string;
  assumptions: string[];
}

const emptyForm: FormData = {
  startupName: "", description: "", coreProblem: "",
  targetAudience: "", competitors: "", startupStage: "",
  industryCategory: "", geography: "", assumptions: [],
};

// ─── Stepper ──────────────────────────────────────────────────────────────────

const STEPS = ["Idea", "Audience", "Market", "Assumptions", "Launch"];

function Stepper({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {STEPS.map((label, i) => {
        const n = i + 1;
        const done   = n < current;
        const active = n === current;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                style={{
                  background: done ? "#22c55e" : "transparent",
                  border: done ? "2px solid #22c55e" : active ? "2px solid #4f6ef7" : "2px solid rgba(255,255,255,0.18)",
                }}>
                {done
                  ? <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  : <span className="text-xs font-semibold" style={{ color: active ? "#4f6ef7" : "rgba(255,255,255,0.35)" }}>{n}</span>
                }
              </div>
              <span className="text-[11px] font-medium"
                style={{ color: active ? "#4f6ef7" : done ? "#22c55e" : "rgba(255,255,255,0.3)" }}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="w-14 h-px mb-5 mx-1"
                style={{ background: done ? "#22c55e" : "rgba(255,255,255,0.12)" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Shared input primitives ───────────────────────────────────────────────────

const inputCls = "w-full px-4 py-3 rounded-xl text-sm text-white placeholder-[#555570] outline-none transition-all duration-150";
const inputSty = { background: "#0d0d13", border: "1px solid rgba(255,255,255,0.1)" };

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-medium text-white mb-2">
      {children}{required && <span className="text-[#4f6ef7] ml-0.5">*</span>}
    </label>
  );
}

function ToggleBtn({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left"
      style={{
        background: selected ? "rgba(79,110,247,0.18)" : "#0d0d13",
        border: selected ? "1px solid rgba(79,110,247,0.6)" : "1px solid rgba(255,255,255,0.1)",
        color: selected ? "#7a9bff" : "rgba(255,255,255,0.55)",
      }}>
      {label}
    </button>
  );
}

// ─── Steps ────────────────────────────────────────────────────────────────────

function StepIdea({ data, onChange }: { data: FormData; onChange: (d: Partial<FormData>) => void }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-1">Describe your idea</h2>
      <p className="text-sm text-[#8888a0] mb-7">Give us the core concept — better input means better research.</p>
      <div className="flex flex-col gap-5">
        <div>
          <FieldLabel required>Startup Name / Working Title</FieldLabel>
          <input className={inputCls} style={inputSty} placeholder="e.g. Spark AI — AI-powered analytics for SMBs"
            value={data.startupName} onChange={(e) => onChange({ startupName: e.target.value })} />
        </div>
        <div>
          <FieldLabel required>One-line Description</FieldLabel>
          <textarea className={inputCls} style={{ ...inputSty, resize: "none" }} rows={4}
            placeholder="e.g. A SaaS platform that automates market analysis for early-stage founders using AI."
            value={data.description} onChange={(e) => onChange({ description: e.target.value })} />
        </div>
        <div>
          <FieldLabel>Core Problem Being Solved</FieldLabel>
          <textarea className={inputCls} style={{ ...inputSty, resize: "none" }} rows={3}
            placeholder="What pain point does this solve? Why does it exist now?"
            value={data.coreProblem} onChange={(e) => onChange({ coreProblem: e.target.value })} />
        </div>
      </div>
    </div>
  );
}

const STAGES = ["Pre-Idea", "Ideation", "Validation", "MVP Built", "Early Revenue"];

function StepAudience({ data, onChange }: { data: FormData; onChange: (d: Partial<FormData>) => void }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-1">Define your audience</h2>
      <p className="text-sm text-[#8888a0] mb-7">Who experiences this problem most acutely?</p>
      <div className="flex flex-col gap-5">
        <div>
          <FieldLabel required>Primary Target Audience</FieldLabel>
          <input className={inputCls} style={inputSty} placeholder="e.g. Early-stage SaaS founders, 25-40, bootstrapped or pre-seed"
            value={data.targetAudience} onChange={(e) => onChange({ targetAudience: e.target.value })} />
        </div>
        <div>
          <FieldLabel>Current Competitors (optional)</FieldLabel>
          <input className={inputCls} style={inputSty} placeholder="e.g. CBInsights, Crunchbase, Gartner"
            value={data.competitors} onChange={(e) => onChange({ competitors: e.target.value })} />
        </div>
        <div>
          <FieldLabel>Startup Stage</FieldLabel>
          <div className="grid grid-cols-3 gap-2">
            {STAGES.map((s) => (
              <ToggleBtn key={s} label={s} selected={data.startupStage === s} onClick={() => onChange({ startupStage: s })} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const INDUSTRIES = ["B2B SaaS", "B2C App", "Marketplace", "Dev Tools", "FinTech", "HealthTech", "EdTech", "CleanTech", "AI/ML", "Other"];
const GEOGRAPHIES = ["Global", "North America", "Europe", "Asia-Pacific", "Latin America", "Africa & ME"];

function StepMarket({ data, onChange }: { data: FormData; onChange: (d: Partial<FormData>) => void }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-1">Market context</h2>
      <p className="text-sm text-[#8888a0] mb-7">Help our AI focus its research geographically and by sector.</p>
      <div className="flex flex-col gap-6">
        <div>
          <FieldLabel>Industry Category</FieldLabel>
          <div className="grid grid-cols-3 gap-2">
            {INDUSTRIES.map((s) => (
              <ToggleBtn key={s} label={s} selected={data.industryCategory === s} onClick={() => onChange({ industryCategory: s })} />
            ))}
          </div>
        </div>
        <div>
          <FieldLabel>Primary Geography</FieldLabel>
          <div className="grid grid-cols-3 gap-2">
            {GEOGRAPHIES.map((g) => (
              <ToggleBtn key={g} label={g} selected={data.geography === g} onClick={() => onChange({ geography: g })} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepAssumptions({ data, onChange }: { data: FormData; onChange: (d: Partial<FormData>) => void }) {
  const [input, setInput] = useState("");
  function add() {
    const t = input.trim();
    if (!t) return;
    onChange({ assumptions: [...data.assumptions, t] });
    setInput("");
  }
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-1">Key assumptions</h2>
      <p className="text-sm text-[#8888a0] mb-7">What must be true for your idea to succeed? Our AI will validate these.</p>
      <div className="flex flex-col gap-4">
        <div>
          <FieldLabel>Add Assumption</FieldLabel>
          <div className="flex gap-2">
            <input className={inputCls + " flex-1"} style={inputSty}
              placeholder="e.g. SMB founders will pay $50/mo for market research"
              value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && add()} />
            <button onClick={add}
              className="px-5 py-3 rounded-xl text-sm font-semibold text-white flex-shrink-0 transition-all duration-150 hover:brightness-110 active:scale-95"
              style={{ background: "linear-gradient(135deg,#5a78f8 0%,#4060e8 100%)", boxShadow: "0 4px 16px rgba(79,110,247,0.35)" }}>
              Add
            </button>
          </div>
        </div>
        <div className="rounded-xl min-h-[120px] flex flex-col"
          style={{ border: "1px dashed rgba(255,255,255,0.12)", background: "#0d0d13" }}>
          {data.assumptions.length === 0 ? (
            <div className="flex-1 flex items-center justify-center py-10">
              <p className="text-sm text-[#555570] text-center">No assumptions added yet. Add at least one for better research.</p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-white/5">
              {data.assumptions.map((a, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3 gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#4f6ef7]/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#4f6ef7]" strokeWidth={3} />
                    </span>
                    <span className="text-sm text-[#ccccdd]">{a}</span>
                  </div>
                  <button onClick={() => onChange({ assumptions: data.assumptions.filter((_, j) => j !== i) })}
                    className="text-[#555570] hover:text-white transition-colors flex-shrink-0">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const LAUNCH_ITEMS = [
  "Market size analysis (TAM/SAM/SOM)",
  "Competitive landscape mapping",
  "Lean Canvas generation",
  "SWOT analysis",
  "Investor readiness score",
];

function StepLaunch() {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
        style={{ background: "rgba(79,110,247,0.15)", border: "1px solid rgba(79,110,247,0.28)" }}>
        <RocketIcon className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Ready to launch research</h2>
      <p className="text-sm text-[#8888a0] mb-7 max-w-sm">
        Our AI engine will analyze markets, scan competitors, and build your strategy in approximately 8–12 minutes.
      </p>
      <div className="w-full rounded-xl p-5 text-left mb-4"
        style={{ background: "#0d0d13", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'Courier New', monospace" }}>
        <p className="text-[13px] text-[#7a9bff] mb-3"><span className="text-[#555570]">$ </span>research.init --mode full</p>
        {LAUNCH_ITEMS.map((item) => (
          <div key={item} className="flex items-center gap-2.5 mb-2">
            <Check className="w-3.5 h-3.5 text-[#4f6ef7] flex-shrink-0" strokeWidth={3} />
            <span className="text-[13px] text-[#7a9bff]">{item}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-6 text-xs text-[#8888a0]">
        <span>Estimated time: <span className="text-white font-medium">8–12 minutes</span></span>
        <span>Data sources: <span className="text-white font-medium">50+ live databases</span></span>
      </div>
    </div>
  );
}

// ─── Project card ─────────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: Project }) {
  const isComplete   = project.status === "complete";
  const isProcessing = project.status === "processing";

  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-0.5"
      style={{
        background: "#14141a",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <span
          className="text-[10px] font-bold px-2.5 py-1 rounded-full"
          style={{ background: `${project.categoryColor}18`, color: project.categoryColor, border: `1px solid ${project.categoryColor}30` }}
        >
          {project.category}
        </span>
        {isComplete && (
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full"
            style={{ background: "rgba(34,197,94,0.12)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.22)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" /> Complete
          </span>
        )}
        {isProcessing && (
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full"
            style={{ background: "rgba(79,110,247,0.12)", color: "#7a9bff", border: "1px solid rgba(79,110,247,0.22)" }}>
            <Loader2 className="w-2.5 h-2.5 animate-spin" /> Processing
          </span>
        )}
      </div>

      {/* Name */}
      <div>
        <h3 className="text-sm font-bold text-white leading-snug mb-1.5">{project.name}</h3>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: "#8888a0" }}>
          <TrendingUp className="w-3 h-3" />
          <span>{project.marketSize} market</span>
        </div>
      </div>

      {/* Score / Progress */}
      {isComplete && project.score !== null && (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs" style={{ color: "#8888a0" }}>Validation Score</span>
            <span className="text-sm font-bold" style={{ color: project.score >= 80 ? "#4ade80" : project.score >= 60 ? "#f59e0b" : "#f87171" }}>
              {project.score}/100
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
            <div className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${project.score}%`,
                background: project.score >= 80
                  ? "linear-gradient(90deg,#22c55e,#4ade80)"
                  : project.score >= 60
                  ? "linear-gradient(90deg,#f59e0b,#fbbf24)"
                  : "linear-gradient(90deg,#ef4444,#f87171)",
              }} />
          </div>
        </div>
      )}

      {isProcessing && project.progress !== undefined && (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs" style={{ color: "#8888a0" }}>Progress</span>
            <span className="text-sm font-bold" style={{ color: "#7a9bff" }}>{project.progress}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
            <div className="h-full rounded-full" style={{ width: `${project.progress}%`, background: "linear-gradient(90deg,#4f6ef7,#6a8eff)" }} />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-1" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: "#555570" }}>
          <Calendar className="w-3 h-3" />
          {project.date}
        </div>
        <button
          className="flex items-center gap-1 text-xs font-semibold transition-colors hover:text-[#7a9bff]"
          style={{ color: "#4f6ef7" }}
        >
          {isProcessing ? "View Pipeline" : "View Results"}
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function NewResearchPage() {
  const [mode, setMode]       = useState<"list" | "steps">("list");
  const [step, setStep]       = useState(1);
  const [form, setForm]       = useState<FormData>(emptyForm);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [search, setSearch]   = useState("");

  function updateForm(partial: Partial<FormData>) {
    setForm((prev) => ({ ...prev, ...partial }));
  }

  function handleLaunch() {
    const newProject: Project = {
      id: Date.now(),
      name: form.startupName || "New Research Project",
      category: form.industryCategory || "General",
      categoryColor: "#4f6ef7",
      status: "processing",
      marketSize: "—",
      score: null,
      progress: 0,
      date: "Just now",
    };
    setProjects([newProject, ...projects]);
    setMode("list");
    setStep(1);
    setForm(emptyForm);
  }

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  // ── Step flow ──────────────────────────────────────────────────────────────

  if (mode === "steps") {
    return (
      <div className="flex-1 overflow-y-auto" style={{ background: "#0a0a0e" }}>
        {/* Steps header */}
        <div className="flex items-center justify-between px-8 py-4 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <button
            onClick={() => { setMode("list"); setStep(1); setForm(emptyForm); }}
            className="flex items-center gap-2 text-sm transition-colors hover:text-white"
            style={{ color: "#8888a0" }}
          >
            <ChevronLeft className="w-4 h-4" /> Back to Projects
          </button>
          <span className="text-sm font-medium" style={{ color: "#8888a0" }}>Step {step} of 5</span>
          <button
            onClick={() => { setMode("list"); setStep(1); setForm(emptyForm); }}
            className="text-sm transition-colors hover:text-white"
            style={{ color: "#8888a0" }}
          >
            Cancel
          </button>
        </div>

        <div className="flex flex-col items-center px-8 py-10">
          <div className="w-full max-w-xl">
            {/* Glow + stepper */}
            <div className="relative">
              <div className="absolute pointer-events-none"
                style={{
                  top: "-30px", left: "50%", transform: "translateX(-50%)",
                  width: "480px", height: "120px",
                  background: "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(79,110,247,0.2) 0%, transparent 75%)",
                  filter: "blur(10px)",
                }} />
              <Stepper current={step} />
            </div>

            {/* Card */}
            <div className="rounded-2xl p-8 mb-6"
              style={{ background: "#14141a", border: "1px solid rgba(255,255,255,0.08)" }}>
              {step === 1 && <StepIdea data={form} onChange={updateForm} />}
              {step === 2 && <StepAudience data={form} onChange={updateForm} />}
              {step === 3 && <StepMarket data={form} onChange={updateForm} />}
              {step === 4 && <StepAssumptions data={form} onChange={updateForm} />}
              {step === 5 && <StepLaunch />}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => step === 1 ? setMode("list") : setStep((s) => s - 1)}
                className="flex items-center gap-1.5 px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-150 hover:bg-white/10 active:scale-95"
                style={{ border: "1px solid rgba(255,255,255,0.14)" }}
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => step < 5 ? setStep((s) => s + 1) : handleLaunch()}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-150 hover:brightness-110 active:scale-95"
                style={{ background: "linear-gradient(135deg,#5a78f8 0%,#4060e8 100%)", boxShadow: "0 4px 20px rgba(79,110,247,0.4)" }}
              >
                {step === 5
                  ? <><Rocket className="w-4 h-4" /> Launch Research</>
                  : <>Continue <ChevronRight className="w-4 h-4" /></>
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Project list ────────────────────────────────────────────────────────────

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "#0a0a0e" }}>

      {/* Header */}
      <header className="px-8 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <h1 className="text-2xl font-bold text-white leading-none">Research Projects</h1>
        <p className="text-xs mt-1.5" style={{ color: "#8888a0" }}>Manage and launch your startup validations</p>
      </header>

      <div className="px-8 py-6 flex flex-col gap-6">

        {/* Hero CTA card */}
        <div
          className="rounded-2xl p-8 flex items-center justify-between gap-8 relative overflow-hidden"
          style={{ background: "#14141a", border: "1px solid rgba(79,110,247,0.2)" }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 80% at 15% 50%, rgba(79,110,247,0.1) 0%, transparent 70%)" }} />

          <div className="relative z-10 flex items-center gap-6 flex-1">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(79,110,247,0.2)", border: "1px solid rgba(79,110,247,0.35)", boxShadow: "0 0 32px rgba(79,110,247,0.2)" }}>
              <RocketIcon className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-1.5">Ready to validate a new idea?</h2>
              <p className="text-sm leading-relaxed" style={{ color: "#8888a0" }}>
                AI-powered market analysis, competitive intelligence, and investor-ready reports — in minutes.
              </p>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-8 flex-shrink-0">
            {[
              { value: "2,400+", label: "Founders" },
              { value: "~8 min", label: "Avg. Time" },
              { value: "50+",    label: "Data Sources" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-xl font-bold text-white">{s.value}</p>
                <p className="text-xs mt-0.5" style={{ color: "#666680" }}>{s.label}</p>
              </div>
            ))}
            <button
              onClick={() => setMode("steps")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5 active:scale-95"
              style={{ background: "linear-gradient(135deg,#5a78f8 0%,#4060e8 100%)", boxShadow: "0 4px 24px rgba(79,110,247,0.45)" }}
            >
              Start New Research <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Projects section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-base font-semibold text-white">Your Research</h2>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ background: "rgba(79,110,247,0.15)", color: "#7a9bff", border: "1px solid rgba(79,110,247,0.25)" }}>
                {projects.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl"
                style={{ background: "#14141a", border: "1px solid rgba(255,255,255,0.09)" }}>
                <Search className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#555570" }} />
                <input
                  className="bg-transparent outline-none text-sm text-white w-36"
                  placeholder="Search research..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm transition-colors hover:bg-white/10"
                style={{ border: "1px solid rgba(255,255,255,0.09)", color: "#8888a0" }}
              >
                <Filter className="w-3.5 h-3.5" /> Filter
              </button>
            </div>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { icon: <CheckCircle2 className="w-3.5 h-3.5" />, label: "Completed", value: projects.filter((p) => p.status === "complete").length,   color: "#4ade80" },
              { icon: <Loader2      className="w-3.5 h-3.5" />, label: "Processing",value: projects.filter((p) => p.status === "processing").length, color: "#7a9bff" },
              { icon: <BarChart2    className="w-3.5 h-3.5" />, label: "Avg. Score", value: Math.round(projects.filter((p) => p.score).reduce((a, p) => a + (p.score ?? 0), 0) / projects.filter((p) => p.score).length), color: "#f59e0b" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{ background: "#14141a", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${s.color}15`, color: s.color }}>
                  {s.icon}
                </div>
                <div>
                  <p className="text-lg font-bold text-white leading-none">{s.value}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#666680" }}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Cards grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-3 gap-4">
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 rounded-2xl"
              style={{ background: "#14141a", border: "1px dashed rgba(255,255,255,0.1)" }}>
              <Search className="w-8 h-8 mb-3" style={{ color: "#444460" }} />
              <p className="text-sm font-medium text-white mb-1">No results found</p>
              <p className="text-xs" style={{ color: "#555570" }}>Try a different search term</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
