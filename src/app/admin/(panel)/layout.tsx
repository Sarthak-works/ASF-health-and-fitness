"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import AuthGuard from "@/components/admin/AuthGuard";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const logout = async () => {
    await signOut(auth);
    router.replace("/admin/login");
  };

  return (
    <AuthGuard>
      <div className="min-h-screen flex bg-gray-50">
        <aside className="w-56 bg-[#581c87] text-white p-5 flex flex-col">
          {" "}
          <p className="text-xl font-bold mb-8">ASF Admin</p>
          <Link
            href="/admin/blogs"
            className="rounded-lg px-3 py-2 bg-white/10"
          >
            Blogs
          </Link>
          <Link
            href="/"
            target="_blank"
            className="rounded-lg px-3 py-2 mt-2 hover:bg-white/10"
          >
            View website ↗
          </Link>
          <button
            onClick={logout}
            className="mt-auto text-left rounded-lg px-3 py-2 hover:bg-white/10"
          >
            Log out
          </button>
        </aside>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </AuthGuard>
  );
}
