import type { Metadata } from "next";
import { ErpDemoClient } from "@/components/ErpDemoClient";
import { STUDIO_INFO } from "@/data/studio";

export const metadata: Metadata = {
  title: `Live Demo Sistem ERP — ${STUDIO_INFO.brandName}`,
  description:
    "Coba langsung simulasi interaktif Sistem ERP Custom dari Elevansi Digital: Dashboard Omzet, Inventori Gudang, Invoice Penjualan, Hak Akses Multi-Role, dan Laporan Kas.",
};

export default function ErpDemoPage() {
  return <ErpDemoClient />;
}
