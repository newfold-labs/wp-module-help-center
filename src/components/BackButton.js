import { __ } from '@wordpress/i18n';
import { ReactComponent as BackArrow } from '../icons/arrow-long-left.svg';

const BackButton = ({ handleBackClick }) => {
	const handleKeyDown = (e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			handleBackClick?.();
		}
	};

	return (
		<div
			className="helpcenter-back-arrow"
			role="button"
			tabIndex={0}
			onClick={handleBackClick}
			onKeyDown={handleKeyDown}
		>
			<span>
				<BackArrow />
			</span>
			<span>{__('Back', 'wp-module-help-center')}</span>
		</div>
	);
};

export default BackButton;
