import { WidgetParams } from "../../core/widget";
import { FloatingOneTapParams } from "./types";
import { OAuthListParams, OAuthName } from "../oauthList";
type FloatingOneTapTemplateParams = Required<Pick<FloatingOneTapParams, 'indent' | 'contentId' | 'appName'> & Pick<WidgetParams, 'scheme' | 'lang'>> & {
    login?: VoidFunction;
    close?: VoidFunction;
    renderOAuthList: (params: OAuthListParams) => void;
    providers?: OAuthName[];
};
export declare const getFloatingOneTapTemplate: ({ scheme, indent, login, close, lang, contentId, appName, providers, renderOAuthList, }: FloatingOneTapTemplateParams) => (id: string) => string;
export {};
