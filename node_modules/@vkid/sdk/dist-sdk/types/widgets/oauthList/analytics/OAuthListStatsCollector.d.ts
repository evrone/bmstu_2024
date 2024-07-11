import { Config } from "../../../core/config";
import { MultibrandingButtonShowParams, MultibrandingButtonTapParams, MultibrandingOauthAddedParams } from "./types";
export declare class OAuthListStatsCollector {
    private readonly registrationStatsCollector;
    private uniqueSessionId;
    constructor(config: Config);
    setUniqueSessionId(id: string): void;
    private getFields;
    sendMultibrandingOauthAdded({ screen, fields }: MultibrandingOauthAddedParams): void;
    sendOkButtonShow({ screen, isIcon }: MultibrandingButtonShowParams): void;
    sendVkButtonShow({ screen, isIcon }: MultibrandingButtonShowParams): void;
    sendMailButtonShow({ screen, isIcon }: MultibrandingButtonShowParams): void;
    sendVkButtonTap({ screen, isIcon }: MultibrandingButtonTapParams): Promise<unknown>;
    sendOkButtonTap({ screen, isIcon }: MultibrandingButtonTapParams): Promise<unknown>;
    sendMailButtonTap({ screen, isIcon }: MultibrandingButtonTapParams): Promise<unknown>;
}
