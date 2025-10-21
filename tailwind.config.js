/** @type {import('tailwindcss').Config} */
export default {
    content: [
  "./app/**/*.{js,ts,jsx,tsx}",
  "../../packages/ui/**/*.{js,ts,jsx,tsx}",
  "!../../packages/ui/node_modules", // ⛔ exclude node_modules
],
  theme: {
    extend: {},
  },
  plugins: [],
};
