import { StoryObj } from "@storybook/react";
import { AssetInput } from "./AssetInput";
type Story = StoryObj<typeof AssetInput>;
declare const _default: {
    component: ({ symbol, selectedAssetIcon, value, displayValue, displayValueLoading, label, maxBalance, maxButtonBalance, ignoreBalance, ignoreDisplayValue, hideMaxBalanceAction, onChange, error, disabled, disabledInput, hideInput, modalDisabled, loading, onAsssetBtnClick, className, }: import("./AssetInput").AssetInputProps) => import("react").JSX.Element;
};
export default _default;
export declare const Default: Story;
export declare const EmptyAssetSelector: Story;
export declare const ErrorAssetSelector: Story;
export declare const AssetSelectorWithNoMaxBalance: Story;
export declare const AssetSelectorLoading: Story;
