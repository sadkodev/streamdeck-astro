/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class", "class"],
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				primary: "#FF0080",
				secondary: "#0080FF",
				accent: "#0080FF",
				background: "#FFFFFF",
				foreground: "#000000",
				muted: "#F2F2F2",
				danger: "#FF0080",
			},
		},
		fontFamily: {
			body: [
				"Inter",
				"ui-sans-serif",
				"system-ui",
				"-apple-system",
				"system-ui",
				"Segoe UI",
				"Roboto",
				"Helvetica Neue",
				"Arial",
				"Noto Sans",
				"sans-serif",
				"Apple Color Emoji",
				"Segoe UI Emoji",
				"Segoe UI Symbol",
				"Noto Color Emoji",
			],
			sans: [
				"Inter",
				"ui-sans-serif",
				"system-ui",
				"-apple-system",
				"system-ui",
				"Segoe UI",
				"Roboto",
				"Helvetica Neue",
				"Arial",
				"Noto Sans",
				"sans-serif",
				"Apple Color Emoji",
				"Segoe UI Emoji",
				"Segoe UI Symbol",
				"Noto Color Emoji",
			],
		},
	},
	plugins: [
		function ({ addUtilities }) {
			if (process.env.NODE_ENV === "development") {
				addUtilities({
					".test": {
						border: "1px solid #E95678",
					},
				});
			}
		},
	],
};
