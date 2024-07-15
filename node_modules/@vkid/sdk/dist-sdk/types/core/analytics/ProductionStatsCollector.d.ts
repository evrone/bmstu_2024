import type { Config } from "../config";
import { ProductionStatsBaseEvent, ProductionStatsEvent, ProductionStatsEventScreen } from './types';
export declare class ProductionStatsCollector {
    static readonly MAX_INT32 = 2147483647;
    private timeoutId;
    private lastEvent;
    private readonly config;
    private stackEvents;
    constructor(config: Config);
    private getIntId;
    private getCurrentTime;
    private sendStats;
    getBaseEvent(screen?: ProductionStatsEventScreen): ProductionStatsBaseEvent;
    logEvent(event: ProductionStatsEvent): Promise<unknown>;
}
