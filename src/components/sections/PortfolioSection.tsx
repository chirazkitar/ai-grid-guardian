import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Chip } from "@/components/ui/Chip";
import { mockState, type SiteKey } from "@/data/mockData";
import { Building2 } from "lucide-react";

interface PortfolioSectionProps {
  currentSite: SiteKey;
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function PortfolioSection({ currentSite }: PortfolioSectionProps) {
  const currency = mockState[currentSite].currency;

  const sites = (Object.keys(mockState) as SiteKey[]).map((key) => {
    const site = mockState[key];
    const baseCost = Math.round((site.month.savedMoney / (site.month.savedPct / 100)) * 10) / 10;
    const rank = Math.max(1, Math.min(10, Math.round((100 - site.month.savedPct) / 10)));
    return {
      name: site.name,
      kwh: Math.round(site.month.savedKwh / (site.month.savedPct / 100)),
      cost: baseCost,
      saved: site.month.savedMoney,
      rank,
    };
  }).sort((a, b) => a.rank - b.rank);

  return (
    <motion.div
      className="grid grid-cols-1 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <GlassPanel variants={item}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-info/15 flex items-center justify-center">
            <Building2 className="w-4 h-4 text-info" />
          </div>
          <h3 className="text-sm font-medium">Multi-Building Portfolio</h3>
        </div>

        <p className="text-xs text-muted-foreground mb-4">
          For property managers and chains: compare buildings and rank efficiency.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Site</th>
                <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">kWh (month)</th>
                <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Cost (month)</th>
                <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Verified Savings</th>
                <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Efficiency Rank</th>
              </tr>
            </thead>
            <tbody>
              {sites.map((site, i) => (
                <motion.tr
                  key={site.name}
                  className="border-b border-white/[0.04] last:border-0"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <td className="py-3 px-2 font-medium">{site.name}</td>
                  <td className="py-3 px-2 text-muted-foreground">{site.kwh.toLocaleString()}</td>
                  <td className="py-3 px-2">{site.cost.toLocaleString()} {currency}</td>
                  <td className="py-3 px-2">
                    <Chip status="good">{site.saved.toLocaleString()} {currency}</Chip>
                  </td>
                  <td className="py-3 px-2 font-bold">#{site.rank}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
