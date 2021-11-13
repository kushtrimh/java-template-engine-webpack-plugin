class JSPEngine {
  
  apply(assetTags, options) {
    assetTags.scripts.forEach(script => {
      if (options.useJSTL) {
        script.attributes.src = '<c:url value=\'' + script.attributes.src + '\' />';
      } else {
        script.attributes.src = '${pageContext.request.contextPath}' + script.attributes.src;
      }
    });

    assetTags.styles.forEach(style => {
      if (options.useJSTL) {
        style.attributes.href = '<c:url value=\'' + style.attributes.href + '\' />';
      } else {
        style.attributes.href = '${pageContext.request.contextPath}' + style.attributes.href;
      }
    });
  }

  applyForHTML(html, options) {
    if (options.useJSTL) {
      return '<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>' + html;
    }
    return html;
  }
}

module.exports = JSPEngine;