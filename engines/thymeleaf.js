class ThymeleafEngine {
  applyForScripts(scripts) {
    scripts.forEach(script => {
      script.attributes['th:src'] = '@{' + script.attributes.src + '}';
      delete script.attributes['src'];
    });
  }

  applyForStyles(styles) {
    styles.forEach(style => {
      style.attributes['th:href'] = '@{' + style.attributes.href + '}';
      delete style.attributes['href'];
    });
  }
}

module.exports = ThymeleafEngine