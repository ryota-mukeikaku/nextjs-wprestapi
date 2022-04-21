const path = require('path');
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
// const isProd = process.env.NODE_ENV === 'production';
// const { resolve } = require("path")

module.exports = withPlugins(
    [
        [
            optimizedImages,
            {
                inlineImageLimit: 8192,
                imagesFolder: 'images',
                imagesName: '[name]-[hash].[ext]',
                handleImages: ['jpg', 'png', 'svg', 'webp', 'gif'],
                optimizeImages: true,
                // optimizeImagesInDev: true,
                mozjpeg: {
                    quality: 60,
                },
                optipng: {
                    optimizationLevel: 3,
                },
                pngquant: false,
                gifsicle: {
                    interlaced: true,
                    optimizationLevel: 3,
                },
                webp: {
                    preset: 'default',
                    quality: 60,
                },
                svgo: {
                    plugins: [
                        {
                            name: 'removeViewBox',
                            active: false,
                        },
                    ],
                },
            },
        ],
    ],
    {
        // basePath: isProd ? '/nextjs_sandbox' : '',
        // assetPrefix: isProd ? '/nextjs_sandbox' : '',
        trailingSlash: true, //  ex: /about/index.html
        reactStrictMode: true,
        sassOptions: {
            includePaths: [path.join(__dirname, 'styles')],
        },
        images: {
            disableStaticImages: true,
            dangerouslyAllowSVG: true,
            contentSecurityPolicy:
                "default-src 'self'; script-src 'none'; sandbox;",
        },
        // webpack: (config) => {
        //   config.resolve.alias["@public"] = resolve(__dirname, "public")

        //   return config
        // },
    }
);
