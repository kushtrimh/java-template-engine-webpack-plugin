const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./data/webpack.config');

test('generates correct output with thymeleaf engine', (done) => {
  webpack(webpackConfig('thymeleaf-index.html', 'engine'), (err, stats) => {
    expect(err).toBeNull();
  });
  const expected = fs.readFileSync(path.resolve(__dirname, 'expected/thymeleaf-expected-index.html'));
  const actual = fs.readFileSync(path.resolve(__dirname, 'dist/thymeleaf-index.html'));
  expect(actual).toStrictEqual(expected);
  done();
});