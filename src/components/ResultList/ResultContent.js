import { useState, useEffect, useRef } from '@wordpress/element';
import { useDispatch, useSelector } from 'react-redux';
import { helpcenterActions } from '../../../store/helpcenterSlice';
import IframeModal from './IframeModal';

function ResultContent( { source, index, questionBlock, content } ) {
	const { isLoading, loadingQuery, loadingIndex } = useSelector(
		(state) => state.helpcenter
	);
	const [iframeModalOpen, setIframeModalOpen] = useState(false);
	const [iframeAttributes, setIframeAttributes] = useState({});
	const resultBlockRef = useRef();
	const dispatch = useDispatch();

	useEffect(() => {
		const resultBlock = resultBlockRef.current;

		if (!resultBlock) {
			return;
		}

		const ensureOverlays = () => {
			const iframes = resultBlock.querySelectorAll('iframe');
			iframes.forEach((iframe) => {
				// Avoid duplicating overlays
				if (iframe.dataset.hcOverlay === '1') {
					return;
				}

				// Use Gutenberg wrapper if present; else use the iframe's parent
				const wrapper =
					iframe.closest('.wp-block-embed__wrapper') ||
					iframe.parentElement;

				if (!wrapper) {
					return;
				}

				// Make wrapper positioned for overlay
				if (getComputedStyle(wrapper).position === 'static') {
					wrapper.style.position = 'relative';
				}

				// Create overlay
				const overlay = document.createElement('button');
				overlay.type = 'button';
				overlay.className = 'hc-iframe-click-overlay';
				overlay.setAttribute('aria-label', 'Open player');
				overlay.tabIndex = 0;

				// On hover, cache all attributes we’ll need
				const cacheAttrs = () => {
					const attrs = {};
					for (let i = 0; i < iframe.attributes.length; i++) {
						const attr = iframe.attributes[i];
						attrs[attr.name] = attr.value;
					}
					// Save on overlay dataset for quick retrieval on click
					overlay.dataset.hcAttrs = JSON.stringify(attrs);
				};

				overlay.addEventListener('mouseenter', cacheAttrs, {
					passive: true,
				});
				overlay.addEventListener('focus', cacheAttrs, {
					passive: true,
				});

				// Clicking overlay opens modal; prevent any bubbling to underlying iframe
				overlay.addEventListener('click', (e) => {
					e.preventDefault();
					e.stopPropagation();

					let attrs = {};
					try {
						if (overlay.dataset.hcAttrs) {
							attrs = JSON.parse(overlay.dataset.hcAttrs) || {};
						} else {
							// fallback if hover never happened
							for (let i = 0; i < iframe.attributes.length; i++) {
								const attr = iframe.attributes[i];
								attrs[attr.name] = attr.value;
							}
						}
					} catch {
						// ignore JSON errors; just rebuild from DOM
						for (let i = 0; i < iframe.attributes.length; i++) {
							const attr = iframe.attributes[i];
							attrs[attr.name] = attr.value;
						}
					}

					// Keep original src as requested (don’t strip/modify)
					setIframeAttributes(attrs);
					setIframeModalOpen(true);
				});

				// Insert overlay as last child so it sits above iframe
				wrapper.appendChild(overlay);

				// Mark iframe prepared
				iframe.dataset.hcOverlay = '1';
				// Make the cursor show intent; DO NOT disable pointer events on iframe (keeps visual cues)
				iframe.style.cursor = 'pointer';
			});
		};

		ensureOverlays();

		const kbClickDomains =
			window.nfdHelpCenter?.brandConfig?.kbClickDomains || [];

		const handleClick = ( e ) => {
			const anchor = e.target.closest( 'a' );
			if ( ! anchor || ! anchor.href || ! resultBlock.contains( anchor ) ) {
				return;
			}
			const hrefMatches = kbClickDomains.some(
				( domain ) => anchor.href.includes( domain )
			);
			if ( ! hrefMatches ) {
				return;
			}
			e.preventDefault();
			const clickedText = anchor.textContent.trim();

			dispatch( helpcenterActions.updateSearchInput( clickedText ) );
			dispatch( helpcenterActions.setAIResultLoading() );
			dispatch( helpcenterActions.setTriggerSearch( true ) );
			dispatch( helpcenterActions.setShowBackButton( true ) );
		};

		resultBlock.addEventListener( 'click', handleClick );

		return () => {
			resultBlock.removeEventListener( 'click', handleClick );
		};
	}, [ content, dispatch ] );

	function renderContentOrLoading() {
		const isAISourceLoading =
			isLoading &&
			source === 'ai' &&
			loadingQuery === questionBlock &&
			loadingIndex === index;

		if (isAISourceLoading) {
			return <div className="loading-cursor"></div>;
		}

		if (content && content.length > 0) {
			return (
				<div
					className="helpcenter-results"
					dangerouslySetInnerHTML={{ __html: content }}
				/>
			);
		}

		return null;
	}

	const handleCloseIframeModal = () => {
		setIframeModalOpen(false);
		setIframeAttributes({});
	};

	return (
		<>
			<br />
			<div className="helpcenter-result-block" ref={resultBlockRef}>
				<div>{renderContentOrLoading()}</div>
			</div>
			<IframeModal
				isOpen={iframeModalOpen}
				onClose={handleCloseIframeModal}
				iframeAttributes={iframeAttributes}
			/>
		</>
	);
}

export default ResultContent;
