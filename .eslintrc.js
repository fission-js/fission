module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint/eslint-plugin',
        'react',
    ],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:react/recommended',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'semi': [2, 'never'],
        'quotes': [2, 'single'],
        'comma-dangle': ['error', 'always-multiline'],
        '@typescript-eslint/ban-types': ['error',
            {
                'types': {
                    'String': false,
                    'Boolean': false,
                    'Number': false,
                    'Symbol': false,
                    '{}': false,
                    'Object': false,
                    'object': false,
                    'Function': false,
                },
                'extendDefaults': true,
            },
        ],
    },
}
