import { useEffect, useRef } from '@wordpress/element';

const IframeModal = ({ isOpen, onClose, iframeAttributes }) => {
	const iframeContainerRef = useRef(null);

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const container = iframeContainerRef.current; // capture ref target
		if (!container) {
			return;
		}

		// clear and inject
		container.innerHTML = '';
		const iframe = document.createElement('iframe');

		Object.entries(iframeAttributes || {}).forEach(([key, value]) => {
			if (value !== null) {
				iframe.setAttribute(key, value);
			}
		});

		iframe.className = 'iframe-modal__iframe';
		container.appendChild(iframe);

		// cleanup
		return () => {
			// use captured `container` (may differ from ref after unmount)
			if (container) {
				try {
					if (container.contains(iframe)) {
						container.removeChild(iframe);
					} else {
						container.innerHTML = '';
					}
				} catch {
					/* container might already be gone; ignore */
				}
			}
		};
	}, [isOpen, iframeAttributes]);
	if (!isOpen) {
		return null;
	}

	return (
		<div className="iframe-modal__overlay" onClick={onClose}>
			<div
				className="iframe-modal__content"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					onClick={onClose}
					className="iframe-modal__close"
					aria-label="Close modal"
				>
					×
				</button>

				<div
					className="iframe-modal__iframe-wrapper"
					ref={iframeContainerRef}
				></div>
			</div>
		</div>
	);
};

export default IframeModal;
