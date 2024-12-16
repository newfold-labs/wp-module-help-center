import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { LocalStorageUtils } from '../utils';
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
			<div className="helpcenter-supportinfo__wrapper">
				<div>
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
