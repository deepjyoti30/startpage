window.onload = function() {
    this.initBody()
}

searchBarId = "search-bar-input"
messageId = "message h1"
userName = "Deepjyoti"

function initBody() {
    /**
     * Function called when the body is loaded.
     * 
     * Do everything like adding an event listener to
     * other things.
     */
    // Clear the search bar on load, just in case
    $("#" + searchBarId).val("")
    $("#" + searchBarId).on("keypress", (event) => {
        if (event.which != 13) return

        // Open google with the search results.
        googleSearchUrl = "https://www.google.com/search?q="
        query = document.getElementById(searchBarId).value.replace(/\ /g, "+")
        document.location = googleSearchUrl + query
    })
    
    // Build a message for the user
    builtMsg = buildMsg()
    builtMsg == "" ? 
        builtMsg = `Hello ${userName}` : builtMsg = `Hey ${userName}, ${builtMsg}!`
    $("#" + messageId).text(builtMsg)
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
     * 20 - 23:59 : Get away from the computer
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
        return "Get away from the computer"
    else
        return ""
}

function inRange(number, min, max) {
    return (number >= min && number <= max)
}