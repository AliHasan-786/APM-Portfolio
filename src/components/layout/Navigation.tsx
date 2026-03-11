"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Sparkles, UserCheck } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "TrustScore Engine", icon: <Shield className="w-4 h-4" /> },
    { href: "/creator-aegis", label: "Creator Aegis", icon: <UserCheck className="w-4 h-4" /> },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="flex h-16 items-center px-4 md:px-8 max-w-7xl mx-auto justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-tiktok-cyan" />
          <span className="font-bold tracking-tight">Ali Hasan Portfolio</span>
        </div>
        <nav className="flex items-center gap-1 md:gap-4 bg-zinc-900/50 p-1 rounded-full border border-white/5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-full text-sm font-medium transition-all ${pathname === link.href
                ? "bg-white text-black shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
