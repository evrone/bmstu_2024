'use strict';

var getStatsUrl = function(method, config) {
    var _config_get = config.get(), domain = _config_get.__vkidDomain, app = _config_get.app;
    return "https://".concat(domain, "/").concat(method, "?app_id=").concat(app, "&v=5.207");
};
var makeParams = function(params) {
    var pairs = Object.keys(params).map(function(key) {
        var param = params[key];
        key = encodeURIComponent(key || "");
        param = encodeURIComponent(param === undefined ? "" : param);
        return "".concat(key, "=").concat(param);
    });
    return pairs.join("&");
};
var request = function(url, params) {
    var paramsString = makeParams(params);
    return fetch(url, {
        method: "POST",
        body: paramsString,
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function(res) {
        return res.json();
    });
};

exports.getStatsUrl = getStatsUrl;
exports.request = request;
