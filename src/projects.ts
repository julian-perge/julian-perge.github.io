export type Project = {
  name: string;
  url: string;
  game: string;
  /** Markdown, one sentence. */
  description: string;
  /** Thunderstore community slug, e.g. "inscryption". */
  community?: string;
  /** Thunderstore packages as "Namespace/Name". Their download counts are summed. */
  packages?: string[];
};

export const projects: Project[] = [
  {
    name: "OpenMonitors",
    url: "https://github.com/julian-perge/LC_OpenMonitors",
    game: "Lethal Company",
    description:
      "Turns the ship's monitors into live teammate cameras, planet weather and crew alive/dead status, using the game's own monitors instead of a new UI layer.",
    community: "lethal-company",
    packages: ["JulianMods/OpenMonitors"],
  },
  {
    name: "GrimoraMod",
    url: "https://github.com/Arackulele/GrimoraMod",
    game: "Inscryption",
    description:
      "Rebuilt the mod that turns Grimora's finale into a full fourth act, with 2,348 commits as its top contributor.",
    community: "inscryption",
    packages: ["Arackulele/GrimoraMod"],
  },
  {
    name: "InscryptionAPI",
    url: "https://github.com/InscryptionModding/InscryptionAPI",
    game: "Inscryption",
    description:
      "The mod loader the whole Inscryption modding scene builds on. I contributed 21 pull requests and ~85 commits as part of its maintainer team.",
    community: "inscryption",
    packages: ["API_dev/API"],
  },
  {
    name: "Inscryption mods",
    url: "https://github.com/julian-perge/InscryptionMods",
    game: "Inscryption",
    description:
      "Four smaller mods: [IncreaseActOneCardSlots](https://thunderstore.io/c/inscryption/p/JulianMods/IncreaseActOneCardSlots/), [IncreaseActTwoCardSlots](https://thunderstore.io/c/inscryption/p/JulianMods/IncreaseActTwoCardSlots/), [HealthForAnts](https://thunderstore.io/c/inscryption/p/JulianMods/HealthForAnts/) and [SigilADay](https://thunderstore.io/c/inscryption/p/JulianMods/SigilADay_julianperge/).",
    community: "inscryption",
    packages: [
      "JulianMods/IncreaseActOneCardSlots",
      "JulianMods/IncreaseActTwoCardSlots",
      "JulianMods/HealthForAnts",
      "JulianMods/SigilADay_julianperge",
    ],
  },
  {
    name: "ModularPlanters",
    url: "https://github.com/julian-perge/ModularPlanters",
    game: "Minecraft",
    description:
      "Joins Agritech: Evolved planters into one multiblock with shared power, fertilizer and outputs.",
  },
  {
    name: "urchin",
    url: "https://github.com/julian-perge/urchin",
    game: "Godot",
    description: "A fan remake of an Armor Games game.",
  },
];
