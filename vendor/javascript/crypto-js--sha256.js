import r from"./core.js";import"crypto";var a="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:global;var t={};(function(a,e){t=t=e(r)})(0,(function(r){(function(t){var e=r;var i=e.lib;var o=i.WordArray;var n=i.Hasher;var s=e.algo;var v=[];var l=[];(function(){function isPrime(r){var a=t.sqrt(r);for(var e=2;e<=a;e++)if(!(r%e))return false;return true}function getFractionalBits(r){return 4294967296*(r-(0|r))|0}var r=2;var a=0;while(a<64){if(isPrime(r)){a<8&&(v[a]=getFractionalBits(t.pow(r,.5)));l[a]=getFractionalBits(t.pow(r,1/3));a++}r++}})();var c=[];var f=s.SHA256=n.extend({_doReset:function(){(this||a)._hash=new o.init(v.slice(0))},_doProcessBlock:function(r,t){var e=(this||a)._hash.words;var i=e[0];var o=e[1];var n=e[2];var s=e[3];var v=e[4];var f=e[5];var h=e[6];var u=e[7];for(var d=0;d<64;d++){if(d<16)c[d]=0|r[t+d];else{var _=c[d-15];var p=(_<<25|_>>>7)^(_<<14|_>>>18)^_>>>3;var g=c[d-2];var H=(g<<15|g>>>17)^(g<<13|g>>>19)^g>>>10;c[d]=p+c[d-7]+H+c[d-16]}var m=v&f^~v&h;var y=i&o^i&n^o&n;var B=(i<<30|i>>>2)^(i<<19|i>>>13)^(i<<10|i>>>22);var w=(v<<26|v>>>6)^(v<<21|v>>>11)^(v<<7|v>>>25);var A=u+w+m+l[d]+c[d];var b=B+y;u=h;h=f;f=v;v=s+A|0;s=n;n=o;o=i;i=A+b|0}e[0]=e[0]+i|0;e[1]=e[1]+o|0;e[2]=e[2]+n|0;e[3]=e[3]+s|0;e[4]=e[4]+v|0;e[5]=e[5]+f|0;e[6]=e[6]+h|0;e[7]=e[7]+u|0},_doFinalize:function(){var r=(this||a)._data;var e=r.words;var i=8*(this||a)._nDataBytes;var o=8*r.sigBytes;e[o>>>5]|=128<<24-o%32;e[14+(o+64>>>9<<4)]=t.floor(i/4294967296);e[15+(o+64>>>9<<4)]=i;r.sigBytes=4*e.length;this._process();return(this||a)._hash},clone:function(){var r=n.clone.call(this||a);r._hash=(this||a)._hash.clone();return r}});
/**
     * Shortcut function to the hasher's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     *
     * @return {WordArray} The hash.
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.SHA256('message');
     *     var hash = CryptoJS.SHA256(wordArray);
     */e.SHA256=n._createHelper(f);
/**
     * Shortcut function to the HMAC's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     * @param {WordArray|string} key The secret key.
     *
     * @return {WordArray} The HMAC.
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacSHA256(message, key);
     */e.HmacSHA256=n._createHmacHelper(f)})(Math);return r.SHA256}));var e=t;export{e as default};

