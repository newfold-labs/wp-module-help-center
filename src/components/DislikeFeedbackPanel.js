import { __ } from '@wordpress/i18n';
import { useDispatch } from 'react-redux';
import { helpcenterActions } from '../../store/helpcenterSlice';
import { ReactComponent as DislikeFeedback } from '../icons/dislike-help.svg';
import BackButton from './BackButton';
const DislikeFeedbackPanel = () => {
	const dispatch = useDispatch();
	return (
		<div className="dislike-feedback">
			<BackButton
				handleBackClick={() => {
					dispatch(helpcenterActions.setDisliked(false));
				}}
			/>

			<div className="dislike-feedback-icon">
				<DislikeFeedback />
			</div>

			<div>
				{__(
					`We're sorry the suggestions didn’t help.`,
					'wp-module-help-center'
				)}
				<p>{__('Try to:', 'wp-module-help-center')}</p>
				<ul>
					<li>
						{__(
							`Use different keywords in the search field.`,
							'wp-module-help-center'
						)}
						<br />
						{__(
							`A clear, short prompt can make the difference.`,
							'wp-module-help-center'
						)}
					</li>
					<li>
						{__(
							'Reach out to our customer support.',
							'wp-module-help-center'
						)}
						<br />
						{__('Call at', 'wp-module-help-center')}{' '}
						<span>
							<a href="tel:8884014678">888-401-4678</a>
						</span>{' '}
						{__('or', 'wp-module-help-center')}{' '}
						<span>
							<a
								href={window?.NewfoldRuntime?.linkTracker?.addUtmParams("https://www.bluehost.com/contact")}
								target="_blank"
								rel="noreferrer"
							>
								Chat Live
							</a>{' '}
						</span>
						{__(
							'with one of our support agents — we will assist you as soon as possible.',
							'wp-module-help-center'
						)}
					</li>
				</ul>
			</div>
		</div>
	);
};

export default DislikeFeedbackPanel;
