export declare const EVM_GAS_TO_WEIGHT = 25000n;
export declare const EVM_DEFAULT_CHAIN_KEY = "hydration";
export declare const EVM_DISPATCH_ADDRESS = "0x0000000000000000000000000000000000000401";
export declare const EVM_CALL_PERMIT_ADDRESS = "0x000000000000000000000000000000000000080a";
export declare const EVM_CALL_PERMIT_ABI: readonly [{
    readonly inputs: readonly [];
    readonly name: "DOMAIN_SEPARATOR";
    readonly outputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "";
        readonly type: "bytes32";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "from";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "to";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "value";
        readonly type: "uint256";
    }, {
        readonly internalType: "bytes";
        readonly name: "data";
        readonly type: "bytes";
    }, {
        readonly internalType: "uint64";
        readonly name: "gaslimit";
        readonly type: "uint64";
    }, {
        readonly internalType: "uint256";
        readonly name: "deadline";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint8";
        readonly name: "v";
        readonly type: "uint8";
    }, {
        readonly internalType: "bytes32";
        readonly name: "r";
        readonly type: "bytes32";
    }, {
        readonly internalType: "bytes32";
        readonly name: "s";
        readonly type: "bytes32";
    }];
    readonly name: "dispatch";
    readonly outputs: readonly [{
        readonly internalType: "bytes";
        readonly name: "output";
        readonly type: "bytes";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "owner";
        readonly type: "address";
    }];
    readonly name: "nonces";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}];
export declare const EVM_CALL_PERMIT_TYPES: {
    EIP712Domain: {
        name: string;
        type: string;
    }[];
    CallPermit: {
        name: string;
        type: string;
    }[];
};
