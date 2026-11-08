export interface Project {
  /** Stable DOM id (data-od-id), also used by tests/tooling. */
  id: string;
  /** Ledger rows get a big outlined number; the featured case doesn't. */
  featured?: boolean;
  num?: string;
  /** Space-separated filter lanes the project belongs to. */
  lanes: string;
  pillKey: string;
  /** Renders the "latest" accent pill. */
  live?: boolean;
  titleKey: string;
  descKey: string;
  linkKey: string;
  /** Real public repo URL the card links to. */
  link: string;
  tags: string[];
  /** Optional label above the terminal shot, e.g. FILE_01 / seasonpal. */
  sideFile?: string;
  /** Terminal-style proof lines shown in the case side panel. */
  shot: string[];
  noteKey?: string;
}

export const GH = "https://github.com/Lazarito444";

export const projects: Project[] = [
  {
    id: "project-seasonpal",
    featured: true,
    lanes: "mobile frontend",
    pillKey: "p1.pill",
    live: true,
    titleKey: "p1.title",
    descKey: "p1.desc",
    linkKey: "p1.link",
    link: `${GH}/SeasonPal`,
    tags: ["Flutter", "Dart", "AI"],
    sideFile: "FILE_01 / seasonpal",
    shot: [
      "flutter · dart",
      "recipes · collections · community",
    ],
    noteKey: "p1.note",
  },
  {
    id: "project-aroel",
    num: "02",
    lanes: "frontend backend",
    pillKey: "p2.pill",
    titleKey: "p2.title",
    descKey: "p2.desc",
    linkKey: "p2.link",
    link: `${GH}/Aroel`,
    tags: ["C#", ".NET"],
    shot: [
      "docs/scope-and-design.md",
      "warm-paper design system",
    ],
  },
  {
    id: "project-questify",
    num: "03",
    lanes: "mobile backend",
    pillKey: "p3.pill",
    titleKey: "p3.title",
    descKey: "p3.desc",
    linkKey: "p3.link",
    link: `${GH}/Questify`,
    tags: ["Flutter", "Drift", "Riverpod"],
    shot: [
      "clean architecture + DDD",
      "offline-first · sqlite ledger",
    ],
  },
  {
    id: "project-expenselab",
    num: "04",
    lanes: "mobile",
    pillKey: "p4.pill",
    titleKey: "p4.title",
    descKey: "p4.desc",
    linkKey: "p4.link",
    link: `${GH}/ExpenseLab`,
    tags: ["Flutter", "Dart"],
    shot: [
      "// focus",
      "visual clarity · insights",
    ],
  },
];
