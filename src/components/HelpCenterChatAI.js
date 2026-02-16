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
	removeConversationFromArchive,
	getChatHistoryStorageKeys,
	TYPING_STATUS,
} from '@newfold-labs/wp-module-ai-chat';
import Footer from './Footer'; // Support banner component
import { useHelpCenterChatContext } from '../context/HelpCenterChatContext';
import { getConnectionFailedFallbackMessage } from '../utils/connectionFailedFallbackMessage';
import { useEffect, useRef, useCallback, useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { useHelpVisibility } from '../hooks/useHelpVisibility';
import { useHelpCenterState } from '../hooks/useHelpCenterState';
import { shouldShowFooterInChat } from '../utils/footerUtils';

const HelpCenterChatAI = () => {
	const [isVisible] = useHelpVisibility();
	const { hasLaunchedFromTooltip } = useHelpCenterState();
	const { onClose } = useHelpCenterChatContext();
	const hasShownWelcomeRef = useRef(false);
	const [historyDropdownOpen, setHistoryDropdownOpen] = useState(false);
	const [historyRefreshTrigger, setHistoryRefreshTrigger] = useState(0);

	// "Latest conversation wins": seed active conversation from archive once on mount when history is empty.
	// When STORAGE_KEY is empty (e.g. after clearChatHistory) but archive has a recent conversation,
	// seed STORAGE_KEY from it so the hook picks it up. Runs once to avoid redundant localStorage work on every render.
	useEffect(() => {
		const keys = getChatHistoryStorageKeys('help_center');
		try {
			if (!localStorage.getItem(keys.history)) {
				const rawArchive = localStorage.getItem(keys.archive);
				if (rawArchive) {
					const archive = JSON.parse(rawArchive);
					const first = Array.isArray(archive) && archive[0];
					if (first?.messages?.length > 0 && first?.archivedAt) {
						const RECENT_MS = 30 * 60 * 1000; // 30 minutes
						const archivedAt = new Date(first.archivedAt).getTime();
						if (Date.now() - archivedAt <= RECENT_MS) {
							const msgs = first.messages.map((m) => ({
								...m,
								timestamp:
									m.timestamp instanceof Date
										? m.timestamp.toISOString()
										: m.timestamp,
							}));
							localStorage.setItem(
								keys.history,
								JSON.stringify(msgs)
							);
							if (
								first.conversationId !== null &&
								first.conversationId !== undefined
							) {
								localStorage.setItem(
									keys.conversationId,
									String(first.conversationId)
								);
							}
							if (
								first.sessionId !== null &&
								first.sessionId !== undefined
							) {
								localStorage.setItem(
									keys.sessionId,
									String(first.sessionId)
								);
							}
						}
					}
				}
			}
		} catch (err) {
			// Ignore storage errors
		}
	}, []);

	const {
		messages,
		sendMessage,
		sendSystemMessage,
		isTyping,
		status,
		currentResponse,
		conversationId,
		clearApprovalRequest,
		clearTyping,
		updateMessage,
		stopRequest,
		clearChatHistory,
		loadConversation,
		getSessionId,
		error,
		connectionState,
		isConnecting,
		manualRetry,
	} = useNfdAgentsWebSocket({
		// Use full URL when Help Center has restUrl (subpath installs); otherwise relative path.
		configEndpoint:
			typeof window !== 'undefined' && window.nfdHelpCenter?.restUrl
				? window.nfdHelpCenter.restUrl + '/nfd-agents/chat/v1/config'
				: '/nfd-agents/chat/v1/config',
		consumer: 'help_center',
		autoConnect: isVisible,
		consumerType: 'help_center',
		siteUrlOverride: 'https://emg.nyy.mybluehost.me/website_3eccfbf0',
		autoLoadHistory: true,
		getConnectionFailedFallbackMessage,
	});

	// When the customer types (first message or any new message), add/update this conversation in history (latest 3).
	useEffect(() => {
		if (messages.length > 0) {
			archiveConversation(
				messages,
				getSessionId(),
				conversationId,
				'help_center'
			);
		}
	}, [messages, getSessionId, conversationId]);

	// Archive conversation before page unload to ensure persistence across navigation and tab close.
	useEffect(() => {
		const handleBeforeUnload = () => {
			if (messages.length > 0) {
				archiveConversation(
					messages,
					getSessionId(),
					conversationId,
					'help_center'
				);
			}
		};
		window.addEventListener('beforeunload', handleBeforeUnload);
		return () =>
			window.removeEventListener('beforeunload', handleBeforeUnload);
	}, [messages, getSessionId, conversationId]);

	// When user selects a conversation from history, load it into the hook so view updates without remount
	const handleSelectConversation = useCallback(
		(conversation) => {
			const msgs = conversation.messages || conversation;
			loadConversation(
				msgs,
				conversation.conversationId ?? null,
				conversation.sessionId ?? null
			);
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
	 * Handle new chat button click - starts fresh; current conversation stays in history
	 */
	const handleNewChat = useCallback(() => {
		hasShownWelcomeRef.current = false;
		if (messages.length > 0) {
			archiveConversation(
				messages,
				getSessionId(),
				conversationId,
				'help_center'
			);
		}
		clearChatHistory();
		setHistoryRefreshTrigger((t) => t + 1);
	}, [messages, getSessionId, conversationId, clearChatHistory]);

	/**
	 * Handle clear chat button - remove current conversation from history and clear view
	 */
	const handleClearChat = useCallback(() => {
		hasShownWelcomeRef.current = false;
		removeConversationFromArchive(
			conversationId,
			getSessionId(),
			'help_center'
		);
		clearChatHistory();
		setHistoryRefreshTrigger((t) => t + 1);
	}, [conversationId, getSessionId, clearChatHistory]);

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

	const containerClasses = 'nfd-help-center-chat nfd-ai-chat-container';
	const hasMessages = messages.length > 0;
	// Only show connecting/fallback and disable input for connection state once user has engaged (sent a message or chat has content)
	const hasUserEngaged = messages.length > 0;

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
						'I can help you create and edit posts and pages, update content, and manage your WordPress site.',
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
					isLoading={hasUserEngaged && (isTyping || isConnecting)}
					status={isConnecting ? TYPING_STATUS.WS_CONNECTING : status}
					error={error}
					onRetry={
						hasUserEngaged && connectionState === 'failed' ? manualRetry : undefined
					}
					connectionFailed={hasUserEngaged && connectionState === 'failed'}
					isConnectingOrReconnecting={
						hasUserEngaged &&
						(connectionState === 'connecting' || connectionState === 'reconnecting')
					}
					onApprove={handleApproval}
					onReject={handleRejection}
					onSendMessage={sendMessage}
					onSendSystemMessage={sendSystemMessage}
					conversationId={conversationId}
					onClearTyping={clearTyping}
					brandId={null}
				/>
			</div>
		);
	}

	return (
		<div className={containerClasses}>
			{/* Header: white container, two-tone pill, New chat (+) and Close (×) */}
			<div className="nfd-help-center-chat__header-wrapper">
				<ChatHeader
					title={__('Blu Chat', 'wp-module-help-center')}
					onNewChat={handleNewChat}
					newChatDisabled={
						showWelcome ||
						(hasUserEngaged &&
							(connectionState === 'failed' ||
								connectionState === 'connecting' ||
								connectionState === 'reconnecting'))
					}
					onClose={onClose}
					extraActions={
						<ChatHistoryDropdown
							consumer="help_center"
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
			</div>

			{/* Messages Area */}
			{messagesAreaContent}

			{/* Input Area */}
			<div className="nfd-help-center-chat__input-area">
				<div className="nfd-help-center-chat__input-wrapper">
					<ChatInput
						onSendMessage={sendMessage}
						onStopRequest={stopRequest}
						showStopButton={isTyping}
						disabled={
							isTyping ||
							(hasUserEngaged &&
								(connectionState === 'failed' ||
									connectionState === 'connecting' ||
									connectionState === 'reconnecting'))
						}
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
