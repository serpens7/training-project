import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildCssLoader } from './loaders/buildCssLoader';

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {

    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
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

    const typescriptLoader = {
        test: /\.tsx?$/,
        use: [
            {
                loader: 'ts-loader',
                options: {
                    transpileOnly: true, // 💥 КЛЮЧЕВОЙ ФИКС
                },
            },
        ],
        exclude: /node_modules/,
    };
    return [
        svgLoader,
        fileLoader,
        typescriptLoader,
        cssLoader
    ];
}