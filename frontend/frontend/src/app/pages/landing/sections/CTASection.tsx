import { ArrowRight } from "lucide-react";
import RocketIcon from "@/app/components/RocketIcon";

interface CTASectionProps {
  onGetStarted: () => void;
}

export default function CTASection({ onGetStarted }: CTASectionProps) {
  return (
    <section className="px-6 pb-24 max-w-5xl mx-auto w-full">
      <div
        className="rounded-3xl p-16 flex flex-col items-center text-center"
        style={{ background: "#17171c", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8"
          style={{ background: "rgba(79,110,247,0.15)", border: "1px solid rgba(79,110,247,0.25)" }}
        >
          <RocketIcon className="w-8 h-8" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">Ready to validate your next idea?</h2>
        <p className="text-[#8888a0] text-base mb-10">Join 2,400+ founders who validate before they build.</p>
        <button
          onClick={onGetStarted}
          className="flex items-center gap-2 text-white font-semibold px-9 py-4 rounded-xl text-base transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #5a78f8 0%, #4060e8 100%)",
            boxShadow: "0 4px 28px rgba(79,110,247,0.45)",
          }}
        >
          Start Your Research <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
