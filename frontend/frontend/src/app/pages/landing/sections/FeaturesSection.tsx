import { BarChart2, GitBranch, Layers, GitPullRequest, BookOpen, Users } from "lucide-react";

const features = [
  { icon: BarChart2,     title: "Market Intelligence",  desc: "TAM/SAM/SOM breakdowns with live data from 50+ sources. Dynamic bar charts that update as markets evolve." },
  { icon: GitBranch,     title: "Competitive Analysis", desc: "Automated competitor mapping, positioning matrix, and gap identification. Know where you can win." },
  { icon: Layers,        title: "Strategy Workbench",   desc: "AI-generated Lean Canvas and SWOT analysis tailored to your idea. Interactive and editable." },
  { icon: GitPullRequest,title: "Research Pipeline",    desc: "Real-time command-center view of your AI research as it happens. Live log streaming with status updates." },
  { icon: BookOpen,      title: "Investor Readiness",   desc: "One-click export to pitch deck format. Key metrics, risks, and opportunities clearly presented." },
  { icon: Users,         title: "Team Collaboration",   desc: "Share research projects, leave comments, and build strategy together in real-time." },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="px-6 py-24 max-w-5xl mx-auto w-full">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-white mb-4">Everything you need to validate</h2>
        <p className="text-[#8888a0] text-base">From raw idea to investor-ready insights in minutes, not months.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <div
              key={f.title}
              className="rounded-2xl p-6 cursor-default transition-all duration-200"
              style={{ background: "#14141a", border: "1px solid rgba(255,255,255,0.07)" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.border = "1px solid rgba(79,110,247,0.4)";
                el.style.boxShadow = "0 0 28px rgba(79,110,247,0.12)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.border = "1px solid rgba(255,255,255,0.07)";
                el.style.boxShadow = "none";
              }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(79,110,247,0.15)" }}>
                <Icon className="w-5 h-5 text-[#4f6ef7]" />
              </div>
              <h3 className="text-white font-semibold text-[15px] mb-2">{f.title}</h3>
              <p className="text-[#8888a0] text-sm leading-relaxed">{f.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
