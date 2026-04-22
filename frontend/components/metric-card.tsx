import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  variant?: "default" | "success" | "warning" | "destructive";
  trend?: "up" | "down";
  trendValue?: string;
}

export function MetricCard({ 
  title, 
  value, 
  icon: Icon, 
  description, 
  variant = "default",
  trend,
  trendValue 
}: MetricCardProps) {
  const variantStyles = {
    default: "glass-card hover-lift",
    success: "glass-card hover-lift glow-green",
    warning: "glass-card hover-lift border-yellow-200/50",
    destructive: "glass-card hover-lift border-destructive/20",
  };

  const iconStyles = {
    default: "bg-gradient-to-br from-primary/20 to-primary/5 text-primary",
    success: "bg-gradient-to-br from-accent/20 to-accent/5 text-accent",
    warning: "bg-gradient-to-br from-yellow-400/20 to-yellow-400/5 text-yellow-600",
    destructive: "bg-gradient-to-br from-destructive/20 to-destructive/5 text-destructive",
  };

  const glowStyles = {
    default: "",
    success: "shadow-accent/20",
    warning: "shadow-yellow-400/20",
    destructive: "shadow-destructive/20",
  };

  return (
    <div className={`rounded-2xl p-6 ${variantStyles[variant]} ${glowStyles[variant]}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground tracking-tight">{value}</p>
          {description && (
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          )}
          {trend && trendValue && (
            <div className={`mt-2 flex items-center gap-1 text-sm font-medium ${
              trend === "up" ? "text-accent" : "text-destructive"
            }`}>
              {trend === "up" ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              {trendValue}
            </div>
          )}
        </div>
        <div className={`p-3.5 rounded-2xl ${iconStyles[variant]} shadow-lg`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
