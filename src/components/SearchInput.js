import { __ } from '@wordpress/i18n';
import { ThreeDots } from 'react-loader-spinner'; // Assuming you're using this loader
import Loader from './Loader'; // Importing your Loader component
import { ReactComponent as GoSearchIcon } from '../icons/paper-airplane.svg';
import { ReactComponent as PhoneIcon } from '../icons/phone.svg';
import { ReactComponent as ChatIcon } from '../icons/chat-bubble.svg';

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
		<div className="helpcenter-input-wrapper">
			<div className="search-container__wrapper">
				{ isLoading ? (
					// Show the Loader component when isLoading is true
					<Loader />
				) : (
					<>
						<div className="search-container">
							<>
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
								{
									<button
										onClick={ () => {
											document
												.getElementById(
													'search-input-box'
												)
												.focus();
										} }
									>
										<GoSearchIcon />
									</button>
								}
							</>
						</div>
					</>
				) }
				{ true && (
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
			<div className="helpcenter-supportinfo__wrapper">
				<div className="">
					<h4>
						{ __( 'Account Support', 'wp-module-help-center' ) }
					</h4>
					<div className="helpcenter-supportinfo__text">
						{ __(
							'If you need help with your Bluehost account, contact our support team:',
							'wp-module-help-center'
						) }
					</div>
					<div className="helpcenter-supportinfo__telephone">
						<span>
							<PhoneIcon />
						</span>
						<span>
							<a
								href="tel:8884014678"
								aria-label="Call 888-401-4678"
							>
								888-401-4678
							</a>
						</span>
					</div>
					<div className="helpcenter-supportinfo__chat">
						<span>
							<ChatIcon />
						</span>
						<span>
							<a
								href="https://www.bluehost.com/contact"
								aria-label={ __(
									'Chat with support',
									'wp-module-help-center'
								) }
								target="_blank"
								rel="noreferrer"
							>
								{ __(
									'Chat with support',
									'wp-module-help-center'
								) }
							</a>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchInput;
