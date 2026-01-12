import { queryOptions } from "@tanstack/react-query";
export const snowbridgeStatusToPolkadotQuery = (snowbridgeSdk, txHash, limit = 10) => {
    return queryOptions({
        queryKey: ["snowbridge", "transfer", "status", "polkadot", txHash, limit],
        queryFn: () => snowbridgeSdk.TransferStatusToPolkadot({ hash: txHash, limit }),
        enabled: !!txHash,
    });
};
export const snowbridgeStatusToEthQuery = (snowbridgeSdk, txHash, limit = 10) => {
    return queryOptions({
        queryKey: ["snowbridge", "transfer", "status", "ethereum", txHash, limit],
        queryFn: () => snowbridgeSdk.TransferStatusToEth({ hash: txHash, limit }),
        enabled: !!txHash,
    });
};
