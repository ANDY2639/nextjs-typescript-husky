import js from '@eslint/js'
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  ...compat.config({
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
    plugins: ["prettier", "@typescript-eslint", "react", "react-hooks"],
    rules: {
      // React 17+ no requiere React en scope
      'react/react-in-jsx-scope': 'off',

      'prettier/prettier': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  }),
];

export default eslintConfig;
