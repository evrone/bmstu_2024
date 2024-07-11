'use strict';

var types = require('../../../types.js');

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
var _obj;
var DESCRIPTION = (_obj = {}, _define_property(_obj, types.Languages.RUS, "После этого вам станут доступны все возможности сервиса. Ваши данные будут надёжно защищены."), _define_property(_obj, types.Languages.UKR, "Після цього вам стануть доступні всі можливості сервісу. Ваші дані будуть надійно захищені."), _define_property(_obj, types.Languages.BEL, "Пасля гэтага вам стануць даступны ўсе магчымасці сэрвісу. Вашы даныя будуць надзейна абаронены."), _define_property(_obj, types.Languages.KAZ, "Содан кейін сізге сервистің барлық мүмкіндігі қолжетімді болып, деректеріңіз сенімді қораулы болады."), _define_property(_obj, types.Languages.UZB, "Bundan so‘ng, sizga xizmatning barcha imkoniyatlari ochiladi. Maʼlumotlaringiz ishonchli himoyalanadi."), _define_property(_obj, types.Languages.ENG, "Afterwards, you'll have access to\xa0all of\xa0the\xa0service's features. Your personal data will be carefully protected."), _define_property(_obj, types.Languages.SPA, "Despu\xe9s, tendr\xe1s acceso a\xa0todas las funciones del\xa0servicio. Tus datos personales estar\xe1n cuidadosamente protegidos."), _define_property(_obj, types.Languages.GERMAN, "Anschlie\xdfend stehen Ihnen alle Funktionen des Dienstes zur Verf\xfcgung. Ihre\xa0pers\xf6nlichen Daten werden sorgf\xe4ltig gesch\xfctzt."), _define_property(_obj, types.Languages.POL, "Po tym wszystkie funkcje serwisu będą dostępne. Twoje dane będą dobrze chronione."), _define_property(_obj, types.Languages.FRA, "Cela vous permettra d'avoir acc\xe8s \xe0\xa0toutes les\xa0fonctionnalit\xe9s du service. Vos donn\xe9es personnelles seront soigneusement prot\xe9g\xe9es."), _define_property(_obj, types.Languages.TURKEY, "Bundan sonra hizmetin t\xfcm \xf6zellikleri kullanımınıza sunulacaktır. Verileriniz g\xfcvenilir bir şekilde korunacaktır."), _obj);
var getDescriptionLang = function(lang) {
    return DESCRIPTION[lang] || DESCRIPTION[types.Languages.RUS];
};

exports.getDescriptionLang = getDescriptionLang;
