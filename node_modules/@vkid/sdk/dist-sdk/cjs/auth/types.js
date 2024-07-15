'use strict';

exports.AuthStatsFlowSource = void 0;
(function(AuthStatsFlowSource) {
    AuthStatsFlowSource["AUTH"] = "from_custom_auth";
    AuthStatsFlowSource["BUTTON_ONE_TAP"] = "from_one_tap";
    AuthStatsFlowSource["FLOATING_ONE_TAP"] = "from_floating_one_tap";
    AuthStatsFlowSource["MULTIBRANDING"] = "from_multibranding";
})(exports.AuthStatsFlowSource || (exports.AuthStatsFlowSource = {}));
exports.AuthErrorCode = void 0;
(function(AuthErrorCode) {
    AuthErrorCode[AuthErrorCode[/**
   * Неизвестное событие
   */ "EventNotSupported"] = 100] = "EventNotSupported";
    AuthErrorCode[AuthErrorCode[/**
   * Новая вкладка не создалась
   */ "CannotCreateNewTab"] = 101] = "CannotCreateNewTab";
    AuthErrorCode[AuthErrorCode[/**
   * Новая вкладка была закрыта
   */ "NewTabHasBeenClosed"] = 102] = "NewTabHasBeenClosed";
    AuthErrorCode[AuthErrorCode[/**
   * Авторизация завершилась ошибкой
   */ "AuthorizationFailed"] = 103] = "AuthorizationFailed";
    AuthErrorCode[AuthErrorCode[/**
   * Проверка стейта завершилась с ошибкой
   */ "StateMismatch"] = 104] = "StateMismatch";
})(exports.AuthErrorCode || (exports.AuthErrorCode = {}));
