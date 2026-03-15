# Checklister

A lightweight, browser-based checklist app for aircraft procedures. Built with TypeScript and Vite — no framework required.

FOR FLIGHT SIMULATOR USE ONLY.

## Features

- Checklists defined in simple YAML files
- Keyboard navigation (arrow keys, space to check)
- Session-based progress tracking
- Works entirely in the browser — no backend needed

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later

### Install & Run

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (default: http://localhost:5173).

### Build for Production

```bash
npm run build
npm run preview
```

The production output is written to the `dist/` directory.

## Adding a Checklist

To add a new aircraft checklist, create a YAML file in the `data/` directory (e.g. `data/my_aircraft_checklist.yaml`). Any `.yaml` file in that folder is automatically picked up — no code changes needed.

### YAML Structure

```yaml
id: my-aircraft
name: My Aircraft
sections:
  - name: Pre-Flight
    items:
      - action: Parking Brake
        value: "ON"
      - action: Flaps
        value: Retracted
  - name: Taxi
    items:
      - action: Navigation Lights
        value: "ON"
```

- **id** — unique identifier used in the URL (lowercase, hyphens)
- **name** — display name shown in the app
- **sections** — list of checklist sections, each with a **name** and **items**
- **items** — each item has an **action** (required) and an optional **value**

Wrap values like `"ON"` and `"OFF"` in quotes so YAML doesn't interpret them as booleans.

## Reporting Bugs

Found a bug or have a suggestion? Please [open an issue](https://github.com/berdim99/checklister/issues) on GitHub.

When reporting a bug, include:

- A clear description of the problem
- Steps to reproduce
- Expected vs. actual behavior
- Browser and OS info

## License

See [LICENSE](LICENSE) for details.
