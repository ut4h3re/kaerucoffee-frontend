/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))", // Pastikan ada hsl() di sini
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // Warna Kaeru Coffee(Premium)
        coffee: {
          light: '#D7CCC8',
          DEFAULT: '#6F4E37',
          dark: '#3E2723',
        },
        cream: '#F5F5DC',
        beige: '#F2E8D5',
        gold: '#D4AF37',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}