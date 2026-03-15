import { getChecklist, slugify } from "./data";
import { renderHome } from "./pages/home";
import { renderSection } from "./pages/section";

type Route =
  | { type: "home" }
  | { type: "section"; aircraftId: string; sectionSlug: string };

function parseHash(): Route {
  const hash = location.hash.replace(/^#\/?/, "");
  if (!hash) return { type: "home" };

  const parts = hash.split("/");
  const aircraftId = parts[0];
  const sectionSlug = parts[1];

  if (!sectionSlug) {
    const checklist = getChecklist(aircraftId);
    if (checklist && checklist.sections.length > 0) {
      location.hash = `#/${aircraftId}/${slugify(checklist.sections[0].name)}`;
    }
    return { type: "home" };
  }

  return { type: "section", aircraftId, sectionSlug };
}

function render(route: Route): void {
  const app = document.getElementById("app")!;
  app.innerHTML = "";

  switch (route.type) {
    case "home":
      renderHome(app);
      break;
    case "section":
      renderSection(app, route.aircraftId, route.sectionSlug);
      break;
  }

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML =
    '© 2026 Micha B. · <a href="https://github.com/berdim99/checklister/" target="_blank" rel="noopener">GitHub</a> · FOR FLIGHT SIMULATOR USE ONLY';
  app.appendChild(footer);
}

export function initRouter(): void {
  const onRoute = () => render(parseHash());
  window.addEventListener("hashchange", onRoute);
  onRoute();
}
