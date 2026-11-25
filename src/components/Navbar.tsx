"use client";

import { useState } from "react";
import { Menu, MessageSquareText, Sparkles, X } from "lucide-react";
import { STUDIO_INFO } from "@/data/studio";

interface NavbarProps {
  onOpenChat: (prefill?: string) => void;
}

const NAV_LINKS = [
  { href: "#layanan", label: "Layanan" },
  { href: "#studi-kasus", label: "Studi Kasus" },
  { href: "#produk-kami", label: "Produk Kami" },
  { href: "#paket", label: "Estimasi" },
  { href: "#tanya-ai", label: "Tanya AI" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar({ onOpenChat }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2.5 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white font-mono text-sm font-bold shadow-xs transition-transform group-hover:scale-105">
            E.
          </span>
          <div className="leading-tight">
            <span className="block text-sm font-extrabold tracking-tight text-slate-900">
              {STUDIO_INFO.brandName}
            </span>
            <span className="block text-[11px] font-medium text-slate-500">
              Web, UMKM &amp; ERP Studio
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-950"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden items-center gap-2.5 md:flex">
          <button
            type="button"
            onClick={() => onOpenChat()}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition-all hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-700 cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            Tanya Asisten AI
          </button>
          <a
            href={`https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encodeURIComponent(
              `Halo ${STUDIO_INFO.brandName}, saya ingin konsultasi pembuatan Website / Sistem ERP untuk bisnis saya.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-all hover:bg-blue-600"
          >
            <MessageSquareText className="h-3.5 w-3.5" />
            Konsultasi Gratis
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 md:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 pb-5 pt-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenChat();
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-800"
            >
              <Sparkles className="h-4 w-4 text-blue-600" />
              Tanya Asisten AI
            </button>
            <a
              href={`https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encodeURIComponent(
                `Halo ${STUDIO_INFO.brandName}, saya ingin konsultasi pembuatan Website / ERP.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white"
            >
              <MessageSquareText className="h-4 w-4" />
              Konsultasi WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
