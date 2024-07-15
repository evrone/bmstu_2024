var OAuthName;
(function(OAuthName) {
    OAuthName["OK"] = 'ok_ru';
    OAuthName["MAIL"] = 'mail_ru';
    OAuthName["VK"] = 'vkid';
})(OAuthName || (OAuthName = {}));
var ExternalOAuthName;
(function(ExternalOAuthName) {
    ExternalOAuthName[ExternalOAuthName["OK"] = OAuthName.OK] = "OK";
    ExternalOAuthName[ExternalOAuthName["MAIL"] = OAuthName.MAIL] = "MAIL";
})(ExternalOAuthName || (ExternalOAuthName = {}));

export { ExternalOAuthName, OAuthName };
