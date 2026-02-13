/**
 * Help Center Chat Component
 *
 * Wrapper component that checks capability and renders either:
 * - Legacy HelpCenter (when capability is off OR when launched from tooltip)
 * - AI Chat interface (when capability is on and not from tooltip)
 */

import HelpCenter from './HelpCenter'; // Legacy component
import { CapabilityAPI } from '../utils';
import { useHelpCenterState } from '../hooks/useHelpCenterState';
import { lazy, Suspense } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

// Lazy load AI chat component to avoid loading when capability is off
const HelpCenterChatAI = lazy(() =>
	import('./HelpCenterChatAI').then((module) => ({
		default: module.default,
	}))
);

// Loading placeholder to prevent flash of old UI while AI chat loads
const LoadingPlaceholder = () => (
	<div className="nfd-help-center-chat-loading">
		<div className="nfd-help-center-chat-loading__spinner" />
		<p className="nfd-help-center-chat-loading__text">
			{__('Loading…', 'wp-module-help-center')}
		</p>
	</div>
);

const HelpCenterChat = () => {
	// Check capability FIRST, before any AI chat code execution
	const canAccessAIHelpCenter = CapabilityAPI.getAIHelpCenterCapability();

	// Check if launched from tooltip - tooltips need legacy UI to show content properly
	const { hasLaunchedFromTooltip } = useHelpCenterState();

	// Use legacy HelpCenter for:
	// 1. When AI capability is off
	// 2. When launched from tooltip (tooltip content is displayed via legacy result system)
	if (!canAccessAIHelpCenter || hasLaunchedFromTooltip) {
		return <HelpCenter />;
	}

	// Only load AI chat when capability is enabled and NOT from tooltip
	// Use loading placeholder instead of old UI to prevent flash
	return (
		<Suspense fallback={<LoadingPlaceholder />}>
			<HelpCenterChatAI />
		</Suspense>
	);
};

export default HelpCenterChat;
