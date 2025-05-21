// eslint.config.js is used to cofigure Astro-projects
import { defineConfig } from 'eslint/config';
import astroPlugin from 'eslint-plugin-astro';
import astroParser from 'astro-eslint-parser';
import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

export default defineConfig([
	// JavaScript and TypeScript
	{
		ignores: ['node_modules/**', 'dist/**', 'build/**', '.vercel/**'],
	},
	js.configs.recommended,
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			ecmaVersion: 'latest',
			globals: {
				...globals.browser,
				...globals.node,
			},
			parser: tsParser,
			parserOptions: {
				project: './tsconfig.json',
				sourceType: 'module',
			},
		},
		plugins: {
			'@typescript-eslint': tseslint,
		},
		rules: {},
	},
	// Astro
	{
		files: ['**/*.astro'],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
			parser: astroParser,
			parserOptions: {
				parser: tsParser,
				extraFileExtensions: ['.astro'],
				sourceType: 'module',
			},
		},
		plugins: {
			astro: astroPlugin,
		},
		processor: 'astro/client-side-ts',
		rules: {
			...astroPlugin.configs.recommended.rules,
			'astro/no-set-html-directive': 'error',
			'astro/no-set-text-directive': 'error',
		},
	},
]);
