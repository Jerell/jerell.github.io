const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

// const getLocalPackages = require('./scripts/getLocalPackages');

// const localPackages = getLocalPackages.getLocalPackages();
// const withTM = require('next-transpile-modules')();
const nextConfig = {
  webpack: (config, options) => {
    return config;
  },
  eslint: {
    // ESLint managed on the workspace level
    ignoreDuringBuilds: true,
  },
  images: {
    disableStaticImages: true,
  },
};

const config = withPlugins(
  [
    [
      optimizedImages,
      {
        // optimisation disabled by default, to enable check https://github.com/cyrilwanner/next-optimized-images
        optimizeImages: false,
      },
    ],
  ],
  nextConfig
);

module.exports = config;
