import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base must match the repo name so asset paths resolve on GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: "/aahc-study-app/",
});
