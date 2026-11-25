import {
  BookOpen,
  CalendarCheck2,
  Camera,
  CloudSun,
  Flame,
  Mic,
  ShoppingBag,
  Sparkles,
  Sprout,
  Store,
} from "lucide-react";

interface ProjectMockupProps {
  type: "giziku" | "rangkumin" | "bertani" | "warung";
}

export function ProjectMockup({ type }: ProjectMockupProps) {
  if (type === "giziku") {
    return (
      <div className="relative flex h-52 w-full items-center justify-center overflow-hidden rounded-t-2xl bg-gradient-to-br from-emerald-50 via-teal-50/70 to-white px-5 pt-5">
        <div className="w-56 rounded-t-2xl border border-emerald-200/80 bg-white p-3.5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
              <Camera className="h-3 w-3" /> Vision AI Scan
            </span>
            <span className="font-mono text-[10px] font-semibold text-slate-400">
              Live v1.5
            </span>
          </div>
          <div className="mt-2.5 rounded-xl bg-emerald-600 p-2.5 text-white">
            <p className="text-[10px] text-emerald-100">Terdeteksi dari Foto</p>
            <p className="text-xs font-bold">Nasi Goreng Ayam + Telur</p>
            <div className="mt-1.5 flex items-center gap-1 text-[11px] font-extrabold">
              <Flame className="h-3.5 w-3.5 text-amber-300" />
              540 kkal
            </div>
          </div>
          <div className="mt-2.5 grid grid-cols-3 gap-1.5 text-center">
            <div className="rounded-lg bg-slate-50 py-1.5">
              <p className="text-[9px] text-slate-400">Protein</p>
              <p className="text-[11px] font-bold text-slate-800">24g</p>
            </div>
            <div className="rounded-lg bg-slate-50 py-1.5">
              <p className="text-[9px] text-slate-400">Karbo</p>
              <p className="text-[11px] font-bold text-slate-800">68g</p>
            </div>
            <div className="rounded-lg bg-slate-50 py-1.5">
              <p className="text-[9px] text-slate-400">Lemak</p>
              <p className="text-[11px] font-bold text-slate-800">18g</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "rangkumin") {
    return (
      <div className="relative flex h-52 w-full items-center justify-center overflow-hidden rounded-t-2xl bg-gradient-to-br from-blue-50 via-indigo-50/70 to-white px-5 pt-5">
        <div className="w-56 rounded-t-2xl border border-blue-200/80 bg-white p-3.5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
              <Sparkles className="h-3 w-3" /> AI Study Copilot
            </span>
            <BookOpen className="h-3.5 w-3.5 text-blue-500" />
          </div>
          <div className="mt-2.5 space-y-1.5">
            <div className="rounded-lg border border-blue-100 bg-blue-50/60 p-2">
              <p className="text-[10px] font-bold text-blue-900">
                Ringkasan Bab 4 — Biologi Sel
              </p>
              <p className="mt-0.5 text-[9px] leading-relaxed text-slate-600">
                3 poin inti + 10 kartu belajar otomatis dari foto catatan.
              </p>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-slate-900 px-2.5 py-1.5 text-white">
              <span className="text-[10px] font-semibold">Mulai Kuis AI</span>
              <span className="rounded bg-blue-500 px-1.5 py-0.5 text-[9px] font-bold">
                10 Soal
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "bertani") {
    return (
      <div className="relative flex h-52 w-full items-center justify-center overflow-hidden rounded-t-2xl bg-gradient-to-br from-lime-50 via-emerald-50/60 to-white px-5 pt-5">
        <div className="w-56 rounded-t-2xl border border-lime-200/90 bg-white p-3.5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 rounded-full bg-lime-100 px-2 py-0.5 text-[10px] font-bold text-lime-800">
              <Sprout className="h-3 w-3" /> Lahan Padi Blok A
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-600">
              <CloudSun className="h-3 w-3" /> 29°C
            </span>
          </div>
          <div className="mt-2.5 rounded-xl border border-lime-200 bg-lime-50/70 p-2.5">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lime-600 text-white">
                <Mic className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-slate-800">Voice AI Aktif</p>
                <p className="truncate text-[9px] text-slate-500">
                  &ldquo;Pupuk urea 2 karung pagi ini&rdquo;
                </p>
              </div>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between text-[10px] font-medium text-slate-500">
            <span>Klinik Tanaman AI</span>
            <span className="font-bold text-emerald-700">Buku Kas • Aktif</span>
          </div>
        </div>
      </div>
    );
  }

  // warung
  return (
    <div className="relative flex h-52 w-full items-center justify-center overflow-hidden rounded-t-2xl bg-gradient-to-br from-amber-50 via-stone-50 to-white px-5 pt-5">
      <div className="w-full max-w-[270px] rounded-t-xl border border-stone-200 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center gap-1.5 border-b border-stone-100 bg-stone-50 px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-rose-300" />
          <span className="h-2 w-2 rounded-full bg-amber-300" />
          <span className="h-2 w-2 rounded-full bg-emerald-300" />
          <span className="ml-1 font-mono text-[9px] text-slate-400">
            warung-berkah.app
          </span>
        </div>
        <div className="p-3">
          <div className="flex items-center justify-between rounded-lg bg-emerald-800 px-2.5 py-2 text-white">
            <div className="flex items-center gap-1.5">
              <Store className="h-3.5 w-3.5" />
              <span className="text-[10px] font-bold">Warung Berkah Makmur</span>
            </div>
            <span className="rounded bg-white/15 px-1.5 py-0.5 text-[8px] font-semibold">
              Tanpa Login
            </span>
          </div>
          <div className="mt-2.5 grid grid-cols-3 gap-1.5 text-center">
            <div className="rounded-lg border border-emerald-100 bg-emerald-50/70 p-1.5">
              <ShoppingBag className="mx-auto h-3.5 w-3.5 text-emerald-700" />
              <p className="mt-1 text-[9px] font-bold text-slate-700">PO DP 30%</p>
            </div>
            <div className="rounded-lg border border-teal-100 bg-teal-50/70 p-1.5">
              <CalendarCheck2 className="mx-auto h-3.5 w-3.5 text-teal-700" />
              <p className="mt-1 text-[9px] font-bold text-slate-700">Hajatan</p>
            </div>
            <div className="rounded-lg border border-amber-100 bg-amber-50/70 p-1.5">
              <Sprout className="mx-auto h-3.5 w-3.5 text-amber-700" />
              <p className="mt-1 text-[9px] font-bold text-slate-700">Hasil Bumi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
