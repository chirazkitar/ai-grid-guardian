import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Chip } from "@/components/ui/Chip";
import { FileText, Shield, Download } from "lucide-react";

interface ReportsSectionProps {
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

export function ReportsSection({ onToast }: ReportsSectionProps) {
  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-12 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Reports */}
      <GlassPanel variants={item} className="lg:col-span-7">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
            <FileText className="w-4 h-4 text-primary" />
          </div>
          <h3 className="text-sm font-medium">Reports</h3>
        </div>

        <p className="text-xs text-muted-foreground mb-4">
          Generate CFO / ESG-ready exports (demo buttons).
        </p>

        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
            <span className="text-sm text-muted-foreground">Monthly Savings Report</span>
            <motion.button
              onClick={() => onToast('Demo: generated monthly report')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/15 border border-success/30 text-xs text-success font-medium hover:bg-success/20"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-3 h-3" />
              Generate
            </motion.button>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
            <span className="text-sm text-muted-foreground">CO₂ / ESG Summary</span>
            <motion.button
              onClick={() => onToast('Demo: exported ESG summary')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/[0.10] text-xs font-medium hover:bg-white/[0.09]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-3 h-3" />
              Export
            </motion.button>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-muted-foreground">ISO 50001-style Log</span>
            <motion.button
              onClick={() => onToast('Demo: exported log')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/[0.10] text-xs font-medium hover:bg-white/[0.09]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-3 h-3" />
              Export
            </motion.button>
          </div>
        </div>

        <div className="h-px bg-white/[0.06] my-4" />

        <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-mono text-xs text-muted-foreground">
          <p className="text-foreground font-medium mb-2">Tip: Add real exports using:</p>
          <ul className="space-y-1 list-disc list-inside text-[11px]">
            <li>PDF generation (server) or browser print-to-PDF</li>
            <li>CSV downloads for accounting systems</li>
            <li>API integrations for BMS/SCADA</li>
          </ul>
        </div>
      </GlassPanel>

      {/* Security & Compliance */}
      <GlassPanel variants={item} className="lg:col-span-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-success/15 flex items-center justify-center">
            <Shield className="w-4 h-4 text-success" />
          </div>
          <h3 className="text-sm font-medium">Security & Compliance</h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
            <span className="text-sm text-muted-foreground">Encryption</span>
            <Chip status="good">TLS</Chip>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
            <span className="text-sm text-muted-foreground">Access control</span>
            <Chip status="good">RBAC</Chip>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
            <span className="text-sm text-muted-foreground">Audit logs</span>
            <Chip status="good">Enabled</Chip>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-muted-foreground">Data retention</span>
            <Chip status="info">Configurable</Chip>
          </div>
        </div>

        <div className="h-px bg-white/[0.06] my-4" />

        <p className="text-xs text-muted-foreground">
          Energy platforms win trust by being transparent: verified savings + explainable AI + security.
        </p>
      </GlassPanel>
    </motion.div>
  );
}
