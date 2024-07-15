'use strict';

var RegistrationStatsCollector = require('../../../core/analytics/RegistrationStatsCollector.js');
require('../../../core/analytics/types.js');
var ProductionStatsCollector = require('../../../core/analytics/ProductionStatsCollector.js');
var ActionStatsCollector = require('../../../core/analytics/ActionStatsCollector.js');

function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
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
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
var OAuthListStatsCollector = /*#__PURE__*/ function() {
    function OAuthListStatsCollector(config) {
        _class_call_check(this, OAuthListStatsCollector);
        _define_property(this, "registrationStatsCollector", void 0);
        _define_property(this, "uniqueSessionId", void 0);
        var productStatsCollector = new ProductionStatsCollector.ProductionStatsCollector(config);
        var actionStatsCollector = new ActionStatsCollector.ActionStatsCollector(productStatsCollector);
        this.registrationStatsCollector = new RegistrationStatsCollector.RegistrationStatsCollector(actionStatsCollector);
    }
    _create_class(OAuthListStatsCollector, [
        {
            key: "setUniqueSessionId",
            value: function setUniqueSessionId(id) {
                this.uniqueSessionId = id;
            }
        },
        {
            key: "getFields",
            value: function getFields() {
                var fields = [
                    {
                        name: "sdk_type",
                        value: "vkid"
                    }
                ];
                if (this.uniqueSessionId) {
                    fields.push({
                        name: "unique_session_id",
                        value: this.uniqueSessionId
                    });
                }
                return fields;
            }
        },
        {
            key: "sendMultibrandingOauthAdded",
            value: function sendMultibrandingOauthAdded(param) {
                var screen = param.screen, fields = param.fields;
                void this.registrationStatsCollector.logEvent(screen, {
                    event_type: "multibranding_oauth_added",
                    fields: _to_consumable_array(this.getFields()).concat(_to_consumable_array(fields))
                });
            }
        },
        {
            key: "sendOkButtonShow",
            value: function sendOkButtonShow(param) {
                var screen = param.screen, isIcon = param.isIcon;
                void this.registrationStatsCollector.logEvent(screen, {
                    event_type: "ok_button_show",
                    fields: _to_consumable_array(this.getFields()).concat([
                        {
                            name: "button_type",
                            value: isIcon ? "icon" : "default"
                        }
                    ])
                });
            }
        },
        {
            key: "sendVkButtonShow",
            value: function sendVkButtonShow(param) {
                var screen = param.screen, isIcon = param.isIcon;
                void this.registrationStatsCollector.logEvent(screen, {
                    event_type: "vk_button_show",
                    fields: _to_consumable_array(this.getFields()).concat([
                        {
                            name: "button_type",
                            value: isIcon ? "icon" : "default"
                        }
                    ])
                });
            }
        },
        {
            key: "sendMailButtonShow",
            value: function sendMailButtonShow(param) {
                var screen = param.screen, isIcon = param.isIcon;
                void this.registrationStatsCollector.logEvent(screen, {
                    event_type: "mail_button_show",
                    fields: _to_consumable_array(this.getFields()).concat([
                        {
                            name: "button_type",
                            value: isIcon ? "icon" : "default"
                        }
                    ])
                });
            }
        },
        {
            key: "sendVkButtonTap",
            value: function sendVkButtonTap(param) {
                var screen = param.screen, isIcon = param.isIcon;
                return this.registrationStatsCollector.logEvent(screen, {
                    event_type: "vk_button_tap",
                    fields: _to_consumable_array(this.getFields()).concat([
                        {
                            name: "button_type",
                            value: isIcon ? "icon" : "default"
                        }
                    ])
                });
            }
        },
        {
            key: "sendOkButtonTap",
            value: function sendOkButtonTap(param) {
                var screen = param.screen, isIcon = param.isIcon;
                return this.registrationStatsCollector.logEvent(screen, {
                    event_type: "ok_button_tap",
                    fields: _to_consumable_array(this.getFields()).concat([
                        {
                            name: "button_type",
                            value: isIcon ? "icon" : "default"
                        }
                    ])
                });
            }
        },
        {
            key: "sendMailButtonTap",
            value: function sendMailButtonTap(param) {
                var screen = param.screen, isIcon = param.isIcon;
                return this.registrationStatsCollector.logEvent(screen, {
                    event_type: "mail_button_tap",
                    fields: _to_consumable_array(this.getFields()).concat([
                        {
                            name: "button_type",
                            value: isIcon ? "icon" : "default"
                        }
                    ])
                });
            }
        }
    ]);
    return OAuthListStatsCollector;
}();

exports.OAuthListStatsCollector = OAuthListStatsCollector;
