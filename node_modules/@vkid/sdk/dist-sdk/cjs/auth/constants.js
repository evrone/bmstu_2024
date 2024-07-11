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
var OAUTH2_RESPONSE_TYPE = "code";
var _obj;
var AUTH_ERROR_TEXT = (_obj = {}, _define_property(_obj, types.AuthErrorCode.EventNotSupported, "Event is not supported"), _define_property(_obj, types.AuthErrorCode.CannotCreateNewTab, "Cannot create new tab. Try checking your browser settings"), _define_property(_obj, types.AuthErrorCode.NewTabHasBeenClosed, "New tab has been closed"), _define_property(_obj, types.AuthErrorCode.AuthorizationFailed, "Authorization failed with an error"), _define_property(_obj, types.AuthErrorCode.StateMismatch, "The received state does not match the expected state"), _obj);
var OAUTH2_RESPONSE = "oauth2_authorize_response";

exports.AUTH_ERROR_TEXT = AUTH_ERROR_TEXT;
exports.OAUTH2_RESPONSE = OAUTH2_RESPONSE;
exports.OAUTH2_RESPONSE_TYPE = OAUTH2_RESPONSE_TYPE;
