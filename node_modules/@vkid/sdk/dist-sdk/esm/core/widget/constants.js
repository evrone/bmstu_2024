import { WidgetErrorCode } from './types.js';

const WIDGET_ERROR_TEXT = {
    [WidgetErrorCode.TimeoutExceeded]: 'timeout',
    [WidgetErrorCode.InternalError]: 'internal error',
    [WidgetErrorCode.AuthError]: 'auth error'
};

export { WIDGET_ERROR_TEXT };
