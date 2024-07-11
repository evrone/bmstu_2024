import { AuthErrorCode } from './types.js';

const OAUTH2_RESPONSE_TYPE = 'code';
const AUTH_ERROR_TEXT = {
    [AuthErrorCode.EventNotSupported]: 'Event is not supported',
    [AuthErrorCode.CannotCreateNewTab]: 'Cannot create new tab. Try checking your browser settings',
    [AuthErrorCode.NewTabHasBeenClosed]: 'New tab has been closed',
    [AuthErrorCode.AuthorizationFailed]: 'Authorization failed with an error',
    [AuthErrorCode.StateMismatch]: 'The received state does not match the expected state'
};
const OAUTH2_RESPONSE = 'oauth2_authorize_response';

export { AUTH_ERROR_TEXT, OAUTH2_RESPONSE, OAUTH2_RESPONSE_TYPE };
