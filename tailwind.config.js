/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Keep existing variables for compatibility
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // Add direct brand colors for easier use
        brand: {
          primary: "#0F172A",
          accent1: "#3B82F6",
          accent2: "#06B6D4",
          background: "#F9FAFB",
          "text-light": "#94A3B8",
        },

        // Update primary and add accent1/2
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        accent1: {
          DEFAULT: "hsl(var(--accent1))",
          foreground: "hsl(var(--accent1-foreground))",
        },
        accent2: {
          DEFAULT: "hsl(var(--accent2))",
          foreground: "hsl(var(--accent2-foreground))",
        },
        "text-light": "hsl(var(--text-light))",

        // Keep other existing color variables
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // Keep existing blue color scale
        blue: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6" /* This matches accent1 */,
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        DEFAULT:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        md: "0 6px 10px -1px rgba(0, 0, 0, 0.1), 0 2px 6px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.700"),
            a: {
              color: theme("colors.blue.600"),
              "&:hover": {
                color: theme("colors.blue.700"),
              },
            },
            h1: {
              color: theme("colors.gray.900"),
              fontWeight: "700",
            },
            h2: {
              color: theme("colors.gray.900"),
              fontWeight: "700",
            },
            h3: {
              color: theme("colors.gray.900"),
              fontWeight: "700",
            },
            h4: {
              color: theme("colors.gray.900"),
              fontWeight: "700",
            },
            blockquote: {
              color: theme("colors.gray.700"),
              borderLeftColor: theme("colors.blue.500"),
            },
          },
        },
      }),
      fontFamily: {
        heading: [
          "Poppins",
          "Sora",
          "Manrope",
          ...defaultTheme.fontFamily.sans,
        ],
        body: ["Inter", "Rubik", "Manrope", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
