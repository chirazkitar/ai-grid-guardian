import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { Toast } from "@/components/Toast";
import { OverviewSection } from "@/components/sections/OverviewSection";
import { SavingsSection } from "@/components/sections/SavingsSection";
import { ControlsSection } from "@/components/sections/ControlsSection";
import { PeaksSection } from "@/components/sections/PeaksSection";
import { AnomaliesSection } from "@/components/sections/AnomaliesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ReportsSection } from "@/components/sections/ReportsSection";
import { CoachSection } from "@/components/sections/CoachSection";
import { mockState, sectionTitles, type SiteKey, type SiteData } from "@/data/mockData";

const Index = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedSite, setSelectedSite] = useState<SiteKey>('home');
  const [siteData, setSiteData] = useState<SiteData>(mockState.home);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setSiteData({ ...mockState[selectedSite] });
  }, [selectedSite]);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2400);
  }, []);

  const handleSimulate = useCallback(() => {
    setSiteData(prev => {
      const jitter = (Math.random() - 0.5) * 1.2;
      const newPower = Math.max(0.5, prev.powerKw + jitter);
      const newPeakToday = Math.max(prev.peakTodayKw, newPower + Math.random() * 0.6);
      const costJitter = Math.max(0, (Math.random() - 0.35) * 4);
      const savedJitter = Math.max(0, (Math.random() - 0.35) * 1.8);

      const loadIdx = Math.floor(Math.random() * prev.loads.length);
      const newLoads = prev.loads.map((load, i) =>
        i === loadIdx
          ? { ...load, kw: Math.max(0.1, load.kw + (Math.random() - 0.5) * 0.8) }
          : load
      );

      return {
        ...prev,
        powerKw: newPower,
        peakTodayKw: newPeakToday,
        todayCost: Math.max(0, prev.todayCost + costJitter),
        todaySaved: Math.max(0, prev.todaySaved + savedJitter),
        loads: newLoads,
      };
    });
    setLastUpdate(new Date());
    showToast("Simulated 1 hour of operation");
  }, [showToast]);

  const handleExport = useCallback(() => {
    showToast("Demo: exported report (use print-to-PDF or server PDF)");
  }, [showToast]);

  const handleSiteChange = useCallback((site: SiteKey) => {
    setSelectedSite(site);
    showToast(`Switched to: ${mockState[site].name}`);
  }, [showToast]);

  const [title, subtitle] = sectionTitles[activeSection] || ["", ""];

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection data={siteData} />;
      case 'savings':
        return <SavingsSection data={siteData} />;
      case 'controls':
        return <ControlsSection data={siteData} onToast={showToast} />;
      case 'peaks':
        return <PeaksSection data={siteData} onToast={showToast} />;
      case 'anomalies':
        return <AnomaliesSection data={siteData} />;
      case 'portfolio':
        return <PortfolioSection currentSite={selectedSite} />;
      case 'reports':
        return <ReportsSection onToast={showToast} />;
      case 'coach':
        return <CoachSection data={siteData} />;
      default:
        return <OverviewSection data={siteData} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Gradient background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_1200px_800px_at_20%_0%,hsl(222_60%_12%)_0%,transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_800px_600px_at_80%_100%,hsl(187_40%_8%)_0%,transparent_50%)] pointer-events-none" />

      <Sidebar
        activeSection={activeSection}
        onNavigate={setActiveSection}
        selectedSite={selectedSite}
        onSiteChange={handleSiteChange}
      />

      <main className="flex-1 p-6 relative z-10 overflow-auto">
        <TopBar
          title={title}
          subtitle={subtitle}
          lastUpdate={lastUpdate}
          onSimulate={handleSimulate}
          onExport={handleExport}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
};

export default Index;
