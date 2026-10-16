"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import DOMPurify from "dompurify";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Blog, formatBlogDate, getBlogBySlug } from "@/lib/blogs";

function Post() {
  const slug = useSearchParams().get("slug");
  const [blog, setBlog] = useState<Blog | null>(null);
  const [state, setState] = useState<"loading" | "done">("loading");

  useEffect(() => {
    if (!slug) return setState("done");
    getBlogBySlug(slug).then((b) => { setBlog(b); setState("done"); });
  }, [slug]);

  // Static export: set the title / meta description on the client.
  useEffect(() => {
    if (!blog) return;
    document.title = `${blog.title} | ASF Health & Fitness`;
    const desc = blog.metaDescription || blog.excerpt;
    if (!desc) return;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = desc;
  }, [blog]);

  if (state === "loading") return <p className="text-center py-32">Loading…</p>;
  if (!blog) return <p className="text-center py-32">Post not found.</p>;

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <h1 className="font-heading text-3xl md:text-5xl font-bold leading-tight mb-4 text-center">{blog.title}</h1>
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 text-sm text-gray-500">
        {formatBlogDate(blog.createdAt) && <span>{formatBlogDate(blog.createdAt)}</span>}
        {blog.tags?.map((t) => (
          <span key={t} className="rounded-full bg-[#f3e8ff] px-2.5 py-0.5 text-xs font-medium text-[#7e22ce]">{t}</span>
        ))}
      </div>
      <img src={blog.coverImage} alt={blog.title} className="w-full h-auto rounded-2xl mb-10" />
      <div className="blog-content prose prose-lg max-w-none prose-headings:font-heading overflow-x-auto"
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