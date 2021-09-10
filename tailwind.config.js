module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['"Nunito"', "sans-serif"],
    },
    extend: {
      colors: {
        twitter: "#71bbff",
        instagram: "#e56969",
        facebook: "#3b5998",
        whatsapp: "#25d366",
        aerolab: "#15dbff",
      },
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
  plugins: [],
};
