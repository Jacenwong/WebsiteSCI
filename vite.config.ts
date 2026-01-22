import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/",
  server: {
    host: "localhost",
    port: 8080,
    hmr: {
      overlay: true, // Show errors in browser overlay
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  preview: {
    port: 8080,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split vendor chunks for better caching
          if (id.includes('node_modules')) {
            // Large libraries get their own chunks
            if (id.includes('three') || id.includes('three-stdlib')) {
              return 'vendor-three';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-framer';
            }
            if (id.includes('@radix-ui')) {
              return 'vendor-radix';
            }
            if (id.includes('@react-three')) {
              return 'vendor-react-three';
            }
            // Other node_modules
            return 'vendor';
          }
        },
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild', // Faster than terser, Vite's default
    chunkSizeWarningLimit: 1000, // Warn if chunk exceeds 1MB
    reportCompressedSize: true, // Report compressed sizes
    cssCodeSplit: true, // Split CSS into separate files
    cssMinify: true, // Minify CSS
  },
}));
