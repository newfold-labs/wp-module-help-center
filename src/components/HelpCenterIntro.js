import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useSelector } from 'react-redux';
import { useRevealText } from '../utils';

const HelpCenterIntro = () => {
	const hcData = useSelector((state) => state.helpcenter);
	const [startReveal, setStartReveal] = useState(false);

	useEffect(() => {
		setStartReveal(hcData.resultContent.length <= 0);
	}, []);

	const introText = __(
		'Hey there! I’m here to help you find your way around WordPress. </br></br> If you’re not sure how to do something, just ask — I’ll walk you through it step by step. I’m still learning, so I might not have every answer, but I’ll do my best to help!',
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
			style={{
				display: hcData.resultContent?.postId ? 'none' : 'flex',
			}}
		>
			<div
				className="helpcenter-intro__text"
				dangerouslySetInnerHTML={{ __html: revealedIntro }}
			/>
		</div>
	);
};

export default HelpCenterIntro;
