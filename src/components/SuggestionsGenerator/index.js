/* eslint-disable jsx-a11y/click-events-have-key-events */
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import moduleAI from '@newfold-labs/wp-module-ai';
import apiFetch from '@wordpress/api-fetch';
import { ReactComponent as RegenerateIcon } from '../../icons/regenerate-icon.svg';

import SuggestionsList from './suggestionList';
const SuggestionsGenerator = ( props ) => {
	const [ aiResults, setAIResults ] = useState( [] );
	const siteDescInput = document.querySelector( props.targetSelector )
		? document.querySelector( props.targetSelector ).value
		: null;

	const getAIResult = async ( siteTitle, siteUrl, siteDesc ) => {
		const siteDescrition = siteDescInput ? siteDescInput : siteDesc;

		if ( siteDescrition ) {
			const userPrompt = `current description is ${ siteDescrition } site title is ${ siteTitle } site type is ${ `` } sub type is ${ `` } site url is ${ siteUrl }`;
			try {
				// setBtnText("Fetching Suggestions....");
				const result = await moduleAI.search.getSearchResult(
					userPrompt,
					'descgenerator'
				);
				setAIResults( result.result );
			} catch ( exception ) {
				// eslint-disable-next-line no-console
				console.log( exception );
			}
		}
	};

	const fetchSettings = () => {
		apiFetch( { path: '/wp/v2/settings' } ).then( ( settings ) => {
			const { title, url, description } = settings;
			if ( title && url ) {
				getAIResult( title, url, description );
			}
		} );
	};

	useEffect( () => {
		fetchSettings();
		return () => {};
	}, [] );

	return (
		<div className="nfd-suggestions-center">
			<h4 className="nfd-suggestion-heading">
				{ __( 'Suggestions for Tagline', 'wp-module-help-center' ) }
			</h4>
			<SuggestionsList
				results={ aiResults }
				targetElement={ props.targetSelector }
				handleClose={ props.onClose }
			/>
			<div
				className="nfd-regenerate-button"
				onClick={ () => fetchSettings() }
				role="button"
				tabIndex="-1"
			>
				<span>
					<RegenerateIcon />
				</span>
				<span>{ __( 'Regenerate', 'wp-module-help-center' ) }</span>
			</div>
		</div>
	);
};

export default SuggestionsGenerator;
