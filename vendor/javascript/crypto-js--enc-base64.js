import r from"./core.js";import"crypto";var a="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:global;var e={};(function(a,t){e=e=t(r)})(0,(function(r){(function(){var e=r;var t=e.lib;var v=t.WordArray;var o=e.enc;o.Base64={
/**
       * Converts a word array to a Base64 string.
       *
       * @param {WordArray} wordArray The word array.
       *
       * @return {string} The Base64 string.
       *
       * @static
       *
       * @example
       *
       *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
       */
stringify:function(r){var e=r.words;var t=r.sigBytes;var v=(this||a)._map;r.clamp();var o=[];for(var n=0;n<t;n+=3){var i=e[n>>>2]>>>24-n%4*8&255;var f=e[n+1>>>2]>>>24-(n+1)%4*8&255;var s=e[n+2>>>2]>>>24-(n+2)%4*8&255;var p=i<<16|f<<8|s;for(var c=0;c<4&&n+.75*c<t;c++)o.push(v.charAt(p>>>6*(3-c)&63))}var h=v.charAt(64);if(h)while(o.length%4)o.push(h);return o.join("")},
/**
       * Converts a Base64 string to a word array.
       *
       * @param {string} base64Str The Base64 string.
       *
       * @return {WordArray} The word array.
       *
       * @static
       *
       * @example
       *
       *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
       */
parse:function(r){var e=r.length;var t=(this||a)._map;var v=(this||a)._reverseMap;if(!v){v=(this||a)._reverseMap=[];for(var o=0;o<t.length;o++)v[t.charCodeAt(o)]=o}var n=t.charAt(64);if(n){var i=r.indexOf(n);-1!==i&&(e=i)}return parseLoop(r,e,v)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="};function parseLoop(r,a,e){var t=[];var o=0;for(var n=0;n<a;n++)if(n%4){var i=e[r.charCodeAt(n-1)]<<n%4*2;var f=e[r.charCodeAt(n)]>>>6-n%4*2;var s=i|f;t[o>>>2]|=s<<24-o%4*8;o++}return v.create(t,o)}})();return r.enc.Base64}));var t=e;export{t as default};

