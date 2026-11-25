"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  Download,
  LayoutDashboard,
  MessageSquareText,
  Package,
  Plus,
  ReceiptText,
  Search,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { STUDIO_INFO } from "@/data/studio";

type Role = "Owner" | "Gudang" | "Kasir";
type TabId = "dashboard" | "inventori" | "penjualan" | "kas";

interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  minStock: number;
  unit: string;
}

interface Invoice {
  id: string;
  date: string;
  customer: string;
  itemName: string;
  qty: number;
  total: number;
  status: "Lunas" | "Tempo";
}

interface CashEntry {
  id: string;
  date: string;
  type: "Masuk" | "Keluar";
  label: string;
  amount: number;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "p1",
    sku: "BRS-001",
    name: "Beras Premium Cap Mawar 25kg",
    category: "Sembako",
    price: 345000,
    stock: 42,
    minStock: 15,
    unit: "Karung",
  },
  {
    id: "p2",
    sku: "MYK-002",
    name: "Minyak Goreng Kemasan 2L (Dus)",
    category: "Sembako",
    price: 218000,
    stock: 8,
    minStock: 12,
    unit: "Dus",
  },
  {
    id: "p3",
    sku: "GUL-003",
    name: "Gula Pasir Kristal 50kg",
    category: "Sembako",
    price: 825000,
    stock: 19,
    minStock: 10,
    unit: "Karung",
  },
  {
    id: "p4",
    sku: "TPG-004",
    name: "Tepung Terigu Serbaguna 25kg",
    category: "Bahan Kue",
    price: 265000,
    stock: 5,
    minStock: 10,
    unit: "Zak",
  },
  {
    id: "p5",
    sku: "KPI-005",
    name: "Kopi Robusta Bubuk 1kg (Pack)",
    category: "Minuman",
    price: 92000,
    stock: 64,
    minStock: 20,
    unit: "Pack",
  },
];

const INITIAL_INVOICES: Invoice[] = [
  {
    id: "INV-2611-014",
    date: "25 Nov 2026",
    customer: "Toko Jaya Abadi",
    itemName: "Beras Premium Cap Mawar 25kg",
    qty: 10,
    total: 3450000,
    status: "Lunas",
  },
  {
    id: "INV-2611-013",
    date: "24 Nov 2026",
    customer: "Katering Bu Sari",
    itemName: "Minyak Goreng Kemasan 2L (Dus)",
    qty: 8,
    total: 1744000,
    status: "Tempo",
  },
  {
    id: "INV-2611-012",
    date: "23 Nov 2026",
    customer: "Minimarket Sejahtera",
    itemName: "Gula Pasir Kristal 50kg",
    qty: 6,
    total: 4950000,
    status: "Lunas",
  },
];

const INITIAL_CASH: CashEntry[] = [
  {
    id: "c1",
    date: "25 Nov 2026",
    type: "Masuk",
    label: "Pelunasan INV-2611-014 (Toko Jaya Abadi)",
    amount: 3450000,
  },
  {
    id: "c2",
    date: "23 Nov 2026",
    type: "Masuk",
    label: "Pelunasan INV-2611-012 (Minimarket Sejahtera)",
    amount: 4950000,
  },
  {
    id: "c3",
    date: "22 Nov 2026",
    type: "Keluar",
    label: "Restock Supplier Gudang Utama",
    amount: 2800000,
  },
  {
    id: "c4",
    date: "20 Nov 2026",
    type: "Keluar",
    label: "Operasional Listrik & Armada Pengiriman",
    amount: 950000,
  },
];

const MONTHLY_CHART = [
  { month: "Jul", omzet: 62, keluar: 38 },
  { month: "Agu", omzet: 74, keluar: 44 },
  { month: "Sep", omzet: 69, keluar: 41 },
  { month: "Okt", omzet: 86, keluar: 49 },
  { month: "Nov", omzet: 95, keluar: 52 },
];

function formatRp(num: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num);
}

export function ErpDemoClient() {
  const [role, setRole] = useState<Role>("Owner");
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [cashEntries, setCashEntries] = useState<CashEntry[]>(INITIAL_CASH);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  // Add product form
  const [newSku, setNewSku] = useState("");
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newStock, setNewStock] = useState("");

  // Quick invoice form
  const [orderCustomer, setOrderCustomer] = useState("");
  const [orderProductId, setOrderProductId] = useState(INITIAL_PRODUCTS[0].id);
  const [orderQty, setOrderQty] = useState(2);
  const [orderStatus, setOrderStatus] = useState<"Lunas" | "Tempo">("Lunas");

  // Cash expense form
  const [expenseLabel, setExpenseLabel] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  };

  const handleRoleChange = (nextRole: Role) => {
    setRole(nextRole);
    if (nextRole === "Gudang" && activeTab === "kas") setActiveTab("inventori");
    if (nextRole === "Kasir" && activeTab === "kas") setActiveTab("penjualan");
  };

  const stats = useMemo(() => {
    const totalOmzet = invoices.reduce((acc, inv) => acc + inv.total, 0);
    const totalStockValue = products.reduce(
      (acc, p) => acc + p.price * p.stock,
      0
    );
    const lowStockItems = products.filter((p) => p.stock <= p.minStock);
    const totalMasuk = cashEntries
      .filter((c) => c.type === "Masuk")
      .reduce((acc, c) => acc + c.amount, 0);
    const totalKeluar = cashEntries
      .filter((c) => c.type === "Keluar")
      .reduce((acc, c) => acc + c.amount, 0);

    return {
      totalOmzet,
      totalStockValue,
      lowStockItems,
      totalMasuk,
      totalKeluar,
      saldoKas: totalMasuk - totalKeluar,
    };
  }, [invoices, products, cashEntries]);

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [products, search]);

  const adjustStock = (id: string, delta: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p
      )
    );
    showToast(
      delta > 0
        ? `Stok berhasil ditambah +${delta}`
        : `Stok berhasil dikurangi ${delta}`
    );
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = Number(newPrice);
    const stockNum = Number(newStock);
    if (!newName.trim() || !priceNum || stockNum < 0) return;

    const item: Product = {
      id: `p-${Date.now()}`,
      sku: newSku.trim().toUpperCase() || `SKU-${products.length + 101}`,
      name: newName.trim(),
      category: "Produk Baru",
      price: priceNum,
      stock: stockNum,
      minStock: 10,
      unit: "Unit",
    };
    setProducts((prev) => [item, ...prev]);
    setNewSku("");
    setNewName("");
    setNewPrice("");
    setNewStock("");
    showToast(`Produk "${item.name}" ditambahkan ke gudang.`);
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const product = products.find((p) => p.id === orderProductId);
    if (!product || !orderCustomer.trim() || orderQty <= 0) return;

    if (product.stock < orderQty) {
      showToast(`Stok ${product.name} tidak cukup (tersisa ${product.stock}).`);
      return;
    }

    const total = product.price * orderQty;
    const invId = `INV-2611-0${invoices.length + 12}`;
    const newInv: Invoice = {
      id: invId,
      date: "Hari Ini",
      customer: orderCustomer.trim(),
      itemName: product.name,
      qty: orderQty,
      total,
      status: orderStatus,
    };

    setInvoices((prev) => [newInv, ...prev]);
    setProducts((prev) =>
      prev.map((p) =>
        p.id === product.id ? { ...p, stock: p.stock - orderQty } : p
      )
    );

    if (orderStatus === "Lunas") {
      setCashEntries((prev) => [
        {
          id: `c-${Date.now()}`,
          date: "Hari Ini",
          type: "Masuk",
          label: `Pelunasan ${invId} (${newInv.customer})`,
          amount: total,
        },
        ...prev,
      ]);
    }

    setOrderCustomer("");
    setOrderQty(1);
    showToast(`Invoice ${invId} dibuat & stok otomatis terpotong!`);
  };

  const toggleInvoiceStatus = (inv: Invoice) => {
    const nextStatus = inv.status === "Lunas" ? "Tempo" : "Lunas";
    setInvoices((prev) =>
      prev.map((item) =>
        item.id === inv.id ? { ...item, status: nextStatus } : item
      )
    );
    if (nextStatus === "Lunas") {
      setCashEntries((prev) => [
        {
          id: `c-${Date.now()}`,
          date: "Hari Ini",
          type: "Masuk",
          label: `Pelunasan ${inv.id} (${inv.customer})`,
          amount: inv.total,
        },
        ...prev,
      ]);
      showToast(`${inv.id} ditandai Lunas & masuk ke Arus Kas.`);
    } else {
      showToast(`${inv.id} diubah ke status Tempo.`);
    }
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = Number(expenseAmount);
    if (!expenseLabel.trim() || !amountNum) return;

    setCashEntries((prev) => [
      {
        id: `c-${Date.now()}`,
        date: "Hari Ini",
        type: "Keluar",
        label: expenseLabel.trim(),
        amount: amountNum,
      },
      ...prev,
    ]);
    setExpenseLabel("");
    setExpenseAmount("");
    showToast("Pengeluaran dicatat ke Arus Kas.");
  };

  const handleExportCsv = () => {
    const header = "Tanggal,Jenis,Keterangan,Nominal\n";
    const rows = cashEntries
      .map((c) => `"${c.date}","${c.type}","${c.label}",${c.amount}`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "laporan-kas-erp-demo.csv";
    a.click();
    URL.revokeObjectURL(url);
    showToast("Laporan kas berhasil diunduh (CSV).");
  };

  const navItems: {
    id: TabId;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    roles: Role[];
  }[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      roles: ["Owner", "Gudang", "Kasir"],
    },
    {
      id: "inventori",
      label: "Inventori & Gudang",
      icon: Package,
      roles: ["Owner", "Gudang", "Kasir"],
    },
    {
      id: "penjualan",
      label: "Penjualan & Invoice",
      icon: ReceiptText,
      roles: ["Owner", "Kasir"],
    },
    {
      id: "kas",
      label: "Kas & Laporan",
      icon: Wallet,
      roles: ["Owner"],
    },
  ];

  const visibleNav = navItems.filter((item) => item.roles.includes(role));

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      {/* Top Demo Banner */}
      <div className="border-b border-blue-200 bg-blue-600 px-4 py-2.5 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-white/20 px-2 py-0.5 font-mono font-bold">
              LIVE DEMO ERP
            </span>
            <span>
              Simulasi interaktif oleh <strong>{STUDIO_INFO.brandName}</strong>{" "}
              — coba ubah stok, buat invoice, atau ganti role di bawah!
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
                `Halo ${STUDIO_INFO.brandName}, saya baru mencoba Live Demo ERP di website Anda dan tertarik membuat sistem ERP custom untuk bisnis saya.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 font-bold text-blue-700 hover:bg-blue-50"
            >
              <MessageSquareText className="h-3.5 w-3.5" />
              Pesan ERP Custom
            </a>
          </div>
        </div>
      </div>

      {/* App Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 font-mono text-sm font-bold text-white">
              SM
            </span>
            <div>
              <h1 className="text-base font-extrabold text-slate-950">
                PT Sumber Makmur Distribusi
              </h1>
              <p className="text-xs text-slate-500">
                Sistem ERP Operasional • Powered by {STUDIO_INFO.brandName}
              </p>
            </div>
          </div>

          {/* Role Switcher */}
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1">
            <span className="hidden items-center gap-1 pl-2 text-[11px] font-semibold text-slate-500 sm:inline-flex">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
              Role:
            </span>
            {(["Owner", "Gudang", "Kasir"] as Role[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => handleRoleChange(r)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  role === r
                    ? "bg-white text-slate-950 shadow-xs ring-1 ring-slate-200"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-900 px-4 py-3 text-xs font-semibold text-white shadow-xl">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          {toast}
        </div>
      )}

      {/* Main Layout */}
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-12">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-3">
          <nav className="flex gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 lg:flex-col">
            {visibleNav.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left text-sm font-semibold transition-colors cursor-pointer ${
                    active
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Info box */}
          <div className="mt-4 hidden rounded-2xl border border-blue-100 bg-blue-50/70 p-4 lg:block">
            <p className="text-xs font-bold text-blue-900">
              Hak Akses Multi-Role Aktif
            </p>
            <p className="mt-1 text-xs leading-relaxed text-blue-800/80">
              Coba ganti role di kanan atas (<strong>Owner</strong>,{" "}
              <strong>Gudang</strong>, <strong>Kasir</strong>) untuk melihat
              bagaimana menu &amp; izin akses menyesuaikan jabatan tim Anda.
            </p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="space-y-6 lg:col-span-9">
          {/* TAB 1: DASHBOARD */}
          {activeTab === "dashboard" && (
            <>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <p className="text-xs font-medium text-slate-500">
                    Total Omzet Tercatat
                  </p>
                  <p className="mt-2 text-xl font-extrabold text-slate-950">
                    {formatRp(stats.totalOmzet)}
                  </p>
                  <p className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                    <TrendingUp className="h-3 w-3" /> {invoices.length} invoice
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <p className="text-xs font-medium text-slate-500">
                    Nilai Aset Stok Gudang
                  </p>
                  <p className="mt-2 text-xl font-extrabold text-slate-950">
                    {formatRp(stats.totalStockValue)}
                  </p>
                  <p className="mt-1 text-[11px] font-medium text-slate-500">
                    {products.length} jenis SKU aktif
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <p className="text-xs font-medium text-slate-500">
                    Saldo Kas Bersih
                  </p>
                  <p className="mt-2 text-xl font-extrabold text-blue-700">
                    {formatRp(stats.saldoKas)}
                  </p>
                  <p className="mt-1 text-[11px] font-medium text-slate-500">
                    Otomatis dari transaksi lunas
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5">
                  <p className="text-xs font-medium text-amber-800">
                    Stok Menipis
                  </p>
                  <p className="mt-2 text-xl font-extrabold text-amber-900">
                    {stats.lowStockItems.length} Produk
                  </p>
                  <p className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700">
                    <AlertTriangle className="h-3 w-3" /> Perlu segera restock
                  </p>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-12">
                {/* Chart */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-7">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-extrabold text-slate-950">
                        Tren Omzet vs Pengeluaran (Juta Rp)
                      </h2>
                      <p className="text-xs text-slate-500">
                        Ringkasan 5 bulan terakhir
                      </p>
                    </div>
                    <BarChart3 className="h-4 w-4 text-slate-400" />
                  </div>

                  <div className="mt-6 flex h-44 items-end justify-between gap-3 px-2">
                    {MONTHLY_CHART.map((bar) => (
                      <div
                        key={bar.month}
                        className="flex flex-1 flex-col items-center gap-2"
                      >
                        <div className="flex h-36 w-full items-end justify-center gap-1.5">
                          <div
                            style={{ height: `${bar.omzet}%` }}
                            title={`Omzet: Rp ${bar.omzet} jt`}
                            className="w-5 rounded-t-md bg-blue-600 transition-all hover:bg-blue-700 sm:w-7"
                          />
                          <div
                            style={{ height: `${bar.keluar}%` }}
                            title={`Pengeluaran: Rp ${bar.keluar} jt`}
                            className="w-5 rounded-t-md bg-slate-200 transition-all hover:bg-slate-300 sm:w-7"
                          />
                        </div>
                        <span className="font-mono text-[11px] font-semibold text-slate-500">
                          {bar.month}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-4 border-t border-slate-100 pt-3 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-xs bg-blue-600" />
                      Omzet Penjualan
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-xs bg-slate-200" />
                      Biaya &amp; Restock
                    </span>
                  </div>
                </div>

                {/* Low Stock Quick Action */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-5">
                  <h2 className="text-sm font-extrabold text-slate-950">
                    Peringatan Stok Menipis
                  </h2>
                  <p className="text-xs text-slate-500">
                    Klik tombol restock untuk simulasi tambah stok
                  </p>

                  <div className="mt-4 space-y-3">
                    {stats.lowStockItems.length === 0 ? (
                      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800">
                        Semua stok gudang dalam kondisi aman!
                      </div>
                    ) : (
                      stats.lowStockItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between gap-2 rounded-xl border border-amber-200/80 bg-amber-50/50 p-3"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-xs font-bold text-slate-900">
                              {item.name}
                            </p>
                            <p className="text-[11px] text-amber-800">
                              Sisa <strong>{item.stock}</strong> {item.unit}{" "}
                              (min. {item.minStock})
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => adjustStock(item.id, 20)}
                            className="shrink-0 rounded-lg bg-slate-900 px-2.5 py-1.5 text-[11px] font-bold text-white hover:bg-blue-600 cursor-pointer"
                          >
                            +20 Restock
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: INVENTORI & GUDANG */}
          {activeTab === "inventori" && (
            <div className="space-y-6">
              {/* Add Product Form */}
              <form
                onSubmit={handleAddProduct}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <h2 className="text-sm font-extrabold text-slate-950">
                  Tambah SKU Produk Baru (Simulasi)
                </h2>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                  <input
                    type="text"
                    value={newSku}
                    onChange={(e) => setNewSku(e.target.value)}
                    placeholder="Kode SKU (opsional)"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:border-blue-500 focus:bg-white focus:outline-none"
                  />
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Nama produk..."
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:border-blue-500 focus:bg-white focus:outline-none lg:col-span-2"
                  />
                  <input
                    type="number"
                    required
                    min={1000}
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="Harga jual (Rp)"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:border-blue-500 focus:bg-white focus:outline-none"
                  />
                  <div className="flex gap-2">
                    <input
                      type="number"
                      required
                      min={0}
                      value={newStock}
                      onChange={(e) => setNewStock(e.target.value)}
                      placeholder="Stok"
                      className="w-20 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:border-blue-500 focus:bg-white focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="inline-flex flex-1 items-center justify-center gap-1 rounded-xl bg-blue-600 px-3 py-2 text-xs font-bold text-white hover:bg-blue-700 cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Tambah
                    </button>
                  </div>
                </div>
              </form>

              {/* Product Table */}
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
                  <h2 className="text-sm font-extrabold text-slate-950">
                    Daftar Stok Gudang ({filteredProducts.length})
                  </h2>
                  <div className="relative w-full sm:w-64">
                    <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Cari SKU atau nama barang..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-8 pr-3 text-xs focus:border-blue-500 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-slate-100 bg-slate-50 text-[11px] font-bold uppercase text-slate-500">
                      <tr>
                        <th className="px-5 py-3">SKU &amp; Produk</th>
                        <th className="px-4 py-3">Harga Jual</th>
                        <th className="px-4 py-3">Stok</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-5 py-3 text-right">Aksi Cepat</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredProducts.map((p) => {
                        const isLow = p.stock <= p.minStock;
                        return (
                          <tr key={p.id} className="hover:bg-slate-50/70">
                            <td className="px-5 py-3.5">
                              <p className="font-bold text-slate-900">
                                {p.name}
                              </p>
                              <p className="font-mono text-[10px] text-slate-400">
                                {p.sku} • {p.category}
                              </p>
                            </td>
                            <td className="px-4 py-3.5 font-semibold text-slate-700">
                              {formatRp(p.price)}
                            </td>
                            <td className="px-4 py-3.5 font-mono font-bold text-slate-900">
                              {p.stock} {p.unit}
                            </td>
                            <td className="px-4 py-3.5">
                              <span
                                className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                                  p.stock === 0
                                    ? "bg-rose-100 text-rose-700"
                                    : isLow
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-emerald-100 text-emerald-800"
                                }`}
                              >
                                {p.stock === 0
                                  ? "Habis"
                                  : isLow
                                  ? "Menipis"
                                  : "Aman"}
                              </span>
                            </td>
                            <td className="px-5 py-3.5 text-right">
                              <div className="inline-flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => adjustStock(p.id, -1)}
                                  className="h-7 w-7 rounded-lg border border-slate-200 bg-white font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                                >
                                  -
                                </button>
                                <button
                                  type="button"
                                  onClick={() => adjustStock(p.id, 5)}
                                  className="rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1 font-bold text-blue-700 hover:bg-blue-100 cursor-pointer"
                                >
                                  +5
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PENJUALAN & INVOICE */}
          {activeTab === "penjualan" && (
            <div className="space-y-6">
              <form
                onSubmit={handleCreateInvoice}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <h2 className="text-sm font-extrabold text-slate-950">
                  Buat Invoice Penjualan Baru (Otomatis Potong Stok)
                </h2>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                  <input
                    type="text"
                    required
                    value={orderCustomer}
                    onChange={(e) => setOrderCustomer(e.target.value)}
                    placeholder="Nama pelanggan / toko..."
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:border-blue-500 focus:bg-white focus:outline-none"
                  />
                  <select
                    value={orderProductId}
                    onChange={(e) => setOrderProductId(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:border-blue-500 focus:bg-white focus:outline-none lg:col-span-2"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} (Stok: {p.stock})
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min={1}
                      value={orderQty}
                      onChange={(e) => setOrderQty(Number(e.target.value))}
                      className="w-16 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs focus:border-blue-500 focus:bg-white focus:outline-none"
                    />
                    <select
                      value={orderStatus}
                      onChange={(e) =>
                        setOrderStatus(e.target.value as "Lunas" | "Tempo")
                      }
                      className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs focus:border-blue-500 focus:bg-white focus:outline-none"
                    >
                      <option value="Lunas">Lunas</option>
                      <option value="Tempo">Tempo</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-blue-600 cursor-pointer"
                  >
                    Simpan Invoice
                  </button>
                </div>
              </form>

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="border-b border-slate-100 px-5 py-4">
                  <h2 className="text-sm font-extrabold text-slate-950">
                    Riwayat Invoice ({invoices.length})
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-slate-100 bg-slate-50 text-[11px] font-bold uppercase text-slate-500">
                      <tr>
                        <th className="px-5 py-3">No. Invoice</th>
                        <th className="px-4 py-3">Pelanggan</th>
                        <th className="px-4 py-3">Item</th>
                        <th className="px-4 py-3">Total</th>
                        <th className="px-5 py-3 text-right">Status (Klik Ubah)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {invoices.map((inv) => (
                        <tr key={inv.id} className="hover:bg-slate-50/70">
                          <td className="px-5 py-3.5 font-mono font-bold text-slate-900">
                            {inv.id}
                            <span className="block font-sans text-[10px] font-normal text-slate-400">
                              {inv.date}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 font-semibold text-slate-800">
                            {inv.customer}
                          </td>
                          <td className="px-4 py-3.5 text-slate-600">
                            {inv.itemName}{" "}
                            <span className="font-mono font-bold text-slate-800">
                              x{inv.qty}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 font-bold text-slate-900">
                            {formatRp(inv.total)}
                          </td>
                          <td className="px-5 py-3.5 text-right">
                            <button
                              type="button"
                              onClick={() => toggleInvoiceStatus(inv)}
                              className={`rounded-full px-3 py-1 text-[11px] font-bold transition-colors cursor-pointer ${
                                inv.status === "Lunas"
                                  ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                                  : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                              }`}
                            >
                              {inv.status}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: KAS & LAPORAN */}
          {activeTab === "kas" && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
                  <p className="text-xs font-medium text-emerald-800">
                    Total Kas Masuk
                  </p>
                  <p className="mt-1.5 text-xl font-extrabold text-emerald-900">
                    {formatRp(stats.totalMasuk)}
                  </p>
                </div>
                <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-5">
                  <p className="text-xs font-medium text-rose-800">
                    Total Kas Keluar
                  </p>
                  <p className="mt-1.5 text-xl font-extrabold text-rose-900">
                    {formatRp(stats.totalKeluar)}
                  </p>
                </div>
                <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-5">
                  <p className="text-xs font-medium text-blue-800">
                    Saldo Kas Bersih
                  </p>
                  <p className="mt-1.5 text-xl font-extrabold text-blue-900">
                    {formatRp(stats.saldoKas)}
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleAddExpense}
                className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row"
              >
                <input
                  type="text"
                  required
                  value={expenseLabel}
                  onChange={(e) => setExpenseLabel(e.target.value)}
                  placeholder="Catat pengeluaran (mis. Ongkir ekspedisi / Gaji harian)..."
                  className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs focus:border-blue-500 focus:bg-white focus:outline-none"
                />
                <input
                  type="number"
                  required
                  min={1000}
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  placeholder="Nominal (Rp)"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs focus:border-blue-500 focus:bg-white focus:outline-none sm:w-44"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-blue-600 cursor-pointer"
                >
                  Catat Keluar
                </button>
              </form>

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                  <h2 className="text-sm font-extrabold text-slate-950">
                    Buku Kas &amp; Arus Transaksi
                  </h2>
                  <button
                    type="button"
                    onClick={handleExportCsv}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Export CSV
                  </button>
                </div>
                <div className="divide-y divide-slate-100">
                  {cashEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between gap-4 px-5 py-3.5 text-xs"
                    >
                      <div>
                        <p className="font-bold text-slate-900">{entry.label}</p>
                        <p className="text-[11px] text-slate-400">
                          {entry.date} • {entry.type}
                        </p>
                      </div>
                      <span
                        className={`font-mono text-sm font-bold ${
                          entry.type === "Masuk"
                            ? "text-emerald-700"
                            : "text-rose-700"
                        }`}
                      >
                        {entry.type === "Masuk" ? "+" : "-"}
                        {formatRp(entry.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
