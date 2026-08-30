const steps = [
  { num: "01", title: "Describe Your Idea",      desc: "Use our focused multi-step form to capture your startup concept, target audience, and key assumptions. Takes under 3 minutes." },
  { num: "02", title: "AI Research Pipeline",    desc: "Watch in real-time as our AI analyzes markets, scans competitors, and processes 50+ data sources simultaneously." },
  { num: "03", title: "Explore Your Strategy",   desc: "Dive into your personalized Market Desk, Lean Canvas, and SWOT analysis. Export, share, and iterate." },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="px-6 py-24 max-w-3xl mx-auto w-full">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-white">From idea to insight in 3 steps</h2>
      </div>

      <div className="flex flex-col">
        {steps.map((s, i) => (
          <div key={s.num} className="flex items-start gap-5">
            {/* Left column: number box + connector */}
            <div className="flex flex-col items-center flex-shrink-0">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: "#131929", border: "1px solid rgba(79,110,247,0.2)" }}
              >
                <span className="text-sm font-bold" style={{ color: "#4f6ef7" }}>{s.num}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="w-px flex-1 my-2" style={{ background: "rgba(79,110,247,0.25)", minHeight: "32px" }} />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pt-1 pb-8">
              <h3 className="text-white font-bold text-[17px] mb-1.5">{s.title}</h3>
              <p className="text-[#8888a0] text-sm leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
