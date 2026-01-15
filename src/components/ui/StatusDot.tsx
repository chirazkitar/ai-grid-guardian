import { cn } from "@/lib/utils";

interface StatusDotProps {
  status: 'good' | 'warn' | 'bad' | 'info';
  pulse?: boolean;
  size?: 'sm' | 'md';
}

const statusColors = {
  good: 'bg-success',
  warn: 'bg-warning',
  bad: 'bg-destructive',
  info: 'bg-info',
};

export function StatusDot({ status, pulse = false, size = 'sm' }: StatusDotProps) {
  return (
    <span
      className={cn(
        "rounded-full inline-block",
        statusColors[status],
        size === 'sm' ? 'w-2 h-2' : 'w-2.5 h-2.5',
        pulse && 'animate-pulse-glow'
      )}
    />
  );
}
