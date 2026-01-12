import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { AssetLogo } from "@galacticcouncil/ui/components";
import { AssetMetadataFactory, getAssetIdFromAddress, HYDRATION_PARACHAIN_ID, stringEquals, } from "@galacticcouncil/utils";
import { useProtocolDataContext } from "@/hooks";
import { GHO_ASSET_ID } from "@/utils";
export const ReserveLogo = ({ address, ...props }) => {
    const { currentMarketData } = useProtocolDataContext();
    const metadata = AssetMetadataFactory.getInstance();
    const isGho = stringEquals(currentMarketData.addresses.GHO_TOKEN_ADDRESS ?? "", address);
    const assetId = isGho ? GHO_ASSET_ID : getAssetIdFromAddress(address);
    return (_jsx(AssetLogo, { src: metadata.getAssetLogoSrc(HYDRATION_PARACHAIN_ID, assetId), ...props }));
};
