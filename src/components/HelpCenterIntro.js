import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { ReactComponent as AIStars } from '../icons/ai-stars.svg';
import { useRevealText } from '../utils';

const HelpCenterIntro = () => {
	const [ startReveal, setStartReveal ] = useState( false );

	useEffect( () => {
		const element = document.getElementById( 'nfd-help-center' );

		const checkAndSetReveal = () => {
			if ( element && element.classList.contains( 'help-container' ) ) {
				setStartReveal( true );
			}
		};

		checkAndSetReveal(); // Initial check

		// Set up MutationObserver to watch for class changes
		// eslint-disable-next-line no-undef
		const observer = new MutationObserver( ( mutationsList ) => {
			for ( const mutation of mutationsList ) {
				if ( mutation.attributeName === 'class' ) {
					checkAndSetReveal();
				}
			}
		} );

		if ( element ) {
			observer.observe( element, { attributes: true } );
		}

		// Cleanup the observer on component unmount
		return () => {
			if ( element ) {
				observer.disconnect();
			}
		};
	}, [] );

	const introText = __(
		'Hi! I’m your WordPress AI assistant. </br></br> Ask me how to do things in WordPress and I’ll provide step by step instructions.</br></br> I’m still learning so I don’t have all the answers just yet.',
		'wp-module-help-center'
	);

	const revealedIntro = useRevealText( startReveal ? introText : '', 50 );

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
