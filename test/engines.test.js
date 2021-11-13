const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./data/webpack.config');

function testOutputGeneration(options) {
  const engine = options.engine;
  test('generates correct output with ' + engine + ' engine, options ' + options, (done) => {
    webpack(webpackConfig(engine + '-index.html', options));
    const expected = fs.readFileSync(path.resolve(__dirname, 'expected/' + engine + '-expected-index.html'));
    const actual = fs.readFileSync(path.resolve(__dirname, 'dist/' + engine + '-index.html'));
    expect(actual).toStrictEqual(expected);
    done();
  });
}

testOutputGeneration({ engine: 'thymeleaf' });