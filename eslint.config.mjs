import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// prettier 套件
import prettierConfig from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // 啟用 Prettier plugin
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },

  prettierConfig,

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
