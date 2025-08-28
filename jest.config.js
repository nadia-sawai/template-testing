// 単体テスト専用

/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",
  // 単体テストはunitディレクトリに固定
  roots: ["<rootDir>/tests/unit"],
  // テスト対象ファイル
  testMatch: ["**/*.test.js"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup/jest.setup.js"],
  // importやrequire時のファイル拡張子の指定リスト（import xxx from "hoge"→hogeがjsかjsonか）
  moduleFileExtensions: ["js", "json"],
  // カバレッジレポート対象のファイルパターン
  collectCoverageFrom: ["src/**/*.js", "!src/**/index.js"],
  coverageDirectory: "test-report/jest/coverage",
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "./test-report/jest/html",
        filename: "index.html",
        openReport: true,
      },
    ],
  ],
};
