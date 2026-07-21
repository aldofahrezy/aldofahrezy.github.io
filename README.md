# aldofahrezy.github.io

Personal portfolio of **Muhammad Aldo Fahrezy** — Data Science & AI.
Content-first, statically rendered, with in-depth project case studies.

## Stack

- **[Astro](https://astro.build)** — static site generator (zero JS by default)
- **MDX** content collections for the project case studies
- **Tailwind CSS v4** (via `@tailwindcss/vite`) + a small design-token layer
- **KaTeX** (`remark-math` + `rehype-katex`) for math, **Shiki** for code
- Self-hosted variable fonts via **Fontsource** (Space Grotesk, Inter, Newsreader, JetBrains Mono)
- Light/dark theme, `prefers-reduced-motion` respected, JSON-LD + sitemap

## Develop

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # static output → dist/
npm run preview    # serve the build locally
```

## Structure

```
src/
  pages/            index.astro, projects/index.astro, projects/[...slug].astro
  layouts/          BaseLayout.astro, CaseStudyLayout.astro
  components/        Hero, Nav, Footer, ThemeToggle, ProjectRow, ResultsReadout
  content/projects/ *.mdx  (one case study per file)
  data/profile.ts   bio, education, experience, honors, skills, competitions
  styles/global.css design tokens + prose styles
public/             favicon, résumé, hosted report PDF, OG image
```

## Deploy

Built to `dist/` and published to GitHub Pages:

```sh
npm run deploy     # builds, then pushes dist/ to the gh-pages branch
```
