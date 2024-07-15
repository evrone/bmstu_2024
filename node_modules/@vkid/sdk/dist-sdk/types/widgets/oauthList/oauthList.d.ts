import { Widget } from "../../core/widget";
import { OAuthListParams } from './types';
export declare class OAuthList extends Widget<OAuthListParams> {
    private readonly analytics;
    private providers;
    private flowSource;
    private uniqueSessionId;
    constructor();
    private sendStartAnalytics;
    render(params: OAuthListParams): this;
    private handleClick;
}
