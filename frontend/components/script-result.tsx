"use client";

import { Copy, Check, Image, Video, Clock, FileText, Sparkles } from "lucide-react";
import { useState } from "react";
import type { ScriptResponse } from "@/lib/types";

interface ScriptResultProps {
  result: ScriptResponse;
}

export function ScriptResult({ result }: ScriptResultProps) {
  const [copied, setCopied] = useState(false);

  if (result.error) {
    return (
      <div className="glass-card rounded-3xl p-8 border-destructive/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-destructive/10 rounded-xl">
            <FileText className="w-5 h-5 text-destructive" />
          </div>
          <h3 className="text-lg font-bold text-destructive">Error</h3>
        </div>
        <p className="text-foreground bg-destructive/5 p-4 rounded-2xl">{result.error}</p>
        {result.recomendacion && (
          <p className="mt-4 text-muted-foreground text-sm">{result.recomendacion}</p>
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
      {/* Generated Script */}
      <div className="glass-card rounded-3xl p-8 glow-green">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-accent/20 to-accent/5 rounded-xl">
              <FileText className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Guion generado</h3>
              <p className="text-sm text-muted-foreground">Para: {result.resultado.producto}</p>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="p-3 hover:bg-white/60 rounded-xl transition-all group"
            title="Copiar guion"
          >
            {copied ? (
              <Check className="w-5 h-5 text-accent" />
            ) : (
              <Copy className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
            )}
          </button>
        </div>
        <p className="text-foreground bg-white/50 p-5 rounded-2xl leading-relaxed border border-border/30">
          {result.resultado.guion}
        </p>
      </div>

      {/* Image Ideas */}
      <div className="glass-card rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl">
            <Image className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">Ideas de imagenes</h3>
            <p className="text-sm text-muted-foreground">Sugerencias visuales para tu campana</p>
          </div>
        </div>
        <ul className="space-y-3">
          {result.resultado.ideas_imagenes.map((idea, index) => (
            <li 
              key={index} 
              className="flex items-center gap-3 p-4 bg-white/50 rounded-2xl border border-border/30 hover:shadow-md transition-all"
            >
              <span className="w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 text-primary rounded-xl flex items-center justify-center text-sm font-bold">
                {index + 1}
              </span>
              <span className="text-foreground">{idea}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Coming Soon */}
      <div className="glass-card rounded-3xl p-8 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-white/80 rounded-2xl shadow-lg">
            <Video className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-foreground">Generacion de imagenes y videos</h3>
              <span className="px-3 py-1 bg-gradient-to-r from-primary to-accent text-white text-xs rounded-full flex items-center gap-1.5 font-medium">
                <Clock className="w-3 h-3" />
                Proximamente
              </span>
            </div>
            <p className="text-muted-foreground">
              Pronto podras generar imagenes y videos automaticamente basados en tu guion.
            </p>
          </div>
          <div className="hidden md:block">
            <Sparkles className="w-10 h-10 text-primary/30 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
