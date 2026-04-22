"use client";

import { useState } from "react";
import { Loader2, Sparkles, Wand2 } from "lucide-react";

interface ScriptFormProps {
  onSubmit: (producto: string, tono: string, idioma: string) => Promise<void>;
  isLoading: boolean;
  isStoreConnected?: boolean;
}

const tonos = [
  { value: "profesional", label: "Profesional" },
  { value: "casual", label: "Casual" },
  { value: "divertido", label: "Divertido" },
  { value: "urgente", label: "Urgente" },
  { value: "inspirador", label: "Inspirador" },
];

const idiomas = [
  { value: "espanol", label: "Espanol" },
  { value: "ingles", label: "Ingles" },
  { value: "portugues", label: "Portugues" },
];

export function ScriptForm({ onSubmit, isLoading, isStoreConnected = true }: ScriptFormProps) {
  const [producto, setProducto] = useState("");
  const [tono, setTono] = useState("profesional");
  const [idioma, setIdioma] = useState("espanol");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!producto.trim() || !isStoreConnected) return;
    await onSubmit(producto, tono, idioma);
  };

  if (!isStoreConnected) {
    return (
      <div className="glass-card rounded-3xl p-8 text-center glow-orange">
        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">
          Conecta tu tienda primero
        </h3>
        <p className="text-muted-foreground">
          Para generar guiones personalizados, necesitas conectar tu tienda Shopify.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl">
          <Wand2 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">Generar guion</h2>
          <p className="text-sm text-muted-foreground">Crea contenido de marketing con IA</p>
        </div>
      </div>
      
      <div className="space-y-5">
        <div>
          <label htmlFor="producto" className="block text-sm font-semibold text-foreground mb-2">
            Producto
          </label>
          <input
            id="producto"
            type="text"
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
            placeholder="Ej: Zapatos deportivos Nike Air Max"
            className="w-full px-5 py-4 border border-border/50 rounded-2xl bg-white/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="tono" className="block text-sm font-semibold text-foreground mb-2">
              Tono
            </label>
            <select
              id="tono"
              value={tono}
              onChange={(e) => setTono(e.target.value)}
              className="w-full px-5 py-4 border border-border/50 rounded-2xl bg-white/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all appearance-none cursor-pointer"
            >
              {tonos.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="idioma" className="block text-sm font-semibold text-foreground mb-2">
              Idioma
            </label>
            <select
              id="idioma"
              value={idioma}
              onChange={(e) => setIdioma(e.target.value)}
              className="w-full px-5 py-4 border border-border/50 rounded-2xl bg-white/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all appearance-none cursor-pointer"
            >
              {idiomas.map((i) => (
                <option key={i.value} value={i.value}>
                  {i.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !producto.trim()}
          className="w-full bg-gradient-to-r from-primary to-primary/80 text-white py-4 rounded-2xl font-semibold hover:shadow-xl hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none flex items-center justify-center gap-2 glow-orange"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generando guion...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generar guion
            </>
          )}
        </button>
      </div>
    </form>
  );
}
