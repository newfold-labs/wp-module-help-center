import { useEffect, useState } from '@wordpress/element';
import { InstantSearch } from 'react-instantsearch-hooks-web';
import TypesenseInstantsearchAdapter from 'typesense-instantsearch-adapter';
import SearchResults from './SearchResults';
import { CapabilityAPI, LocalStorageUtils } from '../utils';

const HelpCenter = ( props ) => {
	// Set up the typesense adapter
	const typesenseAdapter = new TypesenseInstantsearchAdapter( {
		server: {
			apiKey: 'B9wvYIokTPPgXEM3isTqsxbDOva21igT',
			nodes: [
				{
					host: 'search.hiive.cloud',
					port: 443,
					protocol: 'https',
				},
			],
		},
		// The following parameters are directly passed to Typesense's search API endpoint.
		//  So you can pass any parameters supported by the search endpoint below.
		//  queryBy is required.
		additionalSearchParameters: {
			facet_by: 'post_title',
			group_by: 'post_title',
			group_limit: 1,
			query_by: 'post_title,post_content',
			sort_by: '_text_match:desc,post_likes:desc',
			filter_by: `post_category:=${ props.brand }`,
			prioritize_token_position: true,
			limit_hits: 3,
			per_page: 3,
		},
	} );

	const searchClient = typesenseAdapter.searchClient;

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
		<div className="nfd-help-center">
			<InstantSearch
				searchClient={ searchClient }
				indexName="nfd_help_articles"
			>
				<SearchResults refresh={ props.refresh } />
			</InstantSearch>
		</div>
	);
};

export default HelpCenter;
