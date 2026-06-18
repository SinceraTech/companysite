import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/265899816745"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center"
      title="Chat with us on WhatsApp"
    >
      <MessageCircle size={28} />
      <span className="absolute right-full mr-3 bg-white text-slate-800 px-3 py-1.5 rounded-lg text-sm font-semibold shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        Chat with us
      </span>
    </motion.a>
  );
}
