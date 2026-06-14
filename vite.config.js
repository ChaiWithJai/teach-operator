import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { adhdBridge } from "./vite-plugin-adhd-bridge.js";

export default defineConfig({
  plugins: [svelte(), adhdBridge()],
  server: { port: 7890, strictPort: false, open: false },
  preview: { port: 7890, strictPort: false },
});
