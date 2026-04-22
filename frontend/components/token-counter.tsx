"use client";

import { Coins } from "lucide-react";

interface TokenCounterProps {
  tokens: number;
  plan: string;
}

export function TokenCounter({ tokens, plan }: TokenCounterProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-lg">
        <Coins className="w-4 h-4 text-primary" />
        <span className="font-semibold text-foreground">{tokens.toLocaleString()}</span>
        <span className="text-muted-foreground text-sm">tokens</span>
      </div>
      <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
        {plan}
      </div>
    </div>
  );
}
