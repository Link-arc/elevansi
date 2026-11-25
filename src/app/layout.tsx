import type { Metadata } from "next";
import "./globals.css";
import { FAQS, STUDIO_INFO } from "@/data/studio";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${STUDIO_INFO.brandName} — Jasa Landing Page, Web UMKM & Sistem ERP`,
    template: `%s | ${STUDIO_INFO.brandName}`,
  },
  description:
    "Software studio di Palembang & melayani seluruh Indonesia. Fokus jasa pembuatan Landing Page, Aplikasi Web UMKM tanpa login, dan Sistem ERP Custom sesuai SOP bisnis Anda.",
  keywords: [
    "jasa landing page",
    "jasa pembuatan website umkm",
    "jasa pembuatan sistem ERP custom",
    "jasa website palembang",
    "software studio indonesia",
    "Elevansi Digital",
    "Next.js",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: STUDIO_INFO.brandName,
    title: `${STUDIO_INFO.brandName} — Jasa Landing Page, Web UMKM & Sistem ERP`,
    description:
      "Jasa pembuatan Landing Page cepat & SEO-ready, Web App UMKM tanpa ribet login, serta Sistem ERP Custom (Stok, Penjualan, Kas & Multi-Role).",
  },
  twitter: {
    card: "summary_large_image",
    title: `${STUDIO_INFO.brandName} — Jasa Landing Page, Web UMKM & Sistem ERP`,
    description:
      "Software studio di Indonesia untuk Landing Page, Web UMKM, dan Sistem ERP Custom siap pakai.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      name: STUDIO_INFO.brandName,
      url: siteUrl,
      email: STUDIO_INFO.email,
      description:
        "Software studio yang melayani jasa pembuatan Landing Page, Aplikasi Web UMKM, dan Sistem ERP Custom di Indonesia.",
      founder: {
        "@type": "Person",
        name: STUDIO_INFO.founderName,
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Palembang",
        addressRegion: "Sumatera Selatan",
        addressCountry: "ID",
      },
      areaServed: {
        "@type": "Country",
        name: "Indonesia",
      },
      priceRange: "Rp 700.000 - Rp 8.000.000+",
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#FAFAFA] font-sans text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900">
        {children}
      </body>
    </html>
  );
}
