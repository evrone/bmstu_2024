'use strict';

var validator = function(rules) {
    return function(target, propertyName, descriptor) {
        var originalMethod = descriptor.value;
        descriptor.value = function validator(params) {
            var _originalMethod;
            var rulesKeys = Object.keys(rules);
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            try {
                var _loop = function() {
                    var key = _step.value;
                    var _validateHandlers;
                    var validateHandlers = rules[key];
                    (_validateHandlers = validateHandlers) === null || _validateHandlers === void 0 ? void 0 : _validateHandlers.forEach(function(handler) {
                        var _handler = handler(params[key]), result = _handler.result, makeError = _handler.makeError;
                        if (!result) {
                            throw new Error(makeError(key));
                        }
                    });
                };
                for(var _iterator = rulesKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop();
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                        _iterator.return();
                    }
                } finally{
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
            return (_originalMethod = originalMethod) === null || _originalMethod === void 0 ? void 0 : _originalMethod.apply(this, arguments);
        };
    };
};

exports.validator = validator;
