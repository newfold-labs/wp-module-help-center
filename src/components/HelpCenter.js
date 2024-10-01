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

	useEffect( () => {
		const handleHeartbeat = ( event, data ) => {
			if (
				data.hasOwnProperty( 'wp-auth-check' ) &&
				! data[ 'wp-auth-check' ]
			) {
				// WordPress auth check failed, session is expired, Clear relevant localStorage data
				LocalStorageUtils.clear();
			}
		};

		// Listening to the WordPress Heartbeat tick event to check user session
		window.jQuery( document ).on( 'heartbeat-tick', handleHeartbeat );

		return () => {
			window.jQuery( document ).off( 'heartbeat-tick', handleHeartbeat );
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
