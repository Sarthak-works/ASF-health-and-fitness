"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Blog, getPublishedBlogs } from "@/lib/blogs";

export default function Blogs({ limit = 3 }: { limit?: number }) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  useEffect(() => {
    getPublishedBlogs().then((b) => setBlogs(b.slice(0, limit)));
  }, [limit]);
  if (!blogs.length) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-10">
        Latest From Our Blog
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {blogs.map((b) => (
          <Link
            key={b.slug}
            href={`/blogs/view?slug=${b.slug}`}
            className="rounded-2xl overflow-hidden border bg-white hover:shadow-lg transition"
          >
            <img
              src={b.coverImage}
              alt={b.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-5">
              <h3 className="font-semibold text-lg">{b.title}</h3>
              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {b.excerpt}
              </p>
              <span className="text-purple-700 text-sm font-medium mt-3 inline-block">
                Read more →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
