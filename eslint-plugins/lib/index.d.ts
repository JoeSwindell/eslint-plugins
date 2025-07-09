export declare const rules: {
    'no-browsermodule-in-feature': import("@typescript-eslint/utils/ts-eslint").RuleModule<"noBrowser", [{
        rootFiles: string[];
    }], import("@typescript-eslint/utils/ts-eslint").RuleListener>;
};
export declare const configs: {
    recommended: {
        plugins: string[];
        rules: {
            'no-browsermodule/no-browsermodule-in-feature': string;
        };
    };
};
