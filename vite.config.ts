import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Otimização de chunks para melhor code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-animation": ["framer-motion"],
          "vendor-ui": ["lucide-react", "sonner"],
          "vendor-radix": ["@radix-ui/react-dialog"],
          "vendor-three": ["three", "@react-three/fiber", "@react-three/drei"],
        },
      },
    },
    
    // Aumentar o chunk size limit aviso (já que temos Three.js)
    chunkSizeWarningLimit: 1024,

    // Reportcompressedsize desativado para builds mais rápidos
    reportCompressedSize: false,
  },
}));
