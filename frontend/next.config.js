//const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  // CDN Roboto Font Declaration
//assetPrefix: isProd ? 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' : '',
  env: {
    googleMapsAPIKey: 'AIzaSyDVEF5nE9KpC2qQ6mKLly5eYkiXwMnoDqs',
    googleAnalyticsKey: 'G-C3BGTQT2ZV'
  },
  images: {
    domains: ['sn3302files.storage.live.com']
  },
}

// https://stackoverflow.com/questions/35568114/cannot-load-png-files-with-webpack-unexpected-character
