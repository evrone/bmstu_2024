'use strict';

exports.OAuthName = void 0;
(function(OAuthName) {
    OAuthName["OK"] = "ok_ru";
    OAuthName["MAIL"] = "mail_ru";
    OAuthName["VK"] = "vkid";
})(exports.OAuthName || (exports.OAuthName = {}));
exports.ExternalOAuthName = void 0;
(function(ExternalOAuthName) {
    ExternalOAuthName[ExternalOAuthName["OK"] = exports.OAuthName.OK] = "OK";
    ExternalOAuthName[ExternalOAuthName["MAIL"] = exports.OAuthName.MAIL] = "MAIL";
})(exports.ExternalOAuthName || (exports.ExternalOAuthName = {}));
