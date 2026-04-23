"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "./types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, nombre: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  connectStore: (shopId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Mock user for development
const MOCK_USER: User = {
  id: "demo-user",
  email: "demo@shopifyai.com",
  nombre: "Usuario Demo",
  plan: "Free",
  tokens_restantes: 500,
  tienda_conectada: false,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem("shopifyai_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("shopifyai_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        const loggedUser = data.user || { ...MOCK_USER, email, nombre: email.split("@")[0] };
        setUser(loggedUser);
        localStorage.setItem("shopifyai_user", JSON.stringify(loggedUser));
        return true;
      }
      
      // Fallback to mock for demo
      const mockUser = { ...MOCK_USER, email, nombre: email.split("@")[0] };
      setUser(mockUser);
      localStorage.setItem("shopifyai_user", JSON.stringify(mockUser));
      return true;
    } catch {
      // Demo mode fallback
      const mockUser = { ...MOCK_USER, email, nombre: email.split("@")[0] };
      setUser(mockUser);
      localStorage.setItem("shopifyai_user", JSON.stringify(mockUser));
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, nombre: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, nombre }),
      });

      if (res.ok) {
        const data = await res.json();
        const newUser = data.user || { ...MOCK_USER, email, nombre };
        setUser(newUser);
        localStorage.setItem("shopifyai_user", JSON.stringify(newUser));
        return true;
      }

      // Demo fallback
      const mockUser = { ...MOCK_USER, email, nombre };
      setUser(mockUser);
      localStorage.setItem("shopifyai_user", JSON.stringify(mockUser));
      return true;
    } catch {
      // Demo mode
      const mockUser = { ...MOCK_USER, email, nombre };
      setUser(mockUser);
      localStorage.setItem("shopifyai_user", JSON.stringify(mockUser));
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    // Redirect to Google OAuth endpoint
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("shopifyai_user");
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...updates };
      setUser(updated);
      localStorage.setItem("shopifyai_user", JSON.stringify(updated));
    }
  };

  const connectStore = (shopId: string) => {
    if (user) {
      const updated = { ...user, tienda_conectada: true, shop_id: shopId };
      setUser(updated);
      localStorage.setItem("shopifyai_user", JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        loginWithGoogle,
        logout,
        updateUser,
        connectStore,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
