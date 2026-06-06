export type TechItem = {
  name: string;
  /** Optional image in /public/images — if missing, canvas label is used */
  image?: string;
  bg: string;
  fg: string;
  subtitle?: string;
};

export const techStackItems: TechItem[] = [
  { name: "Python", bg: "#1e3a5f", fg: "#ffd43b", subtitle: "Py" },
  { name: "SQL", image: "/images/mysql.webp", bg: "#00758f", fg: "#ffffff" },
  { name: "AI/ML", bg: "#4c1d95", fg: "#c4b5fd", subtitle: "AI" },
  { name: "SEO", bg: "#14532d", fg: "#86efac", subtitle: "SEO" },
  { name: "n8n", bg: "#7f1d1d", fg: "#ff6d5a", subtitle: "n8n" },
  { name: "Django", bg: "#092e20", fg: "#ffffff", subtitle: "Dj" },
  { name: "Flask", bg: "#1f2937", fg: "#e5e7eb", subtitle: "Fl" },
  { name: "Automation", bg: "#312e81", fg: "#a5b4fc", subtitle: "⚡" },
];
