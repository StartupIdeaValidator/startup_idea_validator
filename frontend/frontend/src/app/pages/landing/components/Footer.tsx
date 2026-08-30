import RocketIcon from "@/app/components/RocketIcon";

export default function Footer() {
  return (
    <footer
      className="px-10 py-6 flex items-center justify-between"
      style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-[#4f6ef7] flex items-center justify-center text-white">
          <RocketIcon className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-white text-sm tracking-tight">LaunchPilot</span>
      </div>
      <p className="text-xs text-[#555568]">© 2026 LaunchPilot. Validate fast, build smart.</p>
    </footer>
  );
}
