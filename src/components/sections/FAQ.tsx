'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { LampContainer } from '@/components/ui/lamp';
import { Button as MovingBorderButton } from '@/components/ui/moving-border';

const faqData = [
  {
    col: 'left',
    question: "What makes your personal fitness program different from other trainers in Dubai?",
    answer: "ASF is built on a science-backed, data-driven methodology unlike most personal training programs. We assess your unique physiology, lifestyle, and goals before creating a fully customised protocol. Every client receives dedicated 1-on-1 attention, structured progress tracking, and ongoing adjustments not just a template workout plan."
  },
  {
    col: 'left',
    question: "Do I need to be fit to start?",
    answer: "Absolutely not. Whether you're completely new to exercise or returning after a long break, our coaches design programs that meet you exactly where you are. We specialise in building sustainable habits and progressive strength regardless of your starting point."
  },
  {
    col: 'left',
    question: "Where are the training sessions conducted?",
    answer: "Sessions are conducted at our flagship facility: Fonds Building, Sheikh Zayed Road, Office 2, Dubai. We are also proud to have tie-up facilities across Dubai and offer flexible at-home or outdoor training to provide maximum convenience for our clients."
  },
  {
    col: 'left',
    question: "What kind of results can I expect?",
    answer: "Results vary depending on your starting point, consistency, and goals. Most clients see measurable changes in strength, body composition, and energy levels within the first 30–60 days. Our 90-day transformation programme is designed to produce significant, lasting results with the right commitment."
  },
  {
    col: 'left',
    question: "Who are your trainers?",
    answer: "Our team of certified, highly experienced coaches specialize in strength training, fat loss, endurance, and sports performance. All ASF trainers hold internationally recognized qualifications and undergo regular upskilling to stay at the forefront of fitness science."
  },
  {
    col: 'left',
    question: "Is there a nutrition plan included?",
    answer: "Yes. Every ASF programme includes comprehensive nutritional guidance tailored to your specific goals. We focus on sustainable eating habits, not restrictive diets helping you fuel performance, recover faster, and maintain results long-term."
  },
  {
    col: 'right',
    question: "What is the cost of the program?",
    answer: "Our pricing is structured around the programme length and level of coaching support you require. We offer packages starting from single sessions up to our premium 90-day transformation bundle. Please reach out to us directly for a personalised quote based on your goals."
  },
  {
    col: 'right',
    question: "How do I track my progress?",
    answer: "We use a combination of body composition assessments, performance benchmarks, and regular check-ins to track your progress objectively. Clients have access to their data through our tracking system, and coaches provide monthly reviews to adjust the plan where necessary."
  },
  {
    col: 'right',
    question: "Do you offer female trainers?",
    answer: "Yes. We understand the importance of comfort and trust in a coaching relationship. ASF has qualified female trainers available upon request. Please let us know your preference when you book your consultation."
  },
  {
    col: 'right',
    question: "What if I have a medical condition or injury?",
    answer: "Your safety is our top priority. We conduct a thorough health and movement screening before your first session. If you have an existing condition or injury, our coaches will work closely with your medical team to design a safe and effective programme."
  },
  {
    col: 'right',
    question: "Can I pause or reschedule sessions?",
    answer: "We understand that life happens. Sessions can be rescheduled with advance notice as per our scheduling policy. For extended pauses due to travel or medical reasons, we offer flexible hold options contact your coach directly to arrange this."
  },
  {
    col: 'right',
    question: "How do I get started?",
    answer: "Getting started is simple. Book a free discovery call or fill in our contact form below. A member of the ASF team will reach out to understand your goals and match you with the right coach and programme. Your transformation journey begins with one conversation."
  },
];

const leftItems = faqData.filter(f => f.col === 'left');
const rightItems = faqData.filter(f => f.col === 'right');

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className={`border-b border-gray-100 last:border-0 relative ${open ? 'z-10' : ''}`}
    >
      {/* Border removed */}

      <button
        onClick={() => setOpen(!open)}
        className="group w-full flex items-center justify-between py-6 text-left outline-none"
      >
        <span className={`font-bold text-base md:text-lg pr-4 transition-colors duration-200 ${open ? 'text-purple' : 'text-dark group-hover:text-purple'}`}>
          {question}
        </span>
        <div className={`flex-shrink-0 p-2 rounded-full transition-all duration-200 ${open ? 'bg-purple text-white' : 'bg-purple/5 text-dark group-hover:bg-purple/10'}`}>
          <motion.div
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Plus className="w-5 h-5" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-500 leading-relaxed text-base">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="flex flex-col bg-white overflow-hidden pt-0 pb-20">
      {/* Lamp Header */}
      <LampContainer className="mb-0">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="section-label !text-black mb-4 font-black"
        >
          GOT QUESTIONS?
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="headline-medium text-center"
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-gray-500 text-lg max-w-xl mt-4 text-center"
        >
          Everything you need to know before taking the first step toward your transformation.
        </motion.p>
      </LampContainer>

      {/* Accordion Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Desktop: 2-col grid */}
        <div className="hidden md:grid grid-cols-2 gap-x-16">
          <div>
            {leftItems.map((item, i) => (
              <FAQItem key={i} question={item.question} answer={item.answer} index={i} />
            ))}
          </div>
          <div>
            {rightItems.map((item, i) => (
              <FAQItem key={i} question={item.question} answer={item.answer} index={i} />
            ))}
          </div>
        </div>

        {/* Mobile: single column */}
        <div className="md:hidden">
          {faqData.map((item, i) => (
            <FAQItem key={i} question={item.question} answer={item.answer} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-gray-500 mb-6 text-lg">Still have questions? We're happy to help.</p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex h-14 w-56 items-center justify-center overflow-hidden rounded-full bg-purple px-8 font-black text-white transition-all duration-300 hover:bg-yellow hover:text-black hover:shadow-[0_0_30px_-5px_#F1FF03] border-[3px] border-purple hover:border-yellow text-center"
            >
              <span className="relative z-10 flex items-center justify-center text-[15px] tracking-widest uppercase">
                Get In Touch
              </span>
            </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
