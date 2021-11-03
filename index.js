const engines = require('./engines/engines')

const supportedEngines = ['thymeleaf'];

class JavaTemplateEngineWebpackPlugin {

  constructor(plugin, options) {
    this.options = options || {};
    if (supportedEngines.includes(this.options.engine)) {
      this.templateEngine = new engines[this.options.engine];
    }
    this.htmlWebpackPlugin = plugin;
  }
  
  apply(compiler) {
    compiler.hooks.compilation.tap('JavaTemplateEngineWebpackPlugin', (compilation) => {
      this.htmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync(
        'JavaTemplateEngineWebpackPlugin',
        (data, cb) => {
          if (this.templateEngine) {
            this.templateEngine.applyForScripts(data.assetTags.scripts);
            this.templateEngine.applyForStyles(data.assetTags.styles);
          }
          cb(null, data);
        }
      )
    });
  }
}

module.exports = JavaTemplateEngineWebpackPlugin