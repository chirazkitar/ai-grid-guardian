import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Chip } from "@/components/ui/Chip";
import { Delta } from "@/components/ui/Delta";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusDot } from "@/components/ui/StatusDot";
import type { SiteData } from "@/data/mockData";
import { Zap, DollarSign, Brain, Activity, AlertTriangle } from "lucide-react";

interface OverviewSectionProps {
  data: SiteData;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function OverviewSection({ data }: OverviewSectionProps) {
  const peakRatio = Math.min(100, (data.powerKw / data.peakLimitKw) * 100);
  const nearPeak = data.powerKw > data.peakLimitKw * 0.85;
  const costRatio = Math.min(100, (data.todayCost / (data.todayCost + data.todaySaved)) * 100);

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-12 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Current Power */}
      <GlassPanel variants={item} className="lg:col-span-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-info/15 flex items-center justify-center">
              <Zap className="w-4 h-4 text-info" />
            </div>
            <h3 className="text-sm font-medium">Current Power</h3>
          </div>
          <Chip status="info">kW</Chip>
        </div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <motion.div
              className="text-3xl font-bold tracking-tight"
              key={data.powerKw}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {data.powerKw.toFixed(1)} <span className="text-lg font-normal text-muted-foreground">kW</span>
            </motion.div>
            <p className="text-xs text-muted-foreground mt-1">Live building demand</p>
          </div>
          <Delta variant={nearPeak ? 'warn' : 'good'}>
            {nearPeak ? 'Near peak' : 'Normal'}
          </Delta>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>Peak today</span>
          <span className="text-foreground font-medium">{data.peakTodayKw.toFixed(1)} kW</span>
        </div>
        <ProgressBar value={peakRatio} />
      </GlassPanel>

      {/* Today's Cost */}
      <GlassPanel variants={item} className="lg:col-span-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-warning/15 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-warning" />
            </div>
            <h3 className="text-sm font-medium">Today's Cost</h3>
          </div>
          <Chip status="warn">Money</Chip>
        </div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <motion.div
              className="text-3xl font-bold tracking-tight"
              key={data.todayCost}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {data.todayCost.toFixed(1)} <span className="text-lg font-normal text-muted-foreground">{data.currency}</span>
            </motion.div>
            <p className="text-xs text-muted-foreground mt-1">Estimated bill today</p>
          </div>
          <Delta variant="good">Saved {data.todaySaved.toFixed(1)} {data.currency}</Delta>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>Tariff</span>
          <span className="text-foreground font-medium">{data.tariff}</span>
        </div>
        <ProgressBar value={costRatio} />
      </GlassPanel>

      {/* AI Decisions */}
      <GlassPanel variants={item} className="lg:col-span-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-success/15 flex items-center justify-center">
              <Brain className="w-4 h-4 text-success" />
            </div>
            <h3 className="text-sm font-medium">AI Decisions</h3>
          </div>
          <Chip status="good">Explainable</Chip>
        </div>
        <p className="text-xs text-muted-foreground mb-3">Latest optimization actions</p>
        <div className="space-y-3">
          {data.decisions.map((decision, i) => (
            <motion.div
              key={i}
              className="flex items-start justify-between gap-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs leading-relaxed">{decision.text}</p>
                <p className="text-[10px] text-muted-foreground mt-1">
                  {decision.tag} · {(decision.conf * 100).toFixed(0)}%
                </p>
              </div>
              <Chip status="good" className="shrink-0 text-[10px]">AI</Chip>
            </motion.div>
          ))}
        </div>
      </GlassPanel>

      {/* Top Loads Table */}
      <GlassPanel variants={item} className="lg:col-span-7">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
            <Activity className="w-4 h-4 text-primary" />
          </div>
          <h3 className="text-sm font-medium">Top Loads (Real-Time)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Load</th>
                <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">kW</th>
                <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Priority</th>
                <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Mode</th>
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
                  <td className="py-3 px-2 text-mono">{load.kw.toFixed(1)}</td>
                  <td className="py-3 px-2">
                    <Chip
                      status={load.priority === 'Critical' ? 'good' : load.priority === 'Flexible' ? 'info' : 'warn'}
                    >
                      {load.priority}
                    </Chip>
                  </td>
                  <td className="py-3 px-2 text-muted-foreground">{load.mode}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>

      {/* Anomaly Alerts */}
      <GlassPanel variants={item} className="lg:col-span-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-warning/15 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-warning" />
            </div>
            <h3 className="text-sm font-medium">Anomaly Alerts</h3>
          </div>
          <Chip status="warn">Detection</Chip>
        </div>
        {data.alerts.length > 0 ? (
          <div className="space-y-3">
            {data.alerts.map((alert, i) => (
              <motion.div
                key={i}
                className="p-3 rounded-lg bg-black/20 border border-white/[0.06]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <Chip status={alert.level}>{alert.level.toUpperCase()}</Chip>
                  <span className="text-mono text-[10px] text-muted-foreground">
                    conf {(parseFloat(alert.conf) * 100).toFixed(0)}%
                  </span>
                </div>
                <p className="text-sm font-medium mb-1">{alert.issue}</p>
                <p className="text-xs text-muted-foreground">Cost impact: {alert.cost}</p>
                <p className="text-xs text-muted-foreground">Suggested fix: {alert.fix}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No alerts 🎉</p>
        )}
        <div className="h-px bg-white/[0.06] my-4" />
        <p className="text-xs text-muted-foreground">
          Alerts include estimated cost impact and suggested fixes.
        </p>
      </GlassPanel>
    </motion.div>
  );
}
