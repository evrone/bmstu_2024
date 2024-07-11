import { RegistrationStatsCollector } from '../../../core/analytics/RegistrationStatsCollector.js';
import '../../../core/analytics/types.js';
import { ProductionStatsCollector } from '../../../core/analytics/ProductionStatsCollector.js';
import { ActionStatsCollector } from '../../../core/analytics/ActionStatsCollector.js';

class OAuthListStatsCollector {
    registrationStatsCollector;
    uniqueSessionId;
    constructor(config){
        const productStatsCollector = new ProductionStatsCollector(config);
        const actionStatsCollector = new ActionStatsCollector(productStatsCollector);
        this.registrationStatsCollector = new RegistrationStatsCollector(actionStatsCollector);
    }
    setUniqueSessionId(id) {
        this.uniqueSessionId = id;
    }
    getFields() {
        const fields = [
            {
                name: 'sdk_type',
                value: 'vkid'
            }
        ];
        if (this.uniqueSessionId) {
            fields.push({
                name: 'unique_session_id',
                value: this.uniqueSessionId
            });
        }
        return fields;
    }
    sendMultibrandingOauthAdded({ screen, fields }) {
        void this.registrationStatsCollector.logEvent(screen, {
            event_type: 'multibranding_oauth_added',
            fields: [
                ...this.getFields(),
                ...fields
            ]
        });
    }
    sendOkButtonShow({ screen, isIcon }) {
        void this.registrationStatsCollector.logEvent(screen, {
            event_type: 'ok_button_show',
            fields: [
                ...this.getFields(),
                {
                    name: 'button_type',
                    value: isIcon ? 'icon' : 'default'
                }
            ]
        });
    }
    sendVkButtonShow({ screen, isIcon }) {
        void this.registrationStatsCollector.logEvent(screen, {
            event_type: 'vk_button_show',
            fields: [
                ...this.getFields(),
                {
                    name: 'button_type',
                    value: isIcon ? 'icon' : 'default'
                }
            ]
        });
    }
    sendMailButtonShow({ screen, isIcon }) {
        void this.registrationStatsCollector.logEvent(screen, {
            event_type: 'mail_button_show',
            fields: [
                ...this.getFields(),
                {
                    name: 'button_type',
                    value: isIcon ? 'icon' : 'default'
                }
            ]
        });
    }
    sendVkButtonTap({ screen, isIcon }) {
        return this.registrationStatsCollector.logEvent(screen, {
            event_type: 'vk_button_tap',
            fields: [
                ...this.getFields(),
                {
                    name: 'button_type',
                    value: isIcon ? 'icon' : 'default'
                }
            ]
        });
    }
    sendOkButtonTap({ screen, isIcon }) {
        return this.registrationStatsCollector.logEvent(screen, {
            event_type: 'ok_button_tap',
            fields: [
                ...this.getFields(),
                {
                    name: 'button_type',
                    value: isIcon ? 'icon' : 'default'
                }
            ]
        });
    }
    sendMailButtonTap({ screen, isIcon }) {
        return this.registrationStatsCollector.logEvent(screen, {
            event_type: 'mail_button_tap',
            fields: [
                ...this.getFields(),
                {
                    name: 'button_type',
                    value: isIcon ? 'icon' : 'default'
                }
            ]
        });
    }
}

export { OAuthListStatsCollector };
