import webpack from 'webpack';
import { BuildOptions } from "./types/config";
import { buildPlugins } from './buildPlugins';
import { buildLoaders } from './buildLoaders';
import { buildResolvers } from './buildResolvers';
import { buildDevServer } from "./buildDevServer";

// eslint-disable-next-line max-len
export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
    const { paths, mode, isDev } = options;
    return {
        mode,
        entry: paths.entry,
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true,
            publicPath: '/',
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(paths),
        optimization: {
            // Split node_modules into a separate vendor chunk, shared and cached
            // across the already-lazy page chunks (see pages/*/*.async.tsx),
            // instead of duplicating framework code into every chunk that needs it.
            splitChunks: { chunks: 'all' },
        },
        // Persistent on-disk cache: cold restarts of the dev server reuse compiled
        // modules instead of rebuilding from scratch.
        cache: isDev ? { type: 'filesystem' } : undefined,
        // Cheap per-module eval source maps: fast HMR rebuilds, still debuggable.
        // (inline-source-map regenerated full maps on every rebuild — slow.)
        devtool: isDev ? 'eval-cheap-module-source-map' : undefined,
        devServer: isDev ? buildDevServer(options) : undefined,
    };
}