import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { ReactComponent as GoSearchIcon } from '../icons/paper-airplane.svg';

const SearchInput = ( {
	searchInput,
	setSearchInput,
	populateSearchResult,
	debouncedResults,
	setNoResult,
	getAIResult,
} ) => {
	const [ error, setError ] = useState( '' );

	const validateInput = () => {
		if ( ! searchInput || ! searchInput.trim() ) {
			setError(
				__(
					'Please enter a specific search term to get results.',
					'wp-module-help-center'
				)
			);
			return false;
		}
		setError( '' );
		return true;
	};

	return (
		<div role="search" aria-label={__('Search Help Center', 'wp-module-help-center')}>
			<div className="helpcenter-input-wrapper">
				<div className="search-container__wrapper">
					<div className="search-container">
						<input
							type="text"
							id="search-input-box"
						value={ searchInput }
							maxLength="144"
						placeholder={ __(
								'Ask about WordPress',
								'wp-module-help-center'
						) }
						onChange={ ( e ) => {
							setError( '' );
							setSearchInput( e.target.value );
								populateSearchResult(
									'',
									undefined,
									e.target.value
								);
							setNoResult( false );
							debouncedResults( e.target.value );
						} }
						onKeyDown={ async ( e ) => {
							if ( e.key === 'Enter' && validateInput() ) {
									await getAIResult();
								}
						} }
						/>
						<button
						aria-label={__('submit text', 'wp-module-help-center')}
						title={__('submit text', 'wp-module-help-center')}
						onClick={ async () => {
							if ( validateInput() ) {
									await getAIResult();
								}
						} }
						>
							<GoSearchIcon />
						</button>
					</div>
				{ error && <p className="hc-input-error-message">{ error }</p> }
					<div className="attribute">
						<p className="hc-input-counter">
							<span>
							{ searchInput ? searchInput.length : 0 }/144
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchInput;
