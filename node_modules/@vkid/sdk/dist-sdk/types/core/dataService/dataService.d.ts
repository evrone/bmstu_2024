export declare class DataService<Res, Rej> {
    private readonly promise;
    private callback?;
    private resolve;
    private reject;
    constructor();
    readonly setCallback: (callback: VoidFunction) => void;
    readonly removeCallback: () => void;
    readonly sendSuccess: (value: Res) => void;
    readonly sendError: (value: Rej) => void;
    get value(): Promise<Res>;
}
