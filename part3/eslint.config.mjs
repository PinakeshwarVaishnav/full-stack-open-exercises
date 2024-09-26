import globals from "globals";
import airbnbConfig from 'eslint-config-airbnb-base';


export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      ecmaVersion: 'latest',
      globals: {
        ...globals.node,
      }
    },
    rules: {
      ...airbnbConfig.rules,
      'no-console': 'off',
      'import/prefer-default-export': 'off',
    },
  },
];
