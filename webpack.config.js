const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { DefinePlugin } = require('webpack')
const path = require('path')
const fs = require('fs')

const IS_DEV = process.env.NODE_ENV === 'development'

// text-replace any process.env.* variable at build time with the corresponding
// value found in the .env file if it exists, or othrerwise with the environment
// variable of the same name
const dotEnvPath = path.join(__dirname, '.env')
const dotEnv = fs.existsSync(dotEnvPath)
  ? Object.fromEntries(
      fs
        .readFileSync(dotEnvPath, 'utf-8')
        .split('\n')
        .filter(v => v.includes('='))
        .map(v => v.split('='))
    )
  : {}
const env = Object.fromEntries(
  Object.entries({ ...process.env, ...dotEnv }).map(([k, v]) => [
    `process.env.${k}`,
    JSON.stringify(v),
  ])
)

module.exports = {
  mode: IS_DEV ? 'development' : 'production',
  entry: {
    app: path.join(__dirname, 'src/index.tsx'),
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'node_modules'),
    ],
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  ...(IS_DEV && { devtool: 'source-map' }),
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.sa|css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
    new MiniCssExtractPlugin(),
    new DefinePlugin(env),
  ],
}
