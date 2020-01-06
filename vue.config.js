module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    public: 'sachat.seed.fr.nf',
    proxy: 'https://lcalhost:8080',
  },
}
