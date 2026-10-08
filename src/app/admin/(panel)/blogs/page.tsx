"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Row = {
  id: string;
  title: string;
  coverImage: string;
  published: boolean;
  createdAt?: { seconds: number };
};

export default function BlogList() {
  const [rows, setRows] = useState<Row[]>([]);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    getDocs(collection(db, "blogs")).then((snap) => {
      if (cancelled) return;
      const list = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Row, "id">),
      }));
      list.sort(
        (a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0),
      );
      setRows(list);
    });
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const remove = async (id: string) => {
    if (!confirm("Delete this post permanently?")) return;
    await deleteDoc(doc(db, "blogs", id));
    setReloadKey((k) => k + 1);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Blogs</h1>
        <Link
          href="/admin/blogs/new"
          className="rounded-lg bg-[#7e22ce] text-white px-4 py-2 hover:bg-[#6b21a8]"
        >
          + New post
        </Link>
      </div>
      <div className="rounded-xl border bg-white divide-y">
        {rows.map((r) => (
          <div key={r.id} className="flex items-center gap-4 p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={r.coverImage}
              alt=""
              className="h-14 w-20 rounded object-cover"
            />
            <div className="flex-1">
              <p className="font-medium">{r.title}</p>
              <p className="text-xs text-gray-500">
                {r.published ? "Published" : "Draft"} · /{r.id}
              </p>
            </div>
            <Link
              href={`/admin/blogs/edit?slug=${r.id}`}
              className="text-purple-700"
            >
              Edit
            </Link>
            <button onClick={() => remove(r.id)} className="text-red-600">
              Delete
            </button>
          </div>
        ))}
        {!rows.length && <p className="p-6 text-gray-500">No posts yet.</p>}
      </div>
    </div>
  );
}
