import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export type Blog = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  content: string;
  published: boolean;
  metaDescription?: string;
  tags?: string[];
  featured?: boolean;
  createdAt?: any;
};

export const formatBlogDate = (ts?: { seconds: number }) =>
  ts
    ? new Date(ts.seconds * 1000).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

export async function getPublishedBlogs(): Promise<Blog[]> {
  const q = query(collection(db, "blogs"), where("published", "==", true));
  const snap = await getDocs(q);
  return snap.docs
    .map((d) => ({ slug: d.id, ...(d.data() as any) }) as Blog)
    .sort(
      (a, b) =>
        Number(!!b.featured) - Number(!!a.featured) ||
        (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0),
    );
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const snap = await getDoc(doc(db, "blogs", slug));
    if (!snap.exists() || !snap.data().published) return null;
    return { slug: snap.id, ...(snap.data() as any) } as Blog;
  } catch {
    return null;
  }
}
