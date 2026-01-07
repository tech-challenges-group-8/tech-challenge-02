import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const dashboardRemoteUrl = `${env.VITE_DASHBOARD_URL}/assets/remoteEntry.js`;

  return {
    plugins: [
      react(),
      federation({
        name: "host",
        remotes: {
          dashboard: dashboardRemoteUrl,
        },
        shared: ["react", "react-dom"],
      }),
    ],
    build: {
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },
    server: {
      port: 3000,
    },
  };
});