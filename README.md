# Scrapy — Prospection Google Maps × Claude

Outil de prospection commerciale locale : extrait, analyse et score des prospects depuis Google Maps.

---

## Déploiement sur Vercel (5 minutes)

### 1. Installe Vercel CLI
```bash
npm install -g vercel
```

### 2. Déploie le projet
```bash
cd scrapy
vercel
```
Suis les instructions (crée un compte gratuit si besoin).

### 3. Ajoute tes clés API dans Vercel

Va sur https://vercel.com → ton projet → **Settings → Environment Variables** et ajoute :

| Variable | Valeur | Requis |
|---|---|---|
| `ANTHROPIC_API_KEY` | Ta clé Anthropic (https://console.anthropic.com) | ✅ Obligatoire |
| `APIFY_API_KEY` | Ta clé Apify (https://console.apify.com/account/integrations) | Optionnel (mode simulation sinon) |

### 4. Redéploie
```bash
vercel --prod
```

---

## Structure du projet

```
scrapy/
├── api/
│   ├── claude.js     → proxy vers l'API Anthropic (résout les CORS)
│   └── apify.js      → proxy vers l'API Apify
├── public/
│   └── index.html    → interface principale
└── vercel.json       → config Vercel
```

---

## Alternative : déploiement via l'interface Vercel (sans CLI)

1. Crée un compte sur https://vercel.com
2. Clique **"Add New Project"**
3. Glisse le dossier `scrapy/` ou connecte ton GitHub
4. Ajoute les variables d'environnement dans Settings
5. Clique Deploy ✅
