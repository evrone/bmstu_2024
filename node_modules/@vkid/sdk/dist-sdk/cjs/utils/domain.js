'use strict';

var ALLOWED_DOMAINS = [
    ".vk.com",
    ".vk.ru"
];
var isDomainAllowed = function(origin) {
    return !!ALLOWED_DOMAINS.find(function(domain) {
        return origin.endsWith(domain);
    });
};

exports.isDomainAllowed = isDomainAllowed;
