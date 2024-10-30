/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ReactComponent as Go } from '../icons/go.svg';

export const SearchResultSuggestions = ( { searchTitle, onGo } ) => {
	return (
		<>
			<div className="algoliaResult" onClick={ onGo }>
				<p>{ searchTitle }</p>
				<div className="svg">
					<Go />
				</div>
			</div>
		</>
	);
};
