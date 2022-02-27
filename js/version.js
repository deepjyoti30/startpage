/**
 * Handle version related methods
 */

const VERSION = "v0.4"


function populateVersionInSettings() {
    /**
     * This method will populate the version field in the
     * settings modal.
     * 
     * This should be called once only since the version is
     * constant throughout and changes with a new release (new installation)
     */
    const versionElementId = "current--version--startpage"
    document.getElementById(versionElementId).innerHTML = generateVersionString(VERSION)
}

function generateVersionString(version) {
    /**
     * Generate the version string to populate in the element.
     * 
     * @param {string} version - The version to use in the version string
     * 
     * @returns {string} - Returns a generated string to be used to show the version
     * and the product name.
     */
    return `startpage - ${version}`
}