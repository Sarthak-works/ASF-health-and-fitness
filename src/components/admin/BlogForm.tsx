"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { uploadImage } from "@/lib/upload";
import RichEditor from "./RichEditor";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

type Initial = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  content: string;
  published: boolean;
};

export default function BlogForm({ initial }: { initial?: Initial }) {
  const router = useRouter();
  const isEdit = !!initial;
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [cover, setCover] = useState(initial?.coverImage ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [published, setPublished] = useState(initial?.published ?? true);
  const [busy, setBusy] = useState(false);

  const onCover = async (f?: File) => {
    if (!f) return;
    setBusy(true);
    try {
      setCover(await uploadImage(f));
    } catch (e) {
      console.error("Upload error:", e);
      alert("Upload failed: " + (e instanceof Error ? e.message : String(e)));
    }
    setBusy(false);
  };

  const save = async () => {
    const finalSlug = isEdit ? initial!.slug : slugify(slug || title);
    if (!title || !finalSlug || !cover || !content)
      return alert("Title, cover image and content are required.");
    setBusy(true);
    try {
      const ref = doc(db, "blogs", finalSlug);
      if (!isEdit && (await getDoc(ref)).exists()) {
        setBusy(false);
        return alert(
          "A post with this URL slug already exists. Change the slug.",
        );
      }
      await setDoc(
        ref,
        {
          title,
          excerpt,
          coverImage: cover,
          content,
          published,
          updatedAt: serverTimestamp(),
          ...(isEdit ? {} : { createdAt: serverTimestamp() }),
        },
        { merge: true },
      );
      router.push("/admin/blogs");
    } catch (e) {
      console.error(e);
      alert("Save failed. Check the console.");
      setBusy(false);
    }
  };

  const input =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-[#7e22ce] focus:outline-none focus:ring-2 focus:ring-[#7e22ce]/20 disabled:bg-gray-100 disabled:text-gray-500";
  const label = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div className="max-w-4xl space-y-6 rounded-xl border border-gray-200 bg-white p-6 text-gray-900 shadow-sm">
      <div>
        <label className={label}>Title</label>
        <input
          className={input}
          placeholder="e.g. 5 habits for better sleep"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!isEdit) setSlug(slugify(e.target.value));
          }}
        />
      </div>

      <div>
        <label className={label}>URL slug</label>
        <input
          className={input}
          placeholder="5-habits-for-better-sleep"
          value={slug}
          disabled={isEdit}
          onChange={(e) => setSlug(slugify(e.target.value))}
        />
        <p className="mt-1 text-xs text-gray-500">
          {isEdit
            ? "The slug can't be changed after publishing."
            : `Post URL: /blogs/${slug || "your-slug"}`}
        </p>
      </div>

      <div>
        <label className={label}>Short excerpt</label>
        <textarea
          className={input}
          rows={3}
          placeholder="Shown on blog cards"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />
      </div>

      <div>
        <label className={label}>Cover image</label>
        {cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt=""
            className="mb-3 h-40 rounded-lg border border-gray-200 object-cover"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onCover(e.target.files?.[0])}
          className="block w-full text-sm text-gray-600 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-[#f3e8ff] file:px-4 file:py-2 file:text-sm file:font-medium file:text-[#7e22ce] hover:file:bg-[#e9d5ff]"
        />
      </div>

      <div>
        <label className={label}>Content</label>
        <RichEditor value={content} onChange={setContent} />
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 pt-5">
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="h-4 w-4 accent-[#7e22ce]"
          />
          Published (uncheck to save as draft)
        </label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/blogs")}
            className="rounded-lg border border-gray-300 px-5 py-2 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={save}
            disabled={busy}
            className="rounded-lg bg-[#7e22ce] px-6 py-2 font-medium text-white hover:bg-[#6b21a8] disabled:opacity-50"
          >
            {busy ? "Working…" : isEdit ? "Update post" : "Publish post"}
          </button>
        </div>
      </div>
    </div>
  );
}
