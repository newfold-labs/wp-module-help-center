
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Tooltip } from '@wordpress/components';
import CopyToClipboard from 'react-copy-to-clipboard';
import { ReactComponent as CopyIcon } from '../../icons/copy-icon.svg';


function Suggestion({ suggestionText, index , targetElement}) {

	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		setCopied(true);
	};

	const applySuggestion = (suggestion) => {
		if(targetElement){ 
		  document.querySelector(targetElement).value = suggestion;
		}
	  }

	return (
		<div className="nfd-suggestion">
			<div className="suggestion-text">
				{suggestionText}
			</div>
			<div className={`suggestion-btn-wrapper ${copied && `hide-tooltip`}`}>
				<Tooltip text={!copied ? "Copy to clipboard" : ""} delay={100}>
					<div className="suggestions-copy-wrapper">
						<CopyToClipboard text={suggestionText} onCopy={handleCopy}>
							<div className="suggestion-copy-button" id={`suggestionCopyButton${index}`}>
								{copied ?
									<span>Copied!</span> :
									<span><CopyIcon /></span>}
							</div>
						</CopyToClipboard>
					</div>
				</Tooltip>
				<div className="suggestion-apply-button" id={`suggestionApplyButton${index}`} onClick={() => applySuggestion(suggestionText)}>
					{__(
						'Apply',
						'wp-suggestions-generator'
					)}
				</div>
			</div>
		</div>
	)
}

export default Suggestion