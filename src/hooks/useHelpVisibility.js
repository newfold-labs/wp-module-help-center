/**
 * Custom hook for managing help center visibility state
 * Handles localStorage sync and storage event listening
 *
 * @return {[boolean, Function]} Tuple of [isVisible, setIsVisible]
 */
import { useState, useEffect } from '@wordpress/element';
import { LocalStorageUtils } from '../utils';

export const useHelpVisibility = () => {
	const [isVisible, setIsVisible] = useState(() =>
		LocalStorageUtils.getHelpVisible()
	);

	useEffect(() => {
		// Listen for storage events. toggleHelp updates localStorage and dispatches a synthetic
		// 'storage' event so this handler runs in the same tab too.
		const handleStorage = () => {
			setIsVisible(LocalStorageUtils.getHelpVisible());
		};

		window.addEventListener('storage', handleStorage);

		return () => {
			window.removeEventListener('storage', handleStorage);
		};
	}, []);

	return [isVisible, setIsVisible];
};
