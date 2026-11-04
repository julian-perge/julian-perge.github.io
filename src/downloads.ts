import { join } from "node:path";
import { projects } from "./projects.ts";

export type DownloadCounts = {
  /** The date the counts were last fetched from Thunderstore, as YYYY-MM-DD. */
  fetchedOn: string;
  /** Total downloads per Thunderstore package, keyed by "Namespace/Name". */
  downloads: Record<string, number>;
};

export const downloadsFile = join(import.meta.dir, "..", "content", "downloads.json");

export async function readDownloads(): Promise<DownloadCounts> {
  return Bun.file(downloadsFile).json();
}

async function fetchPackageDownloads(pkg: string): Promise<number> {
  const response = await fetch(`https://thunderstore.io/api/v1/package-metrics/${pkg}/`, {
    headers: { "User-Agent": "julian-perge.github.io build" },
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) {
    throw new Error(`Thunderstore returned HTTP ${response.status} for ${pkg}`);
  }
  const body = (await response.json()) as { downloads?: unknown };
  if (typeof body.downloads !== "number") {
    throw new Error(`Thunderstore returned no download count for ${pkg}`);
  }
  return body.downloads;
}

/**
 * Fetches every package's count and rewrites content/downloads.json only if all of them succeed,
 * so a partial Thunderstore outage never mixes fresh and stale numbers under one date.
 * The weekly GitHub Actions run calls this and commits the file. The new date means there is always
 * a commit, which keeps the repo active so GitHub never turns off the weekly schedule.
 */
export async function refreshDownloads(): Promise<void> {
  const packages = projects.flatMap((project) => project.packages ?? []);
  const counts = await Promise.all(packages.map(fetchPackageDownloads));
  const refreshed: DownloadCounts = {
    fetchedOn: new Date().toISOString().slice(0, 10),
    downloads: Object.fromEntries(packages.map((pkg, i) => [pkg, counts[i] ?? 0])),
  };
  await Bun.write(downloadsFile, `${JSON.stringify(refreshed, null, 2)}\n`);
  console.log(`Wrote ${packages.length} download counts to ${downloadsFile}`);
}

if (import.meta.main) {
  await refreshDownloads();
}
