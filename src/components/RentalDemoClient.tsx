"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Car,
  CheckCircle2,
  Fuel,
  MapPin,
  MessageSquareText,
  Settings2,
  ShieldCheck,
  Users,
} from "lucide-react";
import { STUDIO_INFO } from "@/data/studio";

type CarCategory = "Semua" | "City Car" | "MPV Keluarga" | "Premium & Travel";
type RentalMode = "lepas-kunci" | "dengan-sopir";

interface FleetCar {
  id: string;
  name: string;
  category: Exclude<CarCategory, "Semua">;
  seats: number;
  transmission: "Matic" | "Manual / Matic";
  fuel: string;
  priceLepasKunci: number;
  priceDenganSopir: number;
  badge?: string;
  available: boolean;
  accentBg: string;
  accentText: string;
}

const FLEET: FleetCar[] = [
  {
    id: "brio",
    name: "Honda Brio RS 2024",
    category: "City Car",
    seats: 5,
    transmission: "Matic",
    fuel: "Irit BBM",
    priceLepasKunci: 300000,
    priceDenganSopir: 475000,
    badge: "Paling Hemat",
    available: true,
    accentBg: "bg-amber-50",
    accentText: "text-amber-700",
  },
  {
    id: "avanza",
    name: "Toyota All New Avanza",
    category: "MPV Keluarga",
    seats: 7,
    transmission: "Manual / Matic",
    fuel: "Bensin",
    priceLepasKunci: 350000,
    priceDenganSopir: 525000,
    badge: "Terlaris",
    available: true,
    accentBg: "bg-blue-50",
    accentText: "text-blue-700",
  },
  {
    id: "xpander",
    name: "Mitsubishi Xpander Ultimate",
    category: "MPV Keluarga",
    seats: 7,
    transmission: "Matic",
    fuel: "Bensin",
    priceLepasKunci: 425000,
    priceDenganSopir: 600000,
    available: true,
    accentBg: "bg-emerald-50",
    accentText: "text-emerald-700",
  },
  {
    id: "zenix",
    name: "Toyota Innova Zenix Hybrid",
    category: "Premium & Travel",
    seats: 7,
    transmission: "Matic",
    fuel: "Hybrid",
    priceLepasKunci: 700000,
    priceDenganSopir: 900000,
    badge: "VIP / Dinas",
    available: true,
    accentBg: "bg-indigo-50",
    accentText: "text-indigo-700",
  },
  {
    id: "hiace",
    name: "Toyota Hiace Commuter",
    category: "Premium & Travel",
    seats: 15,
    transmission: "Manual / Matic",
    fuel: "Diesel",
    priceLepasKunci: 1100000,
    priceDenganSopir: 1350000,
    badge: "Rombongan",
    available: true,
    accentBg: "bg-slate-100",
    accentText: "text-slate-700",
  },
];

function formatRp(num: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num);
}

export function RentalDemoClient() {
  const [category, setCategory] = useState<CarCategory>("Semua");
  const [mode, setMode] = useState<RentalMode>("dengan-sopir");
  const [selectedCarId, setSelectedCarId] = useState<string>(FLEET[1].id);
  const [days, setDays] = useState<number>(2);
  const [startDate, setStartDate] = useState<string>("2026-12-01");
  const [pickupLocation, setPickupLocation] = useState<string>(
    "Bandara SMB II / Pusat Kota Palembang"
  );
  const [customerName, setCustomerName] = useState<string>("");

  const filteredFleet = useMemo(() => {
    if (category === "Semua") return FLEET;
    return FLEET.filter((c) => c.category === category);
  }, [category]);

  const selectedCar = useMemo(
    () => FLEET.find((c) => c.id === selectedCarId) ?? FLEET[0],
    [selectedCarId]
  );

  const dailyRate =
    mode === "lepas-kunci"
      ? selectedCar.priceLepasKunci
      : selectedCar.priceDenganSopir;
  const totalPrice = dailyRate * Math.max(1, days);

  const bookingMessage = `Halo Sriwijaya Trans (Demo oleh ${STUDIO_INFO.brandName}), saya ingin booking sewa mobil:\n• Nama: ${
    customerName.trim() || "-"
  }\n• Armada: ${selectedCar.name}\n• Layanan: ${
    mode === "lepas-kunci" ? "Lepas Kunci" : "Dengan Sopir"
  }\n• Tanggal Mulai: ${startDate}\n• Durasi: ${days} hari\n• Lokasi Jemput: ${pickupLocation}\n• Estimasi Total: ${formatRp(
    totalPrice
  )}`;

  const bookingWaUrl = `https://wa.me/${
    STUDIO_INFO.whatsappNumber
  }?text=${encodeURIComponent(bookingMessage)}`;

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900">
      {/* Top Demo Banner */}
      <div className="border-b border-blue-200 bg-blue-600 px-4 py-2.5 text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-white/20 px-2 py-0.5 font-mono font-bold">
              LIVE DEMO WEB UMKM
            </span>
            <span>
              Contoh Website Rental Mobil oleh{" "}
              <strong>{STUDIO_INFO.brandName}</strong> — pilih mobil &amp; hitung
              harga sewa langsung!
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/#studi-kasus"
              className="inline-flex items-center gap-1 font-semibold text-blue-100 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Kembali ke Portfolio
            </Link>
            <a
              href={`https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encodeURIComponent(
                `Halo ${STUDIO_INFO.brandName}, saya baru mencoba Live Demo Website Rental Mobil dan ingin bikin website seperti ini untuk usaha saya.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 font-bold text-blue-700 hover:bg-blue-50"
            >
              <MessageSquareText className="h-3.5 w-3.5" />
              Pesan Web Seperti Ini
            </a>
          </div>
        </div>
      </div>

      {/* Store Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
              <Car className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight text-slate-950">
                Sriwijaya Trans — Rental Mobil &amp; Travel
              </h1>
              <p className="inline-flex items-center gap-1 text-xs text-slate-500">
                <MapPin className="h-3.5 w-3.5 text-blue-600" />
                Antar-Jemput Bandara, Hotel &amp; Dalam Kota • Booking Tanpa Login
              </p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1">
            <button
              type="button"
              onClick={() => setMode("dengan-sopir")}
              className={`rounded-lg px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                mode === "dengan-sopir"
                  ? "bg-white text-slate-950 shadow-xs ring-1 ring-slate-200"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Dengan Sopir
            </button>
            <button
              type="button"
              onClick={() => setMode("lepas-kunci")}
              className={`rounded-lg px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                mode === "lepas-kunci"
                  ? "bg-white text-slate-950 shadow-xs ring-1 ring-slate-200"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Lepas Kunci
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-12">
        {/* Left: Fleet Catalog */}
        <div className="lg:col-span-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-extrabold text-slate-950">
              Pilih Armada Tersedia
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {(
                [
                  "Semua",
                  "City Car",
                  "MPV Keluarga",
                  "Premium & Travel",
                ] as CarCategory[]
              ).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                    category === cat
                      ? "bg-slate-900 text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {filteredFleet.map((car) => {
              const isSelected = car.id === selectedCar.id;
              const price =
                mode === "lepas-kunci"
                  ? car.priceLepasKunci
                  : car.priceDenganSopir;

              return (
                <div
                  key={car.id}
                  onClick={() => setSelectedCarId(car.id)}
                  className={`flex flex-col justify-between rounded-2xl border p-5 transition-all cursor-pointer ${
                    isSelected
                      ? "border-blue-600 bg-white shadow-md ring-1 ring-blue-600"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs"
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-xl ${car.accentBg} ${car.accentText}`}
                      >
                        <Car className="h-5 w-5" />
                      </span>
                      <div className="flex items-center gap-1.5">
                        {car.badge && (
                          <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-blue-700">
                            {car.badge}
                          </span>
                        )}
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                          Ready
                        </span>
                      </div>
                    </div>

                    <h3 className="mt-3.5 text-base font-extrabold text-slate-950">
                      {car.name}
                    </h3>
                    <p className="text-xs font-medium text-slate-500">
                      {car.category}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-medium text-slate-600">
                      <span className="inline-flex items-center gap-1 rounded-md bg-slate-50 px-2 py-1">
                        <Users className="h-3 w-3 text-slate-400" />
                        {car.seats} Kursi
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-md bg-slate-50 px-2 py-1">
                        <Settings2 className="h-3 w-3 text-slate-400" />
                        {car.transmission}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-md bg-slate-50 px-2 py-1">
                        <Fuel className="h-3 w-3 text-slate-400" />
                        {car.fuel}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-4">
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                        {mode === "lepas-kunci"
                          ? "Tarif Lepas Kunci"
                          : "Tarif + Sopir"}
                      </p>
                      <p className="text-lg font-extrabold text-slate-950">
                        {formatRp(price)}
                        <span className="text-xs font-medium text-slate-500">
                          /hari
                        </span>
                      </p>
                    </div>
                    <span
                      className={`rounded-xl px-3 py-1.5 text-xs font-bold ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {isSelected ? "Dipilih ✓" : "Pilih"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust highlights */}
          <div className="mt-6 grid gap-3 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-3">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <div>
                <p className="text-xs font-bold text-slate-900">
                  Unit Bersih &amp; Terawat
                </p>
                <p className="text-[11px] text-slate-500">
                  Servis rutin bengkel resmi
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <div>
                <p className="text-xs font-bold text-slate-900">
                  Harga Transparan
                </p>
                <p className="text-[11px] text-slate-500">
                  Tanpa biaya tersembunyi
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <div>
                <p className="text-xs font-bold text-slate-900">
                  Booking Cepat 1 Menit
                </p>
                <p className="text-[11px] text-slate-500">
                  Langsung terhubung ke WA
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live Booking Calculator */}
        <aside className="lg:col-span-4">
          <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-blue-700">
              Kalkulator &amp; Booking Instan
            </span>
            <h2 className="mt-2 text-lg font-extrabold text-slate-950">
              {selectedCar.name}
            </h2>
            <p className="text-xs text-slate-500">
              {mode === "lepas-kunci" ? "Mode Lepas Kunci" : "Mode Dengan Sopir"}{" "}
              • {formatRp(dailyRate)}/hari
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Nama Pemesan
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Mis. Budi Santoso"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700">
                    Tanggal Mulai
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs focus:border-blue-500 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700">
                    Durasi (Hari)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={days}
                    onChange={(e) =>
                      setDays(Math.max(1, Number(e.target.value) || 1))
                    }
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-bold focus:border-blue-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Lokasi Antar / Jemput
                </label>
                <input
                  type="text"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>

              {/* Price Summary */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>
                    {formatRp(dailyRate)} x {days} hari
                  </span>
                  <span className="font-semibold text-slate-900">
                    {formatRp(totalPrice)}
                  </span>
                </div>
                <div className="mt-2.5 flex items-center justify-between border-t border-slate-200 pt-2.5">
                  <span className="text-xs font-bold text-slate-900">
                    Estimasi Total
                  </span>
                  <span className="text-xl font-extrabold text-blue-700">
                    {formatRp(totalPrice)}
                  </span>
                </div>
              </div>

              <a
                href={bookingWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-600"
              >
                <MessageSquareText className="h-4 w-4" />
                Booking via WhatsApp
              </a>
              <p className="text-center text-[11px] text-slate-400">
                Format pesanan otomatis terisi saat membuka WhatsApp.
              </p>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
