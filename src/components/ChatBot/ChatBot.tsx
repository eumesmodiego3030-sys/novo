import React, { useEffect, useRef } from 'react';
import { MessageCircle, X, Send, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '@/hooks/useChat';
import { useCart } from '@/i18n/CartContext';
import { useCartUI } from '@/context/CartUIContext';
import { useState } from 'react';

export function ChatBot() {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const {
    messages,
    isOpen,
    isLoading,
    addMessage,
    setIsOpen,
    sendMessage,
  } = useChat();

  const { getTotalItems } = useCart();
  const { isOpen: isCartOpen, setIsOpen: setIsCartOpen } = useCartUI();

  // Initialize chat with greeting on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add initial greeting from assistant
      addMessage('assistant', 'Olá! Bem-vinda! 👋 Eu sou a Assistente de Beleza da Tatiana Torres. Como posso ajudá-la hoje? ✨');
    }
  }, [isOpen, messages.length, addMessage]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    
    // Send message through the hook (which handles backend communication)
    await sendMessage(userMessage);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
      <div className="pointer-events-auto flex items-end gap-4">
        <AnimatePresence mode="wait">
        {!isOpen && !isCartOpen ? (
            <motion.div
              key="closed"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
              className="flex items-center gap-0 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full py-3 px-1 shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              {/* Chat Button */}
              <button
                onClick={() => {
                  setIsOpen(true);
                  setIsCartOpen(false);
                }}
                className="p-3 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Abrir chat"
              >
                <MessageCircle size={24} />
              </button>
              
              {/* Cart Button */}
              <button
                onClick={() => {
                  setIsCartOpen(true);
                  setIsOpen(false);
                }}
                className="p-3 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Abrir carrinho"
              >
                <ShoppingCart size={24} />
              </button>
              
              {/* Badge */}
              <span className="w-6 h-6 bg-red-500 rounded-full animate-pulse flex items-center justify-center text-xs font-bold text-white ml-1">
                {getTotalItems() > 0 ? getTotalItems() : '1'}
              </span>
            </motion.div>
          ) : null}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="open"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
              exit={{ scale: 0.8, opacity: 0, y: 20, transition: { duration: 0.2 } }}
              className="flex flex-col bg-white rounded-lg shadow-2xl w-80 h-96 overflow-hidden border border-gray-200"
            >
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Tatiana Torres</h3>
                <p className="text-sm opacity-90">Assistente de Beleza ✨</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="text-white hover:bg-white/20"
              >
                <X size={20} />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-pink-500 text-white rounded-br-none'
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <span className="text-xs opacity-70 block mt-1">
                        {message.timestamp.toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 px-4 py-2 rounded-lg rounded-bl-none">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <form
              onSubmit={handleSendMessage}
              className="p-4 border-t border-gray-200 flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua mensagem..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                size="icon"
                className="bg-pink-500 hover:bg-pink-600"
              >
                <Send size={18} />
              </Button>
            </form>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
