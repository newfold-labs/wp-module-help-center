import { ReactComponent as UserAvatar } from '../../icons/user-avatar.svg';

export default function ResultHeader( {
	noResult,
	isNewEntry,
	searchInput,
	questionBlock,
} ) {
	return (
		<div className="helpcenter-question-block">
			<div className="helpcenter-question__user-avatar">
				<UserAvatar />
			</div>
			<div>{ noResult && isNewEntry ? searchInput : questionBlock }</div>
		</div>
	);
}
