export declare const logger: {
    trace: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    debug: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    log: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    table: {
        (tabularData?: any, properties?: string[]): void;
        (tabularData: any, properties?: readonly string[]): void;
    };
    info: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    warn: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    error: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
};
