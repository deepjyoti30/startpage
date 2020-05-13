window.onload = function() {
    this.initBody()
}

searchBarId = "search-bar-input"
messageDivId = "message"
dateDivId = "date"
dateId = "date-text"
messageId = "message-text"
otherContentId = "other-content"
userName = "Deepjyoti"
bgClassContainer = [
    "media",
    "work",
    "social",
    "others"
]
dateMap = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec"
}

function initBody() {
    /**
     * Function called when the body is loaded.
     * 
     * Do everything like adding an event listener to
     * other things.
     */
    // Clear the search bar on load, just in case
    document.getElementById(searchBarId).value = ""

    // Read the json file
    json = readJSON("config.json")

    document.getElementById(searchBarId).addEventListener("keypress", (event) => {
        if (event.key != 'Enter') return

        // Open google with the search results.
        googleSearchUrl = "https://www.google.com/search?q="
        query = document.getElementById(searchBarId).value.replace(/\ /g, "+")
        document.location = googleSearchUrl + query
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
    date = currentDate.getDate()
    month = dateMap[currentDate.getMonth()]
    minutes = currentDate.getMinutes()
    time = currentDate.getHours() + ":" + (minutes < 10 ? "0" + minutes : minutes)
    finalDate = date + " " + month + ", " + time
    document.getElementById(dateId).textContent = finalDate
}

function updateTimeHook() {
    updateTime()
    interval = setInterval(() => {
        updateTime()
    }, 30 * 1000)
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
        })
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

    // Check if welcome message is supposed to be disabled
    if (jsonData["disableMessage"])
        document.getElementById(messageDivId).style.display = "none"
    if (jsonData["disableDate"])
        document.getElementById(dateDivId).style.display = "none"
    else
        updateTimeHook()


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