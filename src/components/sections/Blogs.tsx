"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Blog, formatBlogDate, getPublishedBlogs } from "@/lib/blogs";

export default function Blogs({ limit = 3 }: { limit?: number }) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  useEffect(() => {
    getPublishedBlogs().then((b) => setBlogs(b.slice(0, limit)));
  }, [limit]);
  // Keep the #blog anchor in the page while posts load so nav links can target it.
  if (!blogs.length) return <div id="blog" />;

  return (
    <section id="blog" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="section-label !text-black mb-4 font-black">
            FROM OUR BLOG
          </span>
          <h2 className="headline-medium text-center">Latest From Our Blog</h2>
        </div>

        {/* Flex-wrap + justify-center keeps 1–2 posts centred instead of stuck left */}
        <div className="flex flex-wrap justify-center gap-8">
          {blogs.map((b) => {
            const href = `/blogs/view?slug=${b.slug}`;
            const date = formatBlogDate(b.createdAt);
            return (
              <article
                key={b.slug}
                className="group flex w-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(88,28,135,0.15)] sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]"
              >
                <Link
                  href={href}
                  className="relative block aspect-[16/10] overflow-hidden bg-gray-100"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={b.coverImage}
                    alt={b.title}
                    loading="lazy"
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  {b.featured && (
                    <span className="absolute left-3 top-3 rounded-full bg-[#7e22ce] px-3 py-1 text-xs font-semibold text-white">
                      Featured
                    </span>
                  )}
                </Link>

                <div className="flex flex-1 flex-col p-6">
                  <Link href={href}>
                    <h3 className="font-heading text-xl font-bold leading-snug text-gray-900 line-clamp-2 transition-colors group-hover:text-[#7e22ce]">
                      {b.title}
                    </h3>
                  </Link>
                  {date && (
                    <p className="mt-1.5 text-sm text-gray-400">{date}</p>
                  )}
                  {!!b.tags?.length && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {b.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-[#f3e8ff] px-2.5 py-0.5 text-xs font-medium text-[#7e22ce]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  {b.excerpt && (
                    <p className="mt-3 text-[15px] leading-relaxed text-gray-600 line-clamp-3 [overflow-wrap:anywhere]">
                      {b.excerpt}
                    </p>
                  )}
                  <div className="mt-auto pt-6">
                    <Link
                      href={href}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#7e22ce] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#6b21a8]"
                    >
                      Read More <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {limit <= 3 && (
          <div className="mt-12 text-center">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 rounded-lg border border-[#7e22ce] px-6 py-3 font-semibold text-[#7e22ce] transition-colors hover:bg-[#7e22ce] hover:text-white"
            >
              View all posts <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
