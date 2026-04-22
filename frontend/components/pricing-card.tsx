"use client";

import { Check, Coins, Sparkles, Zap } from "lucide-react";
import type { Plan } from "@/lib/types";

interface PricingCardProps {
  name: string;
  plan: Plan;
  price?: string;
  isPopular?: boolean;
  currentPlan?: string;
}

export function PricingCard({ name, plan, price, isPopular, currentPlan }: PricingCardProps) {
  const isCurrentPlan = currentPlan === name;
  const isPro = name === "Pro";

  return (
    <div
      className={`relative glass-card rounded-3xl p-8 flex flex-col hover-lift ${
        isPopular 
          ? "gradient-border glow-orange scale-105 z-10" 
          : "border border-border/50"
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 shadow-lg">
          <Sparkles className="w-3.5 h-3.5" />
          Recomendado
        </div>
      )}

      {/* Plan name and icon */}
      <div className="text-center mb-6">
        <div className={`inline-flex p-4 rounded-2xl mb-4 ${
          isPro 
            ? "bg-gradient-to-br from-primary/20 to-accent/20" 
            : "bg-gradient-to-br from-muted to-secondary"
        }`}>
          {isPro ? (
            <Zap className="w-8 h-8 text-primary" />
          ) : (
            <Coins className="w-8 h-8 text-muted-foreground" />
          )}
        </div>
        <h3 className={`text-2xl font-bold mb-1 ${
          isPro 
            ? "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" 
            : "text-foreground"
        }`}>
          {name}
        </h3>
        {price && (
          <p className="text-4xl font-bold text-foreground mt-2">
            {price}
            <span className="text-base font-normal text-muted-foreground">/mes</span>
          </p>
        )}
      </div>

      {/* Tokens */}
      <div className={`flex items-center justify-center gap-2 py-4 px-6 rounded-2xl mb-6 ${
        isPro 
          ? "bg-gradient-to-r from-primary/10 to-accent/10" 
          : "bg-muted/50"
      }`}>
        <Coins className={`w-5 h-5 ${isPro ? "text-primary" : "text-muted-foreground"}`} />
        <span className={`text-2xl font-bold ${isPro ? "text-primary" : "text-foreground"}`}>
          {plan.tokens.toLocaleString()}
        </span>
        <span className="text-sm text-muted-foreground">tokens</span>
      </div>

      {/* Benefits */}
      <ul className="space-y-4 flex-1 mb-8">
        {plan.beneficios.map((beneficio, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className={`p-1 rounded-full ${
              isPro 
                ? "bg-gradient-to-br from-primary/20 to-accent/20" 
                : "bg-accent/10"
            }`}>
              <Check className={`w-4 h-4 ${isPro ? "text-primary" : "text-accent"}`} />
            </div>
            <span className="text-foreground">{beneficio}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        disabled={isCurrentPlan}
        className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 ${
          isCurrentPlan
            ? "bg-muted text-muted-foreground cursor-not-allowed"
            : isPro
            ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] glow-orange"
            : "bg-foreground text-background hover:bg-foreground/90 hover:scale-[1.02]"
        }`}
      >
        {isCurrentPlan ? (
          <span className="flex items-center justify-center gap-2">
            <Check className="w-5 h-5" />
            Plan actual
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            {isPro && <Zap className="w-5 h-5" />}
            Elegir plan
          </span>
        )}
      </button>
    </div>
  );
}
