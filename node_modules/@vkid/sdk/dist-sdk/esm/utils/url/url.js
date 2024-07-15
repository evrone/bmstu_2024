import './../../lib/@vkontakte/vkjs/lib/es6/detections.js';
import { querystring } from './../../lib/@vkontakte/vkjs/lib/es6/querystring.js';
import { VERSION } from '../../constants.js';

const getVKIDUrl = (module, params, config)=>{
    const queryParams = {
        ...params,
        v: VERSION,
        sdk_type: 'vkid',
        app_id: config.app,
        redirect_uri: config.redirectUrl,
        debug: config.__debug ? 1 : null,
        localhost: config.__localhost ? 1 : null
    };
    const queryParamsString = querystring.stringify(queryParams, {
        skipNull: true
    });
    return `https://${config.__vkidDomain}/${module}?${queryParamsString}`;
};
const getRedirectWithPayloadUrl = (payload, config)=>{
    const redirectUrlFromConfig = config.get().redirectUrl;
    const containsQuery = redirectUrlFromConfig.includes('?');
    const params = Object.keys(payload).map((key)=>encodeURIComponent(key) + '=' + encodeURIComponent(payload[key])).join('&');
    return `${redirectUrlFromConfig}${containsQuery ? '&' : '?'}${params}`;
};
const encodeStatsInfo = (params)=>{
    const hasParams = Object.values(params).filter(Boolean).length;
    if (hasParams) {
        return btoa(JSON.stringify(params));
    }
};

export { encodeStatsInfo, getRedirectWithPayloadUrl, getVKIDUrl };
