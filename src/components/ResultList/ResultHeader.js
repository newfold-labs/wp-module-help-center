import { ReactComponent as UserAvatar } from '../../icons/user-avatar.svg';
import { LocalStorageUtils } from '../../utils';

export default function ResultHeader( {
	noResult,
	isNewEntry,
	questionBlock,
} ) {
	return (
		<div className="helpcenter-question-block">
			<div className="helpcenter-question__user-avatar">
				<UserAvatar />
			</div>
			<div>
				{ noResult && isNewEntry
					? LocalStorageUtils.getSearchInput()
					: questionBlock }
			</div>
		</div>
	);
}
