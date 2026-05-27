import { test, expect } from '@playwright/test';

test.describe('Details page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/12377231");
    await page.waitForLoadState("networkidle");
  });

  test('should render details page', async ({ page }) => {
    const viewPhotographerProfileLink = page.getByRole('link', { name: /view profile/i });
    const href = viewPhotographerProfileLink.getAttribute('href');
    const likeBtn = page.getByRole('button', { name: /like-photo/i })
    const shareBtn = page.getByRole('button', { name: /share-photo/i })
    const downloadBtn = page.getByRole('button', { name: /download-photo/i })
    const imgContainer = page.getByTestId('details-photo');
    const img = imgContainer.locator('img');
    const src = img.getAttribute('src');
    const alt = img.getAttribute('alt');
    const tagsText = page.getByText(/Popular tags/i);
    const mainColorText = page.getByText(/Main Color/i);

    await expect(viewPhotographerProfileLink).toBeVisible();
    expect(href).toBeTruthy();
    await expect(likeBtn).toBeVisible();
    await expect(shareBtn).toBeVisible();
    await expect(downloadBtn).toBeVisible();
    await expect(mainColorText).toBeVisible();
    await expect(tagsText).toBeVisible();
    await expect(imgContainer).toBeVisible();
    await expect(img).toHaveAttribute('src');
    expect(src).toBeTruthy();
    expect(alt).toBeTruthy();
  });

  test('should copy photo url to clipboard on copy button click', async ({ page }) => {
    const shareBtn = page.getByRole('button', { name: /share-photo/i });
    await shareBtn.click();
    const shareModal = page.getByRole('dialog');
    await expect(shareModal).toHaveAttribute('data-headlessui-state', 'open');
    const heading = shareModal.getByRole('heading', { name: /share this with your community/i });
    await expect(heading).toHaveText(/share this with your community/i);
    const copyBtn = shareModal.getByRole('button', { name: /copy-url-button/i });

    // grant clipboard permissions, click copy and verify clipboard content
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();

    const copiedText = await page.evaluate(() => navigator.clipboard.readText());
    const expected = await page.evaluate(() => window.location.origin + window.location.pathname);
    expect(copiedText).toBe(expected);
  })

  test('should send like POST request to server on like button click', async ({ page }) => {
    const likeBtn = page.getByRole('button', { name: /like-photo/i });

    const [request] = await Promise.all([
      page.waitForRequest(
        (request) =>
          request.method() === 'POST' &&
          request.url().endsWith('/12377231')
      ),
      likeBtn.click(),
    ]);

    expect(request).toBeTruthy();
    expect(request.method()).toBe('POST');

    const response = await page.waitForResponse(
      (response) =>
        response.status() === 200 &&
        response.url().endsWith('/12377231')
    );

    expect(response.ok()).toBe(true);
  });

  test('should download photo on download button click', async ({ page }) => {
    const downloadBtn = page.getByRole('button', { name: /download-photo/i });

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      downloadBtn.click(),
    ]);

    expect(download.suggestedFilename()).toBe('Dense_greenery_in_a_tranquil_forest_setting_with_tall_trees_and_natural_light.jpeg');
    expect(await download.path()).toBeTruthy();
  });
})
