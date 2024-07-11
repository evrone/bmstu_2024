var canUseDOM = !!(typeof window !== 'undefined' && window.document &&
/* eslint-disable */
window.document.createElement
/* eslint-enable */
);
var canUseEventListeners = canUseDOM && !!window.addEventListener;

export { canUseDOM, canUseEventListeners };
