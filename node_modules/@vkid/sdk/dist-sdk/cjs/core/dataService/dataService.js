'use strict';

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
var DataService = /*#__PURE__*/ function() {
    function DataService() {
        var _this = this;
        _class_call_check(this, DataService);
        _define_property(this, "promise", void 0);
        _define_property(this, "callback", void 0);
        _define_property(this, "resolve", void 0);
        _define_property(this, "reject", void 0);
        _define_property(this, "setCallback", function(callback) {
            _this.callback = callback;
        });
        _define_property(this, "removeCallback", function() {
            _this.callback = null;
        });
        _define_property(this, "sendSuccess", function(value) {
            _this.resolve(value);
            _this.callback && _this.callback();
        });
        _define_property(this, "sendError", function(value) {
            _this.reject(value);
            _this.callback && _this.callback();
        });
        this.promise = new Promise(function(resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
        });
    }
    _create_class(DataService, [
        {
            key: "value",
            get: function get() {
                return this.promise;
            }
        }
    ]);
    return DataService;
}();

exports.DataService = DataService;
