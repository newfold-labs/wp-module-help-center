/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { ReactComponent as AIStars } from '../icons/ai-stars.svg';
import { LocalStorageUtils, useRevealText } from '../utils';

const HelpCenterIntro = () => {
	const [ startReveal, setStartReveal ] = useState( false );

	useEffect( () => {
		setStartReveal( LocalStorageUtils.getResultInfo().length <= 0 );
	}, [] );

	const introText = __(
		'Hi! I’m your WordPress AI assistant. </br></br> Ask me how to do things in WordPress and I’ll provide step by step instructions.</br></br> I’m still learning so I don’t have all the answers just yet.',
		'wp-module-help-center'
	);

	const { displayedText: revealedIntro } = useRevealText(
		introText || '',
		50,
		startReveal
	);
	return (
		<div
			role="region"
			aria-labelledby="helpcenter-intro-heading"
			className="helpcenter-intro"
			style={ {
				display:
					LocalStorageUtils.getResultInfo().length > 0
						? 'none'
						: 'flex',
			} }
		>
			<div>
				<AIStars />
			</div>
			<div
				className="helpcenter-intro__text"
				dangerouslySetInnerHTML={ { __html: revealedIntro } }
			/>
		</div>
	);
};

export default HelpCenterIntro;
