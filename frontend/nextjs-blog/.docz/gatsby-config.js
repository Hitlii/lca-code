const { mergeWith } = require('docz-utils')
const fs = require('fs-extra')

let custom = {}
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js')

if (hasGatsbyConfig) {
  try {
    custom = require('./gatsby-config.custom')
  } catch (err) {
    console.error(
      `Failed to load your gatsby-config.js file : `,
      JSON.stringify(err),
    )
  }
}

const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: 'Learn Starter',
    description: 'My awesome app using docz',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        src: './',
        gatsbyRoot: null,
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: false,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: null,
        o: null,
        open: null,
        'open-browser': null,
        root:
          'C:\\Users\\cesar\\Documents\\GitHub\\lca-code\\frontend\\nextjs-blog\\.docz',
        base: '/',
        source: './',
        'gatsby-root': null,
        files: '**/*.{md,markdown,mdx}',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'Learn Starter',
        description: 'My awesome app using docz',
        host: 'localhost',
        port: 3000,
        p: 3000,
        separator: '-',
        paths: {
          root:
            'C:\\Users\\cesar\\Documents\\GitHub\\lca-code\\frontend\\nextjs-blog',
          templates:
            'C:\\Users\\cesar\\Documents\\GitHub\\lca-code\\frontend\\nextjs-blog\\node_modules\\docz-core\\dist\\templates',
          docz:
            'C:\\Users\\cesar\\Documents\\GitHub\\lca-code\\frontend\\nextjs-blog\\.docz',
          cache:
            'C:\\Users\\cesar\\Documents\\GitHub\\lca-code\\frontend\\nextjs-blog\\.docz\\.cache',
          app:
            'C:\\Users\\cesar\\Documents\\GitHub\\lca-code\\frontend\\nextjs-blog\\.docz\\app',
          appPackageJson:
            'C:\\Users\\cesar\\Documents\\GitHub\\lca-code\\frontend\\nextjs-blog\\package.json',
          appTsConfig:
            'C:\\Users\\cesar\\Documents\\GitHub\\lca-code\\frontend\\nextjs-blog\\tsconfig.json',
          gatsbyConfig:
            'C:\\Users\\cesar\\Documents\\GitHub\\lca-code\\frontend\\nextjs-blog\\gatsby-config.js',
          gatsbyBrowser:
            'C:\\Users\\cesar\\Documents\\GitHub\\lca-code\\frontend\\nextjs-blog\\gatsby-browser.js',
          gatsbyNode:
            'C:\\Users\\cesar\\Documents\\GitHub\\lca-code\\frontend\\nextjs-blog\\gatsby-node.js',
          gatsbySSR:
            'C:\\Users\\cesar\\Documents\\GitHub\\lca-code\\frontend\\nextjs-blog\\gatsby-ssr.js',
          importsJs:
            'C:\\Users\\cesar\\Documents\\GitHub\\lca-code\\frontend\\nextjs-blog\\.docz\\app\\imports.js',
          rootJs:
            'C:\\Users\\cesar\\Documents\\GitHub\\lca-code\\frontend\\nextjs-blog\\.docz\\app\\root.jsx',
          indexJs:
            'C:\\Users\\cesar\\Documents\\GitHub\\lca-code\\frontend\\nextjs-blog\\.docz\\app\\index.jsx',
          indexHtml:
            'C:\\Users\\cesar\\Documents\\GitHub\\lca-code\\frontend\\nextjs-blog\\.docz\\app\\index.html',
          db:
            'C:\\Users\\cesar\\Documents\\GitHub\\lca-code\\frontend\\nextjs-blog\\.docz\\app\\db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
