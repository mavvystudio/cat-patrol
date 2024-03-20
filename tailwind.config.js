const preset = require("@mavvy/m3-ui/preset");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: preset.content.concat(["./src/**/*.{js,jsx,ts,tsx}"]),
  theme: {
    extend: preset.theme.extend,
  },
  plugins: preset.plugins,
};
