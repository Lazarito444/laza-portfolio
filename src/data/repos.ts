export interface Repo {
  id: string;
  name: string;
  pillKey: string;
  descKey: string;
  /** GitHub language dot colour. */
  color: string;
  lang: string;
  noteKey: string;
}

export const repos: Repo[] = [
  {
    id: "repo-outbox",
    name: "dotnet-outbox-starter",
    pillKey: "r1.pill",
    descKey: "r1.desc",
    color: "#a78bfa",
    lang: "C#",
    noteKey: "r1.note",
  },
  {
    id: "repo-go",
    name: "go-pgx-worker",
    pillKey: "r2.pill",
    descKey: "r2.desc",
    color: "#22d3ee",
    lang: "Go",
    noteKey: "r2.note",
  },
  {
    id: "repo-ng",
    name: "ng-openapi-signals",
    pillKey: "r3.pill",
    descKey: "r3.desc",
    color: "#fb7185",
    lang: "TypeScript",
    noteKey: "r3.note",
  },
  {
    id: "repo-fl",
    name: "flutter-offline-queue",
    pillKey: "r4.pill",
    descKey: "r4.desc",
    color: "#60a5fa",
    lang: "Dart",
    noteKey: "r4.note",
  },
  {
    id: "repo-tf",
    name: "tf-preview-env",
    pillKey: "r5.pill",
    descKey: "r5.desc",
    color: "#fbbf24",
    lang: "HCL",
    noteKey: "r5.note",
  },
];
