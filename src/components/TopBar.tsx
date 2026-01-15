import { motion } from "framer-motion";
import { Clock, Download, Play } from "lucide-react";

interface TopBarProps {
  title: string;
  subtitle: string;
  lastUpdate: Date;
  onSimulate: () => void;
  onExport: () => void;
}

export function TopBar({ title, subtitle, lastUpdate, onSimulate, onExport }: TopBarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        key={title}
      >
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
      </motion.div>

      <div className="flex items-center gap-3 flex-wrap">
        <motion.div
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-muted-foreground"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Updated: {lastUpdate.toLocaleTimeString()}</span>
        </motion.div>

        <motion.button
          onClick={onSimulate}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.06] border border-white/[0.10] text-sm text-foreground transition-all hover:bg-white/[0.09] active:scale-95"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Play className="w-3.5 h-3.5" />
          Simulate 1 hour
        </motion.button>

        <motion.button
          onClick={onExport}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-success/15 border border-success/30 text-sm text-success font-medium transition-all hover:bg-success/20 active:scale-95"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Download className="w-3.5 h-3.5" />
          Export report
        </motion.button>
      </div>
    </div>
  );
}
