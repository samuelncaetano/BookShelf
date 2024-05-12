import { coverageConfigDefaults, defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import AutoImport from "unplugin-auto-import/vite";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    AutoImport({
      imports: ["vitest"],
      dts: true,
    }),
  ],
  resolve: {
    alias: {
      "@application": "/src/application",
      "@domain": "/src/domain",
      "@infrastructure": "/src/infrastructure",
      "@main": "/src/main",
    },
  },
  test: {
    coverage: {
      provider: "v8",
      exclude: [
        "**/prismaCreateBooks.ts",
        "**/createBookFactory.ts",
        "**/createBookController.ts",
        "**/routes/**",
        "**/prisma/**",
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
});
