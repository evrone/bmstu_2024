const getButtonPadding = (height)=>{
    const res = (height - 30) / 2 + 3;
    if (height < 40) {
        return res;
    }
    return res - 2;
};
const getButtonFontSize = (height)=>{
    if (height < 40) {
        return 14;
    }
    if (height > 47) {
        return 17;
    }
    return 16;
};
const getButtonLogoSize = (height)=>{
    if (height < 40) {
        return 24;
    }
    return 28;
};

export { getButtonFontSize, getButtonLogoSize, getButtonPadding };
