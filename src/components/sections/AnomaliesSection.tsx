import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Chip } from "@/components/ui/Chip";
import type { SiteData } from "@/data/mockData";
import { AlertTriangle } from "lucide-react";

interface AnomaliesSectionProps {
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

export function AnomaliesSection({ data }: AnomaliesSectionProps) {
  return (
    <motion.div
      className="grid grid-cols-1 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <GlassPanel variants={item}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-warning/15 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-warning" />
          </div>
          <h3 className="text-sm font-medium">Anomaly & Fault Detection</h3>
        </div>

        <p className="text-xs text-muted-foreground mb-4">
          Detect stuck loads, abnormal consumption, and equipment issues.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Issue</th>
                <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Estimated Cost Impact</th>
                <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Suggested Fix</th>
                <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {data.anomalies.map((anomaly, i) => (
                <motion.tr
                  key={i}
                  className="border-b border-white/[0.04] last:border-0"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <td className="py-3 px-2">
                    <Chip status={anomaly.status}>{anomaly.status.toUpperCase()}</Chip>
                  </td>
                  <td className="py-3 px-2 font-medium">{anomaly.issue}</td>
                  <td className="py-3 px-2 text-muted-foreground">{anomaly.impact}</td>
                  <td className="py-3 px-2 text-muted-foreground">{anomaly.fix}</td>
                  <td className="py-3 px-2 text-muted-foreground">{anomaly.conf}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
