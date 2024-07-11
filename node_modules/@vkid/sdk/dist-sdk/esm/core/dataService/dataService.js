class DataService {
    promise;
    callback;
    resolve;
    reject;
    constructor(){
        this.promise = new Promise((resolve, reject)=>{
            this.resolve = resolve;
            this.reject = reject;
        });
    }
    setCallback = (callback)=>{
        this.callback = callback;
    };
    removeCallback = ()=>{
        this.callback = null;
    };
    sendSuccess = (value)=>{
        this.resolve(value);
        this.callback && this.callback();
    };
    sendError = (value)=>{
        this.reject(value);
        this.callback && this.callback();
    };
    get value() {
        return this.promise;
    }
}

export { DataService };
