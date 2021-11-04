class ThymeleafEngine {
  
  apply(assetTags, options) {
    assetTags.scripts.forEach(script => {
      script.attributes['th:src'] = '@{' + script.attributes.src + '}';
      delete script.attributes['src'];
    });

    assetTags.styles.forEach(style => {
      style.attributes['th:href'] = '@{' + style.attributes.href + '}';
      delete style.attributes['href'];
    });
  }
}

module.exports = ThymeleafEngine