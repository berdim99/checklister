import { getChecklists } from "../data";

export function renderHome(app: HTMLElement): void {
  const heading = document.createElement("h1");
  heading.textContent = "Checklister";
  app.appendChild(heading);

  const subtitle = document.createElement("p");
  subtitle.textContent = "Select an aircraft to begin.";
  subtitle.className = "subtitle";
  app.appendChild(subtitle);

  const list = document.createElement("div");
  list.className = "aircraft-list";

  for (const checklist of getChecklists()) {
    const btn = document.createElement("a");
    btn.className = "aircraft-btn";
    btn.href = `#/${checklist.id}`;
    btn.textContent = checklist.name;
    list.appendChild(btn);
  }

  app.appendChild(list);
}
