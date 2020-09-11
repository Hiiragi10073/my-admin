const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('page', resolve('src/page'))
      .set('api', resolve('src/api'))
      .set('components', resolve('src/components'))
      .set('styles', resolve('src/styles'))
      .set('assets', resolve('src/assets'))
  },
}