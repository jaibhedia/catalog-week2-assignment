import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const prod = process.env.NODE_ENV === 'production';

// Create __dirname equivalent:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: prod ? 'production' : 'development',
  devtool: prod ? false : 'source-map',
  entry: './src/index.tsx',
  output: {
    filename: prod ? '[name].[contenthash].js' : '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: 'GardenFormValidator',
    libraryTarget: 'commonjs2',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'esbuild-loader',
        options: {
          target: 'esnext',
          jsx: 'automatic',
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: prod ? '[name].[contenthash].css' : '[name].css',
    }),
  ],
};
