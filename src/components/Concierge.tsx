import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, User, Bot, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { askConcierge } from '../services/geminiService';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

export const Concierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: '¡Hola! Soy tu conserje virtual del Hostal Plaza Lebu. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const response = await askConcierge(userMsg);
    setMessages(prev => [...prev, { role: 'bot', content: response || 'No pude obtener una respuesta.' }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        id="concierge-trigger"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-[#151619] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform cursor-pointer border border-white/10"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] md:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-[#151619] p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-full">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Conserje Virtual</h3>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">Hostal Plaza Lebu</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:text-gray-300 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
            >
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-2 max-w-[80%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-orange-500' : 'bg-[#151619]'} text-white`}>
                      {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-orange-500 text-white rounded-tr-none' : 'bg-white shadow-sm border border-gray-100 rounded-tl-none text-gray-800'}`}>
                      {m.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 animate-pulse">
                    <div className="p-2 rounded-full h-8 w-8 bg-[#151619] text-white flex items-center justify-center">
                      <Loader2 size={14} className="animate-spin" />
                    </div>
                    <div className="p-3 bg-white shadow-sm border border-gray-100 rounded-2xl rounded-tl-none">
                      <div className="h-2 w-12 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Escribe tu mensaje..."
                  className="w-full bg-gray-100 border-none rounded-full py-3 px-5 pr-12 focus:ring-2 focus:ring-orange-500 text-sm outline-none"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#151619] text-white p-2 rounded-full hover:bg-orange-500 transition-colors disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
