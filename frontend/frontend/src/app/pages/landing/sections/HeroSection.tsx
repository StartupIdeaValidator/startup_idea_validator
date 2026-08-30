import { ArrowRight, ChevronRight } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative flex flex-col items-center text-center pt-44 pb-16 px-6 w-full overflow-hidden">
      {/* Radial glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "60px", left: "50%", transform: "translateX(-50%)",
          width: "820px", height: "520px",
          background: "radial-gradient(ellipse 60% 55% at 50% 40%, rgba(79,110,247,0.22) 0%, rgba(60,80,200,0.10) 45%, transparent 75%)",
          filter: "blur(2px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "100px", left: "50%", transform: "translateX(-50%)",
          width: "600px", height: "360px",
          background: "radial-gradient(ellipse 55% 50% at 50% 35%, rgba(100,130,255,0.12) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto">
        {/* Badge */}
        <div
          className="flex items-center gap-2 mb-10 px-3.5 py-1.5 rounded-full text-xs text-[#aaaabc]"
          style={{ border: "1px solid rgba(79,110,247,0.35)", background: "rgba(79,110,247,0.08)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#4f6ef7]" />
          <span>Now in Public Beta</span>
          <span className="text-[#444458] mx-0.5">—</span>
          <span>AI-Powered Market Research</span>
        </div>

        {/* Heading */}
        <h1 className="text-[4rem] md:text-[4.5rem] font-extrabold text-white leading-[1.1] mb-2 tracking-tight">
          Validate your startup
        </h1>
        <h1 className="text-[4rem] md:text-[4.5rem] font-extrabold leading-[1.1] mb-7 tracking-tight" style={{ color: "#5b7cfa" }}>
          before you build
        </h1>

        <p className="text-[#8888a0] text-[1.05rem] leading-relaxed max-w-[520px] mb-11">
          LaunchPilot combines AI-powered market analysis, competitive intelligence,
          and strategic frameworks to give founders the insights they need to move
          fast with confidence.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
          <button
            onClick={onGetStarted}
            className="flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #5a78f8 0%, #4060e8 100%)",
              boxShadow: "0 4px 24px rgba(79,110,247,0.45)",
            }}
          >
            Start Researching Free <ArrowRight className="w-4 h-4" />
          </button>
          <button
            className="flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-all duration-200 hover:bg-white/10 hover:-translate-y-0.5 active:scale-95"
            style={{ border: "1px solid rgba(255,255,255,0.18)" }}
          >
            View Live Demo <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-14">
          {[
            { value: "2,400+", label: "Startups Validated" },
            { value: "94%",    label: "Accuracy Rate"      },
            { value: "10min",  label: "Avg. Research Time" },
          ].map((s, i) => (
            <div key={s.label} className="flex items-center gap-14">
              <div className="flex flex-col items-center gap-1">
                <span className="text-[2rem] font-bold text-white leading-none">{s.value}</span>
                <span className="text-xs text-[#8888a0] mt-1">{s.label}</span>
              </div>
              {i < 2 && <div className="w-px h-10 bg-white/10" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
