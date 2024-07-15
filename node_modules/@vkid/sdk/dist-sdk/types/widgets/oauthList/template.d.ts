import { WidgetParams } from "../../core/widget";
import { OAuthListStyles, OAuthName } from './types';
type OAuthListTemplateParams = Pick<WidgetParams, 'scheme' | 'lang'> & Pick<OAuthListStyles, 'borderRadius' | 'height'> & {
    oauthList: OAuthName[];
};
export declare const getOAuthListTemplate: (params: OAuthListTemplateParams) => (id: string) => string;
export {};
