export var CollateralType;
(function (CollateralType) {
    CollateralType[CollateralType["ENABLED"] = 0] = "ENABLED";
    CollateralType[CollateralType["ISOLATED_ENABLED"] = 1] = "ISOLATED_ENABLED";
    CollateralType[CollateralType["DISABLED"] = 2] = "DISABLED";
    CollateralType[CollateralType["ISOLATED_DISABLED"] = 3] = "ISOLATED_DISABLED";
    CollateralType[CollateralType["UNAVAILABLE"] = 4] = "UNAVAILABLE";
    CollateralType[CollateralType["UNAVAILABLE_DUE_TO_ISOLATION"] = 5] = "UNAVAILABLE_DUE_TO_ISOLATION";
})(CollateralType || (CollateralType = {}));
