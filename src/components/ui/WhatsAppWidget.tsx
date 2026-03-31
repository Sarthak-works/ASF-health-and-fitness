'use client';

import { motion } from 'framer-motion';

export default function WhatsAppWidget() {
  // Use the verified business number without spaces/symbols for the wa.me link
  const whatsappNumber = '971589485094';
  const whatsappMessage = encodeURIComponent('Hi ASF Fitness! I would like to know more about your coaching programs.');

  return (
    <motion.a
      href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-[100] flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:shadow-[0_0_25px_rgba(37,211,102,0.6)] transition-shadow duration-300"
      aria-label="Chat with us on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8"
      >
        <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.115.551 4.168 1.597 5.986L.018 24l6.128-1.609a12.012 12.012 0 0 0 5.885 1.53h.005C18.681 23.921 24 18.536 24 11.89c0-3.235-1.258-6.273-3.542-8.558C18.17 1.047 15.132 0 12.031 0zm0 21.921h-.005a9.98 9.98 0 0 1-5.084-1.39l-.364-.216-3.791.99.999-3.69-.236-.376A9.97 9.97 0 0 1 2.023 11.89c0-5.523 4.492-10.015 10.012-10.015 2.678 0 5.195 1.043 7.086 2.936a10.01 10.01 0 0 1 2.933 7.086c0 5.52-4.493 10.024-10.023 10.024zm5.54-7.55c-.304-.153-1.802-.89-2.08-.992-.28-.103-.483-.153-.687.153-.203.307-.785.992-.962 1.196-.178.204-.356.23-.66.077-.303-.153-1.285-.474-2.45-1.516-.906-.81-1.516-1.81-1.693-2.116-.178-.307-.019-.474.133-.627.137-.138.303-.356.455-.534.152-.178.203-.306.303-.51.102-.204.05-.382-.025-.535-.077-.153-.687-1.658-.941-2.27-.247-.594-.497-.514-.687-.524-.177-.008-.38-.013-.585-.013s-.535.077-.814.383C4.846 6.812 4 7.603 4 9.186c0 1.583 1.116 3.114 1.27 3.318.152.204 2.263 3.454 5.483 4.845.767.332 1.365.53 1.833.678.77.246 1.47.211 2.022.128.618-.093 1.9-.775 2.167-1.523.268-.748.268-1.39.19-1.524-.076-.134-.28-.21-.585-.363z" />
      </svg>
    </motion.a>
  );
}
