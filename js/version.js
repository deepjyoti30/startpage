/**
 * Handle version related methods
 */

const VERSION = "1.1"


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
    return `startpage - v${version}`
}


async function checkIfUpdateAvailable() {
    /**
     * Check if a new version is available from the current version.
     * 
     * We will essentially hit GitHub API to fetch the latest tag and
     * check if that tag is higher than the current hardcoded version.
     */
    latestTagAvailable = await getGithubReleaseTag();

    // We need to compare the tags to see if the tag available is older than
    // the current one
    isUpdateAvailable = isTagHigher(latestTagAvailable, VERSION);

    if (!isUpdateAvailable) return;

    // Update is available, we need to show the notification.
    updateElement = document.getElementsByClassName("update--available")[0];
    updateElement.style.visibility = "visible";
}


async function getGithubReleaseTag() {
    /**
     * Hit GitHub API to fetch the latest release tag for the repo
     */
    const URL = "https://api.github.com/repos/deepjyoti30/startpage/releases/latest"

    var response = await fetch(URL);
    var responseJSON = await response.json();

    var tagName = responseJSON.tag_name;

    // NOTE: Sometimes (due to personal mistakes), the tag might contain a `v` prefix
    // so we will need to remove it before returning the value.
    if (tagName.charAt(0) == "v") {
        tagName = tagName.slice(1, tagName.length);
    }

    return tagName;
}


function isTagHigher(newerTag, olderTag) {
    /**
     * Check if the newer tag is higher than the older tag.
     */
    var newerTagSplitted = newerTag.split(".");
    var olderTagSplitted = olderTag.split(".");

    // We want to make both the arrays of same length and all the non
    // existent digits will be 0.
    if (newerTagSplitted.length != olderTagSplitted.length) {
        if (newerTagSplitted.length > olderTagSplitted.length) {
            // Older tag is shorter
            //
            // Reverse and add 0 till the lengths become same
            // and then reverse it back.
            var olderTagReversed = olderTagSplitted.reverse();
            const shorterBy = newerTagSplitted.length - olderTagSplitted.length;

            for(var i = 0; i < shorterBy; i++) {
                olderTagReversed.push('0');
            }

            olderTagSplitted = olderTagReversed.reverse();
        } else {
            var newerTagReversed = newerTagSplitted.reverse();
            const shorterBy = olderTagSplitted.length - newerTagSplitted.length;

            for(var i = 0; i < shorterBy; i++) {
                newerTagReversed.push('0');
            }

            newerTagSplitted = newerTagReversed.reverse();
        }
    }

    // At this point both arrays should be of same length and we
    // can easily compare them to see which one is larger.
    var isNewerHigher = false;

    for(var i = 0; i < newerTagSplitted.length; i++) {
        newerDigit = parseInt(newerTagSplitted[i]);
        olderDigit = parseInt(olderTagSplitted[i]);

        if (newerDigit > olderDigit) {
            isNewerHigher = true;
            break;
        }
    }

    return isNewerHigher;
}