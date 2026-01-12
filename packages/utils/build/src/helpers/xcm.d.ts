import { AnyChain, AnyEvmChain, AnyParachain, Asset, EvmParachain, Parachain } from "@galacticcouncil/xc-core";
export declare function getChainAssetId(chain: AnyChain, asset: Asset): import("@galacticcouncil/xc-core").ChainAssetId;
export declare function getChainId(chain: AnyChain): string | number;
export declare function isAddressValidOnChain(address: string, chain: AnyChain): boolean;
export declare function isParachain(chain: AnyChain): chain is Parachain;
export declare function isEvmParachain(chain: AnyChain): chain is EvmParachain;
export declare function isAnyParachain(chain: AnyChain): chain is AnyParachain;
export declare function isAnyEvmChain(chain: AnyChain): chain is AnyEvmChain;
