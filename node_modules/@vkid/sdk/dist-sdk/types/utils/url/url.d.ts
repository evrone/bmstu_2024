import { Config, ConfigData } from "../../core/config";
import { RedirectPayload, StatsInfoParams } from './types';
export declare const getVKIDUrl: (module: string, params: Record<string, any>, config: ConfigData) => string;
export declare const getRedirectWithPayloadUrl: (payload: RedirectPayload, config: Config) => string;
export declare const encodeStatsInfo: (params: StatsInfoParams) => string | undefined;
