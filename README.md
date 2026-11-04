# julian-perge.github.io

Source for [julian-perge.github.io](https://julian-perge.github.io): a Home page and a Resume page, built from Markdown by a small Bun script and deployed to GitHub Pages by GitHub Actions. `GLOSSARY.md` defines the terms used here.

## Layout

| Path | What it is |
|---|---|
| `content/index.md` | Home page. `<!--projects-->` marks where the project list goes. |
| `content/looking-for.md` | "What I'm looking for", shown at the top of the Resume page. |
| `content/downloads.json` | Last fetched Thunderstore download counts. |
| `src/projects.ts` | Featured projects shown on the Home page. |
| `src/build.ts` | Builds `dist/`. |
| `src/downloads.ts` | Refreshes `content/downloads.json` from Thunderstore. |
| `src/resume.ts` | Turns the Resume source into the Public or Private resume Markdown. |
| `src/style.css` | The only stylesheet, including print styles for the Resume page. |
| `resume/` | Resume source, LaTeX header, and the committed public PDF. |
| `.claude/skills/resume/` | How to edit the resume, for Claude Code. |

## Setup

Needs Bun, [just](https://github.com/casey/just), [prek](https://prek.j178.dev), and for the PDF pandoc, BasicTeX and the Caladea font:

```sh
brew install bun just prek pandoc poppler
brew install --cask basictex font-caladea
just setup
```

## Tasks

Run `just` to list the recipes. The main ones:

- `just serve` builds the Site and serves it on <http://localhost:4000>.
- `just resume` renders `resume/resume.pdf` after editing `resume/resume.md`. Commit both.
- `just resume-private` renders a PDF with the phone number from `resume/contact.local.yaml` (gitignored; one line, `phone: "..."`).
- `just downloads` refreshes the download counts by hand.
- `just lint` runs every prek hook: oxfmt, oxlint, `bun check`, rumdl, typos, taplo, zizmor, and an offline lychee check of the built Site.
- `just ci-local` runs the workflow's build job in Docker with wrkflw.

## Deployment

`.github/workflows/site.yml` lints, builds and link-checks every push and pull request, and deploys pushes to `main`.

Every Monday it also refreshes the download counts and commits them before building. That commit keeps the repo active: GitHub turns off scheduled workflows in a public repo after 60 days without activity. Thunderstore's API sends no CORS headers, so the counts can't be fetched by the page itself.

The Pages source must be set to "GitHub Actions" in the repo settings.
