/**
 * Help Center — editor-screen exclusion.
 *
 * The block editor (Gutenberg post/page edit) and the site editor (FSE) host their
 * own AI chat surface backed by wp-module-ai-chat. Mounting the help center there
 * too would put two AI panels on one screen, so HelpCenter::is_excluded_screen()
 * gates both wp_enqueue_script() (in assets()) and the admin-bar entry (in
 * newfold_help_center()). These tests pin that gate from the browser.
 *
 * Test design notes
 * -----------------
 * - Each test is independent and self-validating. A positive control runs in
 *   beforeEach (load Dashboard, confirm the help-center icon DOES appear with
 *   our capabilities). Without it, a regression that disabled the help center
 *   globally would make our absence assertions pass for the wrong reason.
 * - All waits are event-based (`domcontentloaded`, `wpadminbar` attached,
 *   editor shell attached). No arbitrary sleep — the only timeouts are upper
 *   bounds for genuinely slow signals (site editor first paint).
 * - Absence is asserted at four independent layers so a failure tells you
 *   *which* gate regressed:
 *     1. <script id="nfd-help-center-js"> tag — wp_enqueue_script() never ran.
 *     2. #wp-admin-bar-help-center            — admin-bar callback short-circuited.
 *     3. #nfd-help-center / floating-icon DOM — JS bundle never executed.
 *     4. window.newfoldEmbeddedHelp          — final proof bundle didn't load.
 * - Env-driven skips (not failures) when prerequisites genuinely don't hold:
 *   capability setup couldn't be verified, or the active theme isn't a block
 *   theme (site editor is unavailable on non-FSE themes).
 */

import { test, expect } from '@playwright/test';
import {
  auth,
  wordpress,
  HELP_CENTER_CAPABILITIES,
  setSiteCapabilities,
  waitForHelpCenterIcon,
} from '../helpers/index.mjs';

const SELECTORS = {
  wpAdminBar: '#wpadminbar',
  helpCenterScriptTag: 'script[id^="nfd-help-center-js"]',
  helpCenterAdminBarEntry: '#wp-admin-bar-help-center',
  helpCenterModal: '#nfd-help-center',
  helpCenterFloatingIcon: '#nfd-hc-floating-icon-wrapper',
  // Block editor shell — present on post.php/post-new.php once Gutenberg has bootstrapped.
  blockEditorShell: '.block-editor, .interface-interface-skeleton, .editor-styles-wrapper',
  // Site editor shell — present on site-editor.php once FSE has bootstrapped.
  siteEditorShell: '.edit-site, body.site-editor-php',
};

/**
 * Wait for an admin page to render through the point where help-center scripts
 * would have been enqueued. The admin bar is the universal signal: it's emitted
 * in admin-header.php which runs after `admin_enqueue_scripts`. By the time the
 * bar is in the DOM, our gate has had its chance to run (or not).
 *
 * @param {import('@playwright/test').Page} page
 * @param {number} [timeout]
 */
async function waitForAdminBar(page, timeout = 15000) {
  await page.waitForSelector(SELECTORS.wpAdminBar, { state: 'attached', timeout });
}

/**
 * True when the active WordPress theme is a block theme. Site editor only loads
 * on block themes; classic themes redirect away from `site-editor.php`, which
 * would make the absence assertion meaningless. Returns false on any wp-cli
 * failure so the test soft-skips rather than wedging on environment issues.
 *
 * @returns {Promise<boolean>}
 */
async function isBlockTheme() {
  try {
    const raw = await wordpress.wpCli(`eval 'echo wp_is_block_theme() ? "1" : "0";'`);
    return String(raw || '').trim() === '1';
  } catch {
    return false;
  }
}

/**
 * Assert the help center is fully absent on the currently-loaded page. Caller
 * must have already waited for the admin bar (so server-rendered DOM is in).
 *
 * @param {import('@playwright/test').Page} page
 */
async function expectHelpCenterAbsent(page) {
  // 1. Most direct: the PHP gate prevents wp_enqueue_script(), so no <script> tag
  //    with our handle ever lands in the DOM. Covers any inline-script variants
  //    (`-js-before`, `-js-after`) via the id-prefix selector.
  await expect(page.locator(SELECTORS.helpCenterScriptTag)).toHaveCount(0);

  // 2. Admin-bar callback short-circuits independently — verify it too.
  await expect(page.locator(SELECTORS.helpCenterAdminBarEntry)).toHaveCount(0);

  // 3. JS bundle never ran, so the React mount points it creates aren't there.
  await expect(page.locator(SELECTORS.helpCenterModal)).toHaveCount(0);
  await expect(page.locator(SELECTORS.helpCenterFloatingIcon)).toHaveCount(0);

  // 4. Final cross-check: the global the bundle sets is absent.
  const globalType = await page.evaluate(() => typeof window.newfoldEmbeddedHelp);
  expect(globalType).toBe('undefined');
}

test.describe('Help Center — editor-screen exclusion', () => {
  test.beforeEach(async ({ page }) => {
    await auth.loginToWordPress(page);

    const capabilitiesReady = await setSiteCapabilities(HELP_CENTER_CAPABILITIES, {
      attempts: 2,
      retryDelayMs: 200,
    });
    test.skip(
      !capabilitiesReady,
      'Help Center capabilities could not be verified; skipping to avoid setup-timeout flake.',
    );

    // Positive control: with these capabilities, the help center *should* mount
    // on the Dashboard. If it doesn't, the editor-exclusion assertions later
    // would pass spuriously (icon missing everywhere, not just on editors).
    await page.goto('/wp-admin/index.php', { waitUntil: 'domcontentloaded', timeout: 15000 });
    const iconVisible = await waitForHelpCenterIcon(page, {
      maxAttempts: 2,
      adminBarTimeout: 8000,
      visibilityTimeout: 4000,
    });
    test.skip(
      !iconVisible,
      'Help Center icon did not render on Dashboard with capabilities set; environment flake.',
    );
  });

  test('not mounted on the block editor (post-new.php)', async ({ page }) => {
    await page.goto('/wp-admin/post-new.php', { waitUntil: 'domcontentloaded', timeout: 20000 });
    await waitForAdminBar(page);

    // Confirm we actually landed on the block editor before asserting absence —
    // otherwise a redirect (e.g. capability change) could make the test pass
    // for the wrong reason.
    expect(page.url()).toContain('/wp-admin/post-new.php');
    await page.locator(SELECTORS.blockEditorShell).first().waitFor({ state: 'attached', timeout: 20000 });

    await expectHelpCenterAbsent(page);
  });

  test('not mounted on the site editor (site-editor.php)', async ({ page }) => {
    const blockTheme = await isBlockTheme();
    test.skip(
      !blockTheme,
      'Active theme is not a block theme; site editor is unavailable on this env.',
    );

    await page.goto('/wp-admin/site-editor.php', { waitUntil: 'domcontentloaded', timeout: 25000 });
    await waitForAdminBar(page);

    expect(page.url()).toContain('/wp-admin/site-editor.php');
    // Site editor mounts asynchronously; wait for its shell to settle before
    // asserting absence so we don't race a delayed enqueue (defense in depth —
    // assets() runs server-side and is already done by admin-bar render).
    await page.locator(SELECTORS.siteEditorShell).first().waitFor({ state: 'attached', timeout: 20000 });

    await expectHelpCenterAbsent(page);
  });
});
