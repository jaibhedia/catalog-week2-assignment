import path from 'path';
import { fileURLToPath } from 'url';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const prod = process.env.NODE_ENV === 'production';

// Create __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: prod ? 'production' : 'development',
  devtool: prod ? false : 'source-map',
  entry: './src/index.tsx',  // Your entry point that exports the main component
  output: {
    filename: 'index.js',  // Single entry file for the library
    path: path.resolve(__dirname, 'dist'),
    library: 'GardenFormValidator',  // Global variable name (if used in a browser)
    libraryTarget: 'commonjs2',      // Export as CommonJS2 for npm consumption
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
    new MiniCssExtractPlugin({
      filename: prod ? '[name].[contenthash].css' : '[name].css',
    }),
  ],
};
