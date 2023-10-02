import Suggestion from './suggestion';
import './suggestion-generator.scss';

function SuggestionsList({results, targetElement}) {

  return (
    <div className='nfd-suggestions-list'>   
      {results.map((suggestionText, index) => (
        <Suggestion suggestionText={suggestionText.text} index={index} targetElement={targetElement}/> 
      ))}
    </div>
  )
}

export default SuggestionsList