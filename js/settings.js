/**
 * File to handle editing the settings from the menu itself.
 * 
 * A modal will be shown where the user can edit settings
 * and finally when submitted, the settings will be written to
 * the config.json and this config is read each time the page
 * loads.
 */

modalId = "settings"
closeId = "close"
jsonContainer = "jsoneditor"
exportBtnId = "export--btn"

// Detect browser
BROWSER = detectBrowser()

function showSettings() {
    modalEl = document.getElementById(modalId)
    closeBtn = document.getElementsByClassName(closeId)[0]
    modalEl.style.display = "block"

    // Define the jsonEditor
    container = document.getElementById(jsonContainer)
    const options = {
        mode: 'tree',
        modes: ['code', 'tree', 'view']
    }
    const editor = new JSONEditor(container, options)
    loadJson(editor)

    closeBtn.onclick = () => {
        hideSettings(editor);
    }

    // Add listener for the export button
    exportBtn = document.getElementById(exportBtnId);
    exportBtn.onclick = () => {
        triggerDownload(editor, "config.json");
    }

    return editor
}

function hideSettings(editor) {
    /**
     * Hide the settings.
     * 
     * This function is to be called when the settings window
     * is supposed to be hidden, This will automatically
     * handle saving the updated settings to the localstorage.
     */
    modalEl.style.display = "none"
    // Get the updated JSON
    updatedJson = editor.get()
    BROWSER.storage.sync.set(updatedJson)
    document.getElementById(jsonContainer).innerHTML = ""
    location.reload()
}

async function loadJson(editor) {
    BROWSER.storage.sync.get(async result => {
        if (Object.keys(result).length == 0) {
            const response = await fetch("config.json")
            result = await response.json()
        }
        // Populate the editor
        editor.set(result)
    })
};

function detectBrowser() {
    // Firefox
    if (typeof InstallTrigger !== 'undefined')
        BROWSER = browser
    else if (!!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime))
        BROWSER = chrome

    return BROWSER;
};


function triggerDownload(editor, filename) {
    /**
     * Trigger the download of the configuration file.
     * 
     * This method will trigger the download of the configuration file
     * by creating an `a` element and clicking it through JS.
     */

    // Read the updated JSON content
    text = editor.get()

    var element = document.createElement('a');
    element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(text, null, 2)));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }
