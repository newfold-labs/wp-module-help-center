import { useEffect, useState } from '@wordpress/element';
import SearchResults from './SearchResults';
import { CapabilityAPI, LocalStorageUtils } from '../utils';
import HelpCenterIntro from './HelpCenterIntro';

const HelpCenter = ( props ) => {
	const [ visible, setVisible ] = useState( false );
	const [ helpEnabled, setHelpEnabled ] = useState( false );

	const getHelpStatus = async () => {
		try {
			const response = await CapabilityAPI.getHelpCenterCapability();
			setHelpEnabled( response );
		} catch ( exception ) {
			setHelpEnabled( false );
		}
	};
	useEffect( () => {
		getHelpStatus();
	}, [] );

	useEffect( () => {
		const updateVisibility = () => {
			setVisible( LocalStorageUtils.getHelpVisible() );
		};

		// Add the event listener on component mount
		window.addEventListener( 'storage', updateVisibility );

		// Remove the event listener when the component unmounts
		return () => {
			window.removeEventListener( 'storage', updateVisibility );
		};
	}, [] );

	if ( ! helpEnabled || ! visible ) {
		return <></>;
	}

	return (
		<div className="nfd-help-center" id="helpcenterResultsWrapper">
			<HelpCenterIntro />
			<SearchResults refresh={ props.refresh } />
		</div>
	);
};

export default HelpCenter;
