/** @type {import("prettier").Config} */
module.exports = {
  singleQuote: true,
  tabWidth: 2,
  semi: true,
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
}
