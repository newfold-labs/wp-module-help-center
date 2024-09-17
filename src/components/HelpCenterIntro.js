import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { ReactComponent as AIStars } from '../icons/ai-stars.svg';
import { useRevealText, LocalStorageUtils } from '../utils';

const HelpCenterIntro = () => {
	const [ startReveal, setStartReveal ] = useState( false );

	useEffect( () => {
		const storedResults = LocalStorageUtils.getResultInfo();

		if ( storedResults.length <= 0 ) {
			setStartReveal( true );
		}
	}, [] );

	const introText = __(
		'Hi! I’m your WordPress AI assistant. </br></br> Ask me how to do things in WordPress and I’ll provide step by step instructions.</br></br> I’m still learning so I don’t have all the answers just yet.',
		'wp-module-help-center'
	);

	const revealedIntro = useRevealText(
		startReveal ? introText : introText,
		50
	);

	return (
		<div className="helpcenter-intro">
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
