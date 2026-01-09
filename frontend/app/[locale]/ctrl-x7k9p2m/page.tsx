"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Eye, EyeOff, Terminal, Save, LogOut, Check, AlertCircle, Loader2, Monitor, Plus, Trash2, ChevronDown, ChevronRight } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
type Lang = "tr" | "en";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [loginLoading, setLoginLoading] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    const [lang, setLang] = useState<Lang>("tr");
    const [translations, setTranslations] = useState<any>({});
    const [activeTab, setActiveTab] = useState("hero");
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
    const [saveMessage, setSaveMessage] = useState("");
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const savedToken = localStorage.getItem("admin_token");
        if (savedToken) {
            setToken(savedToken);
            setIsAuthenticated(true);
            fetchTranslations(savedToken, lang);
        }
    }, []);

    useEffect(() => {
        if (token) fetchTranslations(token, lang);
    }, [lang, token]);

    const fetchTranslations = async (authToken: string, language: Lang) => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/translations/${language}`, { headers: { Authorization: `Bearer ${authToken}` } });
            if (res.ok) {
                const data = await res.json();
                setTranslations(data.content);
            } else if (res.status === 401) handleLogout();
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    const saveField = async (path: string, value: any) => {
        if (!token) return;
        setSaving(true);
        try {
            await fetch(`${API_URL}/translations/${lang}/field`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ path, value }),
            });
            // Update local state
            const keys = path.split(".");
            setTranslations((prev: any) => {
                const newData = JSON.parse(JSON.stringify(prev));
                let current = newData;
                for (let i = 0; i < keys.length - 1; i++) current = current[keys[i]];
                current[keys[keys.length - 1]] = value;
                return newData;
            });
            showMessage("✓ Kaydedildi");
        } catch { showMessage("✗ Hata"); }
        finally { setSaving(false); }
    };

    const saveSection = async (section: string, data: any) => {
        if (!token) return;
        setSaving(true);
        try {
            await fetch(`${API_URL}/translations/${lang}/section/${section}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify(data),
            });
            setTranslations((prev: any) => ({ ...prev, [section]: data }));
            showMessage("✓ Bölüm kaydedildi");
        } catch { showMessage("✗ Hata"); }
        finally { setSaving(false); }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError("");
        setLoginLoading(true);
        try {
            const res = await fetch(`${API_URL}/admin/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });
            const data = await res.json();
            if (data.success && data.token) {
                setToken(data.token);
                localStorage.setItem("admin_token", data.token);
                setIsAuthenticated(true);
                fetchTranslations(data.token, lang);
            } else setLoginError(data.message || "Giriş başarısız");
        } catch { setLoginError("Bağlantı hatası"); }
        finally { setLoginLoading(false); }
    };

    const handleLogout = () => {
        localStorage.removeItem("admin_token");
        setToken(null);
        setIsAuthenticated(false);
    };

    const showMessage = (msg: string) => {
        setSaveMessage(msg);
        setTimeout(() => setSaveMessage(""), 2000);
    };

    const toggleExpand = (key: string) => {
        setExpandedItems(prev => {
            const next = new Set(prev);
            next.has(key) ? next.delete(key) : next.add(key);
            return next;
        });
    };

    // Login
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-sm">
                    <div className="bg-[#111] rounded-2xl border border-white/10 p-8">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                                <Terminal className="w-8 h-8 text-emerald-400" />
                            </div>
                            <h1 className="text-2xl font-bold text-white">Admin CMS</h1>
                            <p className="text-sm text-white/40">Tüm site içeriğini düzenle</p>
                        </div>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-white focus:outline-none focus:border-emerald-500/50" placeholder="Şifre" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30">
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {loginError && <div className="text-red-400 text-sm flex items-center gap-2"><AlertCircle className="w-4 h-4" />{loginError}</div>}
                            <button type="submit" disabled={loginLoading} className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 rounded-xl text-white font-medium flex items-center justify-center gap-2">
                                {loginLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Giriş Yap"}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        );
    }

    const TABS = [
        { id: "hero", label: "🏠 Hero" },
        { id: "about", label: "👤 Hakkımda" },
        { id: "projects", label: "🚀 Projeler" },
        { id: "skills", label: "💡 Yetenekler" },
        { id: "experience", label: "📚 Deneyim" },
        { id: "thinking", label: "🧠 Düşünce" },
        { id: "roadmap", label: "🗺️ Yol Haritası" },
    ];

    const sectionData = translations[activeTab] || {};

    // Field Editor Component
    const Field = ({ label, value, path, multiline = false }: { label: string; value: string; path: string; multiline?: boolean }) => {
        const [val, setVal] = useState(value);
        const [edited, setEdited] = useState(false);

        useEffect(() => { setVal(value); setEdited(false); }, [value]);

        return (
            <div className="space-y-1">
                <label className="text-xs text-white/50 uppercase tracking-wider">{label}</label>
                <div className="flex gap-2">
                    {multiline ? (
                        <textarea value={val} onChange={(e) => { setVal(e.target.value); setEdited(true); }} rows={3} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 resize-none" />
                    ) : (
                        <input type="text" value={val} onChange={(e) => { setVal(e.target.value); setEdited(true); }} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50" />
                    )}
                    <button onClick={() => { saveField(path, val); setEdited(false); }} disabled={!edited || saving} className={`px-3 rounded-lg transition-colors ${edited ? "bg-emerald-500 text-white" : "bg-white/5 text-white/20"}`}>
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    </button>
                </div>
            </div>
        );
    };

    // Item Editor Component (for projects, experience items, etc.)
    const ItemEditor = ({ itemKey, item, basePath, fields }: { itemKey: string; item: any; basePath: string; fields: { key: string; label: string; multiline?: boolean }[] }) => {
        const isExpanded = expandedItems.has(itemKey);
        return (
            <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                <button onClick={() => toggleExpand(itemKey)} className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/5">
                    <span className="font-medium text-white">{item.title || itemKey}</span>
                    {isExpanded ? <ChevronDown className="w-4 h-4 text-white/50" /> : <ChevronRight className="w-4 h-4 text-white/50" />}
                </button>
                {isExpanded && (
                    <div className="px-4 pb-4 space-y-3 border-t border-white/5">
                        {fields.map((field) => (
                            <Field key={field.key} label={field.label} value={item[field.key] || ""} path={`${basePath}.${itemKey}.${field.key}`} multiline={field.multiline} />
                        ))}
                    </div>
                )}
            </div>
        );
    };

    // Render section content
    const renderContent = () => {
        switch (activeTab) {
            case "hero":
                return (
                    <div className="space-y-4">
                        <Field label="Selamlama" value={sectionData.greeting || ""} path="hero.greeting" />
                        <Field label="İsim" value={sectionData.name || ""} path="hero.name" />
                        <Field label="Ünvan" value={sectionData.title || ""} path="hero.title" />
                        <Field label="Alt Başlık" value={sectionData.subtitle || ""} path="hero.subtitle" multiline />
                        <Field label="Durum (Badge)" value={sectionData.status || ""} path="hero.status" />
                    </div>
                );

            case "about":
                return (
                    <div className="space-y-4">
                        <Field label="Başlık" value={sectionData.title || ""} path="about.title" />
                        <Field label="Alt Başlık" value={sectionData.subtitle || ""} path="about.subtitle" />
                        <Field label="Bio" value={sectionData.bio || ""} path="about.bio" multiline />
                        <Field label="Alıntı" value={sectionData.quote || ""} path="about.quote" />
                        <h3 className="text-sm font-medium text-white/70 mt-6 mb-3">📋 Öne Çıkanlar</h3>
                        {sectionData.highlights?.items && Object.entries(sectionData.highlights.items).map(([key, item]: [string, any]) => (
                            <ItemEditor key={key} itemKey={key} item={item} basePath="about.highlights.items" fields={[{ key: "title", label: "Başlık" }, { key: "description", label: "Açıklama" }]} />
                        ))}
                    </div>
                );

            case "projects":
                return (
                    <div className="space-y-4">
                        <Field label="Rozet" value={sectionData.badge || ""} path="projects.badge" />
                        <Field label="Başlık" value={sectionData.title || ""} path="projects.title" />
                        <Field label="Alt Başlık" value={sectionData.subtitle || ""} path="projects.subtitle" multiline />
                        <h3 className="text-sm font-medium text-white/70 mt-6 mb-3">📦 Projeler</h3>
                        {sectionData.items && Object.entries(sectionData.items).map(([key, item]: [string, any]) => (
                            <ItemEditor key={key} itemKey={key} item={item} basePath="projects.items" fields={[
                                { key: "title", label: "Proje Adı" },
                                { key: "period", label: "Dönem" },
                                { key: "tagline", label: "Açıklama", multiline: true },
                                { key: "impact", label: "Etki", multiline: true },
                            ]} />
                        ))}
                    </div>
                );

            case "skills":
                return (
                    <div className="space-y-4">
                        <Field label="Rozet" value={sectionData.badge || ""} path="skills.badge" />
                        <Field label="Başlık" value={sectionData.title || ""} path="skills.title" />
                        <Field label="Alt Başlık" value={sectionData.subtitle || ""} path="skills.subtitle" multiline />
                        <h3 className="text-sm font-medium text-white/70 mt-6 mb-3">📂 Kategoriler</h3>
                        {sectionData.categories && Object.entries(sectionData.categories).map(([key, label]: [string, any]) => (
                            <Field key={key} label={`Kategori: ${key}`} value={label} path={`skills.categories.${key}`} />
                        ))}
                    </div>
                );

            case "experience":
                return (
                    <div className="space-y-4">
                        <Field label="Rozet" value={sectionData.badge || ""} path="experience.badge" />
                        <Field label="Başlık" value={sectionData.title || ""} path="experience.title" />
                        <Field label="Alt Başlık" value={sectionData.subtitle || ""} path="experience.subtitle" multiline />
                        <h3 className="text-sm font-medium text-white/70 mt-6 mb-3">📋 Deneyim Öğeleri</h3>
                        {sectionData.items && Object.entries(sectionData.items).map(([key, item]: [string, any]) => (
                            <ItemEditor key={key} itemKey={key} item={item} basePath="experience.items" fields={[
                                { key: "title", label: "Başlık" },
                                { key: "organization", label: "Kurum" },
                                { key: "period", label: "Dönem" },
                                { key: "description", label: "Açıklama", multiline: true },
                            ]} />
                        ))}
                    </div>
                );

            case "thinking":
                return (
                    <div className="space-y-4">
                        <Field label="Rozet" value={sectionData.badge || ""} path="thinking.badge" />
                        <Field label="Başlık" value={sectionData.title || ""} path="thinking.title" />
                        <Field label="Alt Başlık" value={sectionData.subtitle || ""} path="thinking.subtitle" multiline />
                        <Field label="Alıntı" value={sectionData.quote || ""} path="thinking.quote" />
                        <h3 className="text-sm font-medium text-white/70 mt-6 mb-3">💡 İlkeler</h3>
                        {sectionData.principles && Object.entries(sectionData.principles).map(([key, item]: [string, any]) => (
                            <ItemEditor key={key} itemKey={key} item={item} basePath="thinking.principles" fields={[
                                { key: "title", label: "İlke Başlığı" },
                                { key: "description", label: "Açıklama", multiline: true },
                            ]} />
                        ))}
                    </div>
                );

            case "roadmap":
                return (
                    <div className="space-y-4">
                        <Field label="Rozet" value={sectionData.badge || ""} path="roadmap.badge" />
                        <Field label="Başlık" value={sectionData.title || ""} path="roadmap.title" />
                        <Field label="Alt Başlık" value={sectionData.subtitle || ""} path="roadmap.subtitle" multiline />
                        <Field label="Alt Not" value={sectionData.bottomNote || ""} path="roadmap.bottomNote" />
                    </div>
                );

            default:
                return <p className="text-white/50">Bu bölüm henüz yapılandırılmadı.</p>;
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-lg font-bold text-white">✏️ Site İçerik Yönetimi</h1>
                        <div className="flex bg-white/5 rounded-lg p-1">
                            <button onClick={() => setLang("tr")} className={`px-3 py-1.5 rounded-md text-sm font-medium ${lang === "tr" ? "bg-emerald-500 text-white" : "text-white/50"}`}>🇹🇷 TR</button>
                            <button onClick={() => setLang("en")} className={`px-3 py-1.5 rounded-md text-sm font-medium ${lang === "en" ? "bg-emerald-500 text-white" : "text-white/50"}`}>🇬🇧 EN</button>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <AnimatePresence>
                            {saveMessage && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-emerald-400 text-sm">{saveMessage}</motion.span>}
                        </AnimatePresence>
                        <a href={`/${lang}`} target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-white/70 text-sm"><Monitor className="w-4 h-4" />Siteyi Gör</a>
                        <button onClick={handleLogout} className="flex items-center gap-2 text-red-400/70 hover:text-red-400 text-sm"><LogOut className="w-4 h-4" />Çıkış</button>
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-6 py-8 flex gap-6">
                {/* Tabs */}
                <nav className="w-48 flex-shrink-0">
                    <div className="sticky top-24 space-y-1">
                        {TABS.map((tab) => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl text-left transition-colors ${activeTab === tab.id ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </nav>

                {/* Content */}
                <main className="flex-1">
                    {loading ? (
                        <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 text-emerald-400 animate-spin" /></div>
                    ) : (
                        <motion.div key={`${lang}-${activeTab}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#111] rounded-2xl border border-white/10 p-6">
                            <h2 className="text-lg font-bold text-white mb-6">{TABS.find(t => t.id === activeTab)?.label} <span className="text-white/30 text-sm">({lang.toUpperCase()})</span></h2>
                            {renderContent()}
                        </motion.div>
                    )}
                </main>
            </div>
        </div>
    );
}
