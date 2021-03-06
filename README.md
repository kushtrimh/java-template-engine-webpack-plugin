# Java Template Engine Webpack Plugin
[![npm_version](https://img.shields.io/npm/v/java-template-engine-webpack-plugin?color=blue)](https://www.npmjs.com/package/java-template-engine-webpack-plugin)
![build workflow](https://github.com/kushtrimh/java-template-engine-webpack-plugin/actions/workflows/node.js.yml/badge.svg)

A plugin extension for [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) that injects code for Java template engines.

## Supported engines

- Thymeleaf (`thymeleaf`)
- Java Server Pages (`jsp`)

## Installation

`npm i --save-dev java-template-engine-webpack-plugin`

## Usage

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const JavaTemplateEngineWebpackPlugin = require('java-template-engine-webpack-plugin');

module.exports = {
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new JavaTemplateEngineWebpackPlugin(HtmlWebpackPlugin, {engine: 'thymeleaf'})
  ]
}
```

---

The example below shows how the output of `index.html` is changed after adding the plugin with `thymeleaf` as the engine.

*Before*
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Webpack App</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <div id="root"></div>
    <script src="bundle.js"></script>
  </body>
</html>
```

*After*
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Webpack App</title>
    <link rel="stylesheet" th:href="@{styles.css}">
  </head>
  <body>
    <div id="root"></div>
    <script th:src="@{bundle.js}"></script>
  </body>
</html>
```

---

### Options
|Name|Type|Default|Description|
|--------|---------|--------|---------|
|`engine`|`String`|`''`|The engine to be used, please check [supported engines](#supported-engines) section.|
|`addLeadingSlash`|`Boolean`|`false`|Adds a leading slash to the attribute if its missing. <br /> _static/image.png_ becomes _/static/image.png_|
|`removeLeadingSlash`|`Boolean`|`false`|Removes a leading slash from the attribute if its present. <br /> _/static/image.png_ becomes _static/image.png_|
|`removeDotSegments`|`Boolean`|`false`|Removes dot-segments from the attribute. <br /> _../../static/image.png_ becomes _static/image.png_ <br /> _./static/image.png_ becomes _static/image.png_ <br /> _.static/image.png_ becomes _static/image.png_|
|`removeOriginalAttributes`|`Boolean`|`true`|Removes the original `src` and `href` attributes. Only valid when using `thymeleaf` engine.|
|`useJSTL`|`Boolean`|`true`|Uses the `JSTL` `<c:url>` tag when modifying attributes. Only valid when using `jsp` engine.|