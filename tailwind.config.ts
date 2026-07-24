import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "#0e7490",
          orange: "#ea580c",
          ink: "#1f2937",
          sand: "#f8f4e8",
        },
      },
      boxShadow: {
        panel: "0 10px 30px rgba(15, 23, 42, 0.08)",
      },
      borderRadius: {
        xl: "0.9rem",
      },
    },
  },
  plugins: [],
}

export default config
