import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { AccountAvatar } from "./AccountAvatar";
export default {
    component: AccountAvatar,
};
export const Ethereum = {
    render: (args) => _jsx(AccountAvatar, { ...args }),
    args: {
        address: "0x19912230039c10861946dF36CDe0eFeF09C3894A",
        size: 100,
        theme: "evm",
    },
};
export const Polkadot = {
    render: (args) => _jsx(AccountAvatar, { ...args }),
    args: {
        address: "7KgY1Qr7YambXcxAfDGYmab32gzhMbKsKTzEmteMXgDGP6NV",
        size: 100,
        theme: "polkadot",
    },
};
export const TalismanPolkadot = {
    render: (args) => _jsx(AccountAvatar, { ...args }),
    args: {
        address: "5GL6PPe3EJhvurAR9mkDE7S91fy5KCiKY52mwACRm63zZ3rw",
        size: 100,
        theme: "talisman",
    },
};
export const TalismanEvm = {
    render: (args) => _jsx(AccountAvatar, { ...args }),
    args: {
        address: "0x45d64898DCFB5258B30860FbEc0909D971b875aE",
        size: 100,
        theme: "talisman",
    },
};
