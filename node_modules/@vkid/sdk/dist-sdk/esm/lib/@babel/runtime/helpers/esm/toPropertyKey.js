import _typeof from './typeof.js';
import _toPrimitive from './toPrimitive.js';

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

export { _toPropertyKey as default };
