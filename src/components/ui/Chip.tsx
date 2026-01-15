import { cn } from "@/lib/utils";
import { StatusDot } from "./StatusDot";

interface ChipProps {
  children: React.ReactNode;
  status?: 'good' | 'warn' | 'bad' | 'info';
  variant?: 'default' | 'outline';
  className?: string;
}

export function Chip({ children, status, variant = 'default', className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        variant === 'default' && "bg-secondary/60 text-muted-foreground border border-white/[0.06]",
        variant === 'outline' && "border border-white/[0.1] text-muted-foreground",
        className
      )}
    >
      {status && <StatusDot status={status} />}
      {children}
    </span>
  );
}
