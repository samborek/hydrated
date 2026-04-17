import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { CircleAlert, CircleCheck, CircleClose, MoveUpRight, QuestionCircleRegular, Send, SquareQuestion, TriangleAlert, } from "@/assets/icons";
import { ButtonIcon, ButtonTransparent, } from "../Button";
import { ExternalLink } from "../ExternalLink";
import { Flex } from "../Flex";
import { Icon } from "../Icon";
import { Spinner } from "../Spinner";
import { Stack } from "../Stack";
import { Text } from "../Text";
import { Tooltip } from "../Tooltip";
import { getToken } from "@/utils";
import { SCloseIcon, SIconVariant, SNotification, SProgress, SProgressContainer, } from "./Notification.styled";
export const DEFAULT_AUTO_CLOSE_TIME = 3000;
const notificationIcons = {
    pending: Spinner,
    success: CircleCheck,
    error: CircleAlert,
    submitted: Send,
    warning: TriangleAlert,
    unknown: SquareQuestion,
};
export const Notification = ({ content, className, variant, autoClose = true, autoCloseTimeSC = DEFAULT_AUTO_CLOSE_TIME, onClose, dateString, link, hint, }) => {
    return (_jsxs(SNotification, { className: className, children: [_jsxs(Flex, { gap: 8, children: [_jsx(SIconVariant, { component: notificationIcons[variant], variant: variant, size: 16 }), _jsxs(Stack, { gap: 2, children: [_jsx(Text, { fw: 500, fs: "p5", children: content }), dateString && (_jsx(Text, { fs: "p6", fw: 500, color: getToken("text.medium"), children: dateString }))] }), _jsxs(Flex, { ml: "auto", children: [hint && (_jsx(Tooltip, { text: hint, asChild: true, children: _jsx(ButtonIcon, { children: _jsx(Icon, { component: QuestionCircleRegular, size: 18 }) }) })), link && (_jsx(ButtonIcon, { asChild: true, children: _jsx(ExternalLink, { href: link, children: _jsx(Icon, { component: MoveUpRight, size: 18 }) }) }))] })] }), autoClose && (_jsx(SProgressContainer, { children: _jsx(SProgress, { onAnimationEnd: onClose, closeTime: autoCloseTimeSC, variant: variant }) })), onClose && (_jsx(ButtonTransparent, { onClick: onClose, role: "button", "aria-label": "Close Notification", children: _jsx(SCloseIcon, { component: CircleClose, size: 18 }) }))] }));
};
