import { Emitter } from 'mitt';
export declare class Dispatcher {
    protected readonly events: Emitter;
    on(event: string, handler: any): this;
    off(event: string, handler: any): this;
}
