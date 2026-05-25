/**
 * Welcome screen quick-start suggestions.
 *
 * Each suggestion is `{ id, icon, text, action, slot?, requires? }`:
 * - `action` is the prompt sent to the AI (text shown to the user is `text`).
 * - `requires(env)` is an optional predicate gating the entry against `HelpCenterEnv` flags
 *   emitted by PHP. Entries without `requires` always match.
 * - `slot` is an optional string identifier; entries sharing a slot compete and at most one
 *   renders. Predicate-having entries always win over catch-alls (entries without
 *   `requires`), regardless of declaration order — so contributors don't have to remember
 *   to list catch-alls last. The rendered tile takes the winner's position in the list.
 */

import { __ } from '@wordpress/i18n';
import { Icon, pencil, page, box, brush, cog } from '@wordpress/icons';
import { getHelpCenterEnv } from '../utils/helpCenterEnv';

const ICON_SIZE = 16;

const renderIcon = (glyph) => (
	<Icon icon={glyph} size={ICON_SIZE} />
);

// Slot ID for the contextual action tile (Add-a-product for WooCommerce stores, otherwise
// Customize-site). Extracted so the two peer entries can't drift out of sync on rename.
const SLOT_CONTEXTUAL_ACTION = 'contextual-action';

/**
 * Master list of welcome-screen suggestions in display order.
 *
 * Frozen at module-load. WP admin locale is fixed per request, so re-evaluating `__()` per
 * call gains nothing in practice and the upstream `useMemo([])` freezes the result anyway.
 *
 * Adding a conditional swap: list both entries with the same `slot`, give the conditional
 * one a `requires` predicate, leave the catch-all without one. Declaration order between
 * the two is irrelevant — the resolver picks predicate-match first.
 *
 * Adding a new env flag: extend `HelpCenter::get_js_environment()` on the PHP side, mirror
 * the default in `helpCenterEnv.js`, then reference it from a `requires` predicate here.
 */
const ALL_SUGGESTIONS = [
	{
		id: 'write-post',
		icon: renderIcon(pencil),
		text: __('Write a blog post', 'wp-module-help-center'),
		action: __('Help me write a new blog post for my site.', 'wp-module-help-center'),
	},
	{
		id: 'edit-page',
		icon: renderIcon(page),
		text: __('Edit a page', 'wp-module-help-center'),
		action: __('I want to edit one of the pages on my site.', 'wp-module-help-center'),
	},
	{
		id: 'add-product',
		icon: renderIcon(box),
		text: __('Add a product', 'wp-module-help-center'),
		action: __('Add a new product to my store.', 'wp-module-help-center'),
		slot: SLOT_CONTEXTUAL_ACTION,
		requires: (env) => env.hasWooCommerce,
	},
	{
		id: 'customize-site',
		icon: renderIcon(brush),
		text: __('Customize site', 'wp-module-help-center'),
		action: __('Help me customize my site\'s appearance.', 'wp-module-help-center'),
		slot: SLOT_CONTEXTUAL_ACTION,
	},
	{
		id: 'site-settings',
		icon: renderIcon(cog),
		text: __('Update site settings', 'wp-module-help-center'),
		action: __('Help me update my site settings.', 'wp-module-help-center'),
	},
];

/**
 * Pick the winning entry for one slot. Predicate-match wins over catch-all regardless of
 * declaration order; ties between multiple matching predicates are broken by first occurrence.
 *
 * @param {Array}                                                         entries Entries in the slot, in master-list order.
 * @param {import('../utils/helpCenterEnv').HelpCenterEnv}                env     Current env flags.
 * @return {Object|null} The winning entry, or null if the slot has no viable entry.
 */
const resolveSlotWinner = (entries, env) => {
	let firstMatchingPredicate = null;
	let firstCatchAll = null;
	for (const entry of entries) {
		if (typeof entry.requires === 'function') {
			if (!firstMatchingPredicate && entry.requires(env)) {
				firstMatchingPredicate = entry;
			}
		} else if (!firstCatchAll) {
			firstCatchAll = entry;
		}
	}
	return firstMatchingPredicate || firstCatchAll || null;
};

/**
 * Resolved welcome-screen suggestions for the current site environment.
 *
 * Two-phase resolution: first pick each slot's winner (predicate-first, catch-all fallback),
 * then walk the master list and emit non-slot entries whose predicate matches plus each
 * slot's winner at its declared position. `requires`/`slot` are stripped from the returned
 * objects so the presentational `WelcomeScreen` (in wp-module-ai-chat) stays unaware of
 * gating logic.
 *
 * @return {Array<{id: string, icon: JSX.Element, text: string, action: string}>}
 */
export const getWelcomeSuggestions = () => {
	const env = getHelpCenterEnv();

	const entriesBySlot = new Map();
	for (const suggestion of ALL_SUGGESTIONS) {
		if (!suggestion.slot) {
			continue;
		}
		if (!entriesBySlot.has(suggestion.slot)) {
			entriesBySlot.set(suggestion.slot, []);
		}
		entriesBySlot.get(suggestion.slot).push(suggestion);
	}

	const winnerBySlot = new Map();
	for (const [slot, entries] of entriesBySlot) {
		const winner = resolveSlotWinner(entries, env);
		if (winner) {
			winnerBySlot.set(slot, winner);
		}
	}

	const emittedSlots = new Set();
	const resolved = [];
	for (const suggestion of ALL_SUGGESTIONS) {
		if (suggestion.slot) {
			if (emittedSlots.has(suggestion.slot)) {
				continue;
			}
			if (winnerBySlot.get(suggestion.slot) !== suggestion) {
				continue;
			}
			emittedSlots.add(suggestion.slot);
		} else if (typeof suggestion.requires === 'function' && !suggestion.requires(env)) {
			continue;
		}
		const { requires, slot, ...rest } = suggestion;
		resolved.push(rest);
	}

	return resolved;
};
