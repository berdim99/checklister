import { getChecklist, slugify } from "../data";

export function renderSection(
  app: HTMLElement,
  aircraftId: string,
  sectionSlug: string
): void {
  const checklist = getChecklist(aircraftId);
  if (!checklist) {
    app.textContent = "Aircraft not found.";
    return;
  }

  const sectionIndex = checklist.sections.findIndex(
    (s) => slugify(s.name) === sectionSlug
  );
  if (sectionIndex === -1) {
    app.textContent = "Section not found.";
    return;
  }

  const section = checklist.sections[sectionIndex];

  // Header with aircraft name
  const header = document.createElement("div");
  header.className = "section-header";

  const backLink = document.createElement("a");
  backLink.href = "#/";
  backLink.textContent = "\u2190 Home";
  backLink.className = "back-link";
  header.appendChild(backLink);

  const aircraft = document.createElement("span");
  aircraft.className = "aircraft-name";
  aircraft.textContent = checklist.name;
  header.appendChild(aircraft);

  app.appendChild(header);

  // Section nav tabs
  const nav = document.createElement("nav");
  nav.className = "section-nav";
  for (let i = 0; i < checklist.sections.length; i++) {
    const s = checklist.sections[i];
    const link = document.createElement("a");
    link.href = `#/${aircraftId}/${slugify(s.name)}`;
    link.textContent = s.name;
    link.className = i === sectionIndex ? "nav-tab active" : "nav-tab";
    nav.appendChild(link);
  }
  app.appendChild(nav);

  // Section heading
  const heading = document.createElement("h2");
  heading.textContent = section.name;
  app.appendChild(heading);

  // Checklist table
  const table = document.createElement("table");
  table.className = "checklist-table";

  for (const item of section.items) {
    const row = document.createElement("tr");

    const checkCell = document.createElement("td");
    checkCell.className = "check-cell";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkCell.appendChild(checkbox);
    row.appendChild(checkCell);

    const actionCell = document.createElement("td");
    actionCell.className = "action-cell";
    actionCell.textContent = item.action;
    row.appendChild(actionCell);

    const valueCell = document.createElement("td");
    valueCell.className = "value-cell";
    valueCell.textContent = item.value ?? "";
    row.appendChild(valueCell);

    // Click row to toggle checkbox
    row.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).tagName !== "INPUT") {
        checkbox.checked = !checkbox.checked;
        row.classList.toggle("checked", checkbox.checked);
      }
    });
    checkbox.addEventListener("change", () => {
      row.classList.toggle("checked", checkbox.checked);
    });

    table.appendChild(row);
  }

  app.appendChild(table);

  // Prev/Next buttons
  const footer = document.createElement("div");
  footer.className = "section-footer";

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "\u2190 Previous";
  prevBtn.className = "nav-btn";
  if (sectionIndex === 0) {
    prevBtn.disabled = true;
  } else {
    prevBtn.addEventListener("click", () => {
      location.hash = `#/${aircraftId}/${slugify(checklist.sections[sectionIndex - 1].name)}`;
    });
  }
  footer.appendChild(prevBtn);

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next \u2192";
  nextBtn.className = "nav-btn";
  if (sectionIndex === checklist.sections.length - 1) {
    nextBtn.disabled = true;
  } else {
    nextBtn.addEventListener("click", () => {
      location.hash = `#/${aircraftId}/${slugify(checklist.sections[sectionIndex + 1].name)}`;
    });
  }
  footer.appendChild(nextBtn);

  app.appendChild(footer);
}
