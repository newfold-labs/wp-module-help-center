import { useDispatch, useSelector } from 'react-redux';
import { helpcenterActions } from '../../store/helpcenterSlice';
import { ReactComponent as HelpcenterChatBubbleIcon } from '../icons/helpcenter-chat-bubble-icon.svg';
import { toggleHelp } from '../'; //

const FloatingIcon = () => {
	const dispatch = useDispatch();
	const { floatingIconVisibility, visible } = useSelector(
		(state) => state.helpcenter
	);

	const handleClick = () => {
		toggleHelp(true);
		dispatch(helpcenterActions.updateFloatingIconVisibilty(false));
	};

	if (!floatingIconVisibility || visible) {
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
		</div>
	);
};

export default FloatingIcon;
