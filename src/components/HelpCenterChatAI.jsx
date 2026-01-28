/**
 * AI Help Center Chat Component
 *
 * Contains all AI chat functionality from wp-module-ai-chat.
 * Only loaded when canAccessAIHelpCenter capability is enabled.
 */

import {
	ChatInput,
	ChatMessages,
	WelcomeScreen,
	useNfdAgentsWebSocket,
} from '@newfold-labs/wp-module-ai-chat';
import Footer from './Footer'; // Support banner component
import NoResults from './ResultList/NoResults'; // Fallback for errors
import ChatHistoryList from './ChatHistoryList'; // Chat history component
import { useEffect, useRef, useCallback, useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { useHelpVisibility } from '../hooks/useHelpVisibility';
import { useHelpCenterState } from '../hooks/useHelpCenterState';
import { useTypingAnimation } from '../hooks/useTypingAnimation';
import { shouldShowFooterInChat } from '../utils/footerUtils';

// Import AI chat styles. The wp-module-ai-chat package exports ./styles/app.
// This import only executes when this component is loaded (capability enabled).
// eslint-disable-next-line import/no-unresolved -- package resolved at build time (github: or file:)
import '@newfold-labs/wp-module-ai-chat/styles/app';

/* eslint-disable no-undef */
const HelpCenterChatAI = () => {
	const [isVisible] = useHelpVisibility();
	const { hasLaunchedFromTooltip } = useHelpCenterState();
	const hasShownWelcomeRef = useRef(false);
	const [showFallback, setShowFallback] = useState(false);

	// Typing animation for connecting state
	const connectingText = __('Connecting…', 'wp-module-help-center');

	// Check if we should load history (set when user clicks on history item)
	const shouldLoadHistory = (() => {
		try {
			const loadFlag = localStorage.getItem(
				'nfd-ai-chat-help_center-load-history'
			);
			if (loadFlag === 'true') {
				localStorage.removeItem('nfd-ai-chat-help_center-load-history');
				return true;
			}
		} catch (err) {
			// Ignore errors
		}
		return false;
	})();

	const {
		messages,
		sendMessage,
		sendSystemMessage,
		error,
		isTyping,
		isConnecting,
		currentResponse,
		conversationId,
		clearApprovalRequest,
		clearTyping,
		updateMessage,
		stopRequest,
		clearChatHistory,
		brandId,
	} = useNfdAgentsWebSocket({
		// Pass REST API path directly - useNfdAgentsWebSocket uses apiFetch internally
		// which handles permalinks and rest_route automatically
		configEndpoint: '/nfd-agents/chat/v1/config',
		storageNamespace: 'help_center',
		autoConnect: isVisible, // Capability already checked by parent component
		consumerType: 'help_center', // Pass consumer type to construct consumer=wordpress_help_center
		autoLoadHistory: shouldLoadHistory, // Load history if user selected a history item
	});

	// Animate connecting text character-by-character for more engaging UX
	const animatedConnectingText = useTypingAnimation(connectingText, {
		speed: 80,
		enabled: isConnecting,
		loop: true,
		loopDelay: 500,
	});

	// Show fallback NoResults component for any error instead of error alerts
	useEffect(() => {
		if (error) {
			setShowFallback(true);
		} else {
			setShowFallback(false);
		}
	}, [error]);

	const handleApproval = useCallback(() => {
		if (updateMessage) {
			updateMessage(
				(msg) => msg.type === 'approval_request' && msg.approvalRequest,
				(msg) => ({
					...msg,
					type: 'assistant',
					content: __(
						'Action approved and executed.',
						'wp-module-help-center'
					),
					approvalRequest: null,
				})
			);
		}
		clearApprovalRequest();
	}, [clearApprovalRequest, updateMessage]);

	/**
	 * Handle rejection
	 */
	const handleRejection = useCallback(() => {
		// Update the approval message in messages array to show it was cancelled
		if (updateMessage) {
			updateMessage(
				(msg) => msg.type === 'approval_request' && msg.approvalRequest,
				(msg) => {
					const toolName = msg.approvalRequest?.tool_name || 'action';
					return {
						...msg,
						type: 'assistant',
						content: sprintf(
							/* translators: %s: the name of the action or tool that was cancelled */
							__(
								'Action "%s" was cancelled.',
								'wp-module-help-center'
							),
							toolName
						),
						approvalRequest: null,
					};
				}
			);
		}

		clearApprovalRequest();
	}, [clearApprovalRequest, updateMessage]);

	/**
	 * Handle clear chat button click
	 */
	const handleClearChat = useCallback(() => {
		if (
			// eslint-disable-next-line no-alert -- Planned to replace with ConfirmDialog later.
			window.confirm(
				__(
					'Are you sure you want to clear the chat? This will start a new conversation.',
					'wp-module-help-center'
				)
			)
		) {
			hasShownWelcomeRef.current = false;
			clearChatHistory();
			// Reconnect to get fresh conversation ID
			// The hook will handle reconnection if autoConnect is true
		}
	}, [clearChatHistory]);

	// Combine messages with current streaming response
	const displayMessages = [...messages];
	if (currentResponse && isTyping) {
		displayMessages.push({
			id: 'streaming',
			role: 'assistant',
			type: 'assistant',
			content: currentResponse,
			timestamp: new Date(),
		});
	}

	// Show welcome screen when no messages and we haven't yet switched to chat view.
	// Omit !isConnecting so we don't flash to empty ChatMessages while the WebSocket is connecting.
	const showWelcome =
		displayMessages.length === 0 && !hasShownWelcomeRef.current;

	// Track when we've shown messages so welcome doesn't flicker back
	useEffect(() => {
		if (displayMessages.length > 0) {
			hasShownWelcomeRef.current = true;
		}
	}, [displayMessages.length]);

	const brandClass = brandId ? `nfd-brand-${brandId}` : '';
	const containerClasses =
		`nfd-help-center-chat nfd-ai-chat-container ${brandClass}`.trim();

	// Determine what to show in the messages area
	let messagesAreaContent;
	if (showFallback) {
		messagesAreaContent = (
			<div className="nfd-help-center-chat__welcome-wrapper">
				<NoResults
					hasLaunchedFromTooltip={hasLaunchedFromTooltip}
					query={null}
				/>
			</div>
		);
	} else if (showWelcome) {
		messagesAreaContent = (
			<div className="nfd-help-center-chat__welcome-wrapper">
				<WelcomeScreen
					onSendMessage={sendMessage}
					title={__(
						"Hi, I'm your AI assistant.",
						'wp-module-help-center'
					)}
					subtitle={__(
						'How can I help you with WordPress today?',
						'wp-module-help-center'
					)}
					showSuggestions={false}
				/>
				<ChatHistoryList />
			</div>
		);
	} else {
		messagesAreaContent = (
			<div className="nfd-help-center-chat__messages-wrapper">
				{/* Clear Chat button at top of messages */}
				{messages.length > 0 && (
					<div className="nfd-help-center-chat__messages-header">
						<button
							onClick={handleClearChat}
							className="nfd-help-center-chat__clear-chat-button"
							aria-label={__(
								'Clear chat',
								'wp-module-help-center'
							)}
						>
							{__('Clear Chat', 'wp-module-help-center')}
						</button>
					</div>
				)}
				<ChatMessages
					messages={displayMessages}
					isLoading={isTyping}
					onApprove={handleApproval}
					onReject={handleRejection}
					onSendMessage={sendMessage}
					onSendSystemMessage={sendSystemMessage}
					conversationId={conversationId}
					onClearTyping={clearTyping}
					brandId={brandId}
				/>
			</div>
		);
	}

	return (
		<div className={containerClasses} data-brand={brandId || undefined}>
			{/* Messages Area - flex container that grows to fill space */}
			{/* ChatMessages handles its own scrolling via overflow-y: auto */}
			{/* Show fallback NoResults when there's an error, otherwise show normal chat UI */}
			{messagesAreaContent}

			{/* Input Area */}
			<div
				className={`nfd-help-center-chat__input-area ${
					messages.length > 0
						? 'nfd-help-center-chat__input-area--no-border'
						: ''
				}`}
			>
				<div className="nfd-help-center-chat__input-wrapper">
					<ChatInput
						onSendMessage={sendMessage}
						onStopRequest={stopRequest}
						disabled={isTyping}
						placeholder={__(
							'Ask me anything about WordPress…',
							'wp-module-help-center'
						)}
					/>
				</div>
			</div>

			{/* Footer - Support banner (hidden when launched from tooltip) */}
			{shouldShowFooterInChat(hasLaunchedFromTooltip) && (
				<div className="nfd-help-center-chat__footer-wrapper">
					<Footer />
				</div>
			)}

			{/* Connecting overlay - polished loading state while WebSocket connects */}
			{isConnecting && (
				<div
					className="nfd-help-center-chat__connecting-overlay"
					aria-live="polite"
					aria-busy="true"
				>
					<div className="nfd-help-center-chat__connecting-content">
						<div className="nfd-help-center-chat__connecting-spinner" />
						<span className="nfd-help-center-chat__connecting-text">
							{animatedConnectingText}
							<span className="nfd-help-center-chat__connecting-cursor" />
						</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default HelpCenterChatAI;
