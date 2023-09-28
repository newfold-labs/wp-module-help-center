
import { __ } from '@wordpress/i18n';
import { Tooltip } from '@wordpress/components';
import { ReactComponent as CopyIcon } from '../../icons/copy-icon.svg';

function Suggestion({suggestionText, index}) {
console.log("index", index);
  return (
    <div className="nfd-suggestion">
      <div className="suggestion-text">
          {suggestionText}
        </div>
      <div className="suggestion-btn-wrapper">
      <Tooltip text="Copy to clipboard" delay={100}>
        <div className="suggestion-copy-button" id={`suggestionCopyButton${index}`}>
            <CopyIcon />
        </div>
        </Tooltip>
        <div className="suggestion-apply-button" id={`suggestionApplyButton${index}`}>
          { __(
							'Apply',
							'wp-suggestions-generator'
						) }
        </div>
      </div>
    </div>
  )
}

export default Suggestion