# Azeroth Guild Template

[English](../../README.md) · **Deutsch** · [Français](../fr/README.md) · [Español](../es/README.md) · [Italiano](../it/README.md) · [Português (Brasil)](../pt-BR/README.md) · [Русский](../ru/README.md) · [한국어](../ko/README.md) · [简体中文](../zh-CN/README.md) · [繁體中文](../zh-TW/README.md)

Eine **kostenlose, statische** Website-Vorlage für Gilden in **World of Warcraft: Forever**. Forke das Repository, passe eine Konfigurationsdatei an, schreibe Neuigkeiten und Guides in Markdown und veröffentliche alles kostenlos auf GitHub Pages.

Gebaut mit [Astro](https://astro.build), [Tailwind CSS 4](https://tailwindcss.com) und reinem JavaScript. Kein Backend, keine Datenbank, keine kostenpflichtigen Dienste.

> Community-Projekt, nicht mit Blizzard Entertainment verbunden oder von Blizzard unterstützt.

## Funktionen

- **Allianz-/Horde-Identität:** Embleme, Hero-Illustration, Wappen und Farbpalette wechseln mit der Fraktion.
- **10 Sprachen für die Oberfläche** – die Sprachen, in die World of Warcraft übersetzt ist: English, Deutsch, Français, Español, Italiano, Português (Brasil), Русский, 한국어, 简体中文, 繁體中文.
- **12 Paletten** (2 Fraktions- und 10 an die Völker von Forever angelehnte Paletten) oder eigene HEX-Farben, mit automatisch geprüftem Kontrast im hellen und dunklen Design.
- **5 kostenlose Schrift-Presets** (Google Fonts, OFL-Lizenz), die beim Build heruntergeladen werden: Besucher senden keine Anfragen an Google.
- **Startseite** mit Hero, Vorstellung, Rekrutierung, Aktivitäten, neuesten Beiträgen, Mitgliedern und Guides.
- **Seite „Die Gilde“** mit Geschichte, Werten, Organisation, Voraussetzungen, Rekrutierungsstatus und Kontakten.
- **Neuigkeiten in Markdown** mit Kategorien, Schlagwörtern, Titelbildern, Entwürfen, Seitennavigation und ähnlichen Beiträgen.
- **Guides in Markdown** mit Kategorien, empfohlenen Guides, automatischem Inhaltsverzeichnis, Schlagwörtern und ähnlichen Guides.
- **Mitgliederliste** aus einer JSON-Datei mit Suche, Filtern (Volk, Klasse, Spezialisierung, Rolle, Rang, Status) und Sortierung.
- **Suche** in Neuigkeiten und Guides, vollständig im Browser.
- **Helles/dunkles Design**, barrierearmes Mobilmenü, Tastaturbedienung, funktioniert ohne JavaScript.
- **SEO:** kanonische URLs, Open Graph, Sitemap, robots.txt, korrekter Basispfad auf GitHub Pages.
- **Automatische Prüfungen** für Konfiguration, Inhalte, Links und Namensnennung sowie automatisierte Tests.

## Schnellstart

Voraussetzungen: [Node.js](https://nodejs.org) 22.23 oder neuer (empfohlen: 24) und Git.

```bash
git clone https://github.com/<dein-benutzer>/<dein-repository>.git
cd <dein-repository>
npm ci
npm run dev
```

Öffne die im Terminal angezeigte Adresse (meist `http://localhost:4321/<repository-name>/`).

## Die Website anpassen

| Was | Wo |
| --- | --- |
| Name, Fraktion, Sprache, Farben, Schriften, Bereiche, soziale Netzwerke | `src/config/site.config.mjs` |
| Text der Seite „Die Gilde“ | `src/content/pages/about.md` |
| Neuigkeiten | `src/content/news/*.md` |
| Guides | `src/content/guides/*.md` |
| Mitglieder | `src/data/roster.json` |
| Logo, Hintergründe, Bilder | `public/images/` |
| Völker, Klassen, Spezialisierungen | `src/data/game-data.json` ([Quellen und Status, auf Englisch](../GAME-DATA.md)) |

Nach jeder Änderung kannst du alles mit `npm run check:config` und `npm run check:content` prüfen.

### 1. Konfiguration

Öffne `src/config/site.config.mjs`: Jedes Feld ist kommentiert (auf Englisch; diese Anleitung erklärt alle Optionen auf Deutsch). Beispiel für eine Hordengilde mit deutscher Oberfläche:

```js
site: { language: "de", /* ... */ },
guild: { faction: "horde", preferredRace: "orc", /* ... */ },
appearance: { colorPreset: "orc", fontPreset: "horde-war", /* ... */ },
```

Falsche Werte machen die Website nicht kaputt: Sie werden durch einen gültigen Wert ersetzt, und `npm run check:config` nennt das zu korrigierende Feld.

#### Sprache

`site.language` übersetzt die Oberfläche: Menüs, Schaltflächen, Beschriftungen, Mitgliederfilter, Suche, Datumsangaben. Verfügbare Codes: `en`, `de`, `fr`, `es`, `it`, `pt-BR`, `ru`, `ko`, `zh-CN`, `zh-TW`.

Deine eigenen Inhalte (Neuigkeiten, Guides, Seite „Die Gilde“, Texte in der Konfiguration wie Motto, Aktivitäten und Guide-Kategorien) werden genau so angezeigt, wie du sie schreibst: Schreibe sie in der Sprache deiner Website. Die Beispielinhalte sind auf Englisch.

Für Koreanisch und Chinesisch verwendet die Website die Systemschriften des Besuchers für CJK-Zeichen. Für Russisch enthalten die Fließtextschriften kyrillische Zeichen; die dekorativen Überschriftenschriften greifen für kyrillische Buchstaben auf eine Serifenschrift des Systems zurück.

#### Referenz der Konfiguration

**`site`**

| Feld | Standard | Beschreibung |
| --- | --- | --- |
| `name` | `"My Guild"` | Name der Gilde (Kopfzeile, Titel, Fußzeile). |
| `shortName` | = `name` | Kurzname für die Kopfzeile auf Smartphones. |
| `tagline` | `""` | Motto im Hero-Bereich. |
| `description` | `""` | Meta-Beschreibung und Vorschau in sozialen Netzwerken (max. ca. 160 Zeichen empfohlen). |
| `language` | `"en"` | Sprache der Oberfläche (siehe oben). |
| `locale` | Standard der Sprache | Datumsformat, z. B. `"de-DE"`. |
| `url` | — | Öffentliche Adresse mit abschließendem `/`. **Pflichtfeld und muss gültig sein**, sonst bricht der Build ab. Wird auf GitHub Actions automatisch überschrieben. |
| `logo` | Fraktionswappen | Pfad in `public/` oder https-URL. Leer = `crest-alliance.svg` / `crest-horde.svg`. |
| `favicon` | `"/favicon.svg"` | Symbol im Browser-Tab. |
| `ogImage` | Logo | Vorschaubild für soziale Netzwerke (1200×630). |

**`guild`**

| Feld | Standard | Beschreibung |
| --- | --- | --- |
| `faction` | `"alliance"` | `"alliance"` oder `"horde"`: Embleme, Hero-Illustration, Wappen und Standardpalette. |
| `preferredRace` | `""` | ID eines Volkes aus dem Spielkatalog. Ändert die Fraktion nicht. |
| `server`, `region`, `founded` | `""` | Werden auf der Startseite und der Seite „Die Gilde“ angezeigt, wenn ausgefüllt. |
| `description` | `""` | Kurze Vorstellung (Hero und Startseite). |
| `ranks` | `["Guild Master","Officer","Member"]` | Ränge vom höchsten zum niedrigsten. Die Mitgliederliste muss diese Namen verwenden. |
| `recruitment.status` | `"open"` | `"open"`, `"limited"` oder `"closed"`. |
| `recruitment.message` | `""` | Text der Rekrutierungsbox. |
| `recruitment.wanted` | `[]` | Gesuchte Klassen oder Rollen (freier Text). |
| `recruitment.contactUrl` | `""` | Link für Bewerbungen. Leer = Discord-Link; ohne Discord die Kontakte auf der Seite „Die Gilde“. |
| `activities` | `[]` | `{ title, description, schedule }`. |
| `goals` | `[]` | Liste der Ziele. |
| `social.discord`, `.website`, `.youtube`, `.twitch` | `""` | https-Links. Leer oder ungültig = Schaltfläche ausgeblendet. |

**`appearance`**

| Feld | Standard | Beschreibung |
| --- | --- | --- |
| `theme` | `"dark"` | Anfangsdesign: `"dark"`, `"light"` oder `"system"`. Besucher können es umschalten, wenn `features.themeToggle` aktiv ist. |
| `colorPreset` | Fraktion | `"alliance"`, `"horde"`, `"faction"`, die ID eines Volkes (`"human"`, `"dwarf"`, `"night-elf"`, `"gnome"`, `"high-order-skyborne"`, `"orc"`, `"undead"`, `"tauren"`, `"troll"`, `"windshaper-skyborne"`) oder `"custom"`. |
| `customColors` | Fraktionsfarben | `{ primary, accent, background }` als HEX, verwendet mit `"custom"`. Der Kontrast wird automatisch korrigiert. |
| `fontPreset` | `"alliance-classic"` | `"alliance-classic"`, `"horde-war"`, `"arcane"`, `"medieval"`, `"clean"`. |
| `fontLoading` | `"self-hosted"` | Siehe unten. |
| `backgroundImage` | `""` | Hero-Bild. Leer = integrierte Illustration in den Farben der Palette. |
| `showAnimations` | `true` | Dezente Animationen, bei `prefers-reduced-motion` immer deaktiviert. |

**`features`**: `news`, `roster`, `guides`, `recruitment`, `socialLinks`, `themeToggle`, `search` – standardmäßig alle `true`. Mit `false` erzeugt der Bereich weder Seiten noch Links.

**Weitere Optionen:** `news.perPage` (Neuigkeiten pro Archivseite, 1–50, Standard 6) · `guides.categories` (`{ id, label }`; die `id` wird im Feld `type` der Guides verwendet) · `footer.links` (zusätzliche Links `{ label, url }`) · `footer.attributionNote` (Zusatztext neben der Namensnennung, die immer sichtbar bleibt).

#### Schriften: Self-Hosting oder Google Fonts

| Modus | Funktionsweise | Datenschutz |
| --- | --- | --- |
| `"self-hosted"` | Die [Fonts-API von Astro](https://docs.astro.build/en/guides/fonts/) lädt **beim Build** nur die Schriftfamilien des Presets von Google Fonts herunter und veröffentlicht sie mit der Website. Während des Builds wird eine Internetverbindung benötigt. | Besucher senden keine Anfragen an Google. |
| `"google"` | Der Browser lädt die Schriften von `fonts.googleapis.com`. | Google erhält die IP-Adresse des Besuchers. |
| `"system"` | Nur Systemschriften. | Keine externen Anfragen. |

Verwendete Familien: Cinzel, Cinzel Decorative, Grenze, MedievalSharp, Alegreya, Lora, Inter, Source Sans 3 – alle kostenlos unter der SIL Open Font License.

#### Paletten

Jede Palette in `src/data/palettes.mjs` legt drei Grundfarben fest. Flächen, Text, Rahmen, Fokusrahmen und das helle Design berechnet `src/lib/color.mjs` mit Mindestkontrasten (Text 7:1, Sekundärtext und Links 4,5:1, Fokus 3:1). Ein Test prüft jede Palette in beiden Designs. Für eine neue Palette genügt ein neuer Eintrag – die Komponenten bleiben unverändert.

### 2. Logo und Bilder

- **Logo:** Kopiere die Datei nach `public/images/logo/` und setze `site.logo: "/images/logo/dateiname.png"`. Leer = Beispielwappen der Fraktion.
- **Hero-Hintergrund:** Kopiere ein Bild (empfohlen 1600×800, WebP oder JPG) nach `public/images/backgrounds/` und setze `appearance.backgroundImage`. Leer = integrierte Illustration in den Farben deiner Palette.
- Verwende keine Logos oder Artworks von Blizzard, ohne die Nutzungsrechte geprüft zu haben.

### 3. Eine Neuigkeit hinzufügen (in unter einer Minute)

Erstelle `src/content/news/titel-der-neuigkeit.md`. Der Dateiname wird zur Adresse der Seite: Verwende nur Kleinbuchstaben, Ziffern und Bindestriche.

```md
---
title: "Titel der Neuigkeit"
description: "Ein Satz, der die Neuigkeit zusammenfasst."
pubDate: 2026-11-04
author: "Name"
category: "Ankündigungen"
tags:
  - community
---

Text der Neuigkeit in **Markdown**.

## Eine Zwischenüberschrift

- Eine
- Aufzählung
```

Optionale Felder: `cover: "/images/news/bild.webp"` mit `coverAlt: "Beschreibung"`, `updatedDate`, `draft: true` (nur in `npm run dev` sichtbar, wird nicht veröffentlicht).

Verwende im Text Überschriften mit `##` und `###`: Der Haupttitel kommt bereits aus `title`.

### 4. Einen Guide hinzufügen

Erstelle `src/content/guides/name-des-guides.md`:

```md
---
title: "Dungeon-Guide"
description: "Vorbereitung und Strategie für die Gruppe."
pubDate: 2026-11-04
author: "Name"
type: "dungeon"        # ID einer Kategorie in guides.categories
difficulty: "normal"   # optional: easy, normal, hard, heroic
featured: false        # true = empfohlen
tags:
  - dungeon
---

## Vorbereitung
...
```

Das Inhaltsverzeichnis entsteht aus den Überschriften `##` und `###`. **Bilder** gehören nach `public/images/guides/` und werden mit `![Beschreibung](/images/guides/karte.webp)` eingefügt. Für **interne Links** verwende relative Pfade (z. B. `[Mitglieder](../../roster/)`), die auch auf GitHub Pages funktionieren.

Beispielinhalte haben `example: true`, was das Abzeichen „Beispielinhalt“ anzeigt. Lösche sie oder ersetze sie durch eigene Inhalte.

### 5. Mitgliederliste

Jedes Mitglied in `src/data/roster.json`:

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
  "description": "Kurzer Text",
  "profileUrl": "https://...",
  "active": true
}
```

Pflichtfelder sind `name`, `race`, `class` und `spec`, geschrieben wie im Katalog (z. B. `"Night Elf"` oder `"night-elf"`). Die Standardrolle (`role`) ergibt sich aus der Spezialisierung; `rank` muss einer der `guild.ranks` sein. Ohne `avatar` werden Initialen angezeigt. Ungültige Volk-/Klassenkombinationen erzeugen einen Fehler, der Mitglied und Feld nennt. Die erlaubten Kombinationen stehen in [GAME-DATA.md](../GAME-DATA.md#raceclass-combinations).

Die Namen von Völkern, Klassen und Spezialisierungen sind die englischen Spielnamen und in allen Sprachen der Vorlage gleich.

## Befehle

| Befehl | Funktion |
| --- | --- |
| `npm run dev` | Entwicklungsserver mit automatischer Aktualisierung (zeigt auch Entwürfe). |
| `npm run build` | Erzeugt die statische Website in `dist/`. |
| `npm run preview` | Lokale Vorschau des Builds. |
| `npm run check` | Prüfungen von Astro und TypeScript. |
| `npm run check:config` | Prüft die Konfiguration (`--strict` lässt auch Warnungen fehlschlagen). |
| `npm run check:content` | Prüft Mitgliederliste, Neuigkeiten, Guides und Frontmatter-Schemas. |
| `npm run check:links` | Nach dem Build: interne Links, Namensnennung auf jeder Seite, keine Zugangsdaten. |
| `npm test` | Automatisierte Tests (Palettenkontrast, Konfiguration, Mitglieder, Katalog, Designs, Schriften, Übersetzungen). |
| `npm run verify` | Alles oben Genannte nacheinander. |

Die Meldungen der Befehle sind auf Englisch und nennen immer Datei und Feld, die korrigiert werden müssen.

## Kostenlos auf GitHub Pages veröffentlichen

1. **Forke** das Repository (oder nutze „Use this template“).
2. Wähle unter **Settings → Pages** bei **Source** die Option **GitHub Actions**.
3. Pushe auf den Branch `main` (auch durch Bearbeiten einer Datei auf der GitHub-Website).
4. Der Workflow `.github/workflows/deploy.yml` installiert die Abhängigkeiten mit `npm ci`, prüft Konfiguration und Inhalte, führt Prüfungen und Tests aus, baut die Website, kontrolliert Links und Namensnennung und veröffentlicht **nur wenn alles erfolgreich ist** unter `https://<benutzer>.github.io/<repository>/`.

Es werden keine Secrets benötigt. Adresse und Basispfad werden automatisch erkannt: `site.url` dient nur der lokalen Entwicklung und anderen Hostern. Pull Requests werden geprüft, aber nicht veröffentlicht.

### Ohne Git auf dem eigenen Computer

Alles lässt sich im Browser erledigen:

1. Forke das Repository und aktiviere GitHub Pages wie oben beschrieben.
2. Öffne eine Datei (z. B. `src/config/site.config.mjs`), klicke auf das Stiftsymbol, bearbeite sie und klicke auf **Commit changes**.
3. Für eine Neuigkeit: Öffne `src/content/news/`, wähle **Add file → Create new file**, füge die Vorlage von oben ein und speichere.
4. Für Bilder: Öffne `public/images/...` und wähle **Add file → Upload files**.
5. Nach wenigen Minuten ist die Website aktualisiert. Wenn etwas nicht stimmt, zeigt der Tab **Actions** den fehlgeschlagenen Schritt mit dem zu korrigierenden Feld, und die Website bleibt auf dem vorherigen Stand.

### Andere kostenlose statische Hoster

`npm run build` erzeugt einen Ordner `dist/` mit statischen Dateien, den jeder statische Hoster ausliefern kann.

**Cloudflare Pages:** Verbinde das Repository und setze den Build-Befehl `npm run build`, den Ausgabeordner `dist`, die Variable `NODE_VERSION=24` und die Variable `SITE_URL` mit der endgültigen Adresse (z. B. `https://meine-gilde.pages.dev/`).

**Netlify:** gleiche Einstellungen (Befehl `npm run build`, Ordner `dist`, Variable `SITE_URL`).

Auf einer eigenen Hauptdomain (z. B. `https://meine-gilde.de/`) wird der Basispfad automatisch zu `/`.

> Hinweis: Bei GitHub Pages in einem Projekt-Repository (`/<repository>/`) liegt `robots.txt` nicht im Stammverzeichnis der Domain und wird von Suchmaschinen ignoriert. Die Sitemap bleibt verfügbar und ist auf jeder Seite verlinkt. Mit einer eigenen Domain funktioniert es normal.

## Bekannte Einschränkungen

- **Blizzard-APIs:** nicht integriert. Sie benötigen serverseitige Zugangsdaten, und es wurden keine dokumentierten Endpunkte für Forever gefunden. Die Mitgliederliste wird manuell gepflegt. Details (auf Englisch) in [BLIZZARD-API.md](../BLIZZARD-API.md).
- **Spieldaten:** Die Namen der Spezialisierungen (Talente in Forever überarbeitet) müssen noch bestätigt werden. Siehe [GAME-DATA.md](../GAME-DATA.md).
- **Selbst gehostete Schriften:** Der Build benötigt eine Internetverbindung zum Herunterladen. Offline `fontLoading: "system"` verwenden.
- **Eine Sprache pro Website:** Die Oberfläche nutzt jeweils eine Sprache; Besucher haben keine Sprachauswahl.
- **Kein Online-Bewerbungsformular:** Die Rekrutierung verweist auf die konfigurierten Kontakte.

## Lizenz und Namensnennung

- **Code:** [MIT](../../LICENSE)-Lizenz.
- **Pflicht zur Namensnennung:** Jede mit der Vorlage erstellte Website muss in der Fußzeile jeder Seite den sichtbaren Hinweis „Powered by Azeroth Guild Template“ mit Link zum Original-Repository behalten. Er lässt sich nicht über die Konfiguration abschalten. Erlaubt ist, Stil und Texte der Website anzupassen und eine Notiz neben der Namensnennung hinzuzufügen; nicht erlaubt ist, sie zu entfernen, zu verstecken oder nur auf einigen Seiten anzuzeigen.
- Die MIT-Lizenz allein verlangt keine sichtbare Namensnennung: Dies ist eine vom Projekt gewünschte Nutzungsbedingung, getrennt von der Code-Lizenz. Details in [ATTRIBUTION.md](../../ATTRIBUTION.md) (Englisch, maßgebliche Fassung).
- **Schriften:** SIL Open Font License, über Google Fonts.
- **Assets:** Wappen, Illustrationen und Symbole sind Eigenentwicklungen des Projekts.
- World of Warcraft ist eine Marke von Blizzard Entertainment, Inc.

Möchtest du mitwirken? Lies [CONTRIBUTING.md](../../CONTRIBUTING.md) (auf Englisch).
