'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import debounce from 'lodash/debounce';

const navLinks = [
  { name: 'About Us', href: '#about' },
  { name: 'Transformations', href: '#transformations' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Our Team', href: '#team' },
  { name: 'Services', href: '#services' },
  { name: 'FAQ', href: '#faq' },
  // { name: 'Blog', href: '#blog' },
  { name: 'Contact Us', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [videoBgColor, setVideoBgColor] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (ctx) {
          ctx.drawImage(video, 0, 0, 1, 1);
          const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
          if (r > 0 || g > 0 || b > 0) {
            setVideoBgColor(`rgb(${r}, ${g}, ${b})`);
          }
        }
      } catch (e) {
        console.error("Could not extract video color", e);
      }
    };

    video.addEventListener('loadeddata', handleLoadedData);
    if (video.readyState >= 2) handleLoadedData();

    return () => video.removeEventListener('loadeddata', handleLoadedData);
  }, []);

  const handleScroll = useCallback(
    debounce(() => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    }, 10),
    [lastScrollY]
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <>
      <motion.nav
        style={videoBgColor ? { backgroundColor: videoBgColor } : undefined}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/10 transition-all duration-300",
          !videoBgColor && "bg-primary/95",
          !isVisible && "pointer-events-none"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <a href="#hero" className="flex items-center">
                <video
                  ref={videoRef}
                  crossOrigin="anonymous"
                  src="/logov.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  width={180}
                  height={72}
                  className="h-16 md:h-20 w-auto object-contain transition-transform hover:scale-105"
                />
              </a>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                  className="text-sm font-semibold text-white/90 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="bg-accent text-dark px-6 py-3 rounded-full text-sm font-bold shadow-lg hover:bg-yellow transition-all"
              >
                <a href='#contact'>   Register Your Interest</a>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsOpen(true)}
                className="p-2 text-white hover:text-accent transition-colors"
              >
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
            />
            <motion.div
              style={videoBgColor ? { backgroundColor: videoBgColor } : undefined}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className={cn(
                "fixed top-0 right-0 bottom-0 w-full sm:w-[360px] z-[70] shadow-2xl p-8 flex flex-col",
                !videoBgColor && "bg-purple"
              )}
            >
              <div className="flex justify-between items-center mb-12">
                <video
                  src="/logov.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  width={120}
                  height={48}
                  className="h-12 w-auto object-contain"
                />
                <button onClick={() => setIsOpen(false)} className="p-2 text-white">
                  <X size={28} />
                </button>
              </div>

              <div className="flex flex-col space-y-6">
                {navLinks.filter(l => l.name !== 'Contact Us').map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-semibold text-white/90 transition-colors border-b border-white/10 pb-2"
                  >
                    {link.name}
                  </a>
                ))}
                <a href="#contact" onClick={() => setIsOpen(false)} className="mt-4 bg-yellow text-black px-6 py-4 rounded-full text-sm font-bold shadow-lg hover:bg-white transition-all text-center">
                  Register Your Interest
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
