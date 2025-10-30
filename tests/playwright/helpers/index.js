/**
 * Help Center Module Test Helpers
 * 
 * Specific utilities for testing the help center module functionality.
 * Includes modal interactions, search functionality, and UI state management.
 */

const { expect } = require('@playwright/test');
const { execSync } = require('child_process');

/**
 * WordPress CLI helper for help center module
 * 
 * @param {string} cmd - WP-CLI command to execute
 * @param {Object} options - Command options
 * @returns {string} Command output
 */
function wpCli(cmd, options = {}) {
  const defaultOptions = {
    timeout: 20000,
    failOnNonZeroExit: true,
  };
  
  const finalOptions = { ...defaultOptions, ...options };
  
  try {
    const result = execSync(`npx wp-env run cli wp ${cmd}`, { 
      encoding: 'utf-8',
      stdio: finalOptions.failOnNonZeroExit ? 'pipe' : 'inherit',
      timeout: finalOptions.timeout
    });
    return result.trim();
  } catch (error) {
    if (finalOptions.failOnNonZeroExit) {
      throw new Error(`WP-CLI command failed: ${cmd}\n${error.message}`);
    }
    return '';
  }
}

/**
 * Set permalink structure
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
async function setPermalinkStructure(page) {
  await page.goto('/wp-admin/options-permalink.php');
  await page.locator('#permalink-input-post-name').check({ force: true });
  await page.locator('form[name="form"] input[type="submit"]').click();
}

/**
 * Set site capabilities
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {Object} capabilities - Capabilities object
 */
async function setSiteCapabilities(page, capabilities) {
  const capabilitiesJson = JSON.stringify(capabilities);
  try {
    wpCli(
      `option update _transient_nfd_site_capabilities '${capabilitiesJson}' --format=json`,
      { timeout: 10000, failOnNonZeroExit: false }
    );
  } catch (error) {
    console.warn('Failed to set site capabilities:', error.message);
  }
}

/**
 * Get help center icon
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @returns {import('@playwright/test').Locator} Help center icon locator
 */
function getHelpCenterIcon(page) {
  // Try multiple possible selectors for the help center icon
  return page.locator('#wp-admin-bar-help-center .ab-item svg, #wp-admin-bar-help-center .ab-item, .help-center-icon, [data-testid="help-center-icon"]').first();
}

/**
 * Get help center modal
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @returns {import('@playwright/test').Locator} Help center modal locator
 */
function getHelpCenterModal(page) {
  return page.locator('#nfd-help-center');
}

/**
 * Get help center container
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @returns {import('@playwright/test').Locator} Help center container locator
 */
function getHelpCenterContainer(page) {
  return page.locator('.nfd-help-center');
}

/**
 * Get search input
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @returns {import('@playwright/test').Locator} Search input locator
 */
function getSearchInput(page) {
  return page.locator('#search-input-box');
}

/**
 * Get close button
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @returns {import('@playwright/test').Locator} Close button locator
 */
function getCloseButton(page) {
  return page.locator('.nfd-hc-modal__header__close-button');
}

/**
 * Get footer
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @returns {import('@playwright/test').Locator} Footer locator
 */
function getFooter(page) {
  return page.locator('.nfd-hc-modal__footer');
}

/**
 * Get CTA button
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @returns {import('@playwright/test').Locator} CTA button locator
 */
function getCTAButton(page) {
  return page.locator('.hc-banner-content__cta--button');
}

/**
 * Get question block
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @returns {import('@playwright/test').Locator} Question block locator
 */
function getQuestionBlock(page) {
  return page.locator('.helpcenter-question-block');
}

/**
 * Get result block
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @returns {import('@playwright/test').Locator} Result block locator
 */
function getResultBlock(page) {
  return page.locator('.helpcenter-result-block');
}

/**
 * Get feedback button (no)
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @returns {import('@playwright/test').Locator} Feedback button locator
 */
function getFeedbackButton(page) {
  return page.locator('button.feedback-button.no');
}

/**
 * Get dislike feedback
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @returns {import('@playwright/test').Locator} Dislike feedback locator
 */
function getDislikeFeedback(page) {
  return page.locator('.dislike-feedback');
}

/**
 * Get tooltip
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @returns {import('@playwright/test').Locator} Tooltip locator
 */
function getTooltip(page) {
  return page.locator('#help-center-tooltip');
}

/**
 * Click help center icon
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
async function clickHelpCenterIcon(page) {
  const icon = getHelpCenterIcon(page);
  // Wait a bit for the icon to appear
  await page.waitForTimeout(2000);
  await expect(icon).toBeVisible({ timeout: 10000 });
  await icon.click();
}

/**
 * Verify help center icon is visible
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
async function verifyHelpCenterIconVisible(page) {
  const icon = getHelpCenterIcon(page);
  // Wait a bit for the icon to appear
  await page.waitForTimeout(2000);
  await expect(icon).toBeVisible({ timeout: 10000 });
}

/**
 * Verify help center modal is visible
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
async function verifyHelpCenterModalVisible(page) {
  const modal = getHelpCenterModal(page);
  await expect(modal).toBeVisible();
}

/**
 * Verify help center modal is hidden
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
async function verifyHelpCenterModalHidden(page) {
  const modal = getHelpCenterModal(page);
  await expect(modal).not.toBeVisible();
}

/**
 * Search in help center
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} query - Search query
 */
async function searchInHelpCenter(page, query) {
  const searchInput = getSearchInput(page);
  await expect(searchInput).toBeVisible();
  await searchInput.fill(query);
  await searchInput.press('Enter');
}

/**
 * Verify search results
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} query - Expected query text
 */
async function verifySearchResults(page, query) {
  const questionBlock = getQuestionBlock(page);
  await expect(questionBlock).toContainText(`"${query}"`);
  
  const resultBlock = questionBlock.locator('+ .helpcenter-result-block');
  await expect(resultBlock).toBeVisible();
}

/**
 * Click feedback button
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
async function clickFeedbackButton(page) {
  const feedbackButton = getFeedbackButton(page);
  await feedbackButton.click();
}

/**
 * Verify dislike feedback appears
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
async function verifyDislikeFeedback(page) {
  const dislikeFeedback = getDislikeFeedback(page);
  await expect(dislikeFeedback).toBeVisible();
}

/**
 * Verify footer and CTA are visible
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
async function verifyFooterAndCTA(page) {
  const footer = getFooter(page);
  await expect(footer).toBeVisible();
  
  const ctaButton = getCTAButton(page);
  await expect(ctaButton).toBeVisible();
  await expect(ctaButton).toHaveAttribute('href');
  
  const href = await ctaButton.getAttribute('href');
  expect(href).not.toBe('');
}

/**
 * Close help center modal
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
async function closeHelpCenterModal(page) {
  const closeButton = getCloseButton(page);
  await expect(closeButton).toBeVisible();
  await closeButton.click();
}

/**
 * Click tooltip
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
async function clickTooltip(page) {
  const tooltip = getTooltip(page);
  await expect(tooltip).toHaveCSS('display', 'none');
  // Use evaluate to click the hidden element
  await tooltip.evaluate(element => element.click());
}

/**
 * Verify tooltip content
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} expectedText - Expected tooltip text
 */
async function verifyTooltipContent(page, expectedText) {
  const questionBlock = getQuestionBlock(page);
  await expect(questionBlock).toContainText(expectedText);
}

/**
 * Get plugin ID from environment
 * 
 * @returns {string} Plugin ID
 */
function getPluginId() {
  return process.env.PLUGIN_ID || 'bluehost';
}

/**
 * Get app ID from environment
 * 
 * @returns {string} App ID
 */
function getAppId() {
  return process.env.APP_ID || 'bluehost';
}

/**
 * Create capabilities object for help center
 * 
 * @returns {Object} Capabilities object
 */
function createHelpCenterCapabilities() {
  return {
    canAccessAI: true,
    hasAISiteGen: true,
    canAccessHelpCenter: true,
    canAccessGlobalCTB: true,
    hasEcomdash: true,
    hasYithExtended: true,
    isEcommerce: true,
    isJarvis: true,
  };
}

module.exports = {
  wpCli,
  setPermalinkStructure,
  setSiteCapabilities,
  getHelpCenterIcon,
  getHelpCenterModal,
  getHelpCenterContainer,
  getSearchInput,
  getCloseButton,
  getFooter,
  getCTAButton,
  getQuestionBlock,
  getResultBlock,
  getFeedbackButton,
  getDislikeFeedback,
  getTooltip,
  clickHelpCenterIcon,
  verifyHelpCenterIconVisible,
  verifyHelpCenterModalVisible,
  verifyHelpCenterModalHidden,
  searchInHelpCenter,
  verifySearchResults,
  clickFeedbackButton,
  verifyDislikeFeedback,
  verifyFooterAndCTA,
  closeHelpCenterModal,
  clickTooltip,
  verifyTooltipContent,
  getPluginId,
  getAppId,
  createHelpCenterCapabilities,
};
