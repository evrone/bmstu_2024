'use strict';

var mitt_es = require('./../../lib/mitt/dist/mitt.es.js');

function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
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
var Dispatcher = /*#__PURE__*/ function() {
    function Dispatcher() {
        _class_call_check(this, Dispatcher);
        _define_property(this, "events", mitt_es());
    }
    _create_class(Dispatcher, [
        {
            key: "on",
            value: function on(event, handler) {
                this.events.on(event, handler);
                return this;
            }
        },
        {
            key: "off",
            value: function off(event, handler) {
                this.events.off(event, handler);
                return this;
            }
        }
    ]);
    return Dispatcher;
}();

exports.Dispatcher = Dispatcher;
