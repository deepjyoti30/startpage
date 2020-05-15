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

async function showSettings() {
    modalEl = document.getElementById(modalId)
    closeBtn = document.getElementsByClassName(closeId)[0]
    modalEl.style.display = "block"
    updatedJson = await loadJson()
    closeBtn.onclick = () => {
        modalEl.style.display = "none"
        // Get the updated JSON
        //updatedJson = editor.get()
        console.log(updatedJson)
        chrome.storage.sync.set(updatedJson)
        document.getElementById(jsonContainer).innerHTML = ""
        location.reload()
    }
}

async function loadJson() {
    container = document.getElementById(jsonContainer)
    const options = {
        mode: 'tree',
        modes: ['code', 'tree', 'view']
    }
    const editor = new JSONEditor(container, options)

    const response = await fetch("config.json")
    const initialJson = await response.json()
    
    // Populate the editor
    editor.set(initialJson)

    return editor.get()
}