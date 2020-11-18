module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack: {
    resolve: {
      //路径别名
      alias: {
        'components': '@/components',
        'assets':'@/assets',
      }
    }
  },
}