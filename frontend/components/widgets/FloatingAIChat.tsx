"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Minimize2, Loader2 } from 'lucide-react';
import { sendChatMessage, getChatSuggestions, type ChatSuggestion } from '@/lib/api';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function FloatingAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Merhaba! Ben Duran'ın AI Asistanıyım. Projeleri, yetenekleri ve deneyimi hakkında sorularınızı yanıtlayabilirim. Size nasıl yardımcı olabilirim?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<ChatSuggestion[]>([]);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load suggestions when chat opens
  useEffect(() => {
    if (isOpen && suggestions.length === 0) {
      loadSuggestions();
    }
  }, [isOpen, suggestions.length]);

  const loadSuggestions = async () => {
    try {
      const data = await getChatSuggestions();
      setSuggestions(data.suggestions);
    } catch {
      // Use fallback suggestions
      setSuggestions([
        { question: 'Projelerinden bahseder misin?', category: 'projects' },
        { question: 'Hangi teknolojileri kullanıyorsun?', category: 'skills' },
        { question: 'Deneyimin nedir?', category: 'experience' }
      ]);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await sendChatMessage({
        message: input,
        session_id: sessionId || undefined
      });

      // Save session ID for conversation context
      if (response.session_id) {
        setSessionId(response.session_id);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch {
      setError('Bağlantı hatası. Lütfen tekrar deneyin.');
      // Fallback message
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Şu anda bağlantı kuramıyorum. Lütfen daha sonra tekrar deneyin veya doğrudan iletişim formunu kullanın.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (question: string) => {
    setInput(question);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-br from-[#819fa7] to-[#5b6e74] text-[#0d0d0d] rounded-full shadow-lg hover:shadow-xl transition-shadow group"
          >
            <div className="relative">
              <MessageCircle className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            </div>

            {/* Tooltip */}
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-[#1a1a1a] text-[#f3f5f9] text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              AI Asistan ile konuş
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] bg-[#0d0d0d] rounded-2xl shadow-2xl border border-[#819fa7]/30 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[#819fa7]/20 to-[#5b6e74]/20 border-b border-[#819fa7]/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#819fa7] to-[#5b6e74] flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#0d0d0d]" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0d0d0d]" />
                </div>
                <div>
                  <h3 className="text-[#f3f5f9] font-semibold">AI Asistan</h3>
                  <p className="text-xs text-[#819fa7]">Çevrimiçi</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-[#819fa7]/20 rounded-lg transition-colors"
                >
                  <Minimize2 className="w-4 h-4 text-[#819fa7]" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-[#819fa7]/20 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-[#819fa7]" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#819fa7]/20 scrollbar-track-transparent">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-2xl ${message.role === 'user'
                        ? 'bg-gradient-to-br from-[#819fa7] to-[#5b6e74] text-[#0d0d0d]'
                        : 'bg-[#1a1a1a] text-[#f3f5f9] border border-[#819fa7]/20'
                      }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className={`text-[10px] mt-1 ${message.role === 'user' ? 'text-[#0d0d0d]/60' : 'text-[#f3f5f9]/40'
                      }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-[#1a1a1a] border border-[#819fa7]/20 px-4 py-3 rounded-2xl">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-[#819fa7] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-[#819fa7] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-[#819fa7] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}

              {error && (
                <div className="text-center text-xs text-red-400/80">
                  {error}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-2 border-t border-[#819fa7]/10">
              <div className="flex gap-2 overflow-x-auto scrollbar-none">
                {(suggestions.length > 0 ? suggestions.slice(0, 3) : [
                  { question: 'Projelerinden bahseder misin?', category: 'projects' },
                  { question: 'Hangi teknolojiler?', category: 'skills' },
                  { question: 'Deneyimin nedir?', category: 'experience' }
                ]).map((suggestion) => (
                  <button
                    key={suggestion.question}
                    onClick={() => handleSuggestionClick(suggestion.question)}
                    className="px-3 py-1.5 text-xs text-[#819fa7] bg-[#819fa7]/10 hover:bg-[#819fa7]/20 rounded-full whitespace-nowrap transition-colors"
                  >
                    {suggestion.question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[#819fa7]/30 bg-[#1a1a1a]/50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Bir soru sorun..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-2.5 bg-[#0d0d0d] text-[#f3f5f9] placeholder-[#f3f5f9]/40 border border-[#819fa7]/20 rounded-xl focus:outline-none focus:border-[#819fa7]/50 transition-colors text-sm disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="p-2.5 bg-gradient-to-br from-[#819fa7] to-[#5b6e74] text-[#0d0d0d] rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
