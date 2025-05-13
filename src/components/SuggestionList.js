/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { __ } from '@wordpress/i18n';
import { ReactComponent as Go } from '../icons/go.svg';

export const SuggestionList = ( {
	suggestionsRef,
	multiResults,
	handleSuggestionsClick,
	isFooterVisible,
} ) => {
	// Handle the click for individual suggestions
	const onSuggestionClick = ( result, postTitle ) => {
		handleSuggestionsClick( result, postTitle );
	};

	if ( ! multiResults?.hits?.length ) {
		return null;
	}

	return (
		<div
			className="suggestions-wrapper"
			id="suggestionsWrapper"
			ref={ suggestionsRef }
			style={ { bottom: isFooterVisible ? '440px' : '90px' } }
		>
			{ multiResults.hits.length > 0 && (
				<p>
					<b>{ __( 'Common Topics', 'wp-module-help-center' ) }</b>
				</p>
			) }

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
