export default [
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [
      'standard-with-typescript',
      "eslint:recommended",
      "@typescript-eslint",
      'plugin:react/recommended',
      'plugin:prettier/recommended',
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      sourceType: "module",
      project: ["./tsconfig.json"],
    },
    plugins: [
      'react',
      'react-hooks',
      'prettier',
    ],
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/no-unknown-property': 'off',
      'prefer-const': 'error',
      'prettier/prettier': ['error'],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  }
];