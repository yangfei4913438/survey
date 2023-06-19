const path = require('path');
const yaml = require('yamljs');
const json5 = require('json5');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const JsonMinimizerPlugin = require('json-minimizer-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'production',
  devtool: false,
  entry: './src/main.tsx',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
    extensions: ['.tsx', '.ts', '.js', '.json', '.scss'],
  },
  output: {
    clean: true, // Clean the output directory before emit.
    filename: 'js/[name].[contenthash:8].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
      new CssMinimizerPlugin(),
      new JsonMinimizerPlugin(),
      new HtmlMinimizerPlugin(),
      // 打包分析
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled', // 禁用打包分析，默认 server
        openAnalyzer: false, // 是否自动弹出窗口
      }),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        antdTable: {
          minChunks: 1, // 最少引用一次
          name: 'antd-table-chunk', // chunk名称
          test: /antd\/es\/table/, // 匹配正则
          priority: 100, // 优先级
        },
        form: {
          minChunks: 1,
          name: 'antd-form-chunk',
          test: /\/(rc-field-)?form\//,
          priority: 99,
        },
        validator: {
          minChunks: 1,
          name: 'antd-validator-chunk',
          test: /validator/,
          priority: 98,
        },
        babel: {
          minChunks: 1,
          name: 'babel-runtime-chunk',
          test: /@babel\/runtime/,
          priority: 97,
        },
        tinycolor: {
          minChunks: 1,
          name: 'tinycolor-chunk',
          test: /\/tinycolor\//,
          priority: 96,
        },
        rcUtil: {
          minChunks: 1,
          name: 'rc-util-chunk',
          test: /\/rc-util\//,
          priority: 95,
        },
        antdResult: {
          minChunks: 1,
          name: 'antd-result-chunk', // chunk名称
          test: /antd\/es\/result/, // 匹配正则
          priority: 94, // 优先级
        },
        antdInput: {
          minChunks: 1,
          name: 'antd-input-chunk', // chunk名称
          test: /antd\/es\/input/, // 匹配正则
          priority: 93, // 优先级
        },
        antdBtn: {
          minChunks: 1,
          name: 'antd-button-chunk', // chunk名称
          test: /antd\/es\/button/, // 匹配正则
          priority: 93, // 优先级
        },
        antdTypography: {
          minChunks: 1,
          name: 'antd-typography-chunk', // chunk名称
          test: /antd\/es\/typography/, // 匹配正则
          priority: 92, // 优先级
        },
        antdMenu: {
          minChunks: 1,
          name: 'antd-menu-chunk', // chunk名称
          test: /antd\/es\/menu/, // 匹配正则
          priority: 91, // 优先级
        },
        antdTree: {
          minChunks: 1,
          name: 'antd-tree-chunk', // chunk名称
          test: /antd\/es\/tree/, // 匹配正则
          priority: 91, // 优先级
        },
        antdTabs: {
          minChunks: 1,
          name: 'antd-tabs-chunk', // chunk名称
          test: /antd\/es\/tabs/, // 匹配正则
          priority: 90, // 优先级
        },
        antdModal: {
          minChunks: 1,
          name: 'antd-modal-chunk', // chunk名称
          test: /antd\/es\/modal/, // 匹配正则
          priority: 89, // 优先级
        },
        antdSelect: {
          minChunks: 1,
          name: 'antd-select-chunk', // chunk名称
          test: /antd\/es\/select/, // 匹配正则
          priority: 88, // 优先级
        },
        antd: {
          minChunks: 1,
          name: 'antd-chunk', // chunk名称
          test: /antd/, // 匹配正则
          priority: 86, // 优先级
        },
        icon: {
          minChunks: 1,
          name: 'ant-design-chunk',
          test: /@ant-design/,
          priority: 85,
        },
        dndKitCore: {
          minChunks: 1,
          name: 'dnd-kit-core-chunk',
          test: /dnd-kit\/core/,
          priority: 82,
        },
        dndKit: {
          minChunks: 1,
          name: 'dnd-kit-chunk',
          test: /dnd-kit/,
          priority: 81,
        },
        reactDom: {
          name: 'react-dom-chunk',
          test: /react-dom/,
          priority: 80,
        },
        router: {
          name: 'router-chunk',
          test: /router/,
          priority: 76,
        },
        redux: {
          name: 'redux-toolkit-chunk',
          test: /reduxjs\/toolkit/,
          priority: 75,
        },
        reduxUndo: {
          name: 'redux-undo-chunk',
          test: /\/redux-undo\//,
          priority: 74,
        },
        ahooks: {
          minChunks: 1,
          name: 'ahooks-chunk',
          test: /ahooks/,
          priority: 70,
        },
        echarts: {
          minChunks: 1,
          name: 'echarts-chunk',
          test: /echarts/,
          priority: 60,
        },
        zrender: {
          minChunks: 1,
          name: 'zrender-chunk',
          test: /zrender/,
          priority: 55,
        },
        axios: {
          minChunks: 1,
          name: 'axios-chunk',
          test: /axios/,
          priority: 50,
        },
        lodash: {
          minChunks: 1,
          name: 'lodash-chunk',
          test: /lodash/,
          priority: 40,
        },
      },
    },
  },
  plugins: [
    // 清理输出内容，自动根据output的内容来清理。
    new CleanWebpackPlugin(),
    new CopyPlugin({
      // 把public目录下的文件移动到打包目录下的public
      patterns: [{ from: 'public', to: 'public' }],
    }),
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      publicPath: '/',
      template: 'template/index.html',
      icon: '/public/stars.svg',
      filename: 'index.html',
    }),
    new CompressionPlugin({
      filename: '[path][base].gz[query]', // 生成资源的名字 [path].gz[query] 是默认名字
      algorithm: 'gzip', //  // 压缩算法
      test: /\.(js|css|html|svg)$/, // 匹配的资源
      compressionOptions: { level: 8 }, // 压缩等级 默认9级
      minRatio: 0.8, //只有压缩率比这个值小的资源才会被处理
      threshold: 5120, //对超过5k的数据压缩
      deleteOriginalAssets: false, //不删除源文件
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              // 只进行语法转换,不进行类型校验,提高构建速度
              // 类型检查交给 fork-ts-checker-webpack-plugin 在别的的线程中做
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(css|s[ac]ss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext][query]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext][query]',
        },
      },
      {
        test: /\.yaml$/i,
        type: 'json',
        parser: {
          parse: yaml.parse,
        },
        generator: {
          filename: 'files/[name][ext][query]',
        },
      },
      {
        test: /\.json5?$/i,
        type: 'json',
        parser: {
          parse: json5.parse,
        },
        generator: {
          filename: 'files/[name][ext][query]',
        },
      },
    ],
  },
};
