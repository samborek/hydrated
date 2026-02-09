export declare const logger: {
    trace: (...data: any[]) => void;
    debug: (...data: any[]) => void;
    log: (...data: any[]) => void;
    table: (tabularData?: any, properties?: string[]) => void;
    info: (...data: any[]) => void;
    warn: (...data: any[]) => void;
    error: (...data: any[]) => void;
};
