module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  devServer: {
    disableHostCheck: true,
    //public: 'sachat.seed.fr.nf',
    proxy: 'https://localhost:8080',
  },
  pwa: {
    name: 'Sachat',
    themeColor: '#4DBA87',
    msTileColor: '#4DBA87',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#4DBA87',
  }
}
