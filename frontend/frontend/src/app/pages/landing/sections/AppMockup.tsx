const bars = [22, 28, 32, 36, 40, 44, 50, 58, 66, 74, 83, 92];

export default function AppMockup() {
  return (
    <section className="px-6 pb-28 max-w-4xl mx-auto w-full">
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: "1px solid rgba(255,255,255,0.09)", background: "#14141a" }}
      >
        {/* Browser chrome */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{ background: "#0f0f15", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          <div
            className="flex-1 mx-4 rounded-md px-3 py-1 text-xs text-[#555568]"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            app.launchpilot.ai/research/spark-ai/results
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="p-5 flex gap-4">
          <div className="flex-1 rounded-xl p-5" style={{ background: "#0d0d13", border: "1px solid rgba(255,255,255,0.07)" }}>
            <p className="text-[11px] text-[#7777a0] mb-1">Total Addressable Market</p>
            <p className="text-3xl font-bold text-white mb-0.5">$47.2B</p>
            <p className="text-[11px] text-[#4f6ef7] mb-5">↑ 23.4% CAGR</p>
            <div className="flex items-end gap-1.5 h-16">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{ height: `${h}%`, background: i >= 7 ? "#4f6ef7" : "rgba(79,110,247,0.22)" }}
                />
              ))}
            </div>
          </div>
          <div className="w-52 rounded-xl p-5" style={{ background: "#0d0d13", border: "1px solid rgba(255,255,255,0.07)" }}>
            <p className="text-[11px] text-[#7777a0] mb-3">Research Status</p>
            <div className="flex flex-col gap-2.5">
              {["Market Analysis", "Competitor Scan", "SWOT Generation", "Lean Canvas"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4f6ef7]" />
                  <span className="text-xs text-[#c5c5dd]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
