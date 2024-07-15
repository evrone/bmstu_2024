'use strict';

var getWidgetTemplate = function(id) {
    return '\n<div id="'.concat(id, '" data-test-id="widget">\n  <style>\n    #').concat(id, " {\n      width: 100%;\n      height: 100%;\n      max-width: 100%;\n      max-height: 100%;\n    }\n\n    #").concat(id, " iframe {\n      border: none;\n      color-scheme: auto;\n    }\n\n    #").concat(id, " .loader,\n    #").concat(id, ' .error {\n      display: none;\n      width: 100%;\n      height: 100%;\n      text-align: center;\n    }\n  </style>\n  <div class="loader"></div>\n  <div class="error"></div>\n  <iframe width="100%" height="100%"></iframe>\n</div>\n  ');
};

exports.getWidgetTemplate = getWidgetTemplate;
