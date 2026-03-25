'use client';

import { useState, useEffect, useCallback } from 'react';
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
  { name: 'Blog', href: '#blog' },
  { name: 'Contact Us', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-white/10 transition-all duration-300",
          !isVisible && "pointer-events-none"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <a href="#hero" className="flex items-center">
                <Image
                  src="/logoasf.webp"
                  alt="ASF Fitness Logo"
                  width={144}
                  height={48}
                  className="h-10 md:h-12 w-auto object-contain transition-transform hover:scale-105"
                  priority
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
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[360px] bg-purple z-[70] shadow-2xl p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <Image
                  src="/logoasf.webp"
                  alt="ASF Fitness Logo"
                  width={80}
                  height={32}
                  className="h-8 w-auto object-contain"
                />
                <button onClick={() => setIsOpen(false)} className="p-2 text-white">
                  <X size={28} />
                </button>
              </div>

              <div className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-semibold text-white/90 transition-colors border-b border-white/10 pb-2"
                  >
                    {link.name}
                  </a>
                ))}
                <button className="mt-4 bg-yellow text-black px-6 py-4 rounded-full text-sm font-bold shadow-lg hover:bg-white transition-all">
                  Register Your Interest
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
