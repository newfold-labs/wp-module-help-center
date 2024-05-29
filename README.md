<a href="https://newfold.com/" target="_blank">
    <img src="https://newfold.com/content/experience-fragments/newfold/site-header/master/_jcr_content/root/header/logo.coreimg.svg/1621395071423/newfold-digital.svg" alt="Newfold Logo" title="Newfold Digital" align="right" 
height="42" />
</a>

# WordPress Help Center Module

Help Center

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

[More on NewFold WordPress Modules](https://github.com/newfold-labs/wp-module-loader)

[More on the NewFold Features Modules](https://github.com/newfold-labs/wp-module-features)


## Launching the Help Center from the anywhere in the plugin

To launch the help center with a click on a text or an element containing text:

Simply add `data-openNfdHelpCenter` or `data-openNfdHelpCenter=true` attribute to your HTML/JSX element. For example:
   ```html
   <div data-openNfdHelpCenter>Click me to open help center.</div> OR for JSX
   <span data-openNfdHelpCenter={true}>Click me to open help center in JSX.</span>
   ```
