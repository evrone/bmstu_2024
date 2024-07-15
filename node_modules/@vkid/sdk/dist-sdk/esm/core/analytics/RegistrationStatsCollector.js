import { ProductionStatsTypeActions } from './types.js';

class RegistrationStatsCollector {
    actionStatsCollector;
    constructor(actionStatsCollector){
        this.actionStatsCollector = actionStatsCollector;
    }
    logEvent(screen, event) {
        const statsEvent = {
            type: ProductionStatsTypeActions.TYPE_REGISTRATION_ITEM,
            [ProductionStatsTypeActions.TYPE_REGISTRATION_ITEM]: event
        };
        return this.actionStatsCollector.logEvent({
            screen,
            event: statsEvent
        });
    }
}

export { RegistrationStatsCollector };
