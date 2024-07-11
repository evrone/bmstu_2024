'use strict';

var types = require('./types.js');

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
var RegistrationStatsCollector = /*#__PURE__*/ function() {
    function RegistrationStatsCollector(actionStatsCollector) {
        _class_call_check(this, RegistrationStatsCollector);
        _define_property(this, "actionStatsCollector", void 0);
        this.actionStatsCollector = actionStatsCollector;
    }
    _create_class(RegistrationStatsCollector, [
        {
            key: "logEvent",
            value: function logEvent(screen, event) {
                var statsEvent = _define_property({
                    type: types.ProductionStatsTypeActions.TYPE_REGISTRATION_ITEM
                }, types.ProductionStatsTypeActions.TYPE_REGISTRATION_ITEM, event);
                return this.actionStatsCollector.logEvent({
                    screen: screen,
                    event: statsEvent
                });
            }
        }
    ]);
    return RegistrationStatsCollector;
}();

exports.RegistrationStatsCollector = RegistrationStatsCollector;
