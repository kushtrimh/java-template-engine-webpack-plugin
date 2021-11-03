# java-template-engine-webpack-plugin
[![npm_version](https://img.shields.io/npm/v/java-template-engine-webpack-plugin?color=blue)](https://www.npmjs.com/package/java-template-engine-webpack-plugin)

A plugin extension for [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) that injects code for Java template engines.

## Supported engines

- Thymeleaf (`thymeleaf`)

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

Adding the plugin for `thymeleaf` in this case, would change the `HTML` as follows

```HTML
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

### Options
|Name|Description|
|--------|---------|
|`engine`|The engine to be used, please check [supported engines](#supported-engines) section.|
