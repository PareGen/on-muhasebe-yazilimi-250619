# Railway Deployment Rehberi

Bu rehber, SaaS Template projesini Railway platformunda deploy etmek için gereken tüm adımları içermektedir.

## İçindekiler

1. [Gereksinimler](#gereksinimler)
2. [Railway'de Deploy](#railwayde-deploy)
3. [Environment Variables](#environment-variables)
4. [Migration Çalıştırma](#migration-çalıştırma)
5. [Troubleshooting](#troubleshooting)

---

## Gereksinimler

- [Railway hesabı](https://railway.app) (ücretsiz $5 credit ile başlar)
- GitHub hesabı (kod burada olmalı)
- Node.js 20+ ve pnpm 8+ (lokal test için)

---

## Railway'de Deploy

### 1. Yeni Proje Oluşturma

1. **Railway Dashboard'a gidin**: https://railway.app/dashboard

2. **"New Project"** butonuna tıklayın

3. **"Deploy from GitHub repo"** seçeneğini seçin

4. **GitHub repo'nuzu seçin ve yetkilendirin**

### 2. PostgreSQL Database Ekleme

1. Proje içinde **"New"** → **"Database"** → **"Add PostgreSQL"**

2. Database otomatik olarak oluşturulur ve `DATABASE_URL` environment variable'ı otomatik eklenir

### 3. Backend API Servisi Yapılandırma

Railway otomatik olarak projenizi algılayacak ve build etmeye çalışacak. Ancak monorepo yapısı için özel ayarlar gerekiyor:

#### 3.1. Root Settings

1. Servisinize tıklayın → **"Settings"** sekmesi

2. **"Build"** bölümünde:
   - **Root Directory**: Boş bırakın (monorepo root)
   - **Build Command**: Otomatik algılanır (`nixpacks.toml` kullanılır)
   - **Start Command**: Otomatik algılanır (`nixpacks.toml` kullanılır)

3. **"Deploy"** bölümünde:
   - **Health Check Path**: `/api/v1/health`
   - **Restart Policy**: `On Failure`

#### 3.2. Environment Variables Ekleme

**"Variables"** sekmesine gidin ve aşağıdaki değişkenleri ekleyin:

| Key                  | Value                                          | Açıklama                                    |
|----------------------|------------------------------------------------|---------------------------------------------|
| `NODE_ENV`           | `production`                                   | Ortam                                       |
| `PORT`               | `${{PORT}}`                                    | Railway otomatik atar                       |
| `API_PREFIX`         | `/api/v1`                                      | API prefix                                  |
| `DATABASE_URL`       | `${{Postgres.DATABASE_URL}}`                   | PostgreSQL connection string (otomatik)     |
| `JWT_SECRET`         | (güçlü bir secret oluşturun)                   | JWT token secret - min 32 karakter         |
| `JWT_EXPIRY`         | `1d`                                           | Access token süresi                         |
| `JWT_REFRESH_SECRET` | (güçlü bir secret oluşturun)                   | Refresh token secret - min 32 karakter     |
| `JWT_REFRESH_EXPIRY` | `7d`                                           | Refresh token süresi                        |
| `CORS_ORIGIN`        | `https://your-frontend.railway.app`            | Frontend URL (deployment sonrası güncelleyin) |
| `THROTTLE_TTL`       | `60`                                           | Rate limit pencere süresi (saniye)          |
| `THROTTLE_LIMIT`     | `100`                                          | Rate limit - istek sayısı                   |

**JWT Secret Oluşturma**:
```bash
# Node.js ile generate etmek için:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### 3.3. Deploy

1. **"Deploy"** butonuna tıklayın veya GitHub'a push yapın (otomatik deploy)

2. Build logs'u takip edin:
   - Dependencies yükleniyor
   - Monorepo build ediliyor
   - Migration'lar çalışıyor
   - Servis başlatılıyor

### 4. Frontend Servisi Ekleme (Opsiyonel)

Frontend için ayrı bir servis oluşturun:

1. Proje içinde **"New"** → **"GitHub Repo"** → Aynı repo'yu seçin

2. **"Settings"** → **"Build"**:
   - **Build Command**: `pnpm install && pnpm build:frontend`
   - **Start Command**: `pnpm start:frontend`

3. **"Variables"** sekmesinde:
   - `NODE_ENV`: `production`
   - `NEXT_PUBLIC_API_URL`: `https://your-api.railway.app/api/v1`

---

## Environment Variables

### Backend API Environment Variables

| Key                  | Value                                          | Açıklama                                    |
|----------------------|------------------------------------------------|---------------------------------------------|
| `NODE_ENV`           | `production`                                   | Ortam                                       |
| `PORT`               | `${{PORT}}`                                    | Railway otomatik atar                       |
| `API_PREFIX`         | `/api/v1`                                      | API prefix                                  |
| `DATABASE_URL`       | `${{Postgres.DATABASE_URL}}`                   | PostgreSQL connection string                |
| `JWT_SECRET`         | (güçlü bir secret oluşturun)                   | JWT token secret - min 32 karakter         |
| `JWT_EXPIRY`         | `1d`                                           | Access token süresi                         |
| `JWT_REFRESH_SECRET` | (güçlü bir secret oluşturun)                   | Refresh token secret - min 32 karakter     |
| `JWT_REFRESH_EXPIRY` | `7d`                                           | Refresh token süresi                        |
| `CORS_ORIGIN`        | `https://your-frontend.railway.app`            | Frontend URL                                |
| `THROTTLE_TTL`       | `60`                                           | Rate limit pencere süresi (saniye)          |
| `THROTTLE_LIMIT`     | `100`                                          | Rate limit - istek sayısı                   |

### Frontend Environment Variables (Eğer frontend deploy ediyorsanız)

| Key                    | Value                                      | Açıklama                    |
|------------------------|--------------------------------------------|-----------------------------|
| `NODE_ENV`             | `production`                               | Ortam                       |
| `NEXT_PUBLIC_API_URL`  | `https://your-api.railway.app/api/v1`     | Backend API URL             |

---

## Migration Çalıştırma

Migration'lar **otomatik olarak çalışır**. `start:api` scripti migration'ları otomatik çalıştırır.

### Migration Durumunu Kontrol Etme

1. Railway Dashboard → Servisiniz → **"Deployments"** → Son deployment → **"View Logs"**

2. Deployment loglarında şu satırları göreceksiniz:
   ```
   Running migrations...
   Migration CreateUsersTable has been executed successfully
   Migration CreateProjectsTable has been executed successfully
   ```

### Manuel Migration Çalıştırma (Gerekirse)

Railway CLI kullanarak:

```bash
# Railway CLI'yi yükleyin
npm i -g @railway/cli

# Login olun
railway login

# Projenize bağlanın
railway link

# Migration çalıştırın
railway run pnpm --filter @saas-template/database typeorm migration:run -d src/config/data-source.ts
```

---

## Deployment Sonrası Kontroller

### 1. Backend API Kontrolü

Railway size otomatik bir URL verir (örn: `https://your-service.railway.app`):

- Health check: `https://your-service.railway.app/api/v1/health` (200 OK dönmeli)
- Swagger docs: `https://your-service.railway.app/api/v1/docs` (eğer aktifse)

### 2. Database Bağlantı Kontrolü

Logs'da şu satırı görmeli:
```
🚀 Application is running on: http://localhost:PORT/api/v1
```

### 3. Custom Domain (Opsiyonel)

1. **"Settings"** → **"Domains"**
2. **"Generate Domain"** veya **"Custom Domain"** ekleyin
3. DNS ayarlarını yapın

---

## Troubleshooting

### Problem: Build başarısız oluyor

**Çözüm**:

1. Logs'u kontrol edin (Deployments → View Logs)
2. `pnpm-lock.yaml` dosyasının commit edildiğinden emin olun
3. `nixpacks.toml` dosyasının doğru olduğundan emin olun
4. Node.js versiyonu 20+ olduğundan emin olun

### Problem: "Module not found" hatası

**Çözüm**:

1. Monorepo build sırasını kontrol edin:
   ```bash
   pnpm build:api
   # Sırasıyla: database → core → api
   ```

2. `package.json` içindeki workspace bağımlılıklarını kontrol edin

3. Build command'i güncelleyin:
   ```bash
   pnpm install --frozen-lockfile && pnpm build:api
   ```

### Problem: Migration'lar çalışmıyor

**Çözüm**:

1. `DATABASE_URL` environment variable'ının doğru ayarlandığından emin olun
2. Logs'da migration hatalarını kontrol edin
3. Railway CLI ile manuel migration çalıştırın

### Problem: CORS hatası

**Çözüm**:

1. Backend `CORS_ORIGIN` environment variable'ını kontrol edin
2. Frontend URL'nin tam olarak ayarlandığından emin olun (protokol dahil: `https://...`)
3. Servisi yeniden deploy edin

### Problem: Database bağlantı hatası

**Çözüm**:

1. PostgreSQL servisinin çalıştığından emin olun
2. `DATABASE_URL` variable'ının doğru reference edildiğinden emin olun: `${{Postgres.DATABASE_URL}}`
3. Database servisini restart edin

### Problem: Port hatası

**Çözüm**:

Railway otomatik olarak `PORT` environment variable'ı sağlar. Kodunuzda:

```typescript
const port = process.env.PORT || 3000;
```

şeklinde kullanın.

---

## Railway CLI Kullanımı

### Kurulum

```bash
npm i -g @railway/cli
```

### Temel Komutlar

```bash
# Login
railway login

# Projeye bağlan
railway link

# Logs görüntüle
railway logs

# Environment variables listele
railway variables

# Komut çalıştır
railway run <command>

# Shell aç
railway shell
```

---

## Monorepo Yapılandırması

Railway monorepo'ları destekler. `nixpacks.toml` dosyası build sürecini kontrol eder:

```toml
[phases.setup]
nixPkgs = ["nodejs-20_x", "pnpm"]

[phases.install]
cmds = ["pnpm install --frozen-lockfile"]

[phases.build]
cmds = ["pnpm build:api"]

[start]
cmd = "pnpm start:api"
```

### Frontend için ayrı nixpacks.toml

Frontend servisi için `apps/frontend/nixpacks.toml` oluşturun:

```toml
[phases.setup]
nixPkgs = ["nodejs-20_x", "pnpm"]

[phases.install]
cmds = ["pnpm install --frozen-lockfile"]

[phases.build]
cmds = ["pnpm build:frontend"]

[start]
cmd = "pnpm start:frontend"
```

---

## Production Checklist

Deploy öncesi kontrol listesi:

- [ ] `JWT_SECRET` ve `JWT_REFRESH_SECRET` güçlü rastgele stringler
- [ ] `CORS_ORIGIN` production frontend URL'si
- [ ] `NODE_ENV=production` ayarlı
- [ ] Database backup stratejisi oluşturuldu
- [ ] Error monitoring kuruldu (örn: Sentry)
- [ ] Rate limiting ayarları test edildi
- [ ] SSL/HTTPS aktif (Railway otomatik sağlar)
- [ ] Environment variables production'da güvenli şekilde saklanıyor
- [ ] Health check endpoint çalışıyor

---

## Maliyet Optimizasyonu

Railway kullanım bazlı ücretlendirme yapar:

1. **Starter Plan**: $5/ay credit (hobby projeler için)
2. **Developer Plan**: $20/ay credit (küçük projeler için)
3. **Team Plan**: Kullanıma göre (production için)

**Maliyet azaltma ipuçları**:

- Kullanılmayan servisleri durdurun
- Auto-scaling ayarlarını optimize edin
- Database connection pooling kullanın
- Static assets için CDN kullanın

---

## Faydalı Linkler

- [Railway Docs](https://docs.railway.app/)
- [Railway Templates](https://railway.app/templates)
- [Nixpacks Docs](https://nixpacks.com/)
- [Railway Discord](https://discord.gg/railway)

---

## Destek

Sorun yaşıyorsanız:

1. [Railway Discord Community](https://discord.gg/railway)
2. [Railway GitHub Discussions](https://github.com/railwayapp/railway/discussions)
3. Railway Support (dashboard'dan ticket açın)

---

**Not**: Railway, modern deployment platformudur ve Docker, Nixpacks gibi birden fazla build yöntemini destekler. Monorepo projeler için Nixpacks önerilir.
