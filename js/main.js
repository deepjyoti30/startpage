window.onload = function() {
    this.initBody()
}

searchBarDivId = "search-bar"
searchBarId = "search-bar-input"
messageDivId = "message"
dateDivId = "date"
dateId = "date-text"
weatherId = "weather-text"
lineId = "line"
messageId = "message-text"
otherContentId = "other-content"
userName = ""
disable24Hour = false;
appId = "fd2c04ed7f9802656bd2cc23bddc7ad9"
apiUrl = "http://api.openweathermap.org/data/2.5/weather"
bgClassContainer = [
    "media",
    "work",
    "social",
    "others",
    "funky",
    "purple",
    "upvoty",
    "indigo",
    "foxxy"
]
searchEngines = {
    "Google": "https://www.google.com/search?q=",
    "DuckDuckGo": "https://duckduckgo.com/?q=",
    "Bing": "https://www.bing.com/search?q=",
    "Yahoo": "https://search.yahoo.com/search?p="
}
validWeatherUnit = [
    "fah", "cel"
]

function initBody() {
    /**
     * Function called when the body is loaded.
     * 
     * Do everything like adding an event listener to
     * other things.
     */
    // Read the json file
    BROWSER.storage.sync.get(result => {
        Object.keys(result).length == 0 ? readJSON("config.json") : parseAndCreate(result)
    })
}

function initSearchBar(jsonData) {
    // Clear the search bar on load, just in case
    document.getElementById(searchBarId).value = ""
    document.getElementById(searchBarId).focus()
    searchEngine = jsonData["searchEngine"]
    if(!Object.keys(this.searchEngines).includes(searchEngine)){
        searchEngine = "Google"
    }
    searchUrl = this.searchEngines[searchEngine]
    document.getElementById(searchBarId).placeholder = `Search something on ${searchEngine}`
    document.getElementById(searchBarId).addEventListener("keypress", (event) => {
        if (event.key != 'Enter') return

        // Open google with the search results.
        query = document.getElementById(searchBarId).value
        if (query == "--setting") {
            showSettings()
            document.getElementById(searchBarId).value = ""
            return
        }

        query = query.replace(/\ /g, "+")
        document.location = searchUrl + query
    })
}

function buildMsg() {
    /**
     * Build a nice message for the user.
     * 
     * Following is how the message would be decided.
     * 0 - 5:59 : It's too late, take some sleep
     * 6 - 8:59 : You're up early
     * 9 - 11:59 : Have a good day ahead
     * 12 - 16:59 : Good Afternoon
     * 17 - 19:59 : Good Evening
     * 20 - 23:59 : It's time to wrap up for the day
     */
    date = new Date()
    currentHour = date.getHours()
    currentMinute = date.getMinutes()
    currentTime = currentHour + (0.01 * currentMinute)

    if (inRange(currentTime, 0, 5.59))
        return "It's too late, take some sleep"
    if (inRange(currentTime, 6, 8.59))
        return "You're up early"
    if (inRange(currentTime, 9, 11.59))
        return "Have a good day ahead"
    if (inRange(currentTime, 12, 16.59))
        return "Good Afternoon"
    if (inRange(currentTime, 17, 19.59))
        return "Good Evening"
    if (inRange(currentTime, 20, 24))
        return "It's time to wrap up for the day"
    else
        return ""
}

function updateTime() {
    /**
     * Get the current time and date and return it.
     */
    currentDate = new Date()
    finalDate = currentDate.toLocaleString(undefined, {day:'numeric', month:'short', hour:'numeric', minute:'numeric',hour12:disable24Hour})
    document.getElementById(dateId).textContent = finalDate
}

function updateTimeHook() {
    updateTime()
    interval = setInterval(() => {
        updateTime()
    }, 30 * 1000)
}

function getFahrenheit(inCelcius) {
    return Math.floor((inCelcius * 9 / 5) + 32)
}

function indexUppercase(unformatted) {
    return unformatted.split(" ").map(w => {
        return w[0].toUpperCase() + w.substring(1)
    }).join(" ")
}

function updateWeather(weatherConfig) {
    /**
     * Get the weather using the location passed by the user using
     * the config and update it in a formatted way according to
     * the unit.
     */
    userLocation = weatherConfig["location"].replace(/\ /g, ",")
    passedUnit = weatherConfig["unit"]
    unit = validWeatherUnit.includes(passedUnit.substring(0, 3)) ?
            passedUnit : "cel"

    fetchUrl = apiUrl + `?q=${userLocation}&appid=${appId}&units=metric`

    fetch(fetchUrl)
        .then(response => {return response.json()})
        .then(jsonData => {
            temp = Math.floor(jsonData["main"]["temp"])
            weatherType = jsonData["weather"][0]["main"]

            temp = !unit.includes("cel") ?
                        getFahrenheit(temp) + "&deg;F" : temp + "&deg;C"
            weatherText = temp + ", " + indexUppercase(weatherType)
            document.getElementById(weatherId).innerHTML = weatherText
        })
}

function inRange(number, min, max) {
    return (number >= min && number <= max)
}

function readJSON(fileName) {
    // Load the data of the passed file.
    fetch(fileName)
        .then(response => {return response.json()})
        .then(jsonData => {
            parseAndCreate(jsonData)
            saveSettings(jsonData)
        })
}

function saveSettings(settings) {
    BROWSER.storage.sync.set(settings)
}

function parseAndCreate(jsonData) {
    /**
     * Parse the passed jsonData and create div's accordingly.
     */
    this.userName = jsonData["user"]

    // Build a message for the user
    builtMsg = buildMsg()
    builtMsg == "" ? 
        builtMsg = `Hello ${this.userName}` : builtMsg = `Hey ${this.userName}, ${builtMsg}!`
    document.getElementById(messageId).textContent = builtMsg
    // Check if 24 hour is disabled
    disable24Hour = jsonData["disable24Hour"]
    // Check if welcome message is supposed to be disabled
    if (jsonData["disableMessage"])
        document.getElementById(messageDivId).style.display = "none"
    if (jsonData["disableDate"]) {
        // Hide the date and the line
        document.getElementById(dateId).style.display = "none"
        document.getElementById(lineId).style.display = "none"
    }
    else
        updateTimeHook()
    if (jsonData["disableWeather"]){
        // Hide the date and the line
        document.getElementById(weatherId).style.display = "none"
        document.getElementById(lineId).style.display = "none"
    }
    else
        updateWeather(jsonData["weatherConf"])
    if (jsonData["disableSearchBar"])
        document.getElementById(searchBarDivId).style.display = "none"
    else
        initSearchBar(jsonData)

    sqrs = jsonData["squares"]

    sqrs.forEach((element, index) => {
        sqr = createSqr(element, index)
        document.getElementById(otherContentId).appendChild(sqr)
    })
    
}

function createSqr(sqrData, index) {
    // Create a new square division with the passed element
    name = sqrData["name"]
    links = sqrData["links"]

    div = document.createElement("div")
    cls = document.createAttribute("class")
    div.setAttributeNode(cls)
    div.classList.add("sqr")

    if (index > bgClassContainer.length - 1)
        customClass = "media"
    else
        customClass = bgClassContainer[index]
    div.classList.add(customClass)

    h4 = document.createElement("h4")
    h4.textContent = name

    div.appendChild(h4)

    links.forEach(element => {
        aName = element["name"]
        aHref = element["url"]
        
        a = document.createElement("a")
        attrHref = document.createAttribute("href")
        attrHref.value = aHref
        a.setAttributeNode(attrHref)

        a.textContent = aName

        div.appendChild(a)
    })

    return div
}