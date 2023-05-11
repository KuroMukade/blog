import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";
import { BuildOptions } from "./types/config";

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }

    const cssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            // dont compile css if dev
            options.isDev ? 'style-loader' : MiniCssExtractPlugin.loader,

            // setup css modules
            {
                loader: 'css-loader',
                options: {
                    modules: true
                }
            },
            "sass-loader",
        ],
    };

    return [
        typescriptLoader,
        cssLoader,
    ]
}
