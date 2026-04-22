"use client";

import { useState } from "react";
import { Crown } from "lucide-react";
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
  const plan = "Pro";

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
          guion: `Campana para ${producto} en tono ${tono} (${idioma}): "Descubre la mejor calidad en ${producto}, pensado para ti. Experimenta la diferencia que marca la excelencia. No esperes mas, tu estilo te espera."`,
          ideas_imagenes: [
            "Foto lifestyle con modelo usando el producto",
            "Imagen minimalista del producto sobre fondo neutro",
            "Composicion flat lay con accesorios complementarios",
          ],
          proximamente: "Generacion de imagenes y videos",
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
    <div className="p-8">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            Scripts
            <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full flex items-center gap-1">
              <Crown className="w-3 h-3" />
              Premium
            </span>
          </h1>
          <p className="text-muted-foreground">
            Genera guiones de marketing con IA
          </p>
        </div>
        <TokenCounter tokens={tokens} plan={plan} />
      </header>

      {insufficientTokens ? (
        <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-8 text-center">
          <Crown className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Tokens insuficientes
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Necesitas al menos 100 tokens para generar un guion. Actualiza tu plan para obtener mas tokens.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <Crown className="w-5 h-5" />
            Ver planes
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ScriptForm onSubmit={handleSubmit} isLoading={isLoading} />
          
          <div>
            {result ? (
              <ScriptResult result={result} />
            ) : (
              <div className="bg-card border border-border border-dashed rounded-xl p-8 h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Crown className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Sin resultados aun
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-xs">
                    Completa el formulario y genera tu primer guion de marketing con IA.
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
