import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';

export function buildCssLoader(isDev: boolean) {
  return {
    test: /\.s[ac]ss$/i,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentContext: path.resolve(`${__dirname}/../../../`),
            localIdentName: isDev
              ? '[path][name]__[local]--[hash:base64:5]'
              : '[hash:base64:8]',
            auto: (resPath: string) => resPath.includes('.module.'),
          },
        },
      },
      'sass-loader',
    ],
  };
}
