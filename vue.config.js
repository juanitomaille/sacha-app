module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    disableHostCheck: true,
    //public: 'sachat.seed.fr.nf',
    proxy: 'https://localhost:8080',
  },
}
