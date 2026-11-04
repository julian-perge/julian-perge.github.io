import { join } from "node:path";

const resumeDir = join(import.meta.dir, "..", "resume");
const phoneMarker = "<!--phone-->";

/**
 * The Resume source keeps a `<!--phone-->` marker in its contact line instead of the number.
 * The Public resume drops the marker, and the Private resume swaps in the phone number
 * from the gitignored resume/contact.local.yaml.
 */
export async function resumeMarkdown(options: { private: boolean }): Promise<string> {
  const source = await Bun.file(join(resumeDir, "resume.md")).text();
  if (!source.includes(phoneMarker)) {
    throw new Error(`resume/resume.md has no ${phoneMarker} marker in its contact line`);
  }
  if (!options.private) {
    return source.replace(phoneMarker, "");
  }
  const contact = Bun.YAML.parse(await Bun.file(join(resumeDir, "contact.local.yaml")).text());
  const phone = (contact as { phone?: unknown } | null)?.phone;
  if (typeof phone !== "string" || phone === "") {
    throw new Error("resume/contact.local.yaml needs a `phone:` value for the Private resume");
  }
  return source.replace(phoneMarker, ` | ${phone}`);
}

if (import.meta.main) {
  process.stdout.write(await resumeMarkdown({ private: Bun.argv.includes("--private") }));
}
