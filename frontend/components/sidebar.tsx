"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, CreditCard, Sparkles, Zap } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/scripts", label: "Scripts", icon: FileText },
  { href: "/pricing", label: "Pricing", icon: CreditCard },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 glass-card flex flex-col min-h-screen border-r border-white/40">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg glow-orange">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center animate-pulse">
              <Zap className="w-2.5 h-2.5 text-white" />
            </div>
          </div>
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ShopifyAI
            </span>
            <p className="text-xs text-muted-foreground">Marketing Copilot</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-2">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg glow-orange"
                      : "text-muted-foreground hover:bg-white/60 hover:text-foreground hover:shadow-md"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg transition-all ${
                      isActive
                        ? "bg-white/20"
                        : "bg-muted/50 group-hover:bg-primary/10"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "" : "group-hover:text-primary"}`} />
                  </div>
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 mx-4 mb-4 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Potenciado por IA</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Genera contenido de marketing profesional en segundos.
        </p>
      </div>
    </aside>
  );
}
