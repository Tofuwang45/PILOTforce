/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        success: '#22c55e',
        warning: '#eab308',
        pending: '#6b7280',
        terminal: '#1e293b',
      },
    },
  },
  plugins: [],
}
