import type { Config } from "../core/config";
export declare const getStatsUrl: (method: string, config: Config) => string;
export declare const request: (url: string, params: Record<string, any>) => Promise<any>;
