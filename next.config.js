const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  // Use the CDN in production and localhost for development.
  assetPrefix: '.',
  swcMinify: false, // it should be false by default
  // distDir: "build",
};
