import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
    theme: {
        extend: {
            colors: {
                "custom-orange": "#ff4f00",
                "custom-white": "#fdfdfc",
                "custom-fade-orange": "#FFF7EC",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                "open-sans": ["Open Sans", ...defaultTheme.fontFamily.sans],
                helvetica: ["Helvetica", ...defaultTheme.fontFamily.sans],
            },
            animation: {
                marquee: "marquee var(--duration) linear infinite",
            },
            keyframes: {
                marquee: {
                    from: { transform: "translateX(0)" },
                    to: { transform: "translateX(calc(-100% - var(--gap)))" },
                },
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
