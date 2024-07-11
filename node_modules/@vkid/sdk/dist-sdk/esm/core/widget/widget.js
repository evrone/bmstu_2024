import { Bridge } from '../bridge/bridge.js';
import { BridgeEvents } from '../bridge/types.js';
import { Dispatcher } from '../dispatcher/dispatcher.js';
import { validator } from '../validator/validator.js';
import { isRequired } from '../validator/rules.js';
import { getVKIDUrl, getRedirectWithPayloadUrl } from '../../utils/url/url.js';
import { uuid } from '../../utils/uuid.js';
import { OneTapInternalEvents } from '../../widgets/oneTap/events.js';
import { WIDGET_ERROR_TEXT } from './constants.js';
import { WidgetEvents } from './events.js';
import { getWidgetTemplate } from './template.js';
import { WidgetState, WidgetErrorCode } from './types.js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const MODULE_LOAD_TIMEOUT = 5000;
const MODULE_CHANGE_STATE_TIMEOUT = 300;
class Widget extends Dispatcher {
    /**
   * @ignore
   */ static config;
    /**
   * @ignore
   */ static auth;
    id = uuid();
    lang;
    scheme;
    vkidAppName = '';
    config;
    timeoutTimer;
    bridge;
    container;
    templateRenderer = getWidgetTemplate;
    elements;
    constructor(){
        super();
        this.config = Widget.config;
    }
    render(params) {
        const { container, ...otherParams } = params;
        this.container = container;
        this.renderTemplate();
        this.registerElements();
        if ('fastAuthDisabled' in params && params['fastAuthDisabled']) {
            this.setState(WidgetState.NOT_LOADED);
            return this;
        }
        this.loadWidgetFrame(otherParams);
        return this;
    }
    close() {
        clearTimeout(this.timeoutTimer);
        this.elements?.root?.remove();
        this.bridge?.destroy();
        this.events.emit(WidgetEvents.CLOSE);
    }
    show() {
        if (this.elements.root) {
            this.elements.root.style.display = 'block';
            this.events.emit(WidgetEvents.SHOW);
        }
        return this;
    }
    hide() {
        if (this.elements.root) {
            this.elements.root.style.display = 'none';
            this.events.emit(WidgetEvents.HIDE);
        }
        return this;
    }
    /**
   * Метод вызывается перед началом загрузки iframe с VK ID приложением
   */ onStartLoadHandler() {
        this.setState(WidgetState.LOADING);
        this.timeoutTimer = setTimeout(()=>{
            this.onErrorHandler({
                code: WidgetErrorCode.TimeoutExceeded,
                text: WIDGET_ERROR_TEXT[WidgetErrorCode.TimeoutExceeded]
            });
        }, MODULE_LOAD_TIMEOUT);
        this.events.emit(WidgetEvents.START_LOAD);
    }
    /**
   * Метод вызывается после того, как полностью загружен iframe с VK ID приложением
   */ onLoadHandler() {
        clearTimeout(this.timeoutTimer);
        setTimeout(()=>{
            // Задержка избавляет от моргания замены шаблона на iframe
            this.setState(WidgetState.LOADED);
        }, MODULE_CHANGE_STATE_TIMEOUT);
        this.events.emit(WidgetEvents.LOAD);
    }
    /**
   * Метод вызывается, когда во время работы/загрузки VK ID приложения произошла ошибка
   */ onErrorHandler(error) {
        clearTimeout(this.timeoutTimer);
        this.setState(WidgetState.NOT_LOADED);
        this.events.emit(OneTapInternalEvents.AUTHENTICATION_INFO, {
            is_online: false
        });
        this.events.emit(WidgetEvents.ERROR, error);
        this.elements?.iframe?.remove();
    }
    /**
   * Метод вызывается при сообщениях от VK ID приложения
   */ onBridgeMessageHandler(event) {
        switch(event.handler){
            case WidgetEvents.LOAD:
                {
                    this.onLoadHandler();
                    break;
                }
            case WidgetEvents.CLOSE:
                {
                    this.close();
                    break;
                }
            case WidgetEvents.ERROR:
                {
                    this.onErrorHandler({
                        code: WidgetErrorCode.InternalError,
                        text: WIDGET_ERROR_TEXT[WidgetErrorCode.InternalError],
                        details: event.params
                    });
                    break;
                }
            case WidgetEvents.RESIZE:
                {
                    this.elements.root.style.height = `${event.params.height}px`;
                    break;
                }
        }
    }
    // <Дополнительные хелперы>
    renderTemplate() {
        this.container.insertAdjacentHTML('beforeend', this.templateRenderer(this.id));
    }
    loadWidgetFrame(params) {
        this.onStartLoadHandler();
        this.bridge = new Bridge({
            iframe: this.elements.iframe,
            origin: `https://${this.config.get().__vkidDomain}`
        });
        this.bridge.on(BridgeEvents.MESSAGE, (event)=>this.onBridgeMessageHandler(event));
        this.elements.iframe.src = this.getWidgetFrameSrc(this.config.get(), params);
    }
    getWidgetFrameSrc(config, params) {
        const queryParams = {
            ...params,
            origin: location.protocol + '//' + location.host,
            oauth_version: 2
        };
        return getVKIDUrl(this.vkidAppName, queryParams, config);
    }
    setState(state) {
        this.elements.root.setAttribute('data-state', state);
    }
    registerElements() {
        const root = document.getElementById(this.id);
        this.elements = {
            root,
            iframe: root.querySelector('iframe')
        };
    }
    redirectWithPayload(payload) {
        location.assign(getRedirectWithPayloadUrl(payload, Widget.config));
    }
}
_ts_decorate([
    validator({
        container: [
            isRequired
        ]
    })
], Widget.prototype, "render", null);

export { Widget };
