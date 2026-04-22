export interface User {
  nombre: string;
  plan: string;
  tokens_restantes: number;
}

export interface HomeInsightsResponse {
  usuario: {
    nombre: string;
    plan: string;
    tokens_restantes: number;
  };
  resultado: {
    ventas_totales: number;
    carritos_abandonados: number;
    producto_estrella: string;
    productos_muertos: string[];
  };
  tokens_restantes: number;
  recomendacion: string;
}

export interface ScriptResponse {
  usuario?: {
    nombre: string;
    plan: string;
    tokens_restantes: number;
  };
  resultado?: {
    producto: string;
    guion: string;
    ideas_imagenes: string[];
    proximamente: string;
  };
  tokens_restantes?: number;
  error?: string;
  recomendacion?: string;
}

export interface Plan {
  tokens: number;
  beneficios: string[];
}

export interface PricingResponse {
  planes: {
    Free: Plan;
    Pro: Plan;
    Premium: Plan;
  };
}
