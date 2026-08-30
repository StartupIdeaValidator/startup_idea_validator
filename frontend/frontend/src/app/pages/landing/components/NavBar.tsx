import { ChevronRight } from "lucide-react";
import RocketIcon from "@/app/components/RocketIcon";

interface NavBarProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

export default function NavBar({ onGetStarted, onSignIn }: NavBarProps) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-4"
      style={{
        background: "rgba(10,10,14,0.80)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-[#4f6ef7] flex items-center justify-center shadow-lg shadow-blue-500/30 text-white">
          <RocketIcon className="w-4.5 h-4.5 text-white" />
        </div>
        <span className="font-bold text-white text-[15px] tracking-tight">LaunchPilot</span>
      </div>

      <div className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {["Features", "How it Works", "Pricing"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/ /g, "-")}`}
            className="text-sm text-[#9999b0] hover:text-white transition-colors duration-150"
          >
            {item}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onSignIn}
          className="text-sm text-[#9999b0] hover:text-white transition-colors duration-150 px-3 py-1.5"
        >
          Sign In
        </button>
        <button
          onClick={onGetStarted}
          className="flex items-center gap-1.5 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-150 hover:brightness-110 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #5a78f8 0%, #4060e8 100%)",
            boxShadow: "0 0 16px rgba(79,110,247,0.35)",
          }}
        >
          Get Started
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </nav>
  );
}
