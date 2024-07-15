var WidgetEvents;
(function(WidgetEvents) {
    WidgetEvents["START_LOAD"] = 'common: start load';
    WidgetEvents["LOAD"] = 'common: load';
    WidgetEvents["SHOW"] = 'common: show';
    WidgetEvents["HIDE"] = 'common: hide';
    WidgetEvents["CLOSE"] = 'common: close';
    WidgetEvents["ERROR"] = 'common: error';
    WidgetEvents["RESIZE"] = 'common: resize';
})(WidgetEvents || (WidgetEvents = {}));

export { WidgetEvents };
