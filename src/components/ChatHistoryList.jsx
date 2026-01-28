/**
 * Chat History List Component
 *
 * Displays previous chat sessions from localStorage, similar to the old help center history.
 * Shows the last 3 chat conversations with the first user message as the title.
 */

/* eslint-disable no-undef */
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { ReactComponent as HistoryIcon } from '../icons/reload.svg';

const STORAGE_KEY = 'nfd-ai-chat-help_center-history';
const MAX_HISTORY_ITEMS = 3;

/**
 * Extract conversation sessions from stored messages
 * Groups messages by conversation boundaries (gaps in time or new conversation starts)
 *
 * @param {Array} messages - Array of message objects with timestamps
 * @return {Array} Array of conversation arrays
 */
const extractConversations = (messages) => {
	if (!Array.isArray(messages) || messages.length === 0) {
		return [];
	}

	const conversations = [];
	let currentConversation = [];
	let lastTimestamp = null;

	// Group messages into conversations based on time gaps (> 5 minutes) or conversation boundaries
	messages.forEach((msg) => {
		const msgTimestamp = msg.timestamp
			? new Date(msg.timestamp).getTime()
			: Date.now();

		// If there's a significant time gap (> 5 minutes), start a new conversation
		if (lastTimestamp && msgTimestamp - lastTimestamp > 5 * 60 * 1000) {
			if (currentConversation.length > 0) {
				conversations.push([...currentConversation]);
				currentConversation = [];
			}
		}

		currentConversation.push(msg);
		lastTimestamp = msgTimestamp;
	});

	// Add the last conversation
	if (currentConversation.length > 0) {
		conversations.push(currentConversation);
	}

	// Return last N conversations, most recent first
	return conversations.slice(-MAX_HISTORY_ITEMS).reverse();
};

/**
 * Get the title for a conversation (first user message)
 *
 * @param {Array} conversation - Array of message objects
 * @return {string} Conversation title
 */
const getConversationTitle = (conversation) => {
	const firstUserMessage = conversation.find(
		(msg) => msg.role === 'user' || msg.type === 'user'
	);

	if (firstUserMessage && firstUserMessage.content) {
		const content = firstUserMessage.content;
		// Truncate if too long
		return content.length > 50 ? content.substring(0, 50) + '...' : content;
	}

	return __('Previous conversation', 'wp-module-help-center');
};

const ChatHistoryList = ({ onSelectConversation }) => {
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		try {
			const storedMessages = localStorage.getItem(STORAGE_KEY);
			if (storedMessages) {
				const parsedMessages = JSON.parse(storedMessages);
				if (
					Array.isArray(parsedMessages) &&
					parsedMessages.length > 0
				) {
					// Convert timestamp strings back to Date objects
					const messages = parsedMessages.map((msg) => ({
						...msg,
						timestamp: msg.timestamp
							? new Date(msg.timestamp)
							: new Date(),
					}));

					const extractedConversations =
						extractConversations(messages);
					setConversations(extractedConversations);
				}
			}
		} catch (err) {
			// eslint-disable-next-line no-console
			console.warn('[Chat History] Failed to load chat history:', err);
		}
	}, []);

	if (conversations.length === 0) {
		return null;
	}

	const handleHistoryClick = (conversation) => {
		// Restore the conversation by writing it to localStorage
		try {
			// Convert Date objects back to strings for localStorage
			const messagesToStore = conversation.map((msg) => ({
				...msg,
				timestamp:
					msg.timestamp instanceof Date
						? msg.timestamp.toISOString()
						: msg.timestamp,
			}));

			// Write conversation to localStorage
			localStorage.setItem(STORAGE_KEY, JSON.stringify(messagesToStore));

			// Set a flag to indicate we want to load history on next mount
			localStorage.setItem(
				'nfd-ai-chat-help_center-load-history',
				'true'
			);

			// Trigger restoration callback if provided
			if (onSelectConversation) {
				onSelectConversation(conversation);
			}

			// Reload page to restore conversation (hook will read from localStorage on mount)
			window.location.reload();
		} catch (err) {
			// eslint-disable-next-line no-console
			console.warn('[Chat History] Failed to restore conversation:', err);
		}
	};

	return (
		<div className="nfd-help-center-chat__history-list">
			{conversations.map((conversation, index) => {
				const title = getConversationTitle(conversation);
				return (
					<div
						key={index}
						className="nfd-help-center-chat__history-item"
						role="button"
						tabIndex={0}
						onClick={() => handleHistoryClick(conversation)}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault();
								handleHistoryClick(conversation);
							}
						}}
					>
						<HistoryIcon />
						<span>{title}</span>
					</div>
				);
			})}
		</div>
	);
};

export default ChatHistoryList;
