# HMZDevelop — Cinematic Video Presentation (4K 60FPS)

## 🎬 Aperçu

Vidéo de presentation cinématique ultra-premium pour HMZDevelop, un studio digital de luxe.  
Style visuel inspiré d'Apple, Tesla et Stripe — noir mat, or métallique, design minimaliste futuriste.

**Caractéristiques :**
- Rendu 4K UHD (3840×2160) à 60 FPS
- Logo 3D réaliste avec matériau doré métallique (Three.js)
- Particules dorées flottantes, lens flares, light streaks
- Cartes services 3D flottantes avec glassmorphism
- Mockups smartphone réalistes avec contenu du site
- Transitions cinématiques fluides (crossfade, blur, scale)
- Grain de film, vignettage, grille holographique
- Script voiceover français inclus

## 📦 Installation

```bash
cd video
npm install
```

## 🎥 Prévisualisation

```bash
npm start
```
Ouvre http://localhost:3000 dans le navigateur.

## 🎞️ Rendu

### 4K UHD 60FPS (qualité maximale)
```bash
npm run build
```
> ⚠️ Le rendu 4K peut prendre plusieurs heures selon ta machine.

### Preview HD (pour tests rapides)
```bash
npm run build-preview
```

## 🎙️ Voiceover

Le script en français est dans `src/voiceover/script.ts`.  
Enregistre l'audio et superpose sur la vidéo exportée dans DaVinci Resolve ou Premiere Pro.

## 🏗️ Structure

```
src/
├── Video.tsx                 # Composition principale (6 scènes)
├── Root.tsx / index.ts       # Point d'entrée
├── colors.ts                 # Thème 4K 60FPS
├── cinematic/
│   ├── CameraRig.tsx         # Système de caméra cinématique
│   ├── effects.tsx           # Particules, flares, streaks, grain
│   ├── TextReveal.tsx        # Animations typographiques
│   ├── Logo3D.tsx            # Logo 3D Three.js (or métallique)
│   ├── Smartphone.tsx        # Mockups smartphone 3D
│   └── ServiceCard3D.tsx     # Cartes services flottantes
├── sections/
│   ├── SceneIntro.tsx        # Logo emerge des ténèbres ~8s
│   ├── SceneHero.tsx         # Hero section flottante ~8s
│   ├── SceneServices.tsx     # Cartes services 3D ~10s
│   ├── ScenePricing.tsx      # Pricing glassmorphism ~8s
│   ├── SceneMobile.tsx       # Smartphone showcase ~8s
│   └── SceneFinal.tsx        # Composition finale ~10s
└── voiceover/
    └── script.ts             # Script voiceover français
```

## ⚙️ Personnalisation

- **Durées** : Modifie `DURATIONS` dans `colors.ts`
- **Couleurs** : Modifie `theme` dans `colors.ts`
- **Services** : Modifie `services` dans `ServiceCard3D.tsx`
- **Pricing** : Modifie `plans` dans `ScenePricing.tsx`
- **Textes** : Modifie les sections dans `sections/`
