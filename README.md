<a href="https://newfold.com/" target="_blank">
    <img src="https://newfold.com/content/experience-fragments/newfold/site-header/master/_jcr_content/root/header/logo.coreimg.svg/1621395071423/newfold-digital.svg" alt="Newfold Logo" title="Newfold Digital" align="right" 
height="42" />
</a>

# WordPress Help Center Module

Help Center


## Critical Paths

* `Help Center` icon should be visible in the top WordPress admin bar for users with the required capabilities.
* Clicking the `Help Center` icon should open a sidebar with an introduction and search field to help users navigate WordPress.
* The `Help Center` sidebar should allow users to type a question and receive a list of suggested help articles.
* When submitting a search, the sidebar should display a highlighted question and related answers.
* Users should be able to provide feedback on the answer by selecting if it was helpful or not, and optionally provide a reason if it wasn’t.
* The `Help Center` should include a footer section with information about professional design services and a button to start the process.
* The sidebar must include support contact information for users who need assistance with their account.
* Clicking the close icon should properly dismiss the `Help Center` sidebar and return to the previous view.
* A tooltip should be available to show a list of recent or suggested questions when triggered by the user.


## Installation

### 1. Add the Newfold Satis to your `composer.json`.

 ```bash
 composer config repositories.newfold composer https://newfold-labs.github.io/satis
 ```

### 2. Require the `newfold-labs/wp-module-help-center` package.

 ```bash
 composer require newfold-labs/wp-module-help-center
 ```

### 3. Instantiate the Features singleton to load all features.

```
Features::getInstance();
```

[More on Newfold WordPress Modules](https://github.com/newfold-labs/wp-module-loader)

[More on the Newfold Features Modules](https://github.com/newfold-labs/wp-module-features)


## Launching the Help Center from the anywhere in the plugin

To launch the help center with a click on a text or an element containing text:

Simply add `data-openNfdHelpCenter` or `data-openNfdHelpCenter=true` attribute to your HTML/JSX element. For example:
   ```html
   <div data-openNfdHelpCenter>Click me to open help center.</div> OR for JSX
   <span data-openNfdHelpCenter={true}>Click me to open help center in JSX.</span>
   ```
