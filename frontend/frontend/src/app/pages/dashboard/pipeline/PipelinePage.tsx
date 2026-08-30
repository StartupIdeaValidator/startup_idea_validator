import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Circle } from "lucide-react";
import { usePipeline } from "@/api/pipeline/pipeline.queries";

function tagColor(tag: string) {
  switch (tag) {
    case "OK":   return "#4ade80";
    case "DATA": return "#7a9bff";
    case "WARN": return "#f59e0b";
    default:     return "#666680";
  }
}

function textColor(tag: string) {
  switch (tag) {
    case "OK":   return "#4ade80";
    case "DATA": return "#7a9bff";
    case "WARN": return "#f59e0b";
    default:     return "#9999b0";
  }
}

function PhaseIcon({ status }: { status: string }) {
  if (status === "complete" || status === "done") {
    return (
      <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)" }}>
        <CheckCircle2 className="w-4 h-4" style={{ color: "#4ade80" }} />
      </div>
    );
  }
  if (status === "running" || status === "active") {
    return (
      <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(79,110,247,0.15)", border: "1px solid rgba(79,110,247,0.35)" }}>
        <Loader2 className="w-4 h-4 animate-spin" style={{ color: "#7a9bff" }} />
      </div>
    );
  }
  return (
    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
      <Circle className="w-4 h-4" style={{ color: "rgba(255,255,255,0.2)" }} />
    </div>
  );
}

function Cursor() {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setOn((v) => !v), 530);
    return () => clearInterval(t);
  }, []);
  return <span style={{ display: "inline-block", width: 8, height: 14, background: on ? "#7a9bff" : "transparent", verticalAlign: "middle", borderRadius: 1 }} />;
}

export default function PipelinePage() {
  const { data: pipeline, isLoading } = usePipeline("r1");

  const progress = pipeline?.progress ?? 68;
  const phases = pipeline?.phases ?? [];

  // Extract log lines from phases
  const logLines = phases.flatMap((p) =>
    p.logLines.map((line) => ({
      time: "09:41",
      tag: line.startsWith("✓") ? "OK" : line.includes("Crawling") || line.includes("Scanning") ? "DATA" : "INFO",
      text: line,
    }))
  );

  return (
    <div className="flex-1 flex flex-col min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      <header className="flex items-center justify-between px-8 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="flex items-center gap-1.5 text-sm" style={{ color: "#8888a0" }}>
          <span className="hover:text-white cursor-pointer transition-colors">Projects</span>
          <span>/</span>
          <span className="hover:text-white cursor-pointer transition-colors">AI Writing Assistant</span>
          <span>/</span>
          <span className="text-white font-medium">Research Pipeline</span>
        </div>
        <span className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
          style={{ background: "rgba(79,110,247,0.12)", color: "#7a9bff", border: "1px solid rgba(79,110,247,0.25)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#4f6ef7]" /> {pipeline?.overallStatus ?? "Running"}
        </span>
      </header>

      <div className="flex-1 px-8 py-6 flex flex-col gap-5">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-bold text-white">Research Pipeline — AI Writing Assistant</h1>
            <span className="text-2xl font-bold" style={{ color: "#4f6ef7" }}>{progress}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${progress}%`, background: "linear-gradient(90deg,#4f6ef7,#6a8eff)" }} />
          </div>
        </div>

        <div className="flex gap-5 flex-1" style={{ minHeight: 0 }}>
          {/* Log terminal */}
          <div className="flex-1 rounded-2xl overflow-hidden flex flex-col" style={{ background: "#0f0f16", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="flex items-center gap-2">
                <span style={{ color: "#4f6ef7", fontFamily: "monospace", fontSize: 13 }}>{">"}_</span>
                <span className="text-sm font-medium text-white" style={{ fontFamily: "monospace" }}>AI Research Log (Live Polling)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-1" style={{ fontFamily: "'Courier New', Courier, monospace" }}>
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 text-[#4f6ef7] animate-spin" />
                </div>
              ) : (
                logLines.map((line, i) => (
                  <div key={i} className="flex items-start gap-2 text-[12.5px] leading-5">
                    <span style={{ color: "#444458", flexShrink: 0 }}>{line.time}</span>
                    <span className="font-bold flex-shrink-0" style={{ color: tagColor(line.tag), minWidth: 38 }}>[{line.tag}]</span>
                    <span style={{ color: textColor(line.tag) }}>{line.text}</span>
                  </div>
                ))
              )}
              <div className="flex items-center gap-2 text-[12.5px] leading-5 mt-1">
                <span style={{ color: "#444458" }}>—</span>
                <Cursor />
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="flex flex-col gap-4" style={{ width: 340 }}>
            <div className="rounded-2xl overflow-hidden flex-1" style={{ background: "#14141a", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <h3 className="text-base font-semibold text-white">Research Phases</h3>
              </div>
              <div className="flex flex-col divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                {phases.map((phase) => (
                  <div key={phase.id} className="flex items-center gap-4 px-5 py-4"
                    style={phase.status === "running" ? { background: "rgba(79,110,247,0.06)" } : undefined}>
                    <PhaseIcon status={phase.status} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold leading-none mb-1 capitalize"
                        style={{ color: phase.status === "running" ? "#7a9bff" : phase.status === "complete" ? "#ffffff" : "rgba(255,255,255,0.35)" }}>
                        {phase.label}
                      </p>
                      <p className="text-xs capitalize" style={{ color: phase.status === "pending" ? "rgba(255,255,255,0.2)" : "#8888a0" }}>Status: {phase.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
