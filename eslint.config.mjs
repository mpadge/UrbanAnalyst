import nextConfig from 'eslint-config-next/core-web-vitals';

// Plugins are registered inside nextConfig; extract them to re-use in our
// custom rules block without requiring them as direct dependencies.
const pluginTs    = nextConfig.find(c => c.plugins?.['@typescript-eslint'])?.plugins?.['@typescript-eslint'];
const pluginA11y  = nextConfig.find(c => c.plugins?.['jsx-a11y'])?.plugins?.['jsx-a11y'];
const pluginReact = nextConfig.find(c => c.plugins?.['react'])?.plugins?.['react'];

const config = [
    {
        ignores: ['pkg/**', 'coverage/**', 'next.config.js'],
    },
    ...nextConfig,
    {
        plugins: {
            '@typescript-eslint': pluginTs,
            'jsx-a11y': pluginA11y,
            'react': pluginReact,
        },
        rules: {
            '@typescript-eslint/explicit-function-return-type': 'warn',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
            'no-console': 'warn',
            'no-debugger': 'warn',
            'jsx-a11y/no-autofocus': 'warn',
            'react/jsx-no-target-blank': 'warn',
            // react-hooks/set-state-in-effect is new in eslint-plugin-react-hooks v5
            // and flags valid patterns (e.g. setState inside useEffect on mount).
            'react-hooks/set-state-in-effect': 'off',
        },
    },
    {
        files: ['**/*.test.ts', '**/*.test.tsx'],
        rules: {
            'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
        },
    },
];

export default config;
