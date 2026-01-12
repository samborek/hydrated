import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Alert } from "@galacticcouncil/ui/components";
export const ParameterChangeWarning = ({ className, }) => (_jsx(Alert, { className: className, variant: "info", description: "Attention: Parameter changes via governance can alter your account health factor and risk of liquidation." }));
