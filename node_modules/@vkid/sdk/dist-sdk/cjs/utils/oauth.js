'use strict';

var Base64 = require('crypto-js/enc-base64');
var sha256 = require('crypto-js/sha256');

/**
 * Генерация code challenge для нового oauth
 */ var generateCodeChallenge = function(codeVerifier) {
    var hash = sha256(codeVerifier);
    var base64 = Base64.stringify(hash);
    return base64.replace(/=*$/g, "").replace(/\+/g, "-").replace(/\//g, "_");
};

exports.generateCodeChallenge = generateCodeChallenge;
