import { __ } from '@wordpress/i18n';
import { ReactComponent as GoSearchIcon } from '../icons/paper-airplane.svg';

const SearchInput = ( {
	searchInput,
	handleOnChange,
	handleSubmit,
	errorMsg,
} ) => {
	return (
		<div
			role="search"
			aria-label={ __( 'Search Help Center', 'wp-module-help-center' ) }
		>
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
							onChange={ ( e ) => handleOnChange( e ) }
							onKeyDown={ ( e ) =>
								e.key === 'Enter' && handleSubmit()
							}
						/>
						<button
							aria-label={ __(
								'submit text',
								'wp-module-help-center'
							) }
							title={ __(
								'submit text',
								'wp-module-help-center'
							) }
							onClick={ () => handleSubmit() }
						>
							<GoSearchIcon />
						</button>
					</div>
					{ errorMsg && (
						<p className="hc-input-error-message">{ errorMsg }</p>
					) }
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
