"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Blog, formatBlogDate } from "@/lib/blogs";

export default function Dashboard() {
  const [blogs, setBlogs] = useState<Blog[] | null>(null);

  useEffect(() => {
    getDocs(collection(db, "blogs")).then((snap) => {
      const list = snap.docs.map((d) => ({ slug: d.id, ...d.data() }) as Blog);
      list.sort(
        (a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0),
      );
      setBlogs(list);
    });
  }, []);

  const published = blogs?.filter((b) => b.published).length ?? 0;
  const stats = [
    { label: "Total posts", value: blogs?.length ?? 0 },
    { label: "Published", value: published },
    { label: "Drafts", value: (blogs?.length ?? 0) - published },
    { label: "Featured", value: blogs?.filter((b) => b.featured).length ?? 0 },
  ];

  return (
    <div className="max-w-5xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <Link
          href="/admin/blogs/new"
          className="rounded-lg bg-[#7e22ce] px-4 py-2 text-white hover:bg-[#6b21a8]"
        >
          + New post
        </Link>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className="mt-1 text-3xl font-semibold text-[#581c87]">
              {blogs ? s.value : "–"}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <h2 className="font-semibold">Recent posts</h2>
          <Link href="/admin/blogs" className="text-sm text-purple-700">
            View all →
          </Link>
        </div>
        <div className="divide-y">
          {blogs?.slice(0, 5).map((b) => (
            <Link
              key={b.slug}
              href={`/admin/blogs/edit?slug=${b.slug}`}
              className="flex items-center gap-4 p-4 hover:bg-gray-50"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={b.coverImage}
                alt=""
                className="h-12 w-20 shrink-0 rounded object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{b.title}</p>
                <p className="text-xs text-gray-500">
                  {formatBlogDate(b.createdAt)}
                </p>
              </div>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  b.published
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {b.published ? "Published" : "Draft"}
              </span>
            </Link>
          ))}
          {blogs && !blogs.length && (
            <p className="p-6 text-gray-500">No posts yet.</p>
          )}
          {!blogs && <p className="p-6 text-gray-500">Loading…</p>}
        </div>
      </div>
    </div>
  );
}
