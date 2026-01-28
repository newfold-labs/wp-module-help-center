/**
 * useTypingAnimation Hook
 *
 * Displays text character-by-character with a typing animation effect.
 * Used to create a more engaging user experience during loading states.
 *
 * @param {string}  text                     - The full text to animate
 * @param {Object}  options                  - Animation options
 * @param {number}  [options.speed=50]       - Milliseconds between each character
 * @param {boolean} [options.enabled=true]   - Whether animation is enabled
 * @param {boolean} [options.loop=false]     - Whether to loop the animation
 * @param {number}  [options.loopDelay=1000] - Delay before restarting loop
 * @return {string} The animated text (progressively showing characters)
 */

import { useState, useEffect, useRef } from '@wordpress/element';

export const useTypingAnimation = (
	text,
	{ speed = 50, enabled = true, loop = false, loopDelay = 1000 } = {}
) => {
	const [displayedText, setDisplayedText] = useState('');
	const indexRef = useRef(0);
	const timeoutRef = useRef(null);

	useEffect(() => {
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

export default useTypingAnimation;
