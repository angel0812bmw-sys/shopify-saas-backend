"use client";

import { Copy, Check, Image, Video, Clock } from "lucide-react";
import { useState } from "react";
import type { ScriptResponse } from "@/lib/types";

interface ScriptResultProps {
  result: ScriptResponse;
}

export function ScriptResult({ result }: ScriptResultProps) {
  const [copied, setCopied] = useState(false);

  if (result.error) {
    return (
      <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-destructive mb-2">Error</h3>
        <p className="text-destructive">{result.error}</p>
        {result.recomendacion && (
          <p className="mt-2 text-muted-foreground">{result.recomendacion}</p>
        )}
      </div>
    );
  }

  if (!result.resultado) return null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.resultado!.guion);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Guion generado</h3>
          <button
            onClick={handleCopy}
            className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-secondary rounded-lg"
          >
            {copied ? <Check className="w-5 h-5 text-accent" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
        <p className="text-foreground bg-secondary/50 p-4 rounded-lg leading-relaxed">
          {result.resultado.guion}
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Image className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Ideas de imagenes</h3>
        </div>
        <ul className="space-y-2">
          {result.resultado.ideas_imagenes.map((idea, index) => (
            <li key={index} className="flex items-center gap-2 text-foreground">
              <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-medium">
                {index + 1}
              </span>
              {idea}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-card rounded-lg">
            <Video className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-foreground">Generacion de imagenes y videos</h3>
              <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Proximamente
              </span>
            </div>
            <p className="text-muted-foreground text-sm mt-1">
              Pronto podras generar imagenes y videos automaticamente basados en tu guion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
