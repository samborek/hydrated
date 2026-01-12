type WormholescanLinkPath = "tx" | "account" | "block";
export declare const wormholescan: {
    api: (path: string, query?: Record<string, string | number>) => string;
    link: (path: WormholescanLinkPath, data: string | number) => string;
    tx: (txHash: string) => string;
};
export {};
