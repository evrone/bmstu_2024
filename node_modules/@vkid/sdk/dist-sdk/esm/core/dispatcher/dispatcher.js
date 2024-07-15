import mitt from './../../lib/mitt/dist/mitt.es.js';

class Dispatcher {
    events = mitt();
    on(event, handler) {
        this.events.on(event, handler);
        return this;
    }
    off(event, handler) {
        this.events.off(event, handler);
        return this;
    }
}

export { Dispatcher };
