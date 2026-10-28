# Azeroth Guild Template

[English](../../README.md) · [Deutsch](../de/README.md) · [Français](../fr/README.md) · [Español](../es/README.md) · **Italiano** · [Português (Brasil)](../pt-BR/README.md) · [Русский](../ru/README.md) · [한국어](../ko/README.md) · [简体中文](../zh-CN/README.md) · [繁體中文](../zh-TW/README.md)

Template **gratuito e statico** per i siti delle gilde di **World of Warcraft: Forever**. Fai un fork, modifica un file di configurazione, scrivi notizie e guide in Markdown e pubblica gratis su GitHub Pages.

Realizzato con [Astro](https://astro.build), [Tailwind CSS 4](https://tailwindcss.com) e JavaScript vanilla. Nessun backend, database o servizio a pagamento.

> Progetto della community, non affiliato né approvato da Blizzard Entertainment.

## Funzionalità

- **Identità Alliance / Horde:** emblemi, illustrazione della hero, stemma e palette cambiano con la fazione.
- **10 lingue per l'interfaccia**, quelle in cui è tradotto World of Warcraft: English, Deutsch, Français, Español, Italiano, Português (Brasil), Русский, 한국어, 简体中文, 繁體中文.
- **12 palette** (2 di fazione + 10 ispirate alle razze di Forever) oppure colori HEX personalizzati, con contrasto verificato automaticamente nei temi chiaro e scuro.
- **5 preset tipografici** gratuiti (Google Fonts, licenza OFL), scaricati in fase di build: i visitatori non fanno richieste a Google.
- **Homepage** con hero, presentazione, reclutamento, attività, ultime notizie, roster e guide.
- **Pagina "La gilda"** con storia, valori, organizzazione, requisiti, stato del reclutamento e contatti.
- **Notizie in Markdown** con categorie, tag, copertine, bozze, paginazione e articoli correlati.
- **Guide in Markdown** con categorie, guide in evidenza, indice automatico, tag e guide correlate.
- **Roster** da file JSON con ricerca, filtri (razza, classe, specializzazione, ruolo, grado, stato) e ordinamento.
- **Ricerca** tra notizie e guide, interamente nel browser.
- **Tema chiaro/scuro**, menu mobile accessibile, navigazione da tastiera, funziona senza JavaScript.
- **SEO:** URL canonici, Open Graph, sitemap, robots.txt, base path corretto su GitHub Pages.
- **Controlli automatici** su configurazione, contenuti, link e attribuzione, più test automatici.

## Avvio rapido

Requisiti: [Node.js](https://nodejs.org) 22.23 o superiore (consigliato 24) e Git.

```bash
git clone https://github.com/<tuo-utente>/<tuo-repository>.git
cd <tuo-repository>
npm ci
npm run dev
```

Apri l'indirizzo mostrato nel terminale (di solito `http://localhost:4321/<nome-repository>/`).

## Personalizzare il sito

| Cosa | Dove |
| --- | --- |
| Nome, fazione, lingua, colori, font, sezioni, social | `src/config/site.config.mjs` |
| Testo della pagina "La gilda" | `src/content/pages/about.md` |
| Notizie | `src/content/news/*.md` |
| Guide | `src/content/guides/*.md` |
| Membri del roster | `src/data/roster.json` |
| Logo, sfondi, immagini | `public/images/` |
| Razze, classi, specializzazioni | `src/data/game-data.json` ([fonti e stato, in inglese](../GAME-DATA.md)) |

Dopo ogni modifica puoi verificare tutto con `npm run check:config` e `npm run check:content`.

### 1. Configurazione

Apri `src/config/site.config.mjs`: ogni campo è commentato (in inglese; questa guida spiega tutte le opzioni in italiano). Ad esempio, per una gilda dell'Orda con interfaccia in tedesco:

```js
site: { language: "de", /* ... */ },
guild: { faction: "horde", preferredRace: "orc", /* ... */ },
appearance: { colorPreset: "orc", fontPreset: "horde-war", /* ... */ },
```

Valori errati non bloccano il sito: vengono sostituiti da un valore valido e `npm run check:config` indica il campo da correggere.

#### Lingua

`site.language` traduce l'interfaccia: menu, pulsanti, etichette, filtri del roster, ricerca, date. Codici disponibili: `en`, `de`, `fr`, `es`, `it`, `pt-BR`, `ru`, `ko`, `zh-CN`, `zh-TW`.

I tuoi contenuti (notizie, guide, pagina "La gilda", testi della configurazione come slogan, attività ed etichette delle categorie delle guide) vengono mostrati esattamente come li scrivi: scrivili nella lingua del sito. I contenuti dimostrativi sono in inglese.

Per coreano e cinese il sito usa i font di sistema del visitatore per i caratteri CJK. Per il russo i font del testo includono il cirillico, mentre i font decorativi dei titoli usano un font serif di sistema per le lettere cirilliche.

#### Riferimento della configurazione

**`site`**

| Campo | Predefinito | Descrizione |
| --- | --- | --- |
| `name` | `"My Guild"` | Nome della gilda (header, titoli, footer). |
| `shortName` | = `name` | Nome breve per l'header su smartphone. |
| `tagline` | `""` | Slogan nella hero. |
| `description` | `""` | Meta description e anteprime social (consigliati massimo 160 caratteri). |
| `language` | `"en"` | Lingua dell'interfaccia (vedi sopra). |
| `locale` | quello della lingua | Formato delle date, es. `"it-IT"`. |
| `url` | — | Indirizzo pubblico con la barra finale. **Obbligatorio e valido**, altrimenti la build si ferma. Su GitHub Actions viene sovrascritto automaticamente. |
| `logo` | stemma della fazione | Percorso in `public/` o URL https. Vuoto = `crest-alliance.svg` / `crest-horde.svg`. |
| `favicon` | `"/favicon.svg"` | Icona del browser. |
| `ogImage` | logo | Immagine delle anteprime social (1200×630). |

**`guild`**

| Campo | Predefinito | Descrizione |
| --- | --- | --- |
| `faction` | `"alliance"` | `"alliance"` o `"horde"`: emblemi, illustrazione della hero, stemma e palette predefinita. |
| `preferredRace` | `""` | Id di una razza del catalogo di gioco. Non cambia la fazione. |
| `server`, `region`, `founded` | `""` | Mostrati in homepage e nella pagina "La gilda" se compilati. |
| `description` | `""` | Presentazione breve (hero e homepage). |
| `ranks` | `["Guild Master","Officer","Member"]` | Gradi dal più alto al più basso. Il roster deve usare questi nomi. |
| `recruitment.status` | `"open"` | `"open"`, `"limited"` o `"closed"`. |
| `recruitment.message` | `""` | Testo del box reclutamento. |
| `recruitment.wanted` | `[]` | Classi o ruoli ricercati (testo libero). |
| `recruitment.contactUrl` | `""` | Link per candidarsi. Vuoto = link Discord; se manca anche quello, i contatti della pagina "La gilda". |
| `activities` | `[]` | `{ title, description, schedule }`. |
| `goals` | `[]` | Elenco di obiettivi. |
| `social.discord`, `.website`, `.youtube`, `.twitch` | `""` | Link https. Vuoti o non validi = pulsante nascosto. |

**`appearance`**

| Campo | Predefinito | Descrizione |
| --- | --- | --- |
| `theme` | `"dark"` | Tema iniziale: `"dark"`, `"light"` o `"system"`. I visitatori possono cambiarlo se `features.themeToggle` è attivo. |
| `colorPreset` | fazione | `"alliance"`, `"horde"`, `"faction"`, l'id di una razza (`"human"`, `"dwarf"`, `"night-elf"`, `"gnome"`, `"high-order-skyborne"`, `"orc"`, `"undead"`, `"tauren"`, `"troll"`, `"windshaper-skyborne"`) oppure `"custom"`. |
| `customColors` | colori della fazione | `{ primary, accent, background }` in HEX, usati con `"custom"`. Il contrasto viene corretto automaticamente. |
| `fontPreset` | `"alliance-classic"` | `"alliance-classic"`, `"horde-war"`, `"arcane"`, `"medieval"`, `"clean"`. |
| `fontLoading` | `"self-hosted"` | Vedi sotto. |
| `backgroundImage` | `""` | Immagine della hero. Vuoto = illustrazione integrata colorata con la palette. |
| `showAnimations` | `true` | Animazioni leggere, sempre disattivate con `prefers-reduced-motion`. |

**`features`**: `news`, `roster`, `guides`, `recruitment`, `socialLinks`, `themeToggle`, `search`, tutti `true` di default. Con `false` la sezione non genera né pagine né link.

**Altro:** `news.perPage` (notizie per pagina nell'archivio, 1–50, predefinito 6) · `guides.categories` (`{ id, label }`, l'`id` si usa nel campo `type` delle guide) · `footer.links` (link aggiuntivi `{ label, url }`) · `footer.attributionNote` (testo secondario accanto all'attribuzione, che resta comunque visibile).

#### Font: self-hosting o Google Fonts

| Modalità | Come funziona | Privacy |
| --- | --- | --- |
| `"self-hosted"` | La [Fonts API di Astro](https://docs.astro.build/en/guides/fonts/) scarica da Google Fonts **durante la build** solo le famiglie del preset e le pubblica con il sito. Serve una connessione internet durante la build. | Nessuna richiesta a Google dai visitatori. |
| `"google"` | Il browser carica i font da `fonts.googleapis.com`. | Google riceve l'indirizzo IP del visitatore. |
| `"system"` | Solo font di sistema. | Nessuna richiesta esterna. |

Famiglie usate: Cinzel, Cinzel Decorative, Grenze, MedievalSharp, Alegreya, Lora, Inter, Source Sans 3, tutte gratuite con licenza SIL Open Font License.

#### Palette

Ogni palette in `src/data/palettes.mjs` definisce tre colori di base. Superfici, testo, bordi, anello di focus e tema chiaro vengono calcolati da `src/lib/color.mjs` con rapporti di contrasto minimi (testo 7:1, testo secondario e link 4.5:1, focus 3:1). Un test controlla ogni palette in entrambi i temi. Per aggiungere una palette basta aggiungere una voce: i componenti non vanno modificati.

### 2. Logo e immagini

- **Logo:** copia il file in `public/images/logo/` e imposta `site.logo: "/images/logo/nome-file.png"`. Vuoto = stemma dimostrativo della fazione.
- **Sfondo della hero:** copia un'immagine (consigliati 1600×800, WebP o JPG) in `public/images/backgrounds/` e imposta `appearance.backgroundImage`. Vuoto = illustrazione integrata, colorata con la tua palette.
- Non usare loghi o illustrazioni di Blizzard senza averne verificato i diritti d'uso.

### 3. Aggiungere una notizia (meno di un minuto)

Crea `src/content/news/titolo-della-notizia.md`. Il nome del file diventa l'indirizzo della pagina: usa solo minuscole, numeri e trattini.

```md
---
title: "Titolo della notizia"
description: "Una frase che riassume la notizia."
pubDate: 2026-11-04
author: "Nome"
category: "Annunci"
tags:
  - community
---

Testo della notizia in **Markdown**.

## Un sottotitolo

- Un elenco
- puntato
```

Campi facoltativi: `cover: "/images/news/immagine.webp"` con `coverAlt: "descrizione"`, `updatedDate`, `draft: true` (visibile solo in `npm run dev`, non pubblicata).

Nel testo usa titoli `##` e `###`: il titolo principale arriva già dal campo `title`.

### 4. Aggiungere una guida

Crea `src/content/guides/nome-guida.md`:

```md
---
title: "Guida al dungeon"
description: "Preparazione e strategie per il gruppo."
pubDate: 2026-11-04
author: "Nome"
type: "dungeon"        # id di una categoria in guides.categories
difficulty: "normal"   # facoltativo: easy, normal, hard, heroic
featured: false        # true = in evidenza
tags:
  - dungeon
---

## Preparazione
...
```

L'indice della guida viene generato dai titoli `##` e `###`. Le **immagini** vanno in `public/images/guides/` e si inseriscono con `![Descrizione](/images/guides/mappa.webp)`. Per i **link interni** usa percorsi relativi (es. `[Roster](../../roster/)`), che funzionano anche su GitHub Pages.

I contenuti dimostrativi hanno `example: true`, che mostra il badge "Contenuto dimostrativo". Eliminali o sostituiscili con i tuoi.

### 5. Roster

Ogni membro in `src/data/roster.json`:

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
  "description": "Testo breve",
  "profileUrl": "https://...",
  "active": true
}
```

Sono obbligatori `name`, `race`, `class` e `spec`, scritti come nel catalogo (es. `"Night Elf"` o `"night-elf"`). Il `role` predefinito deriva dalla specializzazione; imposta `role` solo per scegliere un altro ruolo che quella specializzazione può coprire (es. un Druido Feral come DPS, un Cacciatore Survival o uno Sciamano Enhancement come off-tank). Il `rank` deve essere uno dei `guild.ranks`. Senza `avatar` vengono mostrate le iniziali. Combinazioni razza/classe non valide producono un errore che indica il membro e il campo. Le combinazioni ammesse sono in [GAME-DATA.md](../GAME-DATA.md#raceclass-combinations).

I nomi di razze, classi e specializzazioni sono quelli inglesi del gioco, uguali in tutte le lingue del template.

## Comandi

| Comando | Cosa fa |
| --- | --- |
| `npm run dev` | Server di sviluppo con aggiornamento automatico (mostra anche le bozze). |
| `npm run build` | Genera il sito statico in `dist/`. |
| `npm run preview` | Anteprima locale della build. |
| `npm run check` | Controlli di Astro e TypeScript. |
| `npm run check:config` | Valida la configurazione (`--strict` fa fallire anche gli avvisi). |
| `npm run check:content` | Valida roster, notizie, guide e schemi del frontmatter. |
| `npm run check:links` | Dopo la build: link interni, attribuzione su ogni pagina, nessuna credenziale. |
| `npm test` | Test automatici (contrasto delle palette, configurazione, roster, catalogo, temi, font, traduzioni). |
| `npm run verify` | Tutto quanto sopra, in sequenza. |

I messaggi dei comandi sono in inglese e indicano sempre il file e il campo da correggere.

## Pubblicare gratis su GitHub Pages

1. Fai un **fork** del repository (o usa "Use this template").
2. In **Settings → Pages**, alla voce **Source** scegli **GitHub Actions**.
3. Fai un push sul branch `main` (anche modificando un file dal sito di GitHub).
4. Il workflow `.github/workflows/deploy.yml` installa le dipendenze con `npm ci`, valida configurazione e contenuti, esegue controlli e test, compila il sito, verifica link e attribuzione e **solo se tutto è corretto** pubblica su `https://<utente>.github.io/<repository>/`.

Non servono segreti. Indirizzo e base path vengono rilevati automaticamente: `site.url` serve solo per lo sviluppo locale e gli altri hosting. Le pull request vengono verificate ma non pubblicate.

### Senza usare Git dal computer

Puoi fare tutto dal browser:

1. Fai il fork e attiva GitHub Pages come sopra.
2. Apri un file (es. `src/config/site.config.mjs`), clicca sull'icona della matita, modifica e premi **Commit changes**.
3. Per una notizia: entra in `src/content/news/`, **Add file → Create new file**, incolla il modello qui sopra e salva.
4. Per le immagini: entra in `public/images/...`, **Add file → Upload files**.
5. Dopo un paio di minuti il sito è aggiornato. Se qualcosa non va, la scheda **Actions** mostra il passaggio fallito con il nome del campo da correggere, e il sito online resta alla versione precedente.

### Altri hosting statici gratuiti

`npm run build` produce una cartella `dist/` di file statici pubblicabile su qualsiasi hosting statico.

**Cloudflare Pages:** collega il repository e imposta comando di build `npm run build`, cartella di output `dist`, variabile `NODE_VERSION=24` e variabile `SITE_URL` con l'indirizzo finale (es. `https://mia-gilda.pages.dev/`).

**Netlify:** stesse impostazioni (comando `npm run build`, cartella `dist`, variabile `SITE_URL`).

Su un dominio principale (es. `https://mia-gilda.it/`) il base path diventa automaticamente `/`.

> Nota: con GitHub Pages su un repository di progetto (`/<repository>/`) il file `robots.txt` non si trova alla radice del dominio e i motori di ricerca lo ignorano. La sitemap resta comunque disponibile e collegata da ogni pagina. Con un dominio personalizzato funziona normalmente.

## Limitazioni note

- **API Blizzard:** non integrate. Richiedono credenziali lato server e non risultano endpoint documentati per Forever. Il roster è manuale. Dettagli (in inglese) in [BLIZZARD-API.md](../BLIZZARD-API.md).
- **Font self-hosted:** la build richiede una connessione internet per scaricarli. Offline usa `fontLoading: "system"`.
- **Una lingua per sito:** l'interfaccia usa una lingua alla volta; i visitatori non hanno un selettore di lingua.
- **Nessun modulo di candidatura online:** il reclutamento rimanda ai contatti configurati.

## Licenza e attribuzione

- **Codice:** licenza [MIT](../../LICENSE).
- **Attribuzione obbligatoria:** ogni sito realizzato con il template deve mantenere nel footer di tutte le pagine il riferimento visibile "Powered by Azeroth Guild Template", con link al repository originale. Non è disattivabile dalla configurazione. È consentito personalizzare stile e testi del sito e aggiungere una nota accanto all'attribuzione; non è consentito rimuoverla, nasconderla o mostrarla solo su alcune pagine.
- La licenza MIT da sola non impone un'attribuzione visibile: questa è una condizione d'uso richiesta dal progetto, separata dalla licenza del codice. Dettagli in [ATTRIBUTION.md](../../ATTRIBUTION.md) (in inglese, versione di riferimento).
- **Font:** SIL Open Font License, tramite Google Fonts.
- **Asset:** stemmi, illustrazioni e icone sono originali del progetto.
- World of Warcraft è un marchio di Blizzard Entertainment, Inc.

Vuoi contribuire? Leggi [CONTRIBUTING.md](../../CONTRIBUTING.md) (in inglese).
