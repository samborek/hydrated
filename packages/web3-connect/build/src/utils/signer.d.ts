import { PolkadotSigner } from "polkadot-api";
import { EthereumSigner } from "@/signers/EthereumSigner";
import { SolanaSigner } from "@/signers/SolanaSigner";
import { SuiSigner } from "@/signers/SuiSigner";
export declare const isPolkadotSigner: (signer: unknown) => signer is PolkadotSigner;
export declare const isEthereumSigner: (signer: unknown) => signer is EthereumSigner;
export declare const isSolanaSigner: (signer: unknown) => signer is SolanaSigner;
export declare const isSuiSigner: (signer: unknown) => signer is SuiSigner;
