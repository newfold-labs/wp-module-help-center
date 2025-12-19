import { test, expect } from '@playwright/test';
import {
  auth,
  a11y,
  SELECTORS,
  HELP_CENTER_CAPABILITIES,
  setSiteCapabilities,
  clickHelpCenterIcon,
  verifyHelpCenterModalVisible,
  searchInHelpCenter,
} from '../helpers/index.mjs';

// Brand plugin id
const pluginId = process.env.PLUGIN_ID || 'bluehost';

test.describe('Home Page- Help Center', () => {

  test.beforeEach(async ({ page }) => {
    await auth.loginToWordPress(page);
    await setSiteCapabilities(HELP_CENTER_CAPABILITIES);
    await page.goto('/wp-admin/index.php');
  });

  test('Verify HelpCenter icon visible', async ({ page }) => {
    const icon = page.locator(SELECTORS.helpCenterIcon).first();
    await expect(icon).toBeVisible({ timeout: 10000 });
  });

  test('Verify HelpCenter layout visible onclick', async ({ page }) => {
    await clickHelpCenterIcon(page);
    await verifyHelpCenterModalVisible(page);
  });

  test('Verify HelpCenter search response', async ({ page }) => {
    if (pluginId === 'hostgator') {
      test.skip();
    }
    
    await page.setViewportSize({ width: 1500, height: 1200 });
    await clickHelpCenterIcon(page);
    
    await expect(page.locator(SELECTORS.helpCenterContainer)).toBeVisible();
    
    await searchInHelpCenter(page, 'How to install a plugin in WordPress');
    
    // Verify search results appear
    const questionBlock = page.locator(SELECTORS.questionBlock);
    await expect(questionBlock).toContainText('"How to install a plugin in WordPress"', { timeout: 20000 });
    
    const resultBlock = page.locator(SELECTORS.resultBlock);
    await expect(resultBlock).toBeVisible({ timeout: 20000 });
  });

  test('Verify HelpCenter dislike screen', async ({ page }) => {
    if (pluginId === 'hostgator') {
      test.skip();
    }
    
    await page.setViewportSize({ width: 1500, height: 1200 });
    await clickHelpCenterIcon(page);
    
    await expect(page.locator(SELECTORS.helpCenterContainer)).toBeVisible();
    
    await searchInHelpCenter(page, 'How to install a plugin in WordPress');
    await page.waitForTimeout(300);
    
    // Click dislike feedback button
    await page.locator(SELECTORS.feedbackButtonNo).click();
    
    // Verify dislike feedback form appears
    await expect(page.locator(SELECTORS.dislikeFeedback)).toBeVisible();
  });

  test('Verify HelpCenter footer and CTA button visible and clickable', async ({ page }) => {
    await clickHelpCenterIcon(page);
    await verifyHelpCenterModalVisible(page);
    
    // Verify footer is visible
    await expect(page.locator(SELECTORS.footer)).toBeVisible();
    
    // Verify CTA container and button
    await expect(page.locator(SELECTORS.ctaContainer)).toBeVisible();
    
    const ctaButton = page.locator(SELECTORS.ctaButton);
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toHaveAttribute('href');
    const href = await ctaButton.getAttribute('href');
    expect(href).not.toBe('');
  });

  test('Accessibility Test for Help Center', async ({ page }) => {
    await clickHelpCenterIcon(page);
    await verifyHelpCenterModalVisible(page);
    
    await a11y.checkA11y(page, '#nfd-help-center', {
      exclude: ['iframe', '.nfd-hc-modal__footer a[href*="external"]', '#search-input-box'],
      disabledRules: ['landmark-one-main', 'page-has-heading-one', 'color-contrast']
    });
  });

  test('Verify HelpCenter closed onclick', async ({ page }) => {
    await clickHelpCenterIcon(page);
    await verifyHelpCenterModalVisible(page);
    
    // Click close button
    const closeButton = page.locator(SELECTORS.closeButton);
    await expect(closeButton).toBeVisible();
    await closeButton.click();
    
    // Verify modal is hidden
    await expect(page.locator(SELECTORS.helpCenterModal)).not.toBeVisible();
  });

  test('Verify Tooltip functionality to retrieve post information', async ({ page }) => {
    await clickHelpCenterIcon(page);
    
    // Tooltip should exist but be hidden initially
    const tooltip = page.locator(SELECTORS.tooltip);
    await expect(tooltip).toHaveCount(1);
    await expect(tooltip).toHaveCSS('display', 'none');
    
    // Click the hidden tooltip (force click)
    await tooltip.evaluate(el => el.click());
    
    // Verify question block contains expected content
    await expect(page.locator(SELECTORS.questionBlock)).toContainText(
      'i have 7 items in the cart that dont really exist how do i get rid of them'
    );
  });
});
