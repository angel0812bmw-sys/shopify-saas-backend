"use client";

import { useState, useEffect } from "react";
import { Crown, Zap, Sparkles, ArrowRight } from "lucide-react";
import { TokenCounter } from "@/components/token-counter";
import { ScriptForm } from "@/components/script-form";
import { ScriptResult } from "@/components/script-result";
import { generateScript } from "@/lib/api";
import type { ScriptResponse } from "@/lib/types";
import Link from "next/link";

export default function ScriptsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ScriptResponse | null>(null);
  const [tokens, setTokens] = useState(4500);
  const [isStoreConnected, setIsStoreConnected] = useState(false);
  const plan = "Pro";

  useEffect(() => {
    const connected = localStorage.getItem("shopify_connected");
    setIsStoreConnected(connected === "true");
  }, []);

  const handleSubmit = async (producto: string, tono: string, idioma: string) => {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await generateScript(producto, tono, idioma);
      setResult(response);
      if (response.tokens_restantes) {
        setTokens(response.tokens_restantes);
      }
    } catch {
      // Mock response for demo
      const mockResponse: ScriptResponse = {
        usuario: { nombre: "Usuario Demo", plan: "Pro", tokens_restantes: tokens - 100 },
        resultado: {
          producto,
          guion: `Descubre ${producto} - tu nuevo aliado para destacar. Con un diseno pensado para ti, cada detalle cuenta. Experimenta la calidad que marca la diferencia. No esperes mas, tu momento es ahora. Visita nuestra tienda y encuentra lo que buscas.`,
          ideas_imagenes: [
            "Foto lifestyle con modelo en ambiente natural",
            "Imagen minimalista del producto sobre fondo degradado",
            "Composicion flat lay con elementos complementarios",
            "Video corto mostrando el producto en uso",
          ],
          proximamente: "Generacion de imagenes y videos con IA",
        },
        tokens_restantes: tokens - 100,
      };
      setResult(mockResponse);
      setTokens(tokens - 100);
    } finally {
      setIsLoading(false);
    }
  };

  const insufficientTokens = tokens < 100;

  return (
    <div className="p-8 min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-foreground">Scripts</h1>
            <span className="px-3 py-1.5 bg-gradient-to-r from-primary to-accent text-white text-sm rounded-full flex items-center gap-1.5 font-medium shadow-lg">
              <Crown className="w-3.5 h-3.5" />
              Premium
            </span>
          </div>
          <p className="text-muted-foreground">
            Genera guiones de marketing profesionales con inteligencia artificial
          </p>
        </div>
        <TokenCounter tokens={tokens} plan={plan} />
      </header>

      {/* Store not connected warning */}
      {!isStoreConnected && (
        <div className="glass-card rounded-3xl p-8 mb-8 bg-gradient-to-br from-primary/5 to-accent/5 glow-orange">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/80 rounded-2xl shadow-lg">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground mb-1">
                Conecta tu tienda primero
              </h3>
              <p className="text-muted-foreground">
                Para generar guiones personalizados basados en tus productos, necesitas conectar tu tienda Shopify.
              </p>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-xl hover:scale-[1.02] transition-all"
            >
              Conectar tienda
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      )}

      {/* Insufficient tokens warning */}
      {insufficientTokens ? (
        <div className="glass-card rounded-3xl p-12 text-center max-w-xl mx-auto">
          <div className="w-20 h-20 bg-gradient-to-br from-destructive/20 to-destructive/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Crown className="w-10 h-10 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Tokens insuficientes
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
            Necesitas al menos 100 tokens para generar un guion. Actualiza tu plan para obtener mas tokens y desbloquear todas las funciones.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl hover:scale-[1.02] transition-all glow-orange"
          >
            <Zap className="w-5 h-5" />
            Ver planes
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <ScriptForm 
            onSubmit={handleSubmit} 
            isLoading={isLoading} 
            isStoreConnected={isStoreConnected}
          />
          
          {/* Results */}
          <div>
            {result ? (
              <ScriptResult result={result} />
            ) : (
              <div className="glass-card rounded-3xl p-12 h-full flex items-center justify-center border-2 border-dashed border-border/50">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-muted to-secondary rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Sin resultados aun
                  </h3>
                  <p className="text-muted-foreground max-w-xs leading-relaxed">
                    Completa el formulario y genera tu primer guion de marketing con inteligencia artificial.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
