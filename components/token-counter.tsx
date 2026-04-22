"use client";

import { Coins, Zap } from "lucide-react";

interface TokenCounterProps {
  tokens: number;
  plan: string;
}

export function TokenCounter({ tokens, plan }: TokenCounterProps) {
  const isPro = plan === "Pro";
  
  return (
    <div className="flex items-center gap-3">
      <div className="glass-card flex items-center gap-3 px-5 py-2.5 rounded-2xl glow-orange">
        <div className="p-1.5 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg">
          <Coins className="w-4 h-4 text-primary" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {tokens.toLocaleString()}
          </span>
          <span className="text-muted-foreground text-sm">tokens</span>
        </div>
      </div>
      <div 
        className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-medium text-sm ${
          isPro 
            ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg glow-orange" 
            : "glass-card text-foreground glow-green"
        }`}
      >
        <Zap className={`w-3.5 h-3.5 ${isPro ? "text-white" : "text-accent"}`} />
        {plan}
      </div>
    </div>
  );
}
