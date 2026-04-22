"use client";

import useSWR from "swr";
import { TokenCounter } from "@/components/token-counter";
import { PricingCard } from "@/components/pricing-card";
import { fetchPricing } from "@/lib/api";
import type { PricingResponse, Plan } from "@/lib/types";

export default function PricingPage() {
  const currentPlan = "Pro";
  const tokens = 4500;

  const { data, isLoading } = useSWR<PricingResponse>(
    "/pricing",
    fetchPricing,
    { revalidateOnFocus: false }
  );

  // Mock data for demo
  const mockPlans: { [key: string]: Plan } = {
    Free: {
      tokens: 500,
      beneficios: ["Metricas basicas", "1 guion simple", "Radar limitado"],
    },
    Pro: {
      tokens: 5000,
      beneficios: [
        "Metricas completas",
        "Guiones avanzados",
        "Radar conectado",
        "Copiloto IA",
      ],
    },
    Premium: {
      tokens: 10000,
      beneficios: [
        "Todo lo anterior",
        "Soporte prioritario",
        "Acceso anticipado a imagenes/videos",
        "Integraciones premium",
      ],
    },
  };

  const plans = data?.planes || mockPlans;

  return (
    <div className="p-8">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Planes y Precios</h1>
          <p className="text-muted-foreground">
            Elige el plan que mejor se adapte a tus necesidades
          </p>
        </div>
        <TokenCounter tokens={tokens} plan={currentPlan} />
      </header>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-xl p-6 animate-pulse"
            >
              <div className="h-6 bg-secondary rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-10 bg-secondary rounded w-3/4 mx-auto mb-6"></div>
              <div className="space-y-2">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="h-4 bg-secondary rounded w-full"></div>
                ))}
              </div>
              <div className="h-12 bg-secondary rounded w-full mt-6"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PricingCard
            name="Free"
            plan={plans.Free}
            currentPlan={currentPlan}
          />
          <PricingCard
            name="Pro"
            plan={plans.Pro}
            isPopular
            currentPlan={currentPlan}
          />
          <PricingCard
            name="Premium"
            plan={plans.Premium}
            currentPlan={currentPlan}
          />
        </div>
      )}

      <div className="mt-12 text-center">
        <p className="text-muted-foreground text-sm">
          Todos los planes incluyen acceso a la API y actualizaciones automaticas.
        </p>
        <p className="text-muted-foreground text-sm mt-1">
          Necesitas mas tokens? Contacta con nosotros para planes empresariales.
        </p>
      </div>
    </div>
  );
}
