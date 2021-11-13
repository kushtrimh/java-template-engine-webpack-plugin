const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./data/webpack.config');

function testOutputGeneration(options, filename) {
  const engine = options.engine;
  test('generates correct output with ' + engine + ' engine as ' + filename, done => {
    webpack(webpackConfig(filename, options), (err, stats) => {
      const expected = fs.readFileSync(path.resolve(__dirname, 'expected/' + filename));
      const actual = fs.readFileSync(path.resolve(__dirname, 'dist/' + filename));
      expect(actual).toStrictEqual(expected);
      done();
    }, 30000);
  });
}

testOutputGeneration({ engine: 'thymeleaf' }, 'thymeleaf-simple.html');
testOutputGeneration({ engine: 'jsp' }, 'jsp-with-jstl.html');
testOutputGeneration({ engine: 'jsp', useJSTL: false, addLeadingSlash: true }, 'jsp-without-jstl.html');