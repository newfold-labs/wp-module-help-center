import { useHelpCenterState } from '../../hooks/useHelpCenterState';

export default function ResultHeader({ noResult, questionBlock }) {
	const { isNewEntry, hasLaunchedFromTooltip } = useHelpCenterState();

	const getQuestionBlockText = () => {
		if (!questionBlock || (noResult && isNewEntry)) {
			return '';
		}
		if (hasLaunchedFromTooltip) {
			return questionBlock;
		}
		return `"${questionBlock}"`;
	};
	return (
		<div className="helpcenter-question-block">
			<div>{getQuestionBlockText()}</div>
		</div>
	);
}
