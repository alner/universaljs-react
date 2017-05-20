// @flow
import webpack from 'webpack'
import path from 'path'
import { WDS_PORT } from './src/shared/config'

const isProd = process.env.NODE_ENV === 'production'

export default {
  entry: [
    'react-hot-loader/patch',
    './src/client',
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: isProd ? '/static/' : `http://localhost:${WDS_PORT}/dist/`,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devtool: isProd ? false : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    port: WDS_PORT,
    headers: { 'Access-Control-Allow-Origin': '*' },
    hot: true,
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),    
  ]
}