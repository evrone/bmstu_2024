var WidgetState;
(function(WidgetState) {
    WidgetState["LOADING"] = 'loading';
    WidgetState["LOADED"] = 'loaded';
    WidgetState["NOT_LOADED"] = 'not_loaded';
})(WidgetState || (WidgetState = {}));
var WidgetErrorCode;
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
})(WidgetErrorCode || (WidgetErrorCode = {}));

export { WidgetErrorCode, WidgetState };
