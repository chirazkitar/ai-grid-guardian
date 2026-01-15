import { cn } from "@/lib/utils";

interface DeltaProps {
  children: React.ReactNode;
  variant?: 'good' | 'warn' | 'bad' | 'neutral';
  className?: string;
}

const variants = {
  good: 'text-success border-success/25 bg-success/10',
  warn: 'text-warning border-warning/25 bg-warning/10',
  bad: 'text-destructive border-destructive/25 bg-destructive/10',
  neutral: 'text-muted-foreground border-white/[0.08] bg-white/[0.04]',
};

export function Delta({ children, variant = 'neutral', className }: DeltaProps) {
  return (
    <span
      className={cn(
        "text-xs px-2.5 py-1 rounded-full border font-medium whitespace-nowrap",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
