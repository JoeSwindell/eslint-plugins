import noBrowsermoduleInFeature from './rules/no-browsermodule-in-feature';

export const rules = {
    'no-browsermodule-in-feature': noBrowsermoduleInFeature,
};

export const configs = {
    recommended: {
        plugins: ['no-browsermodule'],
        rules: {
            'no-browsermodule/no-browsermodule-in-feature': 'error',
        },
    },
};
