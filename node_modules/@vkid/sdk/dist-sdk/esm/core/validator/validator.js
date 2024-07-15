const validator = (rules)=>{
    return (target, propertyName, descriptor)=>{
        const originalMethod = descriptor.value;
        descriptor.value = function(params) {
            const rulesKeys = Object.keys(rules);
            for (let key of rulesKeys){
                const validateHandlers = rules[key];
                validateHandlers?.forEach((handler)=>{
                    const { result, makeError } = handler(params[key]);
                    if (!result) {
                        throw new Error(makeError(key));
                    }
                });
            }
            return originalMethod?.apply(this, arguments);
        };
    };
};

export { validator };
