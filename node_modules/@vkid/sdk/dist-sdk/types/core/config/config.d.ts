import { ConfigData, PKSE } from './types';
export declare class Config {
    private readonly sakSessionStatsCollector;
    private store;
    constructor();
    init(config: Pick<ConfigData, 'app' | 'redirectUrl'> & PKSE & Partial<ConfigData>): this;
    update(config: Partial<ConfigData>): this;
    private set;
    get(): ConfigData;
}
