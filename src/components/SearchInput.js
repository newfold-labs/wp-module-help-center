import { ReactComponent as SearchIcon } from '../icons/search.svg';
import { __ } from '@wordpress/i18n';
import { ThreeDots } from 'react-loader-spinner'; // Assuming you're using this loader
import Loader from './Loader'; // Importing your Loader component

const SearchInput = ( {
	searchInput,
	setSearchInput,
	populateSearchResult,
	debouncedResults,
	setNoResult,
	getAIResult,
	isLoading, // Added this prop for loading state
	loading, // Added this prop for loading state
} ) => {
	return (
		<div className="search-container__wrapper">
			{ isLoading ? (
				// Show the Loader component when isLoading is true
				<Loader />
			) : (
				<>
					<div className="search-container">
						<>
							<button
								onClick={ () => {
									document
										.getElementById( 'search-input-box' )
										.focus();
								} }
							>
								<SearchIcon />
							</button>
							<input
								type="text"
								id="search-input-box"
								style={ { flexGrow: 2 } }
								value={ searchInput }
								maxLength="144"
								placeholder={ __(
									'Ask me anything…',
									'wp-module-help-center'
								) }
								onChange={ ( e ) => {
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
									if ( e.key === 'Enter' ) {
										await getAIResult();
									}
								} }
							/>
						</>
					</div>
				</>
			) }
			{ ! isLoading && (
				<div className="attribute">
					<p>
						<span>
							{ searchInput ? searchInput.length : 0 }/144
						</span>
					</p>
				</div>
			) }
			{ loading && (
				<div className="multisearch-loader">
					<ThreeDots
						height="40"
						width="40"
						radius="4"
						color="#196BDE"
						ariaLabel="three-dots-loading"
						wrapperStyle={ {} }
						visible={ true }
					/>
				</div>
			) }
		</div>
	);
};

export default SearchInput;
