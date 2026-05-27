/**
 * Reader for the `nfdHelpCenter.environment` flags emitted by PHP.
 *
 * PHP populates `window.nfdHelpCenter.environment` in `HelpCenter::assets()` with booleans
 * describing the host site (e.g. whether WooCommerce is active). The shape lives in one place
 * here so callers don't sprinkle `window.nfdHelpCenter?.environment?.xxx` reads across the
 * codebase. Add a new flag by extending PHP's `environment` array and giving it a default below.
 *
 * @typedef {Object} HelpCenterEnv
 * @property {boolean} hasWooCommerce Whether WooCommerce is active on the site.
 */

const DEFAULTS = Object.freeze({
	hasWooCommerce: false,
});

/**
 * Return the current help-center environment flags, with defaults for anything missing.
 *
 * @return {HelpCenterEnv} Normalized environment object.
 */
export const getHelpCenterEnv = () => {
	const env = (typeof window !== 'undefined' && window.nfdHelpCenter && window.nfdHelpCenter.environment) || {};
	return {
		...DEFAULTS,
		...env,
	};
};
