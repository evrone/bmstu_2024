'use strict';

var types = require('./types.js');

function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
var _obj;
var WIDGET_ERROR_TEXT = (_obj = {}, _define_property(_obj, types.WidgetErrorCode.TimeoutExceeded, "timeout"), _define_property(_obj, types.WidgetErrorCode.InternalError, "internal error"), _define_property(_obj, types.WidgetErrorCode.AuthError, "auth error"), _obj);

exports.WIDGET_ERROR_TEXT = WIDGET_ERROR_TEXT;
