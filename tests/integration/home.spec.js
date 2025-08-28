const { test, expect } = require("@playwright/test");

test.describe("トップページ UIテスト", () => {
  // test前に遷移
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:9000/");
  });

  test("リード文のタイトルが表示されている", async ({ page }) => {
    // locator: 要素（ボタン、テキストフィールド、リンクなど）を特定して操作するために使用される識別子
    const title = page.locator(".document-lead-text h2");
    // toBeVisible: 要素が実際に表示されているかチェック
    // 似たもので、toBeInTheDocumentがあるが、これは要素がDOMツリーに存在するかをチェック（可視性は考慮しない）
    await expect(title).toBeVisible();
    // toHaveText: テキストが存在するかチェック
    await expect(title).toHaveText("Hello, World!");
  });

  test("aboutページへのリンクが存在し、正しいhrefを持つ", async ({ page }) => {
    const link = page.locator(".document-lead-text a", {
      hasText: "aboutページ",
    });
    await expect(link).toBeVisible();
    // toHaveAttribute: 属性チェック
    await expect(link).toHaveAttribute("href", "/about/index.html");
  });

  test("ダミー画像が表示されている", async ({ page }) => {
    const image = page.locator(".document-lead-text img");
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute("src", "/assets/images/dummy.png");
    await expect(image).toHaveAttribute("alt", "");
  });

  test("aboutページへの遷移と要素確認", async ({ page }) => {
    // aboutページリンクをクリック
    await page.click("a[href='/about/index.html']");

    // ページ遷移まで待機
    await page.waitForURL("/about/index.html");

    // 遷移後のページにある特定の要素を確認（例：.about-heading）
    await expect(page.locator(".about-heading")).toBeVisible();
  });
});
