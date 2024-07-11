import { VERSION } from '../../constants.js';
import { getStatsUrl, request } from '../../utils/request.js';

class ProductionStatsCollector {
    static MAX_INT32 = 2147483647;
    timeoutId = null;
    lastEvent;
    config;
    stackEvents = [];
    constructor(config){
        this.config = config;
    }
    getIntId() {
        return Math.floor(Math.random() * ProductionStatsCollector.MAX_INT32);
    }
    getCurrentTime(isMicrosec = true) {
        const strTime = Date.now().toString(10);
        if (isMicrosec) {
            return strTime + '000';
        }
        return strTime;
    }
    sendStats(event) {
        this.stackEvents.push(event);
        this.timeoutId && window.clearTimeout(this.timeoutId);
        return new Promise((res, rej)=>{
            this.timeoutId = window.setTimeout(()=>{
                const params = {
                    events: JSON.stringify(this.stackEvents),
                    sak_version: VERSION
                };
                this.stackEvents = [];
                const url = getStatsUrl('stat_events_vkid_sdk', this.config);
                request(url, params).then(res).catch(rej);
            }, 0);
        });
    }
    getBaseEvent(screen) {
        return {
            id: this.getIntId(),
            prev_event_id: this.lastEvent?.id || 0,
            prev_nav_id: 0,
            timestamp: this.getCurrentTime(),
            url: window.location.href,
            screen
        };
    }
    logEvent(event) {
        this.lastEvent = event;
        return this.sendStats(event);
    }
}

export { ProductionStatsCollector };
