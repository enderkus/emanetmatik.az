# Emanetmatik.az

Bakıdakı Crescent Mall, Deniz Mall, 28 Mall, Gənclik Mall və İçərişəhərdə fəaliyyət
göstərən əmanət dolabı xidməti üçün Jekyll ilə hazırlanmış statik sayt.

## Yerli işə salma

```bash
bundle install
bundle exec jekyll serve
```

Sayt `http://localhost:4000` ünvanında açılacaq.

## Redaktə edilməli olan yerlər

Canlıya keçmədən əvvəl aşağıdakıları öz real məlumatlarınızla dəyişin:

- **`_config.yml`** → `company:` bölməsi (telefon, e-poçt, WhatsApp nömrəsi, Instagram/TikTok linkləri)
- **`_data/pricing.json`** → dolab ölçüləri və saatlıq/günlük qiymətlər, `az`/`en` üçün ayrıca (nümunə dəyərlərdir)
- **`_data/locations.json`** → hər mall üçün dəqiq ünvan, iş saatları, dolab sayı və Google Maps linki, `az`/`en` üçün ayrıca
- **`_data/faq.json`** → SSS sualları və cavabları, `az`/`en` üçün ayrıca
- **`assets/img/logo.png` / `logo-white.png`** → əsas və footer logoları (artıq yerləşdirilib)

## Dil dəstəyi (AZ / EN)

Sayt iki dildə fəaliyyət göstərir: Azərbaycanca (`/`) və İngiliscə (`/en/`).

- **`_data/i18n.yml`** → bütün interfeys mətnləri (naviqasiya, düymələr, bölmə başlıqları və s.), `az:` və `en:` açarları altında
- **`_includes/home.html`** → əsas səhifənin tək ortaq şablonu — həm `index.html` (AZ), həm də `en/index.html` (EN) bunu çağırır, mətnləri `page.lang`-a görə `site.data.i18n`-dən götürür
- Yeni mətn əlavə edərkən: əvvəlcə `_data/i18n.yml`-ə həm `az`, həm `en` açarını əlavə edin, sonra `_includes/home.html`-də `{{ t.bölmə.açar }}` kimi istifadə edin
- Dil keçidi header-də (`AZ` / `EN` düymələri, `_includes/header.html`) yerləşir

## Struktur

- `index.html`, `en/index.html` — hər dil üçün nazik səhifələr (yalnız `lang`/`permalink` front matter və `home.html`-in include edilməsi)
- `_includes/home.html` — bütün bölmələri (hero, xüsusiyyətlər, necə işləyir, lokasiyalar, qiymətlər, SSS) ehtiva edən əsas məzmun
- `_layouts/default.html`, `_includes/header.html`, `_includes/footer.html` — ümumi tərtibat
- `assets/css/style.css` — bütün dizayn
- `assets/js/main.js` — mobil menyu, sticky header, qiymət tabları və SSS akkordeonu

## Yerləşdirmə (deploy)

Sayt tamamilə statikdir, backend tələb olunmur. GitHub Pages, Netlify və ya Vercel
üzərində birbaşa yerləşdirilə bilər (GitHub Pages üçün Gemfile-dəki qeyddən istifadə edin).
