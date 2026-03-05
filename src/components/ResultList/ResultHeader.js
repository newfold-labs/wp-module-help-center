import { useHelpCenterState } from '../../hooks/useHelpCenterState';

export default function ResultHeader({ noResult, questionBlock }) {
	const { isNewEntry, hasLaunchedFromTooltip } = useHelpCenterState();

	const getQuestionBlockText = () => {
		if (!questionBlock || (noResult && isNewEntry)) {
			return '';
		}
		if (hasLaunchedFromTooltip) {
			const txt = document.createElement('textarea');
			txt.innerHTML = questionBlock;
			return txt.value;
		}
		return `"${questionBlock}"`;
	};
	return (
		<div className="helpcenter-question-block">
			<div>{getQuestionBlockText()}</div>
		</div>
	);
}
