export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#0b1220",
        card: "#252711",
      },

      /* 🔥 Compact Font System */
      fontSize: {
        xs: ["0.7rem", { lineHeight: "1rem" }],
        sm: ["0.8rem", { lineHeight: "1.2rem" }],
        base: ["0.9rem", { lineHeight: "1.4rem" }],
        lg: ["1rem", { lineHeight: "1.5rem" }],
        xl: ["1.1rem", { lineHeight: "1.6rem" }],
      },

      /* 🔥 Tight Spacing (dashboard feel) */
      spacing: {
        1.5: "0.375rem",
        2.5: "0.625rem",
        3.5: "0.875rem",
      },

      /* 🔥 Slightly smaller border radius */
      borderRadius: {
        lg: "10px",
        xl: "12px",
      },

      /* 🔥 Optional: shadows for cards */
      boxShadow: {
        card: "0 2px 10px rgba(0,0,0,0.3)",
      },
    },
  },
  plugins: [],
};