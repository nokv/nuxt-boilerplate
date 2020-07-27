import { NuxtConfig } from '@nuxt/types';
const envPath = `env/.env.${process.env.NODE_ENV || 'development'}`;
require('dotenv').config({ path: envPath });
import Sass from 'sass';
import Fiber from 'fibers';

const environment = process.env.NODE_ENV || 'development';
const isDev = environment === 'development';

// meta
const title = '';
const description = '';

const config: NuxtConfig = {
    /*
     ** Nuxt rendering mode
     ** See https://nuxtjs.org/api/configuration-mode
     */
    mode: 'universal',
    /*
     ** Nuxt target
     ** See https://nuxtjs.org/api/configuration-target
     */
    target: 'static',

    srcDir: 'src/',
    generate: {
        fallback: true,
    },
    router: {
        base: process.env.URL_BASE || '',
    },

    /*
     ** Headers of the page
     ** See https://nuxtjs.org/api/configuration-head
     */
    head: {
        htmlAttrs: {
            lang: 'ja',
            prefix: 'og: http://ogp.me/ns#',
        },
        title,
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: description },
            // @ts-ignore
            { hid: 'X-UA-Compatible', 'http-equiv': 'X-UA-Compatible', content: 'ie=edge' },
            { hid: 'og:type', property: 'og:type', content: 'website' },
            { hid: 'og:locale', property: 'og:locale', content: 'ja_JP' },
            { hid: 'og:url', property: 'og:url', content: `${process.env.URL}` },
            { hid: 'og:image', property: 'og:image', content: `${process.env.URL}/img/ogp.jpg` },
            { hid: 'og:site_name', property: 'og:site_name', content: title },
            { hid: 'og:title', property: 'og:title', content: title },
            { hid: 'og:description', property: 'og:description', content: description },
            { hid: 'twitter:card', property: 'twitter:card', content: 'summary_large_image' },
            { hid: 'twitter:site', property: 'twitter:site', content: '@' },
            { hid: 'twitter:creator', property: 'twitter:creator', content: '@' },
            { hid: 'google-site-verification', name: 'google-site-verification', content: '' },
            { property: 'apple-mobile-web-app-title', content: title },
            { property: 'application-name', content: title },
            { property: 'msapplication-TileColor', content: '#ffffff' },
            { property: 'theme-color', content: '#ffffff' },
            { name: 'apple-mobile-web-app-capable', content: 'yes' },
            { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { hid: 'canonical', rel: 'canonical', href: process.env.URL },
        ],
        script: [],
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff', continuous: true },
    /*
     ** Global CSS
     */
    css: ['ress'],
    styleResources: {
        scss: [],
    },
    /*
     ** Plugins to load before mounting the App
     ** https://nuxtjs.org/guide/plugins
     */
    plugins: [],
    /*
     ** Auto import components
     ** See https://nuxtjs.org/api/configuration-components
     */
    components: true,
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        '@nuxt/typescript-build',
        [
            '@nuxtjs/dotenv',
            {
                filename: `../env/.env.${environment}`,
            },
        ],
    ],
    serverMiddleware: [],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/pwa',
        '@nuxtjs/style-resources',
    ],
    /*
     ** PWA config
     */
    pwa: {
        workbox: {
            dev: false,
            runtimeCaching: [
                {
                    urlPattern: '^https://fonts.(?:googleapis|gstatic).com/(.*)',
                    handler: 'cacheFirst',
                },
                {
                    urlPattern: process.env.URL_BASE || '' + '.*',
                    handler: 'staleWhileRevalidate',
                    strategyOptions: {
                        cacheName: 'my-cache',
                        cacheExpiration: {
                            maxAgeSeconds: 24 * 60 * 60 * 30,
                        },
                    },
                },
            ],
        },
        manifest: {
            name: title,
            short_name: title,
            title,
            'og:title': title,
            description,
            'og:description': description,
            theme_color: '#ffffff',
            background_color: '#ffffff',
            lang: 'ja',
            display: 'standalone',
            start_url: '/?utm_source=pwa_app',
        },
    },
    /*
     ** Build configuration
     ** See https://nuxtjs.org/api/configuration-build/
     */
    build: {
        filenames: {
            app: () => (!isDev ? '[name].[chunkhash:7].js' : '[name].js'),
            chunk: () => (!isDev ? '[name].[chunkhash:7].js' : '[name].js'),
            css: () => (!isDev ? '[name].[chunkhash:7].js' : '[name].js'),
            img: () => (!isDev ? '[path][name].[contenthash:7].[ext]' : '[path][name].[ext]'),
            font: () => (!isDev ? '[path][name].[contenthash:7].[ext]' : '[path][name].[ext]'),
            video: () => (!isDev ? '[path][name].[contenthash:7].[ext]' : '[path][name].[ext]'),
        },
        /*
         ** You can extend webpack config here
         */
        extend(config) {
            config.devtool = !isDev ? false : 'source-map';
            config.mode = isDev ? 'development' : 'production';
        },
        loaders: {
            scss: {
                implementation: Sass,
                sassOptions: {
                    fiber: Fiber,
                },
            },
        },
        babel: {
            presets({ isServer }) {
                return [
                    [
                        require.resolve('@nuxt/babel-preset-app'),
                        // require.resolve('@nuxt/babel-preset-app-edge'), // For nuxt-edge users
                        {
                            buildTarget: isServer ? 'server' : 'client',
                            useBuiltIns: 'usage',
                            corejs: { version: 3 },
                        },
                    ],
                ];
            },
        },
        postcss: {
            plugins: {
                'postcss-css-variables': {
                    preserve: true,
                },
            },
            preset: {
                autoprefixer: {
                    grid: 'autoplace',
                    cascade: false,
                },
            },
        },
        terser: {
            terserOptions: {
                compress: { drop_console: false },
            },
        },
        publicPath: '/assets/',
        html: {
            minify: {
                collapseBooleanAttributes: true,
                decodeEntities: true,
                minifyCSS: true,
                minifyJS: true,
                processConditionalComments: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
                trimCustomFragments: true,
                useShortDoctype: true,
                removeComments: true,
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true,
            },
        },
    },
};

export default config;
