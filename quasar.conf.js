// Configuration for your app

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      'i18n',
      'axios'
    ],

    css: [
      'app.styl'
    ],

    extras: [
      'roboto-font',
      'material-icons' // optional, you are not bound to it
      // 'ionicons-v4',
      // 'mdi-v3',
      // 'fontawesome-v5',
      // 'eva-icons'
    ],

    framework: {
      // all: true, // --- includes everything; for dev only!

      components: [
        'QLayout',
        'QHeader',
        'QDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QItem',
        'QItemSection',
        'QItemLabel',
        'QCard',//Adicionado daqui para baico por jailson
        'QCardSection',
        'QCardActions',
        'QRating',
        'QAvatar',
        'QImg',
        'QScrollArea',
        'QDialog',
        'QForm',
        'QInput',
        'QTooltip',
        'QBar',
        'QSelect',
        'QSeparator',
        'QCarousel',
        'QCarouselControl',
        'QCarouselSlide',
        'QSpinnerTail',
        'QDate',
        'QTime',
        'QPopupProxy',
        'QExpansionItem',
        'QUploader',
        'QChip',
        'QToggle',
        'QSpace',
        'QBar',
        'QVideo',
        'QRadio',
        'QCheckbox'

      ],

      directives: [
        'Ripple',
        'ClosePopup'
      ],

      // Quasar plugins
      plugins: [
        'Notify',
        'Loading'
      ],
       config: {
        loading: {
          spinner: 'QSpinnerTail',
          spinnerColor: 'pink-6',
          delay: 300
        }
       }

      // iconSet: 'ionicons-v4'
      // lang: 'de' // Quasar language
    },

    supportIE: false,

    build: {
      env:ctx.dev
      ? {API:JSON.stringify('http://localhost:8080/apigoogle')}
      : {API:JSON.stringify('https://us-central1-fun-feast-5128b.cloudfunctions.net')},
      scopeHoisting: true,
      vueRouterMode: 'history',
      preFetch: true, // adicionado por jailson
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        })
      }
    },

    devServer: {
      proxy: {// adicionado por jailson
        // proxy all requests starting with /api to jsonplaceholder
        '/apigoogle': {
          target: 'https://us-central1-fun-feast-5128b.cloudfunctions.net', //Tirado por enquanto // http://localhost:5000/fun-feast-5128b/us-central1
          changeOrigin: true,
          pathRewrite: {
            '^/apigoogle': ''
          }
        }
      },
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },

    // animations: 'all' --- includes all animations
    animations: [],

    ssr: {
      pwa: false
    },

    pwa: {
       workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        name: 'Fun Feast',
        short_name: 'Fun Feast',
        description: 'Sua diversão é nossa diversão!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: 'teal',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },

    cordova: {
      // id: 'org.cordova.quasar.app'
    },

    electron: {
      // bundler: 'builder', // or 'packager'

      extendWebpack (cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
}
