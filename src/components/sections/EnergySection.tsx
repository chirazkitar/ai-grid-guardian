import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Chip } from "@/components/ui/Chip";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import { Sun, Flame, Home, Battery, Droplets, Zap } from "lucide-react";

// Mock data for electricity usage
const electricityData = [
  { time: "12 AM", solar: 0, grid: 0.15, battery: -0.1 },
  { time: "2 AM", solar: 0, grid: 0.12, battery: -0.08 },
  { time: "4 AM", solar: 0, grid: 0.18, battery: -0.05 },
  { time: "6 AM", solar: 0.1, grid: 0.2, battery: 0 },
  { time: "8 AM", solar: 0.4, grid: 0.15, battery: 0.1 },
  { time: "10 AM", solar: 0.8, grid: -0.1, battery: 0.2 },
  { time: "12 PM", solar: 1.2, grid: -0.3, battery: 0.4 },
  { time: "2 PM", solar: 1.4, grid: -0.4, battery: 0.5 },
  { time: "4 PM", solar: 1.0, grid: 0.1, battery: 0.2 },
  { time: "6 PM", solar: 0.4, grid: 0.5, battery: -0.2 },
  { time: "8 PM", solar: 0, grid: 0.6, battery: -0.3 },
  { time: "10 PM", solar: 0, grid: 0.3, battery: -0.15 },
];

// Mock data for solar production
const solarData = [
  { time: "6 AM", production: 0.1 },
  { time: "8 AM", production: 0.5 },
  { time: "10 AM", production: 1.2 },
  { time: "12 PM", production: 2.1 },
  { time: "2 PM", production: 2.4 },
  { time: "4 PM", production: 1.8 },
  { time: "6 PM", production: 0.8 },
  { time: "8 PM", production: 0.1 },
];

// Sources data
const sourcesData = [
  { source: "Solar", usage: "9.48 kWh", cost: "-", color: "#f59e0b", icon: Sun },
  { source: "Solar total", usage: "9.48 kWh", cost: "-", isTotal: true },
  { source: "Battery Output", usage: "1.8 kWh", cost: "-", color: "#22c55e" },
  { source: "Battery Input", usage: "-2.4 kWh", cost: "-", color: "#f472b6" },
  { source: "Battery total", usage: "-0.6 kWh", cost: "-", isTotal: true },
  { source: "Grid consumption low tariff", usage: "4.17 kWh", cost: "$0.98", color: "#60a5fa" },
  { source: "Grid consumption high tariff", usage: "1.51 kWh", cost: "$1.38", color: "#3b82f6" },
  { source: "Returned to grid low tariff", usage: "-0 kWh", cost: "-$0.00", color: "#a78bfa" },
  { source: "Returned to grid high tariff", usage: "-3.64 kWh", cost: "-$1.21", color: "#8b5cf6" },
  { source: "Grid total", usage: "2.03 kWh", cost: "$1.16", isTotal: true },
];

// Device usage data
const deviceUsageData = [
  { name: "Boiler", usage: 4.8, color: "#f472b6" },
  { name: "Heat pump", usage: 3.9, color: "#a78bfa" },
  { name: "Washing machine", usage: 4.5, color: "#f97316" },
  { name: "Dryer", usage: 3.2, color: "#84cc16" },
  { name: "Electric car", usage: 2.4, color: "#22d3d3" },
  { name: "Air conditioning", usage: 1.8, color: "#fbbf24" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

interface CircularStatProps {
  value: string;
  label: string;
  color: string;
  percentage?: number;
}

function CircularStat({ value, label, color, percentage = 100 }: CircularStatProps) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke="hsl(var(--muted)/0.2)"
            strokeWidth="6"
          />
          <motion.circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold">{value}</span>
        </div>
      </div>
      <span className="text-xs text-muted-foreground mt-2 text-center">{label}</span>
    </div>
  );
}

interface EnergyDistributionNodeProps {
  icon: typeof Sun;
  label: string;
  value: string;
  color: string;
}

function EnergyDistributionNode({ icon: Icon, label, value, color }: EnergyDistributionNodeProps) {
  return (
    <motion.div 
      className="flex flex-col items-center"
      whileHover={{ scale: 1.05 }}
    >
      <div 
        className="w-14 h-14 rounded-full flex items-center justify-center border-2"
        style={{ borderColor: color, backgroundColor: `${color}15` }}
      >
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      <span className="text-xs font-medium mt-2">{label}</span>
      <span className="text-[10px] text-muted-foreground">{value}</span>
    </motion.div>
  );
}

export function EnergySection() {
  return (
    <motion.div 
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Top Row - Electricity Usage + Energy Distribution */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        {/* Electricity Usage Chart */}
        <motion.div variants={item} className="xl:col-span-3">
          <GlassPanel className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium">Electricity usage</h3>
              <Chip className="text-xs">10.91 kWh used</Chip>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={electricityData} stackOffset="sign">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted)/0.1)" />
                  <XAxis dataKey="time" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                  <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} unit=" kWh" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="solar" stackId="a" fill="#f59e0b" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="grid" stackId="a" fill="#60a5fa" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="battery" stackId="a" fill="#22c55e" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-4 mt-3">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded bg-warning" />
                <span className="text-muted-foreground">Solar</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded bg-primary" />
                <span className="text-muted-foreground">Grid</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded bg-accent" />
                <span className="text-muted-foreground">Battery</span>
              </div>
            </div>
          </GlassPanel>
        </motion.div>

        {/* Energy Distribution */}
        <motion.div variants={item}>
          <GlassPanel className="p-5 h-full">
            <h3 className="text-sm font-medium mb-4">Energy distribution</h3>
            <div className="grid grid-cols-2 gap-4">
              <EnergyDistributionNode icon={Sun} label="Solar" value="9.48 kWh" color="#f59e0b" />
              <EnergyDistributionNode icon={Flame} label="Gas" value="2.26 m³" color="#a78bfa" />
              <EnergyDistributionNode icon={Home} label="Home" value="10.9 kWh" color="#22c55e" />
              <EnergyDistributionNode icon={Droplets} label="Water" value="467 L" color="#60a5fa" />
              <EnergyDistributionNode icon={Battery} label="Battery" value="4.2 kWh" color="#14b8a6" />
              <EnergyDistributionNode icon={Zap} label="Grid" value="2.03 kWh" color="#8b5cf6" />
            </div>
          </GlassPanel>
        </motion.div>
      </div>

      {/* Solar Production + Stats */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        {/* Solar Production Chart */}
        <motion.div variants={item} className="xl:col-span-3">
          <GlassPanel className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium">Solar production</h3>
              <Chip className="text-xs">9.48 kWh</Chip>
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={solarData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted)/0.1)" />
                  <XAxis dataKey="time" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                  <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} unit=" kWh" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="production" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassPanel>
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={item} className="space-y-4">
          <GlassPanel className="p-4">
            <CircularStat value="2.03 kWh" label="Net consumed from the grid" color="#8b5cf6" percentage={20} />
          </GlassPanel>
          <GlassPanel className="p-4">
            <CircularStat value="67%" label="Self-consumed solar energy" color="#f59e0b" percentage={67} />
          </GlassPanel>
          <GlassPanel className="p-4">
            <CircularStat value="48%" label="Self-sufficiency" color="#22c55e" percentage={48} />
          </GlassPanel>
        </motion.div>
      </div>

      {/* Sources Table */}
      <motion.div variants={item}>
        <GlassPanel className="p-5">
          <h3 className="text-sm font-medium mb-4">Sources</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left py-2 px-3 text-muted-foreground font-medium text-xs">Source</th>
                  <th className="text-right py-2 px-3 text-muted-foreground font-medium text-xs">Usage</th>
                  <th className="text-right py-2 px-3 text-muted-foreground font-medium text-xs">Cost</th>
                </tr>
              </thead>
              <tbody>
                {sourcesData.map((row, index) => (
                  <tr 
                    key={index} 
                    className={`border-b border-white/[0.04] ${row.isTotal ? 'bg-white/[0.02]' : ''}`}
                  >
                    <td className="py-2.5 px-3 flex items-center gap-2">
                      {row.color && (
                        <div 
                          className="w-3 h-3 rounded" 
                          style={{ backgroundColor: row.color }}
                        />
                      )}
                      <span className={row.isTotal ? 'font-medium' : ''}>{row.source}</span>
                    </td>
                    <td className="text-right py-2.5 px-3 text-muted-foreground">{row.usage}</td>
                    <td className="text-right py-2.5 px-3 text-muted-foreground">{row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassPanel>
      </motion.div>

      {/* Individual Devices Usage */}
      <motion.div variants={item}>
        <GlassPanel className="p-5">
          <h3 className="text-sm font-medium mb-4">Individual devices total usage</h3>
          <div className="space-y-3">
            {deviceUsageData.map((device) => (
              <div key={device.name} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-28 truncate">{device.name}</span>
                <div className="flex-1 h-6 bg-white/[0.04] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: device.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(device.usage / 5) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
                <span className="text-xs font-medium w-16 text-right">{device.usage} kWh</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.06]">
            <span className="text-xs text-muted-foreground">Scale</span>
            <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <span key={n}>{n}</span>
              ))}
              <span>kWh</span>
            </div>
          </div>
        </GlassPanel>
      </motion.div>
    </motion.div>
  );
}
