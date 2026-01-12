export declare enum StepState {
    Active = "active",
    Done = "done",
    Todo = "todo"
}
export declare function getStepState(stepIndex: number, activeStepIndex: number): StepState;
