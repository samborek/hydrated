type SubscanLinkPath = "tx" | "account" | "block";
export declare const subscan: {
    rdns: string;
    link: (chainKey: string, path: SubscanLinkPath, data: string | number, query?: Record<string, string | number>) => string;
    api: (path: string, query?: Record<string, string | number>) => string;
    tx: (chainKey: string, txHash: string) => string;
    account: (chainKey: string, address: string) => string;
    block: (chainKey: string, blockHashOrNumber: string | number) => string;
    blockEvent: (chainKey: string, blockNumber: number, indexInBlock: number) => string;
};
export {};
