import { motion } from "framer-motion";
import { Chip } from "./ui/Chip";
import { StatusDot } from "./ui/StatusDot";
import { navItems, type SiteKey } from "@/data/mockData";

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  selectedSite: SiteKey;
  onSiteChange: (site: SiteKey) => void;
}

export function Sidebar({ activeSection, onNavigate, selectedSite, onSiteChange }: SidebarProps) {
  return (
    <aside className="w-72 border-r border-white/[0.06] bg-gradient-to-b from-card/90 to-card/85 backdrop-blur-xl sticky top-0 h-screen overflow-auto scrollbar-thin">
      <div className="p-5">
        {/* Brand */}
        <div className="flex items-center gap-3 px-2 pb-5">
          <motion.div
            className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary via-accent to-warning shadow-lg glow-primary"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <div>
            <h1 className="text-sm font-semibold tracking-tight">AI Grid Optimizer</h1>
            <p className="text-xs text-muted-foreground">Energy control + verified savings</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 mt-2">
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 flex items-center justify-between group ${
                activeSection === item.id
                  ? 'bg-primary/15 border border-primary/30 text-foreground'
                  : 'border border-transparent text-muted-foreground hover:bg-white/[0.04] hover:text-foreground'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{item.label}</span>
              <Chip
                className={`text-[10px] px-2 py-0.5 ${
                  activeSection === item.id ? 'bg-primary/20 text-primary' : ''
                }`}
              >
                {item.badge}
              </Chip>
            </motion.button>
          ))}
        </nav>

        {/* Site Selection Card */}
        <motion.div
          className="mt-6 p-4 rounded-xl bg-card/50 border border-white/[0.06]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-xs text-muted-foreground mb-2">
            <span className="font-medium text-foreground">Site selection</span>
            <br />Switch between a home or building.
          </p>
          <select
            value={selectedSite}
            onChange={(e) => onSiteChange(e.target.value as SiteKey)}
            className="w-full mt-2 bg-white/[0.04] text-foreground border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary/50 transition-colors cursor-pointer"
          >
            <option value="home">Home — Villa (Residential)</option>
            <option value="office">Office — 3 Floors (Commercial)</option>
            <option value="retail">Retail — 2 Stores (Portfolio)</option>
          </select>

          <div className="h-px bg-white/[0.06] my-4" />

          <div className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground block mb-2">Status</span>
            <div className="flex gap-2 flex-wrap">
              <Chip status="good">AI Active</Chip>
              <Chip status="info">Secure</Chip>
            </div>
          </div>
        </motion.div>

        {/* Tip Card */}
        <motion.div
          className="mt-4 p-4 rounded-xl bg-card/30 border border-white/[0.04]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Tip</span>
            <br />
            This is a demo UI. Replace the mock data with your real API.
          </p>
        </motion.div>
      </div>
    </aside>
  );
}
