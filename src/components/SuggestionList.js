/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { ReactComponent as Go } from '../icons/go.svg';

export const SuggestionList = ( {
	suggestionsRef,
	multiResults,
	handleSuggestionsClick,
	isFooterVisible,
} ) => {
	const [ bottomOffset, setBottomOffset ] = useState( '95px' );

	useEffect( () => {
		const calculateBottom = () => {
			const inputWrapper = document.getElementById(
				'nfdHelpcenterInputWrapper'
			);
			const footer = document.querySelector( '.nfd-hc-modal__footer' );

			const inputHeight = inputWrapper?.offsetHeight || 0;
			const footerHeight = isFooterVisible
				? footer?.offsetHeight || 0
				: 0;

			setBottomOffset( `${ inputHeight + footerHeight }px` );
		};

		calculateBottom();
	}, [ isFooterVisible ] );

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
			style={ { bottom: bottomOffset } }
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
