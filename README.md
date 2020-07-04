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

You must build & sign the extension yourself.

- Get the latest release (zip) or clone this repo and extract it.
- If you would like to  change the source code, please do so right after cloning.
- Follow [these](https://github.com/deepjyoti30/startpage/wiki/How-to-sign-the-extension-for-Personal-Use-on-Firefox) instructions on building and signing for personal use.
- Change the JSON as outlined below in the settings section.

>NOTE: Building/Signing is only necessary for Firefox users since Chrome lets you use without signing.
>NOTE: You must re-build and sign every time you need to change the source code. Steps for updating are outlined in the instructions.

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

## Customizing the squares

The squares are pretty customizable as well.

Each square should be present inside the **squares** Object in the ```config.json``` file or should be set when ```--setting``` is clicked.

Each square can contain the following values.

<details>
  <summary>Name</summary>

  ## Name
  The name variable contains the **name** of the square block, the one that appears on the top of the square/card.

  **Datatype**: String
    
  For Eg: If you want to set the squares name to **Media**, it should be

  ```json
  "name": "Media"
  ```
</details>
<details>
  <summary>Color</summary>

  ## Color
  The primary color that the heading of the square has and also the one that the links will have when the cursor is over them.

  **Datatype**: String

  For Eg: If you want to set the color to **Black** or **#000** or **#000000**, the string should be one of the following

  ```json
  "color": "Black",
  ```
  OR

  ```json
  "color": "#000"
  ```
  OR

  ```json
  "color": "#000000"
  ```

  >**NOTE**: Currently supports CSS color names and HEX values.
</details>
<details>
  <summary>Links</summary>

  ## Links
  This is an array that will contain objects which will later be parsed to URL. Each object should contain two values.

  **Datatype**: Array

  - name: Name of the URL
  - url: The URL.

  For eg: If you want something like [Netflix](https://netflix.com), the object should be

  ```json
  {"name": "Netflix", "url": "https://netflix.com"}
  ```
</details>

## Support the project

If you like using this app, consider supporting the project/me

<p align="left">
<a href="https://www.paypal.me/deepjyoti30" target="_blank"><img alt="undefined" src="https://img.shields.io/badge/paypal-deepjyoti30-blue?style=for-the-badge&logo=paypal"></a>
<a href="https://ko-fi.com/deepjyoti30" target="_blank"><img alt="undefined" src="https://img.shields.io/badge/KoFi-deepjyoti30-red?style=for-the-badge&logo=ko-fi"></a>  
</p>
