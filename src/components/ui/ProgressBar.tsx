import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number;
  variant?: 'default' | 'gradient';
  className?: string;
}

export function ProgressBar({ value, variant = 'gradient', className }: ProgressBarProps) {
  return (
    <div
      className={cn(
        "w-full h-2 bg-secondary/50 rounded-full overflow-hidden border border-white/[0.04]",
        className
      )}
    >
      <motion.div
        className={cn(
          "h-full rounded-full",
          variant === 'gradient' && "bg-gradient-to-r from-primary to-accent",
          variant === 'default' && "bg-primary"
        )}
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, value)}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
}
