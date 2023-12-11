/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'

  ],
  theme: {
    extend: {
      screens: {
        'xsm': '416px',
        // => @media (min-width: 640px) { ... }




      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
