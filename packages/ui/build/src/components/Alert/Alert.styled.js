import { Icon } from "@/components/Icon";
import { createVariants, css, styled } from "@/utils";
const containerVariants = createVariants((theme) => ({
    info: css `
    background: ${theme.colors.azureBlue.alpha[500]};
  `,
    error: css `
    background: ${theme.accents.danger.dimBg};
  `,
    warning: css `
    background: ${theme.accents.alert.dimBg};
  `,
}));
export const SAlertContainer = styled.div(({ theme, variant = "info" }) => [
    css `
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 8px;

    padding: ${theme.containers.paddings.quart}px;
    border-radius: 8px;
  `,
    containerVariants(variant),
]);
const textColorVariants = createVariants((theme) => ({
    info: css `
    color: ${theme.accents.info.onPrimary};
  `,
    error: css `
    color: ${theme.accents.danger.secondary};
  `,
    warning: css `
    color: ${theme.accents.alertAlt.primary};
  `,
}));
export const SAlertTitle = styled.span(({ theme, variant = "info" }) => [
    css `
    font-family: ${theme.fontFamilies1.secondary};
    font-weight: 500;
    font-size: ${theme.paragraphSize.p4};
    line-height: 1;
  `,
    textColorVariants(variant),
]);
export const SAlertIcon = styled(Icon)(({ variant }) => textColorVariants(variant));
