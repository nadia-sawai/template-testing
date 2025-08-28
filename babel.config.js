module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current", // Jest実行時のNodeバージョンに合わせる
        },
      },
    ],
  ],
};
