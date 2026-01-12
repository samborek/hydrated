import { SolanaAddr } from "@galacticcouncil/utils";
import { u8aToHex } from "@polkadot/util";
import { decodeAddress, encodeAddress } from "@polkadot/util-crypto";
export const safeConvertSolanaAddressToSS58 = (address, prefix = 0) => {
    try {
        return encodeAddress(SolanaAddr.getPubKey(address), prefix);
    }
    catch {
        return "";
    }
};
export function safeConvertSS58ToSolanaAddress(ss58Addr) {
    try {
        return SolanaAddr.encodePubKey(u8aToHex(decodeAddress(ss58Addr)));
    }
    catch {
        return "";
    }
}
