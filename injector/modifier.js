const dotSegmentsRegex = /^(?:\.\.\/|\.\/|\.)*/g;

function removeDotSegments(attribute) {
  if (attribute) {
    return attribute.replace(dotSegmentsRegex, '');
  }
  return attribute;
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

module.exports = {
  removeDotSegments: removeDotSegments,
  removeLeadingSlash: removeLeadingSlash,
  addLeadingSlash: addLeadingSlash
}