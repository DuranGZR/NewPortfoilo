# 🌌 Next-Gen AI & 3D Interactive Portfolio

![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-Production-009688?style=for-the-badge&logo=fastapi)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript)
![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python)
![Three.js](https://img.shields.io/badge/Three.js-WebGL-white?style=for-the-badge&logo=three.js)
![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=for-the-badge&logo=tailwind-css)

> **"A digital manifestation of creativity and logic."**
> 
> This repository houses a state-of-the-art personal portfolio platform that bridges the gap between **WebGL graphics**, **Generative AI**, and **Full-Stack Engineering**. It is not just a showcase of work, but a living proof of concept for modern web capabilities.

---

## 📑 Table of Contents

- [🌌 Next-Gen AI & 3D Interactive Portfolio](#-next-gen-ai--3d-interactive-portfolio)
  - [📑 Table of Contents](#-table-of-contents)
  - [🔥 Project Value Proposition](#-project-value-proposition)
  - [🧠 Core System Architecture](#-core-system-architecture)
    - [1. The Frontend (Client-Side)](#1-the-frontend-client-side)
    - [2. The Backend (Server-Side)](#2-the-backend-server-side)
    - [3. The AI Brain (Gemini Integration)](#3-the-ai-brain-gemini-integration)
  - [✨ Detailed Feature Breakdown](#-detailed-feature-breakdown)
    - [🎨 Immersive 3D Experience (WebGL)](#-immersive-3d-experience-webgl)
    - [🤖 Intelligent AI Assistant](#-intelligent-ai-assistant)
    - [🛠️ Omni-Present Admin Panel](#-omni-present-admin-panel)
    - [🌍 Advanced Internationalization (i18n)](#-advanced-internationalization-i18n)
    - [⚡ UI/UX Engineering](#-uiux-engineering)
  - [🏗️ Technical Stack & Dependencies](#-technical-stack--dependencies)
  - [🚀 Installation & Setup Guide](#-installation--setup-guide)
  - [🔐 Environment Variables](#-environment-variables)
  - [📂 Comprehensive Directory Structure](#-comprehensive-directory-structure)
  - [🤝 Contributing & Development](#-contributing--development)
  - [📄 License](#-license)

---

## 🔥 Project Value Proposition

This project solves several modern portfolio challenges:
1.  **Static vs. Dynamic:** Instead of a static resume, it offers a real-time, database-driven experience managed via a CMS-like Admin Panel.
2.  **Passive vs. Active:** Instead of just reading, users interact with a 3D world and converse with an AI agent.
3.  **Local vs. Global:** Fully localized content allows simultaneous targeting of English and Turkish speaking markets.

---

## 🧠 Core System Architecture

The application follows a **Clean Architecture** principle, ensuring separation of concerns, scalability, and maintainability.

### 1. The Frontend (Client-Side)
*   **Framework:** Next.js 15 (App Router) for server-side rendering (SSR) and superior SEO.
*   **State Management:** React Hooks and Context API for global state (Theme, Language, Sound).
*   **Styling Engine:** TailwindCSS v4 for utility-first styling, combined with custom CSS modules for complex animations.
*   **3D Engine:** React Three Fiber (R3F) acting as a React reconciler for Three.js, allowing declarative 3D scenes.

### 2. The Backend (Server-Side)
*   **Framework:** FastAPI for high-performance, asynchronous API endpoints.
*   **Database ORM:** SQLAlchemy for robust database interactions (SQLite in Dev, PostgreSQL ready for Prod).
*   **Validation:** Pydantic models ensure strict data validation on entry and exit.
*   **Microservices Design:** Services are modular (EmailService, AIService, AnalyticsService).

### 3. The AI Brain (Gemini Integration)
*   **Model:** Google Gemini Pro.
*   **Context Injection:** The system dynamically feeds the AI with the latest "Memory Bank" data (Resume, Skills, Projects) so it answers accurately as *me*.
*   **Persona:** Custom system instructions prompt the AI to behave as a helpful, professional assistant representing the portfolio owner.

---

## ✨ Detailed Feature Breakdown

### 🎨 Immersive 3D Experience (WebGL)
The "Hero" section is not typically HTML/CSS. It is a live-rendered 3D scene.
*   **Interactive Island:** A low-poly floating island that rotates and responds to cursor movement.
*   **Optimized Models:** GLB/GLTF models compressed using Draco compression for fast loading.
*   **Atmosphere:** Custom shaders and lighting to create a "Golden Hour" aesthetic.
*   **Performance:** Uses `useFrame` loops judiciously and leverages GPU instancing where possible.

### 🤖 Intelligent AI Assistant
Located in the bottom-right, this is more than a chatbot.
*   **RAG-like Capabilities:** It "knows" my CV. You can ask *"What is Duran's experience with React?"* and it will query its internal context to answer.
*   **Streaming Responses:** Implements streaming text generation for a "human-like" typing effect.
*   **History Awareness:** Maintains conversation history within the session for context-aware follow-up questions.

### 🛠️ Omni-Present Admin Panel
A secure, hidden `/admin` route provides full CRUD (Create, Read, Update, Delete) capabilities.
*   **Project Management:** Add new case studies, upload images, tag technologies.
*   **Skill Matrix:** Update skill proficiency levels and categories (Frontend, Backend, DevOps).
*   **Experience Timeline:** Manage work history, education, and certifications.
*   **Live Preview:** Changes made here update the JSON/Database immediately, reflecting on the frontend without a rebuild.
*   **Security:** Protected by JWT (JSON Web Tokens) authentication.

### 🌍 Advanced Internationalization (i18n)
*   **Routing:** Sub-path routing (`/en`, `/tr`) ensuring distinct URLs for SEO.
*   **Middleware:** Auto-detects user browser language and redirects appropriately.
*   **Content:** All static strings are JSON-based; dynamic content is DB-based with language columns.

### ⚡ UI/UX Engineering
*   **Magnetic Buttons:** Buttons that physically gravitate towards the mouse cursor.
*   **Scroll Progress:** A reading indicator at the top of the page.
*   **Lazy Loading:** Images/Components load only when entering the viewport.
*   **Glassmorphism:** Modern frosted glass effects on UI elements.
*   **Custom Cursor:** A trailing glow effect that follows user interaction.

---

## 🏗️ Technical Stack & Dependencies

### Frontend Core
| Package | Version | Purpose |
| :--- | :--- | :--- |
| `next` | 15.0+ | Core Framework |
| `react` | 19.0+ | UI Library |
| `three` | 0.160+ | 3D Math & Rendering |
| `@react-three/fiber` | 8.15+ | React renderer for ThreeJS |
| `@react-three/drei` | 9.0+ | R3F Helpers & Abstractions |
| `framer-motion` | 11.0+ | Complex 2D Animations |
| `lucide-react` | Latest | SVG Icon System |
| `next-intl` | Latest | Internationalization |

### Backend Core
| Package | Version | Purpose |
| :--- | :--- | :--- |
| `fastapi` | 0.109+ | ASGI Web Framework |
| `uvicorn` | Standard | ASGI Server |
| `sqlalchemy` | 2.0+ | Database ORM |
| `pydantic` | 2.0+ | Data Validation |
| `google-generativeai`| Latest | Gemini API SDK |
| `python-multipart` | Latest | Form Data Handling |

---

## 🚀 Installation & Setup Guide

### 1. System Preparation
Ensure you have the following installed:
*   Node.js v18 (LTS) or later
*   Python 3.10 or later
*   Git

### 2. Clone the Repository
```bash
git clone https://github.com/DuranGZR/NewPortfoilo.git
cd NewPortfoilo
```

### 3. Frontend Deployment (Port 3000)
```bash
cd frontend

# Install dependencies (Legacy peer deps might be needed for some 3D libs)
npm install --legacy-peer-deps

# Create Environment File
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Run Development Server
npm run dev
```

### 4. Backend Deployment (Port 8000)
```bash
cd backend

# Create Virtual Environment
python -m venv venv

# Activate Environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install Python Dependencies
pip install -r requirements.txt

# Create .env file (See Configuration Section)
# Run Server
uvicorn app.main:app --reload
```

---

## 🔐 Environment Variables

### Backend (`backend/.env`)
**Critical:** You must obtain these keys for the app to function fully.

```env
# --- AI Configuration ---
# Get from Google AI Studio
GOOGLE_API_KEY=AIzaSy...

# --- Email Service (Resend) ---
RESEND_API_KEY=re_123...
EMAIL_FROM=onboarding@resend.dev
EMAIL_TO=your.email@gmail.com

# --- Security ---
# Generate using: openssl rand -hex 32
SECRET_KEY=your_secure_random_string
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

# --- CORS Settings ---
# Allow requests from frontend
BACKEND_CORS_ORIGINS=["http://localhost:3000", "https://your-domain.com"]
```

---

## 📂 Comprehensive Directory Structure

```graphql
NewPortfoilo/
├── cursor/                  # IDE specific settings
├── frontend/                # NEXT.JS FRONTEND
│   ├── app/                 # App Router (Pages)
│   │   ├── [locale]/        # i18n dynamic route
│   │   │   ├── admin/       # Protected Admin Route
│   │   │   ├── page.tsx     # Main Landing Page
│   │   │   └── ...
│   │   └── api/             # Next.js specific API proxies
│   ├── components/          # React Components
│   │   ├── 3d-resume/       # Three.js Scenes & Models
│   │   ├── sections/        # Page Sections (Hero, About, etc.)
│   │   └── widgets/         # UI Elements (Buttons, Inputs)
│   ├── data/                # Static Data Fallbacks
│   ├── i18n/                # Localization Config
│   ├── messages/            # Translation JSONs (en.json, tr.json)
│   ├── public/              # Static Assets (Images, GLBs)
│   └── lib/                 # Utilities & Types
│
├── backend/                 # FASTAPI BACKEND
│   ├── app/
│   │   ├── api/             # API Route Handlers
│   │   │   └── v1/          # Version 1 Endpoints
│   │   ├── core/            # Config, Security, Events
│   │   ├── data/            # JSON Backup Storage
│   │   ├── models/          # Pydantic & SQLAlchemy Models
│   │   └── services/        # Logic Layers (AI, Email, CRUD)
│   ├── requirements.txt     # Python Dependencies
│   └── portfolio.db         # SQLite Database
│
└── README.md                # Documentation
```

---

## 🤝 Contributing & Development

We welcome Pull Requests!
1.  **Fork** the repo on GitHub.
2.  **Clone** your fork locally.
3.  **Branch** for your feature: `git checkout -b feature/cool-new-thing`.
4.  **Commit** your changes.
5.  **Push** to your fork.
6.  **Pull Request** to the `main` branch here.

**Coding Standards:**
*   **Frontend:** Follow eslint rules, use semantic HTML, strict TypeScript types.
*   **Backend:** PEP8 compliance, type hints, Pydantic optimization.

---

## 📄 License

This project is open-sourced under the **MIT License**.

Copyright © 2024-2025 DuranGZR.
Designed and Developed with ❤️ and ☕.
