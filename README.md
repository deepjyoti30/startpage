<div align="center">
<h1>Minimal Startpage</h1>
<h4>Just another minimal startpage for browsers.</h4>
</div>

<img src=".github/startpage.gif">

<div align="center">
<br>
<img src="https://img.shields.io/badge/Maintained%3F-Yes-blueviolet?style=for-the-badge">
<a href="LICENSE.md"><img src="https://img.shields.io/badge/License-MIT-pink.svg?style=for-the-badge"></a> <a href="http://makeapullrequest.com"><img src="https://img.shields.io/badge/PRs-welcome-lightblue.svg?style=for-the-badge"></a> <img src="https://img.shields.io/badge/supports-chrome-lightgreen.svg?style=for-the-badge"> <img src="https://img.shields.io/badge/supports-firefox-orange.svg?style=for-the-badge">


<p>
<br>
<a href="https://ko-fi.com/deepjyoti30"><img src="https://raw.githubusercontent.com/adi1090x/files/master/other/kofi.png" alt="Support me on ko-fi"></a>
</p>
</div>

## Installation

### Chrome

- Get the latest release (zip) or clone this repo and extract it.
- On chrome, open extensions from the tool menu or open it from [chrome://extensions](chrome://extensions).
- Click on load unpacked, navigate to the directory where you cloned the repo and select it.

>NOTE: You can also install using the ```crx``` file provided in the release.

### Firefox

Available on the Mozilla Add On Store.

Get it [here](https://addons.mozilla.org/en-US/firefox/addon/minimal-startpage/).

### Installing & Signing the extension manually (for personal use) for access to css/js files.

If you would like access to css/js to change them you must build and sign the extension yourself.

- Get the latest release (zip) or clone this repo and extract it.
- Change the config to your liking
- Follow [these](https://github.com/deepjyoti30/startpage/wiki/How-to-sign-the-extension-for-Personal-Use-on-Firefox) instructions on building and signing for personal use.

>NOTE: Building/Signing is only necessary for Firefox users since Chrome lets you use without signing.
>NOTE: You must re-build and sign every time you need to update your config. Steps for updating are outlined in the instructions.

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

## Support the project

If you like using this app, consider supporting the project/me

<p align="left">
<a href="https://www.paypal.me/deepjyoti30" target="_blank"><img alt="undefined" src="https://img.shields.io/badge/paypal-deepjyoti30-blue?style=for-the-badge&logo=paypal"></a>
<a href="https://ko-fi.com/deepjyoti30" target="_blank"><img alt="undefined" src="https://img.shields.io/badge/KoFi-deepjyoti30-red?style=for-the-badge&logo=ko-fi"></a>  
</p>
