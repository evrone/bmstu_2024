import { DataService } from "../core/dataService";
import { AuthError, AuthResponse } from './types';
export declare class AuthDataService extends DataService<AuthResponse, AuthError> {
    private readonly state;
    readonly sendSuccessData: (payload: AuthResponse) => void;
    readonly sendNewTabHasBeenClosed: () => void;
    readonly sendAuthorizationFailed: (details: any) => void;
    readonly sendEventNotSupported: () => void;
    readonly sendCannotCreateNewTab: () => void;
    readonly sendStateMismatchError: () => void;
}
