import { ThemeUICSSProperties } from "@theme-ui/css";
export type SpinnerProps = React.ComponentProps<"svg"> & {
    size?: ThemeUICSSProperties["size"];
};
export declare const Spinner: React.FC<SpinnerProps>;
