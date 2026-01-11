"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Sparkles, Send, Loader2, Bot, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import SectionReveal from '@/components/animations/SectionReveal';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function AIAssistant() {
  const t = useTranslations('aiAssistant');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

  const sampleQuestions = [
    t('sampleQuestions.q1'),
    t('sampleQuestions.q2'),
    t('sampleQuestions.q3'),
    t('sampleQuestions.q4')
  ];

  const features = [
    { title: t('features.realtime.title'), desc: t('features.realtime.desc') },
    { title: t('features.context.title'), desc: t('features.context.desc') },
    { title: t('features.learning.title'), desc: t('features.learning.desc') }
  ];

  // Scroll to bottom when messages change (only within chat container)
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText.trim(),
          session_id: sessionId
        }),
      });

      if (!response.ok) {
        throw new Error('Sunucu hatası');
      }

      const data = await response.json();

      // Save session ID for context
      if (data.session_id) {
        setSessionId(data.session_id);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError('Bir hata oluştu. Backend çalışıyor mu kontrol edin.');
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuestionClick = (question: string) => {
    sendMessage(question);
  };

  return (
    <section id="ai-assistant" className="relative py-24 px-6 overflow-hidden bg-[#0d0d0d]">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#1a1a1a] to-[#0d0d0d]" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `
          linear-gradient(#819fa7 1px, transparent 1px),
          linear-gradient(90deg, #819fa7 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }} />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <SectionReveal className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-[#819fa7]/30 bg-[#819fa7]/5">
            <Sparkles className="w-4 h-4 text-[#819fa7]" />
            <span className="text-xs font-light tracking-[0.3em] uppercase text-[#819fa7]">
              {t('badge')}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#f3f5f9] mb-4">
            {t('title')}
          </h2>
          <p className="text-[#f3f5f9]/60 max-w-2xl mx-auto text-lg">
            {t('subtitle')}
          </p>
        </SectionReveal>

        {/* Chat Interface */}
        <SectionReveal delay={0.2}>
          <div className="relative">
            {/* Chat Container */}
            <div className="relative rounded-2xl bg-gradient-to-br from-[#1a1a1a]/80 to-[#0d0d0d]/80 border border-[#819fa7]/20 backdrop-blur-xl overflow-hidden">

              {/* Chat Header */}
              <div className="px-6 py-4 border-b border-[#819fa7]/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#819fa7]/20 border border-[#819fa7]/30 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-[#819fa7]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#f3f5f9]">{t('chatHeader.title')}</h3>
                    <p className="text-xs text-[#f3f5f9]/50">{t('chatHeader.poweredBy')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs text-emerald-400 ml-2">Çevrimiçi</span>
                </div>
              </div>

              {/* Chat Body */}
              <div ref={messagesContainerRef} className="p-6 min-h-[400px] max-h-[500px] overflow-y-auto scroll-smooth">
                {messages.length === 0 ? (
                  /* Sample Questions - Show when no messages */
                  <div className="w-full max-w-xl mx-auto space-y-4">
                    <p className="text-sm text-[#f3f5f9]/60 text-center mb-6">
                      {t('sampleQuestionsTitle')}
                    </p>

                    {sampleQuestions.map((question) => (
                      <button
                        key={question}
                        onClick={() => handleQuestionClick(question)}
                        className="w-full p-4 rounded-lg text-left transition-all duration-200 bg-[#1a1a1a]/50 border border-[#819fa7]/10 hover:border-[#819fa7]/30 hover:bg-[#819fa7]/5 hover:translate-x-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-[#f3f5f9]/80">{question}</span>
                          <Send className="w-4 h-4 text-[#f3f5f9]/30" />
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  /* Messages */
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {message.role === 'assistant' && (
                          <div className="w-8 h-8 rounded-full bg-[#819fa7]/20 border border-[#819fa7]/30 flex items-center justify-center shrink-0">
                            <Bot className="w-4 h-4 text-[#819fa7]" />
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] p-4 rounded-2xl ${message.role === 'user'
                            ? 'bg-[#819fa7]/20 border border-[#819fa7]/30 text-[#f3f5f9]'
                            : 'bg-[#1a1a1a]/80 border border-[#819fa7]/10 text-[#f3f5f9]/90'
                            }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                        {message.role === 'user' && (
                          <div className="w-8 h-8 rounded-full bg-[#819fa7]/30 border border-[#819fa7]/40 flex items-center justify-center shrink-0">
                            <User className="w-4 h-4 text-[#819fa7]" />
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Loading indicator */}
                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-3"
                      >
                        <div className="w-8 h-8 rounded-full bg-[#819fa7]/20 border border-[#819fa7]/30 flex items-center justify-center">
                          <Bot className="w-4 h-4 text-[#819fa7]" />
                        </div>
                        <div className="p-4 rounded-2xl bg-[#1a1a1a]/80 border border-[#819fa7]/10">
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 text-[#819fa7] animate-spin" />
                            <span className="text-sm text-[#f3f5f9]/60">Düşünüyor...</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Error message */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center"
                      >
                        {error}
                      </motion.div>
                    )}
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSubmit} className="px-6 py-4 border-t border-[#819fa7]/10">
                <div className="flex gap-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Duran hakkında bir şey sor..."
                    disabled={isLoading}
                    className="flex-1 px-4 py-3 rounded-lg bg-[#1a1a1a]/50 border border-[#819fa7]/20 text-[#f3f5f9] text-sm placeholder:text-[#f3f5f9]/30 focus:outline-none focus:border-[#819fa7]/50 transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="px-6 py-3 rounded-lg bg-[#819fa7]/20 border border-[#819fa7]/30 text-[#819fa7] text-sm font-medium hover:bg-[#819fa7]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    Gönder
                  </button>
                </div>
              </form>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {features.map((feature, index) => (
                <SectionReveal key={feature.title} delay={0.4 + index * 0.1}>
                  <div className="h-full p-4 rounded-lg bg-[#1a1a1a]/40 border border-[#819fa7]/10 hover:border-[#819fa7]/25 transition-colors">
                    <h4 className="text-sm font-semibold text-[#f3f5f9] mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-[#f3f5f9]/50">
                      {feature.desc}
                    </p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
