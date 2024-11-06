import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {
    rules: {
      indent: ['error', 2],
    }
  },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
];
