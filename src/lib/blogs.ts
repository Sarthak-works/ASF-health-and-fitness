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
  createdAt?: any;
};

export async function getPublishedBlogs(): Promise<Blog[]> {
  const q = query(collection(db, "blogs"), where("published", "==", true));
  const snap = await getDocs(q);
  return snap.docs
    .map((d) => ({ slug: d.id, ...(d.data() as any) }) as Blog)
    .sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0));
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
