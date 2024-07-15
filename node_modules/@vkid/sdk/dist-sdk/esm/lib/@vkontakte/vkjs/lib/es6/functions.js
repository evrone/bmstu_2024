var noop = function noop() {}; // eslint-disable-line @typescript-eslint/no-empty-function
function debounce(fn, delay) {
  var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window;
  var timeout;
  var args;

  var later = function later() {
    return fn.apply(context, args);
  };

  return function () {
    for (var _len2 = arguments.length, a = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      a[_key2] = arguments[_key2];
    }

    args = a;
    clearTimeout(timeout);
    timeout = setTimeout(later, delay);
  };
}

export { debounce, noop };
