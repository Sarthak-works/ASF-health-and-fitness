"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) =>
      u ? setOk(true) : router.replace("/admin/login"),
    );
  }, [router]);

  return ok ? <>{children}</> : <p className="p-10">Checking login…</p>;
}
