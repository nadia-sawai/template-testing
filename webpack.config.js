const path = require("path");
const webpack = require("webpack");
const { ProgressPlugin } = require("webpack");
const HtmlBundlerPlugin = require("html-bundler-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const development = process.argv[2] === "serve";
const devtool = development ? "cheap-module-source-map" : false;

const dir = {
  dist: "htdocs",
};

const preprocessor = "pug"; // "pug" | "ejs"
const writeToDisk = false;
const open = false;

const targets = require("./package.json").browserslist;

module.exports = {
  entry: {
    app: "./src/assets/js/index.js",
    styles: "./src/assets/scss/app.scss",
  },
  output: {
    path: path.join(__dirname, dir.dist),
    publicPath: "/",
    hotUpdateChunkFilename: "../.cache/[id].[fullhash].hot-update.js",
    hotUpdateMainFilename: "../.cache/[runtime].[fullhash].hot-update.json",
    clean: {
      keep: /(wp|index\.php)/,
    },
    assetModuleFilename: (assetInfo) => {
      return path.join(assetInfo.filename.replace(/^(src\/)/, ""));
    },
  },
  devtool: devtool,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "swc-loader",
            options: {
              env: {
                targets: targets,
                mode: "usage",
                coreJs: "3.37.1",
              },
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "css-loader",
            options: {
              sourceMap: development,
              importLoaders: 2,
            },
          },
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: development,
              sassOptions: {
                outputStyle: "expanded",
              },
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
  plugins: [
    new ProgressPlugin(),
    new HtmlBundlerPlugin({
      entry: "src/views/pages",
      js: {
        filename: "assets/js/[name].js",
      },
      css: {
        filename: "assets/css/app.css",
      },
      preprocessor: preprocessor,
    }),
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options: {
          plugins: [
            [
              "mozjpeg",
              {
                quality: 80,
              },
            ],
            [
              "pngquant",
              {
                quality: [0.65, 0.8],
              },
            ],
            [
              "gifsicle",
              {
                optimizationLevel: 3,
              },
            ],
            [
              "svgo",
              {
                plugins: [
                  {
                    name: "preset-default",
                  },
                ],
              },
            ],
          ],
        },
      },
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src",
          to: `../${dir.dist}/[path][name][ext]`,
          globOptions: {
            ignore: [
              "**/*.{js,scss,html,pug,ejs,jpg,jpeg,png,gif,svg,webp,woff,woff2,eot,ttf,otf}",
            ],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, dir.dist),
      watch: {
        ignored: "**/*.*",
      },
    },
    devMiddleware: {
      writeToDisk: writeToDisk,
    },
    client: {
      logging: "warn",
    },
    port: 9000,
    open: open,
    hot: true,
    watchFiles: ["src/**/*.*"],
  },
};
