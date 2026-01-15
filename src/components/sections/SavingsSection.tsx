import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Chip } from "@/components/ui/Chip";
import { Delta } from "@/components/ui/Delta";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { SiteData } from "@/data/mockData";
import { TrendingUp, PieChart, Receipt } from "lucide-react";

interface SavingsSectionProps {
  data: SiteData;
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function SavingsSection({ data }: SavingsSectionProps) {
  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-12 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Verified Savings */}
      <GlassPanel variants={item} className="lg:col-span-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-success/15 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-success" />
          </div>
          <h3 className="text-sm font-medium">Verified Savings (M&V)</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          Baseline vs actual consumption using a simple model (demo).
        </p>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="flex items-end justify-between gap-4 mb-4">
              <div>
                <motion.div
                  className="text-3xl font-bold tracking-tight text-success"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  {data.month.savedMoney} <span className="text-lg font-normal">{data.currency}</span>
                </motion.div>
                <p className="text-xs text-muted-foreground mt-1">Verified savings (this month)</p>
              </div>
              <Delta variant="good">{data.month.savedPct}%</Delta>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">kWh saved</span>
                <span className="font-medium">{data.month.savedKwh.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">CO₂ avoided</span>
                <span className="font-medium">{data.month.savedCo2Kg.toLocaleString()} kg</span>
              </div>
            </div>
            <ProgressBar value={data.month.savedPct} className="mt-4" />
          </div>

          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-mono text-xs text-muted-foreground">
            <p className="text-foreground font-medium mb-2">Baseline model (demo):</p>
            <ul className="space-y-1 list-disc list-inside text-[11px]">
              <li>Uses last 30 days average for same weekday/hour</li>
              <li>Adjusts for tariff window</li>
              <li>Replace with your M&V method (ASHRAE / IPMVP)</li>
            </ul>
          </div>
        </div>
      </GlassPanel>

      {/* Savings Breakdown */}
      <GlassPanel variants={item} className="lg:col-span-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
            <PieChart className="w-4 h-4 text-primary" />
          </div>
          <h3 className="text-sm font-medium">Where Savings Came From</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Optimization</th>
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Impact</th>
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Notes</th>
            </tr>
          </thead>
          <tbody>
            {data.savingsBreakdown.map((row, i) => (
              <motion.tr
                key={row.opt}
                className="border-b border-white/[0.04] last:border-0"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <td className="py-3 px-2">{row.opt}</td>
                <td className="py-3 px-2 font-semibold text-success">{row.impact}</td>
                <td className="py-3 px-2 text-muted-foreground">{row.notes}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </GlassPanel>

      {/* Billing Simulator */}
      <GlassPanel variants={item} className="lg:col-span-12">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-warning/15 flex items-center justify-center">
            <Receipt className="w-4 h-4 text-warning" />
          </div>
          <h3 className="text-sm font-medium">Billing Simulator</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          "What your bill would have been" vs "With AI".
        </p>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Period</th>
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Baseline</th>
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">With AI</th>
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Saved</th>
            </tr>
          </thead>
          <tbody>
            {data.billSim.map((row, i) => (
              <motion.tr
                key={row.p}
                className="border-b border-white/[0.04] last:border-0"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <td className="py-3 px-2 font-medium">{row.p}</td>
                <td className="py-3 px-2 text-muted-foreground">{row.base}</td>
                <td className="py-3 px-2">{row.ai}</td>
                <td className="py-3 px-2">
                  <Chip status="good">{row.saved}</Chip>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </GlassPanel>
    </motion.div>
  );
}
