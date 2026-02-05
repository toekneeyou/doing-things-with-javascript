// eslint.config.js
import { defineConfig } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";

export default defineConfig([
  {
    ignores: ["node_modules/**", "dist/**"], // <-- ignore these folders
    ...reactHooks.configs.flat.recommended, // spread the recommended config
  },
]);