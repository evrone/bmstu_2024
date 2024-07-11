import { ProductionStatsCollector } from './ProductionStatsCollector';
import { ActionStatsParams } from './types';
export declare class ActionStatsCollector {
    private readonly productStatsCollector;
    constructor(productStatsCollector: ProductionStatsCollector);
    logEvent(params: ActionStatsParams): Promise<unknown>;
}
