import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ShopifyAI - Iniciar Sesion",
  description: "Inicia sesion o crea tu cuenta en ShopifyAI",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
