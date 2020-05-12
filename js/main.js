window.onload = function() {
    this.initBody()
}

searchBarId = "search-bar-input"

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
}