const SNOWBRIDGESCAN_URL = "https://app.snowbridge.network";
export const snowbridgescan = {
    link: (path, data) => {
        return `${SNOWBRIDGESCAN_URL}/${path}#${data}`;
    },
    tx: (messageId) => {
        return snowbridgescan.link("history", messageId);
    },
};
