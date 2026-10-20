"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Lock,
    Eye,
    EyeOff,
    Terminal,
    Save,
    LogOut,
    AlertCircle,
    Loader2,
    Monitor,
    ChevronDown,
    ChevronRight,
    Download,
    FileJson,
    RefreshCw
} from "lucide-react";

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
    const [rawJsonText, setRawJsonText] = useState("");
    const [rawJsonError, setRawJsonError] = useState("");
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
            const res = await fetch(`${API_URL}/translations/${language}`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            if (res.ok) {
                const data = await res.json();
                setTranslations(data.content || {});
                setRawJsonText(JSON.stringify(data.content || {}, null, 2));
            } else if (res.status === 401) {
                handleLogout();
            }
        } catch (e) {
            console.error("Fetch translations error:", e);
        } finally {
            setLoading(false);
        }
    };

    const saveField = async (path: string, value: any) => {
        if (!token) return;
        setSaving(true);
        try {
            const res = await fetch(`${API_URL}/translations/${lang}/field`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ path, value }),
            });
            if (!res.ok) throw new Error("Kayıt başarısız");

            // Update local state
            const keys = path.split(".");
            setTranslations((prev: any) => {
                const newData = JSON.parse(JSON.stringify(prev || {}));
                let current = newData;
                for (let i = 0; i < keys.length - 1; i++) {
                    if (!current[keys[i]] || typeof current[keys[i]] !== "object") {
                        current[keys[i]] = {};
                    }
                    current = current[keys[i]];
                }
                current[keys[keys.length - 1]] = value;
                setRawJsonText(JSON.stringify(newData, null, 2));
                return newData;
            });
            showMessage("✓ Kaydedildi");
        } catch {
            showMessage("✗ Hata oluştu");
        } finally {
            setSaving(false);
        }
    };

    const saveRawJson = async () => {
        if (!token) return;
        setRawJsonError("");
        let parsed: any;
        try {
            parsed = JSON.parse(rawJsonText);
        } catch (err: any) {
            setRawJsonError("Geçersiz JSON formatı: " + err.message);
            return;
        }

        setSaving(true);
        try {
            const res = await fetch(`${API_URL}/translations/${lang}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(parsed),
            });
            if (!res.ok) throw new Error("Kayıt başarısız");
            setTranslations(parsed);
            showMessage("✓ Tüm JSON kaydedildi");
        } catch {
            showMessage("✗ JSON kaydedilemedi");
        } finally {
            setSaving(false);
        }
    };

    const handleDownloadJson = () => {
        const blob = new Blob([JSON.stringify(translations, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${lang}.json`;
        a.click();
        URL.revokeObjectURL(url);
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
            } else {
                setLoginError(data.message || "Giriş başarısız");
            }
        } catch {
            setLoginError("Bağlantı hatası. Backend çalışıyor mu kontrol edin.");
        } finally {
            setLoginLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("admin_token");
        setToken(null);
        setIsAuthenticated(false);
    };

    const showMessage = (msg: string) => {
        setSaveMessage(msg);
        setTimeout(() => setSaveMessage(""), 2500);
    };

    const toggleExpand = (key: string) => {
        setExpandedItems(prev => {
            const next = new Set(prev);
            next.has(key) ? next.delete(key) : next.add(key);
            return next;
        });
    };

    // Login View
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#141414] flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-sm">
                    <div className="bg-[#111] rounded-2xl border border-white/10 p-8 shadow-2xl">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                                <Terminal className="w-8 h-8 text-emerald-400" />
                            </div>
                            <h1 className="text-2xl font-bold text-white">Admin CMS</h1>
                            <p className="text-sm text-white/40 mt-1">Tüm site içeriğini canlı düzenle</p>
                        </div>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-white text-sm focus:outline-none focus:border-emerald-500/50"
                                    placeholder="Admin Şifresi"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {loginError && (
                                <div className="text-red-400 text-xs flex items-center gap-2 bg-red-500/10 p-2.5 rounded-lg border border-red-500/20">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    <span>{loginError}</span>
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={loginLoading}
                                className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 rounded-xl text-white font-medium text-sm flex items-center justify-center gap-2 transition-colors"
                            >
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
        { id: "aiAssistant", label: "🤖 AI Asistan" },
        { id: "contact", label: "📬 İletişim" },
        { id: "navigation", label: "🧭 Menü / Nav" },
        { id: "footer", label: "⚓ Footer" },
        { id: "raw", label: "⚙️ Ham JSON" },
    ];

    const sectionData = translations[activeTab] || {};

    // Single Field Editor
    const Field = ({ label, value, path, multiline = false }: { label: string; value: string; path: string; multiline?: boolean }) => {
        const [val, setVal] = useState(value || "");
        const [edited, setEdited] = useState(false);

        useEffect(() => {
            setVal(value || "");
            setEdited(false);
        }, [value]);

        return (
            <div className="space-y-1">
                <label className="text-xs text-white/50 uppercase tracking-wider">{label}</label>
                <div className="flex gap-2">
                    {multiline ? (
                        <textarea
                            value={val}
                            onChange={(e) => { setVal(e.target.value); setEdited(true); }}
                            rows={3}
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 resize-none font-sans"
                        />
                    ) : (
                        <input
                            type="text"
                            value={val}
                            onChange={(e) => { setVal(e.target.value); setEdited(true); }}
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 font-sans"
                        />
                    )}
                    <button
                        onClick={() => { saveField(path, val); setEdited(false); }}
                        disabled={!edited || saving}
                        title="Kaydet"
                        className={`px-3.5 rounded-lg transition-colors flex items-center justify-center ${edited ? "bg-emerald-500 text-white hover:bg-emerald-600" : "bg-white/5 text-white/20 cursor-not-allowed"}`}
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    </button>
                </div>
            </div>
        );
    };

    // Item Accordion Editor (for projects, experience items, etc.)
    const ItemEditor = ({ itemKey, item, basePath, fields }: { itemKey: string; item: any; basePath: string; fields: { key: string; label: string; multiline?: boolean }[] }) => {
        const isExpanded = expandedItems.has(itemKey);
        return (
            <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                <button
                    onClick={() => toggleExpand(itemKey)}
                    className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                    <span className="font-medium text-white text-sm">{item.title || item.name || itemKey}</span>
                    {isExpanded ? <ChevronDown className="w-4 h-4 text-white/50" /> : <ChevronRight className="w-4 h-4 text-white/50" />}
                </button>
                {isExpanded && (
                    <div className="px-4 pb-4 space-y-3 border-t border-white/5 pt-3">
                        {fields.map((field) => (
                            <Field
                                key={field.key}
                                label={field.label}
                                value={item[field.key] || ""}
                                path={`${basePath}.${itemKey}.${field.key}`}
                                multiline={field.multiline}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    };

    // Render Section Content
    const renderContent = () => {
        if (activeTab === "raw") {
            return (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-xs text-white/50">
                            Buradan <code className="text-emerald-400">{lang}.json</code> dosyasının tamamını doğrudan düzenleyebilir ve kaydedebilirsiniz.
                        </p>
                        <button
                            onClick={handleDownloadJson}
                            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-white/70 text-xs transition-colors"
                        >
                            <Download className="w-3.5 h-3.5" />
                            İndir ({lang}.json)
                        </button>
                    </div>
                    {rawJsonError && (
                        <div className="text-red-400 text-xs bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                            {rawJsonError}
                        </div>
                    )}
                    <textarea
                        value={rawJsonText}
                        onChange={(e) => setRawJsonText(e.target.value)}
                        rows={22}
                        className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl p-4 text-xs text-emerald-400 font-mono focus:outline-none focus:border-emerald-500/50 resize-y"
                        spellCheck={false}
                    />
                    <button
                        onClick={saveRawJson}
                        disabled={saving}
                        className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-xl text-sm font-medium flex items-center gap-2 transition-colors"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Tüm JSON'u Kaydet
                    </button>
                </div>
            );
        }

        switch (activeTab) {
            case "hero":
                return (
                    <div className="space-y-4">
                        <Field label="Selamlama" value={sectionData.greeting || ""} path="hero.greeting" />
                        <Field label="İsim" value={sectionData.name || ""} path="hero.name" />
                        <Field label="Ünvan" value={sectionData.title || ""} path="hero.title" />
                        <Field label="Alt Başlık" value={sectionData.subtitle || ""} path="hero.subtitle" multiline />
                        <Field label="Durum (Badge)" value={sectionData.status || ""} path="hero.status" />
                        <Field label="Birincil Buton (CTA)" value={sectionData.cta?.primary || ""} path="hero.cta.primary" />
                        <Field label="İkincil Buton (CTA)" value={sectionData.cta?.secondary || ""} path="hero.cta.secondary" />
                    </div>
                );

            case "about":
                return (
                    <div className="space-y-4">
                        <Field label="Başlık" value={sectionData.title || ""} path="about.title" />
                        <Field label="Alt Başlık" value={sectionData.subtitle || ""} path="about.subtitle" />
                        <Field label="Hakkımda Biyografi (Bio)" value={sectionData.bio || ""} path="about.bio" multiline />
                        <Field label="Alıntı / Söz" value={sectionData.quote || ""} path="about.quote" />
                        <h3 className="text-sm font-medium text-white/70 mt-6 mb-3">📋 Öne Çıkanlar (Highlights)</h3>
                        {sectionData.highlights?.items && Object.entries(sectionData.highlights.items).map(([key, item]: [string, any]) => (
                            <ItemEditor
                                key={key}
                                itemKey={key}
                                item={item}
                                basePath="about.highlights.items"
                                fields={[
                                    { key: "title", label: "Başlık" },
                                    { key: "description", label: "Açıklama", multiline: true }
                                ]}
                            />
                        ))}
                    </div>
                );

            case "projects":
                return (
                    <div className="space-y-4">
                        <Field label="Rozet (Badge)" value={sectionData.badge || ""} path="projects.badge" />
                        <Field label="Başlık" value={sectionData.title || ""} path="projects.title" />
                        <Field label="Alt Başlık" value={sectionData.subtitle || ""} path="projects.subtitle" multiline />
                        <h3 className="text-sm font-medium text-white/70 mt-6 mb-3">📦 Projeler</h3>
                        {sectionData.items && Object.entries(sectionData.items).map(([key, item]: [string, any]) => (
                            <ItemEditor
                                key={key}
                                itemKey={key}
                                item={item}
                                basePath="projects.items"
                                fields={[
                                    { key: "title", label: "Proje Adı" },
                                    { key: "period", label: "Dönem" },
                                    { key: "tagline", label: "Açıklama", multiline: true },
                                    { key: "impact", label: "Etki / Detay", multiline: true },
                                    { key: "github", label: "GitHub URL" }
                                ]}
                            />
                        ))}
                    </div>
                );

            case "skills":
                return (
                    <div className="space-y-4">
                        <Field label="Rozet (Badge)" value={sectionData.badge || ""} path="skills.badge" />
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
                        <Field label="Rozet (Badge)" value={sectionData.badge || ""} path="experience.badge" />
                        <Field label="Başlık" value={sectionData.title || ""} path="experience.title" />
                        <Field label="Alt Başlık" value={sectionData.subtitle || ""} path="experience.subtitle" multiline />
                        <h3 className="text-sm font-medium text-white/70 mt-6 mb-3">📋 Deneyim Öğeleri</h3>
                        {sectionData.items && Object.entries(sectionData.items).map(([key, item]: [string, any]) => (
                            <ItemEditor
                                key={key}
                                itemKey={key}
                                item={item}
                                basePath="experience.items"
                                fields={[
                                    { key: "title", label: "Başlık" },
                                    { key: "organization", label: "Kurum / Üniversite" },
                                    { key: "period", label: "Dönem" },
                                    { key: "description", label: "Açıklama", multiline: true },
                                ]}
                            />
                        ))}
                    </div>
                );

            case "thinking":
                return (
                    <div className="space-y-4">
                        <Field label="Rozet (Badge)" value={sectionData.badge || ""} path="thinking.badge" />
                        <Field label="Başlık" value={sectionData.title || ""} path="thinking.title" />
                        <Field label="Alt Başlık" value={sectionData.subtitle || ""} path="thinking.subtitle" multiline />
                        <Field label="Favori Söz" value={sectionData.quote || ""} path="thinking.quote" multiline />
                        <h3 className="text-sm font-medium text-white/70 mt-6 mb-3">💡 Mühendislik İlkeleri</h3>
                        {sectionData.principles && Object.entries(sectionData.principles).map(([key, item]: [string, any]) => (
                            <ItemEditor
                                key={key}
                                itemKey={key}
                                item={item}
                                basePath="thinking.principles"
                                fields={[
                                    { key: "title", label: "İlke Başlığı" },
                                    { key: "description", label: "Açıklama", multiline: true },
                                ]}
                            />
                        ))}
                    </div>
                );

            case "roadmap":
                return (
                    <div className="space-y-4">
                        <Field label="Rozet (Badge)" value={sectionData.badge || ""} path="roadmap.badge" />
                        <Field label="Başlık" value={sectionData.title || ""} path="roadmap.title" />
                        <Field label="Alt Başlık" value={sectionData.subtitle || ""} path="roadmap.subtitle" multiline />
                        <Field label="Alt Not" value={sectionData.bottomNote || ""} path="roadmap.bottomNote" multiline />
                    </div>
                );

            case "aiAssistant":
                return (
                    <div className="space-y-4">
                        <Field label="Rozet" value={sectionData.badge || ""} path="aiAssistant.badge" />
                        <Field label="Başlık" value={sectionData.title || ""} path="aiAssistant.title" />
                        <Field label="Alt Başlık" value={sectionData.subtitle || ""} path="aiAssistant.subtitle" multiline />
                        <Field label="Sohbet Başlığı" value={sectionData.chatHeader?.title || ""} path="aiAssistant.chatHeader.title" />
                        <Field label="Alt Bilgi" value={sectionData.chatHeader?.poweredBy || ""} path="aiAssistant.chatHeader.poweredBy" />
                        <Field label="Örnek Soru 1" value={sectionData.sampleQuestions?.q1 || ""} path="aiAssistant.sampleQuestions.q1" />
                        <Field label="Örnek Soru 2" value={sectionData.sampleQuestions?.q2 || ""} path="aiAssistant.sampleQuestions.q2" />
                        <Field label="Örnek Soru 3" value={sectionData.sampleQuestions?.q3 || ""} path="aiAssistant.sampleQuestions.q3" />
                        <Field label="Örnek Soru 4" value={sectionData.sampleQuestions?.q4 || ""} path="aiAssistant.sampleQuestions.q4" />
                    </div>
                );

            case "contact":
                return (
                    <div className="space-y-4">
                        <Field label="Rozet" value={sectionData.badge || ""} path="contact.badge" />
                        <Field label="Başlık" value={sectionData.title || ""} path="contact.title" />
                        <Field label="Alt Başlık" value={sectionData.subtitle || ""} path="contact.subtitle" multiline />
                        <Field label="İsim Etiketi" value={sectionData.form?.name || ""} path="contact.form.name" />
                        <Field label="E-Posta Etiketi" value={sectionData.form?.email || ""} path="contact.form.email" />
                        <Field label="Mesaj Etiketi" value={sectionData.form?.message || ""} path="contact.form.message" />
                        <Field label="Gönder Butonu" value={sectionData.form?.send || ""} path="contact.form.send" />
                    </div>
                );

            case "navigation":
                return (
                    <div className="space-y-4">
                        <Field label="Ana Sayfa" value={sectionData.home || ""} path="navigation.home" />
                        <Field label="Hakkımda" value={sectionData.about || ""} path="navigation.about" />
                        <Field label="Projeler" value={sectionData.projects || ""} path="navigation.projects" />
                        <Field label="Yetenekler" value={sectionData.skills || ""} path="navigation.skills" />
                        <Field label="Deneyim" value={sectionData.experience || ""} path="navigation.experience" />
                        <Field label="Mühendislik Düşüncesi" value={sectionData.thinking || ""} path="navigation.thinking" />
                        <Field label="Yol Haritası" value={sectionData.roadmap || ""} path="navigation.roadmap" />
                        <Field label="İletişim" value={sectionData.contact || ""} path="navigation.contact" />
                        <Field label="3D CV" value={sectionData["3dresume"] || ""} path="navigation.3dresume" />
                    </div>
                );

            case "footer":
                return (
                    <div className="space-y-4">
                        <Field label="Slogan / Açıklama" value={sectionData.tagline || ""} path="footer.tagline" multiline />
                        <Field label="Telif Hakkı" value={sectionData.rights || ""} path="footer.rights" />
                    </div>
                );

            default:
                return (
                    <div className="space-y-3">
                        <p className="text-xs text-white/50 mb-4">Bu bölümün tüm alanları:</p>
                        {Object.entries(sectionData).map(([k, v]: [string, any]) => {
                            if (typeof v === "string") {
                                return <Field key={k} label={k} value={v} path={`${activeTab}.${k}`} />;
                            }
                            return null;
                        })}
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-lg font-bold text-white flex items-center gap-2">
                            <Terminal className="w-5 h-5 text-emerald-400" />
                            Admin CMS
                        </h1>
                        <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                            <button
                                onClick={() => setLang("tr")}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${lang === "tr" ? "bg-emerald-500 text-white" : "text-white/50 hover:text-white"}`}
                            >
                                🇹🇷 Türkçe
                            </button>
                            <button
                                onClick={() => setLang("en")}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${lang === "en" ? "bg-emerald-500 text-white" : "text-white/50 hover:text-white"}`}
                            >
                                🇬🇧 English
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <AnimatePresence>
                            {saveMessage && (
                                <motion.span
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="text-emerald-400 text-xs font-medium bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-md"
                                >
                                    {saveMessage}
                                </motion.span>
                            )}
                        </AnimatePresence>
                        <button
                            onClick={() => fetchTranslations(token || "", lang)}
                            title="Yenile"
                            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/70 text-xs transition-colors"
                        >
                            <RefreshCw className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleDownloadJson}
                            title="JSON İndir"
                            className="flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/70 text-xs transition-colors"
                        >
                            <Download className="w-4 h-4" />
                            <span className="hidden sm:inline">JSON İndir</span>
                        </button>
                        <a
                            href={`/${lang}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-400 text-xs transition-colors"
                        >
                            <Monitor className="w-4 h-4" />
                            <span className="hidden sm:inline">Siteyi Gör</span>
                        </a>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-1.5 px-3 py-2 text-red-400/80 hover:text-red-400 text-xs transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Çıkış</span>
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row gap-6">
                {/* Tabs Sidebar */}
                <nav className="w-full md:w-56 flex-shrink-0">
                    <div className="sticky top-24 space-y-1">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs font-medium transition-all ${
                                    activeTab === tab.id
                                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm"
                                        : "text-white/60 hover:text-white hover:bg-white/5"
                                }`}
                            >
                                <span>{tab.label}</span>
                                {activeTab === tab.id && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                            </button>
                        ))}
                    </div>
                </nav>

                {/* Content Editor */}
                <main className="flex-1 min-w-0">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24 gap-3">
                            <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                            <p className="text-xs text-white/40">İçerikler yükleniyor...</p>
                        </div>
                    ) : (
                        <motion.div
                            key={`${lang}-${activeTab}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#111] rounded-2xl border border-white/10 p-6 shadow-xl"
                        >
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                                <h2 className="text-base font-bold text-white flex items-center gap-2">
                                    <span>{TABS.find(t => t.id === activeTab)?.label}</span>
                                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                                        {lang.toUpperCase()}
                                    </span>
                                </h2>
                                <span className="text-[11px] text-white/30">
                                    Değiştirdiğin her alan sağındaki butona basıldığında anında kaydedilir.
                                </span>
                            </div>
                            {renderContent()}
                        </motion.div>
                    )}
                </main>
            </div>
        </div>
    );
}
