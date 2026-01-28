/**
 * Utility functions for footer visibility logic
 * Centralizes footer display logic to avoid duplication
 */

/**
 * Determines if footer should be shown based on state and capability
 *
 * @param {Object}  params                        - Parameters object
 * @param {boolean} params.isFooterVisible        - Whether footer is visible from Redux state
 * @param {boolean} params.hasLaunchedFromTooltip - Whether help was launched from tooltip
 * @param {boolean} params.canAccessAIHelpCenter  - Whether AI help center is enabled
 * @return {boolean} Whether footer should be shown
 */
export const shouldShowFooter = ({
	isFooterVisible,
	hasLaunchedFromTooltip,
	canAccessAIHelpCenter,
}) => {
	// Footer should not show when launched from tooltip
	if (hasLaunchedFromTooltip) {
		return false;
	}

	// For legacy flow, show footer based on isFooterVisible
	// For AI chat flow, footer is handled by HelpCenterChat component
	return isFooterVisible && !canAccessAIHelpCenter;
};

/**
 * Determines if footer should be shown in AI chat component
 *
 * @param {boolean} hasLaunchedFromTooltip - Whether help was launched from tooltip
 * @return {boolean} Whether footer should be shown
 */
export const shouldShowFooterInChat = (hasLaunchedFromTooltip) => {
	return !hasLaunchedFromTooltip;
};
