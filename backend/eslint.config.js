import { defineConfig, globalIgnores } from "eslint/config";


export default defineConfig([
    globalIgnores([
        "node_modules/*"
    ]),
    {
        files: ["**/*.{js,mjs,cjs}"],
        languageOptions: { sourceType: "module" },
        rules: {
            "no-console": "warn",
            "no-unused-vars": "warn",
            "no-var": "error",
            "prefer-const": "error",

            "indent": ["error", 4],
            "quotes": ["error", "double"],
            "semi": ["error", "always"],

        },
    },
]);