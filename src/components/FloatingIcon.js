import { __ } from '@wordpress/i18n';
import { useDispatch } from 'react-redux';
import { toggleHelp } from '..';
import { helpcenterActions } from '../../store/helpcenterSlice';
import { useHelpCenterState } from '../hooks/useHelpCenterState';

/** Bluehost chat icon (inline so it always renders and stays white) */
const ChatIcon = (props) => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
		focusable="false"
		{...props}
	>
		<path
			d="M4.00049 4H20.0005V16H5.17049L4.00049 17.17V4ZM4.00049 2C2.90049 2 2.01049 2.9 2.01049 4L2.00049 22L6.00049 18H20.0005C21.1005 18 22.0005 17.1 22.0005 16V4C22.0005 2.9 21.1005 2 20.0005 2H4.00049ZM6.00049 12H14.0005V14H6.00049V12ZM6.00049 9H18.0005V11H6.00049V9ZM6.00049 6H18.0005V8H6.00049V6Z"
			fill="currentColor"
		/>
	</svg>
);

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
		<button
			type="button"
			className="nfd-hc-floating-icon"
			aria-label={__('Toggle chat view', 'wp-module-help-center')}
			onClick={handleClick}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					handleClick();
				}
			}}
		>
			<span className="nfd-hc-floating-icon__main">
				<ChatIcon className="nfd-hc-floating-icon__icon" />
				<span className="nfd-hc-floating-icon__label">
					{__('Ask BLU', 'wp-module-help-center')}
				</span>
			</span>
			<span className="nfd-hc-floating-icon__badge">
				{__('BETA', 'wp-module-help-center')}
			</span>
		</button>
	);
};

export default FloatingIcon;
