import { RegistrationStatsCollector } from '../../core/analytics/RegistrationStatsCollector.js';
import { ProductionStatsEventScreen } from '../../core/analytics/types.js';
import { ProductionStatsCollector } from '../../core/analytics/ProductionStatsCollector.js';
import { ActionStatsCollector } from '../../core/analytics/ActionStatsCollector.js';

class AuthStatsCollector {
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
    sendCustomAuthStart(provider) {
        const fields = this.getFields();
        if (provider) {
            fields.push({
                name: 'oauth_service',
                value: provider
            });
        }
        return this.registrationStatsCollector.logEvent(ProductionStatsEventScreen.NOWHERE, {
            event_type: 'custom_auth_start',
            fields
        });
    }
}

export { AuthStatsCollector };
