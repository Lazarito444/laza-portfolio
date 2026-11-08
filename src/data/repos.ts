export interface Repo {
  id: string;
  name: string;
  /** Repo URL — cards link straight to GitHub. */
  url: string;
  pillKey: string;
  descKey: string;
  /** GitHub language dot colour. */
  color: string;
  lang: string;
  noteKey: string;
}

export const repos: Repo[] = [
  {
    id: "repo-seasonpal",
    name: "SeasonPal",
    url: "https://github.com/Lazarito444/SeasonPal",
    pillKey: "r1.pill",
    descKey: "r1.desc",
    color: "#00b4ab",
    lang: "Dart",
    noteKey: "r1.note",
  },
  {
    id: "repo-aroel",
    name: "Aroel",
    url: "https://github.com/Lazarito444/Aroel",
    pillKey: "r2.pill",
    descKey: "r2.desc",
    color: "#178600",
    lang: "C#",
    noteKey: "r2.note",
  },
  {
    id: "repo-questify",
    name: "Questify",
    url: "https://github.com/Lazarito444/Questify",
    pillKey: "r3.pill",
    descKey: "r3.desc",
    color: "#00b4ab",
    lang: "Dart",
    noteKey: "r3.note",
  },
  {
    id: "repo-expenselab",
    name: "ExpenseLab",
    url: "https://github.com/Lazarito444/ExpenseLab",
    pillKey: "r4.pill",
    descKey: "r4.desc",
    color: "#00b4ab",
    lang: "Dart",
    noteKey: "r4.note",
  },
  {
    id: "repo-lazainventory",
    name: "LazaInventory",
    url: "https://github.com/Lazarito444/LazaInventory",
    pillKey: "r5.pill",
    descKey: "r5.desc",
    color: "#178600",
    lang: "C#",
    noteKey: "r5.note",
  },
];
