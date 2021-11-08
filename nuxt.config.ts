import type { NuxtConfig } from '@nuxt/types';
import Sass from 'sass';
import Fiber from 'fibers';
import { Meta } from './config/meta';

const environment = process.env.NODE_ENV || 'development';
const isDev = environment === 'development';

const config: NuxtConfig = {
    // Nuxt target (https://nuxtjs.org/api/configuration-target)
    target: 'static',
    ssr: true,

    srcDir: 'src/',
    generate: {
        fallback: true,
    },
    router: {
        base: process.env.BASE_URL || '',
    },

    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        htmlAttrs: {
            lang: 'ja',
            prefix: 'og: http://ogp.me/ns#',
        },
        title: Meta.title,
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                name: 'description',
                content: Meta.description,
            },
            { httpEquiv: 'X-UA-Compatible', content: 'ie=edge' },
            { hid: 'og:type', property: 'og:type', content: 'website' },
            { hid: 'og:locale', property: 'og:locale', content: 'ja_JP' },
            {
                hid: 'og:url',
                property: 'og:url',
                content: `${process.env.URL}`,
            },
            {
                hid: 'og:image',
                property: 'og:image',
                content: `${process.env.URL}/img/ogp.jpg`,
            },
            {
                hid: 'og:site_name',
                property: 'og:site_name',
                content: Meta.title,
            },
            { hid: 'og:title', property: 'og:title', content: Meta.title },
            {
                hid: 'og:description',
                property: 'og:description',
                content: Meta.description,
            },
            {
                hid: 'twitter:card',
                property: 'twitter:card',
                content: 'summary_large_image',
            },
            { hid: 'twitter:site', property: 'twitter:site', content: '@' },
            { property: 'apple-mobile-web-app-title', content: Meta.title },
            { property: 'application-name', content: Meta.title },
            { property: 'msapplication-TileColor', content: Meta.themeColor },
            { property: 'theme-color', content: Meta.themeColor },
            { name: 'apple-mobile-web-app-capable', content: 'yes' },
            {
                name: 'apple-mobile-web-app-status-bar-style',
                content: 'default',
            },
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: `${process.env.BASE_URL}/favicon.ico`,
            },
            { hid: 'canonical', rel: 'canonical', href: process.env.URL },
        ],
    },

    // Customize the progress-bar color
    loading: { color: '#fff', continuous: true },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: ['~/assets/styles/base/_index.scss'],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [],

    publicRuntimeConfig: {
        url: process.env.URL || '',
        baseUrl: process.env.BASE_URL || '',
    },
    privateRuntimeConfig: {},

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: false,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        '@nuxt/postcss8',
    ],

    serverMiddleware: [],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [],

    // PWA config
    pwa: {
        workbox: {
            dev: false,
            runtimeCaching: [
                {
                    urlPattern:
                        '^https://fonts.(?:googleapis|gstatic).com/(.*)',
                    handler: 'CacheFirst',
                },
                {
                    urlPattern: process.env.BASE_URL || '' + '.*',
                    handler: 'StaleWhileRevalidate',
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
            name: Meta.title,
            short_name: Meta.title,
            description: Meta.description,
            theme_color: Meta.themeColor,
            background_color: Meta.themeColor,
            lang: 'ja',
            display: 'standalone',
            start_url: '/?utm_source=pwa_app',
        },
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        extend(config, { isClient }) {
            if (isClient) {
                config.devtool = !isDev ? false : 'source-map';
            }
        },
        loaders: {
            sass: {
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
                        {
                            buildTarget: isServer ? 'server' : 'client',
                            useBuiltIns: 'usage',
                            corejs: { version: '3.19' },
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
