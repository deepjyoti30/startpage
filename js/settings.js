/**
 * File to handle editing the settings from the menu itself.
 * 
 * A modal will be shown where the user can edit settings
 * and finally when submitted, the settings will be written to
 * the config.json and this config is read each time the page
 * loads.
 */

modalId = "settings"
closeBtn = "close"

function showSettings() {
    modalEl = document.getElementById(modalId)
    closeBtn = document.getElementsByClassName(closeBtn)[0]
    modalEl.style.display = "block"
    closeBtn.onclick = () => {modalEl.style.display = "none"}
}