const { test, expect } = require("@playwright/test");

test.describe("home画面のUI・アクセシビリティ", () => {
  // 各テスト前に共通準備
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:9000/");
    // フォントの読み込み完了を待つ
    await page.evaluateHandle(() => document.fonts && document.fonts.ready);
    // CSSアニメーションやトランジションを無効化
    await page.addStyleTag({
      content: "*{animation:none!important;transition:none!important;}",
    });
  });

  test("home全体のスクショ", async ({ page }) => {
    await expect(page).toHaveScreenshot();
  });

  test(".document-lead-textのスクショ", async ({ page }) => {
    const lead = page.locator(".document-lead-text");
    await expect(lead).toHaveScreenshot();
  });

  // headerのARIAテスト
  test("headerのARIA構造が正しい", async ({ page }) => {
    await expect(page.getByRole("banner")).toMatchAriaSnapshot(`
      - banner:
        - heading "Document" [level=1]
        - paragraph: lead text
    `);
  });
});
