"use client";

import { Store } from "lucide-react";

interface ConnectStoreButtonProps {
  onConnect: () => void;
}

export function ConnectStoreButton({ onConnect }: ConnectStoreButtonProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-8 text-center">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <Store className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        Conecta tu tienda Shopify
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Para ver tus metricas reales y obtener recomendaciones personalizadas, conecta tu tienda Shopify.
      </p>
      <button
        onClick={onConnect}
        className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
      >
        <Store className="w-5 h-5" />
        Conectar tienda
      </button>
    </div>
  );
}
