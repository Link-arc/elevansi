"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  Car,
  CheckCircle2,
  ExternalLink,
  LayoutTemplate,
  MessageSquareText,
  Sparkles,
  X,
} from "lucide-react";
import {
  IN_HOUSE_PRODUCTS,
  SERVICE_PROJECTS,
  type ServiceProject,
} from "@/data/studio";
import { ProjectMockup } from "@/components/ProjectMockup";

interface PortfolioSectionProps {
  onAskAboutService: (prompt: string) => void;
}

export function PortfolioSection({ onAskAboutService }: PortfolioSectionProps) {
  const [selectedProject, setSelectedProject] = useState<ServiceProject | null>(
    null
  );

  const warung = SERVICE_PROJECTS[0];

  return (
    <>
      {/* SECTION A: STUDI KASUS JASA (WARUNG + SOLUSI ERP & LANDING PAGE) */}
      <section id="studi-kasus" className="scroll-mt-20 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              Studi Kasus Layanan Jasa
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Sistem Praktis yang Langsung Membantu Operasional Bisnis
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Kami fokus membangun solusi yang benar-benar dipakai di lapangan:
              mulai dari aplikasi web UMKM tanpa ribet login, Landing Page
              konversi tinggi, hingga Sistem ERP internal perusahaan.
            </p>
          </div>

          {/* Featured Client Solution: Warung Berkah Makmur */}
          <article className="mt-10 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm">
            <div className="grid lg:grid-cols-12">
              <div className="flex flex-col justify-between bg-gradient-to-br from-amber-50/70 via-stone-50 to-white p-6 lg:col-span-5 lg:border-r lg:border-slate-100">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${warung.accentSoft} ${warung.accentColor} ${warung.accentBorder}`}
                  >
                    {warung.category}
                  </span>
                  <span className="rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-[11px] font-semibold text-slate-700">
                    {warung.status}
                  </span>
                </div>

                <div className="my-4">
                  <ProjectMockup type="warung" />
                </div>

                <div className="grid grid-cols-3 gap-2 rounded-xl border border-slate-200/80 bg-white p-3">
                  {warung.metrics.map((m) => (
                    <div key={m.label}>
                      <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                        {m.label}
                      </p>
                      <p className="mt-0.5 text-xs font-bold text-slate-800">
                        {m.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-7">
                <div>
                  <h3 className="text-2xl font-extrabold tracking-tight text-slate-950">
                    {warung.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-slate-500">
                    {warung.tagline}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    {warung.summary}
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {warung.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-slate-700"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {warung.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-slate-200/80 bg-slate-50 px-2.5 py-0.5 font-mono text-[11px] font-medium text-slate-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-7 flex flex-col gap-2.5 border-t border-slate-100 pt-5 sm:flex-row">
                  {warung.liveUrl && (
                    <a
                      href={warung.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-blue-600"
                    >
                      Buka Live Demo
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setSelectedProject(warung)}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 cursor-pointer"
                  >
                    Detail Studi Kasus
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      onAskAboutService(
                        "Saya tertarik bikin web sistem UMKM seperti Warung Berkah Makmur. Kisaran biaya dan estimasi pengerjaannya berapa?"
                      )
                    }
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50/70 px-4 py-2.5 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-100/70 cursor-pointer"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                    Tanya Estimasi
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* Three Ready-to-Build Service Solution Cards: Rental Mobil, ERP & Landing Page */}
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-[#FAFAFA] p-6">
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-amber-700">
                    <Car className="h-5 w-5" />
                  </span>
                  <span className="rounded-full border border-amber-200 bg-white px-2.5 py-0.5 text-[11px] font-semibold text-amber-800">
                    Web UMKM • Live Demo
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-extrabold text-slate-950">
                  Web Rental Mobil &amp; Booking
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Katalog armada lengkap, pilihan Lepas Kunci / Dengan Sopir,
                  kalkulator total harga otomatis, dan booking 1 klik langsung
                  ke WhatsApp tanpa login.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/demo/rental"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-600"
                >
                  Coba Demo Rental
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    onAskAboutService(
                      "Saya tertarik bikin website Rental Mobil / Booking seperti di demo. Kisaran biayanya berapa?"
                    )
                  }
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-900 cursor-pointer"
                >
                  Tanya Estimasi
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-[#FAFAFA] p-6">
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-700">
                    <Building2 className="h-5 w-5" />
                  </span>
                  <span className="rounded-full border border-blue-200 bg-white px-2.5 py-0.5 text-[11px] font-semibold text-blue-700">
                    B2B • Live Demo
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-extrabold text-slate-950">
                  Sistem ERP &amp; Operasional Custom
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Kelola stok gudang, invoice otomatis potong stok, kas &amp;
                  laporan, hingga hak akses multi-role (Owner, Gudang, Kasir)
                  sesuai SOP bisnis Anda.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/demo/erp"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-600"
                >
                  Coba Demo ERP
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    onAskAboutService(
                      "Saya butuh Sistem ERP Custom untuk operasional bisnis saya. Modul apa saja yang bisa dibuat dan kisaran biayanya?"
                    )
                  }
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-800 cursor-pointer"
                >
                  Tanya Estimasi
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-[#FAFAFA] p-6">
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700">
                    <LayoutTemplate className="h-5 w-5" />
                  </span>
                  <span className="rounded-full border border-emerald-200 bg-white px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
                    Mulai Rp 700 rb
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-extrabold text-slate-950">
                  Landing Page &amp; Company Profile
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Tampilkan kredibilitas usaha Anda di Google dengan desain
                  cepat &amp; modern. Tanpa jebakan perpanjangan 50%/tahun,
                  langsung terhubung ke WhatsApp Anda.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  onAskAboutService(
                    "Saya mau bikin Landing Page mulai Rp 700 rb untuk bisnis saya. Proses dan ketentuannya gimana?"
                  )
                }
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
              >
                Tanya Paket Mulai 700rb
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B: PRODUK INTERNAL ELV2878 LAB (IN-HOUSE PRODUCTS) */}
      <section
        id="produk-kami"
        className="scroll-mt-20 border-t border-slate-200/80 bg-[#FAFAFA] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                Produk Internal Elevansi Digital (In-House Products)
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                Produk Digital yang Kami Bangun &amp; Operasikan Sendiri
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                Selain mengerjakan layanan jasa untuk klien, Elevansi Digital juga
                mengembangkan dan merilis produk SaaS/aplikasi milik sendiri —
                sebagai bukti nyata standar kualitas engineering kami di dunia
                produksi.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {IN_HOUSE_PRODUCTS.map((product) => (
              <article
                key={product.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg"
              >
                <div className="relative">
                  <ProjectMockup type={product.mockupType} />
                  <div className="absolute left-3.5 top-3.5 flex flex-wrap items-center gap-1.5">
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${product.accentSoft} ${product.accentColor} ${product.accentBorder}`}
                    >
                      {product.industry}
                    </span>
                    <span className="rounded-full border border-slate-200/90 bg-white/95 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600">
                      {product.status}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-extrabold tracking-tight text-slate-950">
                    {product.name}
                  </h3>
                  <p className="mt-0.5 text-xs font-medium text-slate-500">
                    {product.tagline}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {product.summary}
                  </p>

                  <ul className="mt-4 space-y-1.5">
                    {product.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-xs text-slate-600"
                      >
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {product.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-slate-200/80 bg-slate-50 px-2 py-0.5 font-mono text-[10px] font-medium text-slate-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <a
                      href={product.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-800 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                    >
                      <span>Kunjungi {product.displayDomain}</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Detail Modal (Service Project) */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-xs"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-6 py-4 backdrop-blur-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${selectedProject.accentSoft} ${selectedProject.accentColor} ${selectedProject.accentBorder}`}
                  >
                    {selectedProject.category}
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    {selectedProject.platform}
                  </span>
                </div>
                <h3 className="mt-1 text-xl font-extrabold text-slate-950">
                  {selectedProject.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Tutup modal"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-6 p-6">
              <p className="text-sm leading-relaxed text-slate-600">
                {selectedProject.summary}
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Masalah yang Diselesaikan
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    {selectedProject.problem}
                  </p>
                </div>
                <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700">
                    Solusi dari Elevansi Digital
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    {selectedProject.solution}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Fitur &amp; Kemampuan Utama
                </h4>
                <ul className="mt-3 space-y-2.5">
                  {selectedProject.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-slate-700"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-2.5 border-t border-slate-100 pt-5 sm:flex-row">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                  >
                    Buka Live Demo
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => {
                    const name = selectedProject.name;
                    setSelectedProject(null);
                    onAskAboutService(
                      `Saya tertarik bikin web sistem UMKM mirip ${name}, kisaran biaya dan timeline-nya berapa ya?`
                    );
                  }}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-blue-700 cursor-pointer"
                >
                  <MessageSquareText className="h-4 w-4" />
                  Mau Bikin Sistem Serupa? Tanya AI
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
