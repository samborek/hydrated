import { css } from "@emotion/react";
import { breakpointsMap } from "./media";
export function containerQuery(config, styles) {
    const { name, conditions } = config;
    const queryParts = conditions.map((condition) => {
        const { type, value } = condition;
        return `(${type} >= ${value})`;
    });
    const queryString = queryParts.join(" and ");
    const containerName = name ? `container-type: ${name};` : "";
    return css `
    ${containerName}

    @container ${queryString} {
      ${styles}
    }
  `;
}
export function containerSize(size, styles, type = "inline-size") {
    const value = breakpointsMap[size];
    return containerQuery({
        conditions: [{ type, value }],
    }, styles);
}
