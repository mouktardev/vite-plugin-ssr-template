/** @type {import('tailwindcss').Config} */
export default {
	content: ["./{pages,renderer,components,src}/**/*.{html,js,jsx,ts,tsx}"],
	darkMode: "class",
	theme: {
		extend: {},
	},
	plugins: [require("@tailwindcss/typography")],
};
