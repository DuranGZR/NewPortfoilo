# 🌌 Duran Gezer | AI/ML Engineer Portfolio

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688?style=for-the-badge&logo=fastapi)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript)
![Three.js](https://img.shields.io/badge/Three.js-3D-white?style=for-the-badge&logo=three.js)
![Groq](https://img.shields.io/badge/Groq-Llama_3.1-FF6B35?style=for-the-badge)

**[🌐 Live Demo](https://durangezer.com)** · **[📧 Contact](mailto:contact@durangezer.com)** · **[💼 LinkedIn](https://linkedin.com/in/durangezer)**

*An interactive AI-powered portfolio featuring 3D experiences, intelligent chat assistant, and professional design.*

</div>

---

## ✨ Highlights

<table>
<tr>
<td width="50%">

### 🤖 AI Chat Assistant
Real-time AI assistant powered by Groq (Llama 3.1) that answers questions about me in third person. Professionally engineered prompts with language detection.

</td>
<td width="50%">

### 🌌 3D Interactive Resume
Explore my resume in space! Click on floating islands to discover Education, Experience, Skills, Projects, and more in an immersive 3D environment.

</td>
</tr>
<tr>
<td width="50%">

### 🎮 Hidden Easter Eggs
Find the secret terminal by entering the Konami Code (↑↑↓↓←→←→BA). Explore 15+ commands, achievements, and hidden content!

</td>
<td width="50%">

### 🌍 Bilingual Support
Full Turkish and English support with automatic language detection, SEO-optimized metadata, and seamless switching.

</td>
</tr>
</table>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [AI Assistant](#-ai-assistant)
- [3D Resume](#-3d-resume)
- [Easter Eggs](#-easter-eggs)
- [Components](#-components)
- [API Reference](#-api-reference)
- [Environment Variables](#-environment-variables)
- [Development](#-development)
- [License](#-license)

---

## 🚀 Features

### Core Features

| Feature | Description |
|---------|-------------|
| **AI Chat Assistant** | Groq-powered (Llama 3.1) intelligent chat with third-person responses |
| **3D Interactive Resume** | Space-themed WebGL experience with floating islands |
| **Bilingual (i18n)** | Full Turkish/English support with `next-intl` |
| **Premium UI/UX** | Glassmorphism, animations, micro-interactions |
| **Mobile Responsive** | Optimized for all screen sizes |
| **SEO Optimized** | OpenGraph, Twitter Cards, JSON-LD structured data |

### Visual Effects

- 🌫️ **Noise Texture Overlay** - Subtle grain effect
- 🎨 **Gradient Mesh Background** - Animated floating blobs
- ✨ **Section Reveal Animations** - Scroll-triggered effects
- 🪟 **Glassmorphism Cards** - Modern frosted glass design
- ⌨️ **Typewriter Text** - Character-by-character animation
- 🧲 **Magnetic Buttons** - Cursor-following interactions
- 🎯 **Custom Cursor** - Glowing follow cursor

### Performance

- 📊 **Web Vitals Tracking** - LCP, CLS, INP, FCP, TTFB monitoring
- ⚡ **Lazy Loading** - Components load on viewport entry
- 📦 **Code Splitting** - Dynamic imports for optimal bundles
- 🖼️ **Image Optimization** - Next.js Image component

---

## 💻 Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15+ | React framework (App Router) |
| React | 19+ | UI library |
| TypeScript | 5+ | Type safety |
| Tailwind CSS | 4+ | Utility-first styling |
| Three.js | 0.160+ | 3D rendering engine |
| @react-three/fiber | 8.15+ | React Three.js renderer |
| @react-three/drei | 9+ | R3F helper components |
| Framer Motion | 11+ | Animation library |
| next-intl | latest | Internationalization |
| xterm.js | 5.3+ | Terminal emulator (Easter egg) |
| Lucide React | latest | Icon system |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| FastAPI | 0.109+ | ASGI web framework |
| Uvicorn | latest | ASGI server |
| Groq SDK | latest | AI model provider |
| Pydantic | 2+ | Data validation |
| Resend | latest | Email service |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ (LTS)
- **Python** 3.10+
- **Git**
- **Groq API Key** ([Get free key](https://console.groq.com))

### 1. Clone Repository

```bash
git clone https://github.com/DuranGZR/NewPortfoilo.git
cd NewPortfoilo
```

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install --legacy-peer-deps

# Create environment file
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1" > .env.local

# Start development server
npm run dev
```

Frontend runs at: **http://localhost:3000**

### 3. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate
# Activate (Mac/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file (see Environment Variables section)

# Start server
uvicorn app.main:app --reload --port 8000
```

Backend runs at: **http://localhost:8000**  
API Docs: **http://localhost:8000/docs**

---

## 📂 Project Structure

```
NewPortfolio/
│
├── 📁 frontend/                      # NEXT.JS FRONTEND
│   ├── 📁 app/
│   │   └── 📁 [locale]/              # i18n routing (tr, en)
│   │       ├── page.tsx              # Main page
│   │       ├── 📁 3d-resume/         # 3D Resume experience
│   │       └── 📁 projects/[slug]/   # Project detail pages
│   │
│   ├── 📁 components/
│   │   ├── 📁 3d-resume/             # 3D components (17 files)
│   │   │   ├── World3D.tsx           # Main 3D scene
│   │   │   ├── Environment3D.tsx     # Space environment
│   │   │   ├── Island.tsx            # Clickable section islands
│   │   │   ├── DetailPanel.tsx       # Info popup panel
│   │   │   └── ...
│   │   │
│   │   ├── 📁 sections/              # Page sections (10 folders)
│   │   │   ├── Hero/                 # Landing section
│   │   │   ├── About/                # Bio & highlights
│   │   │   ├── Projects/             # Project cards
│   │   │   ├── Skills/               # Tech stack
│   │   │   ├── Experience/           # Education & certs
│   │   │   ├── Thinking/             # Engineering philosophy
│   │   │   ├── Roadmap/              # Career plan
│   │   │   └── AIAssistant/          # Chat widget intro
│   │   │
│   │   ├── 📁 widgets/               # UI components (15 files)
│   │   │   ├── ChatWidget.tsx        # AI chat interface
│   │   │   ├── CommandPalette.tsx    # ⌘K quick nav
│   │   │   ├── 📁 EasterEggs/        # Hidden features
│   │   │   │   ├── KonamiListener.tsx
│   │   │   │   ├── TerminalEmulator.tsx
│   │   │   │   └── commands/
│   │   │   └── ...
│   │   │
│   │   ├── 📁 effects/               # Visual effects
│   │   ├── 📁 animations/            # Animation components
│   │   └── 📁 layout/                # Layout components
│   │
│   ├── 📁 messages/                  # Translation files
│   │   ├── tr.json                   # Turkish (600+ lines)
│   │   └── en.json                   # English (600+ lines)
│   │
│   └── 📁 data/                      # Static data files
│
├── 📁 backend/                       # FASTAPI BACKEND
│   ├── 📁 app/
│   │   ├── main.py                   # FastAPI app
│   │   ├── config.py                 # Settings
│   │   │
│   │   ├── 📁 api/v1/                # API endpoints
│   │   │   ├── endpoints/
│   │   │   │   ├── chat.py           # AI chat
│   │   │   │   ├── contact.py        # Email form
│   │   │   │   ├── analytics.py      # Site analytics
│   │   │   │   └── health.py         # Health check
│   │   │   └── router.py
│   │   │
│   │   ├── 📁 services/              # Business logic
│   │   │   └── ai_service.py         # Groq AI integration
│   │   │
│   │   └── 📁 data/
│   │       └── knowledge_base.json   # AI knowledge base
│   │
│   ├── requirements.txt
│   └── .env
│
├── 📁 memory-bank/                   # Project documentation
│   ├── progress.md
│   ├── activeContext.md
│   └── ...
│
└── README.md
```

---

## 🤖 AI Assistant

### Overview

The AI chat assistant uses **Groq API** with `llama-3.1-8b-instant` model to answer questions about me.

### Technical Details

| Aspect | Details |
|--------|---------|
| **Provider** | Groq Cloud (14,400 req/day free tier) |
| **Model** | `llama-3.1-8b-instant` |
| **Temperature** | 0.5 (balanced creativity) |
| **Context** | Session-based (last 10 messages) |

### Prompt Engineering

The prompt follows a professional 6-section structure:

1. **Role** - Defines the assistant's identity
2. **Personality** - Sets conversation style
3. **Core Rules** - Enforces behavior (third-person, language matching)
4. **Examples** - Few-shot learning with 5 scenarios
5. **Knowledge Base** - Real data from JSON
6. **Task** - Final instruction

### Key Behaviors

- ✅ **Third Person** - "Duran works on..." (never "I work on...")
- ✅ **Language Matching** - Turkish question → Turkish answer
- ✅ **Scope Control** - Only answers about Duran
- ✅ **Graceful Redirects** - Politely declines off-topic questions
- ✅ **Follow-up Suggestions** - Ends with conversation prompts

---

## 🌌 3D Resume

### Space Environment

Access the 3D resume at `/3d-resume`:

- **7500+ stars** in two depth layers
- **5 realistic planets** (including Saturn-like with rings)
- **Pulsing sun** with glow effects
- **Cosmic dust particles**
- **Pure black space background**

### Interactive Islands (6)

| Island | Content |
|--------|---------|
| 🎓 **Education** | University, certifications |
| 💼 **Experience** | Roles, activities |
| 🛠️ **Skills** | Tech stack categories |
| 🚀 **Projects** | GitHub projects |
| 🧠 **Philosophy** | Engineering mindset |
| 📬 **Contact** | Social links |

### Technical Implementation

- **Three.js** + **React Three Fiber** for 3D rendering
- **Glassmorphism panels** with backdrop blur
- **Energy beam** animations connecting islands to panels
- **Camera controls** with smooth transitions

---

## 🎮 Easter Eggs

### Konami Code Terminal

**Activation:** Press `↑↑↓↓←→←→BA` anywhere on the site

### Available Commands

| Command | Description |
|---------|-------------|
| `help` | List all commands |
| `ls` | List virtual files |
| `cat <file>` | Read file contents |
| `whoami` | Display user info |
| `neofetch` | System info (Linux style) |
| `skills` | ASCII art skill bars |
| `socials` | Social media links |
| `hire` | Contact info & CV |
| `matrix` | Enter the Matrix... |
| `coffee` | Coffee consumption log |
| `snake` | Mini snake game |
| `joke` | Random dev joke |
| `quote` | AI/coding quotes |
| `secrets` | Achievement progress |
| `stats` | Terminal statistics |

### Achievements (9)

- 🎮 **Konami Master** - Find the terminal
- 📁 **File Explorer** - Read all files
- 💻 **Command Master** - Use 10+ commands
- 🕵️ **Secret Finder** - Find .secrets file
- 🔴 **Matrix Dweller** - Use matrix command
- ☕ **Coffee Connoisseur** - Read coffee.log
- 💬 **Quote Collector** - Read 5 quotes
- 🐍 **Snake Charmer** - Try snake command
- 💼 **Professional** - Use hire command

---

## 🧩 Components

### Sections (10)

| Component | Description |
|-----------|-------------|
| `Hero` | Landing with 3D avatar, typed text, CTAs |
| `About` | Bio, highlights, quote, status |
| `Projects` | Filterable project cards |
| `Skills` | Category-based skill levels |
| `Experience` | Timeline with modals |
| `Thinking` | 6 engineering principles |
| `Roadmap` | Career timeline |
| `AIAssistant` | Chat widget introduction |

### Effects

| Component | Description |
|-----------|-------------|
| `NoiseTexture` | SVG grain overlay |
| `GradientMesh` | Animated blob gradients |
| `SectionReveal` | Scroll-triggered animations |
| `GlassCard` | Glassmorphism container |
| `TypewriterText` | Character-by-character text |
| `LoadingScreen` | DG logo loading animation |

### Widgets

| Component | Description |
|-----------|-------------|
| `ChatWidget` | Floating AI chat |
| `CommandPalette` | ⌘K navigation |
| `LanguageSwitcher` | TR/EN toggle |
| `ScrollProgress` | Page progress bar |
| `MagneticButton` | Cursor-following button |
| `CustomCursor` | Glowing cursor effect |

---

## 🔌 API Reference

### Endpoints

```
POST /api/v1/chat           # AI chat
POST /api/v1/contact        # Send email
GET  /api/v1/analytics      # Site analytics
GET  /api/v1/health         # Health check
```

### Chat Endpoint

**Request:**
```json
{
  "message": "What projects has Duran built?",
  "session_id": "uuid-v4"
}
```

**Response:**
```json
{
  "response": "Duran has developed several AI/ML projects...",
  "session_id": "uuid-v4"
}
```

### Contact Endpoint

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello! I'd like to discuss..."
}
```

---

## 🔐 Environment Variables

### Backend (`.env`)

```env
# === AI Service (REQUIRED) ===
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# === Email Service (Optional) ===
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=onboarding@resend.dev
EMAIL_TO=your@email.com

# === Security ===
SECRET_KEY=your-32-character-secret-key-here

# === CORS ===
BACKEND_CORS_ORIGINS=["http://localhost:3000"]
```

### Frontend (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

### Getting API Keys

1. **Groq API Key**: [console.groq.com](https://console.groq.com) → API Keys → Create
2. **Resend API Key**: [resend.com](https://resend.com) → API Keys → Create

---

## 🔧 Development

### Scripts

**Frontend:**
```bash
npm run dev      # Development server (localhost:3000)
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint check
```

**Backend:**
```bash
uvicorn app.main:app --reload           # Development (localhost:8000)
uvicorn app.main:app --host 0.0.0.0     # Production
```

### Code Standards

- **Frontend**: ESLint, TypeScript strict mode, Prettier
- **Backend**: PEP8, Type hints, Pydantic validation

---

## 📄 License

MIT License © 2024-2026 Duran Gezer

---

## 👤 Author

**Duran Gezer**

| | |
|-|-|
| 🎓 | İnönü University - Computer Engineering (4th Year) |
| 🎯 | AI/ML Engineer (Open to opportunities) |
| 📍 | İzmir, Turkey |
| 🔗 | [GitHub](https://github.com/DuranGZR) · [LinkedIn](https://linkedin.com/in/durangezer) |

---

<p align="center">
  <b>Built with ❤️ and ☕</b>
  <br><br>
  <i>Try the Konami Code: ↑↑↓↓←→←→BA</i>
</p>
