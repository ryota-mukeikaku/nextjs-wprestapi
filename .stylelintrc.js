module.exports = {
    extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier'],
    rules: {
        'scss/at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: [
                    'tailwind',
                    'layer',
                    'apply',
                    'screen',
                    'use',
                    'extend'
                ]
            }
        ],
        'function-no-unknown': [
            true,
            {
                ignoreFunctions: ['theme', 'screen']
            }
        ],
        'no-descending-specificity': null,
        'block-no-empty': null,
        'selector-class-pattern': null
    }
}
