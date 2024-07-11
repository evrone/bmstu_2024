const isRequired = (param)=>{
    let result = true;
    if (typeof param === 'string' && param.trim() === '' || param === undefined || param == null) {
        result = false;
    }
    return {
        result,
        makeError: (valueName)=>`${valueName} is required parameter`
    };
};
const isNumber = (param)=>{
    return {
        result: [
            'number',
            'string'
        ].includes(typeof param) && !isNaN(parseInt(param)),
        makeError: (valueName)=>`${valueName} should be number`
    };
};
const isValidHeight = (param)=>{
    let result = param !== undefined && param.height !== undefined && isNumber(param.height) && param.height < 57 && param.height > 31 || param === undefined || param.height === undefined;
    return {
        result,
        makeError: ()=>'The height should correspond to the range from 32 to 56'
    };
};
const isNotEmptyOAuthList = (param)=>{
    return {
        result: param?.length && param.length >= 1,
        makeError: ()=>'OAuth list can\'t be empty'
    };
};

export { isNotEmptyOAuthList, isNumber, isRequired, isValidHeight };
