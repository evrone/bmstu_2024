'use strict';

var bridge = require('../bridge/bridge.js');
var types$1 = require('../bridge/types.js');
var dispatcher = require('../dispatcher/dispatcher.js');
var validator = require('../validator/validator.js');
var rules = require('../validator/rules.js');
var url = require('../../utils/url/url.js');
var uuid = require('../../utils/uuid.js');
var events$1 = require('../../widgets/oneTap/events.js');
var constants = require('./constants.js');
var events = require('./events.js');
var template = require('./template.js');
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
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _object_without_properties(source, excluded) {
    if (source == null) return {};
    var target = _object_without_properties_loose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _object_without_properties_loose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
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
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
var MODULE_LOAD_TIMEOUT = 5000;
var MODULE_CHANGE_STATE_TIMEOUT = 300;
var Widget = /*#__PURE__*/ function(Dispatcher) {
    _inherits(Widget, Dispatcher);
    var _super = _create_super(Widget);
    function Widget() {
        _class_call_check(this, Widget);
        var _this;
        _this = _super.call(this);
        _define_property(_assert_this_initialized(_this), "id", uuid.uuid());
        _define_property(_assert_this_initialized(_this), "lang", void 0);
        _define_property(_assert_this_initialized(_this), "scheme", void 0);
        _define_property(_assert_this_initialized(_this), "vkidAppName", "");
        _define_property(_assert_this_initialized(_this), "config", void 0);
        _define_property(_assert_this_initialized(_this), "timeoutTimer", void 0);
        _define_property(_assert_this_initialized(_this), "bridge", void 0);
        _define_property(_assert_this_initialized(_this), "container", void 0);
        _define_property(_assert_this_initialized(_this), "templateRenderer", template.getWidgetTemplate);
        _define_property(_assert_this_initialized(_this), "elements", void 0);
        _this.config = Widget.config;
        return _this;
    }
    _create_class(Widget, [
        {
            key: "render",
            value: function render(params) {
                var container = params.container, otherParams = _object_without_properties(params, [
                    "container"
                ]);
                this.container = container;
                this.renderTemplate();
                this.registerElements();
                if ("fastAuthDisabled" in params && params["fastAuthDisabled"]) {
                    this.setState(types.WidgetState.NOT_LOADED);
                    return this;
                }
                this.loadWidgetFrame(otherParams);
                return this;
            }
        },
        {
            key: "close",
            value: function close() {
                var _this_elements_root, _this_elements, _this_bridge;
                clearTimeout(this.timeoutTimer);
                (_this_elements = this.elements) === null || _this_elements === void 0 ? void 0 : (_this_elements_root = _this_elements.root) === null || _this_elements_root === void 0 ? void 0 : _this_elements_root.remove();
                (_this_bridge = this.bridge) === null || _this_bridge === void 0 ? void 0 : _this_bridge.destroy();
                this.events.emit(events.WidgetEvents.CLOSE);
            }
        },
        {
            key: "show",
            value: function show() {
                if (this.elements.root) {
                    this.elements.root.style.display = "block";
                    this.events.emit(events.WidgetEvents.SHOW);
                }
                return this;
            }
        },
        {
            key: "hide",
            value: function hide() {
                if (this.elements.root) {
                    this.elements.root.style.display = "none";
                    this.events.emit(events.WidgetEvents.HIDE);
                }
                return this;
            }
        },
        {
            key: "onStartLoadHandler",
            value: /**
   * Метод вызывается перед началом загрузки iframe с VK ID приложением
   */ function onStartLoadHandler() {
                var _this = this;
                this.setState(types.WidgetState.LOADING);
                this.timeoutTimer = setTimeout(function() {
                    _this.onErrorHandler({
                        code: types.WidgetErrorCode.TimeoutExceeded,
                        text: constants.WIDGET_ERROR_TEXT[types.WidgetErrorCode.TimeoutExceeded]
                    });
                }, MODULE_LOAD_TIMEOUT);
                this.events.emit(events.WidgetEvents.START_LOAD);
            }
        },
        {
            key: "onLoadHandler",
            value: /**
   * Метод вызывается после того, как полностью загружен iframe с VK ID приложением
   */ function onLoadHandler() {
                var _this = this;
                clearTimeout(this.timeoutTimer);
                setTimeout(function() {
                    // Задержка избавляет от моргания замены шаблона на iframe
                    _this.setState(types.WidgetState.LOADED);
                }, MODULE_CHANGE_STATE_TIMEOUT);
                this.events.emit(events.WidgetEvents.LOAD);
            }
        },
        {
            key: "onErrorHandler",
            value: /**
   * Метод вызывается, когда во время работы/загрузки VK ID приложения произошла ошибка
   */ function onErrorHandler(error) {
                var _this_elements_iframe, _this_elements;
                clearTimeout(this.timeoutTimer);
                this.setState(types.WidgetState.NOT_LOADED);
                this.events.emit(events$1.OneTapInternalEvents.AUTHENTICATION_INFO, {
                    is_online: false
                });
                this.events.emit(events.WidgetEvents.ERROR, error);
                (_this_elements = this.elements) === null || _this_elements === void 0 ? void 0 : (_this_elements_iframe = _this_elements.iframe) === null || _this_elements_iframe === void 0 ? void 0 : _this_elements_iframe.remove();
            }
        },
        {
            key: "onBridgeMessageHandler",
            value: /**
   * Метод вызывается при сообщениях от VK ID приложения
   */ function onBridgeMessageHandler(event) {
                switch(event.handler){
                    case events.WidgetEvents.LOAD:
                        {
                            this.onLoadHandler();
                            break;
                        }
                    case events.WidgetEvents.CLOSE:
                        {
                            this.close();
                            break;
                        }
                    case events.WidgetEvents.ERROR:
                        {
                            this.onErrorHandler({
                                code: types.WidgetErrorCode.InternalError,
                                text: constants.WIDGET_ERROR_TEXT[types.WidgetErrorCode.InternalError],
                                details: event.params
                            });
                            break;
                        }
                    case events.WidgetEvents.RESIZE:
                        {
                            this.elements.root.style.height = "".concat(event.params.height, "px");
                            break;
                        }
                }
            }
        },
        {
            key: "renderTemplate",
            value: // <Дополнительные хелперы>
            function renderTemplate() {
                this.container.insertAdjacentHTML("beforeend", this.templateRenderer(this.id));
            }
        },
        {
            key: "loadWidgetFrame",
            value: function loadWidgetFrame(params) {
                var _this = this;
                this.onStartLoadHandler();
                this.bridge = new bridge.Bridge({
                    iframe: this.elements.iframe,
                    origin: "https://".concat(this.config.get().__vkidDomain)
                });
                this.bridge.on(types$1.BridgeEvents.MESSAGE, function(event) {
                    return _this.onBridgeMessageHandler(event);
                });
                this.elements.iframe.src = this.getWidgetFrameSrc(this.config.get(), params);
            }
        },
        {
            key: "getWidgetFrameSrc",
            value: function getWidgetFrameSrc(config, params) {
                var queryParams = _object_spread_props(_object_spread({}, params), {
                    origin: location.protocol + "//" + location.host,
                    oauth_version: 2
                });
                return url.getVKIDUrl(this.vkidAppName, queryParams, config);
            }
        },
        {
            key: "setState",
            value: function setState(state) {
                this.elements.root.setAttribute("data-state", state);
            }
        },
        {
            key: "registerElements",
            value: function registerElements() {
                var root = document.getElementById(this.id);
                this.elements = {
                    root: root,
                    iframe: root.querySelector("iframe")
                };
            }
        },
        {
            key: "redirectWithPayload",
            value: function redirectWithPayload(payload) {
                location.assign(url.getRedirectWithPayloadUrl(payload, Widget.config));
            }
        }
    ]);
    return Widget;
}(dispatcher.Dispatcher);
/**
   * @ignore
   */ _define_property(Widget, "config", void 0);
/**
   * @ignore
   */ _define_property(Widget, "auth", void 0);
_ts_decorate([
    validator.validator({
        container: [
            rules.isRequired
        ]
    })
], Widget.prototype, "render", null);

exports.Widget = Widget;
