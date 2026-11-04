# BasicTeX installs xelatex here without adding it to any shell's PATH.
export PATH := "/Library/TeX/texbin:" + env_var("PATH")

pandoc_pdf := "pandoc --from markdown --pdf-engine=xelatex -V mainfont=Caladea -V fontsize=10pt -V geometry:margin=0.5in -H resume/header.tex"

# List the recipes.
default:
    @just --list

# Install dependencies and the prek git hook.
setup:
    bun install --frozen-lockfile
    prek install

# Build the Site into dist/.
build:
    bun run build

# Build the Site and serve dist/ on http://localhost:4000.
serve: build
    #!/usr/bin/env bun
    Bun.serve({
      port: 4000,
      fetch(req) {
        const path = new URL(req.url).pathname;
        return new Response(Bun.file("dist" + (path.endsWith("/") ? path + "index.html" : path)));
      },
    });
    console.log("http://localhost:4000");

# Fetch fresh Thunderstore download counts into content/downloads.json.
downloads:
    bun run src/downloads.ts

# Render the Public resume to resume/resume.pdf, which gets committed.
resume:
    bun run src/resume.ts | {{ pandoc_pdf }} -o resume/resume.pdf
    pdfinfo resume/resume.pdf | rg '^Pages'

# Render the Private resume, with the phone number from resume/contact.local.yaml, for job applications.
resume-private:
    bun run src/resume.ts --private | {{ pandoc_pdf }} -o resume/resume.private.pdf
    @echo "Wrote resume/resume.private.pdf (gitignored, never publish it)"

# Run every prek hook against every file.
lint:
    prek run --all-files
