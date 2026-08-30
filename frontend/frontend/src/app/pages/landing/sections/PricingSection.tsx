import { useState } from "react";
import { Check } from "lucide-react";

interface PricingSectionProps {
  onGetStarted: () => void;
}

const plans = [
  { name: "Starter",    price: "$0",     period: "/mo", primary: false, features: ["3 Research Projects", "Basic Market Data", "PDF Export", "7-day History"],                                                              cta: "Start Free"        },
  { name: "Pro",        price: "$49",    period: "/mo", primary: true,  features: ["Unlimited Projects", "Real-time Data Sources", "Team Collaboration", "Priority Pipeline", "Custom Reports"],                            cta: "Start Pro Trial"   },
  { name: "Enterprise", price: "Custom", period: "",    primary: false, features: ["Everything in Pro", "Dedicated Research Agent", "API Access", "SSO / SAML", "Custom Integrations"],                                    cta: "Contact Sales"     },
];

export default function PricingSection({ onGetStarted }: PricingSectionProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="pricing" className="px-6 py-24 max-w-5xl mx-auto w-full">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-white mb-4">Simple pricing</h2>
        <p className="text-[#8888a0] text-base">Start free, scale as you grow.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((p) => {
          const isHovered = hovered === p.name;
          return (
            <div
              key={p.name}
              className="rounded-2xl p-6 flex flex-col gap-5 cursor-default transition-all duration-200"
              style={{
                background: "#14141a",
                border: isHovered ? "1px solid rgba(79,110,247,0.55)" : p.primary ? "1px solid rgba(79,110,247,0.3)" : "1px solid rgba(255,255,255,0.07)",
                boxShadow: isHovered ? "0 0 36px rgba(79,110,247,0.2)" : "none",
                transform: isHovered ? "translateY(-3px)" : "none",
              }}
              onMouseEnter={() => setHovered(p.name)}
              onMouseLeave={() => setHovered(null)}
            >
              <div>
                <p className="text-[#9999b0] text-sm font-medium mb-2">{p.name}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-[2.4rem] font-bold text-white leading-none">{p.price}</span>
                  {p.period && <span className="text-[#8888a0] text-sm ml-0.5">{p.period}</span>}
                </div>
              </div>

              <div className="flex flex-col gap-2.5 flex-1">
                {p.features.map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#4f6ef7] flex-shrink-0" />
                    <span className="text-sm text-[#ccccdd]">{f}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={onGetStarted}
                className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95"
                style={
                  isHovered
                    ? { background: "linear-gradient(135deg, #5a78f8 0%, #4060e8 100%)", color: "#fff", boxShadow: "0 4px 20px rgba(79,110,247,0.4)", border: "none" }
                    : { background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.15)" }
                }
              >
                {p.cta}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
