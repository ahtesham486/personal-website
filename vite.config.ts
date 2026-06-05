import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2020",
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three"],
          gsap: ["gsap", "gsap-trial"],
          r3f: ["@react-three/fiber", "@react-three/drei", "@react-three/rapier"],
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
});
