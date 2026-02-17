/**
 * Help Center Chat Context
 *
 * Provides onClose (and optionally onNewChat) for the AI chat path only.
 * Modal provides onClose when canAccessAIHelpCenter is true; HelpCenterChatAI consumes it for the BLU Chat header close button.
 */

import { createContext, useContext } from '@wordpress/element';

const HelpCenterChatContext = createContext({
	onClose: null,
});

export const useHelpCenterChatContext = () => useContext(HelpCenterChatContext);

export const HelpCenterChatProvider = HelpCenterChatContext.Provider;

export default HelpCenterChatContext;
