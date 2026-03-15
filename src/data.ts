import type { Checklist } from "./types";

const modules = import.meta.glob("/data/*.yaml", { eager: true });

const checklists: Checklist[] = Object.values(modules).map(
  (m) => (m as { default: Checklist }).default
);

export function getChecklists(): Checklist[] {
  return checklists;
}

export function getChecklist(id: string): Checklist | undefined {
  return checklists.find((c) => c.id === id);
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
