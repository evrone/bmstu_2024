'use strict';

var functions = require('./functions.js');
var dom = require('./dom.js');

exports.isPassiveEventsSupported = false;

if (dom.canUseEventListeners) {
  try {
    var options = Object.defineProperty({}, 'passive', {
      get: function get() {
        exports.isPassiveEventsSupported = true;
      }
    });
    window.addEventListener('test', functions.noop, options);
    window.removeEventListener('test', functions.noop, options);
  } catch (e) {}
}

function detectSmoothScrollSupport() {
  if (!dom.canUseDOM) {
    return false;
  }

  var isSupported = false;

  try {
    var div = document.createElement('div');
    div.scrollTo({
      top: 0,

      // @ts-ignore
      get behavior() {
        isSupported = true;
        return 'smooth';
      }

    });
  } catch (e) {}

  return isSupported;
}

detectSmoothScrollSupport();
