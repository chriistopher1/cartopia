/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "node_modules/flowbite/**/*.js"
    
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["montserrat"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
