const injector = require('./injector');

const supportedEngines = ['thymeleaf', 'jsp'];

class JavaTemplateEngineWebpackPlugin {

  constructor(plugin, options) {
    this.options = Object.assign({
      removeLeadingSlash: false,
      addLeadingSlash: false,
      removeDotSegments: false,
      removeOriginalAttributes: true,
      useJSTL: true
    }, options);
    this.htmlWebpackPlugin = plugin;
  }
  
  apply(compiler) {
    compiler.hooks.compilation.tap('JavaTemplateEngineWebpackPlugin', (compilation) => {
      this.htmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync(
        'JavaTemplateEngineWebpackPlugin',
        (data, cb) => {
          if (supportedEngines.includes(this.options.engine)) {
            injector.inject(data, this.options);
          }
          cb(null, data);
        }
      )
      this.htmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        'JavaTemplateEngineWebpackPlugin',
        (data, cb) => {
          if (supportedEngines.includes(this.options.engine)) {
            injector.injectIntoHTML(data, this.options);
          }
          cb(null, data);
        }
      )
    });
  }
}

module.exports = JavaTemplateEngineWebpackPlugin;