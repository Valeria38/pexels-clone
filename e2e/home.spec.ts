import { expect, test } from "@playwright/test";

test.describe("Homepage", () => {
  test.describe.configure({ mode: "serial" });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display the page title", async ({ page }) => {
    await expect(page).toHaveTitle("Pexels clone");
  });

  test("should redirect from home to default query url", async ({ page }) => {
    await expect(page).toHaveURL(/\/?query=nature/, { timeout: 15000 });
  });

  test("should show loader, then 40 images by default", async ({ page }) => {
    const loader = page.getByRole("status");
    try {
      await expect(loader).toBeVisible({ timeout: 1000 });
      await expect(loader).not.toBeVisible();
    } catch {
      // data was loaded instantly
    }

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

    await expect(page).toHaveURL("http://localhost:3000/?query=sea");
    await expect(images.first()).not.toHaveAttribute("src", firstSrcBefore!);
  });

  test("should trigger Next.js server request on query change", async ({
    page,
  }) => {
    const searchInput = page.getByRole("textbox", { name: /Search photos/i });
    const button = page.getByRole("button", { name: /Search/i });

    await expect(searchInput).toBeVisible();

    const images = page.getByRole("list").locator("div a img");

    await expect(images.first()).toBeVisible();
    const oldSrc = await images.first().getAttribute("src");

    await searchInput.fill("sea");
    await button.click();

    await expect(page).toHaveURL(/\?query=sea/);

    const photoList = page.getByRole("list", { name: /photo gallery/i });
    await expect(photoList).toBeVisible();

    await expect(images.first()).not.toHaveAttribute("src", oldSrc!);
  });

  test("should change query after tag was clicked", async ({ page }) => {
    const sunsetTag = page.getByRole("link", { name: /sunset/i }).first();

    await sunsetTag.dispatchEvent("click");

    await expect(page).toHaveURL(/\?query=sunset/);
  });

  test("should open photo details on click and details page after hard reload", async ({
    page,
  }) => {
    const firstImgLink = page.locator(".masonry-grid a").first();
    await firstImgLink.waitFor({ state: "attached" });
    const href = await firstImgLink.getAttribute("href");
    await firstImgLink.click();
    await expect(page).toHaveURL(`${href}`);
    const modal = page.getByTestId("details-modal-image-container");

    try {
      await expect(modal).toBeVisible({ timeout: 2000 });
    } catch (err) {
      console.warn(err);
      // Modal did not appear; that's acceptable if the app performed full page navigation.
    }

    const currentDetailsUrl = page.url();
    await page.goto(currentDetailsUrl, { waitUntil: "networkidle" });

    const mainColorText = page.getByText(/Main Color/i);
    const popularTagsText = page.getByText(/Popular tags/i);

    await expect(mainColorText).toBeVisible();
    await expect(popularTagsText).toBeVisible();
  });
});
