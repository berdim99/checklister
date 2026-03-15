import { defineConfig } from "vite";
import yaml from "@modyfi/vite-plugin-yaml";

export default defineConfig({
  plugins: [yaml()],
  server: { host: "127.0.0.1" },
});
