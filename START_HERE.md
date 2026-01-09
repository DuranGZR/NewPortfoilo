# 🚀 Quick Start Guide

## Şu Ana Kadar Ne Yapıldı?

### ✅ Tamamlanan Hazırlık
1. **Memory Bank Yapısı** - Proje dokümantasyonu ve hafıza sistemi
2. **Detaylı Blueprint** - 8000+ kelimelik kapsamlı tasarım dokümantasyonu
3. **Placeholder Veriler** - Realistic placeholder projeler, skills, roadmap
4. **Design System** - Renkler, typography, animasyonlar, componentler
5. **Content Örnekleri** - Hero headlines, CTAs, microcopy

### 📁 Dosya Yapısı
```
NewPortfolio/
├── Agent.md                    # Memory Bank sistemi tanımı
├── BLUEPRINT.md                # Detaylı proje blueprint'i ⭐
├── THIS_FILE.md                # Bu dosya
├── memory-bank/                # Proje dokümantasyonu
│   ├── projectbrief.md         # Proje özeti
│   ├── productContext.md       # Ürün vizyonu ve UX
│   ├── systemPatterns.md       # Teknik mimari
│   ├── techContext.md          # Teknoloji stack detayları
│   ├── activeContext.md        # Güncel durum
│   └── progress.md             # İlerleme takibi
└── data-templates/             # Placeholder veriler
    ├── projects.ts             # 4 örnek proje
    ├── skills.ts               # 50+ skill ile network
    ├── roadmap.ts              # 4 milestone + career paths
    └── thinking.ts             # 6 engineering thinking card
```

## 🎯 Sıradaki Adım: Development Başlat

### 1. Next.js Projesi Oluştur

Terminal'de şu komutu çalıştır:

```powershell
npx create-next-app@latest living-portfolio --typescript --tailwind --app --use-pnpm
```

**Sorular gelecek, şu seçenekleri seç:**
```
✔ Would you like to use TypeScript? … Yes
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … Yes
✔ Would you like to use `src/` directory? … No
✔ Would you like to use App Router? … Yes
✔ Would you like to customize the default import alias? … No
```

### 2. Proje Klasörüne Git

```powershell
cd living-portfolio
```

### 3. Ek Dependency'leri Kur

```powershell
pnpm add framer-motion lucide-react
pnpm add -D @types/node @types/react @types/react-dom
```

### 4. Data Dosyalarını Kopyala

`data-templates/` klasöründeki dosyaları yeni projeye kopyala:

```powershell
# Önce data klasörü oluştur
New-Item -ItemType Directory -Path "data" -Force

# Sonra dosyaları kopyala (parent directory'den)
Copy-Item -Path "..\data-templates\*" -Destination ".\data\" -Recurse
```

### 5. Tailwind Config'i Güncelle

`tailwind.config.ts` dosyasını aç ve şu config'i kullan:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0b0f14',
        secondary: '#1a1f2e',
        tertiary: '#252a38',
        accent: {
          cyan: '#00d9ff',
          blue: '#0ea5e9',
          purple: '#8b5cf6',
        },
        text: {
          primary: '#e2e8f0',
          secondary: '#cbd5e1',
          muted: '#64748b',
        },
        glass: {
          bg: 'rgba(255, 255, 255, 0.05)',
          border: 'rgba(255, 255, 255, 0.1)',
          hover: 'rgba(255, 255, 255, 0.08)',
        },
      },
      fontFamily: {
        heading: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      backdropBlur: {
        glass: '10px',
      },
      animation: {
        'glow-pulse': 'glow 2s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 217, 255, 0.6)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

### 6. Development Server Başlat

```powershell
pnpm dev
```

Browser'da `http://localhost:3000` aç.

## 📖 Nasıl İlerlemeli?

### Tavsiye Edilen Sıra:

1. **Önce BLUEPRINT.md'yi oku** - Tüm detaylar orada
2. **Design System componentlerini oluştur**:
   - `components/ui/Button.tsx`
   - `components/ui/Card.tsx`
   - `components/ui/Typography.tsx`
3. **Layout'u kur**:
   - `components/layout/Header.tsx`
   - `components/layout/Footer.tsx`
4. **Section'ları teker teker yap**:
   - Hero → Projects → Thinking → Skills → Roadmap
5. **Animasyonları ekle** (Framer Motion)
6. **Responsive yap**
7. **Optimize et**

## 🎨 Design System Hızlı Referans

### Renkler
```css
Background: #0b0f14
Accent: #00d9ff (cyan), #0ea5e9 (blue)
Text: #e2e8f0 (primary), #64748b (muted)
```

### Glassmorphism Card
```css
background: rgba(255, 255, 255, 0.05)
backdrop-filter: blur(10px)
border: 1px solid rgba(255, 255, 255, 0.1)
border-radius: 20px
```

### Typography Scale
```
H1: 64px (4rem) - Space Grotesk Bold
H2: 48px (3rem) - Space Grotesk Semibold
H3: 32px (2rem) - Space Grotesk Medium
Body: 16px (1rem) - Inter Regular
```

## 📝 İçerik Güncellemesi (Phase 2)

Gerçek verilerle güncellemek için:

1. **Projeler**: `data/projects.ts` - Array'i güncelle
2. **Skills**: `data/skills.ts` - Skills array'ini güncelle
3. **Roadmap**: `data/roadmap.ts` - Milestones güncelle
4. **İletişim**: Header/Footer'daki placeholder bilgileri değiştir

## 🤖 AI Assistant (Phase 3)

AI assistant şimdilik placeholder olarak gösterilecek:
- "Coming Soon" UI component
- Phase 3'te backend + RAG entegrasyonu

## 📚 Önemli Dosyalar

- **BLUEPRINT.md** → En önemli dosya, her şey burada
- **memory-bank/** → Proje dokümantasyonu, context için
- **data-templates/** → Örnek veriler, production'da `data/` içinde olacak

## ❓ Sorular?

Her şey BLUEPRINT.md içinde detaylı anlatılmış:
- Section tasarımları
- Component örnekleri
- Animation specs
- Copy examples
- Implementation checklist

## 🚀 Başarılar!

Artık kodlamaya başlayabilirsin. Blueprint'e bak, adım adım ilerle.

**İlk hedef**: Hero section + Projects section ile başla.
