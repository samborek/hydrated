import { createQueryString } from "./helpers";
const WORMHOLESCAN_URL = "https://wormholescan.io";
const WORMHOLESCAN_API_URL = "https://api.wormholescan.io/api/v1";
export const wormholescan = {
    api: (path, query = {}) => {
        return `${WORMHOLESCAN_API_URL}/${path}${createQueryString(query)}`;
    },
    link: (path, data) => {
        return `${WORMHOLESCAN_URL}/#/${path}/${data}`;
    },
    tx: (txHash) => {
        return wormholescan.link("tx", txHash);
    },
};
