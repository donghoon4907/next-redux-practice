const path = require('path');
const Dotenv = require('dotenv-webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
};

module.exports = {
    ...nextConfig,
    webpack: (config, { dev }) => {
        config.plugins.push(
            new Dotenv({
                path: `./.env.${dev ? 'development' : 'production'}`,
                systemvars: true,
            }),
        );

        return config;
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: process.env.BACKEND_DOMAIN + '/:path*',
            },
        ];
    },
};
