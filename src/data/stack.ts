export interface Skill {
  name: string;
  noteKey: string;
}

export interface Tier {
  id: string;
  /** First tier gets the accent gradient treatment. */
  accent?: boolean;
  titleKey: string;
  skills: Skill[];
}

export const tiers: Tier[] = [
  {
    id: "tier-daily",
    accent: true,
    titleKey: "stack.t1",
    skills: [
      { name: "C# / ASP.NET Core", noteKey: "stack.t1s1" },
      { name: "Go", noteKey: "stack.t1s2" },
      { name: "TypeScript / Angular", noteKey: "stack.t1s3" },
      { name: "Dart / Flutter", noteKey: "stack.t1s4" },
      { name: "Terraform + Actions", noteKey: "stack.t1s5" },
    ],
  },
  {
    id: "tier-fluent",
    titleKey: "stack.t2",
    skills: [
      { name: "Postgres + Redis", noteKey: "stack.t2s1" },
      { name: "gRPC + SignalR", noteKey: "stack.t2s2" },
      { name: "Docker / K8s basics", noteKey: "stack.t2s3" },
      { name: "Otel + Grafana", noteKey: "stack.t2s4" },
    ],
  },
  {
    id: "tier-familiar",
    titleKey: "stack.t3",
    skills: [
      { name: "Azure / GCP", noteKey: "stack.t3s1" },
      { name: "Playwright", noteKey: "stack.t3s2" },
      { name: "Fastlane / stores", noteKey: "stack.t3s3" },
    ],
  },
];
