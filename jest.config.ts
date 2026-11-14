import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^next/image$": "<rootDir>/__mocks__/next-image.tsx",
  },
  testMatch: ["**/__tests__/**/*.test.tsx", "**/__tests__/**/*.test.ts"],
  collectCoverageFrom: [
    "src/components/**/*.{ts,tsx}",
    "!src/components/ui/**",
  ],
};

// react-markdown と remark の仲間は ESM だけで配られているので、Jest で変換する
const ESM_PACKAGES = [
  "react-markdown", "remark-.*", "mdast-.*", "micromark.*", "unist-.*", "unified", "bail",
  "is-plain-obj", "trough", "vfile.*", "hast-.*", "property-information", "space-separated-tokens",
  "comma-separated-tokens", "decode-named-character-reference", "character-entities.*", "ccount",
  "escape-string-regexp", "markdown-table", "longest-streak", "zwitch", "devlop",
  "html-url-attributes", "trim-lines", "estree-util-.*", "style-to-.*", "inline-style-parser",
  "@ungap", "is-.*",
].join("|");

export default async function jestConfig() {
  const resolved = await createJestConfig(config)();
  resolved.transformIgnorePatterns = [`/node_modules/(?!(${ESM_PACKAGES})/)`];
  return resolved;
}
