const engines = require('./engines');

const dotSegmentsRegex = /^(?:\.\.\/|\.\/|\.)*/g;

function inject(data, options) {
  const engine = new engines[options.engine]();
  
  if (options.removeDotSegments) {
    modifyScriptsAndLinks(data, removeDotSegments);
  }
  if (options.removeLeadingSlash) {
    modifyScriptsAndLinks(data, removeLeadingSlash);
  }
  if (options.addLeadingSlash) {
    modifyScriptsAndLinks(data, addLeadingSlash);
  }

  engine.apply(data.assetTags, options);
}

function modifyScriptsAndLinks(data, modifier) {
  data.assetTags.scripts.forEach(script => {
    script.attributes.src = modifier(script.attributes.src);
  });
  data.assetTags.styles.forEach(style => {
    style.attributes.href = modifier(style.attributes.href);
  });
}

function removeLeadingSlash(attribute) {
  if (attribute && attribute.charAt(0) === '/') {
    return attribute.slice(1);
  }
  return attribute;
}

function addLeadingSlash(attribute) {
  if (attribute && attribute.charAt(0) !== '/') {
    return '/' + attribute;
  }
  return attribute;
}

function removeDotSegments(attribute) {
  if (attribute) {
    return attribute.replaceAll(dotSegmentsRegex, '');
  }
  return attribute;
}

module.exports = {
  inject: inject
};