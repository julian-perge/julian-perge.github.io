import { cp, mkdir, rm } from "node:fs/promises";
import { join } from "node:path";
import { readDownloads, type DownloadCounts } from "./downloads.ts";
import { projects } from "./projects.ts";
import { resumeMarkdown } from "./resume.ts";

const root = join(import.meta.dir, "..");
const dist = join(root, "dist");
const repoUrl = "https://github.com/julian-perge/julian-perge.github.io";
const pdfName = "julian-perge-resume.pdf";

const markdownOptions = { headings: { ids: true }, autolinks: true } as const;

function commitSha(): string {
  const git = Bun.spawnSync(["git", "rev-parse", "HEAD"], { cwd: root });
  return git.success ? git.stdout.toString().trim() : "unknown";
}

function page(options: { title: string; description: string; path: string; body: string }): string {
  const sha = commitSha();
  const builtOn = new Date().toISOString().slice(0, 10);
  const navLink = (href: string, label: string) =>
    `<a href="${href}"${href === options.path ? ' aria-current="page"' : ""}>${label}</a>`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="${options.description}">
<meta name="color-scheme" content="light dark">
<title>${options.title}</title>
<link rel="stylesheet" href="/style.css">
</head>
<body>
<header class="site-nav">
<nav aria-label="Main">
${navLink("/", "Home")}
${navLink("/resume/", "Resume")}
<a href="https://github.com/julian-perge">GitHub</a>
<a href="https://linkedin.com/in/julian-perge">LinkedIn</a>
</nav>
</header>
<main>
${options.body}
</main>
<footer class="site-footer">
<a href="${repoUrl}">Source on GitHub</a> | Built from <a href="${repoUrl}/commit/${sha}"><code>${sha.slice(0, 7)}</code></a> on ${builtOn}
</footer>
</body>
</html>
`;
}

function projectsMarkdown(counts: DownloadCounts): string {
  const lines = projects.map((project) => {
    let line = `- **[${project.name}](${project.url})** (${project.game}): ${project.description}`;
    if (project.packages && project.community) {
      const total = project.packages.reduce((sum, pkg) => sum + (counts.downloads[pkg] ?? 0), 0);
      const [first] = project.packages;
      const storeUrl =
        project.packages.length === 1 && first
          ? `https://thunderstore.io/c/${project.community}/p/${first}/`
          : `https://thunderstore.io/c/${project.community}/p/${first?.split("/")[0]}/`;
      const combined = project.packages.length > 1 ? " combined" : "";
      line += ` ${total.toLocaleString("en-US")} downloads${combined} on [Thunderstore](${storeUrl}).`;
    }
    return line;
  });
  return `${lines.join("\n")}\n\nDownload counts as of ${counts.fetchedOn}.`;
}

async function buildHome(): Promise<void> {
  const source = await Bun.file(join(root, "content", "index.md")).text();
  const marker = "<!--projects-->";
  if (!source.includes(marker)) {
    throw new Error(`content/index.md has no ${marker} marker for the project list`);
  }
  const markdown = source.replace(marker, projectsMarkdown(await readDownloads()));
  await Bun.write(
    join(dist, "index.html"),
    page({
      title: "Julian Perge",
      description: "Julian Perge, platform and DevOps engineer in Columbus, OH.",
      path: "/",
      body: Bun.markdown.html(markdown, markdownOptions),
    }),
  );
}

async function buildResume(): Promise<void> {
  const pdf = Bun.file(join(root, "resume", "resume.pdf"));
  if (!(await pdf.exists())) {
    throw new Error("resume/resume.pdf is missing. Run `just resume` to render it.");
  }
  await mkdir(join(dist, "resume"), { recursive: true });
  await Bun.write(join(dist, "resume", pdfName), pdf);

  // Lines starting with a backslash are LaTeX spacing commands that only mean something to pandoc.
  const resume = (await resumeMarkdown({ private: false }))
    .split("\n")
    .filter((line) => !line.startsWith("\\"))
    .join("\n");
  const lookingFor = await Bun.file(join(root, "content", "looking-for.md")).text();
  const body = `<p class="download"><a href="/resume/${pdfName}" download>Download PDF</a></p>
<section class="looking-for">
${Bun.markdown.html(lookingFor, markdownOptions)}</section>
<article class="resume">
${Bun.markdown.html(resume, markdownOptions)}</article>`;
  await Bun.write(
    join(dist, "resume", "index.html"),
    page({
      title: "Resume | Julian Perge",
      description: "Resume of Julian Perge, platform and DevOps engineer.",
      path: "/resume/",
      body,
    }),
  );
}

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(join(root, "src", "style.css"), join(dist, "style.css"));
await Promise.all([buildHome(), buildResume()]);
console.log(`Built the Site into ${dist}`);
