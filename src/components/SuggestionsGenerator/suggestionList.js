import Suggestion from './suggestion';
import './suggestion-generator.scss';

function SuggestionsList({results, targetElement, handleClose}) {

  return (
    <div className='nfd-suggestions-list'>   
      {results.map((suggestionText, index) => (
        <Suggestion suggestionText={suggestionText.text} index={index} targetElement={targetElement} handleClose={handleClose}/> 
      ))}
    </div>
  )
}

export default SuggestionsList