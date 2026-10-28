# Azeroth Guild Template

[English](../../README.md) · [Deutsch](../de/README.md) · [Français](../fr/README.md) · [Español](../es/README.md) · [Italiano](../it/README.md) · **Português (Brasil)** · [Русский](../ru/README.md) · [한국어](../ko/README.md) · [简体中文](../zh-CN/README.md) · [繁體中文](../zh-TW/README.md)

Template de site **gratuito e estático** para guildas de **World of Warcraft: Forever**. Faça um fork, edite um arquivo de configuração, escreva notícias e guias em Markdown e publique de graça no GitHub Pages.

Feito com [Astro](https://astro.build), [Tailwind CSS 4](https://tailwindcss.com) e JavaScript puro. Sem backend, sem banco de dados e sem serviços pagos.

> Projeto da comunidade, sem afiliação ou endosso da Blizzard Entertainment.

## Recursos

- **Identidade Aliança / Horda:** emblemas, ilustração de capa, brasão e paleta mudam conforme a facção.
- **10 idiomas de interface**, os mesmos em que World of Warcraft é traduzido: English, Deutsch, Français, Español, Italiano, Português (Brasil), Русский, 한국어, 简体中文, 繁體中文.
- **12 paletas** (2 de facção + 10 inspiradas nas raças de Forever) ou suas próprias cores HEX, com contraste verificado automaticamente nos temas claro e escuro.
- **5 predefinições tipográficas** gratuitas (Google Fonts, licença OFL), baixadas durante o build: os visitantes não fazem requisições ao Google.
- **Página inicial** com capa, apresentação, recrutamento, atividades, últimas notícias, membros e guias.
- **Página "A guilda"** com história, valores, organização, requisitos, status do recrutamento e contato.
- **Notícias em Markdown** com categorias, tags, imagens de capa, rascunhos, paginação e artigos relacionados.
- **Guias em Markdown** com categorias, destaques, sumário automático, tags e guias relacionados.
- **Lista de membros** a partir de um arquivo JSON com busca, filtros (raça, classe, especialização, função, posto, status) e ordenação.
- **Busca** em notícias e guias, inteiramente no navegador.
- **Tema claro/escuro**, menu móvel acessível, navegação por teclado; funciona sem JavaScript.
- **SEO:** URLs canônicas, Open Graph, sitemap, robots.txt e caminho base correto no GitHub Pages.
- **Verificações automáticas** de configuração, conteúdo, links e atribuição, além de testes automatizados.

## Início rápido

Requisitos: [Node.js](https://nodejs.org) 22.23 ou mais recente (recomendado 24) e Git.

```bash
git clone https://github.com/<seu-usuario>/<seu-repositorio>.git
cd <seu-repositorio>
npm ci
npm run dev
```

Abra o endereço exibido no terminal (geralmente `http://localhost:4321/<nome-do-repositorio>/`).

## Personalizando o site

| O quê | Onde |
| --- | --- |
| Nome, facção, idioma, cores, fontes, seções, redes sociais | `src/config/site.config.mjs` |
| Texto da página "A guilda" | `src/content/pages/about.md` |
| Notícias | `src/content/news/*.md` |
| Guias | `src/content/guides/*.md` |
| Membros | `src/data/roster.json` |
| Logo, fundos, imagens | `public/images/` |
| Raças, classes, especializações | `src/data/game-data.json` ([fontes e status, em inglês](../GAME-DATA.md)) |

Depois de cada alteração, verifique tudo com `npm run check:config` e `npm run check:content`.

### 1. Configuração

Abra `src/config/site.config.mjs`: cada campo tem um comentário (em inglês; este guia explica todas as opções em português). Por exemplo, uma guilda da Horda com interface em português:

```js
site: { language: "pt-BR", /* ... */ },
guild: { faction: "horde", preferredRace: "orc", /* ... */ },
appearance: { colorPreset: "orc", fontPreset: "horde-war", /* ... */ },
```

Valores errados não quebram o site: eles são substituídos por um valor válido e `npm run check:config` indica o campo a corrigir.

#### Idioma

`site.language` traduz a interface: menus, botões, rótulos, filtros de membros, busca e datas. Códigos disponíveis: `en`, `de`, `fr`, `es`, `it`, `pt-BR`, `ru`, `ko`, `zh-CN`, `zh-TW`.

Seu próprio conteúdo (notícias, guias, página "A guilda" e textos da configuração como lema, atividades e categorias de guias) aparece exatamente como você escreve: escreva-o no idioma do seu site. O conteúdo de exemplo está em inglês.

Para coreano e chinês, o site usa as fontes do sistema do visitante para os caracteres CJK. Para russo, as fontes do texto incluem cirílico; as fontes decorativas dos títulos usam uma fonte serifada do sistema para as letras cirílicas.

#### Referência da configuração

**`site`**

| Campo | Padrão | Descrição |
| --- | --- | --- |
| `name` | `"My Guild"` | Nome da guilda (cabeçalho, títulos, rodapé). |
| `shortName` | = `name` | Nome curto para o cabeçalho em celulares. |
| `tagline` | `""` | Lema na capa. |
| `description` | `""` | Meta descrição e prévia em redes sociais (recomendado no máximo 160 caracteres). |
| `language` | `"en"` | Idioma da interface (veja acima). |
| `locale` | o do idioma | Formato de data, ex.: `"pt-BR"`. |
| `url` | — | Endereço público terminado em `/`. **Obrigatório e válido**; caso contrário, o build para. Substituído automaticamente no GitHub Actions. |
| `logo` | brasão da facção | Caminho em `public/` ou URL https. Vazio = `crest-alliance.svg` / `crest-horde.svg`. |
| `favicon` | `"/favicon.svg"` | Ícone da aba do navegador. |
| `ogImage` | logo | Imagem de prévia para redes sociais (1200×630). |

**`guild`**

| Campo | Padrão | Descrição |
| --- | --- | --- |
| `faction` | `"alliance"` | `"alliance"` ou `"horde"`: emblemas, ilustração, brasão e paleta padrão. |
| `preferredRace` | `""` | Id de uma raça do catálogo do jogo. Não muda a facção. |
| `server`, `region`, `founded` | `""` | Exibidos na página inicial e em "A guilda" quando preenchidos. |
| `description` | `""` | Apresentação curta (capa e página inicial). |
| `ranks` | `["Guild Master","Officer","Member"]` | Postos do mais alto ao mais baixo. A lista de membros deve usar esses nomes. |
| `recruitment.status` | `"open"` | `"open"`, `"limited"` ou `"closed"`. |
| `recruitment.message` | `""` | Texto do quadro de recrutamento. |
| `recruitment.wanted` | `[]` | Classes ou funções procuradas (texto livre). |
| `recruitment.contactUrl` | `""` | Link para se candidatar. Vazio = link do Discord; sem ele, o contato da página "A guilda". |
| `activities` | `[]` | `{ title, description, schedule }`. |
| `goals` | `[]` | Lista de objetivos. |
| `social.discord`, `.website`, `.youtube`, `.twitch` | `""` | Links https. Vazio ou inválido = botão oculto. |

**`appearance`**

| Campo | Padrão | Descrição |
| --- | --- | --- |
| `theme` | `"dark"` | Tema inicial: `"dark"`, `"light"` ou `"system"`. Os visitantes podem alternar se `features.themeToggle` estiver ativo. |
| `colorPreset` | facção | `"alliance"`, `"horde"`, `"faction"`, o id de uma raça (`"human"`, `"dwarf"`, `"night-elf"`, `"gnome"`, `"high-order-skyborne"`, `"orc"`, `"undead"`, `"tauren"`, `"troll"`, `"windshaper-skyborne"`) ou `"custom"`. |
| `customColors` | cores da facção | `{ primary, accent, background }` em HEX, usadas com `"custom"`. O contraste é corrigido automaticamente. |
| `fontPreset` | `"alliance-classic"` | `"alliance-classic"`, `"horde-war"`, `"arcane"`, `"medieval"`, `"clean"`. |
| `fontLoading` | `"self-hosted"` | Veja abaixo. |
| `backgroundImage` | `""` | Imagem da capa. Vazio = ilustração integrada com as cores da paleta. |
| `showAnimations` | `true` | Animações leves, sempre desativadas com `prefers-reduced-motion`. |

**`features`**: `news`, `roster`, `guides`, `recruitment`, `socialLinks`, `themeToggle`, `search`, todos `true` por padrão. Com `false`, a seção não gera páginas nem links.

**Outros:** `news.perPage` (notícias por página do arquivo, 1–50, padrão 6) · `guides.categories` (`{ id, label }`; o `id` é usado no campo `type` dos guias) · `footer.links` (links extras `{ label, url }`) · `footer.attributionNote` (texto secundário ao lado da atribuição, que continua sempre visível).

#### Fontes: hospedagem própria ou Google Fonts

| Modo | Como funciona | Privacidade |
| --- | --- | --- |
| `"self-hosted"` | A [API de fontes do Astro](https://docs.astro.build/en/guides/fonts/) baixa **durante o build** apenas as famílias da predefinição no Google Fonts e as publica junto com o site. Requer conexão com a internet durante o build. | Os visitantes não fazem requisições ao Google. |
| `"google"` | O navegador carrega as fontes de `fonts.googleapis.com`. | O Google recebe o endereço IP do visitante. |
| `"system"` | Apenas fontes do sistema. | Nenhuma requisição externa. |

Famílias usadas: Cinzel, Cinzel Decorative, Grenze, MedievalSharp, Alegreya, Lora, Inter, Source Sans 3, todas gratuitas sob a SIL Open Font License.

#### Paletas

Cada paleta em `src/data/palettes.mjs` define três cores base. Superfícies, texto, bordas, anel de foco e o tema claro são calculados por `src/lib/color.mjs` com contrastes mínimos (texto 7:1, texto secundário e links 4,5:1, foco 3:1). Um teste verifica todas as paletas nos dois temas. Para adicionar uma paleta, basta incluir uma entrada: os componentes não mudam.

### 2. Logo e imagens

- **Logo:** copie o arquivo para `public/images/logo/` e defina `site.logo: "/images/logo/nome-do-arquivo.png"`. Vazio = brasão de exemplo da facção.
- **Fundo da capa:** copie uma imagem (recomendado 1600×800, WebP ou JPG) para `public/images/backgrounds/` e defina `appearance.backgroundImage`. Vazio = ilustração integrada com as cores da sua paleta.
- Não use logos ou ilustrações da Blizzard sem verificar se você tem direito de uso.

### 3. Adicionar uma notícia (em menos de um minuto)

Crie `src/content/news/titulo-da-noticia.md`. O nome do arquivo vira o endereço da página: use apenas letras minúsculas, números e hifens.

```md
---
title: "Título da notícia"
description: "Uma frase que resume a notícia."
pubDate: 2026-11-04
author: "Nome"
category: "Anúncios"
tags:
  - community
---

Texto da notícia em **Markdown**.

## Um subtítulo

- Uma lista
- de itens
```

Campos opcionais: `cover: "/images/news/imagem.webp"` com `coverAlt: "descrição"`, `updatedDate`, `draft: true` (visível apenas com `npm run dev`, não é publicado).

No texto, use títulos `##` e `###`: o título principal já vem do campo `title`.

### 4. Adicionar um guia

Crie `src/content/guides/nome-do-guia.md`:

```md
---
title: "Guia da masmorra"
description: "Preparação e estratégia para o grupo."
pubDate: 2026-11-04
author: "Nome"
type: "dungeon"        # id de uma categoria em guides.categories
difficulty: "normal"   # opcional: easy, normal, hard, heroic
featured: false        # true = destaque
tags:
  - dungeon
---

## Preparação
...
```

O sumário do guia é gerado a partir dos títulos `##` e `###`. As **imagens** ficam em `public/images/guides/` e são inseridas com `![Descrição](/images/guides/mapa.webp)`. Para **links internos**, use caminhos relativos (ex.: `[Membros](../../roster/)`), que também funcionam no GitHub Pages.

O conteúdo de exemplo tem `example: true`, que mostra o selo "Conteúdo de exemplo". Apague-o ou substitua-o pelo seu.

### 5. Lista de membros

Cada membro em `src/data/roster.json`:

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
  "description": "Texto curto",
  "profileUrl": "https://...",
  "active": true
}
```

`name`, `race`, `class` e `spec` são obrigatórios e devem ser escritos como no catálogo (ex.: `"Night Elf"` ou `"night-elf"`). A função (`role`) padrão vem da especialização; defina `role` só para escolher outra função que essa especialização possa cumprir (ex.: um Druida Feral como DPS, um Caçador Survival ou um Xamã Enhancement como off-tank). `rank` precisa ser um dos `guild.ranks`. Sem `avatar`, são exibidas as iniciais. Combinações inválidas de raça e classe geram um erro que indica o membro e o campo. As combinações permitidas estão em [GAME-DATA.md](../GAME-DATA.md#raceclass-combinations).

Os nomes de raças, classes e especializações são os nomes em inglês do jogo, iguais em todos os idiomas do template.

## Comandos

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento com recarga automática (mostra também os rascunhos). |
| `npm run build` | Gera o site estático em `dist/`. |
| `npm run preview` | Prévia local do build. |
| `npm run check` | Verificações do Astro e do TypeScript. |
| `npm run check:config` | Valida a configuração (`--strict` também falha com avisos). |
| `npm run check:content` | Valida membros, notícias, guias e esquemas do frontmatter. |
| `npm run check:links` | Após o build: links internos, atribuição em todas as páginas, nenhuma credencial. |
| `npm test` | Testes automatizados (contraste das paletas, configuração, membros, catálogo, temas, fontes, traduções). |
| `npm run verify` | Tudo acima, em sequência. |

As mensagens dos comandos são em inglês e sempre indicam o arquivo e o campo a corrigir.

## Publicar de graça no GitHub Pages

1. Faça um **fork** do repositório (ou use "Use this template").
2. Em **Settings → Pages**, em **Source**, escolha **GitHub Actions**.
3. Faça push para o branch `main` (inclusive editando um arquivo pelo site do GitHub).
4. O workflow `.github/workflows/deploy.yml` instala as dependências com `npm ci`, valida configuração e conteúdo, executa verificações e testes, gera o site, confere links e atribuição e **só se tudo estiver certo** publica em `https://<usuario>.github.io/<repositorio>/`.

Nenhum segredo é necessário. O endereço e o caminho base são detectados automaticamente: `site.url` só é usado no desenvolvimento local e em outras hospedagens. Pull requests são verificados, mas não publicados.

### Sem usar Git no computador

Você pode fazer tudo pelo navegador:

1. Faça o fork e ative o GitHub Pages como acima.
2. Abra um arquivo (ex.: `src/config/site.config.mjs`), clique no ícone de lápis, edite e clique em **Commit changes**.
3. Para uma notícia: abra `src/content/news/`, **Add file → Create new file**, cole o modelo acima e salve.
4. Para imagens: abra `public/images/...`, **Add file → Upload files**.
5. Alguns minutos depois o site estará atualizado. Se algo der errado, a aba **Actions** mostra a etapa que falhou com o nome do campo a corrigir, e o site publicado continua na versão anterior.

### Outras hospedagens estáticas gratuitas

`npm run build` gera uma pasta `dist/` com arquivos estáticos que qualquer hospedagem estática consegue servir.

**Cloudflare Pages:** conecte o repositório e defina o comando de build `npm run build`, a pasta de saída `dist`, a variável `NODE_VERSION=24` e a variável `SITE_URL` com o endereço final (ex.: `https://minha-guilda.pages.dev/`).

**Netlify:** mesmas configurações (comando `npm run build`, pasta `dist`, variável `SITE_URL`).

Em um domínio raiz (ex.: `https://minha-guilda.com.br/`), o caminho base passa a ser `/` automaticamente.

> Observação: no GitHub Pages em um repositório de projeto (`/<repositorio>/`), o `robots.txt` não fica na raiz do domínio e os buscadores o ignoram. O sitemap continua disponível e vinculado em todas as páginas. Com um domínio próprio, funciona normalmente.

## Limitações conhecidas

- **APIs da Blizzard:** não integradas. Elas exigem credenciais no servidor e não foram encontrados endpoints documentados para Forever. A lista de membros é manual. Detalhes (em inglês) em [BLIZZARD-API.md](../BLIZZARD-API.md).
- **Fontes hospedadas no site:** o build precisa de internet para baixá-las. Sem conexão, use `fontLoading: "system"`.
- **Um idioma por site:** a interface usa um idioma por vez; os visitantes não têm seletor de idioma.
- **Sem formulário de candidatura online:** o recrutamento aponta para o contato configurado.

## Licença e atribuição

- **Código:** licença [MIT](../../LICENSE).
- **Atribuição obrigatória:** todo site criado com o template deve manter, no rodapé de todas as páginas, a menção visível "Powered by Azeroth Guild Template" com link para o repositório original. Ela não pode ser desativada pela configuração. É permitido personalizar o estilo e os textos do site e adicionar uma nota ao lado da atribuição; não é permitido removê-la, escondê-la ou exibi-la só em algumas páginas.
- A licença MIT, por si só, não exige atribuição visível: trata-se de uma condição de uso pedida pelo projeto, separada da licença do código. Detalhes em [ATTRIBUTION.md](../../ATTRIBUTION.md) (em inglês, versão de referência).
- **Fontes:** SIL Open Font License, via Google Fonts.
- **Recursos visuais:** brasões, ilustrações e ícones são originais do projeto.
- World of Warcraft é uma marca da Blizzard Entertainment, Inc.

Quer contribuir? Leia o [CONTRIBUTING.md](../../CONTRIBUTING.md) (em inglês).
