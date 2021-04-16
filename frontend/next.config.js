const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  // CDN Roboto Font Declaration
  assetPrefix: isProd ? 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' : '',
}