/**
 * Handle quick search functionality to let the user search
 * various quickly visited sites.
 * 
 * We will support things like g'test that will search for `test` on
 * GitHub.
 * 
 * We will also support things like r/r/startpage that will resolve to
 * reddit.com/r/startpage
 * 
 * This functionality is inspired from the tilde projects quick links:
 * https://github.com/cadejscroggins/tilde 
 */


// Define defaults
const defaultSearchEndpoint = "/search?q="


function searchQuickLinks(query, config) {
    /**
     * Check if the quicklink matches any of the defined
     * quicklinks.
     * 
     * The quicklinks need to have a `'` or a `/` in the 1st index of
     * the query string.
     * 
     * @param {string} query - Query entered by the user in the search bar
     * @param {Object} config - JSON config of the startpage
     * 
     * @returns {boolean} Status of whether quick link invocation was succesfull or not
     */
    // Make sure query contains a search or direct syntax
    const quickAction = query[1]
    if (!["'", "/"].includes(quickAction)) return false

    // Make sure the quick link invocation key is present in the config.
    const quickLinkInvocationKey = query[0]

    quickLinkValue = getInvocationKeyUrl(quickLinkInvocationKey, config.quickLinks)

    if (quickLinkValue == null) return false

    // Replace the special characters in the URL
    query = query.slice(2)

    // If it is not null, we need to build an URL accordingly and
    // open it.
    switch(quickAction) {
        case "'":
            // Search
            quickLinkSearch(query, quickLinkValue)
            break
        case "/":
            // Direct link
            quickLinkDirect(query, quickLinkValue)
            break
        default:
            return false
    }

    return true
}


function getInvocationKeyUrl(key, quickLinks) {
    /**
     * Get the invocation key's URL to use for the query.
     * 
     * We need to check in the config to see if the key is present
     * or not. If not, return  null to indicate that the key is not
     * present.
     * 
     * @param {string} key - Key of the quicklink to invoke
     * @param {Object} quickLinks - Object containing a map of invocation key to URL
     * 
     * @returns {(Object|null)} Object containing URL and search endpoint of the key invoked
     * or null if key is not present.
     */
    if (quickLinks == null) return null

    if (!Object.keys(quickLinks).includes(key)) return null

    const quickLinkValue = quickLinks[key]

    // The quicklink value can be both an object or a string.
    // We will accordingly extract the object or string and return.

    // If it is a string
    if (typeof(quickLinkValue) == "string") {
        return {
            URL: quickLinkValue,
            Search: defaultSearchEndpoint
        }
    }

    // If it is an object
    if (typeof(quickLinkValue) == "object") {
        // Verify the object has the URL key
        if (!Object.keys(quickLinkValue).includes("URL")) return null

        // If the search field is not present, replace it with the default value
        if (!Object.keys(quickLinkValue).includes("Search")) {
            quickLinkValue["Search"] = defaultSearchEndpoint
        }
    
        return quickLinkValue
    }

    return null
}

function quickLinkSearch(query, quickLinkValue) {
    /**
     * Search the query using the quicklink values passed.
     * 
     * This function should be called only if the user passed
     * a search query in a valid format and the quicklink key
     * was valid.
     * 
     * @param {string} query - Query that the user typed in the search bar
     * @param {Object} quickLinkValue - Quick link value object to be used for
     * hitting.
     * @param {string} quickLinkValue.URL - URL to hit the quick link query to.
     * @param {string} quickLinkValue.Search - Endpoint to be used for searching the query.
     */
    const searchURL = quickLinkValue.URL + quickLinkValue.Search + query
    window.location = searchURL
}

function quickLinkDirect(query, quickLinkValue) {
    /**
     * Make a direct hit to the URL after building it using the
     * quicklink URL and the query.
     * 
     * This function should be called if the query contains a valid
     * direct link invocation in it.
     * 
     * @param {string} query - Query that the user typed in the search bar
     * @param {Object} quickLinkValue - Quick link value object to be used for
     * hitting.
     * @param {string} quickLinkValue.URL - URL to hit the quick link query to.
     */
    const directURL = quickLinkValue.URL + "/" + query
    window.location = directURL
}