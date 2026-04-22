"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { DollarSign, ShoppingCart, Star, PackageX, Lightbulb } from "lucide-react";
import { TokenCounter } from "@/components/token-counter";
import { MetricCard } from "@/components/metric-card";
import { ConnectStoreButton } from "@/components/connect-store-button";
import { fetchHomeInsights } from "@/lib/api";
import type { HomeInsightsResponse } from "@/lib/types";

export default function HomePage() {
  const [isConnected, setIsConnected] = useState(false);
  const [showConnect, setShowConnect] = useState(true);

  const { data, error, isLoading } = useSWR<HomeInsightsResponse>(
    isConnected ? "/home_insights" : null,
    fetchHomeInsights,
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    const connected = localStorage.getItem("shopify_connected");
    if (connected === "true") {
      setIsConnected(true);
      setShowConnect(false);
    }
  }, []);

  const handleConnect = () => {
    localStorage.setItem("shopify_connected", "true");
    setIsConnected(true);
    setShowConnect(false);
  };

  // Mock data for demo when API is not available
  const mockData: HomeInsightsResponse = {
    usuario: { nombre: "Usuario Demo", plan: "Pro", tokens_restantes: 4500 },
    resultado: {
      ventas_totales: 12500,
      carritos_abandonados: 45,
      producto_estrella: "Zapatos deportivos",
      productos_muertos: ["Camisa azul", "Gorra negra", "Cinturon marron"],
    },
    tokens_restantes: 4500,
    recomendacion: "Mejora el copy de 'Camisa azul' para aumentar ventas.",
  };

  const displayData = data || mockData;

  return (
    <div className="p-8">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Bienvenido, {displayData.usuario.nombre}
          </p>
        </div>
        <TokenCounter
          tokens={displayData.tokens_restantes}
          plan={displayData.usuario.plan}
        />
      </header>

      {showConnect && !isConnected ? (
        <ConnectStoreButton onConnect={handleConnect} />
      ) : (
        <div className="space-y-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-xl p-6 animate-pulse"
                >
                  <div className="h-4 bg-secondary rounded w-1/2 mb-4"></div>
                  <div className="h-8 bg-secondary rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 text-center">
              <p className="text-destructive">
                Error al cargar las metricas. Usando datos de demo.
              </p>
            </div>
          ) : null}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Ventas Totales"
              value={`$${displayData.resultado.ventas_totales.toLocaleString()}`}
              icon={DollarSign}
              variant="success"
            />
            <MetricCard
              title="Carritos Abandonados"
              value={displayData.resultado.carritos_abandonados}
              icon={ShoppingCart}
              variant="warning"
            />
            <MetricCard
              title="Producto Estrella"
              value={displayData.resultado.producto_estrella}
              icon={Star}
              variant="default"
            />
            <MetricCard
              title="Productos Muertos"
              value={displayData.resultado.productos_muertos.length}
              icon={PackageX}
              variant="destructive"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <PackageX className="w-5 h-5 text-destructive" />
                Productos con bajo rendimiento
              </h2>
              <ul className="space-y-2">
                {displayData.resultado.productos_muertos.map((producto, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-foreground bg-secondary/50 px-4 py-2 rounded-lg"
                  >
                    <span className="w-6 h-6 bg-destructive/10 text-destructive rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    {producto}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" />
                Recomendacion IA
              </h2>
              <p className="text-foreground bg-card/50 p-4 rounded-lg leading-relaxed">
                {displayData.recomendacion}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
