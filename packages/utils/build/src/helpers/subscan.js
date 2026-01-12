import { chainsMap } from "@galacticcouncil/xc-cfg";
import { createQueryString, getRdnsFromUrl, stringEquals, stripTrailingSlash, } from "./helpers";
const SUBSCAN_API_PROXY_URL = "https://galacticcouncil.squids.live/hydration-pools:unified-prod/api/proxy/subscan";
export const subscan = {
    rdns: "io.subscan",
    link: (chainKey, path, data, query = {}) => {
        const chain = chainsMap.get(chainKey);
        if (!chain?.explorer ||
            !stringEquals(getRdnsFromUrl(chain.explorer), subscan.rdns)) {
            return "";
        }
        return `${stripTrailingSlash(chain.explorer)}/${path}/${data}${createQueryString(query)}`;
    },
    api: (path, query = {}) => {
        return `${SUBSCAN_API_PROXY_URL}/${path}${createQueryString(query)}`;
    },
    tx: (chainKey, txHash) => {
        return subscan.link(chainKey, "tx", txHash);
    },
    account: (chainKey, address) => {
        return subscan.link(chainKey, "account", address);
    },
    block: (chainKey, blockHashOrNumber) => {
        return subscan.link(chainKey, "block", blockHashOrNumber);
    },
    blockEvent: (chainKey, blockNumber, indexInBlock) => {
        return subscan.link(chainKey, "block", blockNumber, {
            tab: "event",
            event: `${blockNumber}-${indexInBlock}`,
        });
    },
};
