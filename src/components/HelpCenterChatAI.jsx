/**
 * AI Help Center Chat Component
 *
 * Contains all AI chat functionality from wp-module-ai-chat.
 * Only loaded when canAccessAIHelpCenter capability is enabled.
 */

import {
	ChatInput,
	ChatMessages,
	ChatHeader,
	WelcomeScreen,
	useNfdAgentsWebSocket,
	ChatHistoryDropdown,
	archiveConversation,
} from '@newfold-labs/wp-module-ai-chat';
import Footer from './Footer'; // Support banner component
import { useHelpCenterChatContext } from '../context/HelpCenterChatContext';
import { getConnectionFailedFallbackMessage } from '../utils/connectionFailedFallbackMessage';
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

const HelpCenterChatAI = () => {
	const [isVisible] = useHelpVisibility();
	const { hasLaunchedFromTooltip } = useHelpCenterState();
	const { onClose } = useHelpCenterChatContext();
	const hasShownWelcomeRef = useRef(false);
	const [historyDropdownOpen, setHistoryDropdownOpen] = useState(false);
	const [historyRefreshTrigger, setHistoryRefreshTrigger] = useState(0);

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
		isTyping,
		isConnecting,
		currentResponse,
		conversationId,
		clearApprovalRequest,
		clearTyping,
		updateMessage,
		stopRequest,
		clearChatHistory,
		loadConversation,
		getSessionId,
		connectionState,
		manualRetry,
		brandId,
	} = useNfdAgentsWebSocket({
		configEndpoint: '/nfd-agents/chat/v1/config',
		storageNamespace: 'help_center',
		autoConnect: isVisible,
		consumerType: 'help_center',
		autoLoadHistory: shouldLoadHistory,
		getConnectionFailedFallbackMessage,
	});

	// Animate connecting text character-by-character for more engaging UX
	const animatedConnectingText = useTypingAnimation(connectingText, {
		speed: 80,
		enabled: isConnecting,
		loop: true,
		loopDelay: 500,
	});

	// When user selects a conversation from history, load it into the hook so view updates without remount
	const handleSelectConversation = useCallback(
		(conversation) => {
			const msgs = conversation.messages || conversation;
			loadConversation(msgs, conversation.conversationId ?? null, conversation.sessionId ?? null);
		},
		[loadConversation]
	);

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
	 * Handle new chat button click - archives current conversation and starts fresh
	 */
	const handleNewChat = useCallback(() => {
		if (messages.length > 0) {
			archiveConversation(messages, getSessionId(), conversationId, 'help_center');
		}
		hasShownWelcomeRef.current = false;
		clearChatHistory();
	}, [messages, conversationId, clearChatHistory, getSessionId]);

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
	const hasMessages = messages.length > 0;

	// Determine what to show in the messages area. Always show welcome when no messages;
	// when connection fails and user sends, the hook adds error content as an AI message in the thread.
	let messagesAreaContent;
	if (showWelcome) {
		messagesAreaContent = (
			<div className="nfd-help-center-chat__welcome-wrapper">
				<WelcomeScreen
					onSendMessage={sendMessage}
					title={__(
						"Hi, I'm BLU, your AI assistant.",
						'wp-module-help-center'
					)}
					subtitle={__(
						'I can help you update page sections and styles, add, remove, or edit existing content.',
						'wp-module-help-center'
					)}
					showSuggestions={false}
				/>
			</div>
		);
	} else {
		messagesAreaContent = (
			<div className="nfd-help-center-chat__messages-wrapper">
				{/* Clear Chat button at top of messages */}
				{messages.length > 0 && (
					<div className="nfd-help-center-chat__messages-header">
						<button
							onClick={handleNewChat}
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
			{/* Header: white container, two-tone pill, New chat (+) and Close (×) */}
			<div className="nfd-help-center-chat__header-wrapper">
				<ChatHeader
					title={__('Blu Chat', 'wp-module-help-center')}
					onNewChat={handleNewChat}
					newChatDisabled={showWelcome}
					onClose={onClose}
					extraActions={
						<ChatHistoryDropdown
							storageNamespace="help_center"
							open={historyDropdownOpen}
							onOpenChange={(isOpen) => {
								setHistoryDropdownOpen(isOpen);
								if (isOpen) {
									setHistoryRefreshTrigger((c) => c + 1);
								}
							}}
							onSelectConversation={(conv) => {
								handleSelectConversation(conv);
								setHistoryDropdownOpen(false);
							}}
							refreshTrigger={historyRefreshTrigger}
							disabled={false}
						/>
					}
				/>
				{/* Non-blocking connecting/reconnecting indicator */}
				{(isConnecting || connectionState === 'reconnecting') && (
					<div
						className="nfd-help-center-chat__connecting-bar"
						aria-live="polite"
						aria-busy="true"
					>
						<span className="nfd-help-center-chat__connecting-bar-text">
							{animatedConnectingText}
							<span className="nfd-help-center-chat__connecting-cursor" />
						</span>
					</div>
				)}
				{/* Failed: compact Retry UI */}
				{connectionState === 'failed' && (
					<div className="nfd-help-center-chat__retry-bar">
						<span className="nfd-help-center-chat__retry-text">
							{__("Couldn't connect.", 'wp-module-help-center')}
						</span>
						<button
							type="button"
							className="nfd-help-center-chat__retry-button"
							onClick={manualRetry}
						>
							{__('Retry', 'wp-module-help-center')}
						</button>
					</div>
				)}
			</div>

			{/* Messages Area */}
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
						showTopBorder={false}
					/>
				</div>
			</div>

			{/* Footer - Support banner (hidden when launched from tooltip); collapses when chat has messages */}
			{shouldShowFooterInChat(hasLaunchedFromTooltip) && (
				<div
					className={`nfd-help-center-chat__footer-wrapper${hasMessages ? ' nfd-help-center-chat__footer-wrapper--collapsed' : ''}`}
					aria-hidden={hasMessages}
				>
					<Footer />
				</div>
			)}
		</div>
	);
};

export default HelpCenterChatAI;
