'use strict';

var constants = require('../../constants.js');
var request = require('../../utils/request.js');

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
var ProductionStatsCollector = /*#__PURE__*/ function() {
    function ProductionStatsCollector(config) {
        _class_call_check(this, ProductionStatsCollector);
        _define_property(this, "timeoutId", null);
        _define_property(this, "lastEvent", void 0);
        _define_property(this, "config", void 0);
        _define_property(this, "stackEvents", []);
        this.config = config;
    }
    _create_class(ProductionStatsCollector, [
        {
            key: "getIntId",
            value: function getIntId() {
                return Math.floor(Math.random() * ProductionStatsCollector.MAX_INT32);
            }
        },
        {
            key: "getCurrentTime",
            value: function getCurrentTime() {
                var isMicrosec = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
                var strTime = Date.now().toString(10);
                if (isMicrosec) {
                    return strTime + "000";
                }
                return strTime;
            }
        },
        {
            key: "sendStats",
            value: function sendStats(event) {
                var _this = this;
                this.stackEvents.push(event);
                this.timeoutId && window.clearTimeout(this.timeoutId);
                return new Promise(function(res, rej) {
                    _this.timeoutId = window.setTimeout(function() {
                        var params = {
                            events: JSON.stringify(_this.stackEvents),
                            sak_version: constants.VERSION
                        };
                        _this.stackEvents = [];
                        var url = request.getStatsUrl("stat_events_vkid_sdk", _this.config);
                        request.request(url, params).then(res).catch(rej);
                    }, 0);
                });
            }
        },
        {
            key: "getBaseEvent",
            value: function getBaseEvent(screen) {
                var _this_lastEvent;
                return {
                    id: this.getIntId(),
                    prev_event_id: ((_this_lastEvent = this.lastEvent) === null || _this_lastEvent === void 0 ? void 0 : _this_lastEvent.id) || 0,
                    prev_nav_id: 0,
                    timestamp: this.getCurrentTime(),
                    url: window.location.href,
                    screen: screen
                };
            }
        },
        {
            key: "logEvent",
            value: function logEvent(event) {
                this.lastEvent = event;
                return this.sendStats(event);
            }
        }
    ]);
    return ProductionStatsCollector;
}();
_define_property(ProductionStatsCollector, "MAX_INT32", 2147483647);

exports.ProductionStatsCollector = ProductionStatsCollector;
