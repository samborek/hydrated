export declare function wsToHttp(url: string): string;
export declare const shorten: (string: string, fromStart?: number, fromEnd?: number) => string;
export declare const shortenAccountAddress: (address: string, length?: number) => string;
export declare const customFormatDuration: ({ start, end, isShort, }: {
    start?: number;
    end: number;
    isShort?: boolean;
}) => {
    duration: string;
    isPositive: boolean;
};
export declare const durationInDaysAndHoursFromNow: (milliseconds: number) => string | undefined;
