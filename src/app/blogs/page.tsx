import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Blogs from "@/components/sections/Blogs";

export default function BlogsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24">
        <Blogs limit={100} />
      </div>
      <Footer />
    </main>
  );
}
