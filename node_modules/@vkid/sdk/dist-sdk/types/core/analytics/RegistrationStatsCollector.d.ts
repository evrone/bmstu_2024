import { ActionStatsCollector } from './ActionStatsCollector';
import { ProductionStatsEventScreen, RegistrationStatsEventParams } from './types';
export declare class RegistrationStatsCollector {
    private readonly actionStatsCollector;
    constructor(actionStatsCollector: ActionStatsCollector);
    logEvent(screen: ProductionStatsEventScreen, event: RegistrationStatsEventParams): Promise<unknown>;
}
