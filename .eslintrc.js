/** @type {import('@typescript-eslint/experimental-utils').TSESLint.Linter.Config} */
const config = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:nuxt/recommended',
        '@nuxtjs/eslint-config-typescript',
        'prettier',
    ],
    plugins: [],
    // add your custom rules here
    rules: {
        quotes: ['error', 'single'],
        'vue/html-indent': 'off',
    },
};
module.exports = config;
