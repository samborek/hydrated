import { Join, Paths } from "@/types";
import lightJSON from "./tokens/light.json";
export type ThemeBaseProps = Omit<typeof base, "buttons" | "text">;
export type ThemeProps = ThemeBaseProps & typeof lightJSON;
export type ThemeName = keyof typeof themes;
export type ThemePreference = ThemeName | "system";
export type ThemeColor = Join<Paths<ThemeProps["colors"]>, ".">;
export type ThemeToken = Join<Paths<ThemeProps>, ".">;
export type ThemeFont = "mono" | keyof ThemeProps["fontFamilies1"];
declare const base: {
    breakpoints: string[];
    space: never[];
    fonts: {};
    fontSizes: never[];
    fontWeights: {};
    lineHeights: {};
    colors: {};
    transitions: {
        all: string;
        colors: string;
        transform: string;
        opacity: string;
    };
    animations: {
        rotate: {
            name: string;
            styles: string;
            anim: 1;
            toString: () => string;
        } & string;
        fadeInBack: {
            name: string;
            styles: string;
            anim: 1;
            toString: () => string;
        } & string;
        fadeIn: {
            name: string;
            styles: string;
            anim: 1;
            toString: () => string;
        } & string;
        fadeInForward: {
            name: string;
            styles: string;
            anim: 1;
            toString: () => string;
        } & string;
        fadeInTop: {
            name: string;
            styles: string;
            anim: 1;
            toString: () => string;
        } & string;
        fadeInRight: {
            name: string;
            styles: string;
            anim: 1;
            toString: () => string;
        } & string;
        fadeInBottom: {
            name: string;
            styles: string;
            anim: 1;
            toString: () => string;
        } & string;
        fadeInLeft: {
            name: string;
            styles: string;
            anim: 1;
            toString: () => string;
        } & string;
        fadeOut: {
            name: string;
            styles: string;
            anim: 1;
            toString: () => string;
        } & string;
        fadeOutBack: {
            name: string;
            styles: string;
            anim: 1;
            toString: () => string;
        } & string;
        fadeOutForward: {
            name: string;
            styles: string;
            anim: 1;
            toString: () => string;
        } & string;
        fadeOutTop: {
            name: string;
            styles: string;
            anim: 1;
            toString: () => string;
        } & string;
        fadeOutRight: {
            name: string;
            styles: string;
            anim: 1;
            toString: () => string;
        } & string;
        fadeOutBottom: {
            name: string;
            styles: string;
            anim: 1;
            toString: () => string;
        } & string;
        fadeOutLeft: {
            name: string;
            styles: string;
            anim: 1;
            toString: () => string;
        } & string;
        scaleInCenter: {
            name: string;
            styles: string;
            anim: 1;
            toString: () => string;
        } & string;
        scaleOutCenter: {
            name: string;
            styles: string;
            anim: 1;
            toString: () => string;
        } & string;
        scaleInTop: {
            name: string;
            styles: string;
            anim: 1;
            toString: () => string;
        } & string;
        scaleInRight: {
            name: string;
            styles: string;
            anim: 1;
            toString: () => string;
        } & string;
        scaleInBottom: {
            name: string;
            styles: string;
            anim: 1;
            toString: () => string;
        } & string;
        scaleInLeft: {
            name: string;
            styles: string;
            anim: 1;
            toString: () => string;
        } & string;
        scaleOutTop: {
            name: string;
            styles: string;
            anim: 1;
            toString: () => string;
        } & string;
        scaleOutRight: {
            name: string;
            styles: string;
            anim: 1;
            toString: () => string;
        } & string;
        scaleOutBottom: {
            name: string;
            styles: string;
            anim: 1;
            toString: () => string;
        } & string;
        scaleOutLeft: {
            name: string;
            styles: string;
            anim: 1;
            toString: () => string;
        } & string;
        slideInTop: {
            name: string;
            styles: string;
            anim: 1;
            toString: () => string;
        } & string;
        slideOutTop: {
            name: string;
            styles: string;
            anim: 1;
            toString: () => string;
        } & string;
        slideInBottom: {
            name: string;
            styles: string;
            anim: 1;
            toString: () => string;
        } & string;
        slideOutBottom: {
            name: string;
            styles: string;
            anim: 1;
            toString: () => string;
        } & string;
    };
    easings: {
        ease: string;
        easeIn: string;
        easeOut: string;
        easeInOut: string;
        inSine: string;
        inCubic: string;
        inQuint: string;
        inCirc: string;
        inQuad: string;
        inQuart: string;
        inExpo: string;
        inBack: string;
        outSine: string;
        outCubic: string;
        outQuint: string;
        outCirc: string;
        outQuad: string;
        outQuart: string;
        outExpo: string;
        outBack: string;
        inOutSine: string;
        inOutCubic: string;
        inOutQuint: string;
        inOutCirc: string;
        inOutQuad: string;
        inOutQuart: string;
        inOutExpo: string;
        inOutBack: string;
    };
    radii: {
        sm: number;
        md: number;
        lg: number;
        xl: number;
        xxl: number;
        full: number;
    };
    zIndices: {
        header: number;
        modal: number;
        popover: number;
        tooltip: number;
    };
    typography: {
        text: {
            size: {
                p1: {
                    fontSize: string;
                };
                p2: {
                    fontSize: string;
                };
                p3: {
                    fontSize: string;
                };
                p4: {
                    fontSize: string;
                };
                p5: {
                    fontSize: string;
                };
                p6: {
                    fontSize: string;
                };
                h1: {
                    fontSize: string;
                };
                h2: {
                    fontSize: string;
                };
                h3: {
                    fontSize: string;
                };
                h4: {
                    fontSize: string;
                };
                h5: {
                    fontSize: string;
                };
                h6: {
                    fontSize: string;
                };
                h7: {
                    fontSize: string;
                };
            };
        };
    };
};
export declare const themes: {
    light: ThemeProps;
    dark: ThemeProps;
};
declare module "@emotion/react" {
    interface Theme extends ThemeProps {
    }
}
export { ThemeProvider, useTheme } from "./provider";
export { mq, type ScreenBreakpoint, type ScreenType, useBreakpoints, } from "@/styles/media";
