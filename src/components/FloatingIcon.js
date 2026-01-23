import { __ } from '@wordpress/i18n';
import { useDispatch } from 'react-redux';
import { toggleHelp } from '..';
import { helpcenterActions } from '../../store/helpcenterSlice';
import { ReactComponent as HelpcenterChatBubbleIcon } from '../icons/help-bubble.svg';
import { useHelpCenterState } from '../hooks/useHelpCenterState';

const FloatingIcon = () => {
	const dispatch = useDispatch();
	const { floatingIconVisibilty, visible, hasLaunchedFromTooltip } =
		useHelpCenterState();

	const handleClick = () => {
		toggleHelp(true);
		dispatch(helpcenterActions.updateFloatingIconVisibilty(false));
	};

	if (!floatingIconVisibilty && (visible || !hasLaunchedFromTooltip)) {
		return null;
	}

	return (
		<div
			className="nfd-hc-floating-icon"
			role="button"
			tabIndex={0}
			aria-label="Open Help Center"
			onClick={handleClick}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					handleClick();
				}
			}}
		>
			<HelpcenterChatBubbleIcon />
			<p>{__('Help', 'wp-module-help-center')}</p>
		</div>
	);
};

export default FloatingIcon;
