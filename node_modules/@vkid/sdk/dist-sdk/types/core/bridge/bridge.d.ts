import { Dispatcher } from "../dispatcher";
import { BridgeMessageData, BridgeConfig } from './types';
export declare const BRIDGE_MESSAGE_TYPE_SDK = "vk-sak-sdk";
export declare class Bridge<H> extends Dispatcher {
    private config;
    constructor(config: BridgeConfig);
    destroy(): void;
    sendMessage(message: BridgeMessageData<H>): void;
    private handleMessage;
}
