"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, CheckCircle, AlertCircle, Mail, Sparkles, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const t = useTranslations('contact');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState<FormStatus>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [focusedField, setFocusedField] = useState<string | null>(null);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
            const response = await fetch(`${apiUrl}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => {
                    onClose();
                    setStatus('idle');
                }, 2500);
            } else {
                const data = await response.json();
                setErrorMessage(data.detail || t('error'));
                setStatus('error');
            }
        } catch {
            setErrorMessage(t('error'));
            setStatus('error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Side Panel - Slides from Right */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="h-full bg-[#0a0a0a] border-l border-[#819fa7]/20 flex flex-col overflow-hidden">
                            
                            {/* Animated Background Elements */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#819fa7]/5 rounded-full blur-3xl" />
                                <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#819fa7]/3 rounded-full blur-3xl" />
                                {/* Grid Pattern */}
                                <div className="absolute inset-0 opacity-[0.02]" style={{
                                    backgroundImage: `linear-gradient(#819fa7 1px, transparent 1px), linear-gradient(90deg, #819fa7 1px, transparent 1px)`,
                                    backgroundSize: '32px 32px'
                                }} />
                            </div>

                            {/* Header */}
                            <div className="relative flex items-start justify-between p-6 md:p-8">
                                <div className="space-y-2">
                                    {/* Badge */}
                                    <motion.div 
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#819fa7]/10 border border-[#819fa7]/20 rounded-full"
                                    >
                                        <Mail className="w-3 h-3 text-[#819fa7]" />
                                        <span className="text-[10px] font-medium text-[#819fa7] uppercase tracking-wider">İletişim</span>
                                    </motion.div>
                                    
                                    <motion.h2 
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.15 }}
                                        className="text-2xl md:text-3xl font-display font-bold text-[#f3f5f9]"
                                    >
                                        {t('title')}
                                    </motion.h2>
                                    
                                    <motion.p 
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-sm text-[#f3f5f9]/40"
                                    >
                                        Mesajınız doğrudan bana ulaşacak ✨
                                    </motion.p>
                                </div>
                                
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    onClick={onClose}
                                    className="p-2.5 text-[#f3f5f9]/40 hover:text-[#f3f5f9] hover:bg-[#819fa7]/10 rounded-xl transition-all border border-transparent hover:border-[#819fa7]/20"
                                >
                                    <X className="w-5 h-5" />
                                </motion.button>
                            </div>

                            {/* Form Container */}
                            <form onSubmit={handleSubmit} className="relative flex-1 overflow-y-auto px-6 md:px-8 pb-6">
                                <div className="space-y-5">
                                    
                                    {/* Name Field */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.25 }}
                                        className="space-y-2"
                                    >
                                        <label className="flex items-center gap-2 text-xs font-semibold text-[#f3f5f9]/60 uppercase tracking-wider">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#819fa7]" />
                                            {t('name')}
                                        </label>
                                        <div className={`relative rounded-2xl transition-all duration-300 ${focusedField === 'name' ? 'ring-2 ring-[#819fa7]/30' : ''}`}>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                minLength={2}
                                                maxLength={100}
                                                value={formData.name}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField('name')}
                                                onBlur={() => setFocusedField(null)}
                                                disabled={status === 'loading'}
                                                className="w-full px-5 py-4 bg-[#111]/80 border border-[#819fa7]/10 rounded-2xl text-[#f3f5f9] placeholder-[#f3f5f9]/20 focus:outline-none focus:border-[#819fa7]/30 focus:bg-[#111] transition-all disabled:opacity-50"
                                                placeholder="Adınız Soyadınız"
                                            />
                                        </div>
                                    </motion.div>

                                    {/* Email Field */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="space-y-2"
                                    >
                                        <label className="flex items-center gap-2 text-xs font-semibold text-[#f3f5f9]/60 uppercase tracking-wider">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#819fa7]" />
                                            {t('email')}
                                        </label>
                                        <div className={`relative rounded-2xl transition-all duration-300 ${focusedField === 'email' ? 'ring-2 ring-[#819fa7]/30' : ''}`}>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField('email')}
                                                onBlur={() => setFocusedField(null)}
                                                disabled={status === 'loading'}
                                                className="w-full px-5 py-4 bg-[#111]/80 border border-[#819fa7]/10 rounded-2xl text-[#f3f5f9] placeholder-[#f3f5f9]/20 focus:outline-none focus:border-[#819fa7]/30 focus:bg-[#111] transition-all disabled:opacity-50"
                                                placeholder="ornek@email.com"
                                            />
                                        </div>
                                    </motion.div>

                                    {/* Subject Field */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.35 }}
                                        className="space-y-2"
                                    >
                                        <label className="flex items-center gap-2 text-xs font-semibold text-[#f3f5f9]/60 uppercase tracking-wider">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#819fa7]/50" />
                                            {t('subject')}
                                            <span className="text-[#f3f5f9]/30 normal-case">(opsiyonel)</span>
                                        </label>
                                        <div className={`relative rounded-2xl transition-all duration-300 ${focusedField === 'subject' ? 'ring-2 ring-[#819fa7]/30' : ''}`}>
                                            <input
                                                type="text"
                                                name="subject"
                                                maxLength={200}
                                                value={formData.subject}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField('subject')}
                                                onBlur={() => setFocusedField(null)}
                                                disabled={status === 'loading'}
                                                className="w-full px-5 py-4 bg-[#111]/80 border border-[#819fa7]/10 rounded-2xl text-[#f3f5f9] placeholder-[#f3f5f9]/20 focus:outline-none focus:border-[#819fa7]/30 focus:bg-[#111] transition-all disabled:opacity-50"
                                                placeholder="İş Teklifi / Proje / Soru..."
                                            />
                                        </div>
                                    </motion.div>

                                    {/* Message Field */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="space-y-2"
                                    >
                                        <label className="flex items-center gap-2 text-xs font-semibold text-[#f3f5f9]/60 uppercase tracking-wider">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#819fa7]" />
                                            {t('message')}
                                        </label>
                                        <div className={`relative rounded-2xl transition-all duration-300 ${focusedField === 'message' ? 'ring-2 ring-[#819fa7]/30' : ''}`}>
                                            <textarea
                                                name="message"
                                                required
                                                minLength={10}
                                                maxLength={5000}
                                                rows={5}
                                                value={formData.message}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField('message')}
                                                onBlur={() => setFocusedField(null)}
                                                disabled={status === 'loading'}
                                                className="w-full px-5 py-4 bg-[#111]/80 border border-[#819fa7]/10 rounded-2xl text-[#f3f5f9] placeholder-[#f3f5f9]/20 focus:outline-none focus:border-[#819fa7]/30 focus:bg-[#111] transition-all resize-none disabled:opacity-50"
                                                placeholder="Mesajınızı detaylı bir şekilde yazabilirsiniz..."
                                            />
                                        </div>
                                        <p className="text-[10px] text-[#f3f5f9]/30 text-right">
                                            {formData.message.length}/5000
                                        </p>
                                    </motion.div>

                                    {/* Status Messages */}
                                    <AnimatePresence mode="wait">
                                        {status === 'success' && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="flex items-center gap-4 p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl"
                                            >
                                                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                                                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-emerald-400">Gönderildi!</p>
                                                    <p className="text-sm text-emerald-400/60">{t('success')}</p>
                                                </div>
                                            </motion.div>
                                        )}
                                        {status === 'error' && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="flex items-center gap-4 p-5 bg-red-500/5 border border-red-500/20 rounded-2xl"
                                            >
                                                <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center">
                                                    <AlertCircle className="w-6 h-6 text-red-400" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-red-400">Hata!</p>
                                                    <p className="text-sm text-red-400/60">{errorMessage}</p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </form>

                            {/* Footer with Submit Button */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="relative p-6 md:p-8 border-t border-[#819fa7]/10 bg-[#0a0a0a]/80 backdrop-blur-sm"
                            >
                                <motion.button
                                    type="submit"
                                    disabled={status === 'loading' || status === 'success'}
                                    onClick={handleSubmit}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    className="group relative w-full flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-[#819fa7] via-[#7a9aa3] to-[#6b8a91] rounded-2xl text-[#0a0a0a] font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                                >
                                    {/* Button Shine Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                    
                                    {status === 'loading' ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>{t('sending')}</span>
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-5 h-5" />
                                            <span>{t('send')}</span>
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </motion.button>
                                
                                {/* Quick Info */}
                                <p className="text-center text-[10px] text-[#f3f5f9]/30 mt-4">
                                    Genellikle 24 saat içinde yanıt veririm
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
