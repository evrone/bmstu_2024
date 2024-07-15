'use strict';

var _typeof = require('./typeof.js');
var toPrimitive = require('./toPrimitive.js');

function _toPropertyKey(arg) {
  var key = toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

module.exports = _toPropertyKey;
