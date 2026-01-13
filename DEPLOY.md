# 🚀 durangezer.com Deploy Rehberi

> **Hedef:** Next.js frontend + FastAPI backend portfolyosunu canlıya almak
>
> **Domain:** durangezer.com (Google Workspace'ten alındı)
>
> **Mimari:** Vercel (Frontend) + Railway (Backend)

---

## 📋 İçindekiler

1. [Ön Hazırlık](#-1-ön-hazırlık)
2. [Railway'e Backend Deploy](#-2-railwaye-backend-deploy)
3. [Vercel'e Frontend Deploy](#-3-vercele-frontend-deploy)
4. [Google Workspace DNS Ayarları](#-4-google-workspace-dns-ayarları)
5. [Environment Variables Güncelleme](#-5-environment-variables-güncelleme)
6. [Test ve Doğrulama](#-6-test-ve-doğrulama)
7. [Sorun Giderme](#-7-sorun-giderme)

---

## 🎯 Final Yapı

```
┌─────────────────────────────────────────────────────────────┐
│                      KULLANICI                               │
│                          │                                   │
│              ┌───────────┴───────────┐                      │
│              ▼                       ▼                      │
│    durangezer.com            api.durangezer.com            │
│         │                           │                       │
│         ▼                           ▼                       │
│    ┌─────────┐                 ┌──────────┐                │
│    │ VERCEL  │                 │ RAILWAY  │                │
│    │ Next.js │ ───────────────▶│ FastAPI  │                │
│    │ Frontend│    API calls    │ Backend  │                │
│    └─────────┘                 └──────────┘                │
│                                     │                       │
│                                     ▼                       │
│                              ┌──────────┐                   │
│                              │  GROQ AI │                   │
│                              │   API    │                   │
│                              └──────────┘                   │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ 1. Ön Hazırlık

### 1.1 Gerekli Hesaplar

| Hesap | URL | Açıklama |
|-------|-----|----------|
| **GitHub** | github.com | Repo zaten var ✅ |
| **Vercel** | vercel.com | GitHub ile kayıt ol |
| **Railway** | railway.app | GitHub ile kayıt ol |
| **Groq** | console.groq.com | AI API key için |

### 1.2 GitHub'ın Güncel Olduğundan Emin Ol

```powershell
# Proje klasöründe çalıştır
cd C:\Users\duran\Desktop\NewPortfolio

# Değişiklikleri kontrol et
git status

# Eğer değişiklik varsa commit'le
git add .
git commit -m "Deploy öncesi son değişiklikler"
git push origin main
```

### 1.3 Gerekli API Key'leri Hazırla

Şu bilgilerin elinde olması lazım:

| Key | Nereden Alınır |
|-----|----------------|
| `GROQ_API_KEY` | https://console.groq.com → API Keys |
| `RESEND_API_KEY` | https://resend.com → API Keys (opsiyonel) |
| `SECRET_KEY` | Kendi oluştur (32 karakter) |
| `ADMIN_PASSWORD` | Kendi belirle |

**SECRET_KEY oluşturmak için:**
```powershell
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

---

## 🚂 2. Railway'e Backend Deploy

### 2.1 Railway'e Giriş

1. **https://railway.app** adresine git
2. **"Login"** butonuna tıkla
3. **"Continue with GitHub"** seç
4. GitHub hesabınla giriş yap

### 2.2 Yeni Proje Oluştur

1. Dashboard'da **"+ New Project"** butonuna tıkla
2. **"Deploy from GitHub repo"** seç
3. Repository listesinden **"DuranGZR/NewPortfoilo"** seç
4. Eğer görmüyorsan **"Configure GitHub App"** tıkla ve repo'ya erişim ver

### 2.3 Servis Ayarları

Railway otomatik olarak projeyi algılayacak ama düzeltme yapmamız lazım:

1. Oluşturulan servise tıkla
2. **"Settings"** sekmesine git
3. Şu ayarları yap:

| Ayar | Değer |
|------|-------|
| **Root Directory** | `/backend` |
| **Builder** | Nixpacks (otomatik) |
| **Start Command** | `uvicorn app.main:app --host 0.0.0.0 --port $PORT` |

### 2.4 Environment Variables Ekle

1. **"Variables"** sekmesine git
2. **"+ New Variable"** ile şunları ekle:

```env
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SECRET_KEY=buraya-32-karakterlik-gizli-anahtar-yaz
ADMIN_PASSWORD=senin-admin-sifren
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

# Email servisi (opsiyonel, yoksa boş bırak)
RESEND_API_KEY=re_xxxxxxxxxxxx
EMAIL_FROM=onboarding@resend.dev
EMAIL_TO=senin@email.com

# CORS - Frontend URL (sonra güncellenecek)
BACKEND_CORS_ORIGINS=["https://durangezer.com","https://www.durangezer.com","http://localhost:3000"]
```

### 2.5 Deploy Et

1. **"Deploy"** butonuna tıkla
2. Build loglarını izle (2-5 dakika sürer)
3. Başarılı olunca yeşil ✅ göreceksin

### 2.6 Railway URL'ini Not Al

Deploy başarılı olduktan sonra:

1. **"Settings"** → **"Networking"** → **"Public Networking"**
2. **"Generate Domain"** butonuna tıkla
3. Şuna benzer bir URL alacaksın:

```
newportfoilo-production-xxxx.up.railway.app
```

**Bu URL'i not al!** Frontend ayarlarında lazım olacak.

### 2.7 Custom Domain Ekle (Opsiyonel ama Önerilen)

1. **"Settings"** → **"Networking"** → **"Custom Domain"**
2. `api.durangezer.com` yaz
3. Sana CNAME kaydı verecek, not al

---

## ⚡ 3. Vercel'e Frontend Deploy

### 3.1 Vercel'e Giriş

1. **https://vercel.com** adresine git
2. **"Sign Up"** veya **"Log In"**
3. **"Continue with GitHub"** seç

### 3.2 Projeyi Import Et

1. Dashboard'da **"Add New..."** → **"Project"** tıkla
2. **"Import Git Repository"** bölümünde **"DuranGZR/NewPortfoilo"** seç
3. **"Import"** butonuna tıkla

### 3.3 Proje Ayarları

Import ekranında şu ayarları yap:

| Ayar | Değer |
|------|-------|
| **Project Name** | `durangezer-portfolio` (veya istediğin) |
| **Framework Preset** | Next.js (otomatik algılar) |
| **Root Directory** | `frontend` (ÖNEMLİ! Edit butonuna tıkla) |

### 3.4 Environment Variables

**"Environment Variables"** bölümünü aç ve ekle:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_API_URL` | `https://api.durangezer.com/api/v1` |

> ⚠️ **Not:** Eğer henüz custom domain ayarlamadıysan, Railway URL'ini kullan:
> `https://newportfoilo-production-xxxx.up.railway.app/api/v1`

### 3.5 Deploy Et

1. **"Deploy"** butonuna tıkla
2. Build loglarını izle (3-5 dakika)
3. Başarılı olunca kutlama ekranı göreceksin 🎉

### 3.6 Vercel URL'ini Test Et

Deploy sonrası şuna benzer URL alacaksın:
```
https://durangezer-portfolio.vercel.app
```

Bu URL'i ziyaret et, sitenin çalıştığını doğrula.

### 3.7 Custom Domain Ekle

1. Proje sayfasında **"Settings"** → **"Domains"**
2. `durangezer.com` yaz, **"Add"** tıkla
3. `www.durangezer.com` yaz, **"Add"** tıkla
4. Vercel sana DNS kayıtlarını gösterecek, not al

Göreceğin kayıtlar şöyle olacak:

```
┌────────────────────────────────────────────────────────┐
│ Domain: durangezer.com                                  │
│ Type: A                                                 │
│ Value: 76.76.21.21                                      │
├────────────────────────────────────────────────────────┤
│ Domain: www.durangezer.com                              │
│ Type: CNAME                                             │
│ Value: cname.vercel-dns.com                             │
└────────────────────────────────────────────────────────┘
```

---

## 🌐 4. Google Workspace DNS Ayarları

### 4.1 Google Admin Console'a Giriş

1. **https://admin.google.com** adresine git
2. Google Workspace hesabınla giriş yap

### 4.2 Domain DNS Ayarlarına Git

1. Sol menüden **"Domains"** tıkla
2. **"Manage domains"** seç
3. `durangezer.com` yanındaki **"Manage"** veya **"DNS"** tıkla

> ⚠️ **Alternatif Yol:** Google Domains kullanıyorsan https://domains.google.com adresinden de yapabilirsin

### 4.3 DNS Kayıtlarını Ekle

**"DNS"** veya **"Advanced DNS settings"** bölümünde şu kayıtları ekle:

#### Frontend için (Vercel):

| Type | Name/Host | Value/Data | TTL |
|------|-----------|------------|-----|
| A | @ | 76.76.21.21 | 3600 |
| CNAME | www | cname.vercel-dns.com | 3600 |

#### Backend için (Railway):

| Type | Name/Host | Value/Data | TTL |
|------|-----------|------------|-----|
| CNAME | api | [railway-domain].railway.app | 3600 |

> **Örnek:** Railway URL'in `newportfoilo-production-abc123.up.railway.app` ise:
> - Name: `api`
> - Value: `newportfoilo-production-abc123.up.railway.app`

### 4.4 Mevcut Kayıtları Kontrol Et

> ⚠️ **ÖNEMLİ:** Eğer zaten `@` veya `www` için kayıt varsa, önce onları sil veya güncelle!

### 4.5 Kaydet ve Bekle

1. **"Save"** veya **"Add"** butonuna tıkla
2. DNS yayılması **5-30 dakika** sürebilir
3. Bazen **24 saate kadar** uzayabilir

### 4.6 DNS Yayılmasını Kontrol Et

Terminalde şunu çalıştır:

```powershell
# Windows
nslookup durangezer.com

# Beklenen sonuç:
# Address: 76.76.21.21
```

Veya online araç kullan: https://www.whatsmydns.net/

---

## 🔐 5. Environment Variables Güncelleme

DNS ayarları aktif olduktan sonra her iki tarafı da güncelle:

### 5.1 Railway'de CORS Güncelle

1. Railway Dashboard → Projen → **"Variables"**
2. `BACKEND_CORS_ORIGINS` değerini güncelle:

```env
BACKEND_CORS_ORIGINS=["https://durangezer.com","https://www.durangezer.com"]
```

3. **"Deploy"** butonuyla yeniden deploy et

### 5.2 Vercel'de API URL Güncelle

1. Vercel Dashboard → Projen → **"Settings"** → **"Environment Variables"**
2. `NEXT_PUBLIC_API_URL` değerini güncelle:

```env
NEXT_PUBLIC_API_URL=https://api.durangezer.com/api/v1
```

3. **"Redeploy"** yap (Deployments → ... menü → Redeploy)

---

## ✅ 6. Test ve Doğrulama

### 6.1 Frontend Test

Tarayıcıda aç:
- ✅ https://durangezer.com
- ✅ https://www.durangezer.com

**Kontrol et:**
- [ ] Sayfa yükleniyor mu?
- [ ] 3D resume çalışıyor mu? (`/3d-resume`)
- [ ] Dil değiştirme çalışıyor mu?
- [ ] Tüm section'lar görünüyor mu?

### 6.2 Backend Test

Tarayıcıda aç:
- ✅ https://api.durangezer.com/docs (Swagger UI)
- ✅ https://api.durangezer.com/health

### 6.3 AI Assistant Test

1. durangezer.com'a git
2. Sağ alttaki chat ikonuna tıkla
3. "Merhaba" yaz
4. Cevap geliyor mu kontrol et

### 6.4 SSL Sertifikası Kontrol

Tarayıcı adres çubuğunda 🔒 kilit ikonu olmalı.

---

## 🔧 7. Sorun Giderme

### Sorun: "Site açılmıyor"

**Çözüm:**
1. DNS yayılmasını bekle (30 dk - 24 saat)
2. `nslookup durangezer.com` ile kontrol et
3. Vercel Dashboard'da domain durumunu kontrol et

### Sorun: "API çalışmıyor"

**Çözüm:**
1. Railway'de deploy loglarını kontrol et
2. Environment variables'ları kontrol et
3. `https://api.durangezer.com/docs` açılıyor mu test et

### Sorun: "CORS hatası"

**Çözüm:**
1. Railway'de `BACKEND_CORS_ORIGINS` değerini kontrol et
2. Tam URL'leri ekle (https dahil)
3. Redeploy yap

### Sorun: "AI Assistant çalışmıyor"

**Çözüm:**
1. `GROQ_API_KEY` doğru mu kontrol et
2. Railway loglarını kontrol et
3. https://api.durangezer.com/api/v1/chat test et

### Sorun: "Build failed"

**Çözüm:**
1. Vercel/Railway loglarını oku
2. Lokal'de `npm run build` veya `pip install -r requirements.txt` dene
3. Hata mesajını Google'la

---

## 📊 Özet Checklist

```
[ ] 1. GitHub repo güncel
[ ] 2. Railway hesabı açıldı
[ ] 3. Railway'e backend deploy edildi
[ ] 4. Railway URL not alındı
[ ] 5. Vercel hesabı açıldı
[ ] 6. Vercel'e frontend deploy edildi
[ ] 7. Google Admin'de DNS kayıtları eklendi
    [ ] A kaydı: @ → 76.76.21.21
    [ ] CNAME: www → cname.vercel-dns.com
    [ ] CNAME: api → railway-url
[ ] 8. DNS yayılması tamamlandı
[ ] 9. Vercel'de custom domain aktif
[ ] 10. Railway'de custom domain aktif
[ ] 11. Environment variables güncellendi
[ ] 12. Site test edildi
[ ] 13. AI Assistant test edildi
[ ] 14. SSL aktif (🔒 görünüyor)
```

---

## 🎉 Tebrikler!

Eğer tüm adımları tamamladıysan, portfolyon artık canlı:

- **🌐 Ana Site:** https://durangezer.com
- **🔧 API Docs:** https://api.durangezer.com/docs
- **🤖 AI Assistant:** Çalışıyor!

---

## 📞 Yardım

Herhangi bir adımda takılırsan:
- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Google Domains Help: https://support.google.com/domains

---

> 💡 **İpucu:** Her şey çalıştıktan sonra bu dosyayı sil veya `.gitignore`'a ekle, çünkü hassas bilgiler içerebilir.
