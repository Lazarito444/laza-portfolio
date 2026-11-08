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
      { name: "TypeScript / Angular", noteKey: "stack.t1s2" },
      { name: "Dart / Flutter", noteKey: "stack.t1s3" },
      { name: "SQL Server + PostgreSQL", noteKey: "stack.t1s4" },
      { name: "Git + GitHub", noteKey: "stack.t1s5" },
    ],
  },
  {
    id: "tier-fluent",
    titleKey: "stack.t2",
    skills: [
      { name: ".NET Framework", noteKey: "stack.t2s1" },
      { name: "MongoDB", noteKey: "stack.t2s2" },
      { name: "REST / OpenAPI", noteKey: "stack.t2s3" },
      { name: "Postman", noteKey: "stack.t2s4" },
    ],
  },
  {
    id: "tier-familiar",
    titleKey: "stack.t3",
    skills: [
      { name: "Azure", noteKey: "stack.t3s1" },
      { name: "TDD + Agile", noteKey: "stack.t3s2" },
      { name: "Clean Architecture + DDD", noteKey: "stack.t3s3" },
    ],
  },
];
