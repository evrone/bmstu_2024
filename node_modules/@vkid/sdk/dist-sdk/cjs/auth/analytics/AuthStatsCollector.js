'use strict';

var RegistrationStatsCollector = require('../../core/analytics/RegistrationStatsCollector.js');
var types = require('../../core/analytics/types.js');
var ProductionStatsCollector = require('../../core/analytics/ProductionStatsCollector.js');
var ActionStatsCollector = require('../../core/analytics/ActionStatsCollector.js');

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
var AuthStatsCollector = /*#__PURE__*/ function() {
    function AuthStatsCollector(config) {
        _class_call_check(this, AuthStatsCollector);
        _define_property(this, "registrationStatsCollector", void 0);
        _define_property(this, "uniqueSessionId", void 0);
        var productStatsCollector = new ProductionStatsCollector.ProductionStatsCollector(config);
        var actionStatsCollector = new ActionStatsCollector.ActionStatsCollector(productStatsCollector);
        this.registrationStatsCollector = new RegistrationStatsCollector.RegistrationStatsCollector(actionStatsCollector);
    }
    _create_class(AuthStatsCollector, [
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
            key: "sendCustomAuthStart",
            value: function sendCustomAuthStart(provider) {
                var fields = this.getFields();
                if (provider) {
                    fields.push({
                        name: "oauth_service",
                        value: provider
                    });
                }
                return this.registrationStatsCollector.logEvent(types.ProductionStatsEventScreen.NOWHERE, {
                    event_type: "custom_auth_start",
                    fields: fields
                });
            }
        }
    ]);
    return AuthStatsCollector;
}();

exports.AuthStatsCollector = AuthStatsCollector;
