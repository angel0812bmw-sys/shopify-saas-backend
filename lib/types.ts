export interface User {
  id?: string;
  email: string;
  nombre: string;
  plan: "Free" | "Pro" | "Premium";
  tokens_restantes: number;
  tienda_conectada: boolean;
  shop_id?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
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
  nombre: string;
  precio: number;
  tokens: number;
  productos_limite: number | "ilimitado";
  beneficios: string[];
  popular?: boolean;
}

export interface PricingResponse {
  planes: {
    Free: Plan;
    Pro: Plan;
    Premium: Plan;
  };
}

export interface Alert {
  id: string;
  tipo: "producto_muerto" | "tendencia" | "carrito_abandonado";
  mensaje: string;
  producto?: string;
  fecha: string;
  leido: boolean;
}
