import { coverageConfigDefaults, defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import AutoImport from "unplugin-auto-import/vite";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    AutoImport({
      imports: ["vitest"],
      dts: false,
    }),
  ],
  resolve: {
    alias: {
      "@application": "/src/application",
      "@domain": "/src/domain",
      "@infrastructure": "/src/infrastructure",
      "@main": "/src/main/config/helpers",
    },
  },
  test: {
    coverage: {
      provider: "v8",
      exclude: [
        "**/prisma/**",
        "**/controllers/**",
        "**/BookFactory.ts",
        "**/routes/**",
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
});
