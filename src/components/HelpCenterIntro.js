/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { ReactComponent as AIStars } from '../icons/ai-stars.svg';
import { useRevealText, LocalStorageUtils } from '../utils';

const HelpCenterIntro = () => {
	const [ startReveal, setStartReveal ] = useState( false );

	useEffect( () => {
		// Get the stored results from localStorage using LocalStorageUtils
		const storedResults = LocalStorageUtils.getResultInfo();

		// Check if the length of the stored results is <= 0
		if ( storedResults.length <= 0 ) {
			// If true, enable reveal effect
			setStartReveal( true );
		} else {
			// Always ensure startReveal is set, even if it's false
			setStartReveal( false );
		}
	}, [] );

	const introText = __(
		'Hi! I’m your WordPress AI assistant. </br></br> Ask me how to do things in WordPress and I’ll provide step by step instructions.</br></br> I’m still learning so I don’t have all the answers just yet.',
		'wp-module-help-center'
	);

	// const revealedIntro = useRevealText( introText, 50, startReveal );
	const { displayedText: revealedIntro } = useRevealText(
		introText || '',
		50,
		startReveal
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