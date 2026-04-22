"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";

interface ScriptFormProps {
  onSubmit: (producto: string, tono: string, idioma: string) => Promise<void>;
  isLoading: boolean;
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

export function ScriptForm({ onSubmit, isLoading }: ScriptFormProps) {
  const [producto, setProducto] = useState("");
  const [tono, setTono] = useState("profesional");
  const [idioma, setIdioma] = useState("espanol");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!producto.trim()) return;
    await onSubmit(producto, tono, idioma);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Generar guion</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="producto" className="block text-sm font-medium text-foreground mb-2">
            Producto
          </label>
          <input
            id="producto"
            type="text"
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
            placeholder="Ej: Zapatos deportivos"
            className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            required
          />
        </div>

        <div>
          <label htmlFor="tono" className="block text-sm font-medium text-foreground mb-2">
            Tono
          </label>
          <select
            id="tono"
            value={tono}
            onChange={(e) => setTono(e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {tonos.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="idioma" className="block text-sm font-medium text-foreground mb-2">
            Idioma
          </label>
          <select
            id="idioma"
            value={idioma}
            onChange={(e) => setIdioma(e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {idiomas.map((i) => (
              <option key={i.value} value={i.value}>
                {i.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading || !producto.trim()}
          className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generando...
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
