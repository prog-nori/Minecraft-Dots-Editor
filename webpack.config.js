const path = require('path')

// 開発者モードか否かで処理を分岐する
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: 'development',
  entry: {
    app: path.join(__dirname, 'src/views/index.jsx'),
  },
  output: {
    path: path.join(__dirname, 'public/javascripts'),
    filename: '[name].js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          // plugins: ['@babel/plugin-transform-runtime']
        }
      },
      // {
      //   test: /\.(css|scss)$/,
      //   use: [
      //     'style-loader',
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         modules: true
      //       }
      //     },
      //     // 'postcss-loader', 'sass-loader'
      //   ]
      // }
      {
        test: /\.css$/,
        loader: ['css-loader', 'style-loader']
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.jsx']
  }
}
