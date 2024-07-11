import { Dispatcher } from '../dispatcher/dispatcher.js';
import { BridgeEvents } from './types.js';

const BRIDGE_MESSAGE_TYPE_SDK = 'vk-sak-sdk';
class Bridge extends Dispatcher {
    config;
    constructor(config){
        super();
        this.config = config;
        this.handleMessage = this.handleMessage.bind(this);
        // eslint-disable-next-line
        window.addEventListener('message', this.handleMessage);
    }
    destroy() {
        /* Clear references for memory */ // @ts-ignore-next-line Удаление происходит при десктруктуризации бриджа, поэтому это безопасно.
        delete this.config;
        // eslint-disable-next-line
        window.removeEventListener('message', this.handleMessage);
    }
    sendMessage(message) {
        this.config.iframe.contentWindow?.postMessage({
            type: BRIDGE_MESSAGE_TYPE_SDK,
            ...message
        }, this.config.origin);
    }
    handleMessage(event) {
        const isUnsupportedMessage = !this.config.origin || event.origin !== this.config.origin || event.source !== this.config.iframe.contentWindow || event.data?.type !== BRIDGE_MESSAGE_TYPE_SDK;
        if (isUnsupportedMessage) {
            this.events.emit(BridgeEvents.UNSUPPORTED_MESSAGE, event.data);
            return;
        }
        this.events.emit(BridgeEvents.MESSAGE, event.data);
    }
}

export { BRIDGE_MESSAGE_TYPE_SDK, Bridge };
