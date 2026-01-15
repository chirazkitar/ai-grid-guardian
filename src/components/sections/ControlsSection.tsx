import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Chip } from "@/components/ui/Chip";
import type { SiteData } from "@/data/mockData";
import { Sliders, Thermometer, Save } from "lucide-react";

interface ControlsSectionProps {
  data: SiteData;
  onToast: (msg: string) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function ControlsSection({ data, onToast }: ControlsSectionProps) {
  const getConstraint = (name: string, priority: string) => {
    if (name.includes("HVAC")) return "22–25°C";
    if (name.includes("Refrigeration")) return "Safe band";
    if (priority === "Critical") return "Never shed";
    return "Shift allowed";
  };

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-12 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Load Priority Control */}
      <GlassPanel variants={item} className="lg:col-span-7">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
            <Sliders className="w-4 h-4 text-primary" />
          </div>
          <h3 className="text-sm font-medium">Load Priority Control</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          Set priorities and boundaries (comfort/critical loads).
        </p>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Load</th>
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Priority</th>
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">AI Mode</th>
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Constraint</th>
            </tr>
          </thead>
          <tbody>
            {data.loads.map((load, i) => (
              <motion.tr
                key={load.name}
                className="border-b border-white/[0.04] last:border-0"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <td className="py-3 px-2 font-medium">{load.name}</td>
                <td className="py-3 px-2">
                  <Chip
                    status={load.priority === 'Critical' ? 'good' : load.priority === 'Flexible' ? 'info' : 'warn'}
                  >
                    {load.priority}
                  </Chip>
                </td>
                <td className="py-3 px-2 text-muted-foreground">{load.mode}</td>
                <td className="py-3 px-2 text-muted-foreground">{getConstraint(load.name, load.priority)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        <div className="h-px bg-white/[0.06] my-4" />
        <p className="text-xs text-muted-foreground">
          Priority meanings: <strong>Critical</strong> = never shed, <strong>Flexible</strong> = shift time, <strong>Non-critical</strong> = optimize aggressively.
        </p>
      </GlassPanel>

      {/* Comfort Boundaries */}
      <GlassPanel variants={item} className="lg:col-span-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center">
            <Thermometer className="w-4 h-4 text-accent" />
          </div>
          <h3 className="text-sm font-medium">Comfort Boundaries</h3>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
            <span className="text-sm text-muted-foreground">Min temp (office)</span>
            <span className="font-semibold">22°C</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
            <span className="text-sm text-muted-foreground">Max temp (office)</span>
            <span className="font-semibold">25°C</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
            <span className="text-sm text-muted-foreground">Lighting minimum</span>
            <span className="font-semibold">70%</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-muted-foreground">Critical uptime</span>
            <span className="font-semibold">99.9%</span>
          </div>
        </div>

        <div className="h-px bg-white/[0.06] my-4" />

        <motion.button
          onClick={() => onToast('Demo: settings saved')}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-success/15 border border-success/30 text-sm text-success font-medium transition-all hover:bg-success/20"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Save className="w-4 h-4" />
          Save settings
        </motion.button>
      </GlassPanel>
    </motion.div>
  );
}
