import { NextRequest, NextResponse } from "next/server";
import {
  IN_HOUSE_PRODUCTS,
  PRICING_TIERS,
  SERVICE_PROJECTS,
  STUDIO_INFO,
} from "@/data/studio";

interface IncomingMessage {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `Kamu adalah Asisten Konsultasi resmi dari ${STUDIO_INFO.brandName} (${STUDIO_INFO.tagline}), software studio milik ${STUDIO_INFO.founderName} yang berbasis di Palembang, Indonesia dan melayani klien seluruh Indonesia secara remote.

FOKUS LAYANAN JASA (yang kami tawarkan untuk klien):
1. Landing Page & Company Profile — Mulai Rp 700 rb (3–7 hari kerja). Website cepat, SEO-friendly, tanpa jebakan perpanjangan 50%/tahun, dan langsung mengarahkan calon pembeli ke WhatsApp.
2. Web App & Sistem UMKM — Mulai Rp 3,5 jt (2–4 minggu). Contoh studi kasus nyata: Warung Berkah Makmur (Pre-Order DP 30%, kalender booking hajatan, papan harga hasil bumi) dan Live Demo Website Rental Mobil (katalog armada, lepas kunci/dengan sopir, kalkulator harga otomatis & booking WA).
3. Sistem ERP & Operasional Bisnis Custom — Mulai Rp 8 jt (3–8 minggu, tergantung jumlah modul). Modul custom sesuai SOP perusahaan: inventori/gudang, pembelian & penjualan/POS, kas & pembukuan, hak akses multi-role (Owner, Admin, Gudang, Kasir), dashboard laporan & export Excel/PDF.

PRODUK INTERNAL PERUSAHAAN (In-House Products — BUKAN untuk jasa bikin kembarannya):
Elevansi Digital juga membangun dan mengoperasikan produk milik sendiri sebagai bukti kapabilitas engineering:
- Giziku AI (https://giziku-app.com) — Produk HealthTech AI nutrisi & kalori.
- Rangkumin+ (https://rangkuminplus.com) — Produk EdTech AI study copilot.
- Bertani (https://ber-tani.com) — Produk AgriTech AI pertanian cerdas.
Jika pengunjung bertanya tentang Giziku, Rangkumin+, atau Bertani, jelaskan dengan sopan bahwa itu adalah produk internal milik Elevansi Digital beserta link resminya, dan arahkan jika mereka membutuhkan layanan jasa pembuatan Landing Page, Web UMKM, atau Sistem ERP Custom.

ATURAN JAWABAN:
- Jelaskan skema pembayaran bertahap (DP 30% awal, 40% progres inti, 30% pelunasan + serah terima full source code) bila ditanya.
- Gaya bahasa: ramah, profesional, ringkas (maksimal 3–5 kalimat atau poin singkat), pakai bahasa Indonesia yang natural. Ajak calon klien lanjut diskusi detail lewat tombol WhatsApp bila sudah cocok.`;

function buildSmartFallbackReply(rawQuestion: string): string {
  const q = rawQuestion.toLowerCase();

  if (
    q.includes("giziku") ||
    q.includes("rangkumin") ||
    q.includes("bertani") ||
    q.includes("produk internal")
  ) {
    const productList = IN_HOUSE_PRODUCTS.map(
      (p) => `• **${p.name}** (${p.displayDomain}) — ${p.tagline}`
    ).join("\n");
    return `**Giziku AI**, **Rangkumin+**, dan **Bertani** adalah **produk internal (in-house products)** yang dibangun & dioperasikan sendiri oleh **${STUDIO_INFO.brandName}** (bukan produk jasa untuk dibuat ulang):\n${productList}\n\nUntuk layanan jasa klien, kami fokus penuh pada pembuatan **Landing Page**, **Web Sistem UMKM** (seperti Warung Berkah Makmur), dan **Sistem ERP Custom**. Ada kebutuhan website atau ERP untuk bisnis Anda?`;
  }

  if (q.includes("erp") || q.includes("stok") || q.includes("gudang") || q.includes("inventori")) {
    return `Untuk **Sistem ERP & Operasional Custom**, kami bangun mengikuti SOP bisnis Anda — bukan software kaku yang ribet dipakai.\n\nModul yang umum dibuat:\n• **Inventori & Gudang** (stok masuk/keluar, stok opname, supplier)\n• **Penjualan, POS & Invoice** (nota, piutang, riwayat pelanggan)\n• **Kas & Laporan Manajemen** (multi-role Owner/Admin/Kasir + export Excel/PDF)\n\nEstimasi mulai **Rp 8 jt** (3–8 minggu, menyesuaikan jumlah modul). Anda juga bisa langsung coba **Live Demo ERP** di website ini!`;
  }

  if (q.includes("landing") || q.includes("company profile") || q.includes("profil") || q.includes("700")) {
    return `Untuk **Landing Page & Company Profile**, investasinya mulai **Rp 700 rb** dengan estimasi pengerjaan cepat **3–7 hari kerja**.\n\nSudah termasuk desain custom clean & cepat di HP, SEO dasar, integrasi tombol WhatsApp, bantuan setup domain/hosting, **tanpa jebakan perpanjangan tahunan 50%**, dan full source code milik Anda!`;
  }

  if (q.includes("rental") || q.includes("sewa mobil") || q.includes("mobil")) {
    return `Kami punya **Live Demo Website Rental Mobil** langsung di website ini (/demo/rental)!\n\nFiturnya mencakup katalog armada, pilihan mode **Lepas Kunci / Dengan Sopir**, kalkulator total biaya berdasarkan jumlah hari, dan tombol **Booking via WhatsApp** yang otomatis mengisi detail pesanan. Kisaran paketnya mulai **Rp 700 rb** (versi landing page katalog) hingga **Rp 3,5 jt** (versi sistem UMKM lengkap dengan panel admin).`;
  }

  if (q.includes("warung") || q.includes("umkm") || q.includes("hajatan") || q.includes("pre-order")) {
    const warung = SERVICE_PROJECTS[0];
    return `**${warung.name}** adalah contoh nyata jasa **Web App & Sistem UMKM** kami — dirancang agar pelanggan lokal bisa langsung order **tanpa ribet login**.\n\nFiturnya mencakup Pre-Order (bisa DP 30%), cek status nota online, kalender booking jadwal/hajatan, papan harga harian, dan panel admin. Kisaran investasinya mulai **Rp 3,5 jt** (2–4 minggu) dan bisa disesuaikan untuk toko, grosir, katering, atau rental Anda!`;
  }

  if (
    q.includes("harga") ||
    q.includes("biaya") ||
    q.includes("budget") ||
    q.includes("tarif") ||
    q.includes("estimasi") ||
    q.includes("paket") ||
    q.includes("berapa")
  ) {
    const list = PRICING_TIERS.map(
      (t) => `• **${t.name}:** ${t.priceRange} (${t.timeline})`
    ).join("\n");
    return `Berikut kisaran investasi layanan jasa di **${STUDIO_INFO.brandName}**:\n${list}\n\nHarga final menyesuaikan daftar modul/fitur, pembayaran bisa bertahap (DP 30%), dan sudah termasuk **full source code**. Bisnis Anda sedang butuh yang mana?`;
  }

  if (
    q.includes("alur") ||
    q.includes("cara") ||
    q.includes("mulai") ||
    q.includes("bayar") ||
    q.includes("pembayaran") ||
    q.includes("lama") ||
    q.includes("waktu")
  ) {
    return `Alur kerja di **${STUDIO_INFO.brandName}** dibuat simpel dan transparan:\n1. **Diskusi & Pemetaan SOP Gratis** — tentukan fitur prioritas & estimasi.\n2. **Desain UI & Struktur Modul** — review tampilan sebelum masuk coding.\n3. **Development & Preview** — progres bisa Anda tes rutin lewat link.\n4. **Go-Live & Garansi** — online di domain Anda + full source code & training singkat.\n\nPembayaran bertahap (DP 30% → Progres 40% → Pelunasan 30%). Mau lanjut diskusi via WhatsApp?`;
  }

  return `Terima kasih sudah menghubungi **${STUDIO_INFO.brandName}**! Fokus layanan jasa kami adalah:\n• **Landing Page & Company Profile** (mulai Rp 700 rb — tanpa perpanjangan 50%/tahun)\n• **Web App & Sistem UMKM** seperti *Warung Berkah Makmur* & *Rental Mobil* (mulai Rp 3,5 jt)\n• **Sistem ERP & Operasional Custom** — stok, transaksi, keuangan & dashboard (mulai Rp 8 jt)\n\nCeritakan kebutuhan bisnis Anda di sini, atau klik **Lanjut ke WhatsApp** untuk konsultasi gratis!`;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      message?: string;
      history?: IncomingMessage[];
    };

    const userMessage = body.message?.trim();
    if (!userMessage) {
      return NextResponse.json(
        { error: "Pesan tidak boleh kosong." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY?.trim();

    if (apiKey) {
      const historyContents = (body.history ?? []).slice(-6).map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: SYSTEM_PROMPT }],
            },
            contents: [
              ...historyContents,
              { role: "user", parts: [{ text: userMessage }] },
            ],
            generationConfig: {
              temperature: 0.6,
              maxOutputTokens: 450,
            },
          }),
        }
      );

      if (geminiRes.ok) {
        const data = (await geminiRes.json()) as {
          candidates?: { content?: { parts?: { text?: string }[] } }[];
        };
        const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (aiText) {
          return NextResponse.json({ reply: aiText, mode: "gemini" });
        }
      }
    }

    const fallbackReply = buildSmartFallbackReply(userMessage);
    return NextResponse.json({ reply: fallbackReply, mode: "smart-engine" });
  } catch {
    return NextResponse.json(
      {
        reply:
          "Maaf, sedang ada kendala sebentar. Anda tetap bisa langsung konsultasi gratis lewat tombol WhatsApp di bawah ya!",
        mode: "fallback",
      },
      { status: 200 }
    );
  }
}
