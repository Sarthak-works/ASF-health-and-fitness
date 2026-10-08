"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import BlogForm from "@/components/admin/BlogForm";

function Edit() {
  const slug = useSearchParams().get("slug");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    if (slug)
      getDoc(doc(db, "blogs", slug)).then(
        (s) => s.exists() && setData({ slug: s.id, ...s.data() }),
      );
  }, [slug]);
  if (!data) return <p>Loading…</p>;
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Edit post</h1>
      <BlogForm initial={data} />
    </div>
  );
}
export default function EditBlog() {
  return (
    <Suspense fallback={null}>
      <Edit />
    </Suspense>
  );
}
