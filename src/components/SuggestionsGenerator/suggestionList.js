import Suggestion from './suggestion';
import './suggestion-generator.scss';

function SuggestionsList({results}) {
  return (
    <div className='nfd-suggestions-list'>   
      {results.map((suggestionText, index) => (
        <Suggestion key={index} suggestionText={suggestionText.text} /> 
      ))}
    </div>
  )
}

export default SuggestionsList