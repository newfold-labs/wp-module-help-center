/**
 * Welcome screen quick-start suggestions.
 *
 * Each suggestion is `{ id, icon, text, action }` where `action` is the prompt sent to the AI
 * (text shown to the user is `text`). Kept as a function so localized strings re-evaluate on
 * locale change rather than freezing at module-load.
 */

import { __ } from '@wordpress/i18n';
import { Icon, pencil, page, box, cog } from '@wordpress/icons';

const ICON_SIZE = 16;

const renderIcon = (glyph) => (
	<Icon icon={glyph} size={ICON_SIZE} />
);

/**
 * Default welcome-screen quick-start suggestions for the AI help center.
 *
 * The shape matches what `WelcomeScreen` (from wp-module-ai-chat) expects in its `suggestions`
 * prop. Add or reorder freely; ids are used as React keys.
 *
 * @return {Array<{id: string, icon: JSX.Element, text: string, action: string}>}
 */
export const getWelcomeSuggestions = () => [
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
	},
	{
		id: 'site-settings',
		icon: renderIcon(cog),
		text: __('Update site settings', 'wp-module-help-center'),
		action: __('Help me update my site settings.', 'wp-module-help-center'),
	},
];
