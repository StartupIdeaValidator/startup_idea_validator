import { useState } from "react";
import { ChevronLeft, ChevronRight, Check, X, Rocket } from "lucide-react";
import RocketIcon from "@/app/components/RocketIcon";

// ─── Types ────────────────────────────────────────────────────────────────────

interface OnboardingPageProps {
  onBack: () => void;
  onComplete?: () => void;
}

export interface FormData {
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

// ─── Stepper ──────────────────────────────────────────────────────────────────

const STEPS = ["Idea", "Audience", "Market", "Assumptions", "Launch"];

function Stepper({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {STEPS.map((label, i) => {
        const stepNum = i + 1;
        const completed = stepNum < current;
        const active = stepNum === current;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                style={{
                  background: completed ? "#22c55e" : "transparent",
                  border: completed ? "2px solid #22c55e" : active ? "2px solid #4f6ef7" : "2px solid rgba(255,255,255,0.18)",
                }}
              >
                {completed ? (
                  <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                ) : (
                  <span className="text-xs font-semibold" style={{ color: active ? "#4f6ef7" : "rgba(255,255,255,0.35)" }}>
                    {stepNum}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-medium" style={{ color: active ? "#4f6ef7" : completed ? "#22c55e" : "rgba(255,255,255,0.3)" }}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="w-14 h-px mb-5 mx-1" style={{ background: completed ? "#22c55e" : "rgba(255,255,255,0.12)" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Shared primitives ────────────────────────────────────────────────────────

const inputClass = "w-full px-4 py-3 rounded-xl text-sm text-white placeholder-[#555570] outline-none transition-all duration-150";
const inputStyle = { background: "#0d0d13", border: "1px solid rgba(255,255,255,0.1)" };

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-medium text-white mb-2">
      {children}
      {required && <span className="text-[#4f6ef7] ml-0.5">*</span>}
    </label>
  );
}

function ToggleBtn({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left"
      style={{
        background: selected ? "rgba(79,110,247,0.18)" : "#0d0d13",
        border: selected ? "1px solid rgba(79,110,247,0.6)" : "1px solid rgba(255,255,255,0.1)",
        color: selected ? "#7a9bff" : "rgba(255,255,255,0.55)",
      }}
    >
      {label}
    </button>
  );
}

// ─── Steps ────────────────────────────────────────────────────────────────────

function StepIdea({ data, onChange }: { data: FormData; onChange: (d: Partial<FormData>) => void }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-1">Describe your idea</h2>
      <p className="text-sm text-[#8888a0] mb-7">Give us the core concept. Be specific — better input = better research.</p>
      <div className="flex flex-col gap-5">
        <div>
          <FieldLabel required>Startup Name / Working Title</FieldLabel>
          <input className={inputClass} style={inputStyle} placeholder="e.g. Spark AI — AI-powered analytics for SMBs"
            value={data.startupName} onChange={(e) => onChange({ startupName: e.target.value })} />
        </div>
        <div>
          <FieldLabel required>One-line Description</FieldLabel>
          <textarea className={inputClass} style={{ ...inputStyle, resize: "none" }} rows={4}
            placeholder="e.g. A SaaS platform that automates market analysis for early-stage founders using AI."
            value={data.description} onChange={(e) => onChange({ description: e.target.value })} />
        </div>
        <div>
          <FieldLabel>Core Problem Being Solved</FieldLabel>
          <textarea className={inputClass} style={{ ...inputStyle, resize: "none" }} rows={3}
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
          <input className={inputClass} style={inputStyle} placeholder="e.g. Early-stage SaaS founders, 25-40, bootstrapped or pre-seed"
            value={data.targetAudience} onChange={(e) => onChange({ targetAudience: e.target.value })} />
        </div>
        <div>
          <FieldLabel>Current Competitors (optional)</FieldLabel>
          <input className={inputClass} style={inputStyle} placeholder="e.g. CBInsights, Crunchbase, Gartner"
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

  function addAssumption() {
    const trimmed = input.trim();
    if (!trimmed) return;
    onChange({ assumptions: [...data.assumptions, trimmed] });
    setInput("");
  }

  function removeAssumption(i: number) {
    onChange({ assumptions: data.assumptions.filter((_, idx) => idx !== i) });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-1">Key assumptions</h2>
      <p className="text-sm text-[#8888a0] mb-7">What must be true for your idea to succeed? Our AI will validate these.</p>
      <div className="flex flex-col gap-4">
        <div>
          <FieldLabel>Add Assumption</FieldLabel>
          <div className="flex gap-2">
            <input className={inputClass + " flex-1"} style={inputStyle}
              placeholder="e.g. SMB founders will pay $50/mo for market research"
              value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addAssumption()} />
            <button onClick={addAssumption}
              className="px-5 py-3 rounded-xl text-sm font-semibold text-white flex-shrink-0 transition-all duration-150 hover:brightness-110 active:scale-95"
              style={{ background: "linear-gradient(135deg, #5a78f8 0%, #4060e8 100%)", boxShadow: "0 4px 16px rgba(79,110,247,0.35)" }}>
              Add
            </button>
          </div>
        </div>
        <div className="rounded-xl min-h-[120px] flex flex-col" style={{ border: "1px dashed rgba(255,255,255,0.12)", background: "#0d0d13" }}>
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
                  <button onClick={() => removeAssumption(i)} className="text-[#555570] hover:text-white transition-colors flex-shrink-0">
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
        <p className="text-[13px] text-[#7a9bff] mb-3"><span className="text-[#555570]">$ </span>research.init --name "Your Startup"</p>
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

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function OnboardingPage({ onBack, onComplete }: OnboardingPageProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>({
    startupName: "", description: "", coreProblem: "",
    targetAudience: "", competitors: "", startupStage: "",
    industryCategory: "", geography: "", assumptions: [],
  });

  function updateForm(partial: Partial<FormData>) { setForm((prev) => ({ ...prev, ...partial })); }
  function handleBack() { if (step === 1) onBack(); else setStep((s) => s - 1); }
  function handleContinue() { if (step < 5) setStep((s) => s + 1); else onComplete?.(); }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0a0a0e", fontFamily: "'Inter', sans-serif" }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#4f6ef7] flex items-center justify-center text-white">
            <RocketIcon className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-bold text-white text-[15px] tracking-tight">LaunchPilot</span>
        </div>
        <span className="text-sm text-[#8888a0]">Step {step} of 5</span>
        <button onClick={onBack} className="text-sm text-[#8888a0] hover:text-white transition-colors duration-150">Cancel</button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center px-6 py-10">
        <div className="w-full max-w-lg">
          <div className="relative">
            <div className="absolute pointer-events-none" style={{
              top: "-30px", left: "50%", transform: "translateX(-50%)",
              width: "480px", height: "120px",
              background: "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(79,110,247,0.22) 0%, rgba(60,80,200,0.08) 55%, transparent 80%)",
              filter: "blur(8px)",
            }} />
            <Stepper current={step} />
          </div>

          <div className="rounded-2xl p-8 mb-6" style={{ background: "#14141a", border: "1px solid rgba(255,255,255,0.08)" }}>
            {step === 1 && <StepIdea data={form} onChange={updateForm} />}
            {step === 2 && <StepAudience data={form} onChange={updateForm} />}
            {step === 3 && <StepMarket data={form} onChange={updateForm} />}
            {step === 4 && <StepAssumptions data={form} onChange={updateForm} />}
            {step === 5 && <StepLaunch />}
          </div>

          <div className="flex items-center justify-between">
            <button onClick={handleBack}
              className="flex items-center gap-1.5 px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-150 hover:bg-white/10 active:scale-95"
              style={{ border: "1px solid rgba(255,255,255,0.14)" }}>
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <button onClick={handleContinue}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-150 hover:brightness-110 active:scale-95"
              style={{ background: "linear-gradient(135deg, #5a78f8 0%, #4060e8 100%)", boxShadow: "0 4px 20px rgba(79,110,247,0.4)" }}>
              {step === 5 ? (<><Rocket className="w-4 h-4" /> Launch Research</>) : (<>Continue <ChevronRight className="w-4 h-4" /></>)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
