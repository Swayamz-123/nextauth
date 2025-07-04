import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Apply base config
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  // Add overrides for custom rules
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn", // Change to warning instead of error
      "react/no-unescaped-entities": "warn", // Change to warning instead of error
    },
  },
];

export default eslintConfig;