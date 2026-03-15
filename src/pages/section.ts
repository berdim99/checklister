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

  // Session storage helpers
  const storageKey = `checklist:${aircraftId}:${sectionSlug}`;

  function saveCheckedState() {
    const indices: number[] = [];
    table.querySelectorAll("tr").forEach((row, i) => {
      if (row.querySelector<HTMLInputElement>("input")?.checked) {
        indices.push(i);
      }
    });
    sessionStorage.setItem(storageKey, JSON.stringify(indices));
  }

  function loadCheckedState(): Set<number> {
    try {
      const raw = sessionStorage.getItem(storageKey);
      return new Set(raw ? JSON.parse(raw) : []);
    } catch {
      return new Set();
    }
  }

  // Checklist table
  const table = document.createElement("table");
  table.className = "checklist-table";
  const checkedIndices = loadCheckedState();

  let itemIndex = 0;
  for (const item of section.items) {
    const currentIndex = itemIndex++;
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

    // Restore checked state from session
    if (checkedIndices.has(currentIndex)) {
      checkbox.checked = true;
      row.classList.add("checked");
    }

    // Click row to toggle checkbox
    row.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).tagName !== "INPUT") {
        checkbox.checked = !checkbox.checked;
        row.classList.toggle("checked", checkbox.checked);
        saveCheckedState();
      }
    });
    checkbox.addEventListener("change", () => {
      row.classList.toggle("checked", checkbox.checked);
      saveCheckedState();
    });

    table.appendChild(row);
  }

  app.appendChild(table);

  // Keyboard navigation
  const rows = Array.from(table.rows);
  let highlightedIndex = 0;

  function setHighlight(index: number) {
    rows[highlightedIndex]?.classList.remove("highlighted");
    highlightedIndex = Math.max(0, Math.min(index, rows.length - 1));
    const row = rows[highlightedIndex];
    row.classList.add("highlighted");
    row.scrollIntoView({ block: "nearest" });
  }

  // Move highlight on mouse click
  table.addEventListener("click", (e) => {
    const target = (e.target as HTMLElement).closest("tr");
    if (target) {
      const index = rows.indexOf(target as HTMLTableRowElement);
      if (index !== -1) {
        setHighlight(index);
      }
    }
  });

  if (rows.length > 0) {
    setHighlight(0);
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight(highlightedIndex + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight(highlightedIndex - 1);
    } else if (e.key === " ") {
      e.preventDefault();
      const row = rows[highlightedIndex];
      const checkbox = row.querySelector("input") as HTMLInputElement;
      checkbox.checked = !checkbox.checked;
      row.classList.toggle("checked", checkbox.checked);
      saveCheckedState();
      if (highlightedIndex < rows.length - 1) {
        setHighlight(highlightedIndex + 1);
      }
    }
  };

  document.addEventListener("keydown", onKeyDown);

  // Clean up listener when page changes
  const observer = new MutationObserver(() => {
    if (!app.contains(table)) {
      document.removeEventListener("keydown", onKeyDown);
      observer.disconnect();
    }
  });
  observer.observe(app, { childList: true });

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
