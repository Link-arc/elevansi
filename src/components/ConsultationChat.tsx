"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Bot,
  Loader2,
  MessageSquareText,
  Send,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { QUICK_CHAT_PROMPTS, STUDIO_INFO } from "@/data/studio";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content: `Halo! Saya asisten konsultasi **${STUDIO_INFO.brandName}**. Mau tanya estimasi biaya bikin **Landing Page**, **Web Sistem UMKM** (seperti *Warung Berkah Makmur*), atau **Sistem ERP Custom** untuk bisnis Anda? Silakan ketik atau pilih pertanyaan cepat di bawah!`,
};

function renderFormattedText(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    const parts = line.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return (
      <p key={i} className={i > 0 ? "mt-2" : ""}>
        {parts.map((part, j) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={j} className="font-semibold text-slate-950">
                {part.slice(2, -2)}
              </strong>
            );
          }
          if (part.startsWith("*") && part.endsWith("*")) {
            return (
              <em key={j} className="italic">
                {part.slice(1, -1)}
              </em>
            );
          }
          return <span key={j}>{part}</span>;
        })}
      </p>
    );
  });
}

interface ChatPanelProps {
  messages: ChatMessage[];
  input: string;
  loading: boolean;
  onInputChange: (val: string) => void;
  onSend: (text?: string) => void;
  compact?: boolean;
}

function ChatPanel({
  messages,
  input,
  loading,
  onInputChange,
  onSend,
  compact = false,
}: ChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const lastUserMsg =
    [...messages].reverse().find((m) => m.role === "user")?.content ||
    "Saya ingin konsultasi pembuatan aplikasi Web/Mobile.";

  const waUrl = `https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encodeURIComponent(
    `Halo ${STUDIO_INFO.brandName}, saya baru saja berdiskusi di website mengenai: "${lastUserMsg}". Boleh lanjut konsultasi?`
  )}`;

  return (
    <div className="flex h-full flex-col">
      {/* Messages */}
      <div
        ref={scrollRef}
        className={`flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-5 ${
          compact ? "max-h-[340px]" : "h-[360px]"
        }`}
      >
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${
                isUser ? "flex-row-reverse" : ""
              }`}
            >
              <span
                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
                  isUser
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-blue-200 bg-blue-50 text-blue-700"
                }`}
              >
                {isUser ? (
                  <User className="h-3.5 w-3.5" />
                ) : (
                  <Bot className="h-3.5 w-3.5" />
                )}
              </span>
              <div
                className={`max-w-[84%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  isUser
                    ? "rounded-tr-sm bg-slate-900 text-white"
                    : "rounded-tl-sm border border-slate-200/90 bg-slate-50/90 text-slate-700"
                }`}
              >
                {isUser ? msg.content : renderFormattedText(msg.content)}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-blue-700">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            </span>
            <div className="rounded-2xl rounded-tl-sm border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-medium text-slate-500">
              Sedang menyusun jawaban...
            </div>
          </div>
        )}
      </div>

      {/* Quick Prompts */}
      <div className="border-t border-slate-100 bg-slate-50/60 px-4 py-2.5">
        <div className="flex flex-wrap gap-1.5">
          {QUICK_CHAT_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              disabled={loading}
              onClick={() => onSend(prompt)}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium text-slate-600 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 disabled:opacity-50 cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input & WhatsApp Handoff */}
      <div className="border-t border-slate-200 bg-white p-3 sm:p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Tulis pertanyaan Anda (mis. biaya bikin app kasir)..."
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Kirim pesan"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs transition-colors hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 cursor-pointer"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
        <div className="mt-2.5 flex items-center justify-between gap-2 text-[11px] text-slate-500">
          <span>Butuh penawaran resmi atau jadwal meeting?</span>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
          >
            Lanjut ke WhatsApp
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

interface ConsultationChatProps {
  floatingOpen: boolean;
  onToggleFloating: (open: boolean) => void;
  externalPrompt: string | null;
  onConsumeExternalPrompt: () => void;
}

export function ConsultationChat({
  floatingOpen,
  onToggleFloating,
  externalPrompt,
  onConsumeExternalPrompt,
}: ConsultationChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    if (!overrideText) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: nextMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });
      const data = (await res.json()) as { reply?: string };
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content:
            data.reply ||
            "Terima kasih! Silakan lanjutkan diskusi lewat WhatsApp agar tim kami bisa membantu lebih detail.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          role: "assistant",
          content:
            "Koneksi sedang terganggu. Anda tetap bisa klik Lanjut ke WhatsApp untuk konsultasi langsung.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (externalPrompt) {
      void sendMessage(externalPrompt);
      onConsumeExternalPrompt();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalPrompt]);

  return (
    <>
      {/* Inline Interactive Q&A Section */}
      <section
        id="tanya-ai"
        className="scroll-mt-20 border-y border-slate-200/80 bg-white py-20 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-12">
            {/* Left copy */}
            <div className="lg:col-span-5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                <Sparkles className="h-3.5 w-3.5" />
                Tanya Jawab Interaktif 24/7
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                Punya Ide Aplikasi? Tanya Estimasi &amp; Solusinya di Sini
              </h2>
              <p className="mt-3.5 text-base leading-relaxed text-slate-600">
                Belum yakin harus mulai dari Web atau Mobile, atau ingin tahu
                kisaran budget untuk fitur tertentu? Coba tanya asisten AI kami
                — langsung dapat gambaran cepat sebelum lanjut ke WhatsApp.
              </p>

              <div className="mt-6 space-y-3 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Yang Bisa Anda Tanyakan:
                </p>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>• Kisaran biaya &amp; timeline Landing Page, Web UMKM &amp; ERP</li>
                  <li>• Modul ERP yang cocok untuk stok, transaksi &amp; pembukuan</li>
                  <li>• Detail studi kasus Warung Berkah Makmur tanpa login</li>
                  <li>• Skema pembayaran bertahap &amp; garansi pasca-rilis</li>
                </ul>
              </div>
            </div>

            {/* Right Interactive Chat Card */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50 lg:col-span-7">
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-5 py-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs">
                    <Bot className="h-5 w-5" />
                    <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Asisten Konsultasi {STUDIO_INFO.brandName}
                    </p>
                    <p className="text-[11px] font-medium text-emerald-700">
                      Online • Respon Instan
                    </p>
                  </div>
                </div>
                <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 font-mono text-[10px] font-semibold text-slate-500">
                  AI Assistant
                </span>
              </div>

              <ChatPanel
                messages={messages}
                input={input}
                loading={loading}
                onInputChange={setInput}
                onSend={sendMessage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Floating Chat Launcher + Popover */}
      <div className="fixed bottom-5 right-5 z-40">
        {floatingOpen ? (
          <div className="flex w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-900 px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-400" />
                <div>
                  <p className="text-xs font-bold">
                    Asisten {STUDIO_INFO.brandName}
                  </p>
                  <p className="text-[10px] text-slate-300">
                    Tanya biaya, layanan &amp; studi kasus
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onToggleFloating(false)}
                aria-label="Tutup chat"
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <ChatPanel
              messages={messages}
              input={input}
              loading={loading}
              onInputChange={setInput}
              onSend={sendMessage}
              compact
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onToggleFloating(true)}
            className="group inline-flex items-center gap-2.5 rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-slate-900/20 transition-all hover:scale-105 hover:bg-blue-600 cursor-pointer"
          >
            <MessageSquareText className="h-4 w-4" />
            <span className="hidden sm:inline">Tanya Asisten AI</span>
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
          </button>
        )}
      </div>
    </>
  );
}
