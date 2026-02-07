import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const FloatingChat = () => (
  <motion.a
    href="https://wa.me/44XXXXXXXXXX"
    target="_blank"
    rel="noopener noreferrer"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 2, duration: 0.5, type: "spring" }}
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110"
    style={{
      background: "linear-gradient(135deg, hsl(142 70% 40%) 0%, hsl(142 70% 48%) 100%)",
    }}
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle className="w-6 h-6 text-primary-foreground" strokeWidth={1.5} />
  </motion.a>
);

export default FloatingChat;
