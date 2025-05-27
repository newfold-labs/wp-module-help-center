import { useDispatch, useSelector } from 'react-redux';
import { helpcenterActions } from '../../store/helpcenterSlice';
import { ReactComponent as HistoryIcon } from '../icons/reload.svg';

const RecentSearches = () => {
	const dispatch = useDispatch();
	const recentSearches = useSelector(
		( state ) => state.helpcenter.recentSearches
	);

	if ( ! recentSearches || recentSearches.length === 0 ) {
		return null;
	}
	const handleHistory = ( index ) => {
		dispatch( helpcenterActions.setIsFooterVisible( false ) );
		dispatch(
			helpcenterActions.updateResultContent( recentSearches[ index ] )
		);
	};

	return (
		<div className="helpcenter-recent-search">
			{ recentSearches.map( ( history, index ) => (
				<div
					key={ index }
					className="helpcenter-recent-search--item"
					onClick={ () => handleHistory( index ) }
					role="button"
					tabIndex={ 0 }
					onKeyDown={ ( e ) => {
						if ( e.key === 'Enter' || e.key === ' ' ) {
							handleHistory( index );
						}
					} }
				>
					<HistoryIcon />
					<span>{ history.searchInput }</span>
				</div>
			) ) }
		</div>
	);
};

export default RecentSearches;
