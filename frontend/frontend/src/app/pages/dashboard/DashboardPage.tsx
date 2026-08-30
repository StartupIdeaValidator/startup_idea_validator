import { useState } from "react";
import Sidebar, { NavPage } from "./components/Sidebar";
import DashboardHome from "./components/DashboardHome";
import PipelinePage from "./pipeline/PipelinePage";
import MarketDeskPage from "./market-desk/MarketDeskPage";
import TeamPage from "./team/TeamPage";
import AIChatPage from "./ai-chat/AIChatPage";
import NewResearchPage from "./new-research/NewResearchPage";
import SettingsPage from "./settings/SettingsPage";

interface DashboardPageProps {
  onBack?: () => void;
}

export default function DashboardPage({ onBack }: DashboardPageProps) {
  const [activePage, setActivePage] = useState<NavPage>("dashboard");

  return (
    <div className="min-h-screen flex" style={{ background: "#0a0a0e", fontFamily: "'Inter', sans-serif" }}>
      <Sidebar activePage={activePage} onNavigate={setActivePage} onCollapse={onBack} />
      <div className="flex-1 flex flex-col min-h-screen" style={{ marginLeft: 240 }}>
        {activePage === "pipeline"    && <PipelinePage />}
        {activePage === "marketdesk"  && <MarketDeskPage />}
        {activePage === "team"        && <TeamPage />}
        {activePage === "aichat"      && <AIChatPage />}
        {activePage === "newresearch" && <NewResearchPage />}
        {activePage === "settings"    && <SettingsPage />}
        {activePage === "dashboard"   && <DashboardHome />}
      </div>
    </div>
  );
}
