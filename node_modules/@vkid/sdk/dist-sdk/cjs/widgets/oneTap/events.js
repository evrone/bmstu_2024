'use strict';

exports.OneTapInternalEvents = void 0;
(function(OneTapInternalEvents) {
    OneTapInternalEvents["LOGIN_SUCCESS"] = "onetap: success login";
    OneTapInternalEvents["SHOW_FULL_AUTH"] = "onetap: show full auth";
    OneTapInternalEvents["START_AUTHORIZE"] = "onetap: start authorize";
    OneTapInternalEvents["NOT_AUTHORIZED"] = "onetap: not authorized";
    OneTapInternalEvents[/**
   * Событие вызывается при наличии аутентификации пользователя.
   * В качестве payload передается флаг is_online: boolean.
   */ "AUTHENTICATION_INFO"] = "onetap: authentication_info";
})(exports.OneTapInternalEvents || (exports.OneTapInternalEvents = {}));
