var ProductionStatsEventTypes;
(function(ProductionStatsEventTypes) {
    ProductionStatsEventTypes["TYPE_ACTION"] = 'type_action';
})(ProductionStatsEventTypes || (ProductionStatsEventTypes = {}));
var ProductionStatsTypeActions;
(function(ProductionStatsTypeActions) {
    ProductionStatsTypeActions["TYPE_REGISTRATION_ITEM"] = 'type_registration_item';
    ProductionStatsTypeActions["TYPE_SAK_SESSION_EVENT_ITEM"] = 'type_sak_sessions_event_item';
})(ProductionStatsTypeActions || (ProductionStatsTypeActions = {}));
var ProductionStatsEventScreen;
(function(ProductionStatsEventScreen) {
    ProductionStatsEventScreen["NOWHERE"] = 'nowhere';
    ProductionStatsEventScreen["FLOATING_ONE_TAP"] = 'floating_one_tap';
    ProductionStatsEventScreen["MULTIBRANDING"] = 'multibranding_widget';
})(ProductionStatsEventScreen || (ProductionStatsEventScreen = {}));

export { ProductionStatsEventScreen, ProductionStatsEventTypes, ProductionStatsTypeActions };
