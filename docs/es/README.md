# Azeroth Guild Template

[English](../../README.md) · [Deutsch](../de/README.md) · [Français](../fr/README.md) · **Español** · [Italiano](../it/README.md) · [Português (Brasil)](../pt-BR/README.md) · [Русский](../ru/README.md) · [한국어](../ko/README.md) · [简体中文](../zh-CN/README.md) · [繁體中文](../zh-TW/README.md)

Plantilla web **gratuita y estática** para hermandades de **World of Warcraft: Forever**. Haz un fork, edita un archivo de configuración, escribe noticias y guías en Markdown y publícalo gratis en GitHub Pages.

Creada con [Astro](https://astro.build), [Tailwind CSS 4](https://tailwindcss.com) y JavaScript nativo. Sin backend, sin base de datos y sin servicios de pago.

> Proyecto de la comunidad, no afiliado ni respaldado por Blizzard Entertainment.

## Funciones

- **Identidad Alianza / Horda:** emblemas, ilustración de portada, escudo y paleta cambian con la facción.
- **10 idiomas de interfaz**, los mismos a los que está traducido World of Warcraft: English, Deutsch, Français, Español, Italiano, Português (Brasil), Русский, 한국어, 简体中文, 繁體中文.
- **12 paletas** (2 de facción + 10 inspiradas en las razas de Forever) o tus propios colores HEX, con contraste comprobado automáticamente en los temas claro y oscuro.
- **5 ajustes tipográficos** gratuitos (Google Fonts, licencia OFL) que se descargan durante el build: los visitantes no hacen peticiones a Google.
- **Página de inicio** con portada, presentación, reclutamiento, actividades, últimas noticias, miembros y guías.
- **Página «La hermandad»** con historia, valores, organización, requisitos, estado del reclutamiento y contacto.
- **Noticias en Markdown** con categorías, etiquetas, portadas, borradores, paginación y artículos relacionados.
- **Guías en Markdown** con categorías, guías destacadas, índice automático, etiquetas y guías relacionadas.
- **Lista de miembros** desde un archivo JSON con búsqueda, filtros (raza, clase, especialización, rol, rango, estado) y orden.
- **Búsqueda** en noticias y guías, totalmente en el navegador.
- **Tema claro/oscuro**, menú móvil accesible, navegación con teclado; funciona sin JavaScript.
- **SEO:** URL canónicas, Open Graph, sitemap, robots.txt y ruta base correcta en GitHub Pages.
- **Comprobaciones automáticas** de configuración, contenido, enlaces y atribución, además de pruebas automatizadas.

## Inicio rápido

Requisitos: [Node.js](https://nodejs.org) 22.23 o posterior (recomendado 24) y Git.

```bash
git clone https://github.com/<tu-usuario>/<tu-repositorio>.git
cd <tu-repositorio>
npm ci
npm run dev
```

Abre la dirección que muestra la terminal (normalmente `http://localhost:4321/<nombre-del-repositorio>/`).

## Personalizar el sitio

| Qué | Dónde |
| --- | --- |
| Nombre, facción, idioma, colores, fuentes, secciones, redes sociales | `src/config/site.config.mjs` |
| Texto de la página «La hermandad» | `src/content/pages/about.md` |
| Noticias | `src/content/news/*.md` |
| Guías | `src/content/guides/*.md` |
| Miembros | `src/data/roster.json` |
| Logo, fondos, imágenes | `public/images/` |
| Razas, clases, especializaciones | `src/data/game-data.json` ([fuentes y estado, en inglés](../GAME-DATA.md)) |

Después de cada cambio puedes comprobarlo todo con `npm run check:config` y `npm run check:content`.

### 1. Configuración

Abre `src/config/site.config.mjs`: cada campo tiene un comentario (en inglés; esta guía explica todas las opciones en español). Por ejemplo, para una hermandad de la Horda con la interfaz en español:

```js
site: { language: "es", /* ... */ },
guild: { faction: "horde", preferredRace: "orc", /* ... */ },
appearance: { colorPreset: "orc", fontPreset: "horde-war", /* ... */ },
```

Los valores incorrectos no rompen el sitio: se sustituyen por un valor válido y `npm run check:config` indica el campo que hay que corregir.

#### Idioma

`site.language` traduce la interfaz: menús, botones, etiquetas, filtros de miembros, búsqueda y fechas. Códigos disponibles: `en`, `de`, `fr`, `es`, `it`, `pt-BR`, `ru`, `ko`, `zh-CN`, `zh-TW`.

Tu propio contenido (noticias, guías, página «La hermandad» y textos de la configuración como el lema, las actividades y las categorías de guías) se muestra tal como lo escribes: redáctalo en el idioma de tu sitio. El contenido de ejemplo está en inglés.

Para coreano y chino el sitio usa las fuentes del sistema del visitante para los caracteres CJK. Para ruso, las fuentes del texto incluyen cirílico; las fuentes decorativas de los títulos usan una fuente serif del sistema para las letras cirílicas.

#### Referencia de la configuración

**`site`**

| Campo | Predeterminado | Descripción |
| --- | --- | --- |
| `name` | `"My Guild"` | Nombre de la hermandad (cabecera, títulos, pie de página). |
| `shortName` | = `name` | Nombre corto para la cabecera en móviles. |
| `tagline` | `""` | Lema de la portada. |
| `description` | `""` | Meta descripción y vista previa en redes sociales (se recomiendan 160 caracteres como máximo). |
| `language` | `"en"` | Idioma de la interfaz (ver arriba). |
| `locale` | el del idioma | Formato de fecha, p. ej. `"es-ES"` o `"es-MX"`. |
| `url` | — | Dirección pública terminada en `/`. **Obligatoria y válida**; si no, el build se detiene. GitHub Actions la sustituye automáticamente. |
| `logo` | escudo de la facción | Ruta en `public/` o URL https. Vacío = `crest-alliance.svg` / `crest-horde.svg`. |
| `favicon` | `"/favicon.svg"` | Icono de la pestaña del navegador. |
| `ogImage` | logo | Imagen para la vista previa en redes sociales (1200×630). |

**`guild`**

| Campo | Predeterminado | Descripción |
| --- | --- | --- |
| `faction` | `"alliance"` | `"alliance"` o `"horde"`: emblemas, ilustración, escudo y paleta predeterminada. |
| `preferredRace` | `""` | Id de una raza del catálogo del juego. No cambia la facción. |
| `server`, `region`, `founded` | `""` | Se muestran en el inicio y en «La hermandad» si se rellenan. |
| `description` | `""` | Presentación breve (portada e inicio). |
| `ranks` | `["Guild Master","Officer","Member"]` | Rangos del más alto al más bajo. La lista de miembros debe usar estos nombres. |
| `recruitment.status` | `"open"` | `"open"`, `"limited"` o `"closed"`. |
| `recruitment.message` | `""` | Texto del recuadro de reclutamiento. |
| `recruitment.wanted` | `[]` | Clases o roles buscados (texto libre). |
| `recruitment.contactUrl` | `""` | Enlace para solicitar el ingreso. Vacío = enlace de Discord; si tampoco existe, el contacto de «La hermandad». |
| `activities` | `[]` | `{ title, description, schedule }`. |
| `goals` | `[]` | Lista de objetivos. |
| `social.discord`, `.website`, `.youtube`, `.twitch` | `""` | Enlaces https. Vacíos o no válidos = botón oculto. |

**`appearance`**

| Campo | Predeterminado | Descripción |
| --- | --- | --- |
| `theme` | `"dark"` | Tema inicial: `"dark"`, `"light"` o `"system"`. Los visitantes pueden cambiarlo si `features.themeToggle` está activo. |
| `colorPreset` | facción | `"alliance"`, `"horde"`, `"faction"`, el id de una raza (`"human"`, `"dwarf"`, `"night-elf"`, `"gnome"`, `"high-order-skyborne"`, `"orc"`, `"undead"`, `"tauren"`, `"troll"`, `"windshaper-skyborne"`) o `"custom"`. |
| `customColors` | colores de la facción | `{ primary, accent, background }` en HEX, usados con `"custom"`. El contraste se corrige automáticamente. |
| `fontPreset` | `"alliance-classic"` | `"alliance-classic"`, `"horde-war"`, `"arcane"`, `"medieval"`, `"clean"`. |
| `fontLoading` | `"self-hosted"` | Ver más abajo. |
| `backgroundImage` | `""` | Imagen de portada. Vacío = ilustración integrada con los colores de la paleta. |
| `showAnimations` | `true` | Animaciones suaves, siempre desactivadas con `prefers-reduced-motion`. |

**`features`**: `news`, `roster`, `guides`, `recruitment`, `socialLinks`, `themeToggle`, `search`, todos `true` por defecto. Con `false` la sección no genera páginas ni enlaces.

**Otros:** `news.perPage` (noticias por página del archivo, 1–50, 6 por defecto) · `guides.categories` (`{ id, label }`; el `id` se usa en el campo `type` de las guías) · `footer.links` (enlaces adicionales `{ label, url }`) · `footer.attributionNote` (texto secundario junto a la atribución, que siempre permanece visible).

#### Fuentes: alojamiento propio o Google Fonts

| Modo | Funcionamiento | Privacidad |
| --- | --- | --- |
| `"self-hosted"` | La [API de fuentes de Astro](https://docs.astro.build/en/guides/fonts/) descarga **durante el build** solo las familias del ajuste desde Google Fonts y las publica con el sitio. Necesita conexión a internet durante el build. | Los visitantes no hacen peticiones a Google. |
| `"google"` | El navegador carga las fuentes desde `fonts.googleapis.com`. | Google recibe la dirección IP del visitante. |
| `"system"` | Solo fuentes del sistema. | Sin peticiones externas. |

Familias usadas: Cinzel, Cinzel Decorative, Grenze, MedievalSharp, Alegreya, Lora, Inter, Source Sans 3, todas gratuitas con licencia SIL Open Font License.

#### Paletas

Cada paleta de `src/data/palettes.mjs` define tres colores base. Las superficies, el texto, los bordes, el anillo de foco y el tema claro se calculan en `src/lib/color.mjs` con contrastes mínimos (texto 7:1, texto secundario y enlaces 4,5:1, foco 3:1). Una prueba comprueba todas las paletas en ambos temas. Para añadir una paleta basta con añadir una entrada: no hay que tocar los componentes.

### 2. Logo e imágenes

- **Logo:** copia el archivo en `public/images/logo/` y define `site.logo: "/images/logo/nombre-del-archivo.png"`. Vacío = escudo de ejemplo de la facción.
- **Fondo de portada:** copia una imagen (recomendado 1600×800, WebP o JPG) en `public/images/backgrounds/` y define `appearance.backgroundImage`. Vacío = ilustración integrada con los colores de tu paleta.
- No uses logos ni ilustraciones de Blizzard sin comprobar que tienes derecho a hacerlo.

### 3. Añadir una noticia (en menos de un minuto)

Crea `src/content/news/titulo-de-la-noticia.md`. El nombre del archivo se convierte en la dirección de la página: usa solo minúsculas, números y guiones.

```md
---
title: "Título de la noticia"
description: "Una frase que resuma la noticia."
pubDate: 2026-11-04
author: "Nombre"
category: "Anuncios"
tags:
  - community
---

Texto de la noticia en **Markdown**.

## Un subtítulo

- Una lista
- con viñetas
```

Campos opcionales: `cover: "/images/news/imagen.webp"` con `coverAlt: "descripción"`, `updatedDate`, `draft: true` (visible solo con `npm run dev`, no se publica).

En el texto usa títulos `##` y `###`: el título principal ya viene del campo `title`.

### 4. Añadir una guía

Crea `src/content/guides/nombre-de-la-guia.md`:

```md
---
title: "Guía de la mazmorra"
description: "Preparación y estrategia para el grupo."
pubDate: 2026-11-04
author: "Nombre"
type: "dungeon"        # id de una categoría en guides.categories
difficulty: "normal"   # opcional: easy, normal, hard, heroic
featured: false        # true = destacada
tags:
  - dungeon
---

## Preparación
...
```

El índice de la guía se genera a partir de los títulos `##` y `###`. Las **imágenes** van en `public/images/guides/` y se insertan con `![Descripción](/images/guides/mapa.webp)`. Para los **enlaces internos** usa rutas relativas (p. ej. `[Miembros](../../roster/)`), que también funcionan en GitHub Pages.

El contenido de ejemplo tiene `example: true`, que muestra la insignia «Contenido de ejemplo». Bórralo o sustitúyelo por el tuyo.

### 5. Lista de miembros

Cada miembro en `src/data/roster.json`:

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
  "description": "Texto breve",
  "profileUrl": "https://...",
  "active": true
}
```

Son obligatorios `name`, `race`, `class` y `spec`, escritos como en el catálogo (p. ej. `"Night Elf"` o `"night-elf"`). El `role` predeterminado depende de la especialización; indica `role` solo para elegir otro rol que esa especialización pueda cubrir (p. ej. un Druida Feral como DPS, un Cazador Survival o un Chamán Enhancement como off-tank). `rank` debe ser uno de `guild.ranks`. Sin `avatar` se muestran las iniciales. Una combinación de raza y clase no válida produce un error que indica el miembro y el campo. Las combinaciones permitidas están en [GAME-DATA.md](../GAME-DATA.md#raceclass-combinations).

Los nombres de razas, clases y especializaciones son los nombres en inglés del juego, iguales en todos los idiomas de la plantilla.

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con recarga automática (también muestra los borradores). |
| `npm run build` | Genera el sitio estático en `dist/`. |
| `npm run preview` | Vista previa local del build. |
| `npm run check` | Comprobaciones de Astro y TypeScript. |
| `npm run check:config` | Valida la configuración (`--strict` también falla con advertencias). |
| `npm run check:content` | Valida miembros, noticias, guías y esquemas del frontmatter. |
| `npm run check:links` | Tras el build: enlaces internos, atribución en todas las páginas, sin credenciales. |
| `npm test` | Pruebas automatizadas (contraste de paletas, configuración, miembros, catálogo, temas, fuentes, traducciones). |
| `npm run verify` | Todo lo anterior, en orden. |

Los mensajes de los comandos están en inglés e indican siempre el archivo y el campo que hay que corregir.

## Publicar gratis en GitHub Pages

1. Haz un **fork** del repositorio (o usa «Use this template»).
2. En **Settings → Pages**, en **Source**, elige **GitHub Actions**.
3. Haz push a la rama `main` (incluso editando un archivo desde la web de GitHub).
4. El workflow `.github/workflows/deploy.yml` instala las dependencias con `npm ci`, valida configuración y contenido, ejecuta comprobaciones y pruebas, construye el sitio, verifica enlaces y atribución y **solo si todo es correcto** lo publica en `https://<usuario>.github.io/<repositorio>/`.

No se necesitan secretos. La dirección y la ruta base se detectan automáticamente: `site.url` solo se usa en desarrollo local y en otros alojamientos. Las pull requests se verifican pero no se publican.

### Sin usar Git en tu ordenador

Puedes hacerlo todo desde el navegador:

1. Haz el fork y activa GitHub Pages como se indica arriba.
2. Abre un archivo (p. ej. `src/config/site.config.mjs`), pulsa el icono del lápiz, edítalo y pulsa **Commit changes**.
3. Para una noticia: abre `src/content/news/`, **Add file → Create new file**, pega la plantilla anterior y guarda.
4. Para las imágenes: abre `public/images/...`, **Add file → Upload files**.
5. Unos minutos después el sitio está actualizado. Si algo falla, la pestaña **Actions** muestra el paso fallido con el nombre del campo que hay que corregir, y el sitio publicado se mantiene en la versión anterior.

### Otros alojamientos estáticos gratuitos

`npm run build` genera una carpeta `dist/` con archivos estáticos que cualquier alojamiento estático puede servir.

**Cloudflare Pages:** conecta el repositorio y define el comando de build `npm run build`, la carpeta de salida `dist`, la variable `NODE_VERSION=24` y la variable `SITE_URL` con la dirección final (p. ej. `https://mi-hermandad.pages.dev/`).

**Netlify:** la misma configuración (comando `npm run build`, carpeta `dist`, variable `SITE_URL`).

En un dominio raíz (p. ej. `https://mi-hermandad.es/`) la ruta base pasa a ser `/` automáticamente.

> Nota: con GitHub Pages en un repositorio de proyecto (`/<repositorio>/`), `robots.txt` no está en la raíz del dominio y los buscadores lo ignoran. El sitemap sigue disponible y enlazado desde todas las páginas. Con un dominio propio funciona con normalidad.

## Limitaciones conocidas

- **API de Blizzard:** no integradas. Requieren credenciales en el servidor y no se han encontrado endpoints documentados para Forever. La lista de miembros es manual. Detalles (en inglés) en [BLIZZARD-API.md](../BLIZZARD-API.md).
- **Fuentes alojadas en el sitio:** el build necesita conexión a internet para descargarlas. Sin conexión, usa `fontLoading: "system"`.
- **Un idioma por sitio:** la interfaz usa un idioma a la vez; los visitantes no tienen selector de idioma.
- **Sin formulario de solicitud en línea:** el reclutamiento remite al contacto configurado.

## Licencia y atribución

- **Código:** licencia [MIT](../../LICENSE).
- **Atribución obligatoria:** todo sitio creado con la plantilla debe mantener en el pie de todas las páginas la mención visible «Powered by Azeroth Guild Template», con enlace al repositorio original. No se puede desactivar desde la configuración. Se permite personalizar el estilo y los textos del sitio y añadir una nota junto a la atribución; no se permite eliminarla, ocultarla ni mostrarla solo en algunas páginas.
- La licencia MIT por sí sola no exige una atribución visible: es una condición de uso que pide el proyecto, separada de la licencia del código. Detalles en [ATTRIBUTION.md](../../ATTRIBUTION.md) (en inglés, versión de referencia).
- **Fuentes:** SIL Open Font License, a través de Google Fonts.
- **Recursos gráficos:** escudos, ilustraciones e iconos son originales del proyecto.
- World of Warcraft es una marca de Blizzard Entertainment, Inc.

¿Quieres colaborar? Lee [CONTRIBUTING.md](../../CONTRIBUTING.md) (en inglés).
