'use strict';

function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var isRequired = function(param) {
    var result = true;
    if (typeof param === "string" && param.trim() === "" || param === undefined || param == null) {
        result = false;
    }
    return {
        result: result,
        makeError: function(valueName) {
            return "".concat(valueName, " is required parameter");
        }
    };
};
var isNumber = function(param) {
    return {
        result: [
            "number",
            "string"
        ].includes(typeof param === "undefined" ? "undefined" : _type_of(param)) && !isNaN(parseInt(param)),
        makeError: function(valueName) {
            return "".concat(valueName, " should be number");
        }
    };
};
var isValidHeight = function(param) {
    var result = param !== undefined && param.height !== undefined && isNumber(param.height) && param.height < 57 && param.height > 31 || param === undefined || param.height === undefined;
    return {
        result: result,
        makeError: function() {
            return "The height should correspond to the range from 32 to 56";
        }
    };
};
var isNotEmptyOAuthList = function(param) {
    var _param;
    return {
        result: ((_param = param) === null || _param === void 0 ? void 0 : _param.length) && param.length >= 1,
        makeError: function() {
            return "OAuth list can't be empty";
        }
    };
};

exports.isNotEmptyOAuthList = isNotEmptyOAuthList;
exports.isNumber = isNumber;
exports.isRequired = isRequired;
exports.isValidHeight = isValidHeight;
