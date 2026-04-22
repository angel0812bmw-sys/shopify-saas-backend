"use client";

import { Check, Coins } from "lucide-react";
import type { Plan } from "@/lib/types";

interface PricingCardProps {
  name: string;
  plan: Plan;
  isPopular?: boolean;
  currentPlan?: string;
}

export function PricingCard({ name, plan, isPopular, currentPlan }: PricingCardProps) {
  const isCurrentPlan = currentPlan === name;

  return (
    <div
      className={`relative bg-card border rounded-xl p-6 flex flex-col ${
        isPopular ? "border-primary ring-2 ring-primary/20" : "border-border"
      }`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
          Mas popular
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-foreground mb-2">{name}</h3>
        <div className="flex items-center justify-center gap-1 text-muted-foreground">
          <Coins className="w-4 h-4" />
          <span className="text-2xl font-bold text-foreground">{plan.tokens.toLocaleString()}</span>
          <span className="text-sm">tokens</span>
        </div>
      </div>

      <ul className="space-y-3 flex-1 mb-6">
        {plan.beneficios.map((beneficio, index) => (
          <li key={index} className="flex items-start gap-2">
            <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <span className="text-foreground text-sm">{beneficio}</span>
          </li>
        ))}
      </ul>

      <button
        disabled={isCurrentPlan}
        className={`w-full py-3 rounded-lg font-medium transition-colors ${
          isCurrentPlan
            ? "bg-secondary text-muted-foreground cursor-not-allowed"
            : isPopular
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "bg-secondary text-foreground hover:bg-secondary/80"
        }`}
      >
        {isCurrentPlan ? "Plan actual" : "Upgrade"}
      </button>
    </div>
  );
}
