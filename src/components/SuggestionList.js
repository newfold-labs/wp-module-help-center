/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ReactComponent as Go } from '../icons/go.svg';
import { __ } from '@wordpress/i18n';

export const SuggestionList = ( {
	suggestionsRef,
	multiResults,
	handleSuggestionsClick,
} ) => {
	// Handle the click for individual suggestions
	const onSuggestionClick = ( result, postTitle ) => {
		handleSuggestionsClick( result, postTitle );
	};

	// If there are no results, return null or a specific fallback
	if ( ! multiResults?.hits?.length ) {
		return null;
	}

	return (
		<div
			className="suggestions-wrapper"
			id="suggestionsWrapper"
			ref={ suggestionsRef }
		>
			{ /* Title for the suggestions */ }
			{ multiResults.hits.length > 0 && (
				<p>
					<b>{ __( 'Common Topics', 'wp-module-help-center' ) }</b>
				</p>
			) }

			{ /* Map over the hits array and render suggestions */ }
			{ multiResults.hits.map( ( result, index ) => {
				const postTitle = result?.group_key?.[ 0 ] ?? '';
				return (
					<div
						className="algolia-result"
						key={ index }
						onClick={ () => onSuggestionClick( result, postTitle ) }
					>
						<p>{ postTitle }</p>
						<div className="svg">
							<Go />
						</div>
					</div>
				);
			} ) }
		</div>
	);
};
