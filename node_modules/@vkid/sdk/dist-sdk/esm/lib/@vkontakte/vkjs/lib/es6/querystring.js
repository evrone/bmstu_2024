import _defineProperty from '../../../../@babel/runtime/helpers/esm/defineProperty.js';
import _typeof from '../../../../@babel/runtime/helpers/esm/typeof.js';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function parse(query) {
  if (typeof query !== 'string') {
    return {};
  }

  query = query.trim().replace(/^[?#&]/, '');

  if (!query) {
    return {};
  }

  var matches = /\?(.+)$/ig.exec(query);
  var str = matches ? matches[1] : query;
  return str.split('&').reduce(function (acc, item) {
    var param = item.split('=');

    if (param[1]) {
      acc[param[0]] = decodeURIComponent(param[1]);
    }

    return acc;
  }, {});
}

function stringify(data) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (_typeof(data) !== 'object' || data === null) {
    return '';
  }

  options = _objectSpread({
    encode: true
  }, options);

  var encode = function encode(value) {
    return options.encode ? encodeURIComponent(value) : String(value);
  };

  return Object.keys(data).reduce(function (acc, key) {
    var value = data[key];

    if (value === undefined) {
      return acc;
    }

    if (value === null) {
      if (!options.skipNull) {
        acc.push([encode(key), ''].join('='));
      }

      return acc;
    }

    if (Array.isArray(value)) {
      value.map(function (arrayItem) {
        acc.push("".concat(encode(key), "[]=").concat(encode(arrayItem)));
      }).join();
      return acc;
    }

    acc.push([encode(key), encode(value)].join('='));
    return acc;
  }, []).join('&');
}

var querystring = {
  parse: parse,
  stringify: stringify
};

export { querystring };
