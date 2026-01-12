import { Provider } from "@ethersproject/providers";
import { ChainId } from "@/ui-config/networksConfig";
export declare const getProvider: (_chainId: ChainId) => Provider;
