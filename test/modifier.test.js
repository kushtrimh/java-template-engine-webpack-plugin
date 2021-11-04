const modifier = require('../injector/modifier');

test('adds leading slash to attribute', () => {
  expect(modifier.addLeadingSlash('static/image.png')).toBe('/static/image.png');
  expect(modifier.addLeadingSlash('image.png')).toBe('/image.png');
  expect(modifier.addLeadingSlash('built/static/img/image.png')).toBe('/built/static/img/image.png');
});

test('does not add leading slash to attribute when its already present', () => {
  expect(modifier.addLeadingSlash('/static/image.png')).toBe('/static/image.png');
  expect(modifier.addLeadingSlash('/image.png')).toBe('/image.png');
  expect(modifier.addLeadingSlash('/built/static/img/image.png')).toBe('/built/static/img/image.png');
});

test('removes leading slash from attribute', () => {
  expect(modifier.removeLeadingSlash('/static/image.png')).toBe('static/image.png');
  expect(modifier.removeLeadingSlash('/image.png')).toBe('image.png');
  expect(modifier.removeLeadingSlash('/built/static/img/image.png')).toBe('built/static/img/image.png');
});

test('does not remove leading slash from attribute when its not present', () => {
  expect(modifier.removeLeadingSlash('static/image.png')).toBe('static/image.png');
  expect(modifier.removeLeadingSlash('image.png')).toBe('image.png');
  expect(modifier.removeLeadingSlash('built/static/img/image.png')).toBe('built/static/img/image.png');
});

test('removes dot segments of parent directories', () => {
  expect(modifier.removeDotSegments('../../../static/image.png')).toBe('static/image.png');
  expect(modifier.removeDotSegments('../static/image.png')).toBe('static/image.png');
  expect(modifier.removeDotSegments('static/image.png')).toBe('static/image.png');
});

test('removes dot segments of current directory', () => {
  expect(modifier.removeDotSegments('./././static/image.png')).toBe('static/image.png');
  expect(modifier.removeDotSegments('./static/image.png')).toBe('static/image.png');
  expect(modifier.removeDotSegments('static/image.png')).toBe('static/image.png');
});

test('removes dot segments containing current and parent directory', () => {
  expect(modifier.removeDotSegments('./../../static/image.png')).toBe('static/image.png');
  expect(modifier.removeDotSegments('./../static/image.png')).toBe('static/image.png');
  expect(modifier.removeDotSegments('static/image.png')).toBe('static/image.png');
});

test('removes dot segments containing dot at the attribute start', () => {
  expect(modifier.removeDotSegments('.static/image.png')).toBe('static/image.png');
  expect(modifier.removeDotSegments('./static/image.png')).toBe('static/image.png');
  expect(modifier.removeDotSegments('static/image.png')).toBe('static/image.png');
});

test('returns empty string when empty string provided when removing dot segments', () => {
  expect(modifier.removeDotSegments('')).toBe('');
});