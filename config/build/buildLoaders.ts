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
        jsResolveLoader,
        svgLoader,
        fileLoader,
        typescriptLoader,
        cssLoader
    ];
}