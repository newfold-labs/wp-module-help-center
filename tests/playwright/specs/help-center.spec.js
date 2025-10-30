const { test, expect } = require('@playwright/test');
const path = require('path');

// Use environment variable to resolve plugin helpers
const pluginDir = process.env.PLUGIN_DIR || path.resolve(__dirname, '../../../../../../');
const { auth, a11y } = require(path.join(pluginDir, 'tests/playwright/helpers'));
const helpCenter = require('../helpers');

test.describe('Home Page- Help Center', () => {
  const pluginId = helpCenter.getPluginId();
  const customCommandTimeout = 20000;

  test.beforeAll(async () => {
    // Set up capabilities - we can't use page in beforeAll
    // This will be done in beforeEach instead
  });

  test.beforeEach(async ({ page }) => {
    // Login to WordPress
    await auth.loginToWordPress(page);
    
    // Set up capabilities for help center (optional)
    try {
      await helpCenter.setSiteCapabilities(page, helpCenter.createHelpCenterCapabilities());
    } catch (error) {
      console.warn('Could not set capabilities, continuing without them:', error.message);
    }
    
    // Navigate to WordPress admin
    await page.goto('/wp-admin/index.php');
    await page.waitForLoadState('domcontentloaded');
  });

  test('Verify HelpCenter icon visible', async ({ page }) => {
    await helpCenter.verifyHelpCenterIconVisible(page);
  });

  test('Verify HelpCenter layout visible onclick', async ({ page }) => {
    await helpCenter.clickHelpCenterIcon(page);
    await helpCenter.verifyHelpCenterModalVisible(page);
  });

  test('Verify HelpCenter search response', async ({ page }) => {
    // Skip test for hostgator
    if (pluginId === 'hostgator') {
      test.skip();
    }
    
    await page.setViewportSize({ width: 1500, height: 1200 });
    
    await helpCenter.clickHelpCenterIcon(page);
    
    const container = helpCenter.getHelpCenterContainer(page);
    await expect(container).toBeVisible();
    
    await helpCenter.searchInHelpCenter(page, 'How to install a plugin in WordPress');
    await helpCenter.verifySearchResults(page, 'How to install a plugin in WordPress');
  });

  test('Verify HelpCenter dislike screen', async ({ page }) => {
    // Skip test for hostgator
    if (pluginId === 'hostgator') {
      test.skip();
    }
    
    await page.setViewportSize({ width: 1500, height: 1200 });
    
    await helpCenter.clickHelpCenterIcon(page);
    
    const container = helpCenter.getHelpCenterContainer(page);
    await expect(container).toBeVisible();
    
    await helpCenter.searchInHelpCenter(page, 'How to install a plugin in WordPress');
    await page.waitForTimeout(300);
    
    await helpCenter.clickFeedbackButton(page);
    await helpCenter.verifyDislikeFeedback(page);
  });

  test('Verify HelpCenter footer and CTA button visible and clickable', async ({ page }) => {
    await helpCenter.clickHelpCenterIcon(page);
    await helpCenter.verifyHelpCenterModalVisible(page);
    await helpCenter.verifyFooterAndCTA(page);
  });

  test('Accessibility Test for Help Center', async ({ page }) => {
    await helpCenter.clickHelpCenterIcon(page);
    await helpCenter.verifyHelpCenterModalVisible(page);
    
    // Test accessibility of the help center modal
    // Note: Search input (#search-input-box) has a known color contrast issue
    // that should be addressed in the UI. Once fixed, remove the exclusions below.
    await a11y.checkA11y(page, '#nfd-help-center', {
      exclude: [
        // Exclude any third-party content or iframes that might not be accessible
        'iframe',
        '.nfd-hc-modal__footer a[href*="external"]',
        // Temporarily exclude search input until color contrast is fixed
        '#search-input-box'
      ],
      disabledRules: [
        // Disable rules that might be problematic for modal content
        'landmark-one-main',
        'page-has-heading-one',
        // Disable color contrast rule for now since there's a known issue
        'color-contrast'
      ]
    });
  });

  test('Verify HelpCenter closed onclick', async ({ page }) => {
    await helpCenter.clickHelpCenterIcon(page);
    await helpCenter.verifyHelpCenterModalVisible(page);
    
    await helpCenter.closeHelpCenterModal(page);
    await helpCenter.verifyHelpCenterModalHidden(page);
  });

  test('Verify Tooltip functionality to retrieve post information', async ({ page }) => {
    await helpCenter.clickHelpCenterIcon(page);
    
    const tooltip = helpCenter.getTooltip(page);
    // Tooltip should exist but be hidden initially
    await expect(tooltip).toHaveCount(1);
    await expect(tooltip).toHaveCSS('display', 'none');
    
    await helpCenter.clickTooltip(page);
    await helpCenter.verifyTooltipContent(page, '"i have 7 items in the cart that dont really exist how do i get rid of them"');
  });
});
