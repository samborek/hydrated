import { BoxProps } from "@/components/Box";
export type StepperProps = Omit<BoxProps, "width"> & {
    steps: Array<string>;
    activeStepIndex: number;
};
export declare const Stepper: React.FC<StepperProps>;
