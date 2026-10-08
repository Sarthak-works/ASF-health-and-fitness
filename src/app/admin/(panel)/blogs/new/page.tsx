import BlogForm from "@/components/admin/BlogForm";
export default function NewBlog() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">New post</h1>
      <BlogForm />
    </div>
  );
}
