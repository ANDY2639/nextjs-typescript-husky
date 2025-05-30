import js from '@eslint/js'
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const eslintConfig = [
  ...compat.config({
    ignorePatterns: [
      "node_modules/**",
      ".next/**",
      ".cache/**",
      "public/**",
      "next-env.d.ts",
      "next.config.ts",
      "tsconfig.json",
      "package-lock.json",
      "package.json",
      "yarn.lock",
      "postcss.config.mjs",
      ".prettierrc",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
    extends: [
      "next",
      "eslint:recommended",
      "prettier",
      "next/core-web-vitals",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "plugin:prettier/recommended",
      "plugin:react-hooks/recommended",
    ],
    plugins: ["@typescript-eslint", "prettier", "react", "react-hooks"],
    rules: {
      'react/react-in-jsx-scope': 'off', // React 17+ no requiere React en scope
      'react/prop-types': 'off',
      'prettier/prettier': [
        'error',
        {
          singleQuote: false,
        }
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-inferrable-types': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  }),
];

export default eslintConfig;
