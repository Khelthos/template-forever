# Azeroth Guild Template

[English](../../README.md) · [Deutsch](../de/README.md) · **Français** · [Español](../es/README.md) · [Italiano](../it/README.md) · [Português (Brasil)](../pt-BR/README.md) · [Русский](../ru/README.md) · [한국어](../ko/README.md) · [简体中文](../zh-CN/README.md) · [繁體中文](../zh-TW/README.md)

Un modèle de site **gratuit et statique** pour les guildes de **World of Warcraft: Forever**. Faites un fork, modifiez un fichier de configuration, rédigez actualités et guides en Markdown et publiez gratuitement sur GitHub Pages.

Réalisé avec [Astro](https://astro.build), [Tailwind CSS 4](https://tailwindcss.com) et du JavaScript natif. Pas de backend, pas de base de données, aucun service payant.

> Projet communautaire, non affilié à Blizzard Entertainment ni approuvé par celle-ci.

## Fonctionnalités

- **Identité Alliance / Horde :** emblèmes, illustration d’accueil, blason et palette changent avec la faction.
- **10 langues d’interface**, celles dans lesquelles World of Warcraft est traduit : English, Deutsch, Français, Español, Italiano, Português (Brasil), Русский, 한국어, 简体中文, 繁體中文.
- **12 palettes** (2 de faction + 10 inspirées des races de Forever) ou vos propres couleurs HEX, avec contraste vérifié automatiquement en thème clair et sombre.
- **5 préréglages typographiques** gratuits (Google Fonts, licence OFL), téléchargés lors du build : les visiteurs n’envoient aucune requête à Google.
- **Page d’accueil** avec bannière, présentation, recrutement, activités, dernières actualités, membres et guides.
- **Page « La guilde »** avec histoire, valeurs, organisation, conditions, statut du recrutement et contacts.
- **Actualités en Markdown** avec catégories, mots-clés, images de couverture, brouillons, pagination et articles associés.
- **Guides en Markdown** avec catégories, guides à la une, sommaire automatique, mots-clés et guides associés.
- **Liste des membres** depuis un fichier JSON avec recherche, filtres (race, classe, spécialisation, rôle, rang, statut) et tri.
- **Recherche** dans les actualités et les guides, entièrement dans le navigateur.
- **Thème clair/sombre**, menu mobile accessible, navigation au clavier, fonctionne sans JavaScript.
- **SEO :** URL canoniques, Open Graph, sitemap, robots.txt, chemin de base correct sur GitHub Pages.
- **Contrôles automatiques** de la configuration, du contenu, des liens et de l’attribution, et tests automatisés.

## Démarrage rapide

Prérequis : [Node.js](https://nodejs.org) 22.23 ou plus récent (24 recommandé) et Git.

```bash
git clone https://github.com/<votre-utilisateur>/<votre-depot>.git
cd <votre-depot>
npm ci
npm run dev
```

Ouvrez l’adresse affichée dans le terminal (généralement `http://localhost:4321/<nom-du-depot>/`).

## Personnaliser le site

| Quoi | Où |
| --- | --- |
| Nom, faction, langue, couleurs, polices, sections, réseaux sociaux | `src/config/site.config.mjs` |
| Texte de la page « La guilde » | `src/content/pages/about.md` |
| Actualités | `src/content/news/*.md` |
| Guides | `src/content/guides/*.md` |
| Membres | `src/data/roster.json` |
| Logo, arrière-plans, images | `public/images/` |
| Races, classes, spécialisations | `src/data/game-data.json` ([sources et statut, en anglais](../GAME-DATA.md)) |

Après chaque modification, vérifiez tout avec `npm run check:config` et `npm run check:content`.

### 1. Configuration

Ouvrez `src/config/site.config.mjs` : chaque champ est commenté (en anglais ; ce guide explique toutes les options en français). Par exemple, pour une guilde de la Horde avec une interface en français :

```js
site: { language: "fr", /* ... */ },
guild: { faction: "horde", preferredRace: "orc", /* ... */ },
appearance: { colorPreset: "orc", fontPreset: "horde-war", /* ... */ },
```

Une valeur erronée ne casse pas le site : elle est remplacée par une valeur valide et `npm run check:config` indique le champ à corriger.

#### Langue

`site.language` traduit l’interface : menus, boutons, libellés, filtres des membres, recherche, dates. Codes disponibles : `en`, `de`, `fr`, `es`, `it`, `pt-BR`, `ru`, `ko`, `zh-CN`, `zh-TW`.

Vos propres contenus (actualités, guides, page « La guilde », textes de la configuration comme la devise, les activités et les catégories de guides) s’affichent exactement tels que vous les écrivez : rédigez-les dans la langue de votre site. Le contenu de démonstration est en anglais.

Pour le coréen et le chinois, le site utilise les polices système du visiteur pour les caractères CJK. Pour le russe, les polices du texte incluent le cyrillique ; les polices décoratives des titres utilisent une police serif du système pour les lettres cyrilliques.

#### Référence de la configuration

**`site`**

| Champ | Par défaut | Description |
| --- | --- | --- |
| `name` | `"My Guild"` | Nom de la guilde (en-tête, titres, pied de page). |
| `shortName` | = `name` | Nom court pour l’en-tête sur mobile. |
| `tagline` | `""` | Devise affichée dans la bannière. |
| `description` | `""` | Méta-description et aperçus sur les réseaux sociaux (160 caractères max. recommandés). |
| `language` | `"en"` | Langue de l’interface (voir ci-dessus). |
| `locale` | celle de la langue | Format des dates, p. ex. `"fr-FR"`. |
| `url` | — | Adresse publique se terminant par `/`. **Obligatoire et valide**, sinon le build s’arrête. Remplacée automatiquement sur GitHub Actions. |
| `logo` | blason de la faction | Chemin dans `public/` ou URL https. Vide = `crest-alliance.svg` / `crest-horde.svg`. |
| `favicon` | `"/favicon.svg"` | Icône de l’onglet. |
| `ogImage` | logo | Image d’aperçu pour les réseaux sociaux (1200×630). |

**`guild`**

| Champ | Par défaut | Description |
| --- | --- | --- |
| `faction` | `"alliance"` | `"alliance"` ou `"horde"` : emblèmes, illustration, blason et palette par défaut. |
| `preferredRace` | `""` | Identifiant d’une race du catalogue de jeu. Ne change pas la faction. |
| `server`, `region`, `founded` | `""` | Affichés sur l’accueil et la page « La guilde » s’ils sont renseignés. |
| `description` | `""` | Courte présentation (bannière et accueil). |
| `ranks` | `["Guild Master","Officer","Member"]` | Rangs du plus élevé au plus bas. La liste des membres doit utiliser ces noms. |
| `recruitment.status` | `"open"` | `"open"`, `"limited"` ou `"closed"`. |
| `recruitment.message` | `""` | Texte de l’encadré de recrutement. |
| `recruitment.wanted` | `[]` | Classes ou rôles recherchés (texte libre). |
| `recruitment.contactUrl` | `""` | Lien pour postuler. Vide = lien Discord ; sinon, les contacts de la page « La guilde ». |
| `activities` | `[]` | `{ title, description, schedule }`. |
| `goals` | `[]` | Liste d’objectifs. |
| `social.discord`, `.website`, `.youtube`, `.twitch` | `""` | Liens https. Vide ou invalide = bouton masqué. |

**`appearance`**

| Champ | Par défaut | Description |
| --- | --- | --- |
| `theme` | `"dark"` | Thème initial : `"dark"`, `"light"` ou `"system"`. Les visiteurs peuvent le changer si `features.themeToggle` est actif. |
| `colorPreset` | faction | `"alliance"`, `"horde"`, `"faction"`, l’identifiant d’une race (`"human"`, `"dwarf"`, `"night-elf"`, `"gnome"`, `"high-order-skyborne"`, `"orc"`, `"undead"`, `"tauren"`, `"troll"`, `"windshaper-skyborne"`) ou `"custom"`. |
| `customColors` | couleurs de la faction | `{ primary, accent, background }` en HEX, utilisées avec `"custom"`. Le contraste est corrigé automatiquement. |
| `fontPreset` | `"alliance-classic"` | `"alliance-classic"`, `"horde-war"`, `"arcane"`, `"medieval"`, `"clean"`. |
| `fontLoading` | `"self-hosted"` | Voir ci-dessous. |
| `backgroundImage` | `""` | Image de la bannière. Vide = illustration intégrée aux couleurs de la palette. |
| `showAnimations` | `true` | Animations légères, toujours désactivées avec `prefers-reduced-motion`. |

**`features`** : `news`, `roster`, `guides`, `recruitment`, `socialLinks`, `themeToggle`, `search`, tous à `true` par défaut. Avec `false`, la section ne génère ni page ni lien.

**Autres :** `news.perPage` (actualités par page d’archive, 1–50, 6 par défaut) · `guides.categories` (`{ id, label }`, l’`id` s’utilise dans le champ `type` des guides) · `footer.links` (liens supplémentaires `{ label, url }`) · `footer.attributionNote` (texte secondaire à côté de l’attribution, qui reste toujours visible).

#### Polices : auto-hébergement ou Google Fonts

| Mode | Fonctionnement | Confidentialité |
| --- | --- | --- |
| `"self-hosted"` | L’[API Fonts d’Astro](https://docs.astro.build/en/guides/fonts/) télécharge **lors du build** uniquement les familles du préréglage depuis Google Fonts et les publie avec le site. Une connexion internet est nécessaire pendant le build. | Aucune requête vers Google de la part des visiteurs. |
| `"google"` | Le navigateur charge les polices depuis `fonts.googleapis.com`. | Google reçoit l’adresse IP du visiteur. |
| `"system"` | Polices système uniquement. | Aucune requête externe. |

Familles utilisées : Cinzel, Cinzel Decorative, Grenze, MedievalSharp, Alegreya, Lora, Inter, Source Sans 3, toutes gratuites sous licence SIL Open Font License.

#### Palettes

Chaque palette de `src/data/palettes.mjs` définit trois couleurs de base. Surfaces, texte, bordures, anneau de focus et thème clair sont calculés par `src/lib/color.mjs` avec des contrastes minimaux (texte 7:1, texte secondaire et liens 4,5:1, focus 3:1). Un test vérifie chaque palette dans les deux thèmes. Pour ajouter une palette, il suffit d’ajouter une entrée : les composants ne changent pas.

### 2. Logo et images

- **Logo :** copiez le fichier dans `public/images/logo/` et définissez `site.logo: "/images/logo/nom-du-fichier.png"`. Vide = blason de démonstration de la faction.
- **Arrière-plan de la bannière :** copiez une image (1600×800 recommandé, WebP ou JPG) dans `public/images/backgrounds/` et définissez `appearance.backgroundImage`. Vide = illustration intégrée aux couleurs de votre palette.
- N’utilisez pas de logos ou d’illustrations de Blizzard sans avoir vérifié vos droits d’utilisation.

### 3. Ajouter une actualité (en moins d’une minute)

Créez `src/content/news/titre-de-l-actualite.md`. Le nom du fichier devient l’adresse de la page : utilisez uniquement des minuscules, des chiffres et des tirets.

```md
---
title: "Titre de l’actualité"
description: "Une phrase qui résume l’actualité."
pubDate: 2026-11-04
author: "Nom"
category: "Annonces"
tags:
  - community
---

Texte de l’actualité en **Markdown**.

## Un sous-titre

- Une liste
- à puces
```

Champs facultatifs : `cover: "/images/news/image.webp"` avec `coverAlt: "description"`, `updatedDate`, `draft: true` (visible uniquement avec `npm run dev`, non publié).

Dans le texte, utilisez les titres `##` et `###` : le titre principal vient déjà du champ `title`.

### 4. Ajouter un guide

Créez `src/content/guides/nom-du-guide.md` :

```md
---
title: "Guide du donjon"
description: "Préparation et stratégie pour le groupe."
pubDate: 2026-11-04
author: "Nom"
type: "dungeon"        # id d’une catégorie de guides.categories
difficulty: "normal"   # facultatif : easy, normal, hard, heroic
featured: false        # true = à la une
tags:
  - dungeon
---

## Préparation
...
```

Le sommaire du guide est généré à partir des titres `##` et `###`. Les **images** vont dans `public/images/guides/` et s’insèrent avec `![Description](/images/guides/carte.webp)`. Pour les **liens internes**, utilisez des chemins relatifs (p. ex. `[Membres](../../roster/)`), qui fonctionnent aussi sur GitHub Pages.

Le contenu de démonstration a `example: true`, qui affiche le badge « Contenu de démonstration ». Supprimez-le ou remplacez-le par le vôtre.

### 5. Liste des membres

Chaque membre dans `src/data/roster.json` :

```json
{
  "id": "aldric",
  "name": "Aldric",
  "race": "Human",
  "class": "Paladin",
  "spec": "Protection",
  "role": "Tank",
  "rank": "Officer",
  "avatar": "/images/roster/aldric.webp",
  "description": "Texte court",
  "profileUrl": "https://...",
  "active": true
}
```

`name`, `race`, `class` et `spec` sont obligatoires, écrits comme dans le catalogue (p. ex. `"Night Elf"` ou `"night-elf"`). Le `role` par défaut découle de la spécialisation ; `rank` doit faire partie de `guild.ranks`. Sans `avatar`, les initiales sont affichées. Une combinaison race/classe invalide produit une erreur indiquant le membre et le champ. Les combinaisons autorisées figurent dans [GAME-DATA.md](../GAME-DATA.md#raceclass-combinations).

Les noms de races, classes et spécialisations sont les noms anglais du jeu, identiques dans toutes les langues du modèle.

## Commandes

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Serveur de développement avec rechargement automatique (affiche aussi les brouillons). |
| `npm run build` | Génère le site statique dans `dist/`. |
| `npm run preview` | Aperçu local du build. |
| `npm run check` | Contrôles Astro et TypeScript. |
| `npm run check:config` | Valide la configuration (`--strict` fait aussi échouer les avertissements). |
| `npm run check:content` | Valide la liste des membres, les actualités, les guides et les schémas du frontmatter. |
| `npm run check:links` | Après le build : liens internes, attribution sur chaque page, aucun identifiant secret. |
| `npm test` | Tests automatisés (contraste des palettes, configuration, membres, catalogue, thèmes, polices, traductions). |
| `npm run verify` | Tout ce qui précède, dans l’ordre. |

Les messages des commandes sont en anglais et indiquent toujours le fichier et le champ à corriger.

## Publier gratuitement sur GitHub Pages

1. Faites un **fork** du dépôt (ou utilisez « Use this template »).
2. Dans **Settings → Pages**, sous **Source**, choisissez **GitHub Actions**.
3. Poussez sur la branche `main` (même en modifiant un fichier depuis le site de GitHub).
4. Le workflow `.github/workflows/deploy.yml` installe les dépendances avec `npm ci`, valide configuration et contenu, exécute contrôles et tests, construit le site, vérifie liens et attribution et **seulement si tout réussit** publie sur `https://<utilisateur>.github.io/<depot>/`.

Aucun secret n’est nécessaire. L’adresse et le chemin de base sont détectés automatiquement : `site.url` ne sert qu’au développement local et aux autres hébergeurs. Les pull requests sont vérifiées mais pas publiées.

### Sans utiliser Git sur votre ordinateur

Tout peut se faire depuis le navigateur :

1. Faites le fork et activez GitHub Pages comme ci-dessus.
2. Ouvrez un fichier (p. ex. `src/config/site.config.mjs`), cliquez sur l’icône crayon, modifiez puis cliquez sur **Commit changes**.
3. Pour une actualité : ouvrez `src/content/news/`, **Add file → Create new file**, collez le modèle ci-dessus et enregistrez.
4. Pour les images : ouvrez `public/images/...`, **Add file → Upload files**.
5. Quelques minutes plus tard, le site est à jour. En cas de problème, l’onglet **Actions** montre l’étape en échec avec le nom du champ à corriger, et le site en ligne reste à la version précédente.

### Autres hébergeurs statiques gratuits

`npm run build` produit un dossier `dist/` de fichiers statiques publiables sur n’importe quel hébergeur statique.

**Cloudflare Pages :** connectez le dépôt et définissez la commande de build `npm run build`, le dossier de sortie `dist`, la variable `NODE_VERSION=24` et la variable `SITE_URL` avec l’adresse finale (p. ex. `https://ma-guilde.pages.dev/`).

**Netlify :** mêmes réglages (commande `npm run build`, dossier `dist`, variable `SITE_URL`).

Sur un domaine racine (p. ex. `https://ma-guilde.fr/`), le chemin de base devient automatiquement `/`.

> Remarque : avec GitHub Pages sur un dépôt de projet (`/<depot>/`), `robots.txt` n’est pas à la racine du domaine et les moteurs de recherche l’ignorent. Le sitemap reste disponible et lié depuis chaque page. Avec un domaine personnalisé, tout fonctionne normalement.

## Limites connues

- **API Blizzard :** non intégrées. Elles nécessitent des identifiants côté serveur et aucun point d’accès documenté pour Forever n’a été trouvé. La liste des membres est manuelle. Détails (en anglais) dans [BLIZZARD-API.md](../BLIZZARD-API.md).
- **Données de jeu :** les noms des spécialisations (talents retravaillés dans Forever) restent à confirmer. Voir [GAME-DATA.md](../GAME-DATA.md).
- **Polices auto-hébergées :** le build a besoin d’une connexion internet pour les télécharger. Hors ligne, utilisez `fontLoading: "system"`.
- **Une langue par site :** l’interface utilise une seule langue à la fois ; les visiteurs n’ont pas de sélecteur de langue.
- **Pas de formulaire de candidature en ligne :** le recrutement renvoie aux contacts configurés.

## Licence et attribution

- **Code :** licence [MIT](../../LICENSE).
- **Attribution obligatoire :** chaque site créé avec le modèle doit conserver, dans le pied de page de toutes les pages, la mention visible « Powered by Azeroth Guild Template » avec un lien vers le dépôt d’origine. Elle ne peut pas être désactivée par la configuration. Il est permis de personnaliser le style et les textes du site et d’ajouter une note à côté de l’attribution ; il est interdit de la supprimer, de la masquer ou de ne l’afficher que sur certaines pages.
- La licence MIT seule n’impose pas d’attribution visible : il s’agit d’une condition d’utilisation demandée par le projet, distincte de la licence du code. Détails dans [ATTRIBUTION.md](../../ATTRIBUTION.md) (en anglais, version de référence).
- **Polices :** SIL Open Font License, via Google Fonts.
- **Ressources :** blasons, illustrations et icônes sont originaux.
- World of Warcraft est une marque de Blizzard Entertainment, Inc.

Envie de contribuer ? Lisez [CONTRIBUTING.md](../../CONTRIBUTING.md) (en anglais).
