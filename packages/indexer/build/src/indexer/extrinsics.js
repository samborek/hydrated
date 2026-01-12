import { queryOptions } from "@tanstack/react-query";
export const extrinsicByHashQuery = (indexerSdk, hash) => queryOptions({
    queryKey: ["extrinsic", hash],
    queryFn: () => indexerSdk.ExtrinsicByHash({ hash }),
    enabled: !!hash,
});
export const extrinsicByBlockAndIndexQuery = (indexerSdk, blockNumber, index) => queryOptions({
    queryKey: ["extrinsic", blockNumber, index],
    queryFn: () => indexerSdk.ExtrinsicByBlockAndIndex({ blockNumber, index }),
});
