export interface ServiceProject {
  id: string;
  name: string;
  tagline: string;
  category: string;
  platform: string;
  status: string;
  liveUrl?: string;
  accentColor: string;
  accentSoft: string;
  accentBorder: string;
  summary: string;
  problem: string;
  solution: string;
  highlights: string[];
  techStack: string[];
  metrics: { label: string; value: string }[];
  mockupType: "warung";
}

export interface InHouseProduct {
  id: string;
  name: string;
  tagline: string;
  industry: string;
  status: string;
  liveUrl: string;
  displayDomain: string;
  accentColor: string;
  accentSoft: string;
  accentBorder: string;
  summary: string;
  highlights: string[];
  techStack: string[];
  mockupType: "giziku" | "rangkumin" | "bertani";
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  iconName: "layout" | "store" | "building" | "layers";
}

export interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  priceRange: string;
  timeline: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const STUDIO_INFO = {
  brandName: "Elevansi Digital",
  founderName: "Indra Elvian",
  tagline: "Software Studio — Jasa Landing Page, Web UMKM & Sistem ERP",
  location: "Palembang, Indonesia (Melayani Klien Seluruh Indonesia & Remote)",
  email: "indra.elvian@gmail.com",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281234567890",
  availability: "Tersedia untuk Project Jasa Baru",
};

export const TRUST_STATS = [
  { value: "Landing Page", label: "Cepat, SEO-Ready & Siap Jualan" },
  { value: "Web UMKM", label: "Sistem Order, Booking & Nota" },
  { value: "ERP Custom", label: "Stok, Keuangan & Operasional" },
  { value: "3 Produk Live", label: "In-House Product Berjalan Nyata" },
];

export const SERVICES: ServiceItem[] = [
  {
    id: "landing-page",
    title: "Landing Page & Company Profile",
    description:
      "Website profil bisnis dan halaman penawaran yang bersih, cepat dibuka di HP, teroptimasi untuk Google, dan dirancang agar pengunjung langsung menghubungi WhatsApp Anda.",
    deliverables: [
      "Desain custom clean & responsif di semua layar",
      "Optimasi kecepatan muat & struktur SEO",
      "Integrasi tombol WhatsApp, formulir & Google Maps",
      "Bantuan setup domain, hosting & SSL",
    ],
    iconName: "layout",
  },
  {
    id: "web-umkm",
    title: "Aplikasi Web UMKM & Toko Daerah",
    description:
      "Solusi digital praktis untuk operasional toko, grosir, katering, maupun pengepul — seperti sistem Pre-Order (DP), booking jadwal, cek nota tanpa login, dan katalog produk.",
    deliverables: [
      "Alur transaksi simpel tanpa ribet login (frictionless)",
      "Sistem Pre-Order, DP, pelacakan nota & kalender booking",
      "Dashboard admin untuk update harga & kelola pesanan",
      "Tampilan mobile-first serasa aplikasi",
    ],
    iconName: "store",
  },
  {
    id: "erp-system",
    title: "Sistem ERP & Operasional Bisnis",
    description:
      "Bangun sistem manajemen internal custom sesuai SOP perusahaan Anda — mulai dari stok & gudang, pembelian/penjualan, kas & pembukuan, hingga laporan real-time.",
    deliverables: [
      "Modul inventori, gudang, supplier & stok opname",
      "Pencatatan penjualan, invoice, piutang & arus kas",
      "Manajemen multi-role (Admin, Kasir, Gudang, Owner)",
      "Export laporan Excel/PDF & dashboard analitik",
    ],
    iconName: "building",
  },
  {
    id: "maintenance-custom",
    title: "Integrasi Custom & Maintenance",
    description:
      "Pengembangan modul tambahan, integrasi notifikasi WhatsApp/API, migrasi sistem lama, hingga pemeliharaan server dan database agar sistem bisnis Anda selalu stabil.",
    deliverables: [
      "Integrasi payment gateway & notifikasi WhatsApp",
      "Setup Cloud & backup database berkala",
      "Garansi perbaikan bug pasca-rilis",
      "Serah terima full source code & dokumentasi",
    ],
    iconName: "layers",
  },
];

export const SERVICE_PROJECTS: ServiceProject[] = [
  {
    id: "warung",
    name: "Warung Berkah Makmur",
    tagline: "Web Commerce UMKM — Pre-Order DP, Booking Hajatan & Pengepul",
    category: "Jasa Web UMKM",
    platform: "Web App (PWA)",
    status: "Live Demo Tersedia",
    liveUrl: "https://warung-navy.vercel.app/",
    accentColor: "text-amber-800",
    accentSoft: "bg-amber-50",
    accentBorder: "border-amber-200",
    summary:
      "Aplikasi web serba ada daerah yang dirancang tanpa perlu login agar mudah dipakai pelanggan lokal: mendukung Pre-Order barang (bisa DP 30%), booking paket hajatan dengan kalender tanggal kosong, dan jual hasil bumi.",
    problem:
      "Pelanggan toko daerah dan UMKM sering enggan mendaftar akun/login yang rumit, sementara pemilik usaha butuh pencatatan DP, jadwal sewa hajatan, dan update harga hasil bumi yang transparan.",
    solution:
      "Web app Next.js bergaya marketplace yang super ringan, dilengkapi cek nota & status pelunasan tanpa login, kalender ketersediaan paket hajatan, papan harga harian pengepul, serta panel admin.",
    highlights: [
      "Alur belanja tanpa login (frictionless) — ramah untuk pasar lokal & UMKM",
      "Sistem Pre-Order dengan skema DP 30% dan pelacakan nomor nota online",
      "Booking paket hajatan lengkap dengan kalender ketersediaan tanggal",
      "Papan harga hasil bumi harian yang transparan + dashboard admin terintegrasi",
    ],
    techStack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS v4", "PWA"],
    metrics: [
      { label: "Akses Pelanggan", value: "Tanpa Login" },
      { label: "Modul Utama", value: "PO, Hajatan, Panen" },
      { label: "Platform", value: "Web Mobile-First" },
    ],
    mockupType: "warung",
  },
];

export const IN_HOUSE_PRODUCTS: InHouseProduct[] = [
  {
    id: "giziku-mobile",
    name: "Giziku AI",
    tagline: "Asisten Nutrisi & Kalori Berbasis Computer Vision",
    industry: "HealthTech AI",
    status: "Produk Internal • Live",
    liveUrl: "https://giziku-app.com",
    displayDomain: "giziku-app.com",
    accentColor: "text-emerald-700",
    accentSoft: "bg-emerald-50",
    accentBorder: "border-emerald-200",
    summary:
      "Produk HealthTech milik Elevansi Digital. Pengguna cukup memfoto piring makanannya untuk langsung mendapatkan estimasi kalori, rincian makronutrisi, serta tracking asupan & olahraga harian.",
    highlights: [
      "Scan foto makanan otomatis menjadi estimasi kalori & makro",
      "Tracking asupan harian, target kalori, dan workout",
      "Tersedia di Web & Android (Google Play)",
    ],
    techStack: ["React Native", "TypeScript", "Firebase", "Vision AI"],
    mockupType: "giziku",
  },
  {
    id: "rangkuminplus",
    name: "Rangkumin+",
    tagline: "AI Study Copilot — Scan Catatan Jadi Ringkasan & Kuis",
    industry: "EdTech AI",
    status: "Produk Internal • Live",
    liveUrl: "https://rangkuminplus.com",
    displayDomain: "rangkuminplus.com",
    accentColor: "text-blue-700",
    accentSoft: "bg-blue-50",
    accentBorder: "border-blue-200",
    summary:
      "Produk EdTech milik Elevansi Digital untuk pelajar dan profesional. Mengubah foto buku, dokumen, atau catatan menjadi ringkasan terstruktur, kuis latihan otomatis, dan AI Tutor 24/7.",
    highlights: [
      "Multimodal OCR dari foto buku & dokumen catatan",
      "Generator kuis interaktif otomatis & export PDF",
      "Tersedia di Web & Android (Google Play)",
    ],
    techStack: ["React Native", "TypeScript", "Gemini AI", "Supabase"],
    mockupType: "rangkumin",
  },
  {
    id: "bertani",
    name: "Bertani",
    tagline: "Aplikasi Pertanian Cerdas, Voice AI & Klinik Tanaman",
    industry: "AgriTech AI",
    status: "Produk Internal • Live",
    liveUrl: "https://ber-tani.com",
    displayDomain: "ber-tani.com",
    accentColor: "text-lime-800",
    accentSoft: "bg-lime-50",
    accentBorder: "border-lime-200",
    summary:
      "Produk AgriTech milik Elevansi Digital untuk membantu petani Indonesia mengelola multi-lahan GPS, mencatat aktivitas via Voice AI, diagnosa penyakit daun via kamera, cuaca, dan Buku Kas Tani.",
    highlights: [
      "Manajemen multi-lahan GPS & prakiraan cuaca/kelembapan",
      "Pencatatan aktivitas via suara (Voice AI) & Klinik Tanaman AI",
      "Buku Kas Tani & jejaring komunitas petani",
    ],
    techStack: ["React Native", "TypeScript", "Supabase", "Voice & Vision AI"],
    mockupType: "bertani",
  },
];

export const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Diskusi & Pemetaan SOP",
    description:
      "Ceritakan alur bisnis atau target website Anda. Kami bantu susun daftar fitur prioritas, estimasi biaya, dan timeline realistis secara gratis.",
  },
  {
    step: "02",
    title: "Desain UI & Struktur Data",
    description:
      "Sebelum masuk coding, kami rancang tampilan antarmuka yang bersih serta struktur modul/database agar mudah dipakai tim dan pelanggan Anda.",
  },
  {
    step: "03",
    title: "Development & Uji Coba",
    description:
      "Pengerjaan menggunakan Next.js & TypeScript modern dengan update progres rutin lewat link preview yang bisa langsung Anda tes.",
  },
  {
    step: "04",
    title: "Go-Live, Training & Garansi",
    description:
      "Website atau sistem ERP siap online di domain Anda, lengkap dengan panduan penggunaan untuk tim, serah terima source code, dan garansi bug.",
  },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "landing-page",
    name: "Landing Page & Web Profil",
    priceRange: "Mulai Rp 700 rb",
    timeline: "Estimasi 3–7 hari kerja",
    description:
      "Cocok untuk UMKM, rental mobil, jasa lokal, atau brand yang ingin tampil kredibel di Google dan langsung dapat order via WhatsApp.",
    features: [
      "Desain custom clean & cepat dibuka di HP",
      "Optimasi SEO dasar & tombol/form WhatsApp",
      "Bantuan setup domain & hosting gratis/murah",
      "Tanpa biaya perpanjangan tahunan 50%",
      "Full source code & garansi bug 30 hari",
    ],
  },
  {
    id: "web-umkm",
    name: "Web App & Sistem UMKM",
    badge: "Paling Diminati",
    priceRange: "Mulai Rp 3,5 jt",
    timeline: "Estimasi 2–4 minggu",
    description:
      "Seperti studi kasus Warung Berkah Makmur — cocok untuk toko daerah, grosir, katering, atau rental yang butuh alur order & admin rapi.",
    features: [
      "Aplikasi Web Next.js full-stack & database",
      "Sistem Pre-Order, DP, booking jadwal & cek nota",
      "Panel Admin untuk kelola produk, harga & pesanan",
      "Alur simpel tanpa login agar mudah dipakai pelanggan",
      "Full source code & garansi maintenance 45 hari",
    ],
    highlighted: true,
  },
  {
    id: "erp-custom",
    name: "Sistem ERP & Operasional Custom",
    priceRange: "Mulai Rp 8 jt",
    timeline: "Estimasi 3–8 minggu",
    description:
      "Untuk bisnis berkembang atau perusahaan yang butuh sistem internal terpusat: stok/gudang, transaksi, keuangan, dan laporan manajemen.",
    features: [
      "Modul custom sesuai SOP (Inventori, POS, Kas, HR)",
      "Hak akses multi-role (Owner, Admin, Gudang, Kasir)",
      "Dashboard laporan real-time & export Excel/PDF",
      "Skalabel untuk multi-cabang & integrasi API/WA",
      "Full source code, training tim & garansi 60 hari",
    ],
  },
];

export const FAQS: FaqItem[] = [
  {
    question: "Apa fokus utama layanan jasa di Elevansi Digital?",
    answer:
      "Fokus jasa kami adalah pembuatan Landing Page & Company Profile, Aplikasi Web UMKM (seperti sistem Pre-Order, booking, dan nota ala Warung Berkah Makmur), serta Sistem ERP Custom (inventori, kas/keuangan, penjualan, dan dashboard operasional).",
  },
  {
    question: "Lalu apa bedanya dengan Giziku AI, Rangkumin+, dan Bertani?",
    answer:
      "Giziku AI, Rangkumin+, dan Bertani adalah produk internal (in-house products) yang dibangun dan dioperasikan sendiri oleh Elevansi Digital. Kami menampilkannya sebagai bukti standar kualitas engineering kami — sementara untuk layanan klien, kami fokus penuh pada Landing Page, Web UMKM, dan Sistem ERP.",
  },
  {
    question: "Apakah Elevansi Digital melayani klien di luar Palembang?",
    answer:
      "Ya! Meski berbasis di Palembang, kami melayani klien di seluruh Indonesia secara remote. Diskusi dan update progres dilakukan rutin via WhatsApp, Google Meet, dan link preview online.",
  },
  {
    question: "Apakah sistem ERP bisa disesuaikan dengan SOP perusahaan kami?",
    answer:
      "Tentu saja. Keunggulan ERP custom kami adalah alurnya mengikuti cara kerja bisnis Anda — bukan memaksa tim Anda menyesuaikan diri dengan software kaku yang penuh fitur tak terpakai.",
  },
  {
    question: "Bagaimana sistem pembayaran dan kepemilikan source code?",
    answer:
      "Pembayaran bisa bertahap: DP 30% di awal, 40% saat fitur inti siap diuji, dan 30% saat go-live. Setelah pelunasan, full source code serta akses database/hosting sepenuhnya menjadi milik Anda.",
  },
];

export const QUICK_CHAT_PROMPTS = [
  "Berapa kisaran biaya bikin Landing Page?",
  "Bisa bikin web UMKM kayak Warung?",
  "Modul apa saja untuk Sistem ERP Custom?",
  "Gimana alur kerja & sistem pembayarannya?",
];
