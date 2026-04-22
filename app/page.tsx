"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { DollarSign, ShoppingCart, Star, PackageX, Lightbulb, TrendingUp, Sparkles } from "lucide-react";
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
    recomendacion: "Mejora el copy de 'Camisa azul' para aumentar ventas. Considera agregar imagenes lifestyle y destacar los beneficios del material.",
  };

  const displayData = data || mockData;

  return (
    <div className="p-8 min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <div className="px-3 py-1 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full">
              <span className="text-sm font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Bienvenido
              </span>
            </div>
          </div>
          <p className="text-muted-foreground">
            Hola, <span className="font-medium text-foreground">{displayData.usuario.nombre}</span>
          </p>
        </div>
        <TokenCounter
          tokens={displayData.tokens_restantes}
          plan={displayData.usuario.plan}
        />
      </header>

      {showConnect && !isConnected ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <ConnectStoreButton onConnect={handleConnect} />
        </div>
      ) : (
        <div className="space-y-8">
          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="glass-card rounded-2xl p-6 animate-pulse"
                >
                  <div className="h-4 bg-muted rounded-lg w-1/2 mb-4"></div>
                  <div className="h-8 bg-muted rounded-lg w-3/4"></div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="glass-card rounded-2xl p-6 border-l-4 border-primary">
              <p className="text-muted-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Usando datos de demostracion. Conecta con tu backend para ver datos reales.
              </p>
            </div>
          )}

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Ventas Totales"
              value={`$${displayData.resultado.ventas_totales.toLocaleString()}`}
              icon={DollarSign}
              variant="success"
              trend="up"
              trendValue="+12.5%"
            />
            <MetricCard
              title="Carritos Abandonados"
              value={displayData.resultado.carritos_abandonados}
              icon={ShoppingCart}
              variant="warning"
              trend="down"
              trendValue="-3.2%"
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

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Low Performance Products */}
            <div className="glass-card rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-gradient-to-br from-destructive/20 to-destructive/5 rounded-xl">
                  <PackageX className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">Productos con bajo rendimiento</h2>
                  <p className="text-sm text-muted-foreground">Requieren atencion</p>
                </div>
              </div>
              <ul className="space-y-3">
                {displayData.resultado.productos_muertos.map((producto, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 p-4 bg-white/50 rounded-2xl border border-border/30 hover:shadow-md transition-all"
                  >
                    <span className="w-8 h-8 bg-gradient-to-br from-destructive/20 to-destructive/5 text-destructive rounded-xl flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-foreground font-medium">{producto}</span>
                    <span className="ml-auto text-xs text-muted-foreground px-2 py-1 bg-destructive/10 rounded-lg">
                      Sin ventas
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* AI Recommendation */}
            <div className="glass-card rounded-3xl p-8 bg-gradient-to-br from-primary/5 to-accent/5 glow-orange">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl animate-pulse-glow">
                  <Lightbulb className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">Recomendacion IA</h2>
                  <p className="text-sm text-muted-foreground">Sugerencia personalizada</p>
                </div>
                <div className="ml-auto flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-primary to-accent text-white rounded-full text-xs font-medium">
                  <Sparkles className="w-3 h-3" />
                  IA
                </div>
              </div>
              <p className="text-foreground bg-white/60 p-5 rounded-2xl leading-relaxed border border-border/30">
                {displayData.recomendacion}
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4 text-accent" />
                <span>Implementar esta sugerencia puede aumentar las ventas hasta un 15%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
