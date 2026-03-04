/**
 * Custom hook for accessing help center Redux state
 * Provides commonly used state selectors to avoid duplication
 *
 * @return {Object} Help center state object with commonly used properties
 */
import { useSelector } from 'react-redux';

export const useHelpCenterState = () => {
	return useSelector((state) => state.helpcenter);
};
