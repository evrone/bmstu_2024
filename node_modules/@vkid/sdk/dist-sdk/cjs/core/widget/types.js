'use strict';

exports.WidgetState = void 0;
(function(WidgetState) {
    WidgetState["LOADING"] = "loading";
    WidgetState["LOADED"] = "loaded";
    WidgetState["NOT_LOADED"] = "not_loaded";
})(exports.WidgetState || (exports.WidgetState = {}));
exports.WidgetErrorCode = void 0;
(function(WidgetErrorCode) {
    WidgetErrorCode[WidgetErrorCode[/**
   * Не загрузился iframe
   */ "TimeoutExceeded"] = 0] = "TimeoutExceeded";
    WidgetErrorCode[WidgetErrorCode[/**
   * Внутренняя ошибка
   */ "InternalError"] = 1] = "InternalError";
    WidgetErrorCode[WidgetErrorCode[/**
   * Ошибка авторизации
   */ "AuthError"] = 2] = "AuthError";
})(exports.WidgetErrorCode || (exports.WidgetErrorCode = {}));
