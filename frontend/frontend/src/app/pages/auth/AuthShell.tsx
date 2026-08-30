import RocketIcon from "@/app/components/RocketIcon";

interface AuthShellProps {
  onGoLanding: () => void;
  children: React.ReactNode;
}

export default function AuthShell({ onGoLanding, children }: AuthShellProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0a0a0e", fontFamily: "'Inter', sans-serif" }}>
      {/* Navbar */}
      <nav
        className="flex items-center justify-between px-10 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(10,10,14,0.85)", backdropFilter: "blur(16px)" }}
      >
        <button onClick={onGoLanding} className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#4f6ef7] flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
            <RocketIcon className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-bold text-white text-[15px] tracking-tight">LaunchPilot</span>
        </button>
      </nav>

      {/* Body */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 relative overflow-hidden">
        {/* Radial glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "0", left: "50%", transform: "translateX(-50%)",
            width: "700px", height: "400px",
            background: "radial-gradient(ellipse 60% 55% at 50% 20%, rgba(79,110,247,0.18) 0%, rgba(60,80,200,0.07) 50%, transparent 75%)",
            filter: "blur(4px)",
          }}
        />
        <div className="relative z-10 w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
