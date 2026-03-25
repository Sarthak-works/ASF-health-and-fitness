import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="z-10 text-center max-w-md mx-auto">
        <div className="mb-8">
          <span className="text-6xl">✅</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
          Thank <span className="text-accent">You!</span>
        </h1>
        
        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
          Your request has been successfully received. We will reach out to schedule your free assessment shortly.
        </p>
        
        <Link 
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 font-bold text-dark transition-all duration-300 hover:bg-yellow hover:scale-105 shadow-[0_0_20px_-5px_#F1FF03] text-center"
        >
          Return to Home
        </Link>
      </div>

      {/* Analytics tracking code can easily be added to this page */}
    </div>
  );
}
