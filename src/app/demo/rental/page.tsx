import type { Metadata } from "next";
import { RentalDemoClient } from "@/components/RentalDemoClient";
import { STUDIO_INFO } from "@/data/studio";

export const metadata: Metadata = {
  title: `Live Demo Web Rental Mobil — ${STUDIO_INFO.brandName}`,
  description:
    "Simulasi website UMKM Rental Mobil & Travel buatan Elevansi Digital: katalog armada, pilihan lepas kunci/dengan sopir, kalkulator harga otomatis, dan booking WhatsApp 1 klik.",
};

export default function RentalDemoPage() {
  return <RentalDemoClient />;
}
