import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  if (command === "serve") {
    return {
      base: "/",
      plugins: [react()],
    };
  } else
    return {
      base: "/react-tutorial/",
      plugins: [react()],
    };
});
