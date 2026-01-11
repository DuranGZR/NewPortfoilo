# 🌌 Duran Gezer | AI Engineer Portfolio

![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-Production-009688?style=for-the-badge&logo=fastapi)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript)
![Groq](https://img.shields.io/badge/Groq-Llama_3.1-FF6B35?style=for-the-badge)
![Three.js](https://img.shields.io/badge/Three.js-3D-white?style=for-the-badge&logo=three.js)

> **Yapay zeka ve makine öğrenmesi yeteneklerimi sergileyen, 3D interaktif deneyim ve akıllı AI asistan içeren yaşayan bir portfolyo.**

---

## 📑 İçindekiler

- [Proje Hakkında](#-proje-hakkında)
- [Canlı Demo](#-canlı-demo)
- [Mimari](#-mimari)
- [Özellikler](#-özellikler)
  - [AI Asistan](#-ai-asistan-groq--llama-31)
  - [3D İnteraktif Özgeçmiş](#-3d-interaktif-özgeçmiş)
  - [Çok Dilli Destek](#-çok-dilli-destek-i18n)
  - [Admin Paneli](#-admin-paneli-cms)
  - [UI/UX Özellikleri](#-premium-uiux)
- [Teknoloji Stack](#-teknoloji-stack)
- [Kurulum](#-kurulum)
- [Proje Yapısı](#-proje-yapısı)
- [API Endpoints](#-api-endpoints)
- [AI Prompt Mühendisliği](#-ai-prompt-mühendisliği)
- [Knowledge Base](#-knowledge-base)
- [Bileşenler](#-bileşenler)
- [Çevre Değişkenleri](#-çevre-değişkenleri)
- [Geliştirme](#-geliştirme)
- [Lisans](#-lisans)

---

## 🎯 Proje Hakkında

Bu proje, geleneksel statik portfolyolardan farklı olarak:

| Geleneksel Portfolyo | Bu Portfolyo |
|---------------------|--------------|
| Statik HTML/PDF | İnteraktif 3D WebGL deneyimi |
| Sadece okuma | AI asistanla sohbet |
| Tek dil | Türkçe ve İngilizce |
| Manuel güncelleme | Gerçek zamanlı CMS |
| Basit tasarım | Glassmorphism, animasyonlar, efektler |

### Neden Bu Projeyi Yaptım?

1. **AI/ML yeteneklerimi göstermek** - Sadece liste değil, çalışan bir AI sistemi
2. **Frontend becerilerimi sergilemek** - 3D WebGL, animasyonlar, modern UI
3. **Full-stack yetkinlik** - FastAPI backend, Next.js frontend
4. **Profesyonel prompt engineering** - Gerçek dünya AI uygulaması

---

## 🌐 Canlı Demo

> 🚧 Yakında: deploy edilecek

**Yerel çalıştırma için [Kurulum](#-kurulum) bölümüne bakın.**

---

## 🏗 Mimari

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          KULLANICI ARAYÜZÜ                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │
│  │  3D Resume  │  │   Sections  │  │  AI Chat    │  │   Admin Panel   │ │
│  │ (Three.js)  │  │  (React)    │  │  (Streaming)│  │   (CMS)         │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────────┘ │
│                           NEXT.JS 15 APP ROUTER                          │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ HTTP/REST API
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           FASTAPI BACKEND                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │
│  │  /api/chat  │  │ /api/admin  │  │/api/contact │  │ /api/analytics  │ │
│  │             │  │             │  │             │  │                 │ │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └────────┬────────┘ │
│         │                │                │                   │          │
│  ┌──────┴────────────────┴────────────────┴───────────────────┴────────┐ │
│  │                         SERVICES LAYER                               │ │
│  │   ai_service.py    │    admin_service.py    │    email_service.py   │ │
│  └──────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           GROQ AI SERVICE                                │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │   Model: llama-3.1-8b-instant                                     │   │
│  │   Prompt: 90 satır profesyonel system prompt                      │   │
│  │   Context: knowledge_base.json (225 satır)                        │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## ✨ Özellikler

### 🤖 AI Asistan (Groq + Llama 3.1)

Sağ alt köşedeki chat widget'ı gerçek bir AI asistan:

**Teknik Detaylar:**
- **API**: Groq Cloud (14,400 request/gün ücretsiz)
- **Model**: `llama-3.1-8b-instant` (hızlı ve verimli)
- **Prompt**: 90 satır profesyonel prompt engineering
- **Bağlam**: Session-based konuşma geçmişi (son 10 mesaj)

**Davranış Özellikleri:**
- ✅ **Üçüncü şahıs** - "Duran bunu yapıyor" (asla "Ben yapıyorum" demez)
- ✅ **Dil eşleştirme** - Türkçe soru → Türkçe cevap
- ✅ **Hassas konular** - Politik/dini sorulara nazik reddetme
- ✅ **Takip soruları** - Her cevabın sonunda öneriler
- ✅ **İç kuralları sızdırmaz** - "Red liste" gibi teknik terimler kullanmaz

**Örnek Konuşma:**
```
Kullanıcı: "Duran hangi teknolojileri biliyor?"

Asistan: "Duran özellikle AI/ML teknolojilerinde uzmanlaşmış. TensorFlow, 
PyTorch ve Scikit-learn ile makine öğrenmesi projeleri geliştiriyor. 
Python ana dili, ayrıca React ve Next.js ile web projeleri de yapıyor.

---
💬 Şunları da sorabilirsin:
• Hangi AI projeleri var?
• Eğitim geçmişi nedir?"
```

---

### 🌌 3D İnteraktif Özgeçmiş

`/3d-resume` rotasında uzay temalı 3D deneyim:

**3D Bileşenleri:**
| Dosya | Açıklama |
|-------|----------|
| `World3D.tsx` | Ana sahne, kamera kontrolü |
| `Environment3D.tsx` | Uzay arka planı, yıldızlar, gezegenler |
| `Island.tsx` | Tıklanabilir bölüm adaları |
| `DetailPanel.tsx` | Bilgi popup paneli |
| `EnergyBeam.tsx` | Ada-panel bağlantı ışını |
| `Particles.tsx` | Kozmik toz efektleri |
| `Spaceship.tsx` | Dekoratif uzay gemisi |

**Uzay Ortamı:**
- 7500+ yıldız (2 katman)
- 5 gerçekçi gezegen (1 halkalı)
- Pulsing güneş efekti
- Kozmik toz partikülleri

**Bölüm Adaları (6 adet):**
1. **Eğitim** - Üniversite ve sertifikalar
2. **Deneyim** - İş ve proje deneyimi
3. **Yetenekler** - Teknik beceriler
4. **Projeler** - GitHub projeleri
5. **Felsefe** - Mühendislik yaklaşımı
6. **İletişim** - Sosyal linkler

---

### 🌍 Çok Dilli Destek (i18n)

**Teknoloji:** `next-intl`

**Desteklenen Diller:**
- 🇹🇷 Türkçe (varsayılan)
- 🇬🇧 İngilizce

**Özellikler:**
- URL tabanlı routing (`/tr`, `/en`)
- Otomatik dil algılama
- SEO-friendly meta tag'ler
- 212+ çeviri key'i

**Dosya Yapısı:**
```
frontend/messages/
├── tr.json    # 212 satır Türkçe çeviriler
└── en.json    # 212 satır İngilizce çeviriler
```

---

### 🛠 Admin Paneli (CMS)

**Gizli URL:** `/ctrl-x7k9p2m` (güvenlik için obscure path)

**Güvenlik Katmanları:**
1. Gizli URL path
2. Bcrypt şifreli parola
3. JWT token (1 saat geçerli)
4. Rate limiting (3 deneme → 15dk kilitleme)

**Yönetilebilir İçerikler:**
- Hero section (isim, başlık, alt başlık)
- About section (bio, highlights, quote)
- Projeler (başlık, açıklama, teknolojiler, linkler)
- Yetenekler (kategoriler ve seviyeler)
- Deneyim (eğitim, iş, sertifikalar)
- Mühendislik felsefesi (6 prensip)
- Yol haritası (kariyer planı)

---

### 🎨 Premium UI/UX

**Görsel Efektler:**
| Bileşen | Dosya | Açıklama |
|---------|-------|----------|
| Noise Texture | `NoiseTexture.tsx` | SVG grain overlay |
| Gradient Mesh | `GradientMesh.tsx` | 4 animasyonlu blob |
| Section Reveal | `SectionReveal.tsx` | Scroll tetiklemeli efekt |
| Glass Card | `GlassCard.tsx` | Glassmorphism kartlar |
| Typewriter | `TypewriterText.tsx` | Karakter karakter yazım |
| Loading Screen | `LoadingScreen.tsx` | DG logo animasyonu |

**Mikro-Etkileşimler:**
- Manyetik butonlar (cursor'a doğru çekim)
- Özel cursor (takip eden glow efekti)
- Scroll progress indicator
- Hover efektleri (scale, glow, gradient)

**Performans:**
- Web Vitals tracking (LCP, CLS, INP, FCP, TTFB)
- Lazy loading (komponentler viewport'a girince yüklenir)
- Dynamic imports (kod bölünmesi)

---

## 💻 Teknoloji Stack

### Frontend

| Paket | Versiyon | Kullanım |
|-------|----------|----------|
| `next` | 15.0+ | React framework (App Router) |
| `react` | 19.0+ | UI kütüphanesi |
| `typescript` | 5.0+ | Tip güvenliği |
| `tailwindcss` | 4.0+ | Utility-first CSS |
| `three` | 0.160+ | 3D rendering engine |
| `@react-three/fiber` | 8.15+ | React için Three.js renderer |
| `@react-three/drei` | 9.0+ | R3F yardımcıları |
| `framer-motion` | 11.0+ | Animasyon kütüphanesi |
| `next-intl` | latest | Çok dilli destek |
| `lucide-react` | latest | Icon sistemi |

### Backend

| Paket | Versiyon | Kullanım |
|-------|----------|----------|
| `fastapi` | 0.109+ | ASGI web framework |
| `uvicorn` | standard | ASGI server |
| `groq` | latest | Groq AI SDK |
| `pydantic` | 2.0+ | Veri validasyonu |
| `passlib[bcrypt]` | latest | Şifre hashleme |
| `python-jose[cryptography]` | latest | JWT token |
| `resend` | latest | Email servisi |

---

## 🚀 Kurulum

### Gereksinimler

- **Node.js** 18+ (LTS)
- **Python** 3.10+
- **Git**
- **Groq API Key** ([Ücretsiz al](https://console.groq.com))

### 1. Repository'yi Klonla

```bash
git clone https://github.com/DuranGZR/NewPortfoilo.git
cd NewPortfoilo
```

### 2. Frontend Kurulumu

```bash
cd frontend

# Bağımlılıkları yükle
npm install --legacy-peer-deps

# Environment dosyasını oluştur
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1" > .env.local

# Geliştirme sunucusunu başlat
npm run dev
```

Frontend: http://localhost:3000

### 3. Backend Kurulumu

```bash
cd backend

# Virtual environment oluştur
python -m venv venv

# Aktive et
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Bağımlılıkları yükle
pip install -r requirements.txt

# .env dosyasını oluştur (aşağıya bak)

# Sunucuyu başlat
uvicorn app.main:app --reload --port 8000
```

Backend: http://localhost:8000
API Docs: http://localhost:8000/docs

---

## 📂 Proje Yapısı

```
NewPortfoilo/
│
├── 📁 frontend/                      # NEXT.JS FRONTEND
│   ├── 📁 app/
│   │   └── 📁 [locale]/              # i18n routing
│   │       ├── page.tsx              # Ana sayfa
│   │       ├── 📁 3d-resume/         # 3D özgeçmiş sayfası
│   │       ├── 📁 projects/[slug]/   # Proje detay sayfaları
│   │       └── 📁 admin/      # Admin paneli (gizli)
│   │
│   ├── 📁 components/
│   │   ├── 📁 3d-resume/             # 3D bileşenler (17 dosya)
│   │   │   ├── World3D.tsx           # Ana 3D sahne
│   │   │   ├── Environment3D.tsx     # Uzay ortamı
│   │   │   ├── Island.tsx            # Bölüm adaları
│   │   │   ├── DetailPanel.tsx       # Bilgi paneli
│   │   │   └── ...
│   │   │
│   │   ├── 📁 sections/              # Sayfa bölümleri (10 klasör)
│   │   │   ├── 📁 Hero/
│   │   │   ├── 📁 About/
│   │   │   ├── 📁 Projects/
│   │   │   ├── 📁 Skills/
│   │   │   ├── 📁 Experience/
│   │   │   ├── 📁 Thinking/
│   │   │   ├── 📁 Roadmap/
│   │   │   └── 📁 AIAssistant/       # Chat widget
│   │   │
│   │   ├── 📁 widgets/               # UI bileşenleri (15 dosya)
│   │   │   ├── ChatWidget.tsx        # AI chat arayüzü
│   │   │   ├── CommandPalette.tsx    # ⌘K menü
│   │   │   ├── LanguageSwitcher.tsx
│   │   │   └── ...
│   │   │
│   │   ├── 📁 effects/               # Görsel efektler
│   │   │   ├── NoiseTexture.tsx
│   │   │   └── GradientMesh.tsx
│   │   │
│   │   ├── 📁 animations/            # Animasyon bileşenleri
│   │   │   ├── SectionReveal.tsx
│   │   │   └── TypewriterText.tsx
│   │   │
│   │   └── 📁 layout/                # Layout bileşenleri
│   │       ├── Navigation.tsx
│   │       ├── Footer.tsx
│   │       └── LoadingScreen.tsx
│   │
│   ├── 📁 messages/                  # Çeviri dosyaları
│   │   ├── tr.json                   # 212 satır
│   │   └── en.json                   # 212 satır
│   │
│   ├── 📁 data/                      # Statik veri
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   └── experience.ts
│   │
│   ├── 📁 lib/                       # Yardımcı fonksiyonlar
│   │   ├── web-vitals.ts
│   │   └── utils.ts
│   │
│   └── i18n.ts                       # i18n yapılandırması
│
├── 📁 backend/                       # FASTAPI BACKEND
│   ├── 📁 app/
│   │   ├── main.py                   # FastAPI app başlatma
│   │   ├── config.py                 # Ayarlar (Pydantic)
│   │   │
│   │   ├── 📁 api/v1/                # API endpoints
│   │   │   ├── chat.py               # POST /chat
│   │   │   ├── admin.py              # Admin CRUD
│   │   │   ├── contact.py            # POST /contact
│   │   │   └── analytics.py          # GET /analytics
│   │   │
│   │   ├── 📁 services/              # İş mantığı
│   │   │   ├── ai_service.py         # Groq entegrasyonu + prompt
│   │   │   └── email_service.py      # Resend email
│   │   │
│   │   ├── 📁 data/                  # Veri dosyaları
│   │   │   └── knowledge_base.json   # AI bilgi tabanı (225 satır)
│   │   │
│   │   └── 📁 core/                  # Çekirdek modüller
│   │       ├── security.py           # JWT, bcrypt
│   │       └── deps.py               # Bağımlılıklar
│   │
│   ├── requirements.txt
│   └── .env                          # Çevre değişkenleri
│
├── 📁 memory-bank/                   # Proje dokümantasyonu
│   ├── progress.md                   # İlerleme takibi
│   ├── activeContext.md              # Güncel durum
│   └── ...
│
└── README.md                         # Bu dosya
```

---

## 🔌 API Endpoints

### Chat Endpoint

```
POST /api/v1/chat
```

**Request:**
```json
{
  "message": "Duran hangi teknolojileri biliyor?",
  "session_id": "uuid-v4-session-id"
}
```

**Response:**
```json
{
  "response": "Duran özellikle AI/ML teknolojilerinde uzmanlaşmış...",
  "session_id": "uuid-v4-session-id"
}
```

### Admin Endpoints

```
POST   /api/v1/admin/login           # JWT token al
GET    /api/v1/translations/{lang}   # Çevirileri getir
PUT    /api/v1/translations/{lang}/field  # Tek alan güncelle
PUT    /api/v1/translations/{lang}/section/{section}  # Bölüm güncelle
```

### Contact Endpoint

```
POST /api/v1/contact
```

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Merhaba, iş teklifi hakkında..."
}
```

---

## 🧠 AI Prompt Mühendisliği

**Dosya:** `backend/app/services/ai_service.py`

### Prompt Yapısı (6 Bölüm)

```python
"""
# ROLE
You are Duran Gezer's portfolio assistant. You speak ABOUT Duran...

# PERSONALITY
- Warm and professional, never robotic
- Speak naturally in flowing sentences
- Match the visitor's language
- Use 1-2 emojis max per response

# CORE RULES
1. ALWAYS use third person: "Duran does...", "He works on..."
2. NEVER use first person for Duran
3. Keep responses concise: 2-3 paragraphs max
4. End with suggested follow-up questions
5. For sensitive topics: politely redirect

# EXAMPLE CONVERSATIONS
[5 örnek soru-cevap]

# DURAN'S PROFILE
[knowledge_base.json verileri]

# YOUR TASK
Respond to the visitor's question about Duran...
"""
```

### Neden Bu Yapı?

| Bölüm | Amacı |
|-------|-------|
| Role | Model'in kim olduğunu tanımlar |
| Personality | Konuşma stilini belirler |
| Core Rules | Kesin kuralları listeler |
| Examples | Few-shot learning ile davranış öğretir |
| Profile | Güncel bilgileri sağlar |
| Task | Final direktifi verir |

---

## 📚 Knowledge Base

**Dosya:** `backend/app/data/knowledge_base.json`

### Yapı

```json
{
  "about": {
    "name": "Duran Gezer",
    "title": "AI/ML Engineer",
    "location": "İzmir, Türkiye",
    "university": "İnönü Üniversitesi",
    "year": "4. sınıf",
    "gpa": "2.84/4.0",
    "bio": "...",
    "goal": "...",
    "status": "İş fırsatlarına açık"
  },
  "highlights": ["15+ Proje", "Analitik Düşünce", ...],
  "skills": {
    "ai_ml": ["TensorFlow", "PyTorch", ...],
    "programming": ["Python", "JavaScript", ...],
    "frameworks": ["React", "FastAPI", ...],
    "data": ["Veri Analizi", ...]
  },
  "projects": [
    {
      "name": "Gerçek Zamanlı Görsel Anlama AI",
      "description": "...",
      "tech": ["Python", "Ollama", "LLaVA"],
      "github": "https://github.com/...",
      "year": "2024"
    },
    // 7 proje daha
  ],
  "certifications": [
    {
      "title": "Machine Learning Camp",
      "organization": "Miuul",
      "year": "2024"
    },
    // 5 sertifika daha
  ],
  "courses": ["Veri Yapıları", "Yapay Zeka", ...],
  "thinking": {
    "principles": ["Önce Anla, Sonra Çöz", ...],
    "quote": "İyi bir mühendis problemi anlamadan çözüme başlamaz."
  },
  "roadmap": {
    "now": "Son Sınıf - AI/ML projelerini güçlendirme",
    "graduation": "2026 - AI/ML junior pozisyon",
    "1year": "Derin öğrenme ve NLP'de uzmanlaşma",
    "2years": "Mid-level AI/ML Engineer"
  },
  "contact": {
    "github": "https://github.com/DuranGZR",
    "location": "İzmir, Türkiye"
  }
}
```

---

## 🧩 Bileşenler

### Frontend Bileşenleri

#### Sections (10 adet)
| Bileşen | Açıklama |
|---------|----------|
| `Hero` | Ana giriş, isim, başlık, CTA butonları |
| `About` | Hakkında, bio, highlights |
| `Projects` | Proje kartları, filtre, detay |
| `Skills` | Yetenek kategorileri, seviyeler |
| `Experience` | Eğitim, sertifikalar, timeline |
| `Thinking` | Mühendislik felsefesi, 6 prensip |
| `Roadmap` | Kariyer yol haritası |
| `AIAssistant` | Chat widget tanıtımı |

#### 3D Resume (17 dosya)
| Bileşen | Açıklama |
|---------|----------|
| `World3D` | Ana Canvas, kamera, ışıklar |
| `Environment3D` | Uzay, yıldızlar, gezegenler |
| `Island` | Tıklanabilir bölüm adaları |
| `DetailPanel` | Glassmorphism info panel |
| `EnergyBeam` | Ada-panel bağlantı ışını |
| `CameraController` | Kamera animasyonları |
| `Particles` | Kozmik toz |
| `HolographicEffect` | Hologram efekti |

#### Widgets (15 dosya)
| Bileşen | Açıklama |
|---------|----------|
| `ChatWidget` | AI chat arayüzü |
| `CommandPalette` | ⌘K quick navigation |
| `LanguageSwitcher` | TR/EN değiştirici |
| `ScrollProgress` | Sayfa scroll göstergesi |
| `MagneticButton` | Cursor'a çekilen buton |
| `CustomCursor` | Takip eden glow cursor |

---

## 🔐 Çevre Değişkenleri

### Backend (`.env`)

```env
# === AI Servisi (ZORUNLU) ===
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# === Email Servisi (Opsiyonel) ===
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=onboarding@resend.dev
EMAIL_TO=your@email.com

# === Güvenlik ===
SECRET_KEY=your-32-character-secret-key-here
ADMIN_PASSWORD=your-admin-password
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

# === CORS ===
BACKEND_CORS_ORIGINS=["http://localhost:3000"]
```

### Frontend (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

### API Key Alma

1. **Groq API Key**: https://console.groq.com → API Keys → Create
2. **Resend API Key**: https://resend.com → API Keys → Create

---

## 🔧 Geliştirme

### Scripts

**Frontend:**
```bash
npm run dev      # Geliştirme sunucusu (localhost:3000)
npm run build    # Production build
npm run start    # Production sunucusu
npm run lint     # ESLint kontrolü
```

**Backend:**
```bash
uvicorn app.main:app --reload           # Geliştirme (localhost:8000)
uvicorn app.main:app --host 0.0.0.0     # Production
```

### Kod Standartları

- **Frontend**: ESLint, Prettier, TypeScript strict mode
- **Backend**: PEP8, Type hints, Pydantic validation

---

## 📄 Lisans

MIT License © 2024-2026 Duran Gezer

---

## 👤 Geliştirici

**Duran Gezer**

| | |
|-|-|
| 🎓 | İnönü Üniversitesi - Bilgisayar Mühendisliği (4. sınıf) |
| 🎯 | AI/ML Engineer (iş fırsatlarına açık) |
| 📍 | İzmir, Türkiye |
| 🔗 | [GitHub](https://github.com/DuranGZR) |

---

<p align="center">
  <b>❤️ ve ☕ ile yapıldı</b>
</p>
