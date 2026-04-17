/**
 * Help Center Module Test Helpers for Playwright
 */
import { expect } from '@playwright/test';
import { join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Resolve plugin directory from PLUGIN_DIR env var (set by playwright.config.mjs) or process.cwd()
const pluginDir = process.env.PLUGIN_DIR || process.cwd();

// Build path to plugin helpers (.mjs extension for ES module compatibility)
const finalHelpersPath = join(pluginDir, 'tests/playwright/helpers/index.mjs');

// Import plugin helpers using file:// URL
const helpersUrl = pathToFileURL(finalHelpersPath).href;
const pluginHelpers = await import(helpersUrl);

// Destructure plugin helpers
let { auth, wordpress, newfold, a11y, utils } = pluginHelpers;
const { fancyLog } = utils;
const { setCapability } = newfold;

/**
 * Selectors used in Help Center tests
 */
const SELECTORS = {
  helpCenterIcon: '#wp-admin-bar-help-center .ab-item svg, #wp-admin-bar-help-center .ab-item',
  helpCenterModal: '#nfd-help-center',
  helpCenterContainer: '.nfd-help-center',
  searchInput: '#search-input-box',
  closeButton: '.nfd-hc-modal__header__close-button',
  footer: '.nfd-hc-modal__footer',
  ctaButton: '.hc-banner-content__cta--button',
  ctaContainer: '.hc-banner-content__cta',
  questionBlock: '.helpcenter-question-block',
  resultBlock: '.helpcenter-result-block',
  feedbackButtonNo: 'button.feedback-button.no',
  dislikeFeedback: '.dislike-feedback',
  tooltip: '#help-center-tooltip',
};

/**
 * Default capabilities for help center tests
 */
const HELP_CENTER_CAPABILITIES = {
  canAccessAI: true,
  hasAISiteGen: true,
  canAccessHelpCenter: true,
  canAccessGlobalCTB: true,
  hasEcomdash: true,
  hasYithExtended: true,
  isEcommerce: true,
  isJarvis: true,
};

/**
 * Multi-search response shape must satisfy getResultMatches() in SearchInput (tokens/fields vs query).
 * Query used in e2e: "How to install a plugin in WordPress" (7 tokens after normalize).
 */
const MOCK_MULTI_SEARCH_RESPONSE = {
  results: [
    {
      grouped_hits: [
        {
          hits: [
            {
              document: {
                post_content:
                  '<p>Step-by-step: install a WordPress plugin from Plugins → Add New, upload ZIP, or use search.</p>',
                post_id: 999001,
              },
              text_match_info: {
                tokens_matched: 8,
                fields_matched: 2,
              },
            },
          ],
        },
      ],
    },
  ],
};

/** Tooltip search for data-post-id="111456" (see src/index.js test trigger) */
const MOCK_TOOLTIP_SEARCH_RESPONSE = {
  content: {
    rendered:
      '<p>Try clearing session cart or removing ghost line items in WooCommerce → Status → Tools.</p>',
  },
  title: {
    rendered:
      'i have 7 items in the cart that dont really exist how do i get rid of them',
  },
};

/**
 * @param {URL} url
 */
function isNewfoldMultiSearchUrl(url) {
  const h = url.href;
  return h.includes('newfold-multi-search') && h.includes('multi_search');
}

/**
 * @param {URL} url
 */
function isNewfoldTooltipSearchUrl(url) {
  const h = url.href;
  return h.includes('newfold-multi-search') && h.includes('tooltip_search');
}

/**
 * Clear persisted help center state so tests don't inherit prior results (Redux initial state reads localStorage).
 * @param {import('@playwright/test').Page} page
 */
async function clearHelpCenterClientState(page) {
  await page.evaluate(() => {
    try {
      localStorage.removeItem('helpResultContent');
      localStorage.removeItem('searchInput');
      localStorage.removeItem('helpVisible');
    } catch {
      // ignore
    }
  });
}

/**
 * Mock Hiive multi-search endpoints so e2e does not depend on live Typesense / network.
 * Matches wp-json and rest_route-style URLs.
 * @param {import('@playwright/test').Page} page
 */
async function setupHelpCenterApiMocks(page) {
  await page.route(isNewfoldMultiSearchUrl, async (route) => {
    if (route.request().method() !== 'POST') {
      await route.continue();
      return;
    }
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(MOCK_MULTI_SEARCH_RESPONSE),
    });
  });

  await page.route(isNewfoldTooltipSearchUrl, async (route) => {
    if (route.request().method() !== 'POST') {
      await route.continue();
      return;
    }
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(MOCK_TOOLTIP_SEARCH_RESPONSE),
    });
  });
}

/**
 * Set site capabilities
 * 
 * @param {Object} capabilities - Capabilities object
 */
async function setSiteCapabilities(capabilities) {
  try {
    await setCapability(capabilities);
  } catch (error) {
    fancyLog('Failed to set site capabilities:' + error.message, 55, 'yellow');
  }
}

/**
 * Click the help center icon to open the modal
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
async function clickHelpCenterIcon(page) {
  const icon = page.locator(SELECTORS.helpCenterIcon).first();
  await expect(icon).toBeVisible({ timeout: 10000 });
  await icon.click();
}

/**
 * Verify help center modal is visible
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
async function verifyHelpCenterModalVisible(page) {
  const modal = page.locator(SELECTORS.helpCenterModal);
  await expect(modal).toBeVisible();
}

/**
 * Search in help center and submit
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} query - Search query
 */
async function searchInHelpCenter(page, query) {
  const searchInput = page.locator(SELECTORS.searchInput);
  await expect(searchInput).toBeVisible();
  await searchInput.fill(query);
  await searchInput.press('Enter');
}

export {
  // Plugin helpers (re-exported for convenience)
  auth,
  wordpress,
  newfold,
  a11y,
  utils,
  // Selectors and constants
  SELECTORS,
  HELP_CENTER_CAPABILITIES,
  // Helper functions
  setSiteCapabilities,
  clearHelpCenterClientState,
  setupHelpCenterApiMocks,
  clickHelpCenterIcon,
  verifyHelpCenterModalVisible,
  searchInHelpCenter,
};
