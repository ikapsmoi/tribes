/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // include legacy pages dir so theme applies everywhere
  ],
  theme: {
    screens: {
      xs: "320px",
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        // New Brand Color System
        brand: {
          navy: "#0F2F6B",
          aqua: "#47B5C4",
          forest: "#3E6A4F",
          midnight: "#0E1521",
          charcoal: "#1E1E1E",
          slate: "#5B6673",
          white: "#FFFFFF",
          light: "#F4F6F8",
        },
        // Legacy colors maintained for compatibility
        primary: {
          black: "#1E1E1E", // mapped to charcoal
          darkGray: "#0E1521", // mapped to midnight
          mediumGray: "#5B6673", // mapped to slate
          lightGray: "#5B6673",
          white: "#FFFFFF",
        },
        accent: {
          yellow: "#47B5C4", // mapped to aqua
          brightYellow: "#47B5C4",
          gold: "#47B5C4",
          orange: "#47B5C4",
        },
        nature: {
          skyBlue: "#47B5C4", // mapped to aqua
          lightBlue: "#47B5C4",
          paleBlue: "#F4F6F8", // mapped to light
          mountainGray: "#5B6673", // mapped to slate
          forestGreen: "#3E6A4F", // mapped to forest
          lakeBlue: "#0F2F6B", // mapped to navy
          sandBeige: "#F4F6F8", // mapped to light
        },
        ui: {
          background: "#FFFFFF",
          cardBackground: "rgba(244, 246, 248, 0.9)",
          overlay: "rgba(14, 21, 33, 0.4)",
          border: "#F4F6F8",
          shadow: "rgba(14, 21, 33, 0.1)",
        },
        text: {
          primary: "#1E1E1E", // charcoal
          secondary: "#5B6673", // slate
          light: "#5B6673",
          onDark: "#FFFFFF",
          onOverlay: "#FFFFFF",
        },
      },
      fontFamily: {
        // New Typography System
        sans: ["Lato", "system-ui", "sans-serif"], // Body text
        display: ["Montserrat", "system-ui", "sans-serif"], // Headings
        heading: ["Montserrat", "system-ui", "sans-serif"], // Headings
        body: ["Lato", "system-ui", "sans-serif"], // Body text
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.4" }],
        sm: ["0.875rem", { lineHeight: "1.4" }],
        base: ["1rem", { lineHeight: "1.6" }],
        lg: ["1.125rem", { lineHeight: "1.6" }],
        xl: ["1.25rem", { lineHeight: "1.6" }],
        "2xl": ["1.5rem", { lineHeight: "1.4" }],
        "3xl": ["1.875rem", { lineHeight: "1.4" }],
        "4xl": ["2.25rem", { lineHeight: "1.4" }],
        "5xl": ["3rem", { lineHeight: "1.2" }],
        "6xl": ["3.75rem", { lineHeight: "1.2" }],
        "7xl": ["4.5rem", { lineHeight: "1.1" }],
        "8xl": ["6rem", { lineHeight: "1.1" }],
        hero: ["7.5rem", { lineHeight: "1.1", fontWeight: "700" }],
        // Mobile-specific sizes
        "hero-mobile": ["2.5rem", { lineHeight: "1.2", fontWeight: "700" }],
        "hero-tablet": ["4rem", { lineHeight: "1.1", fontWeight: "700" }],
      },
      fontWeight: {
        light: "300",
        normal: "400", // Lato body
        medium: "500", // Lato medium
        semibold: "600", // Montserrat headings
        bold: "700", // Montserrat bold headings
        extrabold: "800",
        black: "900",
      },
      letterSpacing: {
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em",
      },
      spacing: {
        xs: "0.25rem", // 4px
        sm: "0.5rem", // 8px
        md: "1rem", // 16px
        lg: "1.5rem", // 24px
        xl: "2rem", // 32px
        "2xl": "3rem", // 48px
        "3xl": "4rem", // 64px
        "4xl": "6rem", // 96px
        "5xl": "8rem", // 128px
        // Touch-friendly spacing
        touch: "2.75rem", // 44px minimum touch target
      },
      minHeight: {
        touch: "2.75rem", // 44px minimum touch target
      },
      minWidth: {
        touch: "2.75rem", // 44px minimum touch target
      },
      borderRadius: {
        none: "0px",
        sm: "0.25rem", // 4px
        md: "0.5rem", // 8px
        lg: "0.75rem", // 12px - Button radius
        xl: "1rem", // 16px
        "2xl": "1.5rem", // 24px
        full: "9999px",
        button: "0.75rem", // 12px - Specific button radius
      },
      boxShadow: {
        sm: "0 2px 4px rgba(14, 21, 33, 0.1)",
        md: "0 4px 8px rgba(14, 21, 33, 0.1)",
        lg: "0 8px 16px rgba(14, 21, 33, 0.1)",
        xl: "0 16px 32px rgba(14, 21, 33, 0.1)",
        card: "0 4px 12px rgba(14, 21, 33, 0.1)",
        overlay: "0 8px 24px rgba(14, 21, 33, 0.2)",
        // Mobile-specific shadows
        "mobile-card": "0 2px 8px rgba(14, 21, 33, 0.1)",
      },
      backgroundImage: {
        "gradient-hero":
          "linear-gradient(135deg, rgba(15, 47, 107, 0.8) 0%, rgba(71, 181, 196, 0.6) 100%)",
        "gradient-card":
          "linear-gradient(145deg, rgba(244, 246, 248, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)",
        "gradient-overlay":
          "linear-gradient(180deg, rgba(14, 21, 33, 0.6) 0%, rgba(14, 21, 33, 0.3) 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        "hover-lift": "hoverLift 0.3s ease-in-out",
        "hover-scale": "hoverScale 0.3s ease-in-out",
        "hover-darken": "hoverDarken 0.3s ease-in-out",
        // Mobile-optimized animations
        "mobile-bounce": "mobileBounce 0.6s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        hoverLift: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-4px)" },
        },
        hoverScale: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.05)" },
        },
        hoverDarken: {
          "0%": { filter: "brightness(1)" },
          "100%": { filter: "brightness(0.9)" },
        },
        mobileBounce: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
      },
      transitionDuration: {
        fast: "150ms",
        normal: "300ms",
        slow: "500ms",
      },
    },
  },
  plugins: [],
};
