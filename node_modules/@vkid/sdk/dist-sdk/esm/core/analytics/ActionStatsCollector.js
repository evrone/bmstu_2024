import { ProductionStatsEventTypes } from './types.js';

class ActionStatsCollector {
    productStatsCollector;
    constructor(productStatsCollector){
        this.productStatsCollector = productStatsCollector;
    }
    logEvent(params) {
        const statsEvent = {
            ...this.productStatsCollector.getBaseEvent(params.screen),
            type: ProductionStatsEventTypes.TYPE_ACTION,
            [ProductionStatsEventTypes.TYPE_ACTION]: params.event
        };
        return this.productStatsCollector.logEvent(statsEvent);
    }
}

export { ActionStatsCollector };
