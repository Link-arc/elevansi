"use client";

import { useState } from "react";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Layers,
  LayoutTemplate,
  Mail,
  MapPin,
  MessageSquareText,
  Sparkles,
  Store,
} from "lucide-react";
import {
  PRICING_TIERS,
  SERVICES,
  STUDIO_INFO,
  TRUST_STATS,
  WORKFLOW_STEPS,
} from "@/data/studio";
import { Navbar } from "@/components/Navbar";
import { PortfolioSection } from "@/components/PortfolioSection";
import { ConsultationChat } from "@/components/ConsultationChat";
import { FaqAccordion } from "@/components/FaqAccordion";

function ServiceIcon({
  name,
}: {
  name: "layout" | "store" | "building" | "layers";
}) {
  const cls = "h-5 w-5 text-blue-600";
  switch (name) {
    case "layout":
      return <LayoutTemplate className={cls} />;
    case "store":
      return <Store className={cls} />;
    case "building":
      return <Building2 className={cls} />;
    case "layers":
      return <Layers className={cls} />;
  }
}

export function HomeClient() {
  const [floatingChatOpen, setFloatingChatOpen] = useState(false);
  const [externalPrompt, setExternalPrompt] = useState<string | null>(null);

  const openChatWithPrompt = (prompt?: string) => {
    if (prompt) {
      setExternalPrompt(prompt);
    }
    setFloatingChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900">
      <Navbar onOpenChat={openChatWithPrompt} />

      <main>
        {/* 1. HERO SECTION */}
        <section className="relative overflow-hidden border-b border-slate-200/80 bg-white bg-subtle-grid">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-blue-50/70 to-transparent" />
          <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-24 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/90 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 shadow-2xs">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                {STUDIO_INFO.availability} • Palembang &amp; Remote Indonesia
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[54px] lg:leading-[1.1]">
                Jasa Pembuatan{" "}
                <span className="text-blue-600">
                  Landing Page, Web UMKM &amp; Sistem ERP
                </span>{" "}
                Siap Pakai
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                <strong className="font-semibold text-slate-900">
                  {STUDIO_INFO.brandName}
                </strong>{" "}
                membantu UMKM, toko daerah, dan perusahaan membangun website
                profil bisnis, aplikasi order tanpa ribet login, hingga sistem
                ERP operasional custom — cepat, rapi, dan sesuai alur kerja
                Anda.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => openChatWithPrompt()}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:bg-blue-600 sm:w-auto cursor-pointer"
                >
                  <Sparkles className="h-4 w-4" />
                  Konsultasi Gratis via Asisten AI
                </button>
                <a
                  href="#studi-kasus"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-2xs transition-all hover:border-slate-300 hover:bg-slate-50 sm:w-auto"
                >
                  Lihat Studi Kasus &amp; Produk
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Trust Metrics Strip */}
            <div className="mt-16 grid grid-cols-2 gap-4 rounded-2xl border border-slate-200/90 bg-white/95 p-6 shadow-xs backdrop-blur-xs md:grid-cols-4">
              {TRUST_STATS.map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <p className="text-xl font-extrabold tracking-tight text-slate-950 sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. SERVICES SECTION */}
        <section id="layanan" className="scroll-mt-20 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                Fokus Layanan Jasa
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                Dirancang Khusus untuk Kebutuhan Bisnis &amp; Operasional Anda
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                Dari website penawaran yang langsung mendatangkan chat WhatsApp,
                aplikasi web toko daerah, sampai sistem ERP internal yang
                merapikan stok dan pembukuan.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {SERVICES.map((service) => (
                <div
                  key={service.id}
                  className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition-all hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
                    <ServiceIcon name={service.iconName} />
                  </div>
                  <h3 className="mt-4 text-lg font-extrabold text-slate-950">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {service.description}
                  </p>
                  <ul className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-xs font-medium text-slate-700"
                      >
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. CLIENT CASE STUDIES + IN-HOUSE PRODUCTS */}
        <div className="border-t border-slate-200/80 bg-white">
          <PortfolioSection onAskAboutService={openChatWithPrompt} />
        </div>

        {/* 4. WORKFLOW SECTION */}
        <section
          id="alur-kerja"
          className="scroll-mt-20 border-t border-slate-200/80 bg-white py-20 sm:py-24"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                Alur Kerja
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                Proses Jelas dari Diskusi SOP Sampai Sistem Go-Live
              </h2>
              <p className="mt-3 text-base text-slate-600">
                Setiap tahapan terukur dan bisa Anda pantau langsung agar hasil
                akhir benar-benar cocok dipakai tim dan pelanggan Anda.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {WORKFLOW_STEPS.map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-slate-200/90 bg-[#FAFAFA] p-6"
                >
                  <span className="inline-block rounded-lg bg-blue-50 px-2.5 py-1 font-mono text-xs font-bold text-blue-700">
                    Langkah {item.step}
                  </span>
                  <h3 className="mt-4 text-base font-extrabold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. PRICING / ESTIMATION SECTION */}
        <section
          id="paket"
          className="scroll-mt-20 border-t border-slate-200/80 bg-[#FAFAFA] py-20 sm:py-24"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Estimasi Investasi Jasa
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                Transparan, Fleksibel &amp; Bisa Pembayaran Bertahap
              </h2>
              <p className="mt-3 text-base text-slate-600">
                Setiap project dapat disesuaikan dengan prioritas fitur dan
                skala bisnis Anda.{" "}
                <strong className="font-semibold text-slate-900">
                  Tanpa jebakan biaya perpanjangan 50%/tahun
                </strong>{" "}
                — full source code menjadi milik Anda sepenuhnya.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {PRICING_TIERS.map((tier) => (
                <div
                  key={tier.id}
                  className={`flex flex-col rounded-2xl border p-7 ${
                    tier.highlighted
                      ? "border-blue-600 bg-white shadow-xl shadow-blue-600/10 ring-1 ring-blue-600"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-extrabold text-slate-950">
                      {tier.name}
                    </h3>
                    {tier.badge && (
                      <span className="rounded-full bg-blue-600 px-2.5 py-0.5 text-[11px] font-bold text-white">
                        {tier.badge}
                      </span>
                    )}
                  </div>

                  <div className="mt-4">
                    <p className="text-3xl font-extrabold tracking-tight text-slate-950">
                      {tier.priceRange}
                    </p>
                    <p className="mt-1 font-mono text-xs font-medium text-slate-500">
                      {tier.timeline}
                    </p>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    {tier.description}
                  </p>

                  <ul className="mt-6 flex-1 space-y-2.5 border-t border-slate-200/80 pt-5">
                    {tier.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2.5 text-sm text-slate-700"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() =>
                      openChatWithPrompt(
                        `Halo, saya tertarik dengan paket ${tier.name} (${tier.priceRange}). Boleh jelaskan detailnya?`
                      )
                    }
                    className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors cursor-pointer ${
                      tier.highlighted
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-slate-900 text-white hover:bg-blue-600"
                    }`}
                  >
                    Tanya Paket Ini
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. INTERACTIVE Q&A & AI CONSULTATION CHAT */}
        <ConsultationChat
          floatingOpen={floatingChatOpen}
          onToggleFloating={setFloatingChatOpen}
          externalPrompt={externalPrompt}
          onConsumeExternalPrompt={() => setExternalPrompt(null)}
        />

        {/* 7. FAQ SECTION */}
        <section id="faq" className="scroll-mt-20 py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                Pertanyaan Umum (FAQ)
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                Hal yang Sering Ditanyakan Klien
              </h2>
            </div>

            <div className="mt-10">
              <FaqAccordion />
            </div>
          </div>
        </section>

        {/* 8. FINAL CTA BANNER */}
        <section className="pb-20 sm:pb-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-slate-200 bg-slate-900 px-6 py-12 text-center text-white shadow-xl sm:px-12 sm:py-16">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-blue-200">
                <Sparkles className="h-3.5 w-3.5" />
                Konsultasi Awal Gratis &amp; Tanpa Komitmen
              </span>
              <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
                Siap Rapikan Bisnis Anda dengan Website atau Sistem ERP Custom?
              </h2>
              <p className="mx-auto mt-3.5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                Kirim gambaran singkat kebutuhan usaha Anda lewat WhatsApp atau
                email. Kami bantu buatkan estimasi fitur, biaya, dan jadwal
                pengerjaannya.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={`https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encodeURIComponent(
                    `Halo ${STUDIO_INFO.brandName}, saya ingin konsultasi pembuatan Landing Page / Web UMKM / Sistem ERP.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500 sm:w-auto"
                >
                  <MessageSquareText className="h-4 w-4" />
                  Chat WhatsApp Sekarang
                </a>
                <a
                  href={`mailto:${STUDIO_INFO.email}?subject=${encodeURIComponent(
                    `Konsultasi Project — ${STUDIO_INFO.brandName}`
                  )}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
                >
                  <Mail className="h-4 w-4" />
                  {STUDIO_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <div>
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 font-mono text-xs font-bold text-white">
                E.
              </span>
              <span className="text-sm font-extrabold text-slate-950">
                {STUDIO_INFO.brandName}
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              {STUDIO_INFO.tagline} • Dipimpin oleh{" "}
              <span className="font-semibold text-slate-700">
                {STUDIO_INFO.founderName}
              </span>
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-xs text-slate-400">
              <MapPin className="h-3 w-3" />
              {STUDIO_INFO.location}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-medium text-slate-500">
            <a href="#layanan" className="hover:text-slate-900">
              Layanan
            </a>
            <a href="#studi-kasus" className="hover:text-slate-900">
              Studi Kasus
            </a>
            <a href="#produk-kami" className="hover:text-slate-900">
              Produk Kami
            </a>
            <a href="#paket" className="hover:text-slate-900">
              Estimasi
            </a>
            <a
              href={`mailto:${STUDIO_INFO.email}`}
              className="hover:text-slate-900"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
