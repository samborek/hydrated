import { isObjectType } from "remeda";
import { EthereumSigner } from "@/signers/EthereumSigner";
import { SolanaSigner } from "@/signers/SolanaSigner";
import { SuiSigner } from "@/signers/SuiSigner";
export const isPolkadotSigner = (signer) => {
    return (isObjectType(signer) &&
        "publicKey" in signer &&
        "signTx" in signer &&
        "signBytes" in signer);
};
export const isEthereumSigner = (signer) => signer instanceof EthereumSigner;
export const isSolanaSigner = (signer) => signer instanceof SolanaSigner;
export const isSuiSigner = (signer) => signer instanceof SuiSigner;
