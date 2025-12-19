import { test, expect } from '@playwright/test';
import {
  auth,
  setSiteCapabilities,
  createHelpCenterCapabilities,
  verifyHelpCenterIconVisible,
  verifyHelpCenterModalVisible,
  verifyHelpCenterModalHidden,
  searchInHelpCenter,
  verifySearchResults,
  clickFeedbackButton,
  verifyDislikeFeedback,
  verifyFooterAndCTA,
  closeHelpCenterModal,
  clickHelpCenterIcon,
  getTooltip,
  getHelpCenterContainer,
  clickTooltip,
  verifyTooltipContent,
} from '../helpers/index.mjs';

// Brand plugin id
const pluginId = process.env.PLUGIN_ID || 'bluehost';

test.describe('Home Page- Help Center', () => {

  test.beforeAll(async () => {
    // Set up capabilities - we can't use page in beforeAll
    // This will be done in beforeEach instead
  });

  test.beforeEach(async ({ page }) => {
    // Login to WordPress
    await auth.loginToWordPress(page);
    
    // Set up capabilities for help center (optional)
    await setSiteCapabilities(page, createHelpCenterCapabilities());
    
    // Navigate to admin dashboard
    await page.goto('/wp-admin/index.php');
  });

  test('Verify HelpCenter icon visible', async ({ page }) => {
    await verifyHelpCenterIconVisible(page);
  });

  test('Verify HelpCenter layout visible onclick', async ({ page }) => {
    await clickHelpCenterIcon(page);
    await verifyHelpCenterModalVisible(page);
  });

  test('Verify HelpCenter search response', async ({ page }) => {
    // Skip test for hostgator
    if (pluginId === 'hostgator') {
      test.skip();
    }
    
    await page.setViewportSize({ width: 1500, height: 1200 });
    
    await clickHelpCenterIcon(page);
    
    const container = getHelpCenterContainer(page);
    await expect(container).toBeVisible();
    
    await searchInHelpCenter(page, 'How to install a plugin in WordPress');
    await verifySearchResults(page, 'How to install a plugin in WordPress');
  });

  test('Verify HelpCenter dislike screen', async ({ page }) => {
    // Skip test for hostgator
    if (pluginId === 'hostgator') {
      test.skip();
    }
    
    await page.setViewportSize({ width: 1500, height: 1200 });
    
    await clickHelpCenterIcon(page);
    
    const container = getHelpCenterContainer(page);
    await expect(container).toBeVisible();
    
    await searchInHelpCenter(page, 'How to install a plugin in WordPress');
    await page.waitForTimeout(300);
    
    await clickFeedbackButton(page);
    await verifyDislikeFeedback(page);
  });

  test('Verify HelpCenter footer and CTA button visible and clickable', async ({ page }) => {
    await clickHelpCenterIcon(page);
    await verifyHelpCenterModalVisible(page);
    await verifyFooterAndCTA(page);
  });

  //TODO : Need to fix Accessibility in Help Center
  //
  // test('Accessibility Test for Help Center', async ({ page }) => {
  //   await clickHelpCenterIcon(page);
  //   await verifyHelpCenterModalVisible(page);
  //   
  //   // Test accessibility of the help center modal
  //   // Note: Search input (#search-input-box) has a known color contrast issue
  //   // that should be addressed in the UI. Once fixed, remove the exclusions below.
  //   await a11y.checkA11y(page, '#nfd-help-center', {
  //     exclude: [
  //       // Exclude any third-party content or iframes that might not be accessible
  //       'iframe',
  //       '.nfd-hc-modal__footer a[href*="external"]',
  //       // Temporarily exclude search input until color contrast is fixed
  //       '#search-input-box'
  //     ],
  //     disabledRules: [
  //       // Disable rules that might be problematic for modal content
  //       'landmark-one-main',
  //       'page-has-heading-one',
  //       // Disable color contrast rule for now since there's a known issue
  //       'color-contrast'
  //     ]
  //   });
  // });

  test('Verify HelpCenter closed onclick', async ({ page }) => {
    await clickHelpCenterIcon(page);
    await verifyHelpCenterModalVisible(page);
    
    await closeHelpCenterModal(page);
    await verifyHelpCenterModalHidden(page);
  });

  test('Verify Tooltip functionality to retrieve post information', async ({ page }) => {
    await clickHelpCenterIcon(page);
    
    const tooltip = getTooltip(page);
    // Tooltip should exist but be hidden initially
    await expect(tooltip).toHaveCount(1);
    await expect(tooltip).toHaveCSS('display', 'none');
    
    await clickTooltip(page);
    await verifyTooltipContent(page, 'i have 7 items in the cart that dont really exist how do i get rid of them');
  });
});
