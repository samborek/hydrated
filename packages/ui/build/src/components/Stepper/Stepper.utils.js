export var StepState;
(function (StepState) {
    StepState["Active"] = "active";
    StepState["Done"] = "done";
    StepState["Todo"] = "todo";
})(StepState || (StepState = {}));
export function getStepState(stepIndex, activeStepIndex) {
    if (stepIndex === activeStepIndex) {
        return StepState.Active;
    }
    return activeStepIndex > stepIndex ? StepState.Done : StepState.Todo;
}
