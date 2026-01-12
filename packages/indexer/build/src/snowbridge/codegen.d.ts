declare const _default: {
    schema: string;
    overwrite: true;
    config: {
        preResolveTypes: boolean;
        onlyOperationTypes: boolean;
        defaultScalarType: string;
        scalars: {
            DateTime: string;
            JSON: string;
        };
    };
    generates: {
        "schema.snowbridge.graphql": {
            plugins: string[];
            config: {
                includeDirectives: boolean;
            };
        };
        "src/snowbridge/__generated__/types.ts": {
            plugins: string[];
        };
        "src/snowbridge/__generated__/operations.ts": {
            documents: string[];
            plugins: string[];
            preset: "import-types";
            presetConfig: {
                typesPath: string;
            };
        };
        "src/snowbridge/__generated__/sdk.ts": {
            documents: string[];
            plugins: string[];
            preset: "import-types";
            presetConfig: {
                typesPath: string;
            };
            config: {
                documentMode: string;
                avoidOptionals: {
                    field: boolean;
                    inputValue: boolean;
                    object: boolean;
                    defaultValue: boolean;
                };
                immutableTypes: boolean;
                preResolveTypes: boolean;
                onlyOperationTypes: boolean;
            };
        };
    };
};
export default _default;
