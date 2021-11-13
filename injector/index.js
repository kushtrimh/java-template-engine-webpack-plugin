const engines = require('../engines');
const modifier = require('./modifier');

function inject(data, options) {
  const engine = new engines[options.engine]();
  
  if (options.removeDotSegments) {
    modifyScriptsAndLinks(data, modifier.removeDotSegments);
  }
  if (options.removeLeadingSlash) {
    modifyScriptsAndLinks(data, modifier.removeLeadingSlash);
  }
  if (options.addLeadingSlash) {
    modifyScriptsAndLinks(data, modifier.addLeadingSlash);
  }

  engine.apply(data.assetTags, options);
}

function injectIntoHTML(data, options) {
  const engine = new engines[options.engine]();
  if (typeof engine.applyForHTML === 'function') {
    data.html = engine.applyForHTML(data.html, options);
  }
}

function modifyScriptsAndLinks(data, modifier) {
  data.assetTags.scripts.forEach(script => {
    script.attributes.src = modifier(script.attributes.src);
  });
  data.assetTags.styles.forEach(style => {
    style.attributes.href = modifier(style.attributes.href);
  });
}

module.exports = {
  inject: inject,
  injectIntoHTML: injectIntoHTML
};