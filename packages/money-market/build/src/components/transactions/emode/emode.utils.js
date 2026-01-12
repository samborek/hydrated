export const getAction = (selectedMode, activeMode) => {
    const action = (() => {
        if (activeMode === 0)
            return "enable";
        if (selectedMode !== 0)
            return "switch";
        return "disable";
    })();
    return (dataMap) => {
        return dataMap[action];
    };
};
export const getEmodeMessage = (label) => {
    if (label === "") {
        return "Disabled";
    }
    return label;
};
