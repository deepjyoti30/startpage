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
    if (!["'", "/"].includes(query[1])) return false

    // Make sure the quick link invocation key is present in the config.
    const quickLinkInvocationKey = query[0]

    quickLinkValue = getInvocationKeyUrl(quickLinkInvocationKey, config.quickLinks)

    if (quickLinkValue == null) return false
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
            Search: "/search?q="
        }
    }

    // If it is an object
    if (typeof(quickLinkValue) == "object") {
        return quickLinkValue
    }

    return null
}