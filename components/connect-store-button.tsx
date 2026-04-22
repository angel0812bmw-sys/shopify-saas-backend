"use client";

import { Store, ArrowRight, ShoppingBag, BarChart3, Sparkles } from "lucide-react";

interface ConnectStoreButtonProps {
  onConnect: () => void;
}

export function ConnectStoreButton({ onConnect }: ConnectStoreButtonProps) {
  return (
    <div className="glass-card rounded-3xl p-10 text-center max-w-2xl mx-auto glow-orange">
      {/* Animated icon */}
      <div className="relative inline-block mb-6">
        <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl flex items-center justify-center animate-float">
          <Store className="w-12 h-12 text-primary" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-xl flex items-center justify-center shadow-lg animate-pulse">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-foreground mb-3">
        Conecta tu tienda Shopify
      </h3>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
        Para ver tus metricas reales y obtener recomendaciones personalizadas con IA, conecta tu tienda Shopify.
      </p>

      {/* Features preview */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-white/50 border border-border/30">
          <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center mx-auto mb-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
          </div>
          <p className="text-sm font-medium text-foreground">Ventas</p>
          <p className="text-xs text-muted-foreground">En tiempo real</p>
        </div>
        <div className="p-4 rounded-2xl bg-white/50 border border-border/30">
          <div className="w-10 h-10 bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl flex items-center justify-center mx-auto mb-2">
            <BarChart3 className="w-5 h-5 text-accent" />
          </div>
          <p className="text-sm font-medium text-foreground">Metricas</p>
          <p className="text-xs text-muted-foreground">Completas</p>
        </div>
        <div className="p-4 rounded-2xl bg-white/50 border border-border/30">
          <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center mx-auto mb-2">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <p className="text-sm font-medium text-foreground">IA</p>
          <p className="text-xs text-muted-foreground">Recomendaciones</p>
        </div>
      </div>

      <button
        onClick={onConnect}
        className="bg-gradient-to-r from-primary to-primary/80 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl hover:scale-[1.02] transition-all duration-300 inline-flex items-center gap-3 glow-orange"
      >
        <Store className="w-5 h-5" />
        Conectar tienda
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
