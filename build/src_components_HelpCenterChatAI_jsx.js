"use strict";
(globalThis["webpackChunk_newfold_labs_wp_module_help_center"] = globalThis["webpackChunk_newfold_labs_wp_module_help_center"] || []).push([["src_components_HelpCenterChatAI_jsx"],{

/***/ "../wp-module-ai-chat/src/components/chat/ChatInput.jsx":
/*!**************************************************************!*\
  !*** ../wp-module-ai-chat/src/components/chat/ChatInput.jsx ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "../wp-module-ai-chat/node_modules/lucide-react/dist/esm/icons/circle-stop.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "../wp-module-ai-chat/node_modules/lucide-react/dist/esm/icons/arrow-up.js");
/* harmony import */ var _config_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../config/constants */ "../wp-module-ai-chat/src/config/constants.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);
/**
 * WordPress dependencies
 */




/**
 * External dependencies
 */



/**
 * ChatInput Component
 *
 * Context-agnostic chat input field. Accepts optional contextComponent prop
 * for consumers to inject their own context indicators (e.g., selected block).
 *
 * @param {Object}      props                  - The component props.
 * @param {Function}    props.onSendMessage    - Function to call when message is sent.
 * @param {Function}    props.onStopRequest    - Function to call when stop button is clicked.
 * @param {boolean}     props.disabled         - Whether the input is disabled.
 * @param {string}      props.placeholder      - Input placeholder text.
 * @param {JSX.Element} props.contextComponent - Optional context component to render.
 * @return {JSX.Element} The ChatInput component.
 */

const ChatInput = ({
  onSendMessage,
  onStopRequest,
  disabled = false,
  placeholder,
  contextComponent = null
}) => {
  const [message, setMessage] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)("");
  const [isStopping, setIsStopping] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const textareaRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const stopButtonRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const defaultPlaceholder = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("How can I help you today?", "wp-module-ai-chat");

  // Auto-resize textarea as user types
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      const newHeight = Math.min(scrollHeight, _config_constants__WEBPACK_IMPORTED_MODULE_5__.INPUT.MAX_HEIGHT);
      textareaRef.current.style.height = `${newHeight}px`;

      // Only show scrollbar when content actually overflows
      // This prevents the disabled scrollbar from appearing when empty
      if (scrollHeight > _config_constants__WEBPACK_IMPORTED_MODULE_5__.INPUT.MAX_HEIGHT) {
        textareaRef.current.style.overflowY = "auto";
      } else {
        textareaRef.current.style.overflowY = "hidden";
      }
    }
  }, [message]);

  // Focus textarea when it becomes enabled again
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!disabled && textareaRef.current) {
      setTimeout(() => {
        textareaRef.current.focus();
      }, _config_constants__WEBPACK_IMPORTED_MODULE_5__.INPUT.FOCUS_DELAY);
    }
  }, [disabled]);
  const handleSubmit = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.overflowY = "hidden";
        textareaRef.current.focus();
      }
    }
  };
  const handleKeyDown = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  const handleStopRequest = () => {
    // Prevent multiple rapid clicks (debounce)
    if (isStopping) {
      return;
    }

    // Immediately disable button to prevent rage clicks
    setIsStopping(true);

    // Call the stop handler
    if (onStopRequest) {
      onStopRequest();
    }

    // Re-enable after a short delay to allow for re-connection if needed
    // This prevents the button from being permanently disabled
    setTimeout(() => {
      setIsStopping(false);
    }, _config_constants__WEBPACK_IMPORTED_MODULE_5__.INPUT.STOP_DEBOUNCE);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
    className: "nfd-ai-chat-input",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      className: "nfd-ai-chat-input__container",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("textarea", {
        name: "nfd-ai-chat-input",
        ref: textareaRef,
        value: message,
        onChange: e => setMessage(e.target.value),
        onKeyDown: handleKeyDown,
        placeholder: placeholder || defaultPlaceholder,
        className: "nfd-ai-chat-input__textarea",
        rows: 1,
        disabled: disabled
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "nfd-ai-chat-input__actions",
        children: [contextComponent, disabled ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
          ref: stopButtonRef,
          icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
            width: 16,
            height: 16
          }),
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Stop generating", "wp-module-ai-chat"),
          onClick: handleStopRequest,
          className: "nfd-ai-chat-input__stop",
          disabled: isStopping,
          "aria-busy": isStopping
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
          icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
            width: 16,
            height: 16
          }),
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Send message", "wp-module-ai-chat"),
          onClick: handleSubmit,
          className: "nfd-ai-chat-input__submit",
          disabled: !message.trim()
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      className: "nfd-ai-chat-input__disclaimer",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("AI-generated content is not guaranteed for accuracy.", "wp-module-ai-chat")
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChatInput);

/***/ }),

/***/ "../wp-module-ai-chat/src/components/chat/ChatMessage.jsx":
/*!****************************************************************!*\
  !*** ../wp-module-ai-chat/src/components/chat/ChatMessage.jsx ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_sanitizeHtml__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/sanitizeHtml */ "../wp-module-ai-chat/src/utils/sanitizeHtml.js");
/* harmony import */ var _utils_markdownParser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/markdownParser */ "../wp-module-ai-chat/src/utils/markdownParser.js");
/* harmony import */ var _ui_ToolExecutionList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ui/ToolExecutionList */ "../wp-module-ai-chat/src/components/ui/ToolExecutionList.jsx");
/* harmony import */ var _ui_InlineApproval__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ui/InlineApproval */ "../wp-module-ai-chat/src/components/ui/InlineApproval.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */





/**
 * ChatMessage Component
 *
 * Displays a single message in the chat with appropriate styling.
 * Supports HTML and Markdown rendering for assistant messages.
 *
 * @param {Object} props                    - The component props.
 * @param {string} props.message            - The message content to display.
 * @param {string} [props.type="assistant"] - The message type ("user", "assistant", or "approval_request").
 * @param {Array}  [props.executedTools=[]] - List of executed tools to show inline.
 * @param {Object} [props.approvalRequest]  - Approval request data for approval_request type.
 * @param {Function} [props.onApprove]      - Callback when user approves.
 * @param {Function} [props.onReject]      - Callback when user rejects.
 * @param {Function} [props.onExecuteTool] - Function to execute tool via MCP.
 * @param {Function} [props.onSendMessage] - Function to send message back to agent (shows in UI).
 * @param {Function} [props.onSendSystemMessage] - Function to send message to agent (hidden from UI).
 * @param {string} [props.conversationId]  - Conversation ID for message correlation.
 * @param {Function} [props.onClearTyping] - Callback to clear typing indicator.
 * @param {string} [props.brandId]         - Brand identifier for styling.
 * @param {Array}  [props.toolResults=[]]   - Results from tool executions.
 * @return {JSX.Element} The ChatMessage component.
 */

const ChatMessage = ({
  message,
  type = "assistant",
  executedTools = [],
  approvalRequest,
  onApprove,
  onReject,
  onExecuteTool,
  onSendMessage,
  onSendSystemMessage,
  conversationId,
  onClearTyping,
  brandId,
  toolResults = []
}) => {
  // If this is an approval request message, render inline approval
  if (type === 'approval_request') {
    if (approvalRequest) {
      // Render approval component
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: `nfd-ai-chat-message nfd-ai-chat-message--approval`,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ui_InlineApproval__WEBPACK_IMPORTED_MODULE_4__["default"], {
          approvalRequest: approvalRequest,
          onApprove: onApprove,
          onReject: onReject,
          onExecuteTool: onExecuteTool,
          onSendMessage: onSendMessage,
          onSendSystemMessage: onSendSystemMessage,
          conversationId: conversationId,
          onClearTyping: onClearTyping,
          brandId: brandId
        })
      });
    }
    // Approval was cancelled/rejected, render as regular message
    // Fall through to regular message rendering below
    // The message content should already be updated to show cancellation
  }
  const isUser = type === "user";
  const {
    content,
    isRichContent
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (!message) {
      return {
        content: "",
        isRichContent: false
      };
    }
    if (isUser) {
      return {
        content: message,
        isRichContent: false
      };
    }
    if ((0,_utils_sanitizeHtml__WEBPACK_IMPORTED_MODULE_1__.containsHtml)(message)) {
      return {
        content: (0,_utils_sanitizeHtml__WEBPACK_IMPORTED_MODULE_1__.sanitizeHtml)(message),
        isRichContent: true
      };
    }
    if ((0,_utils_markdownParser__WEBPACK_IMPORTED_MODULE_2__.containsMarkdown)(message)) {
      const parsed = (0,_utils_markdownParser__WEBPACK_IMPORTED_MODULE_2__.parseMarkdown)(message);
      return {
        content: (0,_utils_sanitizeHtml__WEBPACK_IMPORTED_MODULE_1__.sanitizeHtml)(parsed),
        isRichContent: true
      };
    }
    return {
      content: message,
      isRichContent: false
    };
  }, [message, isUser]);

  // Don't render if there's no content and no tools.
  if (!content && (!executedTools || executedTools.length === 0)) {
    return null;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    className: `nfd-ai-chat-message nfd-ai-chat-message--${type}`,
    children: [content && (isRichContent ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "nfd-ai-chat-message__content nfd-ai-chat-message__content--rich",
      dangerouslySetInnerHTML: {
        __html: content
      }
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "nfd-ai-chat-message__content",
      children: content
    })), executedTools && executedTools.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ui_ToolExecutionList__WEBPACK_IMPORTED_MODULE_3__["default"], {
      executedTools: executedTools,
      toolResults: toolResults
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChatMessage);

/***/ }),

/***/ "../wp-module-ai-chat/src/components/chat/ChatMessages.jsx":
/*!*****************************************************************!*\
  !*** ../wp-module-ai-chat/src/components/chat/ChatMessages.jsx ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ui_ErrorAlert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui/ErrorAlert */ "../wp-module-ai-chat/src/components/ui/ErrorAlert.jsx");
/* harmony import */ var _ui_TypingIndicator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/TypingIndicator */ "../wp-module-ai-chat/src/components/ui/TypingIndicator.jsx");
/* harmony import */ var _ChatMessage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ChatMessage */ "../wp-module-ai-chat/src/components/chat/ChatMessage.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */




/**
 * ChatMessages Component
 *
 * Scrollable container for all chat messages.
 * Auto-scrolls to bottom when new messages arrive.
 *
 * @param {Object}  props                - The component props.
 * @param {Array}   props.messages       - The messages to display.
 * @param {boolean} props.isLoading      - Whether the AI is generating a response.
 * @param {string}  props.error          - Error message to display (optional).
 * @param {string}  props.status         - The current status.
 * @param {Object}  props.activeToolCall - The currently executing tool call (optional).
 * @param {string}  props.toolProgress   - Real-time progress message (optional).
 * @param {Array}   props.executedTools  - List of completed tool executions (optional).
 * @param {Array}   props.pendingTools   - List of pending tools to execute (optional).
 * @param {Function} [props.onApprove]   - Callback when user approves action.
 * @param {Function} [props.onReject]   - Callback when user rejects action.
 * @param {Function} [props.onExecuteTool] - Function to execute tool via MCP.
 * @param {Function} [props.onSendMessage] - Function to send message back to agent (shows in UI).
 * @param {Function} [props.onSendSystemMessage] - Function to send message to agent (hidden from UI).
 * @param {string} [props.conversationId] - Conversation ID for message correlation.
 * @param {Function} [props.onClearTyping] - Callback to clear typing indicator.
 * @param {string} [props.brandId]       - Brand identifier for styling.
 * @return {JSX.Element} The ChatMessages component.
 */

const ChatMessages = ({
  messages = [],
  isLoading = false,
  error = null,
  status = null,
  activeToolCall = null,
  toolProgress = null,
  executedTools = [],
  pendingTools = [],
  onApprove,
  onReject,
  onExecuteTool,
  onSendMessage,
  onSendSystemMessage,
  conversationId,
  onClearTyping,
  brandId
}) => {
  const messagesEndRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages, isLoading, toolProgress]);
  const hasActiveToolExecution = activeToolCall || executedTools.length > 0 || pendingTools.length > 0;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    className: "nfd-ai-chat-messages",
    children: [messages.length > 0 && messages.map((msg, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_ChatMessage__WEBPACK_IMPORTED_MODULE_3__["default"], {
      message: msg.content,
      type: msg.type,
      executedTools: msg.executedTools,
      approvalRequest: msg.approvalRequest,
      onApprove: onApprove,
      onReject: onReject,
      onExecuteTool: onExecuteTool,
      onSendMessage: onSendMessage,
      onSendSystemMessage: onSendSystemMessage,
      conversationId: conversationId,
      onClearTyping: onClearTyping,
      brandId: brandId,
      toolResults: msg.toolResults
    }, msg.id || index)), error && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_ui_ErrorAlert__WEBPACK_IMPORTED_MODULE_1__["default"], {
      message: error
    }), isLoading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_ui_TypingIndicator__WEBPACK_IMPORTED_MODULE_2__["default"], {
      status: status,
      activeToolCall: activeToolCall,
      toolProgress: toolProgress,
      executedTools: hasActiveToolExecution ? executedTools : [],
      pendingTools: pendingTools
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      ref: messagesEndRef
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChatMessages);

/***/ }),

/***/ "../wp-module-ai-chat/src/components/chat/WelcomeScreen.jsx":
/*!******************************************************************!*\
  !*** ../wp-module-ai-chat/src/components/chat/WelcomeScreen.jsx ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ui_BluBetaHeading__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui/BluBetaHeading */ "../wp-module-ai-chat/src/components/ui/BluBetaHeading.jsx");
/* harmony import */ var _ui_SuggestionButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/SuggestionButton */ "../wp-module-ai-chat/src/components/ui/SuggestionButton.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */



/**
 * WelcomeScreen Component
 *
 * Displays the welcome screen with AI avatar, introduction message, and suggestion tags.
 *
 * @param {Object}   props                 - The component props.
 * @param {Function} props.onSendMessage   - Function to call when a suggestion is clicked.
 * @param {string}   props.title           - Custom welcome title (optional).
 * @param {string}   props.subtitle        - Custom welcome subtitle (optional).
 * @param {Array}    props.suggestions     - Custom suggestions array (optional).
 * @param {boolean}  props.showSuggestions - Whether to show suggestions (default: false).
 * @return {JSX.Element} The WelcomeScreen component.
 */

const WelcomeScreen = ({
  onSendMessage,
  title,
  subtitle,
  suggestions = [],
  showSuggestions = false
}) => {
  const defaultTitle = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Hi, I'm your AI assistant.", "wp-module-ai-chat");
  const defaultSubtitle = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("How can I help you today?", "wp-module-ai-chat");
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: "nfd-ai-chat-welcome",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "nfd-ai-chat-welcome__content",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "nfd-ai-chat-welcome__heading",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_ui_BluBetaHeading__WEBPACK_IMPORTED_MODULE_1__["default"], {})
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "nfd-ai-chat-welcome__message",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "nfd-ai-chat-welcome__title",
          children: title || defaultTitle
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "nfd-ai-chat-welcome__subtitle",
          children: subtitle || defaultSubtitle
        })]
      })]
    }), showSuggestions && suggestions.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: "nfd-ai-chat-suggestions",
      children: suggestions.map((suggestion, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_ui_SuggestionButton__WEBPACK_IMPORTED_MODULE_2__["default"], {
        icon: suggestion.icon,
        text: suggestion.text,
        onClick: () => onSendMessage(suggestion.action || suggestion.text)
      }, index))
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WelcomeScreen);

/***/ }),

/***/ "../wp-module-ai-chat/src/components/ui/AILogo.jsx":
/*!*********************************************************!*\
  !*** ../wp-module-ai-chat/src/components/ui/AILogo.jsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _svg_blu_logo_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../svg/blu-logo.svg */ "../wp-module-ai-chat/src/svg/blu-logo.svg");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * Internal dependencies
 */


/**
 * AILogo Component
 *
 * A reusable logo component for the AI assistant with purple gradient background
 * and BLU beta logo icon.
 *
 * @param {Object} props        - The component props.
 * @param {number} props.width  - The width of the logo (default: 24).
 * @param {number} props.height - The height of the logo (default: 24).
 * @return {JSX.Element} The AILogo component.
 */

const AILogo = ({
  width = 24,
  height = 24
}) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
  className: "nfd-ai-chat-avatar",
  style: {
    width,
    height
  },
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_svg_blu_logo_svg__WEBPACK_IMPORTED_MODULE_0__.ReactComponent, {
    width: width * 0.625,
    height: height * 0.625
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AILogo);

/***/ }),

/***/ "../wp-module-ai-chat/src/components/ui/ApprovalDialog.jsx":
/*!*****************************************************************!*\
  !*** ../wp-module-ai-chat/src/components/ui/ApprovalDialog.jsx ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/constants */ "../wp-module-ai-chat/src/config/constants.js");
/* harmony import */ var _utils_messageUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/messageUtils */ "../wp-module-ai-chat/src/utils/messageUtils.js");
/* harmony import */ var _styles_approval_dialog_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../styles/_approval-dialog.scss */ "../wp-module-ai-chat/src/styles/_approval-dialog.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
/**
 * Approval Dialog Component
 * 
 * Displays approval dialog for tool execution requests from the agent.
 * Based on ActionConfirmationModal from agents-prototype.
 */







/**
 * ApprovalDialog Component
 *
 * @param {Object} props Component props
 * @param {boolean} props.isOpen Whether dialog is open
 * @param {Object} props.approvalRequest Approval request data
 * @param {Function} props.onApprove Callback when user approves
 * @param {Function} props.onReject Callback when user rejects
 * @param {Function} props.onExecuteTool Function to execute tool via MCP
 * @param {Function} props.onSendMessage Function to send message back to agent (shows in UI)
 * @param {Function} props.onSendSystemMessage Function to send message to agent (hidden from UI)
 * @param {string} props.conversationId Conversation ID for message correlation
 * @param {Function} props.onClearTyping Callback to clear typing indicator
 */

const ApprovalDialog = ({
  isOpen,
  approvalRequest,
  onApprove,
  onReject,
  onExecuteTool,
  onSendMessage,
  onSendSystemMessage,
  conversationId,
  onClearTyping
}) => {
  const [isExecuting, setIsExecuting] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [error, setError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const handleReject = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)((reason = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Action rejected by user.', 'wp-module-ai-chat')) => {
    // Send rejection to agent via system message (hidden from UI)
    if (onSendSystemMessage) {
      onSendSystemMessage(`[Tool Execution Cancelled]\n${reason}`);
    }
    onReject();
  }, [onReject, onSendSystemMessage]);
  const handleApprove = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    const name = approvalRequest?.tool_name;
    if (!onExecuteTool || !name) {
      onApprove();
      return;
    }
    setIsExecuting(true);
    setError(null);
    try {
      let parsedArguments = approvalRequest?.tool_arguments || {};
      if (typeof parsedArguments === 'string') {
        try {
          parsedArguments = JSON.parse(parsedArguments);
        } catch {
          parsedArguments = {};
        }
      }
      const result = await onExecuteTool(name, parsedArguments);
      if (onClearTyping) {
        onClearTyping();
      }
      if (onSendSystemMessage) {
        const summary = (0,_utils_messageUtils__WEBPACK_IMPORTED_MODULE_3__.generateSuccessMessage)(name, result);
        let details = '';
        try {
          const parsed = typeof result === 'string' ? JSON.parse(result) : result;
          if (parsed) {
            const title = parsed.title?.rendered || parsed.title || parsed.name || '';
            const id = parsed.id || '';
            const link = parsed.link || parsed.guid?.rendered || '';
            const status = parsed.status || '';
            if (title || id || link) {
              details = '\nDetails: ';
              if (title) details += `Title: "${title}"`;
              if (id) details += `${title ? ', ' : ''}ID: ${id}`;
              if (status) details += `, Status: ${status}`;
              if (link) details += `\nLink: ${link}`;
            }
          }
        } catch {
          // If parsing fails, just use the summary
        }
        const agentMessage = `[Tool Execution Result]\n${summary}${details}`;
        onSendSystemMessage(agentMessage);
      }
      onApprove(result);
    } catch (err) {
      const errorMessage = err.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Tool execution failed', 'wp-module-ai-chat');
      setError(errorMessage);
      if (onClearTyping) {
        onClearTyping();
      }
      if (onSendSystemMessage) {
        onSendSystemMessage(`[Tool Execution Error]\nFailed to execute ${name}: ${errorMessage}`);
      }
    } finally {
      setIsExecuting(false);
    }
  }, [approvalRequest, onApprove, onExecuteTool, onSendSystemMessage, onClearTyping]);

  // Handle approval timeout
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isOpen && approvalRequest) {
      const timeout = setTimeout(() => {
        handleReject((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Approval request timed out.', 'wp-module-ai-chat'));
      }, _config_constants__WEBPACK_IMPORTED_MODULE_2__.APPROVAL.TIMEOUT);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, approvalRequest, handleReject]);
  if (!isOpen || !approvalRequest) {
    return null;
  }
  const {
    tool_name,
    tool_arguments,
    action
  } = approvalRequest;
  const getActionDisplayName = actionType => {
    if (actionType) {
      return actionType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
    if (tool_name) {
      // Format tool name: "nfd-agents/posts-create", "newfold-agents/posts-create", or "blu/posts-create" -> "Create Post"
      return tool_name.split('/').pop().replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Execute Action', 'wp-module-ai-chat');
  };
  const formatToolArguments = args => {
    if (!args || typeof args !== 'object') {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No arguments provided', 'wp-module-ai-chat');
    }
    return Object.entries(args).map(([key, value]) => {
      // Mask sensitive data
      if (key.toLowerCase().includes('password') || key.toLowerCase().includes('token')) {
        return `${key}: ••••••••`;
      }
      // Format value for display
      const displayValue = typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value);
      return `${key}: ${displayValue}`;
    }).join('\n');
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
    className: "nfd-approval-dialog-overlay",
    onClick: e => {
      // Close on overlay click
      if (e.target === e.currentTarget) {
        handleReject();
      }
    },
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      className: "nfd-approval-dialog",
      onClick: e => e.stopPropagation(),
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "nfd-approval-dialog__header",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("h2", {
          className: "nfd-approval-dialog__title",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Please Confirm', 'wp-module-ai-chat')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
          className: "nfd-approval-dialog__description",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("You'd like to %s", 'wp-module-ai-chat'), getActionDisplayName(action || tool_name).toLowerCase())
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "nfd-approval-dialog__details",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("h3", {
          className: "nfd-approval-dialog__details-title",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Action Details:', 'wp-module-ai-chat')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "nfd-approval-dialog__details-content",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
            className: "nfd-approval-dialog__tool-info",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("strong", {
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Tool:', 'wp-module-ai-chat')
            }), " ", tool_name || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('N/A', 'wp-module-ai-chat')]
          }), tool_arguments && Object.keys(tool_arguments).length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
            className: "nfd-approval-dialog__arguments",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("strong", {
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Arguments:', 'wp-module-ai-chat')
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("pre", {
              className: "nfd-approval-dialog__arguments-pre",
              children: formatToolArguments(tool_arguments)
            })]
          })]
        })]
      }), error && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "nfd-approval-dialog__error",
        children: error
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "nfd-approval-dialog__actions",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("button", {
          type: "button",
          onClick: () => handleReject(),
          disabled: isExecuting,
          className: "nfd-approval-dialog__button nfd-approval-dialog__button--cancel",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Cancel', 'wp-module-ai-chat')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("button", {
          type: "button",
          onClick: handleApprove,
          disabled: isExecuting,
          className: "nfd-approval-dialog__button nfd-approval-dialog__button--confirm",
          children: isExecuting ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Executing...', 'wp-module-ai-chat') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Confirm', 'wp-module-ai-chat')
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ApprovalDialog);

/***/ }),

/***/ "../wp-module-ai-chat/src/components/ui/BluBetaHeading.jsx":
/*!*****************************************************************!*\
  !*** ../wp-module-ai-chat/src/components/ui/BluBetaHeading.jsx ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/icons */ "../wp-module-ai-chat/node_modules/@wordpress/icons/build-module/library/comment.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
/**
 * WordPress dependencies
 */




/**
 * BluBetaHeading Component
 *
 * A heading component that displays "BLU" with a chat bubble icon and "BETA" badge.
 * Styled similar to the pill button but as a heading element.
 *
 * @return {JSX.Element} The BluBetaHeading component.
 */

const BluBetaHeading = () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
  className: "nfd-ai-chat-blu-beta-heading",
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: "nfd-ai-chat-blu-beta-heading__main",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
      icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__["default"],
      size: 16,
      className: "nfd-ai-chat-blu-beta-heading__icon"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
      className: "nfd-ai-chat-blu-beta-heading__text",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("BLU", "wp-module-ai-chat")
    })]
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
    className: "nfd-ai-chat-blu-beta-heading__badge",
    children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("BETA", "wp-module-ai-chat")
  })]
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BluBetaHeading);

/***/ }),

/***/ "../wp-module-ai-chat/src/components/ui/ErrorAlert.jsx":
/*!*************************************************************!*\
  !*** ../wp-module-ai-chat/src/components/ui/ErrorAlert.jsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lucide-react */ "../wp-module-ai-chat/node_modules/lucide-react/dist/esm/icons/circle-x.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * External dependencies
 */


/**
 * ErrorAlert Component
 *
 * A reusable error alert component that displays error messages
 * in a red box with an exclamation mark icon.
 *
 * @param {Object} props           - The component props.
 * @param {string} props.message   - The error message to display.
 * @param {string} props.className - Additional CSS classes (optional).
 * @return {JSX.Element} The ErrorAlert component.
 */

const ErrorAlert = ({
  message,
  className = ""
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: `nfd-ai-chat-error-alert ${className}`,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "nfd-ai-chat-error-alert__icon",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_0__["default"], {
        width: 16,
        height: 16
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "nfd-ai-chat-error-alert__content",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "nfd-ai-chat-error-alert__message",
        children: message
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ErrorAlert);

/***/ }),

/***/ "../wp-module-ai-chat/src/components/ui/InlineApproval.jsx":
/*!*****************************************************************!*\
  !*** ../wp-module-ai-chat/src/components/ui/InlineApproval.jsx ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "../wp-module-ai-chat/node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _config_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/constants */ "../wp-module-ai-chat/src/config/constants.js");
/* harmony import */ var _utils_messageUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/messageUtils */ "../wp-module-ai-chat/src/utils/messageUtils.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
/**
 * WordPress dependencies
 */






/**
 * InlineApproval Component
 *
 * Displays approval request inline within chat messages (not as modal).
 * Similar to Cursor's approval UI style with excellent UX.
 *
 * Features:
 * - Accessible (keyboard navigation, ARIA labels)
 * - Loading states with visual feedback
 * - Error handling with user-friendly messages
 * - Smooth animations and transitions
 * - Brand-aware styling
 *
 * @param {Object} props Component props
 * @param {Object} props.approvalRequest Approval request data
 * @param {Function} props.onApprove Callback when user approves
 * @param {Function} props.onReject Callback when user rejects
 * @param {Function} props.onExecuteTool Function to execute tool via MCP
 * @param {Function} props.onSendMessage Function to send message back to agent (shows in UI)
 * @param {Function} props.onSendSystemMessage Function to send message to agent (hidden from UI)
 * @param {string} props.conversationId Conversation ID for message correlation
 * @param {Function} props.onClearTyping Callback to clear typing indicator
 * @param {string} props.brandId Brand identifier for styling
 */

const InlineApproval = ({
  approvalRequest,
  onApprove,
  onReject,
  onExecuteTool,
  onSendMessage,
  onSendSystemMessage,
  conversationId,
  onClearTyping,
  brandId
}) => {
  const [isExecuting, setIsExecuting] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [error, setError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);

  // Format tool name for display
  const getActionDisplayName = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(toolName => {
    if (!toolName) return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Execute Action', 'wp-module-ai-chat');
    return toolName.split('/').pop().replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }, []);

  // Format arguments for display
  const formatToolArguments = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(args => {
    if (!args || typeof args !== 'object' || Object.keys(args).length === 0) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No arguments provided', 'wp-module-ai-chat');
    }
    return Object.entries(args).map(([key, value]) => {
      // Mask sensitive data
      if (key.toLowerCase().includes('password') || key.toLowerCase().includes('token')) {
        return `${key}: ••••••••`;
      }
      const displayValue = typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value);
      return `${key}: ${displayValue}`;
    }).join('\n');
  }, []);
  const handleApprove = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    if (!onExecuteTool || !approvalRequest?.tool_name) {
      // If no tool execution function, just call onApprove
      if (onApprove) {
        onApprove();
      }
      return;
    }
    setIsExecuting(true);
    setError(null);
    try {
      // Parse tool_arguments if it's a JSON string, otherwise use as-is
      let parsedArguments = approvalRequest.tool_arguments || {};
      if (typeof parsedArguments === 'string') {
        try {
          parsedArguments = JSON.parse(parsedArguments);
        } catch {
          parsedArguments = {};
        }
      }

      // Execute tool via MCP client
      const result = await onExecuteTool(approvalRequest.tool_name, parsedArguments, approvalRequest.site_url);

      // Clear typing indicator before sending result message
      if (onClearTyping) {
        onClearTyping();
      }

      // Send result to agent via system message (hidden from UI)
      // The agent will process this and respond naturally
      if (onSendSystemMessage) {
        const summary = (0,_utils_messageUtils__WEBPACK_IMPORTED_MODULE_4__.generateSuccessMessage)(approvalRequest.tool_name, result);

        // Extract key details from result for agent context
        let details = '';
        try {
          const parsed = typeof result === 'string' ? JSON.parse(result) : result;
          if (parsed) {
            const title = parsed.title?.rendered || parsed.title || parsed.name || '';
            const id = parsed.id || '';
            const link = parsed.link || parsed.guid?.rendered || '';
            const status = parsed.status || '';
            if (title || id || link) {
              details = '\nDetails: ';
              if (title) details += `Title: "${title}"`;
              if (id) details += `${title ? ', ' : ''}ID: ${id}`;
              if (status) details += `, Status: ${status}`;
              if (link) details += `\nLink: ${link}`;
            }
          }
        } catch (e) {
          // If parsing fails, just use the summary
        }

        // Send structured message to agent (hidden from UI)
        const agentMessage = `[Tool Execution Result]\n${summary}${details}`;
        onSendSystemMessage(agentMessage);
      }
      if (onApprove) {
        onApprove(result);
      }
    } catch (err) {
      const errorMessage = err.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Tool execution failed', 'wp-module-ai-chat');
      setError(errorMessage);

      // Clear typing indicator before sending error message
      if (onClearTyping) {
        onClearTyping();
      }

      // Send error to agent via system message (hidden from UI)
      if (onSendSystemMessage) {
        onSendSystemMessage(`[Tool Execution Error]\nFailed to execute ${approvalRequest.tool_name}: ${errorMessage}`);
      }

      // Don't call onApprove on error - let user see the error
    } finally {
      setIsExecuting(false);
    }
  }, [approvalRequest, onApprove, onExecuteTool, onSendSystemMessage, onClearTyping]);
  const handleReject = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)((reason = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Action rejected by user.', 'wp-module-ai-chat')) => {
    // Send rejection to agent via system message (hidden from UI)
    if (onSendSystemMessage) {
      onSendSystemMessage(`[Tool Execution Cancelled]\n${reason}`);
    }
    if (onReject) {
      onReject();
    }
  }, [onReject, onSendSystemMessage]);

  // Handle approval timeout
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (approvalRequest) {
      const timeout = setTimeout(() => {
        handleReject((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Approval request timed out.', 'wp-module-ai-chat'));
      }, _config_constants__WEBPACK_IMPORTED_MODULE_3__.APPROVAL.TIMEOUT);
      return () => clearTimeout(timeout);
    }
  }, [approvalRequest, handleReject]);

  // Handle keyboard navigation
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape' && !isExecuting) {
        handleReject();
      } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && !isExecuting) {
        handleApprove();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExecuting, handleReject, handleApprove]);
  if (!approvalRequest) {
    return null;
  }
  const {
    tool_name,
    tool_arguments
  } = approvalRequest;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
    className: `nfd-inline-approval nfd-brand-${brandId || 'default'}`,
    role: "region",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Action approval required', 'wp-module-ai-chat'),
    "aria-live": "polite",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      className: "nfd-inline-approval__card",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "nfd-inline-approval__header",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
          className: "nfd-inline-approval__icon",
          role: "img",
          "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Warning', 'wp-module-ai-chat'),
          children: "\u26A0\uFE0F"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("h3", {
          className: "nfd-inline-approval__title",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Action Required', 'wp-module-ai-chat')
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "nfd-inline-approval__content",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("p", {
          className: "nfd-inline-approval__description",
          children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Approve execution of:', 'wp-module-ai-chat'), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("strong", {
            children: getActionDisplayName(tool_name)
          })]
        }), tool_arguments && Object.keys(tool_arguments).length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "nfd-inline-approval__arguments",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("label", {
            className: "nfd-inline-approval__arguments-label",
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Arguments:', 'wp-module-ai-chat')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("pre", {
            className: "nfd-inline-approval__arguments-code",
            role: "textbox",
            "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Tool arguments', 'wp-module-ai-chat'),
            children: formatToolArguments(tool_arguments)
          })]
        }), error && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "nfd-inline-approval__error",
          role: "alert",
          "aria-live": "assertive",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
            className: "nfd-inline-approval__error-icon",
            children: "\u2715"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
            className: "nfd-inline-approval__error-message",
            children: error
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "nfd-inline-approval__actions",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("button", {
          type: "button",
          onClick: handleReject,
          disabled: isExecuting,
          className: "nfd-inline-approval__button nfd-inline-approval__button--secondary",
          "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Cancel action', 'wp-module-ai-chat'),
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Cancel', 'wp-module-ai-chat')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("button", {
          type: "button",
          onClick: handleApprove,
          disabled: isExecuting,
          className: "nfd-inline-approval__button nfd-inline-approval__button--primary",
          "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Approve and execute action', 'wp-module-ai-chat'),
          "aria-busy": isExecuting,
          children: isExecuting ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
              className: "nfd-inline-approval__spinner",
              "aria-hidden": "true"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Executing...', 'wp-module-ai-chat')
            })]
          }) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Approve', 'wp-module-ai-chat')
        })]
      })]
    })
  });
};
InlineApproval.propTypes = {
  approvalRequest: prop_types__WEBPACK_IMPORTED_MODULE_2___default().shape({
    tool_name: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string).isRequired,
    tool_arguments: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object),
    site_url: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
    frontend: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string)
  }),
  onApprove: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func).isRequired,
  onReject: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func).isRequired,
  onExecuteTool: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
  onSendMessage: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
  onSendSystemMessage: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
  conversationId: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  onClearTyping: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
  brandId: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InlineApproval);

/***/ }),

/***/ "../wp-module-ai-chat/src/components/ui/SuggestionButton.jsx":
/*!*******************************************************************!*\
  !*** ../wp-module-ai-chat/src/components/ui/SuggestionButton.jsx ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


/**
 * SuggestionButton Component
 *
 * A reusable suggestion button component that can be used in various contexts.
 * Takes an icon, text, and onClick action as parameters.
 *
 * @param {Object}      props           - The component props.
 * @param {JSX.Element} props.icon      - The icon element to display.
 * @param {string}      props.text      - The text to display.
 * @param {Function}    props.onClick   - The function to call when clicked.
 * @param {string}      props.className - Additional CSS classes (optional).
 * @return {JSX.Element} The SuggestionButton component.
 */

const SuggestionButton = ({
  icon,
  text,
  onClick,
  className = ""
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
    className: `nfd-ai-chat-suggestion ${className}`,
    onClick: onClick,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "nfd-ai-chat-suggestion__icon",
      children: icon
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "nfd-ai-chat-suggestion__text",
      children: text
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SuggestionButton);

/***/ }),

/***/ "../wp-module-ai-chat/src/components/ui/ToolExecutionList.jsx":
/*!********************************************************************!*\
  !*** ../wp-module-ai-chat/src/components/ui/ToolExecutionList.jsx ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lucide-react */ "../wp-module-ai-chat/node_modules/lucide-react/dist/esm/icons/circle-check-big.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "../wp-module-ai-chat/node_modules/lucide-react/dist/esm/icons/circle-x.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "../wp-module-ai-chat/node_modules/lucide-react/dist/esm/icons/chevron-down.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "../wp-module-ai-chat/node_modules/lucide-react/dist/esm/icons/chevron-right.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! classnames */ "../wp-module-ai-chat/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);
/**
 * WordPress dependencies
 */



/**
 * External dependencies
 */



/**
 * Get ability details for display
 *
 * @param {string} abilityName The ability name
 * @return {Object} { title }
 */

const getAbilityDetails = abilityName => {
  const abilityMap = {
    "blu/get-global-styles": {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Reading Site Colors", "wp-module-ai-chat")
    },
    "blu-get-global-styles": {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Reading Site Colors", "wp-module-ai-chat")
    },
    "blu/get-active-global-styles": {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Reading Active Styles", "wp-module-ai-chat")
    },
    "blu-get-active-global-styles": {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Reading Active Styles", "wp-module-ai-chat")
    },
    "blu/get-active-global-styles-id": {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Getting Styles ID", "wp-module-ai-chat")
    },
    "blu-get-active-global-styles-id": {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Getting Styles ID", "wp-module-ai-chat")
    },
    "blu/update-global-styles": {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Updating Site Styles", "wp-module-ai-chat")
    },
    "blu-update-global-styles": {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Updating Site Styles", "wp-module-ai-chat")
    },
    "blu/update-global-palette": {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Updating Site Colors", "wp-module-ai-chat")
    },
    "blu-update-global-palette": {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Updating Site Colors", "wp-module-ai-chat")
    }
  };
  return abilityMap[abilityName] || {
    title: abilityName?.replace(/[-_\/]/g, " ").replace(/\b\w/g, l => l.toUpperCase()) || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Action", "wp-module-ai-chat")
  };
};

/**
 * Get tool details for display
 *
 * @param {string} toolName The tool name
 * @param {Object} args     The tool arguments
 * @return {Object} { title, params }
 */
const getToolDetails = (toolName, args = {}) => {
  if (toolName === "mcp-adapter-execute-ability") {
    const abilityName = args?.ability_name || "unknown";
    const details = getAbilityDetails(abilityName);
    let params = null;
    if ((abilityName === "blu/update-global-palette" || abilityName === "blu/update-global-styles") && args?.parameters?.colors) {
      const colorCount = args.parameters.colors.length;
      params = `${colorCount} color${colorCount !== 1 ? "s" : ""}`;
    }
    return {
      ...details,
      params
    };
  }
  return getAbilityDetails(toolName);
};

/**
 * Safely convert a value to a string for display
 *
 * @param {*} value The value to convert
 * @return {string|null} String representation or null
 */
const safeString = value => {
  if (value === null || value === undefined) {
    return null;
  }
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  // Don't render objects - return null instead
  return null;
};

/**
 * Parse tool result to get a human-readable summary
 *
 * @param {Object} result   The tool result object
 * @param {string} toolName The tool name
 * @return {string|null} Summary string or null
 */
const getResultSummary = (result, toolName) => {
  if (!result || result.isError) {
    return safeString(result?.error);
  }
  try {
    // Result is typically an array with { type: "text", text: "..." }
    let data = result.result;
    if (Array.isArray(data) && data.length > 0 && data[0].text) {
      data = JSON.parse(data[0].text);
    } else if (typeof data === "string") {
      data = JSON.parse(data);
    }

    // If data is not an object at this point, we can't process it
    if (!data || typeof data !== "object") {
      return null;
    }

    // Handle update results
    if (toolName?.includes("update")) {
      if (data.updatedColors && Array.isArray(data.updatedColors)) {
        const colors = data.updatedColors;
        if (colors.length <= 3) {
          return colors.map(c => `${c.name || c.slug}: ${c.color}`).join(", ");
        }
        return `${colors.length} colors updated`;
      }
      if (data.message && typeof data.message === "string") {
        return data.message;
      }
    }

    // Handle get/read results
    if (toolName?.includes("get") || toolName?.includes("read")) {
      // Check for palette data
      if (data.color?.palette) {
        const palette = data.color.palette;
        const customCount = palette.custom?.length || 0;
        const themeCount = palette.theme?.length || 0;
        if (customCount || themeCount) {
          return `Found ${customCount + themeCount} colors`;
        }
      }
      // Check for typography
      if (data.typography) {
        const fontFamilies = data.typography.fontFamilies?.length || 0;
        const fontSizes = data.typography.fontSizes?.length || 0;
        const parts = [];
        if (fontFamilies) {
          parts.push(`${fontFamilies} font families`);
        }
        if (fontSizes) {
          parts.push(`${fontSizes} sizes`);
        }
        if (parts.length) {
          return parts.join(", ");
        }
      }
      // Generic message - only if it's a string
      if (data.message && typeof data.message === "string") {
        return data.message;
      }
    }

    // Fallback for styles ID
    if (data.id && toolName?.includes("id")) {
      return `ID: ${data.id}`;
    }
    return null;
  } catch {
    return null;
  }
};

/**
 * Single tool execution item
 *
 * @param {Object}      props         - The component props.
 * @param {Object}      props.tool    - The tool object.
 * @param {boolean}     props.isError - Whether the tool had an error.
 * @param {Object|null} props.result  - The tool result.
 * @return {JSX.Element} The item component.
 */
const ToolExecutionItem = ({
  tool,
  isError,
  result
}) => {
  const details = getToolDetails(tool.name, tool.arguments);
  const summary = getResultSummary(result, tool.name);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_6___default()("nfd-ai-chat-tool-execution__item", {
      "nfd-ai-chat-tool-execution__item--complete": !isError,
      "nfd-ai-chat-tool-execution__item--error": isError
    }),
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
      className: "nfd-ai-chat-tool-execution__item-header",
      children: [isError ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
        className: "nfd-ai-chat-tool-execution__icon nfd-ai-chat-tool-execution__icon--error",
        size: 12
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
        className: "nfd-ai-chat-tool-execution__icon nfd-ai-chat-tool-execution__icon--success",
        size: 12
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
        className: "nfd-ai-chat-tool-execution__item-title",
        children: details.title
      }), details.params && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
        className: "nfd-ai-chat-tool-execution__item-params",
        children: details.params
      })]
    }), summary && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      className: "nfd-ai-chat-tool-execution__item-summary",
      children: summary
    })]
  });
};

/**
 * ToolExecutionList Component
 *
 * Displays a collapsible list of executed tools using the same styling
 * as the typing indicator's tool execution view.
 *
 * @param {Object} props               - The component props.
 * @param {Array}  props.executedTools - List of executed tools.
 * @param {Array}  props.toolResults   - Results from tool executions.
 * @return {JSX.Element} The ToolExecutionList component.
 */
const ToolExecutionList = ({
  executedTools = [],
  toolResults = []
}) => {
  const [isExpanded, setIsExpanded] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  if (!executedTools || executedTools.length === 0) {
    return null;
  }

  // Create a map of results by tool ID for quick lookup
  const resultsMap = new Map();
  if (toolResults && Array.isArray(toolResults)) {
    toolResults.forEach(result => {
      if (result.id) {
        resultsMap.set(result.id, result);
      }
    });
  }
  const hasErrors = executedTools.some(tool => tool.isError);
  const totalTools = executedTools.length;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_6___default()("nfd-ai-chat-tool-execution", {
      "nfd-ai-chat-tool-execution--collapsed": !isExpanded
    }),
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("button", {
      type: "button",
      className: "nfd-ai-chat-tool-execution__header",
      onClick: () => setIsExpanded(!isExpanded),
      "aria-expanded": isExpanded ? "true" : "false",
      children: [isExpanded ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
        className: "nfd-ai-chat-tool-execution__chevron",
        size: 12
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
        className: "nfd-ai-chat-tool-execution__chevron",
        size: 12
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
        children: hasErrors ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Some actions failed", "wp-module-ai-chat") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Actions completed", "wp-module-ai-chat")
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("span", {
        className: "nfd-ai-chat-tool-execution__header-count",
        children: ["(", totalTools, ")"]
      })]
    }), isExpanded && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      className: "nfd-ai-chat-tool-execution__list",
      children: executedTools.map((tool, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(ToolExecutionItem, {
        tool: tool,
        isError: tool.isError,
        result: resultsMap.get(tool.id)
      }, tool.id || `tool-${index}`))
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ToolExecutionList);

/***/ }),

/***/ "../wp-module-ai-chat/src/components/ui/TypingIndicator.jsx":
/*!******************************************************************!*\
  !*** ../wp-module-ai-chat/src/components/ui/TypingIndicator.jsx ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lucide-react */ "../wp-module-ai-chat/node_modules/lucide-react/dist/esm/icons/circle-check-big.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "../wp-module-ai-chat/node_modules/lucide-react/dist/esm/icons/circle-x.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "../wp-module-ai-chat/node_modules/lucide-react/dist/esm/icons/loader-circle.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "../wp-module-ai-chat/node_modules/lucide-react/dist/esm/icons/sparkles.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lucide-react */ "../wp-module-ai-chat/node_modules/lucide-react/dist/esm/icons/chevron-down.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lucide-react */ "../wp-module-ai-chat/node_modules/lucide-react/dist/esm/icons/chevron-right.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! classnames */ "../wp-module-ai-chat/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__);
/**
 * WordPress dependencies
 */



/**
 * External dependencies
 */



/**
 * Get ability details for display
 *
 * @param {string} abilityName The ability name
 * @return {Object} { title, description }
 */

const getAbilityDetails = abilityName => {
  const abilityMap = {
    "nfd-agents/get-global-styles": {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Reading Site Colors", "wp-module-ai-chat"),
      description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Fetching current color palette and typography settings", "wp-module-ai-chat")
    },
    "nfd-agents/update-global-palette": {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Updating Site Colors", "wp-module-ai-chat"),
      description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Applying new colors to global styles", "wp-module-ai-chat")
    },
    // Legacy tool names for backward compatibility
    "newfold-agents/get-global-styles": {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Reading Site Colors", "wp-module-ai-chat"),
      description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Fetching current color palette and typography settings", "wp-module-ai-chat")
    },
    "newfold-agents/update-global-palette": {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Updating Site Colors", "wp-module-ai-chat"),
      description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Applying new colors to global styles", "wp-module-ai-chat")
    },
    "blu/get-global-styles": {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Reading Site Colors", "wp-module-ai-chat"),
      description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Fetching current color palette and typography settings", "wp-module-ai-chat")
    },
    "blu/update-global-palette": {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Updating Site Colors", "wp-module-ai-chat"),
      description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Applying new colors to global styles", "wp-module-ai-chat")
    },
    "mcp-adapter-discover-abilities": {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Discovering Actions", "wp-module-ai-chat"),
      description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Finding available WordPress abilities", "wp-module-ai-chat")
    },
    "mcp-adapter-get-ability-info": {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Getting Ability Info", "wp-module-ai-chat"),
      description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Fetching ability details", "wp-module-ai-chat")
    },
    "mcp-adapter-execute-ability": {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Executing Action", "wp-module-ai-chat"),
      description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Running WordPress ability", "wp-module-ai-chat")
    }
  };
  return abilityMap[abilityName] || {
    title: abilityName?.replace(/[-_\/]/g, " ").replace(/\b\w/g, l => l.toUpperCase()) || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Executing", "wp-module-ai-chat"),
    description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Running action", "wp-module-ai-chat")
  };
};

/**
 * Get tool details for display
 *
 * @param {string} toolName The tool name
 * @param {Object} args     The tool arguments
 * @return {Object} { title, description, params }
 */
const getToolDetails = (toolName, args = {}) => {
  if (toolName === "mcp-adapter-execute-ability") {
    const abilityName = args?.ability_name || "unknown";
    const details = getAbilityDetails(abilityName);
    let params = null;
    if ((abilityName === "nfd-agents/update-global-palette" || abilityName === "newfold-agents/update-global-palette" || abilityName === "blu/update-global-palette") && args?.parameters?.colors) {
      const colorCount = args.parameters.colors.length;
      params = `${colorCount} color${colorCount !== 1 ? "s" : ""}`;
    }
    return {
      ...details,
      params
    };
  }
  return getAbilityDetails(toolName);
};

/**
 * Single tool execution item in the list
 *
 * @param {Object}  props            - The component props.
 * @param {Object}  props.tool       - The tool object with name and arguments.
 * @param {boolean} props.isActive   - Whether the tool is active.
 * @param {string}  props.progress   - The progress message.
 * @param {boolean} props.isComplete - Whether the tool is complete.
 * @param {boolean} props.isError    - Whether the tool is in error.
 * @return {JSX.Element} The ToolExecutionItem component.
 */
const ToolExecutionItem = ({
  tool,
  isActive,
  progress,
  isComplete,
  isError
}) => {
  const details = getToolDetails(tool.name, tool.arguments);
  const getIcon = () => {
    if (isError) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
        className: "nfd-ai-chat-tool-execution__icon nfd-ai-chat-tool-execution__icon--error",
        size: 12
      });
    }
    if (isComplete) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
        className: "nfd-ai-chat-tool-execution__icon nfd-ai-chat-tool-execution__icon--success",
        size: 12
      });
    }
    if (isActive) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
        className: "nfd-ai-chat-tool-execution__icon nfd-ai-chat-tool-execution__icon--active",
        size: 12
      });
    }
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
      className: "nfd-ai-chat-tool-execution__icon nfd-ai-chat-tool-execution__icon--pending",
      size: 12
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_8___default()("nfd-ai-chat-tool-execution__item", {
      "nfd-ai-chat-tool-execution__item--active": isActive,
      "nfd-ai-chat-tool-execution__item--complete": isComplete,
      "nfd-ai-chat-tool-execution__item--error": isError
    }),
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
      className: "nfd-ai-chat-tool-execution__item-header",
      children: [getIcon(), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
        className: "nfd-ai-chat-tool-execution__item-title",
        children: details.title
      }), details.params && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
        className: "nfd-ai-chat-tool-execution__item-params",
        children: details.params
      })]
    }), isActive && progress && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
      className: "nfd-ai-chat-tool-execution__item-progress",
      children: progress
    })]
  });
};

/**
 * TypingIndicator Component
 *
 * Displays an animated typing indicator with spinner and real-time progress.
 *
 * @param {Object} props                - The component props.
 * @param {string} props.status         - The current status.
 * @param {Object} props.activeToolCall - The currently executing tool call.
 * @param {string} props.toolProgress   - Real-time progress message.
 * @param {Array}  props.executedTools  - List of already executed tools.
 * @param {Array}  props.pendingTools   - List of pending tools to execute.
 * @return {JSX.Element} The TypingIndicator component.
 */
const TypingIndicator = ({
  status = null,
  activeToolCall = null,
  toolProgress = null,
  executedTools = [],
  pendingTools = []
}) => {
  const [isExpanded, setIsExpanded] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const isExecuting = !!activeToolCall;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setIsExpanded(isExecuting);
  }, [isExecuting]);
  const getStatusText = () => {
    switch (status) {
      case "received":
        return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Message received", "wp-module-ai-chat");
      case "generating":
        return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Blu is typing", "wp-module-ai-chat");
      case "tool_call":
        return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Executing actions", "wp-module-ai-chat");
      case "summarizing":
        return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Summarizing results", "wp-module-ai-chat");
      case "completed":
        return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Processing", "wp-module-ai-chat");
      case "failed":
        return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Error occurred", "wp-module-ai-chat");
      default:
        return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Blu is typing", "wp-module-ai-chat");
    }
  };
  const hasToolActivity = activeToolCall || executedTools.length > 0 || pendingTools.length > 0;
  const totalTools = executedTools.length + (activeToolCall ? 1 : 0) + pendingTools.length;
  if (hasToolActivity) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
      className: "nfd-ai-chat-message nfd-ai-chat-message--assistant",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
        className: "nfd-ai-chat-message__content",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
          className: classnames__WEBPACK_IMPORTED_MODULE_8___default()("nfd-ai-chat-tool-execution", {
            "nfd-ai-chat-tool-execution--collapsed": !isExpanded
          }),
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("button", {
            type: "button",
            className: "nfd-ai-chat-tool-execution__header",
            onClick: () => setIsExpanded(!isExpanded),
            "aria-expanded": isExpanded ? "true" : "false",
            children: [isExpanded ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {
              className: "nfd-ai-chat-tool-execution__chevron",
              size: 12
            }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
              className: "nfd-ai-chat-tool-execution__chevron",
              size: 12
            }), isExecuting ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.Fragment, {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Executing actions", "wp-module-ai-chat")
              }), activeToolCall.total > 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("span", {
                className: "nfd-ai-chat-tool-execution__header-count",
                children: ["(", activeToolCall.index, "/", activeToolCall.total, ")"]
              })]
            }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.Fragment, {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Actions completed", "wp-module-ai-chat")
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("span", {
                className: "nfd-ai-chat-tool-execution__header-count",
                children: ["(", totalTools, ")"]
              })]
            })]
          }), isExpanded && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
            className: "nfd-ai-chat-tool-execution__list",
            children: [executedTools.map((tool, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(ToolExecutionItem, {
              tool: tool,
              isActive: false,
              isComplete: !tool.isError,
              isError: tool.isError,
              progress: null
            }, tool.id || `executed-${index}`)), activeToolCall && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(ToolExecutionItem, {
              tool: activeToolCall,
              isActive: true,
              isComplete: false,
              isError: false,
              progress: toolProgress
            }, activeToolCall.id || "active"), pendingTools.map((tool, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(ToolExecutionItem, {
              tool: tool,
              isActive: false,
              isComplete: false,
              isError: false,
              progress: null
            }, tool.id || `pending-${index}`))]
          })]
        })
      })
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
    className: "nfd-ai-chat-message nfd-ai-chat-message--assistant",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
      className: "nfd-ai-chat-message__content",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
        className: "nfd-ai-chat-typing-indicator",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("span", {
          className: "nfd-ai-chat-typing-indicator__dots",
          "aria-hidden": "true",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {})]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
          className: "nfd-ai-chat-typing-indicator__text",
          children: getStatusText()
        })]
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TypingIndicator);

/***/ }),

/***/ "../wp-module-ai-chat/src/config/constants.js":
/*!****************************************************!*\
  !*** ../wp-module-ai-chat/src/config/constants.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   APPROVAL: () => (/* binding */ APPROVAL),
/* harmony export */   INPUT: () => (/* binding */ INPUT),
/* harmony export */   NFD_AGENTS_WEBSOCKET: () => (/* binding */ NFD_AGENTS_WEBSOCKET),
/* harmony export */   UI: () => (/* binding */ UI)
/* harmony export */ });
/**
 * Constants Configuration
 * 
 * Centralized constants for the AI Chat module.
 * All magic numbers, timeouts, and UI values should be defined here.
 */

/**
 * NFD Agents WebSocket Configuration
 * Constants for WebSocket connection, reconnection, and storage
 */
const NFD_AGENTS_WEBSOCKET = {
  MAX_RECONNECT_ATTEMPTS: 5,
  RECONNECT_DELAY: 1000,
  // Base delay in milliseconds
  TYPING_TIMEOUT: 60000,
  // 60 seconds - timeout to hide typing indicator if no response
  STORAGE_KEY_PATTERN: 'nfd-ai-chat-{storageNamespace}-history',
  CONVERSATION_STORAGE_KEY_PATTERN: 'nfd-ai-chat-{storageNamespace}-conversation-id'
};

/**
 * Approval Dialog Configuration
 * Constants for approval request handling
 */
const APPROVAL = {
  TIMEOUT: 5 * 60 * 1000 // 5 minutes in milliseconds
};

/**
 * UI Constants
 * Z-index, dimensions, font weights, and other UI-related values
 */
const UI = {
  Z_INDEX_MODAL: 10000,
  MAX_WIDTH_DIALOG: '500px',
  FONT_WEIGHT_MEDIUM: '500'
};

/**
 * Input Component Configuration
 * Constants for chat input behavior
 */
const INPUT = {
  MAX_HEIGHT: 200,
  // Maximum textarea height in pixels
  FOCUS_DELAY: 100,
  // Delay before focusing input in milliseconds
  STOP_DEBOUNCE: 500 // Debounce delay for stop button in milliseconds
};

/***/ }),

/***/ "../wp-module-ai-chat/src/hooks/useAIChat.js":
/*!***************************************************!*\
  !*** ../wp-module-ai-chat/src/hooks/useAIChat.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CHAT_STATUS: () => (/* binding */ CHAT_STATUS),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   useAIChat: () => (/* binding */ useAIChat)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/helpers */ "../wp-module-ai-chat/src/utils/helpers.js");
/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */


/**
 * Chat status enumeration
 */
const CHAT_STATUS = {
  IDLE: "idle",
  RECEIVED: "received",
  GENERATING: "generating",
  TOOL_CALL: "tool_call",
  SUMMARIZING: "summarizing",
  COMPLETED: "completed",
  FAILED: "failed"
};

/**
 * Default system prompt
 */
const DEFAULT_SYSTEM_PROMPT = `You are a helpful AI assistant. Be concise and helpful in your responses.`;

/**
 * useAIChat Hook
 *
 * A configurable React hook for managing AI chat conversations.
 * Provides extension points for tool handling and message processing.
 *
 * @param {Object}   options                   - Hook configuration options
 * @param {Object}   options.mcpClient         - MCP client instance for tool execution
 * @param {Object}   options.openaiClient      - OpenAI client instance for chat completions
 * @param {string}   options.systemPrompt      - System prompt for the AI
 * @param {Function} options.onToolCall        - Callback before tool execution (can intercept)
 * @param {Function} options.onToolResult      - Callback after tool execution (for glue code)
 * @param {Function} options.onMessageComplete - Callback when a message is complete
 * @param {Function} options.onError           - Callback for errors
 * @param {boolean}  options.autoInitialize    - Auto-initialize MCP client (default: true)
 * @return {Object} Chat state and controls
 */
const useAIChat = ({
  mcpClient = null,
  openaiClient = null,
  systemPrompt = DEFAULT_SYSTEM_PROMPT,
  onToolCall = null,
  onToolResult = null,
  onMessageComplete = null,
  onError = null,
  autoInitialize = true
} = {}) => {
  // Chat state
  const [messages, setMessages] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [isLoading, setIsLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [error, setError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [status, setStatus] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(CHAT_STATUS.IDLE);
  const [sessionId, setSessionId] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(() => (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.generateSessionId)());

  // Tool execution state
  const [activeToolCall, setActiveToolCall] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [executedTools, setExecutedTools] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [pendingTools, setPendingTools] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [toolProgress, setToolProgress] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);

  // MCP state
  const [mcpConnected, setMcpConnected] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [mcpTools, setMcpTools] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);

  // Refs
  const isProcessingRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  const abortControllerRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  /**
   * Initialize MCP client
   */
  const initializeMCP = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    if (!mcpClient) {
      return false;
    }
    try {
      if (!mcpClient.isConnected()) {
        await mcpClient.connect();
      }
      await mcpClient.initialize();
      setMcpTools(mcpClient.getTools());
      setMcpConnected(true);
      return true;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to initialize MCP:", err);
      setError(`Failed to initialize MCP: ${err.message}`);
      onError?.(err);
      return false;
    }
  }, [mcpClient, onError]);

  /**
   * Auto-initialize MCP on mount
   */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (autoInitialize && mcpClient) {
      initializeMCP();
    }

    // Copy ref to variable for cleanup function
    const abortController = abortControllerRef.current;
    return () => {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [autoInitialize, mcpClient, initializeMCP]);

  /**
   * Create a new message object
   */
  const createMessage = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)((role, content, extras = {}) => {
    return {
      id: `${role}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      role,
      type: role,
      content,
      timestamp: new Date(),
      ...extras
    };
  }, []);

  /**
   * Execute a single tool call
   *
   * The onToolCall callback can return an object with { intercepted: true, result: {...} }
   * to handle the tool call locally instead of calling MCP.
   */
  const executeTool = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async toolCall => {
    if (!mcpClient) {
      throw new Error("MCP client not available");
    }
    const {
      name,
      arguments: args
    } = toolCall;

    // Call onToolCall - it can optionally intercept and return a result
    if (onToolCall) {
      const interceptResult = await onToolCall(toolCall);

      // If the callback intercepted the call, use its result
      if (interceptResult && interceptResult.intercepted) {
        const result = interceptResult.result || {
          content: [],
          isError: false
        };

        // Notify after execution (for glue code to react to changes)
        if (onToolResult) {
          await onToolResult(toolCall, result);
        }
        return {
          id: toolCall.id,
          name,
          result,
          isError: result.isError || false,
          hasChanges: result.hasChanges || false,
          undoData: interceptResult.undoData
        };
      }
    }
    try {
      const result = await mcpClient.callTool(name, args);

      // Notify after execution (for glue code to react to changes)
      if (onToolResult) {
        await onToolResult(toolCall, result);
      }
      return {
        id: toolCall.id,
        name,
        result,
        isError: result.isError || false
      };
    } catch (err) {
      return {
        id: toolCall.id,
        name,
        error: err.message,
        isError: true
      };
    }
  }, [mcpClient, onToolCall, onToolResult]);

  /**
   * Execute all tool calls
   */
  const executeToolCalls = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async toolCalls => {
    const results = [];
    setPendingTools(toolCalls.slice(1));
    for (let i = 0; i < toolCalls.length; i++) {
      const toolCall = toolCalls[i];
      setActiveToolCall({
        ...toolCall,
        index: i + 1,
        total: toolCalls.length
      });
      const result = await executeTool(toolCall);
      results.push(result);
      setExecutedTools(prev => [...prev, {
        ...toolCall,
        ...result
      }]);
      setPendingTools(toolCalls.slice(i + 2));
    }
    setActiveToolCall(null);
    setPendingTools([]);
    return results;
  }, [executeTool]);

  /**
   * Send a message and get AI response
   */
  const sendMessage = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async userMessage => {
    if (!openaiClient) {
      setError("OpenAI client not configured");
      return;
    }
    if (isProcessingRef.current) {
      return;
    }
    isProcessingRef.current = true;
    setIsLoading(true);
    setError(null);
    setStatus(CHAT_STATUS.RECEIVED);
    setExecutedTools([]);

    // Add user message
    const userMsg = createMessage("user", userMessage);
    setMessages(prev => [...prev, userMsg]);
    try {
      // Build conversation history
      const conversationHistory = [{
        role: "system",
        content: systemPrompt
      }, ...messages.map(msg => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content,
        toolCalls: msg.toolCalls,
        toolResults: msg.toolResults
      })), {
        role: "user",
        content: userMessage
      }];

      // Get tools in OpenAI format
      const tools = mcpConnected && mcpClient ? mcpClient.getToolsForOpenAI() : [];
      setStatus(CHAT_STATUS.GENERATING);
      let response = null;
      let allToolResults = [];

      // Streaming completion
      await openaiClient.createStreamingCompletion({
        messages: openaiClient.convertMessagesToOpenAI(conversationHistory),
        tools: tools.length > 0 ? tools : undefined,
        tool_choice: tools.length > 0 ? "auto" : undefined
      },
      // onChunk - streaming content updates could be added here
      () => {},
      // onComplete
      async (fullMessage, toolCalls) => {
        if (toolCalls && toolCalls.length > 0) {
          setStatus(CHAT_STATUS.TOOL_CALL);

          // Execute tool calls
          const toolResults = await executeToolCalls(toolCalls);
          allToolResults = toolResults;

          // Continue conversation with tool results
          setStatus(CHAT_STATUS.SUMMARIZING);
          const followUpHistory = [...conversationHistory, {
            role: "assistant",
            content: fullMessage || null,
            toolCalls,
            toolResults: toolResults.map(r => ({
              id: r.id,
              result: r.result,
              error: r.error
            }))
          }];

          // Get follow-up response
          const followUp = await openaiClient.createChatCompletion({
            messages: openaiClient.convertMessagesToOpenAI(followUpHistory)
          });
          response = followUp.choices?.[0]?.message?.content || "";
        } else {
          response = fullMessage;
        }
      },
      // onError
      err => {
        throw err;
      });

      // Add assistant message
      if (response) {
        const assistantMsg = createMessage("assistant", response, {
          toolCalls: allToolResults.length > 0 ? allToolResults : undefined,
          executedTools: allToolResults.length > 0 ? allToolResults : undefined
        });
        setMessages(prev => [...prev, assistantMsg]);
        onMessageComplete?.(assistantMsg);
      }
      setStatus(CHAT_STATUS.COMPLETED);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Chat error:", err);
      setError(err.message);
      setStatus(CHAT_STATUS.FAILED);
      onError?.(err);
    } finally {
      isProcessingRef.current = false;
      setIsLoading(false);
      setActiveToolCall(null);
      setExecutedTools([]);
      setPendingTools([]);
    }
  }, [openaiClient, mcpClient, mcpConnected, messages, systemPrompt, createMessage, executeToolCalls, onMessageComplete, onError]);

  /**
   * Stop the current request
   */
  const stopRequest = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    isProcessingRef.current = false;
    setIsLoading(false);
    setStatus(CHAT_STATUS.IDLE);
    setActiveToolCall(null);
  }, []);

  /**
   * Clear conversation history
   */
  const clearMessages = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    setMessages([]);
    setError(null);
    setStatus(CHAT_STATUS.IDLE);
    setSessionId((0,_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.generateSessionId)());
  }, []);

  /**
   * Add a message programmatically
   */
  const addMessage = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)((role, content, extras = {}) => {
    const msg = createMessage(role, content, extras);
    setMessages(prev => [...prev, msg]);
    return msg;
  }, [createMessage]);
  return {
    // State
    messages,
    isLoading,
    error,
    status,
    sessionId,
    // Tool execution state
    activeToolCall,
    executedTools,
    pendingTools,
    toolProgress,
    // MCP state
    mcpConnected,
    mcpTools,
    // Actions
    sendMessage,
    stopRequest,
    clearMessages,
    addMessage,
    initializeMCP,
    // Setters for advanced usage
    setError,
    setToolProgress
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useAIChat);

/***/ }),

/***/ "../wp-module-ai-chat/src/hooks/useNfdAgentsWebSocket.js":
/*!***************************************************************!*\
  !*** ../wp-module-ai-chat/src/hooks/useNfdAgentsWebSocket.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _config_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../config/constants */ "../wp-module-ai-chat/src/config/constants.js");
/* harmony import */ var _utils_nfdAgents_urlUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/nfdAgents/urlUtils */ "../wp-module-ai-chat/src/utils/nfdAgents/urlUtils.js");
/* harmony import */ var _utils_nfdAgents_greetingUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/nfdAgents/greetingUtils */ "../wp-module-ai-chat/src/utils/nfdAgents/greetingUtils.js");
/**
 * WebSocket Hook for NFD Agents Backend
 * 
 * Connects to the NFD Agents backend via WebSocket and handles message streaming.
 * Shared hook for use across Help Center, Editor Chat, and other AI chat interfaces.
 */








/**
 * useNfdAgentsWebSocket Hook
 *
 * Manages WebSocket connection to NFD Agents backend with automatic reconnection
 * and message handling.
 *
 * @param {Object} options Hook options
 * @param {string} options.configEndpoint REST API endpoint for fetching config
 * @param {string} [options.storageNamespace] Client-only: used for localStorage keys
 *   `nfd-ai-chat-${storageNamespace}-history` and `-conversation-id`. Not sent to backend.
 *   Optional; defaults to 'default' when omitted.
 * @param {boolean} [options.autoConnect=false] Whether to connect automatically
 * @param {string} [options.consumerType] Consumer type ('help_center' or 'editor_chat').
 *   Used to construct consumer parameter: `wordpress_${consumerType}`. Defaults to 'editor_chat'.
 * @param {boolean} [options.autoLoadHistory=true] Whether to auto-load chat history from localStorage on mount.
 *   Set to false to start with empty chat but keep history in storage for later access.
 * @return {Object} Hook return value with connection state and methods
 */
const useNfdAgentsWebSocket = ({
  configEndpoint,
  storageNamespace = 'default',
  autoConnect = false,
  consumerType = 'editor_chat',
  autoLoadHistory = true
}) => {
  // Storage keys for persisting chat history (client-only, not sent to backend)
  const STORAGE_KEY = `nfd-ai-chat-${storageNamespace}-history`;
  const CONVERSATION_STORAGE_KEY = `nfd-ai-chat-${storageNamespace}-conversation-id`;

  // Restore messages and conversation ID from localStorage on mount
  const restoreFromStorage = () => {
    try {
      const storedMessages = localStorage.getItem(STORAGE_KEY);
      const storedConversationId = localStorage.getItem(CONVERSATION_STORAGE_KEY);
      if (storedMessages) {
        const parsedMessages = JSON.parse(storedMessages);
        // Only restore if messages exist and are valid
        if (Array.isArray(parsedMessages) && parsedMessages.length > 0) {
          // Convert timestamp strings back to Date objects
          const restoredMessages = parsedMessages.map(msg => ({
            ...msg,
            timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date()
          }));
          return {
            messages: restoredMessages,
            conversationId: storedConversationId || null
          };
        }
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('[AI Chat] Failed to restore chat history from localStorage:', err);
    }
    return {
      messages: [],
      conversationId: null
    };
  };

  // Restore on mount only (use lazy initialization) - respects autoLoadHistory option
  const [messages, setMessages] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(() => {
    if (!autoLoadHistory) {
      return [];
    }
    const restored = restoreFromStorage();
    return restored.messages;
  });
  const [conversationId, setConversationId] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(() => {
    if (!autoLoadHistory) {
      return null;
    }
    const restored = restoreFromStorage();
    return restored.conversationId;
  });
  const [isConnected, setIsConnected] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [isConnecting, setIsConnecting] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [error, setError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [isTyping, setIsTyping] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [currentResponse, setCurrentResponse] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [approvalRequest, setApprovalRequest] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const wsRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const reconnectTimeoutRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const reconnectAttempts = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(0);
  const configRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const previousAutoConnectRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null); // Start as null to detect first render
  const connectingRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(false); // Prevents overlapping connect() calls before wsRef is set
  const sessionIdRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const hasUserMessageRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(false); // Track if user has sent a message
  const isStoppedRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(false); // Track if user has stopped generation
  const typingTimeoutRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null); // Timeout to auto-hide typing indicator if no response
  const isInitialMount = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(true); // Track initial mount for localStorage persistence
  const messagesRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)([]); // Ref for messages to avoid stale closure in connect's onopen

  const MAX_RECONNECT_ATTEMPTS = _config_constants__WEBPACK_IMPORTED_MODULE_3__.NFD_AGENTS_WEBSOCKET.MAX_RECONNECT_ATTEMPTS;
  const RECONNECT_DELAY = _config_constants__WEBPACK_IMPORTED_MODULE_3__.NFD_AGENTS_WEBSOCKET.RECONNECT_DELAY;
  const TYPING_TIMEOUT = _config_constants__WEBPACK_IMPORTED_MODULE_3__.NFD_AGENTS_WEBSOCKET.TYPING_TIMEOUT;

  /**
   * Generate a UUID v4 session ID
   */
  const generateSessionId = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    // Use crypto.randomUUID if available (modern browsers)
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    // Fallback UUID v4 generator
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  }, []);

  /**
   * Fetch configuration from backend
   */
  const fetchConfig = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    try {
      // Extract namespace and route from configEndpoint if it's a full URL
      // Otherwise, assume it's already in the format 'nfd-agents/chat/v1/config'
      let path = configEndpoint;

      // If configEndpoint is a full URL, extract the REST API path
      if (configEndpoint.startsWith('http://') || configEndpoint.startsWith('https://')) {
        // Extract path from URL - look for rest_route or wp-json
        const urlObj = new URL(configEndpoint);
        if (urlObj.searchParams.has('rest_route')) {
          path = urlObj.searchParams.get('rest_route');
        } else if (urlObj.pathname.includes('/wp-json/')) {
          path = urlObj.pathname.replace('/wp-json/', '');
        } else {
          // Fallback: use the pathname
          path = urlObj.pathname.replace(/^\//, '');
        }
      }

      // Use apiFetch which handles permalinks and nonce automatically
      // apiFetch expects path without leading slash for REST routes
      const cleanPath = path.startsWith('/') ? path.slice(1) : path;

      // For GET requests, append query parameters to the path
      // apiFetch with 'data' option sends POST, but this endpoint is GET
      const pathWithParams = `${cleanPath}?storage_namespace=${encodeURIComponent(storageNamespace)}`;
      const config = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
        path: pathWithParams,
        parse: true
      });
      configRef.current = config;
      return config;
    } catch (err) {
      // Error logging kept for debugging connection issues
      // eslint-disable-next-line no-console
      console.error('[AI Chat] Failed to fetch config:', err);
      // eslint-disable-next-line no-console
      console.error('[AI Chat] Error details:', {
        message: err.message,
        code: err.code,
        data: err.data,
        status: err.data?.status,
        statusText: err.data?.statusText
      });

      // Handle apiFetch errors
      let errorMessage = err.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Failed to connect', 'wp-module-ai-chat');

      // Check for REST API error message in err.data.message or err.message
      if (err.data?.message) {
        errorMessage = err.data.message;
      } else if (err.message && err.message !== 'Could not get a valid response from the server.') {
        errorMessage = err.message;
      }
      if (err.code === 'rest_forbidden' || err.data?.status === 403) {
        errorMessage = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Access denied. Please check your capabilities.', 'wp-module-ai-chat');
      } else if (err.code === 'rest_no_route' || err.data?.status === 404) {
        errorMessage = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Config endpoint not found. Please ensure the backend is deployed.', 'wp-module-ai-chat');
      } else if (err.code === 'gateway_url_not_configured') {
        errorMessage = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Gateway URL not configured. Set NFD_AGENTS_CHAT_GATEWAY_URL in wp-config.php.', 'wp-module-ai-chat');
      } else if (err.code === 'huapi_token_fetch_failed') {
        errorMessage = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Failed to fetch authentication token from Hiive. Check your connection or set NFD_AGENTS_CHAT_DEBUG_TOKEN for local development.', 'wp-module-ai-chat');
      } else if (err.data?.status) {
        errorMessage = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)(/* translators: %1$s: HTTP status, %2$s: status text */
        (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Failed to fetch config: %1$s %2$s', 'wp-module-ai-chat'), err.data.status, err.data.statusText || errorMessage);
      }
      setError((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)(/* translators: %s: error message */
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Failed to connect: %s', 'wp-module-ai-chat'), errorMessage));
      throw new Error(errorMessage);
    }
  }, [configEndpoint, storageNamespace]);

  /**
   * Connect to WebSocket
   */
  const connect = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    // Check if already connected or connecting
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }
    if (wsRef.current?.readyState === WebSocket.CONNECTING) {
      return;
    }
    // Prevent overlapping connect() calls (e.g. React Strict Mode, effect double-run)
    // wsRef is only set after creating the WebSocket, so a second call can pass the above guards
    if (connectingRef.current) {
      return;
    }
    connectingRef.current = true;
    setIsConnecting(true);
    setError(null);
    try {
      // Fetch config if not already cached
      if (!configRef.current) {
        await fetchConfig();
      }
      const config = configRef.current;
      if (!config) {
        throw new Error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No configuration available', 'wp-module-ai-chat'));
      }

      // Generate or reuse session ID
      if (!sessionIdRef.current) {
        sessionIdRef.current = generateSessionId();
      }

      // Convert HTTP/HTTPS URL to WebSocket protocol
      const wsBaseUrl = (0,_utils_nfdAgents_urlUtils__WEBPACK_IMPORTED_MODULE_4__.convertToWebSocketUrl)(config.gateway_url);

      // Agent type: backend/gateway expects 'blu'; 'nfd-agents' is a legacy alias that is not in the agent registry
      const agentType = (config.agent_type === 'nfd-agents' ? 'blu' : config.agent_type) || 'blu';

      // Build WebSocket URL with session_id, token, and consumer
      let wsUrl = `${wsBaseUrl}/${config.brand_id}/agents/${agentType}/v1/ws?session_id=${sessionIdRef.current}&token=${encodeURIComponent(config.huapi_token)}`;

      // Add consumer parameter: construct wordpress_${consumerType}
      // This triggers site_url derivation from Referer/Origin headers in the gateway
      const consumer = `wordpress_${consumerType}`;
      wsUrl += `&consumer=${encodeURIComponent(consumer)}`;

      // Deprecated: site_url parameter (ignored by gateway, but kept for backward compatibility)
      // The gateway now derives site_url from request headers when consumer contains "wordpress"
      if (config.site_url) {
        // Log deprecation warning but don't add to URL (gateway will ignore it)
        // eslint-disable-next-line no-console
        console.warn('[AI Chat] site_url parameter is deprecated. Use consumerType instead.');
      }
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;
      // Note: Don't reset connectingRef here - wait until onopen/onerror to prevent race conditions

      ws.onopen = () => {
        connectingRef.current = false; // Now safe to allow new connections
        setIsConnected(true);
        setIsConnecting(false);
        setError(null);
        reconnectAttempts.current = 0;
        // Reset user message flag on new connection
        // Set to true if we have restored messages (user has already sent messages)
        hasUserMessageRef.current = messagesRef.current && messagesRef.current.length > 0;
        // Reset stopped flag on new connection
        isStoppedRef.current = false;
        // Don't clear messages on reconnect - preserve chat history
        setCurrentResponse('');
      };
      ws.onmessage = event => {
        try {
          const data = JSON.parse(event.data);

          // If user has stopped generation, ignore all messages except session_established
          // This prevents any further processing after stop is clicked
          if (isStoppedRef.current && data.type !== 'session_established') {
            return;
          }

          // Handle different message types
          if (data.type === 'session_established') {
            // Session established - backend may return a different session_id
            if (data.session_id) {
              sessionIdRef.current = data.session_id;
            }
          } else if (data.type === 'streaming_chunk' || data.type === 'chunk') {
            // Ignore streaming chunks if user has stopped generation
            if (isStoppedRef.current) {
              return;
            }

            // Streaming response chunk
            const content = data.content || data.chunk || data.text || '';
            if (content) {
              setCurrentResponse(prev => {
                const newContent = prev + content;
                // Only filter greetings if we haven't received any user message AND
                // the content is still very short (likely just the greeting start)
                // Once content gets longer, it's probably a real response
                if (!hasUserMessageRef.current && newContent.length < 100 && (0,_utils_nfdAgents_greetingUtils__WEBPACK_IMPORTED_MODULE_5__.isInitialGreeting)(newContent)) {
                  // Don't show initial greetings - clear any partial we may have accumulated
                  // eslint-disable-next-line no-console
                  console.debug('[AI Chat] Filtering initial greeting:', newContent.substring(0, 50));
                  return '';
                }
                // Only set typing if we're actually showing content (not filtered greetings)
                setIsTyping(true);
                if (typingTimeoutRef.current) {
                  clearTimeout(typingTimeoutRef.current);
                }
                typingTimeoutRef.current = setTimeout(() => {
                  setIsTyping(false);
                  typingTimeoutRef.current = null;
                }, TYPING_TIMEOUT);
                return newContent;
              });
            }
          } else if (data.type === 'structured_output') {
            // Structured output (e.g., approval requests)
            // Handle approval requests (human_input_request)
            const humanInputRequest = data.response_content?.content?.human_input_request;
            if (humanInputRequest) {
              const inputType = (humanInputRequest.input_type || humanInputRequest.inputType || '').toUpperCase();

              // APPROVAL_REQUEST: only persist conversation_id when present; no approval UI (backend always executes tools)
              if (inputType === 'APPROVAL_REQUEST') {
                // Still handle conversation ID if available
                if (data.conversation_id || data.conversationId) {
                  const newConversationId = data.conversation_id || data.conversationId;
                  setConversationId(newConversationId);
                  // Persist conversation ID to localStorage
                  try {
                    localStorage.setItem(CONVERSATION_STORAGE_KEY, newConversationId);
                  } catch (err) {
                    // eslint-disable-next-line no-console
                    console.warn('[AI Chat] Failed to save conversation ID to localStorage:', err);
                  }
                }
                // Return early to prevent duplicate approval dialog
                return;
              }
            }

            // Handle structured output messages
            // Check both data.message and data.response_content.message
            const structuredMessage = data.message || data.response_content?.message;

            // If there's a message, handle it
            // Filter out system messages that shouldn't be shown to users
            const filteredMessage = structuredMessage?.trim();
            if (filteredMessage && filteredMessage !== 'No content provided' && filteredMessage !== 'sales_requested' && filteredMessage.toLowerCase() !== 'sales_requested') {
              // Only filter greetings if message is short and clearly just a greeting
              // Longer messages are likely real responses, even if they contain greeting words
              if (!hasUserMessageRef.current && filteredMessage.length < 150 && (0,_utils_nfdAgents_greetingUtils__WEBPACK_IMPORTED_MODULE_5__.isInitialGreeting)(filteredMessage)) {
                // Don't add the message - but keep typing state as is (real response might still be coming)
                // eslint-disable-next-line no-console
                console.debug('[AI Chat] Filtering greeting message:', filteredMessage.substring(0, 50));
                setCurrentResponse('');
                return;
              }

              // Finalize any current streaming response first
              setCurrentResponse(prev => {
                if (prev) {
                  setMessages(prevMessages => [...prevMessages, {
                    id: `msg-${Date.now()}-streaming`,
                    role: 'assistant',
                    type: 'assistant',
                    content: prev,
                    timestamp: new Date()
                  }]);
                }
                return '';
              });

              // Add structured output message
              setMessages(prev => [...prev, {
                id: `msg-${Date.now()}`,
                role: 'assistant',
                type: 'assistant',
                content: filteredMessage,
                timestamp: new Date()
              }]);
              setIsTyping(false);
              setCurrentResponse('');
              // Clear typing timeout since we received content
              if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
                typingTimeoutRef.current = null;
              }
            } else {
              // No message - might be an empty response; don't set isTyping(false) yet
            }
          } else if (data.type === 'tool_result') {
            // Persist conversation_id when present (backend always executes tools; no approval UI)
            if (data.conversation_id || data.conversationId) {
              const newConversationId = data.conversation_id || data.conversationId;
              setConversationId(newConversationId);
              try {
                localStorage.setItem(CONVERSATION_STORAGE_KEY, newConversationId);
              } catch (err) {
                // eslint-disable-next-line no-console
                console.warn('[AI Chat] Failed to save conversation ID to localStorage:', err);
              }
            }
          } else if (data.type === 'message' || data.type === 'complete') {
            // Complete message - finalize current streaming response
            let hasContent = false;
            setCurrentResponse(prev => {
              if (prev) {
                // Filter out system messages that shouldn't be shown
                const trimmedContent = prev.trim();
                if (trimmedContent === 'No content provided' || trimmedContent === 'sales_requested' || trimmedContent.toLowerCase() === 'sales_requested') {
                  // Don't set isTyping(false) - actual response might still be coming
                  return '';
                }

                // Only filter greetings if message is short and clearly just a greeting
                if (!hasUserMessageRef.current && prev.length < 150 && (0,_utils_nfdAgents_greetingUtils__WEBPACK_IMPORTED_MODULE_5__.isInitialGreeting)(prev)) {
                  // Clear the response - but keep typing state (real response might still be coming)
                  // eslint-disable-next-line no-console
                  console.debug('[AI Chat] Filtering greeting in complete message:', prev.substring(0, 50));
                  return '';
                }

                // Save current streaming response as a message
                setMessages(prevMessages => [...prevMessages, {
                  id: `msg-${Date.now()}`,
                  role: 'assistant',
                  type: 'assistant',
                  content: prev,
                  timestamp: new Date()
                }]);
                hasContent = true;
              }
              return '';
            });
            // Only set isTyping(false) if we actually added content
            if (hasContent) {
              setIsTyping(false);
              // Clear typing timeout since we received content
              if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
                typingTimeoutRef.current = null;
              }
            }
          } else if (data.type === 'handoff_request') {
            // Handle handoff requests - filter out system messages
            const messageContent = data.message || data.response_content?.message;
            const trimmedMessage = messageContent?.trim();

            // Filter out system messages that shouldn't be shown
            if (!trimmedMessage || trimmedMessage === 'No content provided' || trimmedMessage === 'sales_requested' || trimmedMessage.toLowerCase() === 'sales_requested') {
              // Don't set isTyping(false) - actual response might still be coming
              setCurrentResponse('');
              return;
            }

            // Only add message if it has actual content
            setMessages(prev => [...prev, {
              id: `msg-${Date.now()}`,
              role: 'assistant',
              type: 'assistant',
              content: trimmedMessage,
              timestamp: new Date()
            }]);
            setIsTyping(false);
            setCurrentResponse('');
            // Clear typing timeout since we received content
            if (typingTimeoutRef.current) {
              clearTimeout(typingTimeoutRef.current);
              typingTimeoutRef.current = null;
            }
          } else if (data.type === 'error') {
            setError(data.message || data.error || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('An error occurred', 'wp-module-ai-chat'));
            setIsTyping(false);
            setCurrentResponse('');
          } else if (data.message || data.response_content?.message) {
            // Generic message with content (handles handoff_request, etc.)
            // Check both data.message and data.response_content.message
            const messageContent = data.message || data.response_content?.message;

            // Filter out system messages that shouldn't be shown
            const trimmedMessage = messageContent?.trim();
            if (!trimmedMessage || trimmedMessage === 'No content provided' || trimmedMessage === 'sales_requested' || trimmedMessage.toLowerCase() === 'sales_requested') {
              // Don't set isTyping(false) - actual response might still be coming
              setCurrentResponse('');
              return;
            }

            // Only filter greetings if message is short and clearly just a greeting
            if (!hasUserMessageRef.current && trimmedMessage.length < 150 && (0,_utils_nfdAgents_greetingUtils__WEBPACK_IMPORTED_MODULE_5__.isInitialGreeting)(trimmedMessage)) {
              // Don't add the message - but keep typing state (real response might still be coming)
              // eslint-disable-next-line no-console
              console.debug('[AI Chat] Filtering greeting in generic message:', trimmedMessage.substring(0, 50));
              setCurrentResponse('');
              return;
            }
            setMessages(prev => [...prev, {
              id: `msg-${Date.now()}`,
              role: 'assistant',
              type: 'assistant',
              content: trimmedMessage,
              timestamp: new Date()
            }]);
            setIsTyping(false);
            setCurrentResponse('');
            // Clear typing timeout since we received content
            if (typingTimeoutRef.current) {
              clearTimeout(typingTimeoutRef.current);
              typingTimeoutRef.current = null;
            }
          }
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('[AI Chat] Error parsing WebSocket message:', err);
        }
      };
      ws.onerror = error => {
        // eslint-disable-next-line no-console
        console.error('[AI Chat] WebSocket error:', error);
        connectingRef.current = false; // Reset so new connections can be attempted
        setError((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Connection error. Please check server status and configuration.', 'wp-module-ai-chat'));
        setIsConnecting(false);
      };
      ws.onclose = event => {
        connectingRef.current = false; // Reset so new connections can be attempted
        setIsConnected(false);
        setIsConnecting(false);
        setIsTyping(false);
        // Clear ref only if this is still the active socket (avoid clearing a newer one)
        if (wsRef.current === ws) {
          wsRef.current = null;
        }

        // Attempt to reconnect if not a normal closure
        if (event.code !== 1000 && reconnectAttempts.current < MAX_RECONNECT_ATTEMPTS) {
          reconnectAttempts.current++;
          const delay = RECONNECT_DELAY * Math.pow(2, reconnectAttempts.current - 1);
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, delay);
        } else if (reconnectAttempts.current >= MAX_RECONNECT_ATTEMPTS) {
          setError((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Failed to reconnect. Please refresh the page.', 'wp-module-ai-chat'));
        }
      };
    } catch (error) {
      connectingRef.current = false;
      // eslint-disable-next-line no-console
      console.error('[AI Chat] Error creating WebSocket:', error);
      setError(error.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Failed to connect. Please check configuration and server status.', 'wp-module-ai-chat'));
      setIsConnecting(false);
    }
  }, [fetchConfig, generateSessionId]);

  // Keep messagesRef in sync with messages for use in connect's onopen (avoids stale closure)
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    messagesRef.current = messages;
  }, [messages]);

  /**
   * Send a message via WebSocket
   */
  const sendMessage = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)((message, convId = null) => {
    // Reset stopped flag when sending a new message
    isStoppedRef.current = false;

    // Mark that user has sent a message (so we don't filter subsequent greetings)
    hasUserMessageRef.current = true;
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      setError((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Not connected. Please wait for connection.', 'wp-module-ai-chat'));
      return;
    }

    // If this is a user message (not a tool result), add to state
    if (!convId) {
      const userMessage = {
        id: `msg-${Date.now()}`,
        role: 'user',
        type: 'user',
        content: message,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      setCurrentResponse(''); // Clear any previous response
      setIsTyping(true);

      // Set a timeout to hide typing indicator if no response comes
      // Clear any existing timeout first
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(() => {
        // Hide typing indicator if timeout expires (no response received)
        setIsTyping(false);
        typingTimeoutRef.current = null;
      }, TYPING_TIMEOUT);
    }

    // Send message via WebSocket
    const payload = {
      type: 'chat',
      message: message
    };

    // Only send conversationId if explicitly provided (for tool results)
    // If conversationId was cleared (null), don't send it to prevent backend from using old context
    if (convId) {
      payload.conversationId = convId;
    } else if (conversationId) {
      payload.conversationId = conversationId;
    }
    // If conversationId is null/undefined, intentionally don't include it in payload
    // This ensures backend uses the session's conversation_id, not an old one

    wsRef.current.send(JSON.stringify(payload));
  }, [conversationId]);

  /**
   * Send a system message via WebSocket (hidden from UI)
   * Used for tool execution results that the agent needs to process
   * but shouldn't be shown directly to the user in the chat
   */
  const sendSystemMessage = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(message => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      // eslint-disable-next-line no-console
      console.warn('[AI Chat] Cannot send system message - not connected');
      return;
    }

    // Send message via WebSocket WITHOUT adding to UI
    // The agent will process this and respond naturally
    const payload = {
      type: 'chat',
      message: message
    };

    // Include conversationId if available
    if (conversationId) {
      payload.conversationId = conversationId;
    }

    // Set typing indicator since we expect a response
    setIsTyping(true);
    setCurrentResponse('');

    // Set a timeout to hide typing indicator if no response comes
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      typingTimeoutRef.current = null;
    }, TYPING_TIMEOUT);
    wsRef.current.send(JSON.stringify(payload));
  }, [conversationId]);

  /**
   * Disconnect WebSocket
   */
  const disconnect = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
    if (wsRef.current) {
      wsRef.current.close(1000, 'User disconnected');
      wsRef.current = null;
    }
    setIsConnected(false);
    setIsConnecting(false);
  }, []);

  /**
   * Stop the current generation request
   * Immediately stops typing but keeps connection open for next message
   */
  const stopRequest = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    // Set stopped flag to prevent processing any more messages
    isStoppedRef.current = true;

    // Immediately stop typing state to provide instant feedback
    setIsTyping(false);
    setCurrentResponse('');

    // Clear typing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }

    // Note: We don't close the WebSocket connection here
    // This allows the user to immediately send another message
    // The connection will remain open and ready for the next request
  }, []);

  /**
   * Clear approval request (after approval/rejection)
   */
  const clearApprovalRequest = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    setApprovalRequest(null);
  }, []);

  /**
   * Clear typing indicator
   * Used when tool execution completes to allow user to send next message
   */
  const clearTyping = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    setIsTyping(false);
    // Clear typing timeout if it exists
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
  }, []);

  /**
   * Add assistant message programmatically
   * Used to display tool results as AI messages
   * 
   * @param {string|Object} content Message content to display (will be converted to string if object)
   */
  const addAssistantMessage = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(content => {
    // Ensure content is always a string to prevent React rendering errors
    let contentString;
    if (content === null || content === undefined) {
      contentString = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No content provided.', 'wp-module-ai-chat');
    } else if (typeof content === 'object') {
      // If content is an object, stringify it
      try {
        contentString = JSON.stringify(content, null, 2);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('[useNfdAgentsWebSocket] Failed to stringify content object:', e);
        contentString = String(content);
      }
    } else {
      contentString = String(content);
    }
    setMessages(prev => [...prev, {
      id: `msg-${Date.now()}`,
      role: 'assistant',
      type: 'assistant',
      content: contentString,
      timestamp: new Date()
    }]);
    setIsTyping(false);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
  }, []);

  /**
   * Update a specific message in the messages array
   * Used to modify approval messages when cancelled/approved
   * 
   * @param {string|Function} messageIdOrPredicate Message ID or predicate function to find message
   * @param {Function} updater Function that receives message and returns updated message
   */
  const updateMessage = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)((messageIdOrPredicate, updater) => {
    setMessages(prev => prev.map(msg => {
      // Check if this is the message to update
      const shouldUpdate = typeof messageIdOrPredicate === 'function' ? messageIdOrPredicate(msg) : msg.id === messageIdOrPredicate;
      if (shouldUpdate) {
        return updater(msg);
      }
      return msg;
    }));
  }, []);

  /**
   * Connect/disconnect based on autoConnect prop
   * This ensures we only fetch token and connect when sidebar is actually open
   */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const previousAutoConnect = previousAutoConnectRef.current;

    // On first render, just store the value and return (don't connect yet if false)
    if (previousAutoConnect === null) {
      previousAutoConnectRef.current = autoConnect;
      if (autoConnect && !connectingRef.current) {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN && wsRef.current.readyState !== WebSocket.CONNECTING) {
          connect();
        }
      }
      return;
    }

    // Only act if autoConnect actually changed
    if (previousAutoConnect === autoConnect) {
      return;
    }
    previousAutoConnectRef.current = autoConnect;
    if (autoConnect) {
      if (!connectingRef.current && (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN && wsRef.current.readyState !== WebSocket.CONNECTING)) {
        connect();
      }
    } else {
      disconnect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoConnect]); // Only depend on autoConnect - connect/disconnect are stable

  /**
   * Persist messages to localStorage whenever they change
   * Skip on initial mount if messages are empty (to avoid overwriting with empty array)
   */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // Skip saving on initial mount if messages are empty (they were just restored or are truly empty)
    if (isInitialMount.current) {
      isInitialMount.current = false;
      // Only save if we have messages (don't overwrite with empty on first render)
      if (messages.length > 0) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        } catch (err) {
          // eslint-disable-next-line no-console
          console.warn('[AI Chat] Failed to save messages to localStorage:', err);
        }
      }
      return;
    }

    // Save messages to localStorage on every change after initial mount
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('[AI Chat] Failed to save messages to localStorage:', err);
    }
  }, [messages]);

  /**
   * Persist conversation ID to localStorage whenever it changes
   */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    try {
      if (conversationId) {
        localStorage.setItem(CONVERSATION_STORAGE_KEY, conversationId);
      } else {
        // Clear conversation ID from storage if it's null
        localStorage.removeItem(CONVERSATION_STORAGE_KEY);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('[AI Chat] Failed to save conversation ID to localStorage:', err);
    }
  }, [conversationId]);

  /**
   * Clear chat history from localStorage and reset all state
   */
  const clearChatHistory = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    try {
      // Clear localStorage
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(CONVERSATION_STORAGE_KEY);

      // Reset React state
      setMessages([]);
      setConversationId(null);
      setApprovalRequest(null);
      setIsTyping(false);
      setCurrentResponse('');
      setError(null);

      // RESET SESSION ID FIRST - This is critical to prevent old context from being restored
      // When sessionIdRef is null, connect() will generate a new session_id on next connection
      // This forces the backend to create a completely new session with no conversation history
      sessionIdRef.current = null;

      // Disconnect WebSocket to force fresh connection
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
        setIsConnected(false);
      }

      // Reset refs
      hasUserMessageRef.current = false;
      isStoppedRef.current = false;

      // Clear typing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }

      // Clear reconnect timeout if any
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }

      // Reset reconnect attempts
      reconnectAttempts.current = 0;

      // If autoConnect is enabled, reconnect after clearing
      // (This will be handled by the autoConnect useEffect)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('[AI Chat] Failed to clear chat history:', err);
    }
  }, []);
  return {
    messages,
    sendMessage,
    sendSystemMessage,
    isConnected,
    isConnecting,
    error,
    isTyping,
    currentResponse,
    approvalRequest,
    conversationId,
    clearApprovalRequest,
    clearTyping,
    addAssistantMessage,
    updateMessage,
    connect,
    disconnect,
    stopRequest,
    clearChatHistory,
    brandId: configRef.current?.brand_id || null
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useNfdAgentsWebSocket);

/***/ }),

/***/ "../wp-module-ai-chat/src/index.js":
/*!*****************************************!*\
  !*** ../wp-module-ai-chat/src/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AILogo: () => (/* reexport safe */ _components_ui_AILogo__WEBPACK_IMPORTED_MODULE_15__["default"]),
/* harmony export */   APPROVAL: () => (/* reexport safe */ _config_constants__WEBPACK_IMPORTED_MODULE_10__.APPROVAL),
/* harmony export */   ApprovalDialog: () => (/* reexport safe */ _components_ui_ApprovalDialog__WEBPACK_IMPORTED_MODULE_17__["default"]),
/* harmony export */   BluBetaHeading: () => (/* reexport safe */ _components_ui_BluBetaHeading__WEBPACK_IMPORTED_MODULE_16__["default"]),
/* harmony export */   CHAT_STATUS: () => (/* reexport safe */ _hooks_useAIChat__WEBPACK_IMPORTED_MODULE_2__.CHAT_STATUS),
/* harmony export */   ChatInput: () => (/* reexport safe */ _components_chat_ChatInput__WEBPACK_IMPORTED_MODULE_13__["default"]),
/* harmony export */   ChatMessage: () => (/* reexport safe */ _components_chat_ChatMessage__WEBPACK_IMPORTED_MODULE_11__["default"]),
/* harmony export */   ChatMessages: () => (/* reexport safe */ _components_chat_ChatMessages__WEBPACK_IMPORTED_MODULE_12__["default"]),
/* harmony export */   CloudflareOpenAIClient: () => (/* reexport safe */ _services_openaiClient__WEBPACK_IMPORTED_MODULE_1__.CloudflareOpenAIClient),
/* harmony export */   ErrorAlert: () => (/* reexport safe */ _components_ui_ErrorAlert__WEBPACK_IMPORTED_MODULE_19__["default"]),
/* harmony export */   INPUT: () => (/* reexport safe */ _config_constants__WEBPACK_IMPORTED_MODULE_10__.INPUT),
/* harmony export */   InlineApproval: () => (/* reexport safe */ _components_ui_InlineApproval__WEBPACK_IMPORTED_MODULE_18__["default"]),
/* harmony export */   MCPError: () => (/* reexport safe */ _services_mcpClient__WEBPACK_IMPORTED_MODULE_0__.MCPError),
/* harmony export */   NFD_AGENTS_WEBSOCKET: () => (/* reexport safe */ _config_constants__WEBPACK_IMPORTED_MODULE_10__.NFD_AGENTS_WEBSOCKET),
/* harmony export */   OpenAIError: () => (/* reexport safe */ _services_openaiClient__WEBPACK_IMPORTED_MODULE_1__.OpenAIError),
/* harmony export */   SuggestionButton: () => (/* reexport safe */ _components_ui_SuggestionButton__WEBPACK_IMPORTED_MODULE_20__["default"]),
/* harmony export */   ToolExecutionList: () => (/* reexport safe */ _components_ui_ToolExecutionList__WEBPACK_IMPORTED_MODULE_21__["default"]),
/* harmony export */   TypingIndicator: () => (/* reexport safe */ _components_ui_TypingIndicator__WEBPACK_IMPORTED_MODULE_22__["default"]),
/* harmony export */   UI: () => (/* reexport safe */ _config_constants__WEBPACK_IMPORTED_MODULE_10__.UI),
/* harmony export */   WelcomeScreen: () => (/* reexport safe */ _components_chat_WelcomeScreen__WEBPACK_IMPORTED_MODULE_14__["default"]),
/* harmony export */   WordPressMCPClient: () => (/* reexport safe */ _services_mcpClient__WEBPACK_IMPORTED_MODULE_0__.WordPressMCPClient),
/* harmony export */   containsHtml: () => (/* reexport safe */ _utils_sanitizeHtml__WEBPACK_IMPORTED_MODULE_6__.containsHtml),
/* harmony export */   containsMarkdown: () => (/* reexport safe */ _utils_markdownParser__WEBPACK_IMPORTED_MODULE_5__.containsMarkdown),
/* harmony export */   convertToWebSocketUrl: () => (/* reexport safe */ _utils_nfdAgents_urlUtils__WEBPACK_IMPORTED_MODULE_8__.convertToWebSocketUrl),
/* harmony export */   createMCPClient: () => (/* reexport safe */ _services_mcpClient__WEBPACK_IMPORTED_MODULE_0__.createMCPClient),
/* harmony export */   createOpenAIClient: () => (/* reexport safe */ _services_openaiClient__WEBPACK_IMPORTED_MODULE_1__.createOpenAIClient),
/* harmony export */   debounce: () => (/* reexport safe */ _utils_helpers__WEBPACK_IMPORTED_MODULE_4__.debounce),
/* harmony export */   generateSessionId: () => (/* reexport safe */ _utils_helpers__WEBPACK_IMPORTED_MODULE_4__.generateSessionId),
/* harmony export */   generateSuccessMessage: () => (/* reexport safe */ _utils_messageUtils__WEBPACK_IMPORTED_MODULE_7__.generateSuccessMessage),
/* harmony export */   isInitialGreeting: () => (/* reexport safe */ _utils_nfdAgents_greetingUtils__WEBPACK_IMPORTED_MODULE_9__.isInitialGreeting),
/* harmony export */   isLocalhost: () => (/* reexport safe */ _utils_nfdAgents_urlUtils__WEBPACK_IMPORTED_MODULE_8__.isLocalhost),
/* harmony export */   mcpClient: () => (/* reexport safe */ _services_mcpClient__WEBPACK_IMPORTED_MODULE_0__.mcpClient),
/* harmony export */   normalizeUrl: () => (/* reexport safe */ _utils_nfdAgents_urlUtils__WEBPACK_IMPORTED_MODULE_8__.normalizeUrl),
/* harmony export */   openaiClient: () => (/* reexport safe */ _services_openaiClient__WEBPACK_IMPORTED_MODULE_1__.openaiClient),
/* harmony export */   parseMarkdown: () => (/* reexport safe */ _utils_markdownParser__WEBPACK_IMPORTED_MODULE_5__.parseMarkdown),
/* harmony export */   sanitizeHtml: () => (/* reexport safe */ _utils_sanitizeHtml__WEBPACK_IMPORTED_MODULE_6__.sanitizeHtml),
/* harmony export */   simpleHash: () => (/* reexport safe */ _utils_helpers__WEBPACK_IMPORTED_MODULE_4__.simpleHash),
/* harmony export */   useAIChat: () => (/* reexport safe */ _hooks_useAIChat__WEBPACK_IMPORTED_MODULE_2__.useAIChat),
/* harmony export */   useNfdAgentsWebSocket: () => (/* reexport safe */ _hooks_useNfdAgentsWebSocket__WEBPACK_IMPORTED_MODULE_3__["default"])
/* harmony export */ });
/* harmony import */ var _services_mcpClient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/mcpClient */ "../wp-module-ai-chat/src/services/mcpClient.js");
/* harmony import */ var _services_openaiClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/openaiClient */ "../wp-module-ai-chat/src/services/openaiClient.js");
/* harmony import */ var _hooks_useAIChat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hooks/useAIChat */ "../wp-module-ai-chat/src/hooks/useAIChat.js");
/* harmony import */ var _hooks_useNfdAgentsWebSocket__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hooks/useNfdAgentsWebSocket */ "../wp-module-ai-chat/src/hooks/useNfdAgentsWebSocket.js");
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/helpers */ "../wp-module-ai-chat/src/utils/helpers.js");
/* harmony import */ var _utils_markdownParser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/markdownParser */ "../wp-module-ai-chat/src/utils/markdownParser.js");
/* harmony import */ var _utils_sanitizeHtml__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/sanitizeHtml */ "../wp-module-ai-chat/src/utils/sanitizeHtml.js");
/* harmony import */ var _utils_messageUtils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/messageUtils */ "../wp-module-ai-chat/src/utils/messageUtils.js");
/* harmony import */ var _utils_nfdAgents_urlUtils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/nfdAgents/urlUtils */ "../wp-module-ai-chat/src/utils/nfdAgents/urlUtils.js");
/* harmony import */ var _utils_nfdAgents_greetingUtils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/nfdAgents/greetingUtils */ "../wp-module-ai-chat/src/utils/nfdAgents/greetingUtils.js");
/* harmony import */ var _config_constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./config/constants */ "../wp-module-ai-chat/src/config/constants.js");
/* harmony import */ var _components_chat_ChatMessage__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/chat/ChatMessage */ "../wp-module-ai-chat/src/components/chat/ChatMessage.jsx");
/* harmony import */ var _components_chat_ChatMessages__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/chat/ChatMessages */ "../wp-module-ai-chat/src/components/chat/ChatMessages.jsx");
/* harmony import */ var _components_chat_ChatInput__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/chat/ChatInput */ "../wp-module-ai-chat/src/components/chat/ChatInput.jsx");
/* harmony import */ var _components_chat_WelcomeScreen__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/chat/WelcomeScreen */ "../wp-module-ai-chat/src/components/chat/WelcomeScreen.jsx");
/* harmony import */ var _components_ui_AILogo__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/ui/AILogo */ "../wp-module-ai-chat/src/components/ui/AILogo.jsx");
/* harmony import */ var _components_ui_BluBetaHeading__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/ui/BluBetaHeading */ "../wp-module-ai-chat/src/components/ui/BluBetaHeading.jsx");
/* harmony import */ var _components_ui_ApprovalDialog__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/ui/ApprovalDialog */ "../wp-module-ai-chat/src/components/ui/ApprovalDialog.jsx");
/* harmony import */ var _components_ui_InlineApproval__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/ui/InlineApproval */ "../wp-module-ai-chat/src/components/ui/InlineApproval.jsx");
/* harmony import */ var _components_ui_ErrorAlert__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./components/ui/ErrorAlert */ "../wp-module-ai-chat/src/components/ui/ErrorAlert.jsx");
/* harmony import */ var _components_ui_SuggestionButton__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./components/ui/SuggestionButton */ "../wp-module-ai-chat/src/components/ui/SuggestionButton.jsx");
/* harmony import */ var _components_ui_ToolExecutionList__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./components/ui/ToolExecutionList */ "../wp-module-ai-chat/src/components/ui/ToolExecutionList.jsx");
/* harmony import */ var _components_ui_TypingIndicator__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./components/ui/TypingIndicator */ "../wp-module-ai-chat/src/components/ui/TypingIndicator.jsx");
/**
 * AI Chat Module - Main Entry Point
 *
 * This module provides reusable AI chat functionality for WordPress.
 * Use this as a foundation for editor chat, help center chat, and other AI interfaces.
 */

// Services



// Hooks



// Utils





// NFD Agents Utilities



// Constants


// Chat Components





// UI Components









/***/ }),

/***/ "../wp-module-ai-chat/src/services/mcpClient.js":
/*!******************************************************!*\
  !*** ../wp-module-ai-chat/src/services/mcpClient.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MCPError: () => (/* binding */ MCPError),
/* harmony export */   WordPressMCPClient: () => (/* binding */ WordPressMCPClient),
/* harmony export */   createMCPClient: () => (/* binding */ createMCPClient),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   mcpClient: () => (/* binding */ mcpClient)
/* harmony export */ });
/* harmony import */ var _modelcontextprotocol_sdk_client_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @modelcontextprotocol/sdk/client/index.js */ "../wp-module-ai-chat/node_modules/@modelcontextprotocol/sdk/dist/esm/client/index.js");
/* harmony import */ var _modelcontextprotocol_sdk_client_streamableHttp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @modelcontextprotocol/sdk/client/streamableHttp.js */ "../wp-module-ai-chat/node_modules/@modelcontextprotocol/sdk/dist/esm/client/streamableHttp.js");
/* harmony import */ var _utils_restApi_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/restApi.js */ "../wp-module-ai-chat/src/utils/restApi.js");
/**
 * WordPress MCP Client
 *
 * MCP client implementation using the official TypeScript SDK
 * for WordPress integration with JWT authentication.
 * Configurable for use across different modules.
 */

/* eslint-disable no-undef, no-console */





/**
 * Custom error class for MCP operations
 */
class MCPError extends Error {
  constructor(message, code = null, details = null) {
    super(message);
    this.name = "MCPError";
    this.code = code;
    this.details = details;
  }
}

/**
 * WordPress MCP Client class
 *
 * @param {Object} options           Configuration options
 * @param {string} options.configKey - Window config object name (default: 'nfdAIChat')
 */
class WordPressMCPClient {
  constructor(options = {}) {
    this.configKey = options.configKey || "nfdAIChat";
    this.client = null;
    this.transport = null;
    this.connected = false;
    this.tools = [];
    this.resources = [];
    this.eventListeners = new Map();
  }

  /**
   * Get WordPress configuration from global variable
   *
   * @return {Object} WordPress config
   */
  getConfig() {
    const config = typeof window !== "undefined" && window[this.configKey] || {};

    // Get base URL for REST API
    const baseUrl = config.homeUrl || (typeof window !== "undefined" ? window.location.origin : "");

    // Convert wp-json URLs to rest_route format for permalink compatibility
    let restUrl = config.restUrl || "/wp-json/";
    if (restUrl.includes("/wp-json/")) {
      restUrl = (0,_utils_restApi_js__WEBPACK_IMPORTED_MODULE_2__.convertWpJsonToRestRoute)(restUrl, baseUrl);
    } else if (!restUrl.includes("rest_route=")) {
      // If it's not wp-json and not rest_route, assume it needs conversion
      restUrl = (0,_utils_restApi_js__WEBPACK_IMPORTED_MODULE_2__.convertWpJsonToRestRoute)("/wp-json/", baseUrl);
    }

    // Build MCP URL using rest_route format
    let mcpUrl = config.mcpUrl;
    if (!mcpUrl) {
      // Build MCP endpoint URL using rest_route
      mcpUrl = (0,_utils_restApi_js__WEBPACK_IMPORTED_MODULE_2__.buildRestApiUrl)("mcp", "mcp-adapter-default-server", baseUrl);
    } else if (mcpUrl.includes("/wp-json/")) {
      mcpUrl = (0,_utils_restApi_js__WEBPACK_IMPORTED_MODULE_2__.convertWpJsonToRestRoute)(mcpUrl, baseUrl);
    }
    return {
      nonce: config.nonce || "",
      restUrl: restUrl,
      mcpUrl: mcpUrl,
      homeUrl: baseUrl
    };
  }

  /**
   * Add event listener
   *
   * @param {string}   event    Event name
   * @param {Function} listener Callback function
   */
  on(event, listener) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, new Set());
    }
    this.eventListeners.get(event).add(listener);
  }

  /**
   * Remove event listener
   *
   * @param {string}   event    Event name
   * @param {Function} listener Callback function
   */
  off(event, listener) {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.delete(listener);
    }
  }

  /**
   * Emit event to listeners
   *
   * @param {Object} event Event object with type and optional data
   */
  emit(event) {
    const listeners = this.eventListeners.get(event.type);
    if (listeners) {
      listeners.forEach(listener => {
        try {
          listener(event);
        } catch (error) {
          console.error("Error in MCP event listener:", error);
        }
      });
    }
  }

  /**
   * Connect to the MCP server
   *
   * @param {string} serverUrl Optional server URL override
   * @return {Promise<void>}
   */
  async connect(serverUrl = null) {
    try {
      const config = this.getConfig();
      const mcpEndpoint = serverUrl || config.mcpUrl;
      if (!mcpEndpoint) {
        throw new MCPError("MCP endpoint URL not configured");
      }

      // Initialize the MCP Client
      this.client = new _modelcontextprotocol_sdk_client_index_js__WEBPACK_IMPORTED_MODULE_0__.Client({
        name: "nfd-ai-chat-client",
        version: "1.0.0"
      }, {
        capabilities: {}
      });

      // Create HTTP transport
      this.transport = new _modelcontextprotocol_sdk_client_streamableHttp_js__WEBPACK_IMPORTED_MODULE_1__.StreamableHTTPClientTransport(new URL(mcpEndpoint), {
        requestInit: {
          headers: {
            "Content-Type": "application/json"
          }
        }
      });

      // Connect using the SDK
      await this.client.connect(this.transport);
      this.connected = true;
      this.emit({
        type: "connected"
      });
    } catch (error) {
      const mcpError = error instanceof MCPError ? error : new MCPError(`Connection failed: ${error.message}`);
      this.emit({
        type: "error",
        data: mcpError
      });
      throw mcpError;
    }
  }

  /**
   * Initialize the MCP session and load tools/resources
   *
   * @return {Promise<Object>} Initialization result
   */
  async initialize() {
    if (!this.connected) {
      throw new MCPError("Not connected to MCP server");
    }
    try {
      // Load tools and resources
      await Promise.all([this.loadTools(), this.loadResources()]);
      const initResult = {
        protocolVersion: "2025-06-18",
        capabilities: {
          tools: {},
          resources: {},
          prompts: {}
        },
        serverInfo: {
          name: "WordPress MCP Server",
          version: "1.0.0"
        }
      };
      this.emit({
        type: "initialized",
        data: initResult
      });
      return initResult;
    } catch (error) {
      const mcpError = error instanceof MCPError ? error : new MCPError(`Initialization failed: ${error.message}`);
      this.emit({
        type: "error",
        data: mcpError
      });
      throw mcpError;
    }
  }

  /**
   * Normalize input schema to valid JSON Schema object
   *
   * @param {any} schema Raw input schema from MCP
   * @return {Object} Valid JSON Schema object
   */
  normalizeInputSchema(schema) {
    if (!schema || Array.isArray(schema) || typeof schema !== "object" || Object.keys(schema).length === 0) {
      return {
        type: "object",
        properties: {},
        required: []
      };
    }
    return {
      type: schema.type || "object",
      properties: schema.properties || {},
      required: Array.isArray(schema.required) ? schema.required : []
    };
  }

  /**
   * Load available tools from the MCP server
   *
   * @return {Promise<void>}
   */
  async loadTools() {
    try {
      const result = await this.client.listTools();
      this.tools = result.tools.map(tool => ({
        name: tool.name,
        description: tool.description || "",
        inputSchema: this.normalizeInputSchema(tool.inputSchema),
        annotations: tool.annotations || {}
      }));
      this.emit({
        type: "tools_updated",
        data: this.tools
      });
    } catch (error) {
      console.error("Failed to load tools via SDK:", error);
      this.tools = [];
    }
  }

  /**
   * Load available resources from the MCP server
   *
   * @return {Promise<void>}
   */
  async loadResources() {
    try {
      const result = await this.client.listResources();
      this.resources = result.resources.map(resource => ({
        uri: resource.uri,
        name: resource.name || "",
        description: resource.description,
        mimeType: resource.mimeType
      }));
      this.emit({
        type: "resources_updated",
        data: this.resources
      });
    } catch (error) {
      console.error("Failed to load resources via SDK:", error);
      this.resources = [];
    }
  }

  /**
   * List available tools
   *
   * @return {Promise<Array>} List of tools
   */
  async listTools() {
    if (!this.connected) {
      throw new MCPError("Not connected to MCP server");
    }
    return this.tools;
  }

  /**
   * Call a tool on the MCP server
   *
   * @param {string} name Tool name
   * @param {Object} args Tool arguments
   * @return {Promise<Object>} Tool result
   */
  async callTool(name, args = {}) {
    if (!this.connected) {
      throw new MCPError("Not connected to MCP server");
    }
    try {
      const result = await this.client.callTool({
        name,
        arguments: args
      });
      return {
        content: Array.isArray(result.content) ? result.content : [],
        isError: Boolean(result.isError),
        meta: result.meta || {}
      };
    } catch (error) {
      console.error(`Tool "${name}" call failed:`, error);
      const mcpError = error instanceof MCPError ? error : new MCPError(`Tool call failed: ${error.message}`);
      this.emit({
        type: "error",
        data: mcpError
      });
      throw mcpError;
    }
  }

  /**
   * List available resources
   *
   * @return {Promise<Array>} List of resources
   */
  async listResources() {
    if (!this.connected) {
      throw new MCPError("Not connected to MCP server");
    }
    return this.resources;
  }

  /**
   * Read a resource from the MCP server
   *
   * @param {string} uri Resource URI
   * @return {Promise<Object>} Resource content
   */
  async readResource(uri) {
    if (!this.connected) {
      throw new MCPError("Not connected to MCP server");
    }
    try {
      return await this.client.readResource({
        uri
      });
    } catch (error) {
      console.error(`Resource "${uri}" read failed:`, error);
      const mcpError = error instanceof MCPError ? error : new MCPError(`Resource read failed: ${error.message}`);
      this.emit({
        type: "error",
        data: mcpError
      });
      throw mcpError;
    }
  }

  /**
   * Disconnect from the MCP server
   *
   * @return {Promise<void>}
   */
  async disconnect() {
    try {
      if (this.transport) {
        await this.client.close();
        this.transport = null;
      }
      this.connected = false;
      this.tools = [];
      this.resources = [];
      this.emit({
        type: "disconnected"
      });
    } catch (error) {
      console.error("Error during SDK disconnect:", error);
    }
  }

  /**
   * Check if connected to MCP server
   *
   * @return {boolean} Connection status
   */
  isConnected() {
    return this.connected;
  }

  /**
   * Get cached tools
   *
   * @return {Array} List of tools
   */
  getTools() {
    return [...this.tools];
  }

  /**
   * Get cached resources
   *
   * @return {Array} List of resources
   */
  getResources() {
    return [...this.resources];
  }

  /**
   * Check if a tool is read-only
   *
   * @param {string} toolName Tool name to check
   * @return {boolean} True if read-only
   */
  isToolReadOnly(toolName) {
    const tool = this.tools.find(t => t.name === toolName);
    if (!tool) {
      return true;
    }
    return tool.annotations?.readonly === true || tool.annotations?.readOnlyHint === true;
  }

  /**
   * Convert all tools to OpenAI functions format
   *
   * @return {Array} OpenAI tools array
   */
  getToolsForOpenAI() {
    return this.tools.map(tool => {
      const parameters = this.normalizeInputSchema(tool.inputSchema);
      return {
        type: "function",
        function: {
          name: tool.name,
          description: tool.description || "",
          parameters
        }
      };
    });
  }
}

/**
 * Create a new MCP client instance
 *
 * @param {Object} options Configuration options
 * @return {WordPressMCPClient} New client instance
 */
const createMCPClient = (options = {}) => {
  return new WordPressMCPClient(options);
};

// Default singleton instance for backwards compatibility
const mcpClient = new WordPressMCPClient();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mcpClient);

/***/ }),

/***/ "../wp-module-ai-chat/src/services/openaiClient.js":
/*!*********************************************************!*\
  !*** ../wp-module-ai-chat/src/services/openaiClient.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CloudflareOpenAIClient: () => (/* binding */ CloudflareOpenAIClient),
/* harmony export */   OpenAIError: () => (/* binding */ OpenAIError),
/* harmony export */   createOpenAIClient: () => (/* binding */ createOpenAIClient),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openaiClient: () => (/* binding */ openaiClient)
/* harmony export */ });
/* harmony import */ var openai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! openai */ "../wp-module-ai-chat/node_modules/openai/index.mjs");
/* harmony import */ var _utils_restApi_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/restApi.js */ "../wp-module-ai-chat/src/utils/restApi.js");
/* eslint-disable no-console */
/**
 * OpenAI Client that proxies requests through WordPress REST API
 *
 * This client uses the OpenAI SDK configured to route requests through
 * the WordPress proxy endpoint, which then forwards to Cloudflare AI Gateway
 * or direct OpenAI API.
 *
 * Configurable for use across different modules.
 */


const DEFAULT_MODEL = "gpt-4o-mini";

/**
 * Custom error class for OpenAI errors
 */
class OpenAIError extends Error {
  constructor(message, status = null, code = null) {
    super(message);
    this.name = "OpenAIError";
    this.status = status;
    this.code = code;
  }
}

/**
 * OpenAI client that proxies requests through WordPress REST API
 *
 * @param {Object} options           Configuration options
 * @param {string} options.configKey - Window config object name (default: 'nfdAIChat')
 * @param {string} options.apiPath   - REST API path suffix (default: 'ai')
 * @param {string} options.mode      - Mode for system prompt selection (default: 'help')
 */
class CloudflareOpenAIClient {
  constructor(options = {}) {
    this.configKey = options.configKey || "nfdAIChat";
    this.apiPath = options.apiPath || "ai";
    this.mode = options.mode || "help";
    this.openai = null;
    this.config = null;
  }

  /**
   * Get configuration from WordPress
   *
   * @return {Object} Configuration object
   */
  getConfig() {
    if (this.config) {
      return this.config;
    }

    // Get config from WordPress localized script
    if (typeof window !== "undefined" && window[this.configKey]) {
      const baseUrl = window[this.configKey].homeUrl || window.location.origin;
      let restUrl = window[this.configKey].restUrl || "/wp-json/";

      // Convert wp-json URLs to rest_route format for permalink compatibility
      if (restUrl.includes("/wp-json/")) {
        restUrl = (0,_utils_restApi_js__WEBPACK_IMPORTED_MODULE_1__.convertWpJsonToRestRoute)(restUrl, baseUrl);
      } else if (!restUrl.includes("rest_route=")) {
        // If it's not wp-json and not rest_route, assume it needs conversion
        restUrl = (0,_utils_restApi_js__WEBPACK_IMPORTED_MODULE_1__.convertWpJsonToRestRoute)("/wp-json/", baseUrl);
      }
      this.config = {
        nonce: window[this.configKey].nonce,
        restUrl: restUrl,
        homeUrl: baseUrl
      };
    } else {
      this.config = {
        nonce: "",
        restUrl: "",
        homeUrl: ""
      };
    }
    return this.config;
  }

  /**
   * Initialize the OpenAI client
   *
   * @return {OpenAI} OpenAI client instance
   */
  getOpenAIClient() {
    if (this.openai) {
      return this.openai;
    }
    const config = this.getConfig();

    // Use WordPress proxy endpoint - all authentication handled server-side
    this.openai = new openai__WEBPACK_IMPORTED_MODULE_0__["default"]({
      apiKey: "proxy",
      // Dummy key - real key is on the server
      baseURL: `${config.restUrl}${this.apiPath}`,
      dangerouslyAllowBrowser: true,
      defaultHeaders: {
        "X-WP-Nonce": config.nonce
      }
    });
    return this.openai;
  }

  /**
   * Create a chat completion request (non-streaming)
   *
   * @param {Object} request Chat completion request params
   * @return {Promise<Object>} Chat completion response
   */
  async createChatCompletion(request) {
    try {
      const openai = this.getOpenAIClient();
      const response = await openai.chat.completions.create({
        model: request.model || DEFAULT_MODEL,
        messages: request.messages,
        tools: request.tools,
        tool_choice: request.tool_choice,
        stream: false,
        max_tokens: request.max_tokens,
        temperature: request.temperature,
        mode: request.mode || this.mode
      });
      return response;
    } catch (error) {
      throw new OpenAIError(error.message || "OpenAI API request failed", error.status, error.code);
    }
  }

  /**
   * Create a streaming chat completion
   *
   * @param {Object}   request    Chat completion request params
   * @param {Function} onChunk    Callback for each chunk
   * @param {Function} onComplete Callback when complete
   * @param {Function} onError    Callback for errors
   * @return {Promise<void>}
   */
  async createStreamingCompletion(request, onChunk, onComplete, onError) {
    try {
      const openai = this.getOpenAIClient();
      const stream = await openai.chat.completions.create({
        ...request,
        messages: request.messages,
        stream: true,
        mode: request.mode || this.mode
      });
      let fullMessage = "";
      const toolCallsInProgress = {};
      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta;
        if (delta?.content) {
          fullMessage += delta.content;
          onChunk({
            type: "content",
            content: delta.content
          });
        }

        // Handle streaming tool calls
        if (delta?.tool_calls) {
          for (const toolCall of delta.tool_calls) {
            const index = toolCall.index;
            if (!toolCallsInProgress[index]) {
              toolCallsInProgress[index] = {
                id: toolCall.id || "",
                type: "function",
                function: {
                  name: toolCall.function?.name || "",
                  arguments: ""
                }
              };
            }
            if (toolCall.id) {
              toolCallsInProgress[index].id = toolCall.id;
            }
            if (toolCall.function?.name) {
              toolCallsInProgress[index].function.name = toolCall.function.name;
            }
            if (toolCall.function?.arguments) {
              toolCallsInProgress[index].function.arguments += toolCall.function.arguments;
            }
          }
          onChunk({
            type: "tool_calls",
            tool_calls: Object.values(toolCallsInProgress)
          });
        }
        if (chunk.choices[0]?.finish_reason) {
          // Convert tool calls to final format
          const finalToolCalls = Object.values(toolCallsInProgress).map(tc => ({
            id: tc.id,
            name: tc.function.name,
            arguments: tc.function.arguments ? JSON.parse(tc.function.arguments) : {}
          }));

          // Await onComplete in case it's async
          await onComplete(fullMessage, finalToolCalls.length > 0 ? finalToolCalls : null);
          break;
        }
      }
    } catch (error) {
      onError(new OpenAIError(error.message || "Streaming request failed", error.status, error.code));
    }
  }

  /**
   * Convert chat messages to OpenAI format
   *
   * @param {Array} messages Array of chat messages
   * @return {Array} OpenAI formatted messages
   */
  convertMessagesToOpenAI(messages) {
    const openaiMessages = [];
    for (const message of messages) {
      if (message.role === "system" || message.role === "user") {
        var _message$content;
        openaiMessages.push({
          role: message.role,
          content: (_message$content = message.content) !== null && _message$content !== void 0 ? _message$content : ""
        });
      } else if (message.role === "assistant") {
        var _message$content2, _message$content3;
        const hasToolCalls = message.toolCalls && message.toolCalls.length > 0;
        const hasContent = message.content !== null && message.content !== undefined && message.content !== "";

        // Skip invalid assistant messages
        if (!hasContent && !hasToolCalls) {
          console.warn("Skipping invalid assistant message with no content and no tool calls");
          continue;
        }
        const assistantMessage = {
          role: "assistant",
          content: hasToolCalls ? (_message$content2 = message.content) !== null && _message$content2 !== void 0 ? _message$content2 : null : (_message$content3 = message.content) !== null && _message$content3 !== void 0 ? _message$content3 : ""
        };
        if (hasToolCalls) {
          assistantMessage.tool_calls = message.toolCalls.map(call => ({
            id: call.id,
            type: "function",
            function: {
              name: call.name,
              arguments: typeof call.arguments === "string" ? call.arguments : JSON.stringify(call.arguments)
            }
          }));
        }
        openaiMessages.push(assistantMessage);

        // Add tool results if present
        if (hasToolCalls && message.toolResults && message.toolResults.length > 0) {
          for (const result of message.toolResults) {
            const hasMatchingCall = message.toolCalls.some(call => call.id === result.id);
            if (hasMatchingCall) {
              openaiMessages.push({
                role: "tool",
                content: result.error || JSON.stringify(result.result),
                tool_call_id: result.id
              });
            }
          }
        }
      }
    }
    return openaiMessages;
  }

  /**
   * Convert MCP tools to OpenAI tools format
   *
   * @param {Array} mcpTools Array of MCP tools
   * @return {Array} OpenAI tools array
   */
  convertMCPToolsToOpenAI(mcpTools) {
    return mcpTools.map(tool => ({
      type: "function",
      function: {
        name: tool.name,
        description: tool.description,
        parameters: tool.inputSchema
      }
    }));
  }

  /**
   * Process tool calls from OpenAI response
   *
   * @param {Array} toolCalls Raw tool calls from OpenAI
   * @return {Array} Processed tool calls
   */
  processToolCalls(toolCalls) {
    return toolCalls.map(call => ({
      id: call.id,
      name: call.function.name,
      arguments: JSON.parse(call.function.arguments || "{}")
    }));
  }

  /**
   * Send a simple chat message
   *
   * @param {string} message User message
   * @param {Array}  context Previous messages for context
   * @param {Array}  tools   Available MCP tools
   * @return {Promise<Object>} Response with message and optional tool calls
   */
  async sendMessage(message, context = [], tools = []) {
    const messages = this.convertMessagesToOpenAI([...context, {
      id: `user-${Date.now()}`,
      role: "user",
      content: message,
      timestamp: new Date()
    }]);
    const request = {
      model: DEFAULT_MODEL,
      messages,
      tools: tools.length > 0 ? this.convertMCPToolsToOpenAI(tools) : undefined,
      tool_choice: tools.length > 0 ? "auto" : undefined,
      temperature: 0.7,
      max_tokens: 2000
    };
    try {
      const response = await this.createChatCompletion(request);
      const choice = response.choices[0];
      if (!choice) {
        throw new OpenAIError("No response from OpenAI");
      }
      const result = {
        message: choice.message.content || ""
      };
      if (choice.message.tool_calls) {
        result.toolCalls = this.processToolCalls(choice.message.tool_calls);
      }
      return result;
    } catch (error) {
      if (error instanceof OpenAIError) {
        throw error;
      }
      throw new OpenAIError(`Failed to send message: ${error}`);
    }
  }
}

/**
 * Create a new OpenAI client instance
 *
 * @param {Object} options Configuration options
 * @return {CloudflareOpenAIClient} New client instance
 */
const createOpenAIClient = (options = {}) => {
  return new CloudflareOpenAIClient(options);
};

// Default singleton instance for backwards compatibility
const openaiClient = new CloudflareOpenAIClient();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (openaiClient);

/***/ }),

/***/ "../wp-module-ai-chat/src/styles/_approval-dialog.scss":
/*!*************************************************************!*\
  !*** ../wp-module-ai-chat/src/styles/_approval-dialog.scss ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../wp-module-ai-chat/src/styles/app.scss":
/*!************************************************!*\
  !*** ../wp-module-ai-chat/src/styles/app.scss ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../wp-module-ai-chat/src/svg/blu-logo.svg":
/*!*************************************************!*\
  !*** ../wp-module-ai-chat/src/svg/blu-logo.svg ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: () => (/* binding */ SvgBluLogo),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

var SvgBluLogo = function SvgBluLogo(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 20,
    height: 20,
    fill: "none"
  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "currentColor",
    d: "M18.839 6.74V2h-4.704v4.74zm0 1.39v4.74h-4.704V8.13zM6.701 19v-4.74H2V19zm6.068-4.74V19H8.066v-4.74zm6.069 0V19h-4.704v-4.74zm-6.069-1.39V8.13H8.066v4.74zM6.702 8.13v4.74H2V8.13zM12.767 2v4.74h-4.7V2zM6.702 6.74V2H2v4.74z"
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZwoJd2lkdGg9IjIwIgoJaGVpZ2h0PSIyMCIKCXZpZXdCb3g9IjAgMCAyMCAyMCIKCWZpbGw9Im5vbmUiCgl4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCj4KCTxwYXRoCgkJZmlsbFJ1bGU9ImV2ZW5vZGQiCgkJY2xpcFJ1bGU9ImV2ZW5vZGQiCgkJZD0iTTE4LjgzODUgNi43Mzk0NlYySDE0LjEzNDVWNi43Mzk0NkgxOC44Mzg1Wk0xOC44Mzg1IDguMTI5OTJWMTIuODcwMUgxNC4xMzQ1VjguMTI5OTJIMTguODM4NVpNNi43MDE5MiAxOVYxNC4yNTk4SDJWMTlINi43MDE5MlpNMTIuNzcwMiAxNC4yNTk4VjE5SDguMDY2MTdWMTQuMjU5OEgxMi43NzAyWk0xOC44Mzg1IDE0LjI1OThWMTlIMTQuMTM0NVYxNC4yNTk4SDE4LjgzODVaTTEyLjc3MDIgMTIuODcwMVY4LjEyOTkySDguMDY2MTdWMTIuODcwMUgxMi43NzAyWk02LjcwMTkyIDguMTI5OTJWMTIuODcwMUgyVjguMTI5OTJINi43MDE5MlpNMTIuNzY2NyAyVjYuNzM5NDZIOC4wNjYxN1YySDEyLjc2NjdaTTYuNzAxOTIgNi43Mzk0NlYySDJWNi43Mzk0Nkg2LjcwMTkyWiIKCQlmaWxsPSJjdXJyZW50Q29sb3IiCgkvPgo8L3N2Zz4K");

/***/ }),

/***/ "../wp-module-ai-chat/src/utils/helpers.js":
/*!*************************************************!*\
  !*** ../wp-module-ai-chat/src/utils/helpers.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   debounce: () => (/* binding */ debounce),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   generateSessionId: () => (/* binding */ generateSessionId),
/* harmony export */   simpleHash: () => (/* binding */ simpleHash)
/* harmony export */ });
/**
 * Simple hash function to create a unique identifier from a string
 * Uses a variation of the djb2 hash algorithm
 *
 * @param {string} str - The string to hash
 * @return {string} A hexadecimal hash string
 */
const simpleHash = str => {
  // Handle null, undefined, or empty strings
  if (!str || typeof str !== "string") {
    return "0";
  }
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    // eslint-disable-next-line no-bitwise
    hash = (hash << 5) + hash + str.charCodeAt(i); // hash * 33 + c
    // eslint-disable-next-line no-bitwise
    hash = hash | 0; // Convert to 32-bit integer
  }
  // Convert to unsigned and then to hex
  // eslint-disable-next-line no-bitwise
  return (hash >>> 0).toString(16);
};

/**
 * Generate a unique session ID
 *
 * @return {string} New session ID
 */
const generateSessionId = () => {
  return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
};

/**
 * Debounce function
 *
 * @param {Function} func - Function to debounce
 * @param {number}   wait - Wait time in milliseconds
 * @return {Function} Debounced function
 */
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  simpleHash,
  generateSessionId,
  debounce
});

/***/ }),

/***/ "../wp-module-ai-chat/src/utils/markdownParser.js":
/*!********************************************************!*\
  !*** ../wp-module-ai-chat/src/utils/markdownParser.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   containsMarkdown: () => (/* binding */ containsMarkdown),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   parseMarkdown: () => (/* binding */ parseMarkdown)
/* harmony export */ });
/**
 * Simple Markdown Parser
 *
 * Converts common markdown syntax to HTML for chat messages.
 * Handles: headers, bold, italic, code, lists, links, and line breaks.
 */

/**
 * Check if a string contains markdown syntax
 *
 * @param {string} text - The text to check
 * @return {boolean} True if markdown is detected
 */
function containsMarkdown(text) {
  if (!text || typeof text !== "string") {
    return false;
  }

  // Check for common markdown patterns
  const markdownPatterns = [/^#{1,6}\s/m,
  // Headers
  /\*\*[^*]+\*\*/,
  // Bold
  /\*[^*]+\*/,
  // Italic
  /__[^_]+__/,
  // Bold (underscore)
  /_[^_]+_/,
  // Italic (underscore)
  /`[^`]+`/,
  // Inline code
  /```[\s\S]*?```/,
  // Code blocks
  /^\s*[-*+]\s/m,
  // Unordered lists
  /^\s*\d+\.\s/m,
  // Ordered lists
  /\[([^\]]+)\]\(([^)]+)\)/ // Links
  ];
  return markdownPatterns.some(pattern => pattern.test(text));
}

/**
 * Parse markdown text to HTML
 *
 * @param {string} text - The markdown text to parse
 * @return {string} HTML string
 */
function parseMarkdown(text) {
  if (!text || typeof text !== "string") {
    return "";
  }
  let html = text;

  // Escape HTML entities first (but preserve existing HTML)
  html = html.replace(/&(?![\w#]+;)/g, "&amp;").replace(/<(?![a-zA-Z/])/g, "&lt;").replace(/(?<![a-zA-Z"])>/g, "&gt;");

  // Code blocks (``` ... ```) - must be done before other processing
  html = html.replace(/```(\w*)\n?([\s\S]*?)```/g, (match, lang, code) => {
    const escapedCode = code.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return `<pre><code class="language-${lang || "plaintext"}">${escapedCode}</code></pre>`;
  });

  // Inline code (` ... `)
  html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

  // Headers (### ... )
  html = html.replace(/^######\s+(.+)$/gm, '<h6 class="chat-h6">$1</h6>');
  html = html.replace(/^#####\s+(.+)$/gm, '<h5 class="chat-h5">$1</h5>');
  html = html.replace(/^####\s+(.+)$/gm, '<h4 class="chat-h4">$1</h4>');
  html = html.replace(/^###\s+(.+)$/gm, '<h3 class="chat-h3">$1</h3>');
  html = html.replace(/^##\s+(.+)$/gm, '<h2 class="chat-h2">$1</h2>');
  html = html.replace(/^#\s+(.+)$/gm, '<h1 class="chat-h1">$1</h1>');

  // Bold (**text** or __text__)
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/__([^_]+)__/g, "<strong>$1</strong>");

  // Italic (*text* or _text_) - but not inside URLs or code
  html = html.replace(/(?<![*_])\*(?!\*)([^*\n]+)(?<!\*)\*(?!\*)/g, "<em>$1</em>");
  html = html.replace(/(?<![_*])_(?!_)([^_\n]+)(?<!_)_(?!_)/g, "<em>$1</em>");

  // Links [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Unordered lists - collect consecutive list items
  html = html.replace(/^(\s*)[-*+]\s+(.+)$/gm, (match, indent, content) => {
    const level = Math.floor(indent.length / 2);
    return `<li class="chat-li" data-level="${level}">${content}</li>`;
  });

  // Wrap consecutive list items in <ul>
  html = html.replace(/((?:<li[^>]*>.*?<\/li>\s*)+)/g, match => {
    const cleanedItems = match.replace(/(<\/li>)\s+(<li)/g, "$1$2");
    return `<ul class="chat-ul">${cleanedItems}</ul>`;
  });

  // Ordered lists
  html = html.replace(/^(\s*)\d+\.\s+(.+)$/gm, (match, indent, content) => {
    const level = Math.floor(indent.length / 2);
    return `<oli class="chat-oli" data-level="${level}">${content}</oli>`;
  });

  // Wrap consecutive ordered list items in <ol>
  html = html.replace(/((?:<oli[^>]*>.*?<\/oli>\s*)+)/g, match => {
    const cleanedItems = match.replace(/(<\/oli>)\s+(<oli)/g, "$1$2").replace(/<\/?oli/g, m => m.replace("oli", "li"));
    return `<ol class="chat-ol">${cleanedItems}</ol>`;
  });

  // Horizontal rules
  html = html.replace(/^---+$/gm, '<hr class="chat-hr" />');

  // Blockquotes
  html = html.replace(/^>\s+(.+)$/gm, '<blockquote class="chat-blockquote">$1</blockquote>');

  // Paragraphs - wrap text blocks that aren't already wrapped
  const blocks = html.split(/\n\n+/);
  html = blocks.map(block => {
    const trimmed = block.trim();
    if (trimmed.startsWith("<h") || trimmed.startsWith("<ul") || trimmed.startsWith("<ol") || trimmed.startsWith("<pre") || trimmed.startsWith("<blockquote") || trimmed.startsWith("<hr") || trimmed.startsWith("<p")) {
      return trimmed;
    }
    if (trimmed) {
      return `<p class="chat-p">${trimmed}</p>`;
    }
    return "";
  }).filter(Boolean).join("");

  // Convert single line breaks within paragraphs to <br>
  html = html.replace(/<p([^>]*)>([\s\S]*?)<\/p>/g, (match, attrs, content) => {
    const processedContent = content.trim().replace(/\n/g, "<br>");
    return `<p${attrs}>${processedContent}</p>`;
  });

  // Clean up stray <br> tags between block elements
  html = html.replace(/<br\s*\/?>\s*(<\/?(ul|ol|li|p|h[1-6]|pre|blockquote|hr))/gi, "$1");
  html = html.replace(/(<\/(ul|ol|li|p|h[1-6]|pre|blockquote)>)\s*<br\s*\/?>/gi, "$1");

  // Remove empty paragraphs
  html = html.replace(/<p[^>]*>\s*<\/p>/g, "");

  // Clean up multiple consecutive <br> tags
  html = html.replace(/(<br\s*\/?>){2,}/g, "<br>");
  return html;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  containsMarkdown,
  parseMarkdown
});

/***/ }),

/***/ "../wp-module-ai-chat/src/utils/messageUtils.js":
/*!******************************************************!*\
  !*** ../wp-module-ai-chat/src/utils/messageUtils.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateSuccessMessage: () => (/* binding */ generateSuccessMessage)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Message Utilities
 * 
 * Utilities for generating user-friendly messages, particularly for tool execution results.
 * Used by approval dialogs and inline approval components.
 */



/**
 * Generate user-friendly success message based on tool name and result
 * 
 * @param {string} toolName Tool name that was executed
 * @param {Object|string} result Tool execution result
 * @returns {string} User-friendly success message
 */
const generateSuccessMessage = (toolName, result) => {
  // Normalize tool name for matching
  const normalizedTool = (toolName || '').toLowerCase();

  // Try to extract title/name from result
  let itemTitle = '';
  if (result && typeof result === 'object') {
    itemTitle = result.title?.rendered || result.title || result.name || '';
  } else if (typeof result === 'string') {
    // Try to parse JSON from string result
    try {
      const parsed = JSON.parse(result);
      itemTitle = parsed.title?.rendered || parsed.title || parsed.name || '';
    } catch (e) {
      // Not JSON, use as-is
    }
  }

  // Generate message based on tool type
  if (normalizedTool.includes('posts-create') || normalizedTool.includes('create-post')) {
    return itemTitle ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(/* translators: %s: post title */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Post "%s" has been created successfully.', 'wp-module-ai-chat'), itemTitle) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Post has been created successfully.', 'wp-module-ai-chat');
  }
  if (normalizedTool.includes('posts-update') || normalizedTool.includes('update-post')) {
    return itemTitle ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(/* translators: %s: post title */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Post "%s" has been updated successfully.', 'wp-module-ai-chat'), itemTitle) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Post has been updated successfully.', 'wp-module-ai-chat');
  }
  if (normalizedTool.includes('posts-delete') || normalizedTool.includes('delete-post')) {
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Post has been deleted successfully.', 'wp-module-ai-chat');
  }
  if (normalizedTool.includes('pages-create') || normalizedTool.includes('create-page')) {
    return itemTitle ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(/* translators: %s: page title */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Page "%s" has been created successfully.', 'wp-module-ai-chat'), itemTitle) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Page has been created successfully.', 'wp-module-ai-chat');
  }
  if (normalizedTool.includes('pages-update') || normalizedTool.includes('update-page')) {
    return itemTitle ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(/* translators: %s: page title */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Page "%s" has been updated successfully.', 'wp-module-ai-chat'), itemTitle) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Page has been updated successfully.', 'wp-module-ai-chat');
  }
  if (normalizedTool.includes('pages-delete') || normalizedTool.includes('delete-page')) {
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Page has been deleted successfully.', 'wp-module-ai-chat');
  }
  if (normalizedTool.includes('media-create') || normalizedTool.includes('upload')) {
    return itemTitle ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(/* translators: %s: media title */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Media "%s" has been uploaded successfully.', 'wp-module-ai-chat'), itemTitle) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Media has been uploaded successfully.', 'wp-module-ai-chat');
  }
  if (normalizedTool.includes('media-delete') || normalizedTool.includes('delete-media')) {
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Media has been deleted successfully.', 'wp-module-ai-chat');
  }
  if (normalizedTool.includes('categories-create') || normalizedTool.includes('create-category')) {
    return itemTitle ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(/* translators: %s: category name */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Category "%s" has been created successfully.', 'wp-module-ai-chat'), itemTitle) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Category has been created successfully.', 'wp-module-ai-chat');
  }
  if (normalizedTool.includes('tags-create') || normalizedTool.includes('create-tag')) {
    return itemTitle ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(/* translators: %s: tag name */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Tag "%s" has been created successfully.', 'wp-module-ai-chat'), itemTitle) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Tag has been created successfully.', 'wp-module-ai-chat');
  }
  if (normalizedTool.includes('users-create') || normalizedTool.includes('create-user')) {
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('User has been created successfully.', 'wp-module-ai-chat');
  }
  if (normalizedTool.includes('comments-create') || normalizedTool.includes('create-comment')) {
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Comment has been created successfully.', 'wp-module-ai-chat');
  }
  if (normalizedTool.includes('settings-update') || normalizedTool.includes('update-settings')) {
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Settings have been updated successfully.', 'wp-module-ai-chat');
  }

  // Generic fallback based on action verb
  if (normalizedTool.includes('create')) {
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Item has been created successfully.', 'wp-module-ai-chat');
  }
  if (normalizedTool.includes('update')) {
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Item has been updated successfully.', 'wp-module-ai-chat');
  }
  if (normalizedTool.includes('delete')) {
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Item has been deleted successfully.', 'wp-module-ai-chat');
  }

  // Default fallback
  return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Action completed successfully.', 'wp-module-ai-chat');
};

/***/ }),

/***/ "../wp-module-ai-chat/src/utils/nfdAgents/greetingUtils.js":
/*!*****************************************************************!*\
  !*** ../wp-module-ai-chat/src/utils/nfdAgents/greetingUtils.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isInitialGreeting: () => (/* binding */ isInitialGreeting)
/* harmony export */ });
/**
 * NFD Agents Greeting Utilities
 * 
 * Utilities for detecting initial greeting messages from agents.
 * Used to filter out system greetings that shouldn't be shown to users.
 */

/**
 * Check if a message is an initial greeting that should be filtered out
 * 
 * @param {string} content Message content to check
 * @returns {boolean} True if message is an initial greeting
 */
const isInitialGreeting = content => {
  if (!content || typeof content !== 'string') {
    return false;
  }
  const normalized = content.toLowerCase().trim();

  // Common greeting patterns - more comprehensive matching
  const greetingPatterns = [/^hello!?\s+how\s+can\s+i\s+assist\s+you/i, /^hi!?\s+how\s+can\s+i\s+help/i, /^hello!?\s+how\s+can\s+i\s+help/i, /^hi\s+there!?\s+how\s+can/i, /^greetings!?\s+how\s+can/i, /^how\s+can\s+i\s+assist\s+you\s+today/i, /^how\s+can\s+i\s+help\s+you\s+today/i,
  // Match "Hello! How can I assist you today? Feel free to ask me anything..."
  /^hello!?\s+how\s+can\s+i\s+assist\s+you\s+today/i, /^hello!?\s+how\s+can\s+i\s+assist\s+you.*feel\s+free/i];

  // Check if message matches greeting patterns
  const isGreeting = greetingPatterns.some(pattern => pattern.test(normalized));

  // Also check for messages that contain greeting keywords and are likely initial greetings
  // This catches variations like "Hello! How can I assist you today? Feel free to ask me anything..."
  const hasGreetingKeywords = normalized.includes('hello') && (normalized.includes('assist') || normalized.includes('help')) && (normalized.includes('today') || normalized.includes('feel free') || normalized.includes('ask'));

  // Check for very short messages that are likely greetings
  const isShortGreeting = normalized.length < 150 && (normalized.includes('hello') && (normalized.includes('assist') || normalized.includes('help')) || normalized.includes('hi') && normalized.includes('help'));
  return isGreeting || hasGreetingKeywords || isShortGreeting;
};

/***/ }),

/***/ "../wp-module-ai-chat/src/utils/nfdAgents/urlUtils.js":
/*!************************************************************!*\
  !*** ../wp-module-ai-chat/src/utils/nfdAgents/urlUtils.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertToWebSocketUrl: () => (/* binding */ convertToWebSocketUrl),
/* harmony export */   isLocalhost: () => (/* binding */ isLocalhost),
/* harmony export */   normalizeUrl: () => (/* binding */ normalizeUrl)
/* harmony export */ });
/**
 * NFD Agents URL Utilities
 * 
 * Utilities for URL normalization and protocol conversion for WebSocket connections.
 * Used for converting HTTP/HTTPS URLs to WebSocket protocols and normalizing site URLs.
 */

/**
 * Convert HTTP/HTTPS URL to WebSocket protocol
 * 
 * @param {string} url HTTP or HTTPS URL
 * @returns {string} WebSocket URL (ws:// or wss://)
 */
const convertToWebSocketUrl = url => {
  if (!url || typeof url !== 'string') {
    return url;
  }
  if (url.startsWith('http://')) {
    return url.replace('http://', 'ws://');
  }
  if (url.startsWith('https://')) {
    return url.replace('https://', 'wss://');
  }

  // If no protocol specified, determine based on localhost
  if (!url.startsWith('ws://') && !url.startsWith('wss://')) {
    return isLocalhost(url) ? `ws://${url}` : `wss://${url}`;
  }
  return url;
};

/**
 * Check if URL is localhost
 * 
 * @param {string} url URL to check
 * @returns {boolean} True if URL is localhost
 */
const isLocalhost = url => {
  if (!url || typeof url !== 'string') {
    return false;
  }
  const normalized = url.toLowerCase();
  return normalized.includes('localhost') || normalized.includes('127.0.0.1');
};

/**
 * Normalize site URL to ensure it has a protocol
 * Adds http:// for localhost, https:// for other URLs
 * 
 * @param {string} siteUrl Site URL to normalize
 * @returns {string} Normalized URL with protocol
 */
const normalizeUrl = siteUrl => {
  if (!siteUrl || typeof siteUrl !== 'string') {
    return siteUrl;
  }

  // If already has protocol, return as-is
  if (siteUrl.match(/^https?:\/\//)) {
    return siteUrl;
  }

  // Check if it's localhost and default to http://
  if (isLocalhost(siteUrl)) {
    return `http://${siteUrl}`;
  }

  // For other URLs, default to https://
  return `https://${siteUrl}`;
};

/***/ }),

/***/ "../wp-module-ai-chat/src/utils/restApi.js":
/*!*************************************************!*\
  !*** ../wp-module-ai-chat/src/utils/restApi.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildRestApiUrl: () => (/* binding */ buildRestApiUrl),
/* harmony export */   convertWpJsonToRestRoute: () => (/* binding */ convertWpJsonToRestRoute),
/* harmony export */   getRestApiBaseUrl: () => (/* binding */ getRestApiBaseUrl)
/* harmony export */ });
/**
 * REST API Utilities
 * 
 * Utilities for constructing WordPress REST API URLs that work
 * regardless of permalink settings.
 */

/**
 * Get the REST API base URL using rest_route parameter
 * This works even when permalinks are not configured properly
 * 
 * @param {string} [baseUrl] Base URL (defaults to current site URL)
 * @return {string} REST API base URL
 */
const getRestApiBaseUrl = (baseUrl = '') => {
  // If baseUrl is provided and already contains rest_route, return as-is
  if (baseUrl && baseUrl.includes('rest_route=')) {
    return baseUrl;
  }

  // Get site URL from window if not provided
  if (!baseUrl && typeof window !== 'undefined') {
    baseUrl = window.location.origin;
  }

  // Use rest_route parameter instead of /wp-json/ path
  // This works regardless of permalink settings
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}rest_route=/`;
};

/**
 * Build a REST API endpoint URL
 * 
 * @param {string} namespace REST API namespace (e.g., 'nfd-agents/chat/v1')
 * @param {string} route REST API route (e.g., 'config')
 * @param {string} [baseUrl] Base URL (defaults to current site URL)
 * @return {string} Full REST API endpoint URL
 */
const buildRestApiUrl = (namespace, route, baseUrl = '') => {
  const restBase = getRestApiBaseUrl(baseUrl);
  const endpoint = `${namespace}/${route}`;

  // If restBase already has rest_route, append to it
  if (restBase.includes('rest_route=')) {
    return restBase.replace('rest_route=/', `rest_route=/${endpoint}`);
  }

  // Otherwise, construct new rest_route parameter
  const separator = restBase.includes('?') ? '&' : '?';
  return `${restBase}${separator}rest_route=/${endpoint}`;
};

/**
 * Convert a wp-json style URL to rest_route format
 * 
 * @param {string} wpJsonUrl URL in format /wp-json/namespace/route
 * @param {string} [baseUrl] Base URL (defaults to current site URL)
 * @return {string} URL with rest_route parameter
 */
const convertWpJsonToRestRoute = (wpJsonUrl, baseUrl = '') => {
  // If already using rest_route, return as-is
  if (wpJsonUrl.includes('rest_route=')) {
    return wpJsonUrl;
  }

  // Extract the path after /wp-json/
  const wpJsonMatch = wpJsonUrl.match(/\/wp-json\/(.+)$/);
  if (!wpJsonMatch) {
    // Not a wp-json URL, return as-is
    return wpJsonUrl;
  }
  const endpoint = wpJsonMatch[1];

  // Get base URL
  if (!baseUrl && typeof window !== 'undefined') {
    baseUrl = window.location.origin;
  }

  // Remove /wp-json/ from baseUrl if present
  const cleanBaseUrl = baseUrl.replace(/\/wp-json\/?$/, '');

  // Build rest_route URL
  const separator = cleanBaseUrl.includes('?') ? '&' : '?';
  return `${cleanBaseUrl}${separator}rest_route=/${endpoint}`;
};

/***/ }),

/***/ "../wp-module-ai-chat/src/utils/sanitizeHtml.js":
/*!******************************************************!*\
  !*** ../wp-module-ai-chat/src/utils/sanitizeHtml.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   containsHtml: () => (/* binding */ containsHtml),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   sanitizeHtml: () => (/* binding */ sanitizeHtml)
/* harmony export */ });
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dompurify */ "../wp-module-ai-chat/node_modules/dompurify/dist/purify.es.mjs");
/**
 * External dependencies
 */


/**
 * Sanitize HTML content using DOMPurify to prevent XSS attacks
 *
 * @param {string} html - The HTML string to sanitize.
 * @return {string} The sanitized HTML string.
 */
const sanitizeHtml = html => {
  return dompurify__WEBPACK_IMPORTED_MODULE_0__["default"].sanitize(html, {
    ALLOWED_TAGS: ["section", "div", "h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "strong", "em", "b", "i", "u", "s", "mark", "small", "sub", "sup", "a", "br", "ul", "ol", "li", "dl", "dt", "dd", "blockquote", "code", "pre", "table", "thead", "tbody", "tr", "th", "td", "hr", "address", "time"],
    ALLOWED_ATTR: ["style", "class", "id", "href", "datetime", "target", "rel"],
    ALLOW_DATA_ATTR: false,
    FORBID_TAGS: ["script", "object", "embed", "iframe", "form", "fieldset", "legend", "label", "input", "textarea", "select", "option", "button", "details", "summary", "progress", "meter"],
    FORBID_ATTR: ["onerror", "onload", "onclick", "onmouseover", "onfocus", "onblur"]
  });
};

/**
 * Check if content contains HTML tags
 *
 * @param {string} content - The content to check.
 * @return {boolean} True if content contains HTML tags.
 */
const containsHtml = content => {
  return /<[a-z][\s\S]*>/i.test(content);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  sanitizeHtml,
  containsHtml
});

/***/ }),

/***/ "./src/components/ChatHistoryList.jsx":
/*!********************************************!*\
  !*** ./src/components/ChatHistoryList.jsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _icons_reload_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../icons/reload.svg */ "./src/icons/reload.svg");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
/**
 * Chat History List Component
 * 
 * Displays previous chat sessions from localStorage, similar to the old help center history.
 * Shows the last 3 chat conversations with the first user message as the title.
 */





const STORAGE_KEY = 'nfd-ai-chat-help_center-history';
const CONVERSATION_STORAGE_KEY = 'nfd-ai-chat-help_center-conversation-id';
const MAX_HISTORY_ITEMS = 3;

/**
 * Extract conversation sessions from stored messages
 * Groups messages by conversation boundaries (gaps in time or new conversation starts)
 */
const extractConversations = messages => {
  if (!Array.isArray(messages) || messages.length === 0) {
    return [];
  }
  const conversations = [];
  let currentConversation = [];
  let lastTimestamp = null;

  // Group messages into conversations based on time gaps (> 5 minutes) or conversation boundaries
  messages.forEach((msg, index) => {
    const msgTimestamp = msg.timestamp ? new Date(msg.timestamp).getTime() : Date.now();

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
 */
const getConversationTitle = conversation => {
  const firstUserMessage = conversation.find(msg => msg.role === 'user' || msg.type === 'user');
  if (firstUserMessage && firstUserMessage.content) {
    const content = firstUserMessage.content;
    // Truncate if too long
    return content.length > 50 ? content.substring(0, 50) + '...' : content;
  }
  return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Previous conversation', 'wp-module-help-center');
};
const ChatHistoryList = ({
  onSelectConversation
}) => {
  const [conversations, setConversations] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    try {
      const storedMessages = localStorage.getItem(STORAGE_KEY);
      if (storedMessages) {
        const parsedMessages = JSON.parse(storedMessages);
        if (Array.isArray(parsedMessages) && parsedMessages.length > 0) {
          // Convert timestamp strings back to Date objects
          const messages = parsedMessages.map(msg => ({
            ...msg,
            timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date()
          }));
          const extractedConversations = extractConversations(messages);
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
  const handleHistoryClick = conversation => {
    // Restore the conversation by writing it to localStorage
    try {
      // Convert Date objects back to strings for localStorage
      const messagesToStore = conversation.map(msg => ({
        ...msg,
        timestamp: msg.timestamp instanceof Date ? msg.timestamp.toISOString() : msg.timestamp
      }));

      // Write conversation to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messagesToStore));

      // Set a flag to indicate we want to load history on next mount
      localStorage.setItem('nfd-ai-chat-help_center-load-history', 'true');

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
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
    className: "nfd-help-center-chat__history-list",
    children: conversations.map((conversation, index) => {
      const title = getConversationTitle(conversation);
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "nfd-help-center-chat__history-item",
        role: "button",
        tabIndex: 0,
        onClick: () => handleHistoryClick(conversation),
        onKeyDown: e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleHistoryClick(conversation);
          }
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_icons_reload_svg__WEBPACK_IMPORTED_MODULE_2__.ReactComponent, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
          children: title
        })]
      }, index);
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChatHistoryList);

/***/ }),

/***/ "./src/components/HelpCenterChatAI.jsx":
/*!*********************************************!*\
  !*** ./src/components/HelpCenterChatAI.jsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _newfold_labs_wp_module_ai_chat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @newfold-labs/wp-module-ai-chat */ "../wp-module-ai-chat/src/index.js");
/* harmony import */ var _Footer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Footer */ "./src/components/Footer.js");
/* harmony import */ var _ResultList_NoResults__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ResultList/NoResults */ "./src/components/ResultList/NoResults.js");
/* harmony import */ var _ChatHistoryList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ChatHistoryList */ "./src/components/ChatHistoryList.jsx");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _hooks_useHelpVisibility__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../hooks/useHelpVisibility */ "./src/hooks/useHelpVisibility.js");
/* harmony import */ var _hooks_useHelpCenterState__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../hooks/useHelpCenterState */ "./src/hooks/useHelpCenterState.js");
/* harmony import */ var _hooks_useTypingAnimation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../hooks/useTypingAnimation */ "./src/hooks/useTypingAnimation.js");
/* harmony import */ var _utils_footerUtils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/footerUtils */ "./src/utils/footerUtils.js");
/* harmony import */ var _newfold_labs_wp_module_ai_chat_styles_app__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @newfold-labs/wp-module-ai-chat/styles/app */ "../wp-module-ai-chat/src/styles/app.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__);
/**
 * AI Help Center Chat Component
 *
 * Contains all AI chat functionality from wp-module-ai-chat.
 * Only loaded when canAccessAIHelpCenter capability is enabled.
 */


 // Support banner component
 // Fallback for errors
 // Chat history component







// Import AI chat styles. The wp-module-ai-chat package exports ./styles/app.
// This import only executes when this component is loaded (capability enabled).
// eslint-disable-next-line import/no-unresolved -- package resolved at build time (github: or file:)


const HelpCenterChatAI = () => {
  const [isVisible] = (0,_hooks_useHelpVisibility__WEBPACK_IMPORTED_MODULE_6__.useHelpVisibility)();
  const {
    hasLaunchedFromTooltip
  } = (0,_hooks_useHelpCenterState__WEBPACK_IMPORTED_MODULE_7__.useHelpCenterState)();
  const hasShownWelcomeRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useRef)(false);
  const [showFallback, setShowFallback] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(false);

  // Typing animation for connecting state
  const connectingText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Connecting…', 'wp-module-help-center');

  // Check if we should load history (set when user clicks on history item)
  const shouldLoadHistory = (() => {
    try {
      const loadFlag = localStorage.getItem('nfd-ai-chat-help_center-load-history');
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
    brandId
  } = (0,_newfold_labs_wp_module_ai_chat__WEBPACK_IMPORTED_MODULE_0__.useNfdAgentsWebSocket)({
    // Pass REST API path directly - useNfdAgentsWebSocket uses apiFetch internally
    // which handles permalinks and rest_route automatically
    configEndpoint: '/nfd-agents/chat/v1/config',
    storageNamespace: 'help_center',
    autoConnect: isVisible,
    // Capability already checked by parent component
    consumerType: 'help_center',
    // Pass consumer type to construct consumer=wordpress_help_center
    autoLoadHistory: shouldLoadHistory // Load history if user selected a history item
  });

  // Animate connecting text character-by-character for more engaging UX
  const animatedConnectingText = (0,_hooks_useTypingAnimation__WEBPACK_IMPORTED_MODULE_8__.useTypingAnimation)(connectingText, {
    speed: 80,
    enabled: isConnecting,
    loop: true,
    loopDelay: 500
  });

  // Show fallback NoResults component for any error instead of error alerts
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    if (error) {
      setShowFallback(true);
    } else {
      setShowFallback(false);
    }
  }, [error]);
  const handleApproval = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(() => {
    if (updateMessage) {
      updateMessage(msg => msg.type === 'approval_request' && msg.approvalRequest, msg => ({
        ...msg,
        type: 'assistant',
        content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Action approved and executed.', 'wp-module-help-center'),
        approvalRequest: null
      }));
    }
    clearApprovalRequest();
  }, [clearApprovalRequest, updateMessage]);

  /**
   * Handle rejection
   */
  const handleRejection = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(() => {
    // Update the approval message in messages array to show it was cancelled
    if (updateMessage) {
      updateMessage(msg => msg.type === 'approval_request' && msg.approvalRequest, msg => {
        const toolName = msg.approvalRequest?.tool_name || 'action';
        return {
          ...msg,
          type: 'assistant',
          content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.sprintf)(/* translators: %s: the name of the action or tool that was cancelled */
          (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Action "%s" was cancelled.', 'wp-module-help-center'), toolName),
          approvalRequest: null
        };
      });
    }
    clearApprovalRequest();
  }, [clearApprovalRequest, updateMessage]);

  /**
   * Handle clear chat button click
   */
  const handleClearChat = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(() => {
    if (
    // eslint-disable-next-line no-alert -- Planned to replace with ConfirmDialog later.
    window.confirm((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Are you sure you want to clear the chat? This will start a new conversation.', 'wp-module-help-center'))) {
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
      timestamp: new Date()
    });
  }

  // Show welcome screen when no messages and we haven't yet switched to chat view.
  // Omit !isConnecting so we don't flash to empty ChatMessages while the WebSocket is connecting.
  const showWelcome = displayMessages.length === 0 && !hasShownWelcomeRef.current;

  // Track when we've shown messages so welcome doesn't flicker back
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    if (displayMessages.length > 0) {
      hasShownWelcomeRef.current = true;
    }
  }, [displayMessages.length]);
  const brandClass = brandId ? `nfd-brand-${brandId}` : '';
  const containerClasses = `nfd-help-center-chat nfd-ai-chat-container ${brandClass}`.trim();

  // Determine what to show in the messages area
  let messagesAreaContent;
  if (showFallback) {
    messagesAreaContent = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
      className: "nfd-help-center-chat__welcome-wrapper",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_ResultList_NoResults__WEBPACK_IMPORTED_MODULE_2__["default"], {
        hasLaunchedFromTooltip: hasLaunchedFromTooltip,
        query: null
      })
    });
  } else if (showWelcome) {
    messagesAreaContent = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
      className: "nfd-help-center-chat__welcome-wrapper",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_newfold_labs_wp_module_ai_chat__WEBPACK_IMPORTED_MODULE_0__.WelcomeScreen, {
        onSendMessage: sendMessage,
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Hi, I'm your AI assistant.", 'wp-module-help-center'),
        subtitle: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('How can I help you with WordPress today?', 'wp-module-help-center'),
        showSuggestions: false
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_ChatHistoryList__WEBPACK_IMPORTED_MODULE_3__["default"], {})]
    });
  } else {
    messagesAreaContent = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
      className: "nfd-help-center-chat__messages-wrapper",
      children: [messages.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
        className: "nfd-help-center-chat__messages-header",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("button", {
          onClick: handleClearChat,
          className: "nfd-help-center-chat__clear-chat-button",
          "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Clear chat', 'wp-module-help-center'),
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Clear Chat', 'wp-module-help-center')
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_newfold_labs_wp_module_ai_chat__WEBPACK_IMPORTED_MODULE_0__.ChatMessages, {
        messages: displayMessages,
        isLoading: isTyping,
        onApprove: handleApproval,
        onReject: handleRejection,
        onSendMessage: sendMessage,
        onSendSystemMessage: sendSystemMessage,
        conversationId: conversationId,
        onClearTyping: clearTyping,
        brandId: brandId
      })]
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
    className: containerClasses,
    "data-brand": brandId || undefined,
    children: [messagesAreaContent, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
      className: `nfd-help-center-chat__input-area ${messages.length > 0 ? 'nfd-help-center-chat__input-area--no-border' : ''}`,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
        className: "nfd-help-center-chat__input-wrapper",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_newfold_labs_wp_module_ai_chat__WEBPACK_IMPORTED_MODULE_0__.ChatInput, {
          onSendMessage: sendMessage,
          onStopRequest: stopRequest,
          disabled: isTyping,
          placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Ask me anything about WordPress…', 'wp-module-help-center')
        })
      })
    }), (0,_utils_footerUtils__WEBPACK_IMPORTED_MODULE_9__.shouldShowFooterInChat)(hasLaunchedFromTooltip) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
      className: "nfd-help-center-chat__footer-wrapper",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_Footer__WEBPACK_IMPORTED_MODULE_1__["default"], {})
    }), isConnecting && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
      className: "nfd-help-center-chat__connecting-overlay",
      "aria-live": "polite",
      "aria-busy": "true",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
        className: "nfd-help-center-chat__connecting-content",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
          className: "nfd-help-center-chat__connecting-spinner"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("span", {
          className: "nfd-help-center-chat__connecting-text",
          children: [animatedConnectingText, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("span", {
            className: "nfd-help-center-chat__connecting-cursor"
          })]
        })]
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HelpCenterChatAI);

/***/ }),

/***/ "./src/hooks/useHelpVisibility.js":
/*!****************************************!*\
  !*** ./src/hooks/useHelpVisibility.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useHelpVisibility: () => (/* binding */ useHelpVisibility)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils.js");
/**
 * Custom hook for managing help center visibility state
 * Handles localStorage sync and storage event listening
 *
 * @return {[boolean, Function]} Tuple of [isVisible, setIsVisible]
 */


const useHelpVisibility = () => {
  const [isVisible, setIsVisible] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(() => _utils__WEBPACK_IMPORTED_MODULE_1__.LocalStorageUtils.getHelpVisible());
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // Listen for storage events. toggleHelp updates localStorage and dispatches a synthetic
    // 'storage' event so this handler runs in the same tab too.
    const handleStorage = () => {
      setIsVisible(_utils__WEBPACK_IMPORTED_MODULE_1__.LocalStorageUtils.getHelpVisible());
    };
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);
  return [isVisible, setIsVisible];
};

/***/ }),

/***/ "./src/hooks/useTypingAnimation.js":
/*!*****************************************!*\
  !*** ./src/hooks/useTypingAnimation.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   useTypingAnimation: () => (/* binding */ useTypingAnimation)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/**
 * useTypingAnimation Hook
 *
 * Displays text character-by-character with a typing animation effect.
 * Used to create a more engaging user experience during loading states.
 *
 * @param {string} text - The full text to animate
 * @param {Object} options - Animation options
 * @param {number} [options.speed=50] - Milliseconds between each character
 * @param {boolean} [options.enabled=true] - Whether animation is enabled
 * @param {boolean} [options.loop=false] - Whether to loop the animation
 * @param {number} [options.loopDelay=1000] - Delay before restarting loop
 * @return {string} The animated text (progressively showing characters)
 */


const useTypingAnimation = (text, {
  speed = 50,
  enabled = true,
  loop = false,
  loopDelay = 1000
} = {}) => {
  const [displayedText, setDisplayedText] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const indexRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(0);
  const timeoutRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // Reset when text changes or animation is disabled
    if (!enabled || !text) {
      setDisplayedText(enabled ? '' : text);
      indexRef.current = 0;
      return;
    }

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Reset for new text
    setDisplayedText('');
    indexRef.current = 0;
    const animate = () => {
      if (indexRef.current < text.length) {
        indexRef.current++;
        setDisplayedText(text.slice(0, indexRef.current));
        timeoutRef.current = setTimeout(animate, speed);
      } else if (loop) {
        // Loop: wait then restart
        timeoutRef.current = setTimeout(() => {
          indexRef.current = 0;
          setDisplayedText('');
          timeoutRef.current = setTimeout(animate, speed);
        }, loopDelay);
      }
    };

    // Start animation
    timeoutRef.current = setTimeout(animate, speed);

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, speed, enabled, loop, loopDelay]);
  return displayedText;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useTypingAnimation);

/***/ })

}]);
//# sourceMappingURL=src_components_HelpCenterChatAI_jsx.js.map?ver=de880878f3f6adeb5711