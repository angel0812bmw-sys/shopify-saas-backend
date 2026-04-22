"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { Sparkles, Zap } from "lucide-react";
import { TokenCounter } from "@/components/token-counter";
import { PricingCard } from "@/components/pricing-card";
import { fetchPricing } from "@/lib/api";
import type { PricingResponse, Plan } from "@/lib/types";

export default function PricingPage() {
  const [currentPlan, setCurrentPlan] = useState("Free");
  const [tokens, setTokens] = useState(500);

  useEffect(() => {
    // Check if user has Pro plan
    const plan = localStorage.getItem("user_plan") || "Free";
    setCurrentPlan(plan);
    setTokens(plan === "Pro" ? 5000 : 500);
  }, []);

  const { data, isLoading } = useSWR<PricingResponse>(
    "/pricing",
    fetchPricing,
    { revalidateOnFocus: false }
  );

  // Only Free and Pro plans as requested
  const mockPlans: { [key: string]: Plan } = {
    Free: {
      tokens: 500,
      beneficios: [
        "Metricas basicas",
        "1 tienda conectada",
        "1 guion simple por dia",
        "Soporte por email",
      ],
    },
    Pro: {
      tokens: 5000,
      beneficios: [
        "Metricas completas",
        "Conectar multiples tiendas",
        "Guiones avanzados ilimitados",
        "Copiloto IA personalizado",
        "Soporte prioritario",
        "Acceso anticipado a nuevas funciones",
      ],
    },
  };

  const plans = data?.planes || mockPlans;

  return (
    <div className="p-8 min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between mb-12">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-foreground">Planes y Precios</h1>
          </div>
          <p className="text-muted-foreground">
            Elige el plan que mejor se adapte a tus necesidades
          </p>
        </div>
        <TokenCounter tokens={tokens} plan={currentPlan} />
      </header>

      {/* Pricing Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full mb-6">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Precios simples y transparentes
          </span>
        </div>
        <h2 className="text-4xl font-bold text-foreground mb-4">
          Potencia tu tienda con IA
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Desde analisis basicos hasta un copiloto IA completo. Elige el plan perfecto para hacer crecer tu negocio en Shopify.
        </p>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="glass-card rounded-3xl p-8 animate-pulse"
            >
              <div className="h-8 bg-muted rounded-xl w-1/2 mx-auto mb-6"></div>
              <div className="h-12 bg-muted rounded-xl w-3/4 mx-auto mb-8"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="h-5 bg-muted rounded-lg w-full"></div>
                ))}
              </div>
              <div className="h-14 bg-muted rounded-2xl w-full mt-8"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <PricingCard
            name="Free"
            plan={plans.Free}
            price="$0"
            currentPlan={currentPlan}
          />
          <PricingCard
            name="Pro"
            plan={plans.Pro}
            price="$29"
            isPopular
            currentPlan={currentPlan}
          />
        </div>
      )}

      {/* Features Comparison */}
      <div className="mt-16 text-center">
        <div className="glass-card rounded-3xl p-8 max-w-2xl mx-auto bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold text-foreground">Necesitas mas?</h3>
          </div>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Para equipos grandes o necesidades especiales, contactanos para crear un plan personalizado con tokens ilimitados y soporte dedicado.
          </p>
          <button className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-2xl font-semibold hover:bg-foreground/90 transition-all">
            Contactar ventas
          </button>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-12 text-center">
        <p className="text-muted-foreground text-sm">
          Todos los planes incluyen acceso a la API y actualizaciones automaticas.
        </p>
        <p className="text-muted-foreground text-sm mt-1">
          Cancela cuando quieras. Sin compromisos.
        </p>
      </div>
    </div>
  );
}
