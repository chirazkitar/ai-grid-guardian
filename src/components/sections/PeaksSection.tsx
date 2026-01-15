import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Chip } from "@/components/ui/Chip";
import { Delta } from "@/components/ui/Delta";
import type { SiteData } from "@/data/mockData";
import { TrendingDown, Clock, Radio } from "lucide-react";

interface PeaksSectionProps {
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

export function PeaksSection({ data, onToast }: PeaksSectionProps) {
  const drNext = new Date(Date.now() + 1000 * 60 * 60 * 18).toLocaleString();

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-12 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Peak Demand Optimization */}
      <GlassPanel variants={item} className="lg:col-span-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-success/15 flex items-center justify-center">
            <TrendingDown className="w-4 h-4 text-success" />
          </div>
          <h3 className="text-sm font-medium">Peak Demand Optimization</h3>
        </div>

        <div className="flex items-end justify-between gap-4 mb-4">
          <div>
            <motion.div
              className="text-3xl font-bold tracking-tight"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {data.month.peakReducedKw.toFixed(1)} <span className="text-lg font-normal text-muted-foreground">kW</span>
            </motion.div>
            <p className="text-xs text-muted-foreground mt-1">Peak reduced (this month)</p>
          </div>
          <Delta variant="good">Saved {data.month.peakReducedMoney} {data.currency}</Delta>
        </div>

        <div className="h-px bg-white/[0.06] my-4" />

        <p className="text-xs text-muted-foreground">
          AI capped peaks by shifting flexible loads and smoothing startups. This reduces demand charges and avoids expensive peak tariffs.
        </p>
      </GlassPanel>

      {/* Tariff Windows */}
      <GlassPanel variants={item} className="lg:col-span-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-warning/15 flex items-center justify-center">
            <Clock className="w-4 h-4 text-warning" />
          </div>
          <h3 className="text-sm font-medium">Tariff Windows</h3>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Window</th>
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Rate</th>
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">AI Strategy</th>
            </tr>
          </thead>
          <tbody>
            {data.tariffs.map((tariff, i) => (
              <motion.tr
                key={tariff.w}
                className="border-b border-white/[0.04] last:border-0"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <td className="py-3 px-2">{tariff.w}</td>
                <td className="py-3 px-2 font-semibold">{tariff.r}</td>
                <td className="py-3 px-2 text-muted-foreground">{tariff.s}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </GlassPanel>

      {/* Demand Response */}
      <GlassPanel variants={item} className="lg:col-span-12">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-info/15 flex items-center justify-center">
            <Radio className="w-4 h-4 text-info" />
          </div>
          <h3 className="text-sm font-medium">Demand Response (Optional)</h3>
        </div>

        <p className="text-xs text-muted-foreground mb-4">
          Enable "events" where the system auto-reduces load during grid stress (demo).
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-lg bg-black/20 border border-white/[0.06]">
          <div className="flex items-center gap-4">
            <Chip status="info">DR Available</Chip>
            <span className="text-sm text-muted-foreground">
              Next possible event: <span className="text-foreground">{drNext}</span>
            </span>
          </div>
          <motion.button
            onClick={() => onToast('Demo: DR enabled')}
            className="px-4 py-2 rounded-lg bg-white/[0.06] border border-white/[0.10] text-sm transition-all hover:bg-white/[0.09]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Enable DR
          </motion.button>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
