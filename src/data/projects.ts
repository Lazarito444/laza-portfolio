export interface Project {
  /** Stable DOM id (data-od-id), also used by tests/tooling. */
  id: string;
  /** Ledger rows get a big outlined number; the featured case doesn't. */
  featured?: boolean;
  num?: string;
  /** Space-separated filter lanes the project belongs to. */
  lanes: string;
  pillKey: string;
  /** Renders the "live in prod" accent pill. */
  live?: boolean;
  titleKey: string;
  descKey: string;
  linkKey: string;
  tags: string[];
  /** Optional label above the terminal shot, e.g. FILE_01 / billing. */
  sideFile?: string;
  /** Terminal-style proof lines shown in the case side panel. */
  shot: string[];
  noteKey?: string;
}

export const projects: Project[] = [
  {
    id: "project-ledger",
    featured: true,
    lanes: "backend cloud",
    pillKey: "p1.pill",
    live: true,
    titleKey: "p1.title",
    descKey: "p1.desc",
    linkKey: "p1.link",
    tags: ["C# .NET 8", "Go", "Postgres", "Terraform"],
    sideFile: "FILE_01 / billing",
    shot: [
      "POST /v1/invoices → 201 · p95 84ms",
      "412 msgs · 0 retries",
    ],
    noteKey: "p1.note",
  },
  {
    id: "project-dispatch",
    num: "02",
    lanes: "frontend backend",
    pillKey: "p2.pill",
    titleKey: "p2.title",
    descKey: "p2.desc",
    linkKey: "p2.link",
    tags: ["Angular 18", "SignalR", "gRPC"],
    shot: [
      "ng test — 212 passed",
      "AA · keyboard-first",
    ],
  },
  {
    id: "project-fieldkit",
    num: "03",
    lanes: "mobile backend",
    pillKey: "p3.pill",
    titleKey: "p3.title",
    descKey: "p3.desc",
    linkKey: "p3.link",
    tags: ["Flutter", "Riverpod", "FCM"],
    shot: [
      "28.4 MB · 60fps",
      "LWW + tombstones",
    ],
  },
  {
    id: "project-platform",
    num: "04",
    lanes: "cloud backend",
    pillKey: "p4.pill",
    titleKey: "p4.title",
    descKey: "p4.desc",
    linkKey: "p4.link",
    tags: ["Azure · GCP", "Terraform", "Actions"],
    shot: [
      "plan: 12 add · 0 destroy",
      "rev 42 · 0-downtime",
    ],
  },
];
