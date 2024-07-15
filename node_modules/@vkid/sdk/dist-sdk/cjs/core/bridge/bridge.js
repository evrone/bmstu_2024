'use strict';

var dispatcher = require('../dispatcher/dispatcher.js');
var types = require('./types.js');

function _assert_this_initialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
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
function _get_prototype_of(o) {
    _get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _get_prototype_of(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _set_prototype_of(subClass, superClass);
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function _possible_constructor_return(self, call) {
    if (call && (_type_of(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assert_this_initialized(self);
}
function _set_prototype_of(o, p) {
    _set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _set_prototype_of(o, p);
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _is_native_reflect_construct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _create_super(Derived) {
    var hasNativeReflectConstruct = _is_native_reflect_construct();
    return function _createSuperInternal() {
        var Super = _get_prototype_of(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _get_prototype_of(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possible_constructor_return(this, result);
    };
}
var BRIDGE_MESSAGE_TYPE_SDK = "vk-sak-sdk";
var Bridge = /*#__PURE__*/ function(Dispatcher) {
    _inherits(Bridge, Dispatcher);
    var _super = _create_super(Bridge);
    function Bridge(config) {
        _class_call_check(this, Bridge);
        var _this;
        _this = _super.call(this);
        _define_property(_assert_this_initialized(_this), "config", void 0);
        _this.config = config;
        _this.handleMessage = _this.handleMessage.bind(_assert_this_initialized(_this));
        // eslint-disable-next-line
        window.addEventListener("message", _this.handleMessage);
        return _this;
    }
    _create_class(Bridge, [
        {
            key: "destroy",
            value: function destroy() {
                /* Clear references for memory */ // @ts-ignore-next-line Удаление происходит при десктруктуризации бриджа, поэтому это безопасно.
                delete this.config;
                // eslint-disable-next-line
                window.removeEventListener("message", this.handleMessage);
            }
        },
        {
            key: "sendMessage",
            value: function sendMessage(message) {
                var _this_config_iframe_contentWindow;
                (_this_config_iframe_contentWindow = this.config.iframe.contentWindow) === null || _this_config_iframe_contentWindow === void 0 ? void 0 : _this_config_iframe_contentWindow.postMessage(_object_spread({
                    type: BRIDGE_MESSAGE_TYPE_SDK
                }, message), this.config.origin);
            }
        },
        {
            key: "handleMessage",
            value: function handleMessage(event) {
                var _event_data;
                var isUnsupportedMessage = !this.config.origin || event.origin !== this.config.origin || event.source !== this.config.iframe.contentWindow || ((_event_data = event.data) === null || _event_data === void 0 ? void 0 : _event_data.type) !== BRIDGE_MESSAGE_TYPE_SDK;
                if (isUnsupportedMessage) {
                    this.events.emit(types.BridgeEvents.UNSUPPORTED_MESSAGE, event.data);
                    return;
                }
                this.events.emit(types.BridgeEvents.MESSAGE, event.data);
            }
        }
    ]);
    return Bridge;
}(dispatcher.Dispatcher);

exports.BRIDGE_MESSAGE_TYPE_SDK = BRIDGE_MESSAGE_TYPE_SDK;
exports.Bridge = Bridge;
