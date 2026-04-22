import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  variant?: "default" | "success" | "warning" | "destructive";
}

export function MetricCard({ title, value, icon: Icon, description, variant = "default" }: MetricCardProps) {
  const variantStyles = {
    default: "bg-card border-border",
    success: "bg-accent/10 border-accent/20",
    warning: "bg-yellow-50 border-yellow-200",
    destructive: "bg-destructive/10 border-destructive/20",
  };

  const iconStyles = {
    default: "text-primary bg-primary/10",
    success: "text-accent bg-accent/10",
    warning: "text-yellow-600 bg-yellow-100",
    destructive: "text-destructive bg-destructive/10",
  };

  return (
    <div className={`rounded-xl border p-6 ${variantStyles[variant]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${iconStyles[variant]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
