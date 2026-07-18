import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildCssLoader } from './loaders/buildCssLoader';

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {

    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    }

    const jsResolveLoader = {
        test: /\.m?js$/,
        include: /node_modules/,
        resolve: {
            fullySpecified: false,
        },
    }

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    }

    const cssLoader = buildCssLoader(isDev);

    // SWC (Rust) transpiles TS/JSX far faster than ts-loader. Type-checking is
    // NOT done here — it lives in the separate `npm run type:check` (tsc --noEmit),
    // exactly as ts-loader's `transpileOnly: true` behaved before.
    const codeLoader = {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
            loader: 'swc-loader',
            options: {
                jsc: {
                    parser: {
                        syntax: 'typescript',
                        tsx: true,
                    },
                    // Matches tsconfig target: es6
                    target: 'es2015',
                    transform: {
                        react: {
                            // Matches tsconfig jsx: react-jsx
                            runtime: 'automatic',
                            development: isDev,
                        },
                    },
                },
            },
        },
    };
    return [
        jsResolveLoader,
        svgLoader,
        fileLoader,
        codeLoader,
        cssLoader
    ];
}