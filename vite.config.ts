import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [react(), dts()],
  build: {
    cssCodeSplit: false,
    lib: {
      entry: "src/index.ts",
      name: "SelectComponent",
      fileName: "select-react",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name ?? "";
          if (name.endsWith(".css")) {
            return "select-react.css";
          }
          return "[name][extname]";
        },
      },
    },
  },
});
