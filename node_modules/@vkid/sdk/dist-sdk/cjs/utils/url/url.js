'use strict';

require('./../../lib/@vkontakte/vkjs/lib/es6/detections.js');
var querystring = require('./../../lib/@vkontakte/vkjs/lib/es6/querystring.js');
var constants = require('../../constants.js');

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
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
var getVKIDUrl = function(module, params, config) {
    var queryParams = _object_spread_props(_object_spread({}, params), {
        v: constants.VERSION,
        sdk_type: "vkid",
        app_id: config.app,
        redirect_uri: config.redirectUrl,
        debug: config.__debug ? 1 : null,
        localhost: config.__localhost ? 1 : null
    });
    var queryParamsString = querystring.querystring.stringify(queryParams, {
        skipNull: true
    });
    return "https://".concat(config.__vkidDomain, "/").concat(module, "?").concat(queryParamsString);
};
var getRedirectWithPayloadUrl = function(payload, config) {
    var redirectUrlFromConfig = config.get().redirectUrl;
    var containsQuery = redirectUrlFromConfig.includes("?");
    var params = Object.keys(payload).map(function(key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(payload[key]);
    }).join("&");
    return "".concat(redirectUrlFromConfig).concat(containsQuery ? "&" : "?").concat(params);
};
var encodeStatsInfo = function(params) {
    var hasParams = Object.values(params).filter(Boolean).length;
    if (hasParams) {
        return btoa(JSON.stringify(params));
    }
};

exports.encodeStatsInfo = encodeStatsInfo;
exports.getRedirectWithPayloadUrl = getRedirectWithPayloadUrl;
exports.getVKIDUrl = getVKIDUrl;
