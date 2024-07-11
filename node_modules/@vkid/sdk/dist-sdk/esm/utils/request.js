const getStatsUrl = (method, config)=>{
    const { __vkidDomain: domain, app } = config.get();
    return `https://${domain}/${method}?app_id=${app}&v=5.207`;
};
const makeParams = (params)=>{
    const pairs = Object.keys(params).map((key)=>{
        let param = params[key];
        key = encodeURIComponent(key || '');
        param = encodeURIComponent(param === undefined ? '' : param);
        return `${key}=${param}`;
    });
    return pairs.join('&');
};
const request = (url, params)=>{
    const paramsString = makeParams(params);
    return fetch(url, {
        method: 'POST',
        body: paramsString,
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then((res)=>res.json());
};

export { getStatsUrl, request };
