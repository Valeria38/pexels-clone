import { test, expect } from "@playwright/test";



test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test('should display the page title', async ({ page }) => {
    await expect(page).toHaveTitle('Pexels clone');
  });

  test("should redirect from home to default query url", async ({ page }) => {
    await page.waitForURL(/\/?query=nature/);
    await expect(page).toHaveURL(/\?query=nature/);
  });

  test("should show loader, then 40 images by default", async ({ page }) => {
    const loader = page.getByRole("status");
    await expect(loader).toBeVisible();
    const images = page.getByRole("list").locator("div a img");
    await expect(images).toHaveCount(40);
    const firstImgSrc = await images.first().getAttribute("src");
    expect(firstImgSrc).toBeTruthy();
  });

  test("should fetch new images on query change", async ({ page }) => {
    const images = page.getByRole("list").locator("div a img");
    const firstSrcBefore = await images.first().getAttribute("src");
    const searchInput = page.getByRole("textbox", {
      name: /Search photos/i,
    });
    const button = page.getByRole("button", { name: /Search/i });

    await searchInput.click();
    await searchInput.fill("sea");
    await button.click();

    expect(page).toHaveURL("http://localhost:3000/?query=sea");
    await expect(images.first()).not.toHaveAttribute("src", firstSrcBefore!);
  });

  test("should trigger Next.js server request on query change", async ({
    page,
  }) => {
    const nextServerFetchPromise = page.waitForResponse((response) =>
      response.url().includes("query=sea")
    );
    const searchInput = page.getByRole("textbox", {
      name: /Search photos/i,
    });
    const button = page.getByRole("button", { name: /Search/i });

    await searchInput.fill("sea");
    await button.click();
    const response = await nextServerFetchPromise;
    expect(response.status()).toBe(200);
  });

  test("should change query after tag was clicked", async ({ page }) => {
    const sunsetTag = page.getByRole("link", { name: /sunset/i }).first();

    await sunsetTag.dispatchEvent("click");

    await expect(page).toHaveURL(/\?query=sunset/);
  });

  test("should open intercepting route modal after click on photo", async ({
    page,
  }) => {
    const firstImgLink = page.locator(".masonry-grid a ").first();
    await firstImgLink.waitFor({ state: "attached" });
    const href = await firstImgLink.getAttribute("href");

    await firstImgLink.click();
    const modal = page.getByTestId("details-modal-image-container");

    await expect(page).toHaveURL(`${href}`);
    await expect(modal).toBeAttached();
  });

  test('should show details page after modal opened and hard reload', async ({ page }) => {
    const firstImgLink = page.locator(".masonry-grid a ").first();
    const modal = page.getByTestId("details-modal-image-container");

    await firstImgLink.click();
    await expect(modal).toBeVisible();
    const currentDetailsUrl = page.url();
    await page.goto(currentDetailsUrl, { waitUntil: 'networkidle' });

    const mainColorText = page.getByText(/Main Color/i);
    const popularTagsText = page.getByText(/Popular tags/i);

    await expect(mainColorText).toBeVisible();
    expect(popularTagsText).toBeVisible();
  })
});
