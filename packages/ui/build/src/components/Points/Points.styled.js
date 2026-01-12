import styled from "@emotion/styled";
import { createVariants, css } from "@/utils";
const pointsSizes = createVariants((theme) => ({
    m: css `
    display: flex;
    gap: ${theme.scales.paddings.m}px;

    padding-block: ${theme.containers.paddings.quart}px;
  `,
    l: css `
    display: flex;
    gap: 19px;

    padding-block: ${theme.containers.paddings.secondary}px;
  `,
}));
export const SPointsContainer = styled.div(({ size }) => pointsSizes(size));
const pointsNumberContainerSizes = createVariants(() => ({
    m: css `
    width: 25px;
    height: 25px;
  `,
    l: css `
    width: 33px;
    height: 33px;
  `,
}));
export const SPointsNumberContainer = styled.div(({ theme, size }) => [
    css `
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      color: ${theme.details.separatorsOnDim};
      border: 0.85px solid ${theme.text.tint.secondary};
      border-radius: ${theme.containers.cornerRadius.buttonsPrimary}px;
    `,
    pointsNumberContainerSizes(size),
]);
const pointsNumberSizes = createVariants((theme) => ({
    m: css `
    font-family: ${theme.fontFamilies1.primary};
    font-weight: 700;
    font-size: 12px;
    line-height: 1.3;
    color: ${theme.text.high};
  `,
    l: css `
    font-family: ${theme.fontFamilies1.primary};
    font-weight: 700;
    font-size: 14px;
    line-height: 1.3;
    color: ${theme.text.high};
  `,
}));
export const SPointsNumber = styled.p(({ size }) => pointsNumberSizes(size));
const pointsTextContentSizes = createVariants((theme) => ({
    m: css `
    display: flex;
    flex-direction: column;
    gap: ${theme.scales.paddings.xs}px;
  `,
    l: css `
    display: flex;
    flex-direction: column;
    gap: 4px;
  `,
}));
export const SPointsTextContent = styled.div(({ size }) => pointsTextContentSizes(size));
const pointsTitleSizes = createVariants((theme) => ({
    m: css `
    font-family: ${theme.fontFamilies1.secondary};
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    color: ${theme.text.high};
  `,
    l: css `
    font-family: ${theme.fontFamilies1.primary};
    font-weight: 700;
    font-size: 14px;
    line-height: 1.3;
    color: ${theme.text.high};
  `,
}));
export const SPointsTitle = styled.p(({ size }) => pointsTitleSizes(size));
const pointsDescriptionSizes = createVariants((theme) => ({
    m: css `
    font-family: ${theme.fontFamilies1.secondary};
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    color: ${theme.text.medium};
  `,
    l: css `
    font-family: ${theme.fontFamilies1.secondary};
    font-weight: 400;
    font-size: ${theme.paragraphSize.p3};
    line-height: 1.4;
    color: ${theme.text.medium};
  `,
}));
export const SPointsDescription = styled.p(({ size }) => pointsDescriptionSizes(size));
