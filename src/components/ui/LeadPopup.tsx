'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input, Label } from '@/components/ui/signup-form-elements';
import { Button as MovingBorderButton } from '@/components/ui/moving-border';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(6, 'Phone number required'),
});

type FormData = z.infer<typeof schema>;

export default function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggeredExit, setHasTriggeredExit] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    // Entry Popup: Trigger slightly after page load
    const entryTimer = setTimeout(() => {
      if (!sessionStorage.getItem('popupShown')) {
        setIsOpen(true);
        sessionStorage.setItem('popupShown', 'true');
      }
    }, 4000);

    // Exit Intent Popup
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 20 && !hasTriggeredExit) {
        setIsOpen(true);
        setHasTriggeredExit(true);
        sessionStorage.setItem('popupShown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(entryTimer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasTriggeredExit]);

  const closePopup = () => setIsOpen(false);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          coachingType: 'Lead Popup',
          budget: 'N/A',
          message: 'Lead captured from entry/exit popup (Redesign)',
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        reset();
        setTimeout(closePopup, 3000);
      }
    } catch (err) {
      console.error('Submission error:', err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={closePopup}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="relative bg-gradient-to-br from-[#552583]/95 via-[#552583]/90 to-black/95 w-full max-w-md rounded-[2.5rem] shadow-[0_0_80px_-15px_rgba(85,37,131,0.4)] overflow-hidden z-10 p-6 md:p-8 border border-white/10 backdrop-blur-xl"
          >
            {/* Background Decorative Element */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-yellow/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple/20 rounded-full blur-[80px] pointer-events-none" />

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-24 h-24 bg-yellow rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(241,255,3,0.4)]"
                >
                  <Sparkles className="w-12 h-12 text-black" />
                </motion.div>
                <h3 className="text-4xl font-black text-white mb-4 tracking-tight">Success!</h3>
                <p className="text-white/80 text-xl leading-relaxed font-medium max-w-xs mx-auto">
                  Your transformation journey starts now. We'll reach out shortly.
                </p>
              </motion.div>
            ) : (
              <div className="relative z-10">
                <div className="text-center mb-6">
                  <motion.span 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 bg-yellow text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 shadow-[0_10px_20px_-5px_rgba(241,255,3,0.3)] animate-pulse"
                  >
                    <Sparkles className="w-3 h-3" />
                    Limited Time Offer
                  </motion.span>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight tracking-tight">
                    Book Your <span className="text-yellow">Free</span> Assessment!
                  </h3>
                  <p className="text-white/90 text-xs md:text-sm font-semibold leading-relaxed max-w-[280px] mx-auto italic">
                    "An expert trainer will visit you directly to build your personalised roadmap to success."
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="popup-name" className="text-[10px] font-black uppercase tracking-widest text-white/50 ml-2">Full Name</Label>
                      <Input
                        id="popup-name"
                        placeholder="John Smith"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-11 rounded-xl focus-visible:ring-yellow focus-visible:bg-white/10 transition-all duration-300"
                        {...register('name')}
                      />
                      {errors.name && <p className="text-yellow text-[9px] font-bold ml-2">{errors.name.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="popup-email" className="text-[10px] font-black uppercase tracking-widest text-white/50 ml-2">Email</Label>
                        <Input
                          id="popup-email"
                          type="email"
                          placeholder="john@example.com"
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-11 rounded-xl focus-visible:ring-yellow focus-visible:bg-white/10 transition-all duration-300"
                          {...register('email')}
                        />
                        {errors.email && <p className="text-yellow text-[9px] font-bold ml-2">{errors.email.message}</p>}
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="popup-phone" className="text-[10px] font-black uppercase tracking-widest text-white/50 ml-2">Phone</Label>
                        <Input
                          id="popup-phone"
                          type="tel"
                          placeholder="+971 5X XXX"
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-11 rounded-xl focus-visible:ring-yellow focus-visible:bg-white/10 transition-all duration-300"
                          {...register('phone')}
                        />
                        {errors.phone && <p className="text-yellow text-[9px] font-bold ml-2">{errors.phone.message}</p>}
                      </div>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="pt-2"
                  >
                    <MovingBorderButton
                      as="button"
                      type="submit"
                      disabled={isSubmitting}
                      borderRadius="1rem"
                      containerClassName="h-13 w-full"
                      className="bg-yellow text-black font-black text-xs tracking-widest uppercase flex items-center gap-3 justify-center shadow-[0_15px_30px_-8px_rgba(241,255,3,0.3)]"
                      borderClassName="bg-[radial-gradient(white_40%,transparent_60%)]"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        >
                          <Send className="w-5 h-5" />
                        </motion.div>
                      ) : (
                        <>
                          Claim My Free Session
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </MovingBorderButton>
                  </motion.div>
                </form>

                <p className="mt-6 text-center text-[9px] text-white/30 font-bold uppercase tracking-widest">
                  Secure • Confidential • Real Results
                </p>
              </div>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                closePopup();
              }}
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-all hover:rotate-90 duration-300 z-50 p-2"
              aria-label="Close popup"
            >
              <X size={24} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
