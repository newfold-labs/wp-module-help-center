import { useEffect, useState } from '@wordpress/element';
import moduleAI from '@newfold-labs/wp-module-ai';
import apiFetch from '@wordpress/api-fetch';
import { ReactComponent as RegenerateIcon } from '../../icons/regenerate-icon.svg';

import SuggestionsList from './suggestionList';
const SuggestionsGenerator = (props) => {

  const [aiResults, setAIResults] = useState([]);
  const [targetHasValue, setTargetHasValue] = useState(false);
  const siteDescInput = document.getElementById("blogdescription") ? document.getElementById("blogdescription").value : null;

  const targetElement = document.getElementById("blogdescription") ? document.getElementById("blogdescription") : null;
  

  const getAIResult = async (siteTitle, siteUrl, siteDesc) => {
    const siteDescrition = siteDescInput ? siteDescInput : siteDesc;
  
    if (siteDescrition) {
      const userPrompt = `current description is ${siteDescrition} site title is ${siteTitle} site type is ${``} sub type is ${``} site url is ${siteUrl}`;
      try {
        // setBtnText("Fetching Suggestions....");
        const result = await moduleAI.search.getSearchResult(
          userPrompt,
          'descgenerator'
        );
        setAIResults(result.result);
        console.log("🚀 ~ file: index.js:24 ~ getAIResult ~ result:", result.result)
      } catch (exception) {
        console.log("🚀 ~ file: index.js:29 ~ getAIResult ~ catch")
      } finally {
        console.log("🚀 ~ file: index.js:32 ~ getAIResult ~ finally:", )
      }
    }
  };

  const fetchSettings = () => {
    apiFetch({ path: '/wp/v2/settings' }).then((settings) => {
      const { title, url, description } = settings;
      if (title && url) {
        getAIResult(title, url, description);
      }
    });
  }


  useEffect(() => {
    fetchSettings();

    return () => {}
  }, []); 

  return (
    <div className="nfd-suggestions-center">
      <h4 className="nfd-suggestion-heading">Suggestion for "Tagline"</h4>
      <SuggestionsList results={aiResults} targetElement={targetElement}/>
      <div className="nfd-regenerate-button" onClick={() => fetchSettings()}>
        <span><RegenerateIcon /></span><span>Regenerate</span>
      </div>
    </div>
  );
};

export default SuggestionsGenerator;
