"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import DOMPurify from "dompurify";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Blog, getBlogBySlug } from "@/lib/blogs";

function Post() {
  const slug = useSearchParams().get("slug");
  const [blog, setBlog] = useState<Blog | null>(null);
  const [state, setState] = useState<"loading" | "done">("loading");

  useEffect(() => {
    if (!slug) return setState("done");
    getBlogBySlug(slug).then((b) => { setBlog(b); setState("done"); });
  }, [slug]);

  if (state === "loading") return <p className="text-center py-32">Loading…</p>;
  if (!blog) return <p className="text-center py-32">Post not found.</p>;

  return (
    <article className="max-w-3xl mx-auto px-4 pt-28 pb-16">
      <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
      <img src={blog.coverImage} alt={blog.title} className="w-full rounded-2xl mb-8" />
      <div className="prose prose-lg max-w-none"
           dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }} />
    </article>
  );
}

export default function BlogView() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Suspense fallback={null}><Post /></Suspense>
      <Footer />
    </main>
  );
}