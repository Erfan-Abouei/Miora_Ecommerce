import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
  // Global ignores
  {
    ignores: [
      "dist/",
      "build/",
      "node_modules/",
      ".git/",
      "**/*.js", // Skip plain JS files if your project is fully TypeScript
      "**/*.d.ts",
      "eslint.config.ts",
    ],
  },

  // Base recommended rules from ESLint core
  js.configs.recommended,

  // TypeScript-ESLint recommended + strict rules (highly recommended for better type safety)
  ...tseslint.configs.recommended,
  ...tseslint.configs.strict,
  // Optional: stylistic rules (only if you don't use Prettier)
  // ...tseslint.configs.stylistic,

  // Project-wide settings for TypeScript files
  {
    files: ["**/*.{ts,cts,mts}"],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        projectService: true, // Required for type-aware rules
        tsconfigRootDir: import.meta.dirname, // Works with ESM (recommended)
      },
    },
    rules: {
      // General good practices
      "no-console": "warn", // Allow console in development, warn in production
      eqeqeq: ["error", "always"], // Enforce === and !==
      "prefer-const": "error",
      "no-unused-vars": "off", // Handled by TypeScript-ESLint

      // TypeScript-specific improvements
      "@typescript-eslint/consistent-type-imports": "error", // Prefer `import type`
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/prefer-optional-chain": "warn",
      "@typescript-eslint/prefer-nullish-coalescing": "warn",

      // Async & Promise safety
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: false },
      ],

      // Optional but helpful
      "@typescript-eslint/explicit-function-return-type": [
        "warn",
        { allowExpressions: true, allowTypedFunctionExpressions: true },
      ],
      "@typescript-eslint/strict-boolean-expressions": [
        "warn",
        { allowNullableBoolean: true },
      ],

      // Avoid common bugs
      "no-await-in-loop": "warn",
      "no-prototype-builtins": "warn",
    },
  },

  // Optional: Config for JavaScript files (e.g., config files like vite.config.js)
  {
    files: ["**/*.{js,cjs,mjs}"],
    ...js.configs.recommended,
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      "no-console": "warn",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  }
);