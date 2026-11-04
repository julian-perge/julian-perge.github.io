---
name: resume
description: Edit Julian's resume in this repo. Use when adding or rewording resume bullets, updating dates, skills or project download counts, or rendering the resume PDF.
---

# Resume

`resume/resume.md` is the Resume source: the one file Julian edits. The Site's Resume page and the committed `resume/resume.pdf` are both built from it, so they are public. `GLOSSARY.md` defines Resume source, Public resume and Private resume.

## Steps

1. **Edit `resume/resume.md`.** The contact line carries a `<!--phone-->` marker where the phone number goes. Leave the marker in place and keep the number itself in the gitignored `resume/contact.local.yaml`. Lines starting with `\` are LaTeX spacing for the PDF and are dropped from the HTML page.
2. **Write every bullet to the bullet pattern below.** Each number must come from evidence Julian gave, never from an estimate.
3. **Render with `just resume`.** Done when it prints `Pages: 2`. At 3 pages, propose specific trims to Julian rather than shrinking the font or margins.
4. **Run `just lint`.** Done when every hook passes. It rebuilds the Site and checks its links.
5. Render the Private resume with `just resume-private` only when Julian asks for one for an application.

## Bullet pattern

```text
[Action verb] [what was built or changed] [named tech] [concrete number]
```

- **Action verb:** past tense, first word. Architected, Built, Designed, Migrated, Implemented, Mentored, Reengineered, Improved, Cut, Reduced, Eliminated, Replaced, Integrated, Automated, Standardized, Unified, Rolled out, Decommissioned, Optimized, Drove, Consolidated, Hardened.
- **Scope:** named systems, environments, team or repo counts.
- **Tech:** specific tools and services, not categories.
- **Number:** a count, percentage, dollar amount, duration or scale. A bullet without one is not finished.

Bullets are one or two rendered lines. When a later piece of work extends an existing bullet, append it as a "Later ..." sentence instead of adding a bullet. Roles get 3-7 bullets, except the most recent one.

Write outcomes the reader can verify. Leave out self-assessment ("enthusiastic", "self-taught") and outcomes with no number ("improved reliability").

## Download counts

Personal Projects counts are rounded down to a round figure ("150,000+") so the committed PDF stays true as they grow. Current exact counts are in `content/downloads.json`, which the weekly GitHub Actions run refreshes.
