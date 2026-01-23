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
		<div
			className={containerClasses}
			data-brand={brandId || undefined}
			style={{
				flex: 1, // Fill flex parent instead of height: 100%
				minHeight: 0, // Allow flex parent to control height
				display: 'flex',
				flexDirection: 'column',
				overflow: 'hidden',
				width: '100%',
				position: 'relative', // Ensure proper positioning context
			}}
		>
			{/* Error Alert */}
			{error && (
				<div style={{ padding: '10px 20px', flexShrink: 0 }}>
					<ErrorAlert message={error} />
				</div>
			)}

			{/* Messages Area - flex container that grows to fill space */}
			{/* ChatMessages handles its own scrolling via overflow-y: auto */}
			{showWelcome ? (
				<div
					style={{
						flex: '1 1 0%',
						minHeight: 0,
						display: 'flex',
						flexDirection: 'column',
						overflow: 'hidden',
						padding: '20px',
						backgroundColor: '#fff',
					}}
				>
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
				<div
					style={{
						padding: '8px 20px',
						textAlign: 'right',
						flexShrink: 0,
						borderTop: '1px solid #e0e0e0',
						background: '#fff',
						position: 'relative',
						zIndex: 10,
					}}
				>
					<button
						onClick={handleClearChat}
						className="nfd-clear-chat-link"
						style={{
							background: 'none',
							border: 'none',
							padding: 0,
							fontSize: '12px',
							color: '#666',
							cursor: 'pointer',
							textDecoration: 'none',
							fontFamily: 'inherit',
						}}
						onMouseEnter={(e) => {
							e.target.style.textDecoration = 'underline';
							e.target.style.color = '#333';
						}}
						onMouseLeave={(e) => {
							e.target.style.textDecoration = 'none';
							e.target.style.color = '#666';
						}}
						aria-label={__('Clear chat', 'wp-module-help-center')}
					>
						{__('Clear Chat', 'wp-module-help-center')}
					</button>
				</div>
			)}

			{/* Input Area */}
			<div
				style={{
					padding: '20px',
					borderTop:
						messages.length > 0 ? 'none' : '1px solid #e0e0e0',
					background: '#fff',
					flexShrink: 0,
					position: 'relative',
					zIndex: 20,
					overflow: 'visible',
				}}
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
				<div
					style={{
						flexShrink: 0,
						borderTop: '1px solid #e0e0e0',
						background: '#fff',
						width: '100%',
					}}
				>
					<Footer />
				</div>
			)}

			{/* Connecting overlay - grey out when WebSocket is connecting */}
			{isConnecting && (
				<div
					style={{
						position: 'absolute',
						top: 0,
						right: 0,
						bottom: 0,
						left: 0,
						zIndex: 1000,
						background: 'rgba(255, 255, 255, 0.85)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
					aria-live="polite"
					aria-busy="true"
				>
					<span style={{ fontSize: '14px', color: '#666' }}>
						{__('Connecting…', 'wp-module-help-center')}
					</span>
				</div>
			)}
		</div>
	);
};

export default HelpCenterChat;
