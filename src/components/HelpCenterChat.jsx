/**
 * Help Center Chat Component
 *
 * Uses shared AI chat components from wp-module-ai-chat.
 * Falls back to legacy system if canAccessAIHelpCenter capability is not present.
 */

import {
	ChatInput,
	ChatMessages,
	WelcomeScreen,
	ErrorAlert,
	useNfdAgentsWebSocket,
} from '@newfold-labs/wp-module-ai-chat';
import HelpCenter from './HelpCenter'; // Legacy component
import Footer from './Footer'; // Support banner component
import { CapabilityAPI } from '../utils';
import { useEffect, useRef, useCallback } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { useHelpVisibility } from '../hooks/useHelpVisibility';
import { useHelpCenterState } from '../hooks/useHelpCenterState';
import { shouldShowFooterInChat } from '../utils/footerUtils';

// Import AI chat styles. The wp-module-ai-chat package exports ./styles/app.
// eslint-disable-next-line import/no-unresolved -- package resolved at build time (github: or file:)
import '@newfold-labs/wp-module-ai-chat/styles/app';

const HelpCenterChat = () => {
	const canAccessAIHelpCenter = CapabilityAPI.getAIHelpCenterCapability();
	const [isVisible] = useHelpVisibility();
	const { hasLaunchedFromTooltip } = useHelpCenterState();
	const hasShownWelcomeRef = useRef(false);

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
		configEndpoint: '/wp-json/nfd-agents/chat/v1/config',
		storageNamespace: 'help_center',
		autoConnect: isVisible && canAccessAIHelpCenter,
		consumerType: 'help_center', // Pass consumer type to construct consumer=wordpress_help_center
	});

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

	if (!canAccessAIHelpCenter) {
		return <HelpCenter />;
	}

	const brandClass = brandId ? `nfd-brand-${brandId}` : '';
	const containerClasses =
		`nfd-help-center-chat nfd-ai-chat-container ${brandClass}`.trim();

	return (
		<div className={containerClasses} data-brand={brandId || undefined}>
			{/* Error Alert */}
			{error && (
				<div className="nfd-help-center-chat__error-alert">
					<ErrorAlert message={error} />
				</div>
			)}

			{/* Messages Area - flex container that grows to fill space */}
			{/* ChatMessages handles its own scrolling via overflow-y: auto */}
			{showWelcome ? (
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
				</div>
			) : (
				<ChatMessages
					messages={displayMessages}
					isLoading={isTyping}
					error={error}
					onApprove={handleApproval}
					onReject={handleRejection}
					onSendMessage={sendMessage}
					onSendSystemMessage={sendSystemMessage}
					conversationId={conversationId}
					onClearTyping={clearTyping}
					brandId={brandId}
				/>
			)}

			{/* Actions Row - Clear Chat Link */}
			{messages.length > 0 && (
				<div className="nfd-help-center-chat__actions-row">
					<button
						onClick={handleClearChat}
						className="nfd-help-center-chat__clear-chat-button nfd-clear-chat-link"
						aria-label={__('Clear chat', 'wp-module-help-center')}
					>
						{__('Clear Chat', 'wp-module-help-center')}
					</button>
				</div>
			)}

			{/* Input Area */}
			<div
				className={`nfd-help-center-chat__input-area ${
					messages.length > 0
						? 'nfd-help-center-chat__input-area--no-border'
						: ''
				}`}
			>
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

			{/* Footer - Support banner (hidden when launched from tooltip) */}
			{shouldShowFooterInChat(hasLaunchedFromTooltip) && (
				<div className="nfd-help-center-chat__footer-wrapper">
					<Footer />
				</div>
			)}

			{/* Connecting overlay - grey out when WebSocket is connecting */}
			{isConnecting && (
				<div
					className="nfd-help-center-chat__connecting-overlay"
					aria-live="polite"
					aria-busy="true"
				>
					<span className="nfd-help-center-chat__connecting-text">
						{__('Connecting…', 'wp-module-help-center')}
					</span>
				</div>
			)}
		</div>
	);
};

export default HelpCenterChat;
