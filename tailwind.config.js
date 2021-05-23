module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            animation: {
                "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
