# Minimal Startpage

Just another minimal startpage for browsers.

<img src=".github/startpage.gif">

## How to Use

- Clone the repo

    ```console
    git clone https://github.com/deepjyoti30/startpage
    ```

    Alternately, you can download and extract from the browser.

### Chrome

- On chrome, open extensions from the tool menu or open it from [chrome://extensions](chrome://extensions).
- Click on load unpacked, navigate to the directory where you cloned the repo and select it.

### Firefox (temporary)

- Open ```about:debugging``` from your Firefox browser.
- Click on This Firefox and select ```Load Temporary Add On...```
- Open the cloned repo directory and select any file there (preferrably ```manifest.json```)
- It should be installed.

## Upcoming

Will be availabe on Firefox and Chrome add on stores in a while.

I thought I would work on adding a settings page that would handle the updating the settings but I'm just way to bored and honestly I've come to realize I hate GUI's (I mean I've always loved CLI based apps). Anyway, the extension can still be used and I'm sure the crowd I aimed this extension at knows how to edit a ```json``` file, for the time being I'll just let you guys install it and use it and edit the settings from the ```config```.

## Settings

You can edit the settings by writing ```--setting``` in the search bar and clicking enter.

A JSON editor will open up where you can make the changes.

| Name | Supported Values | Default | Description |
| ---- | ----- | ------- | ------ |
| searchEngine | \<DuckDuckGo \| Google \| Bing \|Yahoo\> | DuckDuckGo | Search Engine to use for searching from the bar |
| user | string | Deepjyoti (That's my name) | Name of the user to use on the welcome message |
| disableMessage | \<false \| true\> | false | Hide the Welcome message |
| disableDate | \<false \| true\> | false | Hide the date |
| disableSearchBar | \<false \| true\> | false | Hide the search bar |
| disable24Hour | \<false \| true\> | true | Disable 24 hour clock and show time in 12 hour format |
| disableWeather | \<false \| true\> | true | Disable the weather beside the date |
| weatherConf | Object (Check default for child keys) | {"location": "Pune India","unit": "fah"}| Configuration for the weather, location and unit etc. In "unit", "fah" is short for Fahrenheit and "cel" for Celcius, however the whole word can also be passed. |
| squares | Object of arrays | Check [config.json](https://github.com/deepjyoti30/startpage/blob/master/config.json) for default values | Values and Names of shortcuts for the cards. |
