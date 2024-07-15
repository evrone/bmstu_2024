import { Config } from "../../core/config";
export declare class AuthStatsCollector {
    private readonly registrationStatsCollector;
    private uniqueSessionId;
    constructor(config: Config);
    setUniqueSessionId(id: string): void;
    private getFields;
    sendCustomAuthStart(provider?: string): Promise<unknown>;
}
