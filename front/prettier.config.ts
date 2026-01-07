import { type Config } from "prettier";

/**
 * Prettier configuration for code formatting.
 *
 * - Double quotes, semicolons required
 * - 2-space indentation, 100 char line width
 * - Trailing commas, bracket spacing enabled
 * - LF line endings
 * - Tailwind class sorting plugin
 */
const config: Config = {
  bracketSpacing: true,
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  printWidth: 100,
  endOfLine: "lf",
  importOrder: [
    // 1. React and Next.js (Grouped together, no space between them)
    "^react($|/)",
    "^next($|/)",
    "",
    // 2. Built-in Modules (separated by space above)
    "<BUILTIN_MODULES>",
    "",
    // 3. Third Party Imports (separated by space above)
    "<THIRD_PARTY_MODULES>",
    "",
    // 4. Internal Imports (separated by space above)
    "^@/",
    "",
    // 5. Relative Imports (separated by space above)
    "^[./]",
  ],
  // Essential: Enable specific parsers for this plugin to work
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
};

export default config;
