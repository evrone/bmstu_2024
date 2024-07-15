import { Auth } from "../../auth";
import { Bridge, BridgeMessage } from "../bridge";
import { Config, ConfigData } from "../config";
import { Dispatcher } from "../dispatcher";
import { Languages, Scheme } from "../../types";
import { RedirectPayload } from "../../utils/url";
import { WidgetElements, WidgetError, WidgetParams, WidgetState } from './types';
export declare class Widget<P extends object = WidgetParams> extends Dispatcher {
    /**
     * @ignore
     */
    static config: Config;
    /**
     * @ignore
     */
    static auth: Auth;
    protected readonly id: string;
    protected lang: Languages;
    protected scheme: Scheme;
    protected vkidAppName: string;
    protected config: Config;
    protected timeoutTimer: any;
    protected bridge: Bridge<any>;
    protected container: HTMLElement;
    protected templateRenderer: (id: string) => string;
    protected elements: WidgetElements;
    constructor();
    render(params: P | WidgetParams): this;
    close(): void;
    show(): this;
    hide(): this;
    /**
     * Метод вызывается перед началом загрузки iframe с VK ID приложением
     */
    protected onStartLoadHandler(): void;
    /**
     * Метод вызывается после того, как полностью загружен iframe с VK ID приложением
     */
    protected onLoadHandler(): void;
    /**
     * Метод вызывается, когда во время работы/загрузки VK ID приложения произошла ошибка
     */
    protected onErrorHandler(error: WidgetError): void;
    /**
     * Метод вызывается при сообщениях от VK ID приложения
     */
    protected onBridgeMessageHandler(event: BridgeMessage<any>): void;
    protected renderTemplate(): void;
    protected loadWidgetFrame(params: P): void;
    protected getWidgetFrameSrc(config: ConfigData, params: P): string;
    protected setState(state: WidgetState): void;
    protected registerElements(): void;
    protected redirectWithPayload(payload: RedirectPayload): void;
}
