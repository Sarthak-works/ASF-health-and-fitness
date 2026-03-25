'use client';

import { motion } from 'framer-motion';
import { DirectionAwareHover } from '@/components/ui/direction-aware-hover';
import { AnimatedTooltip } from '@/components/ui/AnimatedTooltip';

const blogs = [
  {
    id: 1,
    title: "ASF's 30-Minute Formula for Busy Professionals",
    date: "August 7, 2025",
    readTime: "4 min read",
    excerpt: "Discover how to maximize your workout efficiency when you're short on time. Our 30-minute high-intensity protocol is designed to deliver maximum results in minimum time.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Stop Chasing Diets, Eat More, Burn More",
    date: "August 7, 2025",
    readTime: "6 min read",
    excerpt: "The truth about metabolism and why restrictive dieting is holding you back. Learn how to fuel your body correctly to optimize fat loss and muscle gain.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "What 90 Days with ASF Can Do",
    date: "April 21, 2025",
    readTime: "5 min read",
    excerpt: "Real transformations and the science behind our 90-day protocol. We break down the physiological shifts that occur when you commit to our elite transformation program.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "8 Signs You Need a Personal Trainer",
    date: "April 21, 2025",
    readTime: "3 min read",
    excerpt: "If you're hitting a plateau, it might be time for expert guidance. Discover the psychological and physical signals that indicate you're ready for professional coaching.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Why Most Workout Plans Fail & How ASF Fixes It",
    date: "April 16, 2025",
    readTime: "7 min read",
    excerpt: "Understanding the psychological and physiological reasons for plan failure. We explore our unique 'Discipline First' methodology that ensures long-term consistency.",
    image: "https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80&w=1000&auto=format&fit=crop"
  }
];

export default function Blogs() {
  return (
    <section id="blog" className="bg-white overflow-hidden py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        <div className="mb-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-bold text-purple tracking-[0.2em] uppercase opacity-70 mb-1 block"
          >
            LATEST INSIGHTS
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl lg:text-3xl font-bold text-dark"
          >
            Recent Blogs
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.slice(0, 3).map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-left group cursor-pointer bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-purple/5 transition-all p-2"
            >
              <div className="relative aspect-[16/9] bg-gray-100 rounded-2xl overflow-hidden mb-3">
                <DirectionAwareHover
                  imageUrl={post.image}
                  className="w-full h-full"
                  imageClassName="group-hover:scale-110 transition-transform duration-500"
                >
                  <p className="font-bold text-lg">{post.title}</p>
                  <p className="font-normal text-xs">{post.date}</p>
                </DirectionAwareHover>

                {/* Tooltip Overlay */}
                <div className="absolute top-2 right-2 scale-75 z-50">
                  <AnimatedTooltip items={[{
                    id: post.id,
                    name: post.date,
                    designation: post.readTime,
                    image: post.image
                  }]} />
                </div>
              </div>

              <div className="px-3 pb-4">
                <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-widest mb-1">
                  {post.date}
                </p>

                <h3 className="text-base font-bold text-dark group-hover:text-purple transition-colors mb-2 line-clamp-1">
                  {post.title}
                </h3>

                <p className="text-gray-500 mb-4 text-xs line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>

                <span className="text-purple font-black uppercase tracking-tighter text-xs flex items-center gap-2 group-hover:gap-3 transition-all">
                  Read Full Story <span className="text-lg">→</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <button className="bg-purple border-2 border-purple text-white hover:text-black font-black px-8 py-3 rounded-full hover:bg-yellow hover:border-yellow transition-all uppercase tracking-widest text-xs shadow-lg shadow-accent/5">
            Show More
          </button>
        </motion.div>
      </div>
    </section>
  );
}
