import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tailwindcss from 'eslint-plugin-tailwindcss'
import typescriptParser from '@typescript-eslint/parser';

export default [
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      prettier: prettier,
      tailwindcss: tailwindcss,
      react: react,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      parser: typescriptParser,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/no-unknown-property': 'off',
      'prefer-const': 'error',
      'prettier/prettier': ['error', {
        tabWidth: 2,
        printWidth: 90,
        singleQuote: true,
        trailingComma: "es5",
        bracketSpacing: false,
        bracketSameLine: false,
      }],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  }
];