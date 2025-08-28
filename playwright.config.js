const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  // テストファイルのディレクトリを指定
  testDir: "./tests",
  // spec.jsのみテスト対象
  testMatch: ["**/*.spec.js"],
  // 各テストファイルを並列に実行して高速化
  fullyParallel: true,
  // test.only のコミット防止（CI用）
  forbidOnly: !!process.env.CI,
  // CIでは最大2回リトライ
  retries: process.env.CI ? 2 : 0,
  // 並列実行するテストの数 / デフォルトは自動設定。CIでは1に設定
  workers: process.env.CI ? 1 : undefined,
  // テスト結果の出力形式（html, list, json など)
  reporter: [["html", { outputFolder: "test-report/playwright" }]],
  use: {
    viewport: { width: 1280, height: 800 },
    baseURL: "http://localhost:9000",
    // 最初の失敗時にtraceファイルを保存する（リトライ設定時のみ有効）
    trace: "on-first-retry",
  },
  expect: {
    // VRTで使用
    toHaveScreenshot: { maxDiffPixels: 1 },
    // DOMツリーやARIA構造比較で使用
    toMatchSnapshot: { maxDiffPixelRatio: 0.1 },
  },
  // ブラウザごとの設定（chromium/デフォルト, firefox, webkit）
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },
    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },
  ],
  webServer: {
    command: "npx webpack serve --mode=development",
    port: 9000,
    // 開発時は既存サーバー再利用（!process.env.CIでCIでは新規起動）
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
  //
});
