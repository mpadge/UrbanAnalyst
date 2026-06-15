import { defineConfig, globalIgnores } from "eslint/config";
import tsParser from "@typescript-eslint/parser";
import nextConfig from "eslint-config-next/core-web-vitals";

export default defineConfig([
    globalIgnores(["**/pkg/", "**/coverage/", "**/next.config.js"]),
    ...nextConfig,
    // Override the Next.js Babel parser with @typescript-eslint/parser, which
    // implements the scopeManager.addGlobals API required by ESLint 10.
    {
        files: ["**/*.{js,jsx,mjs,ts,tsx,mts,cts}"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
        },
    },
    {
        files: ["**/*.ts", "**/*.tsx"],
        rules: {
            "@typescript-eslint/explicit-function-return-type": "warn",
            "@typescript-eslint/no-unused-vars": ["error", {
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_",
            }],
        },
    },
    {
        files: ["**/*.{js,jsx,mjs,ts,tsx,mts,cts}"],
        rules: {
            "no-console": "warn",
            "no-debugger": "warn",
            "jsx-a11y/no-autofocus": "warn",
            "react/jsx-no-target-blank": "warn",
        },
    },
    {
        files: ["**/*.test.ts", "**/*.test.tsx"],
        rules: {
            "no-unused-vars": ["error", {
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_",
            }],
            "@typescript-eslint/explicit-function-return-type": "off",
            "@next/next/no-img-element": "off",
        },
    },
]);
