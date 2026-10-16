"use client";
import { usePathname } from "next/navigation";

// Renders children everywhere except the admin panel.
export default function PublicOnly({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <>{children}</>;
}
