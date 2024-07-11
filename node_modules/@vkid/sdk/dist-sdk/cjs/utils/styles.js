'use strict';

var getButtonPadding = function(height) {
    var res = (height - 30) / 2 + 3;
    if (height < 40) {
        return res;
    }
    return res - 2;
};
var getButtonFontSize = function(height) {
    if (height < 40) {
        return 14;
    }
    if (height > 47) {
        return 17;
    }
    return 16;
};
var getButtonLogoSize = function(height) {
    if (height < 40) {
        return 24;
    }
    return 28;
};

exports.getButtonFontSize = getButtonFontSize;
exports.getButtonLogoSize = getButtonLogoSize;
exports.getButtonPadding = getButtonPadding;
