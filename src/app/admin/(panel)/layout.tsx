"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import {
  LayoutDashboard,
  FileText,
  ChevronDown,
  Plus,
  Eye,
  Target,
  ExternalLink,
  Globe,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { auth } from "@/lib/firebase";
import AuthGuard from "@/components/admin/AuthGuard";

// Leads from the website forms (popup + footer) are written to this sheet.
const LEADS_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1xs4IDB9_qBK1YaR37Wcu6XEszM2uO8TaSlWAYPdv00E/edit";

const item =
  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors";
const idle = "text-white/80 hover:bg-white/10 hover:text-white";
const current = "bg-white/15 text-white";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [blogsOpen, setBlogsOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const logout = async () => {
    await signOut(auth);
    router.replace("/admin/login");
  };

  const is = (p: string) => pathname === p || pathname === p + "/";
  const close = () => setMobileOpen(false);

  const sidebar = (
    <nav className="flex h-full flex-col gap-1">
      <p className="mb-8 px-3 text-xl font-bold">ASF Admin</p>

      <Link
        href="/admin/dashboard"
        onClick={close}
        className={`${item} ${is("/admin/dashboard") ? current : idle}`}
      >
        <LayoutDashboard className="h-5 w-5" /> Dashboard
      </Link>

      <button
        type="button"
        onClick={() => setBlogsOpen((o) => !o)}
        className={`${item} ${pathname.startsWith("/admin/blogs") ? "text-white" : idle} w-full`}
      >
        <FileText className="h-5 w-5" /> Blogs
        <ChevronDown
          className={`ml-auto h-4 w-4 transition-transform ${blogsOpen ? "rotate-180" : ""}`}
        />
      </button>
      {blogsOpen && (
        <div className="ml-4 flex flex-col gap-1 border-l border-white/15 pl-3">
          <Link
            href="/admin/blogs/new"
            onClick={close}
            className={`${item} ${is("/admin/blogs/new") ? current : idle}`}
          >
            <Plus className="h-4 w-4" /> Add New Blog
          </Link>
          <Link
            href="/admin/blogs"
            onClick={close}
            className={`${item} ${is("/admin/blogs") || pathname.startsWith("/admin/blogs/edit") ? current : idle}`}
          >
            <Eye className="h-4 w-4" /> View All Blogs
          </Link>
        </div>
      )}

      <a
        href={LEADS_SHEET_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${item} ${idle}`}
      >
        <Target className="h-5 w-5" /> Leads
        <ExternalLink className="ml-auto h-3.5 w-3.5 opacity-60" />
      </a>

      <Link href="/" target="_blank" className={`${item} ${idle}`}>
        <Globe className="h-5 w-5" /> View website
        <ExternalLink className="ml-auto h-3.5 w-3.5 opacity-60" />
      </Link>

      <button onClick={logout} className={`${item} ${idle} mt-auto w-full`}>
        <LogOut className="h-5 w-5" /> Log out
      </button>
    </nav>
  );

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-gray-50 text-gray-900">
        {/* Desktop sidebar */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 bg-[#581c87] p-5 text-white md:block">
          {sidebar}
        </aside>

        {/* Mobile top bar + drawer */}
        <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between bg-[#581c87] px-4 py-3 text-white md:hidden">
          <span className="font-bold">ASF Admin</span>
          <button onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu className="h-6 w-6" />
          </button>
        </div>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={close} />
            <aside className="relative h-full w-64 bg-[#581c87] p-5 text-white">
              <button
                onClick={close}
                aria-label="Close menu"
                className="absolute right-4 top-5"
              >
                <X className="h-6 w-6" />
              </button>
              {sidebar}
            </aside>
          </div>
        )}

        <main className="min-w-0 flex-1 p-4 pt-20 md:p-8">{children}</main>
      </div>
    </AuthGuard>
  );
}
